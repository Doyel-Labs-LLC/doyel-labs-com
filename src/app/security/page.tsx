import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  Eyebrow,
  H1,
  H2,
  Lead,
  MetaRow,
  Page,
} from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description: `${site.company} security posture — company rule, product data maps (payroll, BAI, ConnectionLoop, websites), controls table, vulnerability reports, and a security changelog.`,
};

/**
 * The security page. Four data maps sit under the company rule, in the
 * order commercial → program. BAI's maps are ported verbatim in meaning
 * from BAI-Desk/website/src/app/security/page.tsx. No existing BAI claim
 * is weakened.
 */
const CONTROLS: { area: string; control: string; means: string }[] = [
  {
    area: "Passwords",
    control:
      "PBKDF2-SHA256 hashing on the payroll workspace; Argon2id on BAI account services. Minimum 12 characters. Rate-limited attempts.",
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
      "Kept only on the operator's computer in Windows Credential Manager. Never sent to us.",
    means:
      "Doyel Labs servers cannot place an order at the broker. A breach on our side cannot reach the broker account.",
  },
  {
    area: "Bank details (Payroll)",
    control:
      "Bank routing and account numbers are not stored on Doyel Labs servers at all. The operator pays through their own bank.",
    means:
      "There is nothing on our side that can move a wage. There is nothing on our side to steal that would.",
  },
  {
    area: "Orders (BAI)",
    control:
      "Every entry carries a broker-held stop and a broker-held target. Four code paths can originate an order and each checks the entitlement, the arm phrase, and the kill switch.",
    means:
      "A laptop that sleeps leaves nothing unprotected. Nothing in chat, email, or the website can buy or sell.",
  },
  {
    area: "Rules (ConnectionLoop)",
    control:
      "Firestore + Storage default-deny. A Space membership row is created only against a live invite code. Rate limits and App Check on callables.",
    means:
      "A signed-in stranger cannot join your Space. Server-only writes protect notifications and audit.",
  },
  {
    area: "Updates",
    control:
      "BAI updates are signed and refused while the desk is armed or holding a position. Website is a static export, no server runtime.",
    means:
      "No code we did not sign runs on your machine, and nothing lands mid-trade.",
  },
  {
    area: "Payments",
    control:
      "Card details entered on Stripe's pages when a program takes a subscription. We hold a customer id and a status.",
    means: "We never see or store a card number.",
  },
  {
    area: "Web pages",
    control:
      "Strict content-security policy on every page. HSTS. No third-party marketing scripts.",
    means:
      "An injected string on any of our pages renders as text and cannot run.",
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
    means:
      "Anything done to your account — including by us — can be traced.",
  },
];

const PAYROLL_MAP = {
  yes: [
    "Contractor register (name, title, state, WD, contract, day rate)",
    "SSN stored encrypted at rest; last-4 shown in UI where needed",
    "Pay-run drafts and generated stubs",
    "Audit log rows (paystub generated, emailed, blocked)",
    "Password hash (PBKDF2), passkey metadata, session tokens",
    "Netlify Blobs storage scoped to the operator, 180-day audit retention",
  ],
  no: [
    "Bank routing or account numbers of the operator or the contractors",
    "Contractor wages as a movable balance",
    "Federal, state, or local tax returns",
    "Card numbers (Stripe handles anything billed)",
    "Any contractor's SSN in plaintext logs, emails, or exports",
  ],
};

const BAI_MAP = {
  yes: [
    "Your email address and password hash",
    "Devices that signed in and when",
    "Subscription status and Stripe customer id",
    "Which legal documents you accepted and when",
    "Crash reports, only if you switched them on, with identifying details removed",
  ],
  no: [
    "Broker usernames, passwords, tokens or API keys",
    "Your positions, orders, fills or account values",
    "Market-data keys",
    "Card numbers",
    "The contents of the research chat on your desk",
  ],
};

const CONNECTIONLOOP_MAP = {
  yes: [
    "Auth email, display name, avatar reference",
    "Space membership rows, invite codes (hashed, not the family name)",
    "Events, comments, photos, messages, lists, notes — inside a Space",
    "Push notifications by kind and id (no content)",
    "Crash notes, scrubbed twice, only if the person turned that on",
  ],
  no: [
    "Other people's emails, ever rendered in the UI",
    "The transcript body of a voice list beyond the one call to Google STT",
    "Any content in a log line",
    "A public feed or friends-of-friends graph",
    "Cross-Space discovery",
  ],
};

const WEBSITES_MAP = {
  yes: [
    "Static HTML, CSS, JavaScript on Cloudflare Pages",
    "Forms your operator wired to their own inbox (Formspree or similar)",
    "Optional privacy-respecting analytics (Plausible) if the operator picked it",
  ],
  no: [
    "Marketing pixels the operator did not agree to install",
    "Server-side runtime that Doyel Labs can push mutations to",
    "Personal data on Doyel Labs servers — visitor data goes to the operator's chosen tools",
  ],
};

