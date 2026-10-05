/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives the site's contact form as JSON and forwards it to
 * support@doyel-labs.com through Resend. Every control here is
 * described on /security/, so if you change behaviour here, change
 * that page the same day.
 *
 * Controls, in order:
 *   1. Method + same-origin Origin + Sec-Fetch-Site + JSON content type + body size cap.
 *   2. Honeypot (silent 200).
 *   3. Field cleaning + validation (shared with the client).
 *   4. Turnstile verification with hostname check. Fails CLOSED on
 *      every Pages deployment (production and preview) if the secret
 *      is missing. Production tokens must be minted for doyel-labs.com.
 *   5. Per-IP and per-email rate limits, counted only after Turnstile
 *      passes. Uses the Cloudflare Rate Limiting binding when present,
 *      KV otherwise. Fails CLOSED on every Pages deployment if neither
 *      binding exists. The email key is a hash; the address is not logged.
 *   6. Resend delivery with a 5 s timeout. Logs are a static event name
 *      plus the HTTP status. The response body is never read.
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
import {
  API_SECURITY_HEADERS,
  isDeployedBranch,
  isJsonContentType,
  isProductionBranch,
  originAllowed,
  readBoundedBody,
  turnstileHostAllowed,
} from "../../src/lib/contact-guard";

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
  /** Fallback: KV namespace for a best-effort counter. */
  CONTACT_KV?: KVNamespace;
  /** Set by Cloudflare Pages at build/deploy time. "master" = production. */
  CF_PAGES_BRANCH?: string;
}

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 300; // seconds
const UPSTREAM_TIMEOUT_MS = 5000;
const GENERIC = {
  internal: "Something went wrong on our end. Please email support@doyel-labs.com or call (307) 429-0389.",
  captcha: "We couldn't confirm you're a person. Please refresh the page and try again.",
  rate: "Too many messages in a short window. Please try again in a few minutes, or email support@doyel-labs.com.",
  notConfigured: "The contact form isn't available right now. Please email support@doyel-labs.com.",
} as const;

function j(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...API_SECURITY_HEADERS, "content-type": "application/json; charset=utf-8" },
  });
}

function isProduction(env: Env): boolean {
  return isProductionBranch(env.CF_PAGES_BRANCH);
}

function isDeployed(env: Env): boolean {
  return isDeployedBranch(env.CF_PAGES_BRANCH);
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  try {
    return await handleContact(ctx.request, ctx.env);
  } catch {
    // Do not log the exception message. It can echo part of the request.
    console.error("contact: unhandled");
    return j(500, { error: GENERIC.internal });
  }
};

export const onRequest: PagesFunction<Env> = async () =>
  new Response("Method not allowed", {
    status: 405,
    headers: { ...API_SECURITY_HEADERS, allow: "POST", "content-type": "text/plain; charset=utf-8" },
  });

