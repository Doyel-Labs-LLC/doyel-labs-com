/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives the site's contact form as JSON and forwards it to
 * support@doyel-labs.com through Resend. Every control here is
 * described on /security/, so if you change behaviour here, change
 * that page the same day.
 *
 * Controls, in order:
 *   1. Method + same-origin Origin + JSON content type + body size cap.
 *   2. Honeypot (silent 200).
 *   3. Field cleaning + validation (shared with the client).
 *   4. Turnstile verification with hostname check. Fails CLOSED in
 *      production if the secret is missing.
 *   5. Per-IP rate limit, counted only after Turnstile passes. Uses the
 *      Cloudflare Rate Limiting binding when present, KV otherwise.
 *      Fails CLOSED in production if neither binding exists.
 *   6. Resend delivery with a 5 s timeout.
 *   7. A best-effort automatic receipt to the visitor (templates in
 *      src/lib/contact-email.ts). It never repeats the visitor's message.
 *
 * Errors return a generic message only. Upstream details are logged to
 * the Pages Function log, never to the client.
 *
 * Status codes: 200 sent ({ ok, receipt }) · 400 invalid · 403 origin/CAPTCHA · 405 method
 * · 413 too large · 429 rate limited · 500 not configured / upstream.
 * (No 502/504: Cloudflare replaces those with its own HTML error page.)
 */

import {
  cleanContact,
  validateContact,
  PROJECT_TYPE_LABELS,
  LIMITS,
  type ContactInput,
} from "../../src/lib/contact-form";
import {
  renderNotificationHtml,
  renderNotificationText,
  renderReceiptHtml,
  renderReceiptText,
  receiptSubject,
} from "../../src/lib/contact-email";

interface RateLimiter {
  limit(opts: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  CONTACT_TO?: string;
  TURNSTILE_SECRET_KEY?: string;
  /** Preferred: Cloudflare Rate Limiting binding (atomic, no races). */
  RATE_LIMITER?: RateLimiter;
  /** Fallback: KV namespace for a best-effort per-IP counter. */
  CONTACT_KV?: KVNamespace;
  /** Set by Cloudflare Pages at build/deploy time. "master" = production. */
  CF_PAGES_BRANCH?: string;
}

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 300; // seconds
const UPSTREAM_TIMEOUT_MS = 5000;
const ALLOWED_ORIGINS = new Set([
  "https://doyel-labs.com",
  "https://www.doyel-labs.com",
]);
const ALLOWED_HOSTS = new Set(["doyel-labs.com", "www.doyel-labs.com"]);

const GENERIC = {
  internal: "Something went wrong on our end. Please email support@doyel-labs.com or call (307) 429-0389.",
  captcha: "We couldn't confirm you're a person. Please refresh the page and try again.",
  rate: "Too many messages in a short window. Please try again in a few minutes, or email support@doyel-labs.com.",
  notConfigured: "The contact form isn't available right now. Please email support@doyel-labs.com.",
} as const;

function j(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

function isProduction(env: Env): boolean {
  return env.CF_PAGES_BRANCH === "master";
}

function originAllowed(request: Request, env: Env): boolean {
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) return true;
  // Preview deployments (*.website.pages.dev) are allowed outside production.
  if (!isProduction(env) && origin && /^https:\/\/[a-z0-9-]+\.website\.pages\.dev$/.test(origin)) return true;
  if (!isProduction(env) && origin && /^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
  return false;
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  try {
    return await handleContact(ctx.request, ctx.env);
  } catch (err) {
    console.error("contact: unhandled", err instanceof Error ? err.message : String(err));
    return j(500, { error: GENERIC.internal });
  }
};

export const onRequest: PagesFunction<Env> = async () =>
  new Response("Method not allowed", {
    status: 405,
    headers: { allow: "POST", "cache-control": "no-store" },
  });

async function handleContact(request: Request, env: Env): Promise<Response> {
  // 1. Request shape.
  if (!originAllowed(request, env)) {
    return j(403, { error: "Requests must come from doyel-labs.com." });
  }
  const ct = request.headers.get("content-type") || "";
  if (!ct.toLowerCase().startsWith("application/json")) {
    return j(400, { error: "Expected application/json." });
  }
  const len = Number(request.headers.get("content-length") || "0");
  if (len > LIMITS.body) return j(413, { error: "Message too large." });

  let text: string;
  try {
    text = await request.text();
  } catch {
    return j(400, { error: "Could not read the request." });
  }
  if (text.length > LIMITS.body) return j(413, { error: "Message too large." });

  let raw: ContactInput;
  try {
    raw = JSON.parse(text) as ContactInput;
  } catch {
    return j(400, { error: "Invalid JSON body." });
  }
  if (!raw || typeof raw !== "object") return j(400, { error: "Invalid JSON body." });

  // 2. Honeypot: bots fill hidden fields. Accept silently, send nothing.
  const c = cleanContact(raw);
  if (c.honeypot) return j(200, { ok: true });

  // 3. Validation (same rules as the client).
  const problem = validateContact(c);
  if (problem) return j(400, { error: problem });

  const clientIp = request.headers.get("cf-connecting-ip") || "";

  // 4. Turnstile. Fail closed in production.
  if (!env.TURNSTILE_SECRET_KEY) {
    if (isProduction(env)) {
      console.error("contact: TURNSTILE_SECRET_KEY missing in production");
      return j(500, { error: GENERIC.notConfigured });
    }
  } else {
    if (!c.turnstileToken) return j(403, { error: GENERIC.captcha });
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, c.turnstileToken, clientIp);
    if (!ok) return j(403, { error: GENERIC.captcha });
  }

  // 5. Rate limit — after the CAPTCHA, so bots can't burn a real
  //    visitor's allowance. Fail closed in production.
  const rl = await rateLimit(env, clientIp || "unknown");
  if (rl === "limited") return j(429, { error: GENERIC.rate });
  if (rl === "unavailable") {
    if (isProduction(env)) {
      console.error("contact: no rate-limit binding in production");
      return j(500, { error: GENERIC.notConfigured });
    }
  }

  // 6. Deliver.
  const key = env.RESEND_API_KEY;
  if (!key) {
    console.error("contact: RESEND_API_KEY missing");
    return j(500, { error: GENERIC.notConfigured });
  }
  const from = env.RESEND_FROM || "Doyel Labs Website <noreply@doyel-labs.com>";
  const to = env.CONTACT_TO || "support@doyel-labs.com";
  const projectTypeLabel = PROJECT_TYPE_LABELS[c.projectType];
  const subject = c.subject || "New message from doyel-labs.com";
  const replyMailto = `mailto:${encodeURIComponent(c.email)}?subject=${encodeURIComponent("Re: " + subject)}`;

  const payload = {
    from,
    to: [to],
    reply_to: c.email,
    subject: `[Website · ${projectTypeLabel}] ${subject}`,
    text: renderNotificationText({ ...c, projectTypeLabel, subject }),
    html: renderNotificationHtml({ ...c, projectTypeLabel, subject, replyMailto }),
  };

  let resendResp: Response;
  try {
    resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (e) {
    console.error("contact: resend unreachable", e instanceof Error ? e.message : String(e));
    return j(500, { error: GENERIC.internal });
  }

  if (resendResp.status === 429) return j(429, { error: GENERIC.rate });
  if (!resendResp.ok) {
    let detail = "";
    try {
      detail = (await resendResp.text()).slice(0, 300);
    } catch {
      /* ignore */
    }
    console.error("contact: resend rejected", resendResp.status, detail);
    return j(500, { error: GENERIC.internal });
  }

  // 7. Receipt to the visitor. Best effort: the message is already
  //    delivered, so a failure here is logged and never shown as an error.
  const receipt = await sendReceipt(key, from, to, c.email, c.name);
  return j(200, { ok: true, receipt });
}

async function sendReceipt(key: string, from: string, replyTo: string, email: string, name: string): Promise<boolean> {
  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        reply_to: replyTo,
        subject: receiptSubject,
        text: renderReceiptText({ name }),
        html: renderReceiptHtml({ name }),
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!resp.ok) console.error("contact: receipt rejected", resp.status);
    return resp.ok;
  } catch (e) {
    console.error("contact: receipt unreachable", e instanceof Error ? e.message : String(e));
    return false;
  }
}

