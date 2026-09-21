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
  /** Optional free-text field where the prospect can suggest a couple of
   *  Zoom / phone times for the one-hour orientation call. Reduces one
   *  round-trip of email tag. */
  preferredTimes?: unknown;
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
  const preferredTimes = trim(raw.preferredTimes, 500);

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

  const displayName = name || "New inquiry";
  const senderLine = name ? `${name} <${email}>` : email;
  const replyMailto = `mailto:${email}?subject=${encodeURIComponent(
    "Re: " + subject,
  )}`;
  const textBody = renderTextEmail({
    displayName,
    senderLine,
    projectTypeLabel,
    subject,
    message,
    preferredTimes,
    email,
  });
  const htmlBody = renderHtmlEmail({
    displayName,
    email,
    name,
    projectTypeLabel,
    subject,
    message,
    preferredTimes,
    replyMailto,
  });

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

/* ─────────────────────────────────────────────────────────────────
 * Email templates
 * ─────────────────────────────────────────────────────────────── */

/**
 * Plain-text email body. Renders in email clients that don't (or won't)
 * display HTML — screen readers, terminal-based mail, and users with
 * HTML-off preferences. Uses only ASCII box characters and horizontal
 * rules for structure.
 */
function renderTextEmail(v: {
  displayName: string;
  senderLine: string;
  projectTypeLabel: string;
  subject: string;
  message: string;
  /** Optional. Prospect's suggested Zoom / phone times for the
   *  one-hour orientation. Omitted from output when empty. */
  preferredTimes: string;
  email: string;
}): string {
  const rule = "─".repeat(64);
  const times = v.preferredTimes
    ? `PROPOSED ORIENTATION TIMES:\n${v.preferredTimes}\n\n${rule}\n\n`
    : "";
  return (
    `${rule}\n` +
    `  DOYEL LABS  ·  CASPER, WYOMING\n` +
    `${rule}\n\n` +
    `  [ ${v.projectTypeLabel.toUpperCase()} ]  NEW INQUIRY\n\n` +
    `  From:     ${v.senderLine}\n` +
    `  Subject:  ${v.subject}\n\n` +
    `${rule}\n\n` +
    `${v.message}\n\n` +
    `${rule}\n\n` +
    times +
    `Reply directly to this email, or send a new message to:\n` +
    `  ${v.email}\n\n` +
    `${rule}\n\n` +
    `Received at doyel-labs.com/api/contact\n` +
    `Doyel Labs LLC  ·  Casper, Wyoming  ·  https://doyel-labs.com\n`
  );
}

/**
 * HTML email body. Table-based layout with inline styles for maximum
 * email-client compatibility (Gmail, Apple Mail, Outlook, Fastmail,
 * Superhuman, etc.). Dark palette matches the site brand. Logo image
 * is hosted at doyel-labs.com and cached publicly. Reply button uses
 * a mailto: link so the recipient can hit reply with the subject
 * pre-filled.
 */