async function handleContact(request: Request, env: Env): Promise<Response> {
  // 1. Request shape.
  if (request.headers.get("Sec-Fetch-Site") === "cross-site" || !originAllowed(request.headers.get("origin"), env.CF_PAGES_BRANCH)) {
    return j(403, { error: "Requests must come from doyel-labs.com." });
  }
  if (!isJsonContentType(request.headers.get("content-type"))) {
    return j(400, { error: "Expected application/json." });
  }

  let text: string | null;
  try {
    text = await readBoundedBody(request, LIMITS.body);
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
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return j(400, { error: "Invalid JSON body." });

  // 2. Honeypot: bots fill hidden fields. Accept silently, send nothing.
  const c = cleanContact(raw);
  if (c.honeypot) return j(200, { ok: true });

  // 3. Validation (same rules as the client).
  const problem = validateContact(c);
  if (problem) return j(400, { error: problem });

  const clientIp = request.headers.get("cf-connecting-ip") || "";
  if (!clientIp && isDeployed(env)) {
    console.error("contact: missing client ip on a deployment");
    return j(500, { error: GENERIC.notConfigured });
  }

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
  //    visitor's allowance. Count the IP and the email address
  //    separately. Fail closed on every deployment.
  const ipKey = clientIp ? `ip:${clientIp}` : "ip:local";
  const ipLimit = await rateLimit(env, ipKey);
  if (ipLimit === "limited") return j(429, { error: GENERIC.rate });
  if (ipLimit === "unavailable" && isDeployed(env)) {
    console.error("contact: no rate-limit binding on a deployment");
    return j(500, { error: GENERIC.notConfigured });
  }
  const emailLimit = await rateLimit(env, await emailRateKey(c.email));
  if (emailLimit === "limited") return j(429, { error: GENERIC.rate });
  if (emailLimit === "unavailable" && isDeployed(env)) {
    console.error("contact: no rate-limit binding on a deployment");
    return j(500, { error: GENERIC.notConfigured });
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
  } catch {
    console.error("contact: resend unreachable");
    return j(500, { error: GENERIC.internal });
  }

  if (resendResp.status === 429) {
    await resendResp.body?.cancel();
    return j(429, { error: GENERIC.rate });
  }
  if (!resendResp.ok) {
    // Status only. The upstream body can echo the message, address, or subject.
    await resendResp.body?.cancel();
    console.error("contact: resend rejected", resendResp.status);
    return j(500, { error: GENERIC.internal });
  }
  await resendResp.body?.cancel();

  // 7. Receipt to the visitor. Best effort: the message is already
  //    delivered, so a failure here is logged and never shown as an error.
  //    Receipts to the same address are capped (one per day when KV is
  //    bound), so the form can't be used to mail someone repeatedly.
  const receipt = (await receiptAllowed(env, c.email)) && (await sendReceipt(key, from, to, c.email, c.name));
  return j(200, { ok: true, receipt });
}

const RECEIPT_WINDOW = 86400; // seconds

async function emailDigest(email: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email.trim().toLowerCase()));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function emailRateKey(email: string): Promise<string> {
  return `em:${await emailDigest(email)}`;
}

async function receiptAllowed(env: Env, email: string): Promise<boolean> {
  try {
    const id = `rcpt:${await emailDigest(email)}`;
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
  } catch {
    console.error("contact: receipt limit error");
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
    if (!resp.ok) {
      await resp.body?.cancel();
      console.error("contact: receipt rejected", resp.status);
    } else {
      await resp.body?.cancel();
    }
    return resp.ok;
  } catch {
    console.error("contact: receipt unreachable");
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
    if (!resp.ok) {
      await resp.body?.cancel();
      return false;
    }
    const body = (await resp.json()) as { success?: boolean; hostname?: string; "error-codes"?: string[] };
    if (!body.success) {
      console.warn("contact: turnstile failed", (body["error-codes"] || []).join(","));
      return false;
    }
    if (!turnstileHostAllowed(body.hostname, production)) {
      // Do not log the hostname. It can identify a lookalike or a preview host.
      console.warn("contact: turnstile hostname mismatch");
      return false;
    }
    return true;
  } catch {
    console.error("contact: turnstile error");
    return false;
  }
}

async function rateLimit(env: Env, key: string): Promise<"ok" | "limited" | "unavailable"> {
  if (env.RATE_LIMITER) {
    try {
      const { success } = await env.RATE_LIMITER.limit({ key });
      return success ? "ok" : "limited";
    } catch {
      console.error("contact: rate limiter error");
      return "unavailable";
    }
  }
  if (env.CONTACT_KV) {
    const bucketKey = `rl:${key}`;
    try {
      const current = await env.CONTACT_KV.get(bucketKey);
      const count = current ? parseInt(current, 10) || 0 : 0;
      if (count >= RATE_LIMIT_MAX) return "limited";
      await env.CONTACT_KV.put(bucketKey, String(count + 1), { expirationTtl: RATE_LIMIT_WINDOW });
      return "ok";
    } catch {
      console.error("contact: kv error");
      return "unavailable";
    }
  }
  return "unavailable";
}
