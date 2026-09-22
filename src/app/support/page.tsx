import type { Metadata } from "next";
import Link from "next/link";
import {
  AccentChip,
  Card,
  Eyebrow,
  GhostLink,
  Grid3,
  H1,
  H2,
  Lead,
  MetaRow,
  Notice,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

/**
 * `/support/`
 *
 * The customer touchpoint AFTER a client hires us. Different from
 * `/contact/` (which is the pre-sales orientation channel):
 *
 *   - `/contact/`  →  prospects, "book an orientation"
 *   - `/support/`  →  clients, "something's broken / how do I..."
 *
 * The page has to answer the client's most common questions
 * (payroll, websites, BAI, ConnectionLoop) and set clear
 * response-time expectations by priority level and retainer
 * status.
 */

export const metadata: Metadata = {
  title: `Support — get help from ${site.companyShort}`,
  description: `Client support for ${site.company}. Reach a real person by email or phone. Clear response tiers, retainer vs. standard SLA, product-scoped FAQs for payroll, websites, BAI, and ConnectionLoop.`,
  alternates: { canonical: `https://${site.domain}/support/` },
  openGraph: {
    title: `Support — ${site.company}`,
    description:
      "Client support with a real human. One-business-day SLA. Retainer clients get same-week response on breakage.",
    url: `https://${site.domain}/support/`,
    type: "website",
  },
};

export default function Support() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          For prospects rather than clients, the pre-sales entry point is{" "}
          <Link
            href="/contact/"
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            /contact
          </Link>{" "}
          — that&apos;s where the one-hour orientation flow starts.
        </MetaRow>
      }
    >
      <Breadcrumbs items={[{ name: "Support", href: "/support/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-start md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Support</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                Talk to a <span className="text-accent">real person</span>.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                Real support with the same person who built your
                software. No ticket queue, no screener, no
                &quot;we&apos;ll get back to you within 3–5 business
                days.&quot; Email or call — we answer within one
                business day, and sooner if something&apos;s broken in
                production for a retainer client.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap gap-2">
              <AccentChip>1 business day</AccentChip>
              <AccentChip>Real human, always</AccentChip>
              <AccentChip>US business hours (MT)</AccentChip>
              <AccentChip>Same person who built it</AccentChip>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.supportEmail}?subject=Support%20request`}
                className="inline-flex items-center gap-2 rounded-full border border-accent bg-accentSoft px-6 py-3 text-[13px] uppercase tracking-wide text-accent transition-all duration-200 ease-soft hover:border-accentHi hover:bg-accent/15 hover:text-accentHi"
              >
                Email {site.supportEmail} →
              </a>
              <GhostLink href={site.phoneHref} small external>
                Or call {site.phone}
              </GhostLink>
            </div>
          </div>

          {/* Right column: direct contact card */}
          <div className="hero-in hero-in--5">
            <div className="border border-line bg-surface/30 p-6">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                <span className="accent-bar" />
                Direct routes
              </p>
              <div className="mt-6 space-y-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                    General support
                  </p>
                  <a
                    href={`mailto:${site.supportEmail}`}
                    className="mt-1 block text-[14px] text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    {site.supportEmail}
                  </a>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                    Phone
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-1 block text-[14px] text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    {site.phone}
                  </a>
                  <p className="mt-1 text-[11px] text-muted">
                    US business hours (MT)
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                    Security disclosure
                  </p>
                  <a
                    href={`mailto:${site.securityEmail}?subject=Security%20disclosure`}
                    className="mt-1 block text-[14px] text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    {site.securityEmail}
                  </a>
                  <p className="mt-1 text-[11px] text-muted">
                    Two-business-day response.{" "}
                    <Link
                      href="/security/"
                      className="hover:text-accentHi"
                    >
                      Full posture
                    </Link>
                    .
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                    Live health
                  </p>
                  <Link
                    href="/status/"
                    className="mt-1 block text-[14px] text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    /status
                  </Link>
                  <p className="mt-1 text-[11px] text-muted">
                    Live checks from your browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSE TIERS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Response tiers</Eyebrow>
            <H2>
              <span className="mt-2 block">
                What to expect, and how fast.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Three response tiers, spelled out so you know what
              you&apos;re getting. Retainer clients get the top tier
              on production breakage; everybody gets one-business-day
              response on everything else.
            </p>
          </div>
          <div className="mt-12">
            <Grid3>
              <Card title="Same day" accent>
                <p className="mb-3">
                  Retainer clients whose production software is
                  broken.
                </p>
                <ul className="list-disc space-y-1 pl-4 text-[13px] leading-[1.6]">
                  <li>Site is down or unreachable</li>
                  <li>A production pay run cannot complete</li>
                  <li>A form is dropping submissions</li>
                  <li>Sign-in is broken</li>
                </ul>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted">
                  Email <strong className="text-ink">SEV-1</strong> in
                  the subject.
                </p>
              </Card>
              <Card title="One business day">
                <p className="mb-3">
                  Everyone. Retainer or not. The default for
                  everything that isn&apos;t on fire.
                </p>
                <ul className="list-disc space-y-1 pl-4 text-[13px] leading-[1.6]">
                  <li>How-to questions</li>
                  <li>Non-blocking bugs</li>
                  <li>Small edit requests</li>
                  <li>Billing questions</li>
                  <li>Feature suggestions</li>
                </ul>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted">
                  US business hours (MT).
                </p>
              </Card>
              <Card title="Two business days">
                <p className="mb-3">
                  Security disclosures. Different queue, different
                  email address, different responder.
                </p>
                <ul className="list-disc space-y-1 pl-4 text-[13px] leading-[1.6]">
                  <li>Vulnerability reports</li>
                  <li>Coordinated disclosure requests</li>
                  <li>Third-party pen-test results</li>
                </ul>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted">
                  Use{" "}
                  <a
                    href={`mailto:${site.securityEmail}`}
                    className="text-accent underline decoration-accentDim hover:text-accentHi"
                  >
                    {site.securityEmail}
                  </a>
                  .
                </p>
              </Card>
            </Grid3>
          </div>
          <div className="mt-10">
            <Notice>
              <p>
                Not sure which tier your issue is? Email us anyway —
                we&apos;ll triage. Nobody has ever been penalised for
                &quot;wrong queue.&quot;
              </p>
            </Notice>
          </div>
        </section>
      </Reveal>

      {/* RETAINER VS STANDARD */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Retainer vs. standard</Eyebrow>
            <H2>
              <span className="mt-2 block">
                What each level actually covers.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Every Doyel Labs build ships with the option of a
              monthly retainer. If you&apos;re on one, you get the
              faster response on breakage and a bank of small
              changes per month. If you&apos;re not, you still get
              one-business-day email support on the software we
              built — you just pay per hour for changes.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card title="On a monthly retainer" accent>
              <ul className="list-disc space-y-2 pl-4">
                <li>
                  <strong className="text-ink">Same-day response</strong>{" "}
                  on production breakage (SEV-1)
                </li>
                <li>
                  <strong className="text-ink">Small changes included</strong>{" "}
                  — copy edits, price updates, contractor list changes,
                  minor bug fixes
                </li>
                <li>
                  <strong className="text-ink">Dependency + security updates</strong>{" "}
                  applied on a rolling basis
                </li>
                <li>
                  <strong className="text-ink">Monitoring</strong> on the
                  endpoints that matter
                </li>
                <li>
                  <strong className="text-ink">Priority scheduling</strong>{" "}
                  for new features (requoted separately)
                </li>
              </ul>
            </Card>
            <Card title="Standard (no retainer)">
              <ul className="list-disc space-y-2 pl-4">
                <li>
                  <strong className="text-ink">One-business-day response</strong>{" "}
                  on email
                </li>
                <li>
                  <strong className="text-ink">Bug fixes on the software we built</strong>{" "}
                  are on us; edits and new features are billed as
                  small scoped projects
                </li>
                <li>
                  <strong className="text-ink">Handover docs</strong> at
                  launch — any engineer can pick up the code
                </li>
                <li>
                  <strong className="text-ink">Source, domain, database</strong>{" "}
                  all under your account
                </li>
                <li>
                  <strong className="text-ink">Optional retainer later</strong>{" "}
                  — you can add one any time
                </li>
              </ul>
            </Card>
          </div>
        </section>
      </Reveal>

      {/* PRODUCT FAQS — preserved from the original page */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Payroll · common answers</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Payroll workspace questions.
              </span>
            </H2>
          </div>
          <div className="mt-10">
            <Grid3>
              <Card title="A draft is being blocked">
                The blue banner names the reason. Most often: day
                rate under the SCA floor for the contractor&apos;s
                county. Fix the day rate or add a supplementary H&W
                line; the stub then issues.
              </Card>
              <Card title="An email did not deliver">
                Check the Audit tab. Each stub-email row carries the
                delivery state from Resend. Bounces show as a warn
                row with the reason.
              </Card>
              <Card title="How to export for DOL">
                Backup tab → Download raw backup (.json) and Export
                CSV on the Audit tab. Keep both against the SCA&apos;s
                three-year rule.
              </Card>
              <Card title="Change a contractor's day rate">
                Contractors tab → row → Edit rate. The change lands in
                the audit log with the reason field, the old rate,
                the new rate, and the timestamp.
              </Card>
              <Card title="Add a new contractor">
                Contractors tab → New contractor. WD lookup runs
                automatically if the county is populated; you can
                override the floor manually if you have a rider.
              </Card>
              <Card title="A stub looks wrong">
                Open the stub PDF from the pay run row. Match the
                base wage, H&W fringe, and floor to the current WD.
                If they don&apos;t match, force a WD re-lookup and
                regenerate.
              </Card>
            </Grid3>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Websites · common answers</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Marketing site questions.
              </span>
            </H2>
          </div>
          <div className="mt-10">
            <Grid3>
              <Card title="Change a price or copy">
                The build ships with a small documented set of files
                where copy lives; edit and push. If we&apos;re on
                retainer, email the change and we do it within one
                business day.
              </Card>
              <Card title="A form did not arrive">
                Formspree (or the operator&apos;s chosen provider)
                logs each submission. Check the spam folder first,
                then the provider&apos;s dashboard, then us.
              </Card>
              <Card title="Add a page">
                Send the copy and a rough shape (band 1, band 2,
                contact). We match the site&apos;s own design
                system.
              </Card>
              <Card title="DNS or domain question">
                DNS usually lives on your Cloudflare account. Email
                us with the record you want changed — we&apos;ll
                walk through the change or make it for you if you
                grant a scoped API token.
              </Card>
              <Card title="SEO / search question">
                Every site ships with schema.org structured data and
                a sitemap. If a specific query isn&apos;t ranking,
                email us with the target phrase and we&apos;ll audit
                the on-page setup.
              </Card>
              <Card title="Certificate renewed?">
                TLS certs renew automatically through the CDN
                (Cloudflare or Netlify). If a browser warning fires,
                that&apos;s a SEV-1 — email us with the URL and
                we&apos;ll fix within the hour.
              </Card>
            </Grid3>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>BAI · common answers</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Trading-desk program questions.
              </span>
            </H2>
          </div>
          <div className="mt-10">
            <Grid3>
              <Card title="The desk will not arm">
                The Arm dialog says why: a lock you have not typed, a
                subscription that is not active, terms to accept, or
                a broker that is not connected. Each has one fix,
                named on the screen.
              </Card>
              <Card title="A position looks wrong">
                Your broker is the record. Log in there directly. The
                desk reconciles against the broker every few seconds
                and will never sell more than the broker says you
                hold.
              </Card>
              <Card title="Billing">
                Change plan, update the card, or cancel from Account
                → Manage billing in the app. Refund terms are in the
                pricing rider you agreed to at purchase.
              </Card>
            </Grid3>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>ConnectionLoop · common answers</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Shared-calendar app questions.
              </span>
            </H2>
          </div>
          <div className="mt-10">
            <Grid3>
              <Card title="Cannot join a Space">
                The invite code has expired or been rotated. Ask the
                Space owner for a fresh one from Invite → Make a new
                code.
              </Card>
              <Card title="Delete my account">
                Me → Privacy &amp; Safety → Delete account. The row
                is written to <code className="font-mono text-ink">deletionRequests</code>;
                hard wipe completes within thirty days.
              </Card>
              <Card title="A push did not arrive">
                Check notification permission on the device. Push
                payloads carry kind + ids only, so a suppressed
                lock-screen line means the push reached the device.
              </Card>
            </Grid3>
          </div>
        </section>
      </Reveal>

      {/* WHAT TO INCLUDE IN THE FIRST EMAIL */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Speeding things up</Eyebrow>
            <H2>
              <span className="mt-2 block">
                What to include in the first email.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              The following save one round-trip of email tag. Not
              required — we&apos;ll write back either way — but if
              you include them up front we can usually resolve the
              issue in a single reply.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Card title="What broke or what you're stuck on">
              A sentence describing the outcome you expected and what
              happened instead. &quot;Draft #142 blocked with SCA
              floor error even though the WD hasn&apos;t changed.&quot;
            </Card>
            <Card title="A URL or screenshot">
              For website issues, the exact URL. For payroll or BAI,
              a screenshot of the screen with the error. Redact any
              sensitive fields (SSN, dollar amounts, contract
              numbers) before sending — we don&apos;t need them to
              debug.
            </Card>
            <Card title="What you already tried">
              &quot;I re-ran the WD lookup, it came back with the
              same numbers.&quot; Saves us suggesting steps
              you&apos;ve already done.
            </Card>
            <Card title="The subject line">
              For urgent production issues, prefix with{" "}
              <code className="font-mono text-ink">[SEV-1]</code>.
              For everything else, a short human subject is fine.
            </Card>
          </div>
        </section>
      </Reveal>

      {/* CLOSE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Reach us</Eyebrow>
              <H2>
                <span className="mt-2 block">Real people, real email.</span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                Every support email lands with the same person who
                built your software. No ticket queue, no chatbot, no
                automated triage.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.supportEmail}?subject=Support%20request`}
                  className="inline-flex items-center gap-2 rounded-full border border-accent bg-accentSoft px-6 py-3 text-[13px] uppercase tracking-wide text-accent transition-all duration-200 ease-soft hover:border-accentHi hover:bg-accent/15 hover:text-accentHi"
                >
                  Email {site.supportEmail} →
                </a>
                <GhostLink href={site.phoneHref} small external>
                  Call {site.phone}
                </GhostLink>
                <GhostLink href="/status/" small>
                  Live status
                </GhostLink>
              </div>
            </div>
            <div>
              <Notice>
                <p>
                  Outside the United States? Payroll, websites, and
                  BAI are US-only at launch. ConnectionLoop is
                  available where its stores are.
                </p>
              </Notice>
            </div>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}
