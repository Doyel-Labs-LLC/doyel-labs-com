import type { Metadata } from "next";
import {
  AccentChip,
  Card,
  Eyebrow,
  Feature,
  GhostLink,
  Grid2,
  Grid3,
  H1,
  H2,
  Lead,
  MetaRow,
  Notice,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactWidget } from "@/components/contact-modal";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — priced per project, quoted in one business day",
  description:
    "How Doyel Labs prices software. Every build is quoted per project in a written scope; there's no hourly rate, no page-count menu, no subscription lock-in. See typical price bands for websites, payroll workspaces, and custom software.",
  alternates: { canonical: `https://${site.domain}/pricing/` },
  openGraph: {
    title: "Pricing — priced per project | Doyel Labs",
    description:
      "Every build is quoted per project in a written scope, in one business day. See typical price bands.",
    url: `https://${site.domain}/pricing/`,
    type: "website",
  },
};

export default function Pricing() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Bands below are typical, not hard limits. Every project ships with
          a written scope + fixed price agreed before we start.
        </MetaRow>
      }
    >
      <Breadcrumbs items={[{ name: "Pricing", href: "/pricing/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <H1>
            Priced <span className="text-accent">per project</span>. Quoted
            in a business day.
          </H1>
          <Lead>
            There is no hourly rate. There is no page-count menu. There is
            no subscription that locks you into our tooling. You describe
            the operation, we describe what to build, and we write a scope
            with a fixed price on it before anyone commits.
          </Lead>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ContactWidget label="Get a quote" />
            <GhostLink href="/start/" small>
              I&apos;m still figuring out the scope
            </GhostLink>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <AccentChip>Fixed price</AccentChip>
            <AccentChip>Written scope</AccentChip>
            <AccentChip>No lock-in</AccentChip>
            <AccentChip>You own the source</AccentChip>
          </div>
        </div>
      </section>

      {/* TYPICAL BANDS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Typical bands</Eyebrow>
            <H2>
              <span className="mt-2 block">
                What a Doyel Labs project usually costs.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              These are not menu prices — they&apos;re where 80% of our
              engagements land. Anything under the low end usually means
              we&apos;re missing a real requirement; anything over usually
              means a real integration or compliance scope that pays for
              itself. We&apos;ll tell you which side we&apos;re on before
              you commit.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <PriceCard
              label="Marketing site"
              band="$2.5k – $8k"
              timeline="3 – 10 business days"
              summary="A five-to-ten-page site on your own domain with a real inquiry form and search-engine-ready markup."
              includes={[
                "Custom domain on your registrar",
                "Mobile-first, WCAG-AA design",
                "schema.org Organization + LocalBusiness",
                "Formspree or Cloudflare form + spam filter",
                "Plausible or your preferred analytics",
                "Two rounds of copy edits",
              ]}
              excludes={[
                "Original photography (bring your own or license)",
                "Booking systems, CRM, e-commerce (see custom band)",
              ]}
              href="/services/websites/"
            />
            <PriceCard
              label="Payroll workspace"
              band="$8k – $20k"
              timeline="1 – 3 weeks"
              summary="An SCA-first or SME payroll workspace with wage-determination lookups, floor checks, batch stubs, and an audit trail."
              includes={[
                "Contractor / employee register",
                "SAM.gov wage-determination lookups (SCA build)",
                "Batch pay runs → PDF stubs",
                "Audit log with CSV export",
                "Passkey or password sign-in (WebAuthn)",
                "Server-side storage per operator",
                "Stub email from your own domain",
              ]}
              excludes={[
                "Direct deposit / ACH — you pay through your bank",
                "Federal tax filing — bring your own accountant",
              ]}
              href="/services/payroll/"
              featured
            />
            <PriceCard
              label="Custom software"
              band="$10k – $80k"
              timeline="2 – 8 weeks"
              summary="A dashboard, a portal, a data pipeline, an integration — anything that would exist as its own SaaS if you had a mid-market budget."
              includes={[
                "Written scope negotiated before start",
                "Weekly Loom + preview URL",
                "Source on your Git host, your DB, your keys",
                "Passkey / OAuth / SSO as needed",
                "Tests on the dangerous paths",
                "Handover docs so a future dev can maintain it",
              ]}
              excludes={[
                "Broker-dealer, adviser, banking, or money-transmitter work",
                "Anything Doyel Labs can&apos;t ship honestly under its LLC scope",
              ]}
              href="/services/"
            />
          </div>
        </section>
      </Reveal>

      {/* MAINTENANCE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Ongoing partnership</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  Optional monthly retainer.
                </span>
              </H2>
            </div>
            <div className="grid gap-6">
              <Feature step="Retainer" title="$450 – $1,500 / month">
                A flat monthly rate that covers small changes, bug fixes,
                dependency updates, security patches, and priority response
                on breakage. You can pause or cancel any month.
              </Feature>
              <Feature step="Included" title="What the retainer covers">
                Small edits (copy, prices, contractor list), OS / framework
                updates, monitoring on your endpoints, and one same-week
                response window for anything broken in production.
              </Feature>
              <Feature step="Not included" title="What triggers a requote">
                A new feature, a new integration, a design overhaul, or
                anything outside the original scope becomes a small project
                with its own written scope and fixed price.
              </Feature>
            </div>
          </div>
        </section>
      </Reveal>

      {/* WHAT DRIVES PRICE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What drives price</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Six things move a Doyel Labs quote.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Every quote comes with a one-page scope that lists the specific
              features on each side of the line. If a factor below moves,
              the price moves — and you see it before you sign, not after.
            </p>
          </div>
          <div className="mt-12">
            <Grid3>
              <Card title="1 · Complexity of the data">
                A five-field contact form is cheap. A payroll register with
                encryption at rest, wage-determination lookups, and 3-year
                audit retention is not.
              </Card>
              <Card title="2 · Number of integrations">
                Every third-party (SAM.gov, Stripe, Resend, a bank API, an
                e-signature vendor) adds a real block of testing and
                error-handling.
              </Card>
              <Card title="3 · Compliance regime">
                SCA, HIPAA, PCI, SOC 2, GLBA — anything with a regulator
                behind it costs more because the audit trail becomes a
                product surface.
              </Card>
              <Card title="4 · Design ambition">
                A functional workspace on our system fonts is fast to ship.
                A hand-tuned brand system with motion, custom fonts, and
                bespoke illustration is another line item.
              </Card>
              <Card title="5 · Content readiness">
                Bringing copy, photos, and product descriptions cuts weeks.
                Writing them for you is a real activity we charge for.
              </Card>
              <Card title="6 · Timeline pressure">
                A reasonable timeline is priced normally. A must-ship-by-X
                deadline gets a small premium — never larger than 20%,
                usually 10%.
              </Card>
            </Grid3>
          </div>
        </section>
      </Reveal>

      {/* WHAT WE DON'T CHARGE FOR */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What we do not charge for</Eyebrow>
            <H2>
              <span className="mt-2 block">Some things are on us.</span>
            </H2>
          </div>
          <div className="mt-10">
            <Grid2>
              <Card title="The first conversation">
                Email or phone. As long as needed to figure out whether we
                should even work together.
              </Card>
              <Card title="The scope + quote">
                Written scope, fixed price, one revision. You can walk away
                — no invoice, no follow-up sequence.
              </Card>
              <Card title="Reasonable revisions">
                We build tight scopes so you don&apos;t need many. Small
                adjustments during the build (font sizes, copy edits,
                colour tweaks) are on us.
              </Card>
              <Card title="Handover + docs">
                Every project ships with a short handover: how it&apos;s
                deployed, where the secrets live, how to update copy or
                prices, and how to reach us if it breaks.
              </Card>
            </Grid2>
          </div>
        </section>
      </Reveal>

      {/* HOW BILLING WORKS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>How billing works</Eyebrow>
            <H2>
              <span className="mt-2 block">Four steps, no surprises.</span>
            </H2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Feature step="01" title="Written scope + fixed price">
              A one-to-two-page document that names every feature, timeline,
              and price. Nothing starts until you sign it.
            </Feature>
            <Feature step="02" title="50% up front">
              An invoice for half the total. Payable by ACH, card (Stripe),
              or wire. We start work the day payment clears.
            </Feature>
            <Feature step="03" title="Weekly preview + Loom">
              Every business day you can look at a preview URL. Every week
              a short Loom walks through what shipped and what&apos;s next.
            </Feature>
            <Feature step="04" title="Balance at handover">
              Final invoice at handover, when the software is live on your
              domain / servers and the handover doc is in your inbox.
            </Feature>
          </div>
        </section>
      </Reveal>

      {/* CLOSE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Get a quote</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  Tell us the operation. We&apos;ll tell you the price.
                </span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                One paragraph on what your business does and what you want
                built. Written scope and fixed price back to you within one
                business day. No sales sequence, no upsell.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactWidget label="Get a quote" />
                <GhostLink href={site.phoneHref} small external>
                  Call {site.phone}
                </GhostLink>
              </div>
            </div>
            <div>
              <Notice>
                <p>
                  If you are a nonprofit or a small operator running a
                  service that helps others, ask about a reduced rate. We
                  quietly discount for clients we believe in.
                </p>
              </Notice>
            </div>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}

/**
 * Price band card used on `/pricing/`. Displays a band (not a menu
 * price), typical timeline, and what is included / excluded. Includes
 * a link to the deeper service page. The `featured` variant elevates
 * the middle card visually — that's where payroll lives because SCA
 * work is our current wedge.
 */
function PriceCard({
  label,
  band,
  timeline,
  summary,
  includes,
  excludes,
  href,
  featured = false,
}: {
  label: string;
  band: string;
  timeline: string;
  summary: string;
  includes: string[];
  excludes: string[];
  href: string;
  featured?: boolean;
}) {
  const border = featured ? "border-accentDim" : "border-line";
  const bg = featured ? "bg-accentSoft/25" : "bg-transparent";
  return (
    <div className={`flex flex-col border ${border} ${bg} p-6`}>
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
        {label}
      </p>
      <p className="mt-3 text-[28px] font-semibold leading-tight text-ink tabular-nums">
        {band}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted">
        Typical timeline · {timeline}
      </p>
      <p className="mt-5 text-[14px] leading-[1.65] text-mute">{summary}</p>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
        Included
      </p>
      <ul className="mt-3 space-y-2">
        {includes.map((line) => (
          <li key={line} className="flex gap-2 text-[13px] leading-[1.55] text-mute">
            <span aria-hidden="true" className="mt-1.5 h-1 w-2.5 shrink-0 bg-accent" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
        Not included
      </p>
      <ul className="mt-3 space-y-2">
        {excludes.map((line) => (
          <li key={line} className="flex gap-2 text-[13px] leading-[1.55] text-muted">
            <span aria-hidden="true" className="mt-1.5 h-1 w-2.5 shrink-0 bg-line2" />
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <GhostLink href={href} small>
          Explore {label.toLowerCase()}
        </GhostLink>
      </div>
    </div>
  );
}
