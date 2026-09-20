import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  Page,
} from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description: `Company and per-product changelog for ${site.company}.`,
};

type Entry = { date: string; text: string };

const COMPANY: Entry[] = [
  {
    date: "2026-09-20",
    text: "Contact form rate-limited by IP via Cloudflare KV: 5 messages per 5-minute window. Prevents a single spam source from burning through Resend send quota.",
  },
  {
    date: "2026-09-20",
    text: "Mobile navigation upgraded to a proper full-screen drawer. Tap the menu icon on mobile → animated overlay with big-target links and a Contact CTA. Escape / backdrop click / link click all close it.",
  },
  {
    date: "2026-09-20",
    text: "404 page rewritten: cyan-accented, points visitors at the pages that moved when we relaunched (BAI, ConnectionLoop, payroll, websites, case study).",
  },
  {
    date: "2026-09-20",
    text: "Cloudflare Turnstile added to the contact form. Widget bound to doyel-labs.com and www.doyel-labs.com. Client-side widget renders on the modal and inline form; server-side check rejects requests without a valid token. CSP updated.",
  },
  {
    date: "2026-09-20",
    text: "Open Graph image published at /opengraph-image. 1200x630 branded PNG rendered by next/og at build time. Any link to doyel-labs.com now previews with the four-square logo, tagline, and URL band.",
  },
  {
    date: "2026-09-20",
    text: "Case study published at /case-studies/steadfast — real screenshots of the SteadFast Transportation site (home + contractors), SCA product frames, at-a-glance grid, 4-step approach.",
  },
  {
    date: "2026-09-20",
    text: "Security page rewritten in the company voice. Cyan accent, four product data maps, controls table, disclosure block, security changelog.",
  },
  {
    date: "2026-09-20",
    text: "Programs (BAI, ConnectionLoop) and Engineering pages rewritten in the company voice.",
  },
  {
    date: "2026-09-20",
    text: "Home + services + company rewritten to lead with capabilities and clients, not team size. \"Two things we sell\" framing removed. Real SteadFast screenshot inline. ClientBadge component with the SteadFast logo where SteadFast is credited (with their explicit permission).",
  },
  {
    date: "2026-09-20",
    text: "Contact form live end-to-end. POST /api/contact -> Cloudflare Pages Function -> Resend -> support@doyel-labs.com -> forwards via Google Workspace to blake@doyel-labs.com. Sender is Doyel Labs Website <noreply@doyel-labs.com> (verified domain).",
  },
  {
    date: "2026-09-20",
    text: "Cyan accent added to the design system (#10c7eb, from the icon). Canvas softened from pure #000 to #0a0f14. Four-square logo mark in header, footer, hero, and favicons.",
  },
  {
    date: "2026-09-20",
    text: "doyel-labs.com relaunched as a Doyel Labs LLC company page. BAI moved to /programs/bai and is no longer the site brand. Services is now the primary commercial surface (payroll, websites, and custom software). Cloudflare Pages deploy replaces the previous Netlify site.",
  },
];

const PAYROLL: Entry[] = [
  {
    date: "2026-09-19",
    text: "SteadFast Payroll: paystub live preview added; portal status selector (paid / pending / void); YTD auto-fill from contractor history.",
  },
  {
    date: "2026-09-15",
    text: "SCA WD auto-lookup: four-step pipeline (geocode → SAM.gov find → download → parse). Recent lookups pane on the SCA tab.",
  },
  {
    date: "2026-09-10",
    text: "Passkey enrolment and admin recovery. Password reset via one-time code, 15-minute expiry.",
  },
];

const WEBSITES: Entry[] = [
  {
    date: "2026-09-20",
    text: "Doyel Labs site itself launched on Cloudflare Pages: strict CSP, no third-party marketing scripts, static export.",
  },
  {
    date: "2026-08-01",
    text: "SteadFast Transportation Inc. site refresh: mobile nav hardened, hero video, schema.org markup, Formspree contact + contractor inquiry.",
  },
];

const BAI: Entry[] = [
  {
    date: "2026-09-07",
    text: "Desk engine and watchdog now run inside a Windows job tied to the app; a stopped app leaves no process holding the installation open.",
  },
  {
    date: "2026-09-06",
    text: "Crash reports drop any field that names positions, orders, fills, money, or quantities before they are written.",
  },
  {
    date: "2026-09-06",
    text: "Admin console shipped with a per-request nonce CSP and an address allowlist that applies before a token is typed.",
  },
];

const CL: Entry[] = [
  {
    date: "2026-09-20",
    text: "0.2.106 · Privacy policy names both voice-lists and crash-notes flows explicitly.",
  },
  {
    date: "2026-09-19",
    text: "Custom sign-in emails via Resend from noreply@connectionloop.app. Email enumeration protection ON. Password policy ON, minimum 8.",
  },
  {
    date: "2026-09-19",
    text: "Cloud Functions runtime moved to Node.js 22.",
  },
];

export default function Changelog() {
  return (
    <Page narrow>
      <section className="pt-24">
        <Eyebrow>Changelog</Eyebrow>
        <H1>What changed, in the words of the people who changed it.</H1>
        <Lead>
          The company and per-product logs. Most recent first. Every entry
          names a real change; nothing is added for marketing.
        </Lead>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          <a
            href="/changelog/rss.xml"
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            Subscribe via RSS →
          </a>
        </p>
      </section>

      <ChangelogBlock title="Company" entries={COMPANY} />
      <ChangelogBlock title="Payroll" entries={PAYROLL} />
      <ChangelogBlock title="Websites" entries={WEBSITES} />
      <ChangelogBlock title="BAI" entries={BAI} />
      <ChangelogBlock title="ConnectionLoop" entries={CL} />

      <section className="mt-24 border-t border-line pt-16">
        <Card title="Live health">
          <p>
            The status page pings the BAI control plane from your browser and
            reports what you would actually get.{" "}
            <Link
              href="/status/"
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              Open the status page
            </Link>
            .
          </p>
        </Card>
        <div className="mt-6">
          <GhostLink href="/security/" small>
            Security changes
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}

function ChangelogBlock({
  title,
  entries,
}: {
  title: string;
  entries: Entry[];
}) {
  return (
    <section className="mt-24 border-t border-line pt-16">
      <Eyebrow>{title}</Eyebrow>
      <H2>
        <span className="mt-2 block">{title} log.</span>
      </H2>
      <ul className="mt-8 space-y-4">
        {entries.map((c, i) => (
          <li
            key={i}
            className="flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-3 text-[14px]"
          >
            <span className="w-28 shrink-0 font-mono text-[11px] text-muted">
              {c.date}
            </span>
            <span className="max-w-prose text-mute">{c.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
