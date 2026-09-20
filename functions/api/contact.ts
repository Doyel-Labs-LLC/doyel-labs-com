/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Receives a JSON payload from the site's contact form and forwards it
 * to support@doyel-labs.com via the Resend HTTP API. Requires
 * `RESEND_API_KEY` to be set in the Cloudflare Pages env vars.
 *
 * The form never trusts client-side validation; every field is bounded
 * and sanity-checked here. If the endpoint is unconfigured or Resend
 * fails, the client falls back to displaying the support email and
 * phone number.
 *
 * Return shapes:
 *   200 { ok: true }
 *   400 { error: "…" }   — validation failure
 *   429 { error: "…" }   — hit a rate limit (Resend or our own)
 *   500 { error: "…" }   — misconfigured or upstream failure
 *   502 { error: "…" }   — Resend rejected the message
 */

interface Env {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string; // optional override, defaults to a doyel-labs.com sender
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
}

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

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Parse
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
  const subject = trim(raw.subject, 200) || "New message from doyel-labs.com";
  const message = trim(raw.message, 5000);

  if (!email || !looksLikeEmail(email)) {
    return j(400, { error: "A valid email is required." });
  }
  if (!message || message.length < 5) {
    return j(400, { error: "Please include a message." });
  }

  // Configured?
  const key = env.RESEND_API_KEY;
  if (!key) {
    return j(500, {
      error:
        "The contact endpoint is not configured. Please email support@doyel-labs.com directly.",
    });
  }

  const from =
    env.RESEND_FROM ||
    "Doyel Labs Website <noreply@doyel-labs.com>";

  const heading = `New message from ${name || "(no name)"} <${email}>`;
  const textBody =
    `${heading}\n` +
    `Subject: ${subject}\n\n` +
    `${message}\n\n` +
    `---\nReceived at doyel-labs.com/api/contact\n`;
  const htmlBody =
    `<p><strong>${escapeHtml(heading)}</strong></p>` +
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
        to: ["support@doyel-labs.com"],
        reply_to: email,
        subject: `[Website] ${subject}`,
        text: textBody,
        html: htmlBody,
      }),
    });
  } catch {
    return j(502, {
      error:
        "We couldn't reach the mail server. Please email support@doyel-labs.com directly.",
    });
  }

  if (resendResp.status === 429) {
    return j(429, {
      error:
        "Too many messages in a short window. Please try again in a minute.",
    });
  }
  if (!resendResp.ok) {
    return j(502, {
      error:
        "The mail server rejected the message. Please email support@doyel-labs.com directly.",
    });
  }

  return j(200, { ok: true });
};

/** Reject anything that isn't POST. */
export const onRequest: PagesFunction<Env> = async ({ request }) => {
  if (request.method === "POST") {
    return new Response(null, { status: 405 });
  }
  return new Response("Method not allowed", {
    status: 405,
    headers: { allow: "POST", "cache-control": "no-store" },
  });
};
