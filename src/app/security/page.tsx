import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  Eyebrow,
  GhostLink,
  Grid2,
  Grid3,
  H1,
  H2,
  Lead,
  MetaRow,
  Page,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description: `${site.company} security posture — how we build, what we hold, how to report a vulnerability.`,
};

/**
 * Four product data maps + a controls table + a security changelog.
 * Written in the v4 voice: sentence-case body, cyan accent, no
 * "aerospace-lab" language.
 */
const CONTROLS = [
  {
    area: "Passwords",
    control:
      "PBKDF2-SHA256 hashing on the payroll workspace, Argon2id on BAI account services. Minimum 12 characters. Rate-limited attempts.",
    means:
      "A stolen database does not give up passwords, and a leaked password from elsewhere is refused.",
  },
  {
    area: "Passkeys",
    control:
      "Optional WebAuthn passkey enrolment on payroll and BAI accounts.",
    means:
      "A password alone is not the only path in. A hardware-bound key is available.",
  },
  {
    area: "Sessions",
    control:
      "Short-lived signed access tokens; rotating refresh tokens bound to one device. ConnectionLoop stores its session in the OS keychain.",
    means:
      "A copied token dies in minutes. A replayed refresh token kills the whole family and emails you.",
  },
  {
    area: "Broker credentials (BAI)",
    control:
      "Kept only on the operator's computer in Windows Credential Manager. Never sent to Doyel Labs.",
    means:
      "Our servers cannot place an order at your broker. A breach on our side cannot reach your brokerage account.",
  },
  {
    area: "Bank details (Payroll)",
    control:
      "Bank routing and account numbers are not stored on Doyel Labs servers at all. The operator pays through their own bank.",
    means:
      "There is nothing on our side that can move a wage, and nothing to steal that would.",
  },
  {
    area: "Contact form (this site)",
    control:
      "POSTs to /api/contact, a Cloudflare Pages Function that verifies a Turnstile challenge, then relays via Resend to support@doyel-labs.com.",
    means:
      "Bots are filtered before they reach our mail server. The visitor never talks to our inbox directly.",
  },
  {
    area: "Updates",
    control:
      "BAI updates are signed and refused mid-trade. The website ships as static assets on Cloudflare Pages with no server runtime.",
    means:
      "No unsigned code runs on your machine. Nothing lands mid-trade.",
  },
  {
    area: "Payments",
    control:
      "Card details go to Stripe's pages when a paid program subscribes. We hold a customer id and a status.",
    means: "We never see or store a card number.",
  },
  {
    area: "Web pages",
    control:
      "Strict content-security policy on every page. HSTS with preload. Frame-ancestors 'none'. Only Plausible and Cloudflare Turnstile are allowed as third-party hosts. No session replay, no marketing pixels.",
    means:
      "An injected string on any of our pages renders as text and cannot run. Analytics is coarse and cookieless.",
  },
  {
    area: "Logs",
    control:
      "Structured logs with a redaction pass tested in CI. Payroll audit retention 180 days. Crash reports opt-in and scrubbed twice.",
    means:
      "Secrets, addresses, and account numbers do not end up in a log line.",
  },
  {
    area: "Audit",
    control:
      "Every sign-in, device change, billing event, rate change, armed session, and staff action leaves an audit row.",
    means: "Anything done to your account can be traced.",
  },
] as const;

const PAYROLL_MAP = {
  yes: [
    "Contractor register (name, title, state, WD, contract, day rate)",
    "SSN stored encrypted at rest",
    "Pay-run drafts and generated stubs",
    "Audit log rows (paystub generated, emailed, blocked)",
    "Password hash (PBKDF2), passkey metadata, session tokens",
    "Netlify Blobs storage scoped to the operator; 180-day audit retention",
  ],
  no: [
    "Bank routing or account numbers",
    "Contractor wages as a movable balance",
    "Federal, state, or local tax returns",
    "Card numbers",
    "Any SSN in plaintext logs, emails, or exports",
  ],
};

