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
 *      is missing. Production tokens must be minted for doyel-labs.com.
 *   5. Per-IP and per-email rate limits, counted only after Turnstile
 *      passes. Uses the Cloudflare Rate Limiting binding when present,
 *      KV otherwise. Fails CLOSED on every Pages deployment if neither
 *      binding exists.
 *   6. Resend delivery with a 5 s timeout.
 *
 * Errors return a generic message only. Upstream details are logged to
 * the Pages Function log, never to the client.
 *
 * Status codes: 200 sent · 400 invalid · 403 origin/CAPTCHA · 405 method
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
  /** Fallback: KV namespace for a best-effort per-IP counter. */
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
    text: renderTextEmail({ ...c, projectTypeLabel, subject }),
    html: renderHtmlEmail({ ...c, projectTypeLabel, subject, replyMailto }),
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
    // Status only. The upstream body can echo the message, address, or subject.
    await resendResp.body?.cancel();
    console.error("contact: resend rejected", resendResp.status);
    return j(500, { error: GENERIC.internal });
  }
  return j(200, { ok: true });
}

async function emailRateKey(email: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email.trim().toLowerCase()));
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `em:${hex}`;
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
    if (!turnstileHostAllowed(body.hostname, production)) {
      console.warn("contact: turnstile hostname mismatch");
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

/* ───────────────────────── Email templates ───────────────────────── */

type EmailVars = {
  name: string;
  email: string;
  projectTypeLabel: string;
  subject: string;
  message: string;
  preferredTimes: string;
};

function renderTextEmail(v: EmailVars): string {
  const rule = "─".repeat(64);
  const sender = v.name ? `${v.name} <${v.email}>` : v.email;
  const times = v.preferredTimes ? `PROPOSED CALL TIMES:\n${v.preferredTimes}\n\n${rule}\n\n` : "";
  return (
    `${rule}\n  DOYEL LABS  ·  CASPER, WYOMING\n${rule}\n\n` +
    `  [ ${v.projectTypeLabel.toUpperCase()} ]  NEW MESSAGE\n\n` +
    `  From:     ${sender}\n  Subject:  ${v.subject}\n\n${rule}\n\n` +
    `${v.message}\n\n${rule}\n\n${times}` +
    `Reply directly to this email.\n\nReceived at doyel-labs.com/api/contact\n` +
    `Doyel Labs LLC  ·  Casper, Wyoming  ·  https://doyel-labs.com\n`
  );
}

function renderHtmlEmail(v: EmailVars & { replyMailto: string }): string {
  const bodyMessage = escapeHtml(v.message).replace(/\n/g, "<br>");
  const heading = v.name ? `New message from ${v.name}` : "New message";
  const replyLabel = v.name ? `Reply to ${v.name.split(/\s+/)[0]}` : "Reply";
  const timesBlock = v.preferredTimes
    ? `<tr><td style="padding:0 32px 24px;"><div style="border:1px solid rgba(16,199,235,0.35);background:rgba(16,199,235,0.06);padding:16px 20px;">
        <p style="margin:0;font-family:Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.10em;text-transform:uppercase;color:#10c7eb;">Suggested call times</p>
        <p style="margin:8px 0 0;font-size:14px;line-height:1.6;color:#f0f0fa;">${escapeHtml(v.preferredTimes).replace(/\n/g, "<br>")}</p>
      </div></td></tr>`
    : "";
  const mono = "font-family:Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.10em;text-transform:uppercase;color:rgba(240,240,250,0.5);";

  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>${escapeHtml(heading)}</title></head>
<body style="margin:0;padding:0;background:#0a0f14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#f0f0fa;">
<div style="display:none;font-size:1px;color:#0a0f14;max-height:0;overflow:hidden;">${escapeHtml(v.projectTypeLabel)} · ${escapeHtml(v.subject)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0a0f14;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#12181f;border:1px solid rgba(240,240,250,0.10);">
<tr><td style="padding:28px 32px 20px;border-bottom:1px solid rgba(240,240,250,0.10);">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
    <td style="vertical-align:middle;padding-right:14px;"><img src="https://doyel-labs.com/apple-touch-icon.png" width="44" height="44" alt="" style="display:block;border-radius:6px;"></td>
    <td style="vertical-align:middle;"><div style="font-size:15px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#f0f0fa;line-height:1;">Doyel Labs</div>
    <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(240,240,250,0.5);margin-top:5px;line-height:1;">Casper, Wyoming</div></td>
  </tr></table></td></tr>
<tr><td style="padding:28px 32px 12px;"><span style="display:inline-block;${mono}color:#10c7eb;border:1px solid rgba(16,199,235,0.35);padding:6px 12px;font-size:11px;">${escapeHtml(v.projectTypeLabel)}</span></td></tr>
<tr><td style="padding:0 32px 24px;">
  <h1 style="margin:0;font-size:24px;font-weight:600;line-height:1.2;color:#f0f0fa;">${escapeHtml(heading)}</h1>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:16px;">
    <tr><td style="padding:4px 0;${mono}width:70px;vertical-align:top;">From</td><td style="padding:4px 0;font-size:14px;"><a href="mailto:${encodeURIComponent(v.email)}" style="color:#10c7eb;text-decoration:none;">${escapeHtml(v.email)}</a></td></tr>
    <tr><td style="padding:4px 0;${mono}width:70px;vertical-align:top;">Subject</td><td style="padding:4px 0;font-size:14px;color:#f0f0fa;">${escapeHtml(v.subject)}</td></tr>
  </table></td></tr>
<tr><td style="padding:0 32px 32px;"><div style="border-left:2px solid #10c7eb;background:rgba(16,199,235,0.08);padding:18px 22px;font-size:15px;line-height:1.65;color:#f0f0fa;">${bodyMessage}</div></td></tr>${timesBlock}
<tr><td style="padding:0 32px 36px;"><a href="${escapeHtml(v.replyMailto)}" style="display:inline-block;background:rgba(16,199,235,0.10);border:1px solid #10c7eb;color:#10c7eb;padding:13px 26px;font-size:13px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;">${escapeHtml(replyLabel)} →</a>
  <span style="display:inline-block;padding:13px 12px;font-size:12px;color:rgba(240,240,250,0.5);">or hit Reply on this email</span></td></tr>
<tr><td style="padding:20px 32px 28px;border-top:1px solid rgba(240,240,250,0.10);"><p style="margin:0;${mono}">Received at doyel-labs.com/api/contact</p>
  <p style="margin:10px 0 0;font-size:12px;color:rgba(240,240,250,0.66);">Doyel Labs LLC · Casper, Wyoming · <a href="https://doyel-labs.com" style="color:#10c7eb;text-decoration:none;">doyel-labs.com</a></p></td></tr>
</table></td></tr></table></body></html>`;
}
