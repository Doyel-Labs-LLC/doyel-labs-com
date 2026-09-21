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
import { ClientBadge } from "@/components/client-badge";
import { ContactWidget } from "@/components/contact-modal";
import { PayrollAuditFrame } from "@/components/frames/payroll-audit";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { Quote } from "@/components/quote";
import { Reveal } from "@/components/reveal";
import { steadfastCase } from "@/lib/demo/websites";
import { site } from "@/lib/site";
import { steadfastTestimonial } from "@/lib/testimonials";

/**
 * Landing page for federal service contractors — the niche Doyel Labs
 * actively serves (SCA-first payroll, wage-determination lookups,
 * DOL-inspection audit trails). This page is search-targeted: it aims
 * to rank for phrases operators actually type (e.g. "SCA payroll
 * software for USPS contractors", "SAM.gov wage determination lookup",
 * "day-rate contractor pay stub compliance").
 */
export const metadata: Metadata = {
  title:
    "Software for federal service contractors — SCA payroll, wage-determination compliance, DOL-ready audit trails",
  description:
    "Doyel Labs builds custom software for federal service contractors under the Service Contract Act. SAM.gov wage-determination lookups, day-rate floor checks on every draft, stubs from your own domain, and an audit log a DOL inspector can read on the first request. Live with a USPS route contractor since 2026.",
  keywords: [
    "federal service contractor software",
    "SCA payroll",
    "Service Contract Act payroll",
    "SAM.gov wage determination",
    "USPS route contractor software",
    "day-rate contractor payroll",
    "H&W fringe compliance",
    "DOL audit software",
    "41 U.S.C. 6707",
    "wage determination lookup software",
  ],
  alternates: {
    canonical: `https://${site.domain}/industries/federal-service-contractors/`,
  },
  openGraph: {
    title:
      "Software for federal service contractors | Doyel Labs",
    description:
      "SCA payroll, SAM.gov wage-determination compliance, day-rate floor checks, and DOL-ready audit trails. Custom software for federal service contractors.",
    url: `https://${site.domain}/industries/federal-service-contractors/`,
    type: "website",
  },
};

/** JSON-LD Service schema — helps Google understand this is a specific
 * offering with concrete deliverables, priced per project. */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/industries/federal-service-contractors/#service`,
  serviceType: "Software development for federal service contractors",
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "Federal service contractors, USPS route contractors, day-rate contractor operators",
  },
  name: "SCA-first payroll and compliance software",
  description:
    "Custom software for federal service contractors: SCA payroll workspaces, SAM.gov wage-determination lookups, day-rate floor checks, and DOL-ready audit trails. Priced per project, shipped in weeks.",
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: 8000,
      maxPrice: 20000,
      priceCurrency: "USD",
    },
    url: `https://${site.domain}/pricing/`,
  },
};

