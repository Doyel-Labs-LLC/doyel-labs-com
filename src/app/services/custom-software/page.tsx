import type { Metadata } from "next";
import Link from "next/link";
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
import { PayrollAuditFrame } from "@/components/frames/payroll-audit";
import { Quote } from "@/components/quote";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { steadfastTestimonial } from "@/lib/testimonials";

/**
 * `/services/custom-software/`
 *
 * The third major service page (after /services/websites/ and
 * /services/payroll/). Covers the biggest service category by
 * volume: custom internal software — dashboards, portals,
 * integrations, workflows, data pipelines, one-off programs.
 *
 * The other two service pages are for specific product categories
 * that a prospect might Google. This page is for the prospect who
 * knows they need software but doesn't know what to call it.
 */

export const metadata: Metadata = {
  title:
    "Custom software development — dashboards, portals, internal tools, integrations",
  description:
    "Doyel Labs builds custom software for businesses that outgrew their spreadsheets. Dashboards, client portals, internal tools, integrations between the systems you already use, data pipelines, one-off programs. Priced per project. Shipped in weeks. You own the code.",
  alternates: {
    canonical: `https://${site.domain}/services/custom-software/`,
  },
  openGraph: {
    title:
      "Custom software development for any business — Doyel Labs",
    description:
      "Dashboards, portals, internal tools, integrations, data pipelines. Priced per project, shipped in weeks, you own the code.",
    url: `https://${site.domain}/services/custom-software/`,
    type: "website",
  },
};

/** JSON-LD Service schema — helps Google recognize this page as a
 * distinct service offering with a pricing range and audience. */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/services/custom-software/#service`,
  serviceType: "Custom software development",
  name: "Custom software development",
  description:
    "Custom internal software for any business — dashboards, portals, integrations, data pipelines, one-off programs. Priced per project. You own the code.",
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: 10000,
      maxPrice: 80000,
      priceCurrency: "USD",
    },
    url: `https://${site.domain}/pricing/`,
  },
};

/** The categories of custom software we build, in the order we
 * quote them most often. Every entry names concrete examples so
 * a prospect can recognize their own situation in the list. */
const CATEGORIES = [
  {
    title: "Operational dashboards",
    body: "The screen a team opens every morning. Aggregated view of what matters — jobs in progress, invoices out, contractors on payroll, orders in flight, tickets due. Read-only or with inline actions.",
    examples: [
      "Owner dashboard for a rural service contractor",
      "Deal pipeline for a small brokerage",
      "Job-status board for a trades operator",
    ],
  },
  {
    title: "Client & partner portals",
    body: "Signed-in surfaces for the people outside your organization who need to interact with your operation — customers, vendors, contractors, sub-contractors. Document exchange, status updates, self-service actions.",
    examples: [
      "Contractor onboarding portal for a federal service business",
      "Client-facing project status page for a small agency",
      "Vendor upload portal with e-signature and reminders",
    ],
  },
  {
    title: "Internal admin tools",
    body: "Back-office consoles the team uses to do the work — CRUD portals for records, moderation queues, review interfaces, approval workflows. The stuff you'd never expose to a customer.",
    examples: [
      "Contractor register with rate history + audit log",
      "Content moderation queue with reason codes",
      "Payment reconciliation console for a small services firm",
    ],
  },
  {
    title: "Integrations between tools you already own",
    body: "You have a CRM, a billing system, an email tool, an accounting package. They don't talk to each other. We build the layer that keeps them in sync — one system-of-record, everything else automated.",
    examples: [
      "Stripe → QuickBooks → Google Sheets reconciliation",
      "HubSpot → Airtable → Slack notifications",
      "SAM.gov → operator DB → PDF stub generation",
    ],
  },
  {
    title: "Data pipelines & ETL",
    body: "You have data in a place that isn't useful — a bunch of CSVs, an API you rate-limit against, an inbox of invoices. We move it, transform it, alert on it, and keep it running with retries and dead-letter queues.",
    examples: [
      "Nightly SAM.gov wage-determination pull with change alerts",
      "CSV inbox → cleaned Postgres table with audit rows",
      "Cron-scheduled inventory export → shared drive",
    ],
  },
  {
    title: "Custom web apps",
    body: "Full-stack builds — signed-in users, billing, admin, and a marketing site on the same domain. When \"a portal\" isn't the right frame but a whole product surface is.",
    examples: [
      "SaaS-shaped internal product with Stripe billing",
      "Multi-tenant workspace with role-based access",
      "Public product with an admin panel and public API",
    ],
  },
  {
    title: "One-off programs",
    body: "Anything that would exist as its own mid-market vendor product if you had the budget of one. Built for your specific operation, priced honestly, delivered in weeks.",
    examples: [
      "SCA-compliant pay-run workspace (like SteadFast Payroll)",
      "Trading-desk automation (like BAI)",
      "Invite-only shared-calendar app (like ConnectionLoop)",
    ],
  },
];

