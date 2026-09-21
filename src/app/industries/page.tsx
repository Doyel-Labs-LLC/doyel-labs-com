import type { Metadata } from "next";
import Link from "next/link";
import {
  AccentChip,
  Card,
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  Notice,
  Page,
  StatusChip,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactWidget } from "@/components/contact-modal";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Industries — custom software for small businesses, contractors, professionals, and enterprises",
  description:
    "Doyel Labs builds custom software for businesses in any industry — federal service contractors, e-commerce, professional services, healthcare admin, transportation, real estate, nonprofits, and more. If your business runs on software, we can build it.",
  alternates: { canonical: `https://${site.domain}/industries/` },
  openGraph: {
    title: "Industries we build for | Doyel Labs",
    description:
      "Custom software for any industry. Federal contractors, e-commerce, professional services, healthcare admin, transportation, real estate, nonprofits, and more.",
    url: `https://${site.domain}/industries/`,
    type: "website",
  },
};

/**
 * Industries landing page.
 *
 * The point of this page is to say — clearly, in one glance — that
 * Doyel Labs builds for any industry, while giving Google enough
 * signal on each vertical to rank when an operator searches
 * "custom software for [industry]".
 *
 * Only industries where we have live client work get their own
 * dedicated `/industries/<slug>/` page. Everything else is a card
 * that routes to /contact/ so we can talk about the specifics.
 * As we ship more clients we promote cards from "generic → dedicated
 * page".
 */

type Industry = {
  slug: string; // used only if it has its own page
  title: string;
  body: string;
  liveExample?: string; // if we have a real client, name them
  href: string; // where the card links to
  featured?: boolean;
};

/**
 * The industry list is alphabetical so no vertical looks featured over
 * another. The only difference between "we've shipped here" and "we
 * haven't yet" is the `liveExample` field and the destination URL —
 * one has a case-study landing, the rest go to /contact/. That's it.
 * Adding a new industry: keep the list alphabetized.
 */
const industries: Industry[] = [
  {
    slug: "e-commerce-retail",
    title: "E-commerce & retail",
    body: "Custom checkout flows, inventory portals, order-fulfilment dashboards, and marketing sites that plug into Shopify or Stripe.",
    href: "/contact/?topic=ecommerce",
  },
  {
    slug: "education-training",
    title: "Education & training",
    body: "Course-registration portals, learner dashboards, cohort trackers, and marketing sites for training providers, tutors, and small schools.",
    href: "/contact/?topic=education",
  },
  {
    slug: "family-owned-mom-and-pop",
    title: "Family-owned & mom-and-pop",
    body: "Marketing sites and small internal tools for the local shop, the family restaurant, the multi-generation service business. Priced accordingly.",
    href: "/contact/?topic=family-business",
  },
  {
    slug: "federal-service-contractors",
    title: "Federal service contractors",
    body: "SCA payroll, SAM.gov wage-determination compliance, DOL-ready audit trails. USPS routes, base service contracts, GSA schedules.",
    liveExample: "SteadFast Transportation Inc.",
    href: "/industries/federal-service-contractors/",
  },
  {
    slug: "financial-services",
    title: "Financial services back office",
    body: "Operational software — not investment products. Compliance dashboards, KYC pipelines, reporting portals for advisers and small firms.",
    href: "/contact/?topic=financial",
  },
  {
    slug: "healthcare-admin",
    title: "Healthcare admin",
    body: "Non-PHI operational tools: scheduling, credentialing, referral tracking, and vendor-management portals. HIPAA-adjacent, not HIPAA-clinical.",
    href: "/contact/?topic=healthcare",
  },
  {
    slug: "hospitality-food",
    title: "Hospitality & food service",
    body: "Reservation systems, staff-scheduling tools, inventory workflows, and menu / marketing sites for restaurants, hotels, and event venues.",
    href: "/contact/?topic=hospitality",
  },
  {
    slug: "nonprofits-community",
    title: "Nonprofits & community orgs",
    body: "Donor portals, volunteer schedulers, event-registration flows, program-tracking dashboards. Reduced rates for orgs we believe in.",
    href: "/contact/?topic=nonprofit",
  },
  {
    slug: "professional-services",
    title: "Professional services",
    body: "Client portals, engagement trackers, invoicing dashboards, deliverable pipelines — for consultants, accountants, agencies, and law firms.",
    href: "/contact/?topic=professional-services",
  },
  {
    slug: "real-estate",
    title: "Real estate & property mgmt",
    body: "Listing sites, tenant portals, maintenance-request queues, lease dashboards — for brokers, managers, and small operators.",
    href: "/contact/?topic=real-estate",
  },
  {
    slug: "trades-contractors",
    title: "Trades & contractors",
    body: "Estimate builders, dispatch calendars, invoicing dashboards, customer-facing project pages for HVAC, electrical, plumbing, and general contractors.",
    href: "/contact/?topic=trades",
  },
  {
    slug: "transportation-logistics",
    title: "Transportation & logistics",
    body: "Route dispatch tools, driver / contractor rosters, safety-training trackers, DOT-compliance record-keeping.",
    href: "/contact/?topic=transportation",
  },
];

