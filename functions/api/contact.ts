/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives a JSON payload from the site's contact form and forwards it
 * to support@doyel-labs.com via the Resend HTTP API. Requires
 * `RESEND_API_KEY` (secret) and `RESEND_FROM` (plaintext) to be set in
 * the Cloudflare Pages env vars.
 *
 * Status codes:
 *   200 { ok: true }              — sent
 *   400 { error }                 — validation failed
 *   429 { error }                 — rate limited (by Resend)
 *   500 { error, ... }            — misconfigured or upstream failure
 *
 * We deliberately avoid 502/504 status codes because Cloudflare's edge
 * replaces those with its own generic error page, discarding our JSON
 * body. 500 with a JSON body reaches the client intact.
 */

interface Env {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  /** Destination inbox for contact-form messages. Defaults to
   *  support@doyel-labs.com. Can be overridden per environment. */
  CONTACT_TO?: string;
  /** Cloudflare Turnstile secret key. If unset, token verification is
   *  skipped so local dev builds still work. */
  TURNSTILE_SECRET_KEY?: string;
  /** KV binding used to rate-limit contact submissions by IP.
   *  If missing (local dev), rate limiting is skipped. */
  CONTACT_KV?: KVNamespace;
}

/** How many submissions to allow per IP per window. */
const RATE_LIMIT_MAX = 5;
/** Rate-limit window in seconds. */
const RATE_LIMIT_WINDOW = 300; // 5 minutes

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  general: "General inquiry",
  website: "Marketing site",
  payroll: "Payroll workspace",
  custom: "Specific software idea",
  idea: "Idea — needs scoping",
  maintenance: "Existing software help",
  bai: "BAI (trading desk)",
  connectionloop: "ConnectionLoop",
  other: "Something else",
};

function j(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function trim(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function looksLikeEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  try {
    return await handleContact(ctx);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    return j(500, {
      error: "Internal error. Please email support@doyel-labs.com.",
      detail,
    });
  }
};

async function handleContact({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  let raw: ContactPayload;
  try {
    raw = (await request.json()) as ContactPayload;
  } catch {
    return j(400, { error: "Invalid JSON body." });
  }

  // Honeypot: bots often fill hidden fields. Silently accept and drop.
  if (trim(raw.website, 200)) {
    return j(200, { ok: true });
  }

  const name = trim(raw.name, 100);
  const email = trim(raw.email, 100);
  const projectTypeKey = trim(raw.projectType, 40).toLowerCase();
  const projectTypeLabel =
    PROJECT_TYPE_LABELS[projectTypeKey] || PROJECT_TYPE_LABELS.general;
  const subject = trim(raw.subject, 200) || "New message from doyel-labs.com";
  const message = trim(raw.message, 5000);

  if (!email || !looksLikeEmail(email)) {
    return j(400, { error: "A valid email is required." });
  }
  if (!message || message.length < 5) {
    return j(400, { error: "Please include a message." });
  }

  // Rate limit by IP if KV is bound. Keeps a single spam source from
  // burning through Resend's send quota.
  if (env.CONTACT_KV) {
    const clientIp = request.headers.get("cf-connecting-ip") || "unknown";
    const bucketKey = `rl:${clientIp}`;
    try {
      const current = await env.CONTACT_KV.get(bucketKey);
      const count = current ? parseInt(current, 10) || 0 : 0;
      if (count >= RATE_LIMIT_MAX) {
        return j(429, {
          error:
            "Too many messages from your IP in a short window. Please try again in a few minutes, or email support@doyel-labs.com directly.",
        });
      }
      // Increment and refresh the window TTL. TTL is set on each write, so
      // continued activity keeps the window rolling.
      await env.CONTACT_KV.put(bucketKey, String(count + 1), {
        expirationTtl: RATE_LIMIT_WINDOW,
      });
    } catch {
      // KV failure should not block the form — it just means no rate limit
      // on this request. Better to accept than to reject on a KV outage.
    }
  }

  // Verify Turnstile if configured.
  if (env.TURNSTILE_SECRET_KEY) {
    const tsToken = trim(raw.turnstileToken, 2048);
    if (!tsToken) {
      return j(400, {
        error: "Please complete the CAPTCHA challenge before sending.",
      });
    }
    try {
      const clientIp = request.headers.get("cf-connecting-ip") || "";
      const form = new URLSearchParams();
      form.set("secret", env.TURNSTILE_SECRET_KEY);
      form.set("response", tsToken);
      if (clientIp) form.set("remoteip", clientIp);
      const tsResp = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: form.toString(),
        },
      );
      const tsBody = (await tsResp.json()) as {
        success?: boolean;
        "error-codes"?: string[];
      };
      if (!tsResp.ok || !tsBody.success) {
        return j(400, {
          error: "CAPTCHA verification failed. Please refresh and try again.",
          codes: tsBody["error-codes"] || [],
        });
      }
    } catch (e) {
      return j(500, {
        error: "Could not verify the CAPTCHA. Please try again.",
        detail: e instanceof Error ? e.message : String(e),
      });
    }
  }

  const key = env.RESEND_API_KEY;
  if (!key) {
    return j(500, {
      error:
        "The contact endpoint is not configured. Please email support@doyel-labs.com directly.",
    });
  }

  const from =
    env.RESEND_FROM || "Doyel Labs Website <noreply@doyel-labs.com>";
  const to = env.CONTACT_TO || "support@doyel-labs.com";

  const heading = `New message from ${name || "(no name)"} <${email}>`;
  const textBody =
    `${heading}\n` +
    `Category: ${projectTypeLabel}\n` +
    `Subject: ${subject}\n\n` +
    `${message}\n\n` +
    `---\nReceived at doyel-labs.com/api/contact\n`;
  const htmlBody =
    `<p><strong>${escapeHtml(heading)}</strong></p>` +
    `<p><em>Category:</em> ${escapeHtml(projectTypeLabel)}</p>` +
    `<p><em>Subject:</em> ${escapeHtml(subject)}</p>` +
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>` +
    `<hr><p><small>Received at doyel-labs.com/api/contact</small></p>`;

  let resendResp: Response;
  try {
    resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Website · ${projectTypeLabel}] ${subject}`,
        text: textBody,
        html: htmlBody,
      }),
    });
  } catch (e) {
    return j(500, {
      error:
        "We couldn't reach the mail server. Please email support@doyel-labs.com directly.",
      detail: e instanceof Error ? e.message : String(e),
    });
  }

  if (resendResp.status === 429) {
    return j(429, {
      error:
        "Too many messages in a short window. Please try again in a minute.",
    });
  }
  if (!resendResp.ok) {
    let upstream = "";
    try {
      upstream = (await resendResp.text()).slice(0, 500);
    } catch {
      /* ignore */
    }
    return j(500, {
      error:
        "The mail server rejected the message. Please email support@doyel-labs.com directly.",
      status: resendResp.status,
      upstream,
    });
  }

  return j(200, { ok: true });
}

export const onRequest: PagesFunction<Env> = async ({ request }) => {
  return new Response("Method not allowed", {
    status: 405,
    headers: { allow: "POST", "cache-control": "no-store" },
  });
};
