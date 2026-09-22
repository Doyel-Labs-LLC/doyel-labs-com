import type { Metadata } from "next";
import {
  AccentChip,
  Card,
  Eyebrow,
  GhostLink,
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
import { PayrollBatchFrame } from "@/components/frames/payroll-batch";
import { PayrollPaystubFrame } from "@/components/frames/payroll-paystub";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { Reveal } from "@/components/reveal";
import { payrollDisclaimer, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payroll workspaces — custom pay-run software for any business",
  description:
    "Doyel Labs builds custom payroll workspaces for any business — day-rate contractors, hourly + overtime, salaried teams, tipped employees, per-diem, or a mix. Your bank pays the money; the software prepares the run, tracks compliance, and keeps a defensible record. Not tax filing, not money movement.",
  alternates: { canonical: `https://${site.domain}/services/payroll/` },
  openGraph: {
    title: "Payroll workspaces — custom pay-run software | Doyel Labs",
    description:
      "Custom payroll workspaces built to how your business actually pays people. Day-rate, hourly, salaried, tipped, per-diem — or any mix.",
    url: `https://${site.domain}/services/payroll/`,
    type: "website",
  },
};

/** JSON-LD Service schema — mirrors /services/custom-software so every
 * service deep-page is a distinct, priced offering Google can surface.
 * Price band matches /pricing/ (payroll: $8k–$20k). */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/services/payroll/#service`,
  serviceType: "Payroll workspace development",
  name: "Payroll workspace development",
  description:
    "Custom pay-run workspaces built to how a business actually pays people — day-rate, hourly + overtime, salaried, tipped, per-diem, or any mix. Prepares runs and keeps a defensible record; not tax filing, not money movement.",
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
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

/**
 * Everything on this page maps to a file that actually exists in
 * `C:\Users\bdoye\Desktop\index\` (kept out of git). No feature is
 * claimed that the app does not implement.
 */
export default function Payroll() {
  return (
    <Page
      bandFooter={
        <div>
          <p className="max-w-prose text-[12px] leading-relaxed text-muted">
            {payrollDisclaimer}
          </p>
          <MetaRow>
            Source of truth · index/steadfast-payroll-app.html · index/netlify/functions/payroll.js
          </MetaRow>
        </div>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: "Services", href: "/services/" },
          { name: "Payroll", href: "/services/payroll/" },
        ]}
      />

      {/* HERO — SCA-first is what's live (SteadFast); the framing here is
       * "we build payroll workspaces of any shape" — SCA is the strongest
       * current example, not the whole scope. */}
      <section className="hero-glow pt-4">
        <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:items-center md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Services · Payroll workspaces</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                Pay who you pay, on{" "}
                <span className="text-accent">your rules</span>.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                Custom payroll workspaces shaped to how your business
                actually pays people — day-rate contractors, hourly and
                overtime, salaried teams, tipped employees, per-diem, or
                any mix. Your bank pays the money; the software prepares
                the run, tracks the compliance you answer to, and keeps
                a record you can defend. Tell us the operation and
                we&apos;ll build the workspace.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Talk to us" />
              <GhostLink href="/work/" small>
                Read the SteadFast case study
              </GhostLink>
              <GhostLink href="/pricing/" small>
                Pricing bands
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>Not a payroll processor</AccentChip>
              <AccentChip>Not a money transmitter</AccentChip>
              <AccentChip>Not tax filing</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <PayrollScaFrame />
          </div>
        </div>
      </section>

      {/* WHAT WE CAN BUILD — broader than SCA */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What we can build</Eyebrow>
            <H2>
              <span className="mt-2 block">
                A payroll workspace, shaped to your operation.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Not every business needs SCA compliance. Some need overtime
              and tip pooling. Some need weekly + bi-weekly runs on
              different teams. Some just need a clean stub the accountant
              can&apos;t argue with. We ship the workspace that fits, on
              your own domain, with the compliance rules you actually
              answer to.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Day-rate contractors">
              For operators paying independent contractors by the day.
              Optional SCA floor check for federal service work; skip it
              if your contracts aren&apos;t SCA-covered.
            </Card>
            <Card title="Hourly + overtime">
              Clock-in / clock-out capture, weekly totals, overtime at
              1.5×, state-specific rules where they matter. Stubs itemize
              regular vs. OT hours.
            </Card>
            <Card title="Salaried teams">
              Fixed-period runs with deduction lines the accountant
              defines. Bonuses, commissions, and stipends land as
              separate stub lines, not opaque totals.
            </Card>
            <Card title="Tipped employees">
              Declared-tip capture, tip-pool split by rule, minimum-wage
              top-up where required by state.
            </Card>
            <Card title="Per-diem + reimbursements">
              Non-taxable per-diem lines, expense reimbursements, and
              mileage entries that stay separate from taxable wages on
              the stub.
            </Card>
            <Card title="Multi-entity runs">
              One workspace, multiple pay entities (LLCs, DBAs). Each
              entity has its own EIN, WD (if applicable), and email
              from-address. Audit rows stay per-entity.
            </Card>
          </div>
        </section>
      </Reveal>

      {/* ONE EXAMPLE — frames the following bands as illustrative of what
       * a payroll workspace with real compliance depth looks like, not as
       * the definition of the payroll product. */}
      <Reveal>
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>One example we&apos;ve built</Eyebrow>
          <H2>
            <span className="mt-2 block">
              A pay-run workspace for a federal service contractor.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            The bands below walk through a real workspace we built for
            SteadFast Transportation Inc., which pays independent
            contractors on a USPS award and has to meet the Service
            Contract Act. The specific features — SAM.gov lookups, SCA
            floor checks, DOL-ready audit — are what <em>that</em>{" "}
            operation needed. Yours will need different pieces. The point
            is the same: a workspace that fits the rules you actually
            answer to.
          </p>
        </div>
      </section>
      </Reveal>

      {/* HOW THE FLOOR CHECK WORKS — text-only band that expands on the hero frame */}
      <Reveal>
      <section className="mt-16">
        <div className="max-w-3xl">
          <Eyebrow>How the SteadFast floor check works</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Every draft passes the SCA floor before it leaves the app.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            Under 41 U.S.C. §§ 6701–6707 the day rate must clear
            <code className="ml-1 font-mono text-ink">
              (base wage + H&W fringe) × 8
            </code>
            . The app pulls the base wage and the H&W fringe from the wage
            determination for the contractor&apos;s county on SAM.gov,
            computes the floor, and refuses to issue a stub below it. The
            whole transaction is on the stub. Legal citation, county-level
            wage determination, computed floor, and cleared-or-blocked
            state — all on every draft, every time.
          </p>
          <p className="mt-4 text-[14px] text-muted">
            If your business runs under a different compliance regime —
            state overtime, tip credits, union rate cards, whatever — we
            build the equivalent check for your rules.
          </p>
        </div>
      </section>
      </Reveal>

      {/* PROOF · Batch */}
      <Reveal>
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Pay run</Eyebrow>
            <H2>
              <span className="mt-2 block">One period, one form, one signed batch.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Pick month, year, and half. Pick contractors. The app pulls each
              contractor's day rate and WD profile, runs the SCA check on every
              row, and produces a batch of PDF stubs. Stubs email from the
              operator's own domain via Resend; the app never emails from a
              Doyel Labs address.
            </p>
          </div>
          <PayrollBatchFrame />
        </div>
      </section>
      </Reveal>

      {/* PROOF · Paystub */}
      <Reveal>
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Stub</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Every stub carries the compliance line.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              The stub names the wage determination, the base wage, the H&W
              fringe, the resulting floor, and whether the day rate cleared
              it. YTD gross and YTD net are on the stub, tabular-numbered.
              Deduction lines are freeform, added by the operator; the app
              does not compute federal withholding.
            </p>
          </div>
          <PayrollPaystubFrame />
        </div>
      </section>
      </Reveal>

      {/* PROOF · Audit */}
      <Reveal>
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Audit</Eyebrow>
            <H2>
              <span className="mt-2 block">
                A DOL inspector should read this without a phone call.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Every draft, every emailed stub, every rate change, every WD
              lookup, and every blocked SCA-short draft leaves a row. The log
              exports to CSV. Retention is 180 days by default; the operator
              is expected to keep the CSV against the SCA's 3-year rule.
            </p>
          </div>
          <PayrollAuditFrame />
        </div>
      </section>
      </Reveal>

      {/* Features */}
      <Reveal>
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>Features in the SteadFast workspace</Eyebrow>
        <H2>
          <span className="mt-2 block">
            From the actual code — one build, not a menu.
          </span>
        </H2>
        <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
          Below is what shipped for SteadFast. Your build will share the
          bones — server storage per operator, audit log, passkey
          sign-in, backups — and swap the domain-specific pieces for
          yours.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Contractor register">
            Names, SSN (encrypted at rest), state, WD, contract number, day
            rate, min wage, H&W fringe, vacation handling (cash-in-lieu under
            §4.173 or accrue), YTD gross, YTD deductions.
          </Card>
          <Card title="Pay period">
            Month + year + half (1st–15th, 16th–end, or full-month variants).
            Federal-holiday auto-detection for the period. Pay date defaults
            to the operator's schedule.
          </Card>
          <Card title="WD auto-lookup">
            Enter city + state. The app geocodes to a county, finds the
            active SCA wage determination on SAM.gov, downloads it, and
            parses base wage and H&W fringe. Two-year revision reminder is
            on the dashboard.
          </Card>
          <Card title="Batch run">
            Select the active contractors, review the batch, download every
            stub as PDF, or email the batch.
          </Card>
          <Card title="Stub email">
            Sent via Resend from the operator's own address (e.g.
            payroll@steadfasttransportationinc.com). Reply-to is the operator's
            inbox. Doyel Labs is not on the email header.
          </Card>
          <Card title="Passkeys">
            Passkey enrolment for the operator workspace. Optional. Falls
            back to a strong password with PBKDF2 hashing and a lockout after
            repeated failures.
          </Card>
          <Card title="Server storage">
            Contractor records, drafts, audit rows, and passkey metadata live
            in Netlify Blobs scoped to the operator. Local browser cache is a
            fallback.
          </Card>
          <Card title="Security audit console">
            Every sign-in, password change, passkey add / remove, and reset
            event. Filter chips, CSV export, and a retention cleanup.
          </Card>
          <Card title="Backups">
            Export a full JSON backup, download a formatted DOCX report, or
            pull the server's own backup file. Import merges without
            overwriting.
          </Card>
        </div>
      </section>
      </Reveal>

      {/* Does not do */}
      <Reveal>
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What the payroll app does not do</Eyebrow>
        <H2>
          <span className="mt-2 block">
            Read this before you compare it to a payroll processor.
          </span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="No tax filing">
            The app does not file federal, state, or local returns. It does
            not compute federal income-tax withholding. Deduction lines are
            freeform, entered by the operator.
          </Card>
          <Card title="No money movement">
            The app does not run direct deposit, ACH, wire, or any form of
            wage transfer. The operator pays through their own bank. Doyel
            Labs never touches funds.
          </Card>
          <Card title="Not a payroll processor">
            The software is a compliance and record-keeping workspace. The
            operator is the payer of record. Doyel Labs LLC is not a payroll
            processor, professional employer organization, or reporting
            agent for any tax authority.
          </Card>
          <Card title="Not a money transmitter">
            No customer funds are held, at any time, in any account
            controlled by Doyel Labs. The software cannot move money even if
            a user asked it to.
          </Card>
        </div>
      </section>
      </Reveal>

      {/* Payroll data map preview */}
      <Reveal>
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>Payroll data</Eyebrow>
        <H2>
          <span className="mt-2 block">
            Held by the operator, held by us, held by nobody.
          </span>
        </H2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="The operator's own machine">
            <ul className="list-disc space-y-1 pl-4">
              <li>Downloaded stubs</li>
              <li>Backup exports (JSON, DOCX)</li>
              <li>Local cache of contractor list</li>
            </ul>
          </Card>
          <Card title="Doyel Labs (server side)">
            <ul className="list-disc space-y-1 pl-4">
              <li>Contractor register, drafts, audit rows</li>
              <li>Passkey metadata, password hash (PBKDF2)</li>
              <li>Retention: 180 days on the security audit</li>
              <li>Storage: Netlify Blobs, per operator</li>
            </ul>
          </Card>
          <Card title="Never held anywhere by us">
            <ul className="list-disc space-y-1 pl-4">
              <li>Bank routing or account numbers</li>
              <li>Contractor wages as a transferrable balance</li>
              <li>Card numbers (Stripe if billing exists)</li>
            </ul>
          </Card>
        </div>
        <p className="mt-8 max-w-prose text-[13px] text-mute">
          The full data-processing description, retention windows, and
          subprocessors will publish at{" "}
          <a href="/legal/payroll-data/" className="underline">
            /legal/payroll-data
          </a>{" "}
          once counsel signs.
        </p>
      </section>
      </Reveal>

      {/* Close */}
      <Reveal>
      <section className="mt-24 border-t border-line pt-16">
        <Notice>
          Payroll software from Doyel Labs is one tool inside an operator's
          own accounting stack. If you need tax filing or wage transfer, you
          need a payroll processor; we can integrate ours with theirs. Ask{" "}
          <a
            href={`mailto:${site.supportEmail}`}
            className="underline decoration-line2 underline-offset-2 hover:text-ink"
          >
            {site.supportEmail}
          </a>
          .
        </Notice>
      </section>
      </Reveal>
    </Page>
  );
}