export default function Industries() {
  return (
    <Page>
      <Breadcrumbs items={[{ name: "Industries", href: "/industries/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <Eyebrow>Industries</Eyebrow>
          <H1>
            If your business runs on software, we can{" "}
            <span className="text-accent">build it</span>.
          </H1>
          <Lead>
            Doyel Labs is industry-agnostic. We&apos;ve shipped for federal
            service contractors, transportation operators, and family-owned
            small businesses — and we build for any operation that can
            describe what it does in a paragraph. Pick the vertical below
            that sounds like you, or tell us yours directly.
          </Lead>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ContactWidget label="Tell us your business" />
            <GhostLink href="/services/" small>
              What we build
            </GhostLink>
            <GhostLink href="/pricing/" small>
              How pricing works
            </GhostLink>
          </div>
        </div>
      </section>

      {/* GRID OF INDUSTRIES */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Verticals we build for</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Twelve starting points — not a closed list.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Cards with a client attached lead to a full landing page for
              that industry. Cards without a named client route directly to
              our inbox — we&apos;ve either built adjacent work, or we
              haven&apos;t shipped in the vertical yet and would want to
              hear about the operation before quoting.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <IndustryCard key={ind.slug} industry={ind} />
            ))}
          </div>
        </section>
      </Reveal>

      {/* OUTSIDE THE LIST */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Your industry isn&apos;t here</Eyebrow>
            <H2>
              <span className="mt-2 block">
                That&apos;s fine — the list is illustrative.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              We&apos;ve deliberately not tried to list every industry a
              small operator or an enterprise could belong to. If you build,
              service, sell, or maintain something for a living and your
              operation would run better with custom software, we want to
              hear about it. One paragraph on what you do; we reply within
              one business day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Tell us your business" />
              <GhostLink href="/contact/" small>
                I&apos;m still figuring it out
              </GhostLink>
            </div>
          </div>
        </section>
      </Reveal>

      {/* SCOPE DISCIPLINE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What we do not build</Eyebrow>
            <H2>
              <span className="mt-2 block">A short list of no-thanks.</span>
            </H2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Card title="Regulated financial products">
              We are not a broker-dealer, investment adviser, or bank. If
              you need software that holds customer money or acts as a
              fiduciary, we&apos;re the wrong shop.
            </Card>
            <Card title="Clinical HIPAA workloads">
              We build operational software near healthcare (scheduling,
              admin, credentialing) but not systems of record for patient
              medical data. That needs a HIPAA-specialist vendor.
            </Card>
            <Card title="Money transmission">
              We do not run direct deposit, ACH, wire, or wallet features.
              Any money movement in software we build routes through the
              client&apos;s existing bank or a licensed processor.
            </Card>
            <Card title="Growth-hack playbooks">
              We don&apos;t ship dark patterns, forced sign-ups, hidden
              cancel flows, or engagement traps. If that&apos;s the brief,
              we&apos;ll turn it down politely.
            </Card>
          </div>
          <div className="mt-8">
            <Notice>
              If you&apos;re not sure whether your project falls inside
              scope, ask. We tell you honestly in the first email, before
              anyone commits.
            </Notice>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}

function IndustryCard({ industry }: { industry: Industry }) {
  const border = industry.featured ? "border-accentDim" : "border-line";
  const bg = industry.featured ? "bg-accentSoft/20" : "bg-transparent";
  return (
    <Link
      href={industry.href}
      className={`group flex flex-col justify-between border ${border} ${bg} p-6 transition-all duration-200 ease-soft hover:border-accentDim hover:bg-surface/50`}
    >
      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
            Industry
          </p>
          {industry.liveExample ? (
            <AccentChip>Live client</AccentChip>
          ) : (
            <StatusChip>Ask us</StatusChip>
          )}
        </div>
        <h3 className="mt-4 text-[17px] font-semibold leading-tight text-ink group-hover:text-accentHi">
          {industry.title}
        </h3>
        <p className="mt-3 text-[13px] leading-[1.6] text-mute">
          {industry.body}
        </p>
        {industry.liveExample ? (
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted">
            Live: {industry.liveExample}
          </p>
        ) : null}
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-accent">
        {industry.liveExample ? "Read the vertical page →" : "Tell us more →"}
      </p>
    </Link>
  );
}