async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
  try {
    const form = new URLSearchParams();
    form.set("secret", secret);
    form.set("response", token);
    if (ip) form.set("remoteip", ip);
    const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!resp.ok) return false;
    const body = (await resp.json()) as { success?: boolean; hostname?: string; "error-codes"?: string[] };
    if (!body.success) {
      console.warn("contact: turnstile failed", (body["error-codes"] || []).join(","));
      return false;
    }
    // Token must have been issued for our site, not a lookalike.
    if (body.hostname && !ALLOWED_HOSTS.has(body.hostname) && !/\.website\.pages\.dev$/.test(body.hostname) && body.hostname !== "localhost") {
      console.warn("contact: turnstile hostname mismatch", body.hostname);
      return false;
    }
    return true;
  } catch (e) {
    console.error("contact: turnstile error", e instanceof Error ? e.message : String(e));
    return false;
  }
}

async function rateLimit(env: Env, ip: string): Promise<"ok" | "limited" | "unavailable"> {
  if (env.RATE_LIMITER) {
    try {
      const { success } = await env.RATE_LIMITER.limit({ key: ip });
      return success ? "ok" : "limited";
    } catch (e) {
      console.error("contact: rate limiter error", e instanceof Error ? e.message : String(e));
      return "unavailable";
    }
  }
  if (env.CONTACT_KV) {
    const bucketKey = `rl:${ip}`;
    try {
      const current = await env.CONTACT_KV.get(bucketKey);
      const count = current ? parseInt(current, 10) || 0 : 0;
      if (count >= RATE_LIMIT_MAX) return "limited";
      await env.CONTACT_KV.put(bucketKey, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW });
      return "ok";
    } catch (e) {
      console.error("contact: kv error", e instanceof Error ? e.message : String(e));
      return "unavailable";
    }
  }
  return "unavailable";
}
