/**
 * Email templates for the contact form (functions/api/contact.ts).
 *
 * Two emails, one look — the site's warm light palette:
 *   1. Notification to support@ with the visitor's message.
 *   2. An automatic receipt to the visitor. It never repeats what they
 *      wrote (so the form can't be used to send arbitrary text to a
 *      stranger) and only greets them by first name when it looks like one.
 *
 * Runs inside a Worker, so this file must not import anything that
 * touches `process` or the DOM. Company facts are repeated here on
 * purpose; keep them in step with src/lib/site.ts.
 */
import { response } from "./offer";

const brand = {
  company: "Doyel Labs LLC",
  short: "Doyel Labs",
  city: "Casper, Wyoming",
  url: "https://doyel-labs.com",
  phone: "(307) 429-0389",
  phoneHref: "tel:+13074290389",
  hours: "Monday–Friday, 9 a.m.–6 p.m. Mountain",
  logo: "https://doyel-labs.com/apple-touch-icon.png",
} as const;

// Matches tailwind.config.ts.
const c = {
  bg: "#f6eee2",
  surface: "#fffaf2",
  soft: "#f1e7d8",
  ink: "#1b1f26",
  mute: "#4a4d53",
  muted: "#626469",
  line: "#e7e1d8",
  accent: "#087187",
  accentSoft: "#e6f0f2",
  warm: "#f2b455",
  warmSoft: "#fcf0dc",
} as const;

