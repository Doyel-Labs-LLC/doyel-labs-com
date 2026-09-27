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
 *   4. Turnstile verification with hostname check. Fails CLOSED on
 *      every Pages deployment (production and preview) if the secret
 *      is missing.
 *   5. Per-IP rate limit, counted only after Turnstile passes. Uses the
 *      Cloudflare Rate Limiting binding when present, KV otherwise.
 *      Fails CLOSED on every Pages deployment if neither binding exists.
 *   6. Resend delivery with a 5 s timeout.
 *   7. A best-effort automatic receipt to the visitor (templates in
 *      src/lib/contact-email.ts). It never repeats the visitor's message
 *      and is capped per recipient address.
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

// `_headers` rules don't apply to Pages Functions responses, so the API
// sets its own. JSON only: nothing here may render, frame, or run script.
const API_HEADERS = {
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "strict-transport-security": "max-age=63072000; includeSubDomains; preload",
  "content-security-policy": "default-src 'none'; frame-ancestors 'none'",
  "referrer-policy": "no-referrer",
} as const;

function j(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...API_HEADERS, "content-type": "application/json; charset=utf-8" },
  });
}

/** Reads at most `max` bytes of the body; returns null if it is larger. */
async function readBounded(request: Request, max: number): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const all = new Uint8Array(size);
  let at = 0;
  for (const c of chunks) {
    all.set(c, at);
    at += c.byteLength;
  }
  return new TextDecoder().decode(all);
}

/** Any Cloudflare Pages deployment (production or preview). Unset only in
 * local dev, which is the one place the form may run without Turnstile or
 * a rate limiter. */
function isDeployed(env: Env): boolean {
  return !!env.CF_PAGES_BRANCH;
}

function isProduction(env: Env): boolean {
  return env.CF_PAGES_BRANCH === "master";
}

function originAllowed(request: Request, env: Env): boolean {
  const origin = request.headers.get("origin");
  if (origin && ALLOWED_ORIGINS.has(origin)) return true;
  // Preview deployments (*.website.pages.dev) are allowed outside production.
  if (!isProduction(env) && origin && /^https:\/\/[a-z0-9-]+\.website\.pages\.dev$/.test(origin)) return true;
  if (!isDeployed(env) && origin && /^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
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
    headers: { ...API_HEADERS, allow: "POST", "content-type": "text/plain; charset=utf-8" },
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

  let text: string | null;
  try {
    text = await readBounded(request, LIMITS.body);
  } catch {
    return j(400, { error: "Could not read the request." });
  }
  if (text === null) return j(413, { error: "Message too large." });

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

  // 4. Turnstile. Fail closed on every deployment (production and preview).
  if (!env.TURNSTILE_SECRET_KEY) {
    if (isDeployed(env)) {
      console.error("contact: TURNSTILE_SECRET_KEY missing on a deployment");
      return j(500, { error: GENERIC.notConfigured });
    }
  } else {
    if (!c.turnstileToken) return j(403, { error: GENERIC.captcha });
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, c.turnstileToken, clientIp, isProduction(env));
    if (!ok) return j(403, { error: GENERIC.captcha });
  }

  // 5. Rate limit — after the CAPTCHA, so bots can't burn a real
  //    visitor's allowance. Fail closed on every deployment.
  const rl = await rateLimit(env, clientIp || "unknown");
  if (rl === "limited") return j(429, { error: GENERIC.rate });
  if (rl === "unavailable") {
    if (isDeployed(env)) {
      console.error("contact: no rate-limit binding on a deployment");
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
  //    Receipts to the same address are capped (one per day when KV is
  //    bound), so the form can't be used to mail someone repeatedly.
  const receipt = (await receiptAllowed(env, c.email)) && (await sendReceipt(key, from, to, c.email, c.name));
  return j(200, { ok: true, receipt });
}

const RECEIPT_WINDOW = 86400; // seconds

async function receiptAllowed(env: Env, email: string): Promise<boolean> {
  try {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email.trim().toLowerCase()));
    const id = "rcpt:" + [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
    if (env.CONTACT_KV) {
      if (await env.CONTACT_KV.get(id)) return false;
      await env.CONTACT_KV.put(id, "1", { expirationTtl: RECEIPT_WINDOW });
      return true;
    }
    if (env.RATE_LIMITER) {
      const { success } = await env.RATE_LIMITER.limit({ key: id });
      return success;
    }
    return !isDeployed(env);
  } catch (e) {
    console.error("contact: receipt limit error", e instanceof Error ? e.message : String(e));
    return false;
  }
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

async function verifyTurnstile(secret: string, token: string, ip: string, production: boolean): Promise<boolean> {
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
    // Token must have been issued for our site, not a lookalike. Production
    // accepts only the real hostnames; previews also accept pages.dev/localhost.
    const hostOk =
      !!body.hostname &&
      (ALLOWED_HOSTS.has(body.hostname) ||
        (!production && (/^[a-z0-9-]+\.website\.pages\.dev$/.test(body.hostname) || body.hostname === "localhost")));
    if (!hostOk) {
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
