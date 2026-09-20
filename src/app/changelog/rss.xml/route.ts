/**
 * RSS feed of the company + product changelog.
 *
 * Served at /changelog/rss.xml. Static — Next.js pre-renders once at
 * build time and Cloudflare Pages serves the resulting file. Subscribers
 * can plug the URL into any RSS reader; when we ship a new entry we
 * rebuild and their reader picks up the update on next poll.
 */
import { site } from "@/lib/site";

export const dynamic = "force-static";

type Entry = { date: string; text: string };

const COMPANY: Entry[] = [
  { date: "2026-09-20", text: "Contact form rate-limited by IP via Cloudflare KV: 5 messages per 5-minute window." },
  { date: "2026-09-20", text: "Mobile navigation upgraded to a proper full-screen drawer." },
  { date: "2026-09-20", text: "404 page rewritten with helpful destination cards." },
  { date: "2026-09-20", text: "Cloudflare Turnstile added to the contact form." },
  { date: "2026-09-20", text: "Open Graph image published at /opengraph-image." },
  { date: "2026-09-20", text: "Case study published at /case-studies/steadfast." },
  { date: "2026-09-20", text: "Security page rewritten in the company voice." },
  { date: "2026-09-20", text: "Programs and Engineering pages rewritten in the company voice." },
  { date: "2026-09-20", text: "Home + services + company rewritten to lead with capabilities and clients, not team size." },
  { date: "2026-09-20", text: "Contact form live end-to-end via Resend + Google Workspace." },
  { date: "2026-09-20", text: "Cyan accent added to the design system; four-square logo mark introduced." },
  { date: "2026-09-20", text: "doyel-labs.com relaunched as a Doyel Labs LLC company page." },
];

const PAYROLL: Entry[] = [
  { date: "2026-09-19", text: "SteadFast Payroll: paystub live preview added; portal status selector; YTD auto-fill from contractor history." },
  { date: "2026-09-15", text: "SCA WD auto-lookup: four-step pipeline. Recent lookups pane on the SCA tab." },
  { date: "2026-09-10", text: "Passkey enrolment and admin recovery. Password reset via one-time code, 15-minute expiry." },
];

const WEBSITES: Entry[] = [
  { date: "2026-09-20", text: "Doyel Labs site launched on Cloudflare Pages: strict CSP, no third-party marketing scripts, static export." },
  { date: "2026-08-01", text: "SteadFast Transportation Inc. site refresh: mobile nav hardened, hero video, schema.org markup, Formspree contact + contractor inquiry." },
];

const BAI: Entry[] = [
  { date: "2026-09-07", text: "Desk engine and watchdog now run inside a Windows job tied to the app." },
  { date: "2026-09-06", text: "Crash reports drop any field that names positions, orders, fills, money, or quantities before they are written." },
  { date: "2026-09-06", text: "Admin console shipped with per-request nonce CSP and address allowlist." },
];

const CL: Entry[] = [
  { date: "2026-09-20", text: "0.2.106: privacy policy names voice-lists and crash-notes flows explicitly." },
  { date: "2026-09-19", text: "Custom sign-in emails via Resend. Email enumeration protection ON. Password policy ON, minimum 8." },
  { date: "2026-09-19", text: "Cloud Functions runtime moved to Node.js 22." },
];

const ALL: Array<Entry & { section: string }> = [
  ...COMPANY.map((e) => ({ ...e, section: "Company" })),
  ...PAYROLL.map((e) => ({ ...e, section: "Payroll" })),
  ...WEBSITES.map((e) => ({ ...e, section: "Websites" })),
  ...BAI.map((e) => ({ ...e, section: "BAI" })),
  ...CL.map((e) => ({ ...e, section: "ConnectionLoop" })),
].sort((a, b) => (a.date < b.date ? 1 : -1));

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(dateISO: string): string {
  // dateISO is YYYY-MM-DD. Emit as RFC 822 at noon UTC.
  return new Date(`${dateISO}T12:00:00Z`).toUTCString();
}

export async function GET() {
  const base = `https://${site.domain}`;
  const now = rfc822(new Date().toISOString().slice(0, 10));

  const items = ALL.map((e, i) => {
    const guid = `${base}/changelog/#${e.date}-${i}`;
    return `    <item>
      <title>[${escape(e.section)}] ${escape(e.text.slice(0, 100))}${e.text.length > 100 ? "…" : ""}</title>
      <description>${escape(e.text)}</description>
      <link>${base}/changelog/</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${rfc822(e.date)}</pubDate>
      <category>${escape(e.section)}</category>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.company)} — Changelog</title>
    <link>${base}/changelog/</link>
    <description>Company and per-product changelog for ${escape(site.company)}.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${base}/changelog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