export default function CustomSoftware() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Every example on this page is either a real project we&apos;ve
          shipped or a plausible one from an orientation call. Nothing
          is invented; nothing is exaggerated.
        </MetaRow>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: "Services", href: "/services/" },
          {
            name: "Custom software",
            href: "/services/custom-software/",
          },
        ]}
      />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:items-center md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Services · Custom software</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                Software that fits{" "}
                <span className="text-accent">your operation</span>,
                not the other way around.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                When you&apos;ve outgrown your spreadsheets and every
                off-the-shelf tool would force you to change how the
                business actually runs, custom software is the answer.
                Dashboards, portals, internal tools, integrations, data
                pipelines, one-off programs — built to how your
                operation works and shipped in weeks.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Book an orientation" />
              <GhostLink href="/pricing/" small>
                Pricing bands
              </GhostLink>
              <GhostLink href="/how-we-work/" small>
                How we work
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>Fixed price</AccentChip>
              <AccentChip>Weeks, not quarters</AccentChip>
              <AccentChip>You own the code</AccentChip>
              <AccentChip>No lock-in</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <PayrollAuditFrame />
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What custom software is</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Software built for one operator, not for a category.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.75] text-mute">
              A commercial SaaS product is designed to serve
              thousands of businesses that look roughly the same. It
              wins by being 60% right for everybody. Custom software
              wins by being 100% right for you — because it&apos;s
              built against your specific operation, your specific
              compliance regime, your specific data, your specific
              team.
            </p>
            <p className="mt-4 text-[16px] leading-[1.75] text-mute">
              For a lot of operations, off-the-shelf software works
              fine. When it doesn&apos;t, the symptoms are usually
              the same: staff working around the tool instead of with
              it, spreadsheets doing the actual coordination, and a
              monthly bill for a product you use maybe a third of.
              Custom software fixes that at the source.
            </p>
          </div>
        </section>
      </Reveal>

      {/* THE CATEGORIES WE BUILD */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Categories we build</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Seven starting points. Yours might be a mix.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.75] text-mute">
              Custom software rarely fits neatly into one category
              — most real builds combine two or three. The list
              below is how we describe scope on quotes; if you see
              yourself in more than one entry, that&apos;s normal.
            </p>
          </div>
          <div className="mt-12 space-y-6">
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.title} category={c} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* WHEN TO BUILD CUSTOM (honest section) */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>When custom is the right answer</Eyebrow>
            <H2>
              <span className="mt-2 block">
                And when it isn&apos;t. Both matter.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.75] text-mute">
              Not every problem is a software problem, and not every
              software problem needs a custom build. If a $30/month
              off-the-shelf product solves your problem, we&apos;ll
              tell you that on the orientation call and point you at
              it — we&apos;d rather send you away with the right
              answer than sell you the wrong one.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card title="Build custom when">
              <ul className="list-disc space-y-2 pl-4">
                <li>
                  Your operation runs on a rule an off-the-shelf tool
                  doesn&apos;t know about (SCA payroll, a specific
                  contract clause, a domain-specific workflow).
                </li>
                <li>
                  You&apos;re paying for three SaaS tools that each do
                  20% of what you need and none of them talk to each
                  other.
                </li>
                <li>
                  Your team is doing manual work every week that a
                  small piece of software could eliminate — and
                  you&apos;d save more than the build costs in a
                  year.
                </li>
                <li>
                  You have specific compliance, audit, or legal
                  requirements the off-the-shelf tools can&apos;t
                  meet.
                </li>
                <li>
                  You want to own the data and the code, not rent
                  them.
                </li>
              </ul>
            </Card>
            <Card title="Buy off-the-shelf when">
              <ul className="list-disc space-y-2 pl-4">
                <li>
                  A well-known SaaS product does 90% of what you
                  need and the last 10% is nice-to-have.
                </li>
                <li>
                  Your process is genuinely industry-standard and a
                  category leader already solves it.
                </li>
                <li>
                  You don&apos;t have the operational muscle to be
                  the internal owner of software (someone has to
                  answer &quot;where does this belong?&quot; when
                  the tool asks).
                </li>
                <li>
                  The problem is likely to change substantially in
                  the next six months.
                </li>
                <li>
                  The vendor&apos;s pricing works out cheaper than
                  a build + retainer over three years.
                </li>
              </ul>
            </Card>
          </div>
        </section>
      </Reveal>

      {/* HOW A BUILD SHIPS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>How a custom build ships</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Six weeks, on average. Some faster.
              </span>
            </H2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Feature step="Week 0" title="One-hour orientation">
              We listen to the operation. Ask the seven scoping
              questions. Say what we can build and what we&apos;d
              refuse to. No cost, no obligation.
            </Feature>
            <Feature step="Week 0" title="Written scope + fixed price">
              Within one business day of the call, a
              one-to-two-page scope with what ships, what doesn&apos;t,
              timeline, and a fixed price. You sign or you don&apos;t.
            </Feature>
            <Feature step="Week 1" title="Data model + scaffolding">
              We read the compliance rules first (if any), then draft
              the data model and the app scaffolding. Preview URL up
              on day 3 or 4.
            </Feature>
            <Feature step="Weeks 2–4" title="Feature build with weekly Loom">
              The features go in with a preview URL every business
              day and a short Loom walkthrough every week. Human
              review on every diff before it merges.
            </Feature>
            <Feature step="Week 5" title="Harden the audit + edge cases">
              Real-data testing, edge cases, error paths, backups,
              observability, tests on the dangerous code paths. This
              is where "shipped" becomes "shipped well."
            </Feature>
            <Feature step="Week 6" title="Handoff + optional retainer">
              Balance invoice. Source on your Git host, keys in your
              vault, DNS in your account. Handoff doc + optional
              retainer if you want us to keep it running.
            </Feature>
          </div>
          <div className="mt-10">
            <GhostLink href="/how-we-work/" small>
              The full &quot;how we work&quot; page →
            </GhostLink>
          </div>
        </section>
      </Reveal>

      {/* WHAT SHIPS WITH EVERY BUILD */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What every build ships with</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Not features. Foundations.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.75] text-mute">
              Regardless of what the build actually does, every
              Doyel Labs custom software project ships with the
              same bones. These aren&apos;t optional add-ons —
              they&apos;re what makes the software defensible on
              the second year.
            </p>
          </div>
          <div className="mt-12">
            <Grid3>
              <Card title="Server storage per operator">
                Your data lives in a namespace scoped to you, on
                your cloud account. No shared multi-tenant DB
                unless you asked for one.
              </Card>
              <Card title="Audit log with CSV export">
                Every state change leaves a row. Every row exports
                to CSV. Retention matches your compliance rules.
              </Card>
              <Card title="Passkey / SSO sign-in">
                WebAuthn passkeys where they fit, or Google /
                Microsoft SSO if that&apos;s where your team lives.
                No shared passwords, ever.
              </Card>
              <Card title="Backups you can walk away with">
                Full JSON exports on demand. Restore path is
                merge-friendly, not overwrite-first.
              </Card>
              <Card title="Handover docs a future dev can read">
                README + deploy notes + secrets map + on-call
                playbook. Any engineer can pick it up.
              </Card>
              <Card title="Fail-closed defaults">
                When the system doesn&apos;t know, it does nothing.
                Money paths and destructive operations refuse to
                proceed on ambiguity.
              </Card>
            </Grid3>
          </div>
        </section>
      </Reveal>

      {/* PROOF — testimonial */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Named client work</Eyebrow>
            <H2>
              <span className="mt-2 block">
                One live custom build. Here&apos;s what the client
                said.
              </span>
            </H2>
          </div>
          <div className="mt-10">
            <Quote
              paragraphs={steadfastTestimonial.full}
              attribution={steadfastTestimonial.attribution}
              company={steadfastTestimonial.company}
              companyUrl={steadfastTestimonial.companyUrl}
              logo={steadfastTestimonial.logo}
              size="large"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <GhostLink href="/work/" small>
              Full case study
            </GhostLink>
            <GhostLink href="/work/" small>
              All reviews
            </GhostLink>
          </div>
        </section>
      </Reveal>

      {/* CLOSE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Start a custom build</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  One paragraph on the operation is enough.
                </span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.75] text-mute">
                Tell us what your business does and what
                you&apos;d like to change. A real person from Doyel
                Labs replies within one business day with a couple
                of times that could work for a one-hour orientation
                call — Zoom or phone, your choice.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactWidget label="Book an orientation" />
                <GhostLink href={site.phoneHref} small external>
                  Or call {site.phone}
                </GhostLink>
              </div>
            </div>
            <div>
              <Notice>
                <p>
                  Not sure whether your project fits &quot;custom
                  software&quot; or would be better as a{" "}
                  <Link
                    href="/services/websites/"
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    marketing site
                  </Link>{" "}
                  or{" "}
                  <Link
                    href="/services/payroll/"
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    payroll workspace
                  </Link>
                  ? The orientation call is where we figure that
                  out. If nothing on the site quite fits, book
                  anyway — sometimes the answer is a mix.
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
 * One expandable card per category. Body plus a short list of
 * concrete examples so a prospect can recognize their situation.
 */
function CategoryCard({
  category,
}: {
  category: (typeof CATEGORIES)[number];
}) {
  return (
    <div className="border border-line bg-surface/30 p-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div>
          <h3 className="text-[19px] font-semibold leading-tight text-ink md:text-[20px]">
            {category.title}
          </h3>
          <p className="mt-3 text-[14px] leading-[1.65] text-mute">
            {category.body}
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
            Real-shape examples
          </p>
          <ul className="mt-3 space-y-2">
            {category.examples.map((ex) => (
              <li
                key={ex}
                className="flex gap-2 text-[13px] leading-[1.5] text-mute"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1 w-2.5 shrink-0 bg-accent"
                />
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