const BAI_MAP = {
  yes: [
    "Your email address and password hash",
    "Devices that signed in and when",
    "Subscription status and Stripe customer id",
    "Which legal documents you accepted and when",
    "Crash reports (only if you turned them on, identifying details removed)",
  ],
  no: [
    "Broker usernames, passwords, tokens, or API keys",
    "Positions, orders, fills, or account values",
    "Market-data keys",
    "Card numbers",
    "The contents of the research chat",
  ],
};

const CONNECTIONLOOP_MAP = {
  yes: [
    "Auth email, display name, avatar reference",
    "Space membership rows and invite codes (hashed, not the family name)",
    "Events, comments, photos, messages, lists, notes — inside a Space",
    "Push notifications by kind and id (no content)",
    "Crash notes, scrubbed twice, only when the person turned that on",
  ],
  no: [
    "Other people's emails, ever rendered in the UI",
    "Voice-list transcript bodies (beyond the single Google STT call)",
    "Any content in a log line",
    "A public feed or friends-of-friends graph",
    "Cross-Space discovery",
  ],
};

const WEBSITES_MAP = {
  yes: [
    "Static HTML, CSS, JavaScript on Cloudflare Pages",
    "Plausible Analytics — cookieless, no personal data — when the operator enables it",
    "Cloudflare Turnstile for form CAPTCHA on doyel-labs.com",
    "Forms wired to the operator's own inbox (Formspree, Resend, or similar), if the site takes forms",
  ],
  no: [
    "Session-replay tools (Clarity, FullStory, Hotjar, LogRocket) — refused across the board",
    "Google Analytics, Meta Pixel, or any advertising cookie",
    "Server-side runtime that Doyel Labs can push mutations to",
    "Personal data on Doyel Labs servers — visitor data goes to the operator's chosen tools",
  ],
};

const CHANGES = [
  {
    date: "2026-09-20",
    text: "Cloudflare Turnstile added to the contact form. Third-party script host allowlist in the CSP updated to include challenges.cloudflare.com.",
  },
  {
    date: "2026-09-20",
    text: "Contact form live end-to-end. Sends from noreply@doyel-labs.com (verified in Resend) to support@doyel-labs.com. RESEND_API_KEY stored as an encrypted Pages secret.",
  },
  {
    date: "2026-09-20",
    text: "doyel-labs.com relaunched. Strict CSP, HSTS with preload, no third-party marketing scripts. Plausible-only for analytics.",
  },
  {
    date: "2026-09-19",
    text: "ConnectionLoop 0.2.106: privacy policy names voice-lists and crash-notes flows explicitly. Password policy on. Email enumeration protection on.",
  },
  {
    date: "2026-09-07",
    text: "BAI desk engine and watchdog now run inside a Windows job tied to the app. A stopped app leaves no process holding the installation open.",
  },
  {
    date: "2026-09-06",
    text: "BAI crash reports drop any field that names positions, orders, fills, money, or quantities before they are written.",
  },
];