export default function FederalServiceContractors() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Doyel Labs is not a federal-benefits administrator, not a payroll
          processor, and not a money transmitter. Every dollar amount above
          is illustrative; the DOL wage determinations linked in the app
          come directly from SAM.gov.
        </MetaRow>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: "Industries", href: "/industries/federal-service-contractors/" },
          {
            name: "Federal service contractors",
            href: "/industries/federal-service-contractors/",
          },
        ]}
      />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:items-center md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Industries · Federal service contractors</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                Built for the <span className="text-accent">Service Contract Act</span>.
                Not against it.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                Doyel Labs builds software for the operator who runs a USPS
                route, a base service contract, or any federal award where
                the payroll needs to hold up to a DOL inspection. Every
                stub carries the wage determination. Every draft passes
                the day-rate floor. Every rate change lands in an audit
                row your inspector can read.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Talk to us" />
              <GhostLink href="/case-studies/steadfast/" small>
                Read the SteadFast case study
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>SAM.gov WD lookup</AccentChip>
              <AccentChip>Day-rate floor check</AccentChip>
              <AccentChip>3-year audit retention</AccentChip>
              <AccentChip>H&amp;W fringe on every stub</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <PayrollScaFrame />
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Who this is for</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Operators of federal service contracts.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Anyone who has to pay day-rate independent contractors on a
              federally awarded service contract and needs to prove SCA
              compliance to the Department of Labor. Especially:
            </p>
          </div>
          <div className="mt-10">
            <Grid3>
              <Card title="USPS route contractors">
                Highway Contract Route (HCR), Rural Route (RCR), and CDS
                mail-transport contractors paying drivers, sorters, and
                casing help by the day.
              </Card>
              <Card title="Base service contractors">
                Grounds, custodial, food-service, and facility contractors
                on military base awards where SCA wage determinations
                govern day-rate pay.
              </Card>
              <Card title="GSA / Schedule holders">
                Small businesses on GSA schedules with service line items
                that fall under 41 U.S.C. §§ 6701–6707.
              </Card>
              <Card title="Subcontractor operators">
                Independent operators subcontracting under a prime, whose
                own payroll still has to meet the SCA floor even if the
                prime does the filing.
              </Card>
              <Card title="1099 shops going W-2-adjacent">
                Operators moving from a purely 1099 model to one where
                the SCA record-keeping burden is on the payer even
                without direct employment.
              </Card>
              <Card title="Post-award compliance ops">
                Contracting officers, ops managers, or bookkeepers who
                have to produce the pay records on demand and have been
                burned by a spreadsheet-based system.
              </Card>
            </Grid3>
          </div>
        </section>
      </Reveal>

      {/* WHY THIS IS HARD */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Why this is hard</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Off-the-shelf payroll isn&apos;t built for the SCA.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Gusto, ADP, QuickBooks, and Rippling are built for W-2
              employees on straight-time hourly wages. Federal service
              contracting has three quirks they don&apos;t handle
              cleanly:
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Feature step="01" title="Day rate, not hourly">
              SCA workers on service contracts are usually paid by the
              day, not by the clock. But the day rate has to clear an
              8-hour equivalent at the WD-mandated base wage plus H&amp;W
              fringe. Off-the-shelf systems can&apos;t do that check.
            </Feature>
            <Feature step="02" title="Per-county wage determinations">
              The applicable wage determination is county-specific and
              revised without notice on SAM.gov. Off-the-shelf systems
              don&apos;t look up your WD — you&apos;re expected to hand-
              type numbers that change every year.
            </Feature>
            <Feature step="03" title="DOL audits, not IRS ones">
              The inspection risk is a DOL audit for SCA compliance,
              not an IRS payroll-tax audit. The record set they want is
              different: WD numbers, county mapping, H&amp;W fringe
              itemized, per-stub floor check.
            </Feature>
          </div>
        </section>
      </Reveal>

      {/* WHAT WE BUILD FOR YOU */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What we build for you</Eyebrow>
            <H2>
              <span className="mt-2 block">
                A payroll workspace that speaks SCA natively.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              We ship a per-operator workspace, deployed to your own domain,
              with the following features already implemented on our
              current live operator (SteadFast Transportation Inc.). Every
              item below exists in real code, not on a roadmap slide.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card title="SAM.gov wage-determination auto-lookup">
              Enter city + state. The app geocodes to a county, pulls the
              active SCA WD from SAM.gov, and parses the base wage +
              H&amp;W fringe. Two-year revision reminder on the
              dashboard.
            </Card>
            <Card title="Day-rate floor enforcement">
              Every draft computes{" "}
              <code className="font-mono text-ink">
                (base wage + H&amp;W) × 8
              </code>{" "}
              and refuses to issue a stub below that floor. The whole
              check is on the stub.
            </Card>
            <Card title="Per-contractor register">
              Names, SSN encrypted at rest, state, WD number, day rate,
              minimum wage, H&amp;W fringe, vacation handling under
              §4.173.
            </Card>
            <Card title="Batch pay runs">
              Pick a period + contractors. The app produces every stub
              as PDF in one action. Stubs email from your own domain via
              Resend — Doyel Labs is never on the email header.
            </Card>
            <Card title="Audit log a DOL inspector can read">
              Every stub generated, every stub emailed, every rate change,
              every WD lookup, every blocked SCA-short draft. CSV export.
              180-day retention; operator keeps the CSV for the SCA
              3-year rule.
            </Card>
            <Card title="Passkey sign-in">
              WebAuthn enrolment on the operator workspace. Fallback to
              password (PBKDF2) with rate-limited lockout.
            </Card>
            <Card title="Server storage per operator">
              Contractor records, drafts, and audit rows in Netlify Blobs
              scoped to your operator. Local browser cache is a fallback
              only.
            </Card>
            <Card title="Backups you can walk away with">
              Export a full JSON backup or a DOCX report. Import merges
              without overwriting. Your workspace, your bytes.
            </Card>
            <Card title="On your domain">
              Deployed at{" "}
              <code className="font-mono text-ink">
                yourcompany.com/payroll
              </code>{" "}
              (or a subdomain). Your logo, your typography, your
              contractor list — nothing branded Doyel Labs on the
              operator-facing UI.
            </Card>
          </div>
        </section>
      </Reveal>

      {/* PROOF — audit */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>The audit trail</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  What a DOL inspector actually reads.
                </span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                The audit log is the whole point. When an inspector
                asks for the pay records, you export a CSV, hand them a
                stub PDF for any contractor + period, and point at the
                WD number on the header. Nothing is hidden behind an
                accountant.
              </p>
            </div>
            <PayrollAuditFrame />
          </div>
        </section>
      </Reveal>

      {/* CASE STUDY POINTER */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>In practice</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Live on a USPS route contractor since 2026.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              SteadFast Transportation Inc. operates federally awarded USPS
              contract-delivery routes across rural Montana and North
              Dakota. Doyel Labs built their marketing site, their
              SCA-first payroll workspace, and the plumbing that ties them
              together — shipped in about six weeks.
            </p>
            <div className="mt-6">
              <ClientBadge
                name={steadfastCase.name}
                logo={steadfastCase.logo}
                url={steadfastCase.liveUrl}
              />
            </div>
            <div className="mt-8">
              <Quote
                attribution={steadfastTestimonial.attribution}
                company={steadfastTestimonial.company}
                companyUrl={steadfastTestimonial.companyUrl}
                logo={steadfastTestimonial.logo}
              >
                {steadfastTestimonial.short}
              </Quote>
            </div>
            <div className="mt-8">
              <GhostLink href="/case-studies/steadfast/" small>
                Read the full case study
              </GhostLink>
            </div>
          </div>
        </section>
      </Reveal>

      {/* WHAT WE DON'T DO */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Scope discipline</Eyebrow>
            <H2>
              <span className="mt-2 block">
                What SCA payroll from Doyel Labs does not do.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              We ship a compliance and record-keeping workspace, not a
              full-service payroll processor. Read this before you compare
              us to ADP.
            </p>
          </div>
          <div className="mt-10">
            <Grid2>
              <Card title="No tax filing">
                The app does not file federal, state, or local returns.
                Deduction lines are freeform. Your accountant or CPA still
                owns the tax side.
              </Card>
              <Card title="No money movement">
                The app does not run direct deposit, ACH, wire, or any
                wage transfer. You pay through your own bank. Doyel Labs
                never touches funds.
              </Card>
            </Grid2>
          </div>
        </section>
      </Reveal>

      {/* CLOSE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Start a build</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  Tell us the contract and the counties.
                </span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                Email us the contract type (HCR, RCR, GSA schedule, base
                service, etc.), the counties your contractors work in, and
                a rough headcount. We reply within one business day with a
                scope and a fixed price.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactWidget label="Start a build" />
                <GhostLink href="/pricing/" small>
                  Pricing bands
                </GhostLink>
              </div>
            </div>
            <div>
              <Notice>
                <p>
                  Doyel Labs is US-based, in Casper, Wyoming. Every server
                  we run for you sits on US infrastructure by default. If
                  your award requires a specific data-residency posture,
                  tell us in the first email; we can build to it.
                </p>
              </Notice>
            </div>
          </div>
        </section>
      </Reveal>

      {/* NOT A FEDERAL CONTRACTOR? */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Not a federal contractor?</Eyebrow>
            <H2>
              <span className="mt-2 block">
                We still probably build for you.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              This page is deep because SCA payroll is our current wedge —
              it&apos;s where we have live client work — but Doyel Labs is
              industry-agnostic. We build custom software for professional
              services, transportation, family-owned shops, e-commerce,
              real estate, nonprofits, healthcare admin, hospitality, and
              anyone else with an operation software can improve. Have a
              look at the full list, or tell us your industry directly.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <GhostLink href="/industries/" small>
                All industries we build for
              </GhostLink>
              <ContactWidget label="Tell us your business" />
            </div>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}