function renderHtmlEmail(v: {
  displayName: string;
  email: string;
  name: string;
  projectTypeLabel: string;
  subject: string;
  message: string;
  /** Optional. Rendered as its own labelled block above the reply CTA
   *  so it's easy to spot in the inbox when scheduling. */
  preferredTimes: string;
  replyMailto: string;
}): string {
  const bodyMessage = escapeHtml(v.message).replace(/\n/g, "<br>");
  const headingName = v.name
    ? `New message from ${escapeHtml(v.name)}`
    : "New inquiry";
  const replyLabel = v.name
    ? `Reply to ${escapeHtml(v.name.split(/\s+/)[0])}`
    : "Reply";
  const preferredTimesBlock = v.preferredTimes
    ? `
          <tr>
            <td style="padding:0 32px 24px;">
              <div style="border:1px solid rgba(16,199,235,0.35);background:rgba(16,199,235,0.06);padding:16px 20px;">
                <p style="margin:0;font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.10em;text-transform:uppercase;color:#10c7eb;">
                  Suggested orientation times
                </p>
                <p style="margin:8px 0 0;font-size:14px;line-height:1.6;color:#f0f0fa;">
                  ${escapeHtml(v.preferredTimes).replace(/\n/g, "<br>")}
                </p>
              </div>
            </td>
          </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${escapeHtml(headingName)}</title>
</head>
<body style="margin:0;padding:0;background:#0a0f14;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#f0f0fa;-webkit-font-smoothing:antialiased;">
  <!-- Preheader (hidden preview text) -->
  <div style="display:none;font-size:1px;color:#0a0f14;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${escapeHtml(v.projectTypeLabel)} · ${escapeHtml(v.subject)}
  </div>

  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0a0f14;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#12181f;border:1px solid rgba(240,240,250,0.10);">

          <!-- Header: logo + wordmark -->
          <tr>
            <td style="padding:28px 32px 20px;border-bottom:1px solid rgba(240,240,250,0.10);">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:14px;">
                    <img src="https://doyel-labs.com/apple-touch-icon.png" width="44" height="44" alt="Doyel Labs" style="display:block;border-radius:6px;">
                  </td>
                  <td style="vertical-align:middle;">
                    <div style="font-size:15px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#f0f0fa;line-height:1;">Doyel Labs</div>
                    <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(240,240,250,0.44);margin-top:5px;line-height:1;">Casper, Wyoming</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Category chip -->
          <tr>
            <td style="padding:28px 32px 12px;">
              <span style="display:inline-block;font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#10c7eb;border:1px solid rgba(16,199,235,0.35);padding:6px 12px;">
                ${escapeHtml(v.projectTypeLabel)}
              </span>
            </td>
          </tr>

          <!-- Heading + sender line + subject -->
          <tr>
            <td style="padding:0 32px 24px;">
              <h1 style="margin:0;font-size:26px;font-weight:600;line-height:1.2;color:#f0f0fa;letter-spacing:-0.01em;">
                ${escapeHtml(headingName)}
              </h1>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:16px;">
                <tr>
                  <td style="padding:4px 0;font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.10em;text-transform:uppercase;color:rgba(240,240,250,0.44);width:70px;vertical-align:top;">From</td>
                  <td style="padding:4px 0;font-size:14px;color:#f0f0fa;">
                    <a href="mailto:${escapeHtml(v.email)}" style="color:#10c7eb;text-decoration:none;">${escapeHtml(v.email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.10em;text-transform:uppercase;color:rgba(240,240,250,0.44);width:70px;vertical-align:top;">Subject</td>
                  <td style="padding:4px 0;font-size:14px;color:#f0f0fa;">${escapeHtml(v.subject)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message body -->
          <tr>
            <td style="padding:0 32px 32px;">
              <div style="border-left:2px solid #10c7eb;background:rgba(16,199,235,0.08);padding:18px 22px;font-size:15px;line-height:1.65;color:#f0f0fa;">
                ${bodyMessage}
              </div>
            </td>
          </tr>${preferredTimesBlock}

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 32px 36px;">
              <a href="${escapeHtml(v.replyMailto)}" style="display:inline-block;background:rgba(16,199,235,0.10);border:1px solid #10c7eb;color:#10c7eb;padding:13px 26px;font-size:13px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;text-decoration:none;">
                ${replyLabel} →
              </a>
              <span style="display:inline-block;padding:13px 12px;font-size:12px;color:rgba(240,240,250,0.44);">
                or hit Reply on this email
              </span>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid rgba(240,240,250,0.10);">
              <p style="margin:0;font-family:'JetBrains Mono',Consolas,'Courier New',monospace;font-size:10px;letter-spacing:0.10em;text-transform:uppercase;color:rgba(240,240,250,0.44);">
                Received at doyel-labs.com/api/contact
              </p>
              <p style="margin:10px 0 0;font-size:12px;color:rgba(240,240,250,0.66);">
                Doyel Labs LLC · Casper, Wyoming · <a href="https://doyel-labs.com" style="color:#10c7eb;text-decoration:none;">doyel-labs.com</a>
              </p>
            </td>
          </tr>

        </table>

        <!-- Below-card meta -->
        <p style="margin:16px 0 0;font-size:11px;color:rgba(240,240,250,0.44);font-family:'JetBrains Mono',Consolas,'Courier New',monospace;letter-spacing:0.06em;">
          Delivered to support@doyel-labs.com
        </p>

      </td>
    </tr>
  </table>
</body>
</html>`;
}