const CHANGES: { date: string; text: string }[] = [
  {
    date: "2026-09-20",
    text: "Company site relaunched as a Doyel Labs LLC page. BAI is now surfaced as a program under the company, not as the company brand. Third-party marketing scripts remain banned on marketing pages via `_headers`.",
  },
  {
    date: "2026-09-19",
    text: "ConnectionLoop 0.2.106: privacy policy names both flows (voice lists and crash notes) explicitly. Password policy on. Email enumeration protection on.",
  },
  {
    date: "2026-09-07",
    text: "BAI desk engine and watchdog now run inside a Windows job tied to the app; a stopped app leaves no process holding the installation open.",
  },
  {
    date: "2026-09-06",
    text: "BAI crash reports drop any field that names positions, orders, fills, money, or quantities before they are written; a report can say the desk crashed and never what it held.",
  },
  {
    date: "2026-09-06",
    text: "BAI admin console shipped with a per-request nonce CSP and an address allowlist that applies before a token is typed.",
  },
];

export default function Security() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Source of truth · BAI-Desk/website/src/app/security/page.tsx ·
          ConnectionLoop/docs/SECURITY.md · index/netlify/functions/payroll.js
        </MetaRow>
      }
    >
      {/* HERO — company rule */}
      <section className="pt-24">
        <Eyebrow>Security</Eyebrow>
        <H1>What stays on your machine, and what we hold.</H1>
        <Lead>
          The design starts from one rule: the thing that can spend money
          lives on your machine, and the thing we run in the cloud cannot
          spend it. Everything below follows from that. This page is written
          for someone deciding whether to trust Doyel Labs with a payroll
          book, a brokerage connection, or a family calendar. If a claim
          here is unclear,{" "}
          <a
            href={`mailto:${site.securityEmail}`}
            className="underline decoration-line2 underline-offset-2 hover:text-ink"
          >
            write to us
          </a>{" "}
          and we will explain it.
        </Lead>
      </section>

      {/* PAYROLL DATA MAP */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>Payroll data map</Eyebrow>
        <H2>
          <span className="mt-2 block">Payroll, held and never held.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="What we hold (payroll)">
            <ul className="list-disc space-y-1 pl-4">
              {PAYROLL_MAP.yes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
          <Card title="What we never hold (payroll)">
            <ul className="list-disc space-y-1 pl-4">
              {PAYROLL_MAP.no.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* BAI DATA MAP */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>BAI data map</Eyebrow>
        <H2>
          <span className="mt-2 block">BAI, held and never held.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="What we hold (BAI)">
            <ul className="list-disc space-y-1 pl-4">
              {BAI_MAP.yes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
          <Card title="What we never hold (BAI)">
            <ul className="list-disc space-y-1 pl-4">
              {BAI_MAP.no.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* CONNECTIONLOOP DATA MAP */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>ConnectionLoop data map</Eyebrow>
        <H2>
          <span className="mt-2 block">ConnectionLoop, held and never held.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="What we hold (ConnectionLoop)">
            <ul className="list-disc space-y-1 pl-4">
              {CONNECTIONLOOP_MAP.yes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
          <Card title="What we never hold (ConnectionLoop)">
            <ul className="list-disc space-y-1 pl-4">
              {CONNECTIONLOOP_MAP.no.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* WEBSITES DATA MAP */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>Websites data map</Eyebrow>
        <H2>
          <span className="mt-2 block">Websites we build for operators.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="What ships (websites)">
            <ul className="list-disc space-y-1 pl-4">
              {WEBSITES_MAP.yes.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
          <Card title="What does not ship (websites)">
            <ul className="list-disc space-y-1 pl-4">
              {WEBSITES_MAP.no.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Controls */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>The controls</Eyebrow>
        <H2>
          <span className="mt-2 block">Specifically.</span>
        </H2>
        <div className="mt-8 overflow-x-auto border border-line">
          <table className="w-full text-[13px]">
            <thead className="bg-surface text-left font-mono text-[10px] uppercase tracking-wide text-muted">
              <tr>
                <th className="border-b border-line px-4 py-3">Area</th>
                <th className="border-b border-line px-4 py-3">What is in place</th>
                <th className="border-b border-line px-4 py-3">What it means for you</th>
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

      {/* Vulnerability + compromise */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Reporting a vulnerability">
            Write to{" "}
            <a
              href={`mailto:${site.securityEmail}`}
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              {site.securityEmail}
            </a>
            . Tell us what you found and how to reproduce it. We answer within
            two business days, fix confirmed issues before disclosing them,
            and credit reporters who want it. Please do not test against other
            people's accounts or data. The machine-readable policy is at{" "}
            <a
              href="/.well-known/security.txt"
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              /.well-known/security.txt
            </a>
            .
          </Card>
          <Card title="If your account is compromised">
            Sign out everywhere from the app, change your password, add or
            rotate a passkey, and — for BAI — review your brokerage account
            directly. Broker credentials were never on our servers, so a
            breach on our side cannot reach your brokerage account. For
            payroll, rotate the workspace password and export the audit CSV
            to check for changes you did not authorise.
          </Card>
        </div>
      </section>

      {/* Security changelog */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>Security changes</Eyebrow>
        <H2>
          <span className="mt-2 block">What we fixed, and when.</span>
        </H2>
        <ul className="mt-8 space-y-4">
          {CHANGES.map((c, i) => (
            <li key={i} className="flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-3 text-[14px]">
              <span className="w-28 shrink-0 font-mono text-[11px] text-muted">
                {c.date}
              </span>
              <span className="max-w-prose text-mute">{c.text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[13px] text-mute">
          Live service health is on the{" "}
          <Link href="/status/" className="underline decoration-line2 underline-offset-2 hover:text-ink">
            status page
          </Link>
          .
        </p>
      </section>
    </Page>
  );
}