export default function Security() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          If a claim here is unclear, write to{" "}
          <a
            href={`mailto:${site.securityEmail}`}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            {site.securityEmail}
          </a>
          .
        </MetaRow>
      }
    >
      {/* HERO */}
      <section className="hero-glow pt-24 md:pt-32">
        <Eyebrow>Security</Eyebrow>
        <H1>
          What stays on <span className="text-accent">your</span> machine, and what we hold.
        </H1>
        <Lead>
          The design starts from one rule: the thing that can spend money
          lives on your machine, and the thing we run in the cloud cannot
          spend it. Everything below follows from that.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostLink href="#controls" small>
            Controls table
          </GhostLink>
          <GhostLink
            href={`mailto:${site.securityEmail}`}
            small
            external
          >
            Report a vulnerability
          </GhostLink>
        </div>
      </section>

      {/* Data maps — Payroll */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Payroll data map</Eyebrow>
          <H2>
            <span className="mt-2 block">Held and never held — payroll.</span>
          </H2>
        </div>
        <div className="mt-10">
          <Grid2>
            <Card title="What we hold" accent>
              <ul className="list-disc space-y-1 pl-4">
                {PAYROLL_MAP.yes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Card>
            <Card title="What we never hold">
              <ul className="list-disc space-y-1 pl-4">
                {PAYROLL_MAP.no.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Card>
          </Grid2>
        </div>
      </section>

      {/* Data maps — BAI */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>BAI data map</Eyebrow>
          <H2>
            <span className="mt-2 block">Held and never held — BAI.</span>
          </H2>
        </div>
        <div className="mt-10">
          <Grid2>
            <Card title="What we hold" accent>
              <ul className="list-disc space-y-1 pl-4">
                {BAI_MAP.yes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Card>
            <Card title="What we never hold">
              <ul className="list-disc space-y-1 pl-4">
                {BAI_MAP.no.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Card>
          </Grid2>
        </div>
      </section>

      {/* Data maps — ConnectionLoop */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>ConnectionLoop data map</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Held and never held — ConnectionLoop.
            </span>
          </H2>
        </div>
        <div className="mt-10">
          <Grid2>
            <Card title="What we hold" accent>
              <ul className="list-disc space-y-1 pl-4">
                {CONNECTIONLOOP_MAP.yes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Card>
            <Card title="What we never hold">
              <ul className="list-disc space-y-1 pl-4">
                {CONNECTIONLOOP_MAP.no.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Card>
          </Grid2>
        </div>
      </section>

      {/* Data maps — Websites */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Websites data map</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Held and never held — websites we build.
            </span>
          </H2>
        </div>
        <div className="mt-10">
          <Grid2>
            <Card title="What ships" accent>
              <ul className="list-disc space-y-1 pl-4">
                {WEBSITES_MAP.yes.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Card>
            <Card title="What does not ship">
              <ul className="list-disc space-y-1 pl-4">
                {WEBSITES_MAP.no.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Card>
          </Grid2>
        </div>
      </section>

      {/* Controls */}
      <section id="controls" className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Controls</Eyebrow>
          <H2>
            <span className="mt-2 block">Specifically.</span>
          </H2>
        </div>
        <div className="mt-8 overflow-x-auto border border-line">
          <table className="w-full text-[13px]">
            <thead className="bg-surface text-left font-mono text-[10px] uppercase tracking-wide text-muted">
              <tr>
                <th className="border-b border-line px-4 py-3">Area</th>
                <th className="border-b border-line px-4 py-3">In place</th>
                <th className="border-b border-line px-4 py-3">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {CONTROLS.map((c) => (
                <tr key={c.area} className="border-t border-line align-top">
                  <td className="px-4 py-3 text-ink">{c.area}</td>
                  <td className="px-4 py-3 text-mute">{c.control}</td>
                  <td className="px-4 py-3 text-mute">{c.means}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Disclosure + account compromise */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Reporting</Eyebrow>
          <H2>
            <span className="mt-2 block">Found something?</span>
          </H2>
        </div>
        <div className="mt-10">
          <Grid2>
            <Card title="Report a vulnerability" accent>
              Write to{" "}
              <a
                href={`mailto:${site.securityEmail}`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.securityEmail}
              </a>
              . Tell us what you found and how to reproduce it. We answer
              within two business days, fix confirmed issues before
              disclosing them, and credit reporters who want it. Machine-readable
              policy at{" "}
              <a
                href="/.well-known/security.txt"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /.well-known/security.txt
              </a>
              .
            </Card>
            <Card title="If your account is compromised">
              Sign out everywhere from the app, change your password, add
              or rotate a passkey. For BAI, review your brokerage account
              directly. Broker credentials were never on our servers, so a
              breach on our side cannot reach your brokerage account.
            </Card>
          </Grid2>
        </div>
      </section>

      {/* Security changelog */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Security changes</Eyebrow>
          <H2>
            <span className="mt-2 block">What we fixed, and when.</span>
          </H2>
        </div>
        <ul className="mt-10 space-y-4">
          {CHANGES.map((c, i) => (
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
        <p className="mt-6 text-[13px] text-mute">
          Live service health:{" "}
          <Link
            href="/status/"
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            status page
          </Link>
          .
        </p>
      </section>

      {/* Close CTA */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Talk to us</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Questions before you sign?
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            Send us the operation and what would make it more defensible
            on paper. We reply within one business day.
          </p>
          <div className="mt-8">
            <ContactWidget label="Start a project" />
          </div>
        </div>
      </section>
    </Page>
  );
}