const serif = "Georgia,'Times New Roman',Times,serif";
const sans = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** First name for a greeting, or "" if the name doesn't look like one. */
export function safeFirstName(name: string): string {
  const first = (name || "").trim().split(/\s+/)[0] || "";
  return /^\p{L}[\p{L}'’-]{0,39}$/u.test(first) ? first : "";
}

export type NotificationVars = {
  name: string;
  email: string;
  projectTypeLabel: string;
  subject: string;
  message: string;
  preferredTimes: string;
};

/* ───────────────────────── Shared shell ───────────────────────── */

function shell({ title, preheader, body, footer }: { title: string; preheader: string; body: string; footer: string }): string {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light">
<title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:${c.bg};font-family:${sans};color:${c.ink};-webkit-font-smoothing:antialiased;">
<div style="display:none;font-size:1px;line-height:1px;color:${c.bg};max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${c.bg};"><tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;">
<tr><td style="padding:0 8px 20px;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr>
    <td style="vertical-align:middle;padding-right:12px;"><img src="${brand.logo}" width="36" height="36" alt="" style="display:block;border-radius:10px;"></td>
    <td style="vertical-align:middle;font-family:${serif};font-size:19px;line-height:1;color:${c.ink};">${brand.short}</td>
  </tr></table>
</td></tr>
<tr><td style="background:${c.surface};border:1px solid ${c.line};border-radius:20px;padding:32px 28px 30px;">
  <div style="width:36px;height:3px;background:${c.warm};border-radius:3px;font-size:0;line-height:0;">&nbsp;</div>
  ${body}
</td></tr>
<tr><td style="padding:24px 8px 0;font-size:13px;line-height:1.6;color:${c.muted};">
  ${footer}
  <p style="margin:12px 0 0;">${brand.company} · ${brand.city} · <a href="${brand.url}" style="color:${c.accent};text-decoration:none;">doyel-labs.com</a></p>
</td></tr>
</table></td></tr></table></body></html>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;"><tr>
<td style="border-radius:999px;background:${c.accent};"><a href="${escapeHtml(href)}" style="display:inline-block;padding:14px 26px;font-family:${sans};font-size:15px;font-weight:600;line-height:1;color:#ffffff;text-decoration:none;border-radius:999px;">${escapeHtml(label)}</a></td>
</tr></table>`;
}

function h1(text: string): string {
  return `<h1 style="margin:18px 0 0;font-family:${serif};font-size:27px;font-weight:normal;line-height:1.25;letter-spacing:-0.01em;color:${c.ink};">${escapeHtml(text)}</h1>`;
}

function p(html: string, extra = ""): string {
  return `<p style="margin:16px 0 0;font-size:16px;line-height:1.65;color:${c.mute};${extra}">${html}</p>`;
}

const nl2br = (s: string) => escapeHtml(s).replace(/\r?\n/g, "<br>");

/* ───────────────────────── 1. Notification ───────────────────────── */

export function renderNotificationHtml(v: NotificationVars & { replyMailto: string }): string {
  const first = safeFirstName(v.name);
  const heading = v.name ? `New message from ${v.name}` : "New message from the website";
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;width:72px;vertical-align:top;font-size:13px;color:${c.muted};">${label}</td><td style="padding:6px 0;font-size:15px;color:${c.ink};">${value}</td></tr>`;

  const times = v.preferredTimes
    ? `<div style="margin-top:16px;background:${c.warmSoft};border-radius:14px;padding:16px 20px;">
  <p style="margin:0;font-size:13px;font-weight:600;color:${c.ink};">Suggested call times</p>
  <p style="margin:6px 0 0;font-size:15px;line-height:1.6;color:${c.ink};">${nl2br(v.preferredTimes)}</p>
</div>`
    : "";

  const body = `
  <p style="margin:18px 0 0;"><span style="display:inline-block;background:${c.accentSoft};color:${c.accent};border-radius:999px;padding:6px 12px;font-size:13px;font-weight:600;line-height:1;">${escapeHtml(v.projectTypeLabel)}</span></p>
  ${h1(heading)}
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:18px;">
    ${row("From", `<a href="mailto:${escapeHtml(v.email)}" style="color:${c.accent};text-decoration:none;">${escapeHtml(v.email)}</a>`)}
    ${row("Subject", escapeHtml(v.subject))}
  </table>
  <div style="margin-top:20px;background:${c.soft};border-radius:14px;padding:20px 22px;font-size:16px;line-height:1.65;color:${c.ink};">${nl2br(v.message)}</div>
  ${times}
  ${button(v.replyMailto, first ? `Reply to ${first}` : "Reply")}
  ${p(`They were told a person will reply ${response.window}.`, `font-size:14px;color:${c.muted};`)}`;

  return shell({
    title: heading,
    preheader: `${v.projectTypeLabel} · ${v.subject}`,
    body,
    footer: `<p style="margin:0;">Sent from the contact form at doyel-labs.com. Hitting Reply goes straight to the visitor.</p>`,
  });
}

export function renderNotificationText(v: NotificationVars): string {
  const sender = v.name ? `${v.name} <${v.email}>` : v.email;
  const times = v.preferredTimes ? `Suggested call times:\n${v.preferredTimes}\n\n` : "";
  return (
    `New message from the website · ${v.projectTypeLabel}\n\n` +
    `From:    ${sender}\nSubject: ${v.subject}\n\n` +
    `${v.message}\n\n${times}` +
    `Reply to this email to answer them. They were told a person will reply ${response.window}.\n\n` +
    `— ${brand.company} · ${brand.city} · ${brand.url}\n`
  );
}

/* ───────────────────────── 2. Receipt to the visitor ───────────────────────── */

export const receiptSubject = "We have your message — Doyel Labs";

export function renderReceiptHtml(v: { name: string }): string {
  const first = safeFirstName(v.name);
  const heading = first ? `Thank you, ${first}. We have your message.` : "Thank you. We have your message.";
  const step = (n: string, text: string) =>
    `<tr><td style="padding:8px 14px 8px 0;vertical-align:top;width:28px;"><div style="width:28px;height:28px;border-radius:999px;background:${c.warmSoft};color:${c.ink};font-family:${serif};font-size:14px;line-height:28px;text-align:center;">${n}</div></td><td style="padding:12px 0 8px;font-size:15px;line-height:1.55;color:${c.ink};">${text}</td></tr>`;

  const body = `
  ${h1(heading)}
  ${p(`Your note reached ${brand.short}. A person — not a chatbot — will read it and reply ${response.window}, ${response.usually}.`)}
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:22px;">
    ${step("1", "A person reads what you wrote.")}
    ${step("2", "We reply by email with an answer or a time to talk.")}
    ${step("3", "No pressure and no sales sequence. If it isn’t a fit, we’ll say so.")}
  </table>
  ${p(`Need us sooner? The phone is answered ${brand.hours}.`)}
  ${button(brand.phoneHref, `Call ${brand.phone}`)}`;

  return shell({
    title: heading,
    preheader: `A person will reply ${response.window}.`,
    body,
    footer: `<p style="margin:0;">This is an automatic receipt. Reply to it any time and it goes to a person. If you didn’t use the contact form at doyel-labs.com, you can ignore this email — we won’t send anything else.</p>`,
  });
}

export function renderReceiptText(v: { name: string }): string {
  const first = safeFirstName(v.name);
  return (
    `${first ? `Thank you, ${first}.` : "Thank you."} We have your message.\n\n` +
    `Your note reached ${brand.short}. A person — not a chatbot — will read it and reply ${response.window}, ${response.usually}.\n\n` +
    `What happens next:\n` +
    `  1. A person reads what you wrote.\n` +
    `  2. We reply by email with an answer or a time to talk.\n` +
    `  3. No pressure and no sales sequence. If it isn't a fit, we'll say so.\n\n` +
    `Need us sooner? Call ${brand.phone}, ${brand.hours}.\n\n` +
    `This is an automatic receipt. Reply to it any time and it goes to a person. ` +
    `If you didn't use the contact form at doyel-labs.com, you can ignore this email — we won't send anything else.\n\n` +
    `— ${brand.company} · ${brand.city} · ${brand.url}\n`
  );
}
