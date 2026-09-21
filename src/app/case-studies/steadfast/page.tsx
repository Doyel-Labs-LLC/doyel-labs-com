import type { Metadata } from "next";
import Image from "next/image";
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
import { ClientBadge } from "@/components/client-badge";
import { ContactWidget } from "@/components/contact-modal";
import { PayrollPaystubFrame } from "@/components/frames/payroll-paystub";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { Quote } from "@/components/quote";
import { site } from "@/lib/site";
import { steadfastCase } from "@/lib/demo/websites";
import { steadfastTestimonial } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "SteadFast Transportation Inc. — case study",
  description:
    "Case study: how Doyel Labs built the SteadFast Transportation Inc. marketing site + SCA-first payroll workspace. Federal service contractor, rural USPS route administration, live at steadfasttransportationinc.com.",
};

export default function SteadfastCaseStudy() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Case study published with SteadFast Transportation Inc.'s
          permission. All contractor-level data is synthetic.
        </MetaRow>
      }
    >
      <Breadcrumbs
        items={[
          { name: "Work", href: "/work/" },
          { name: "SteadFast Transportation Inc.", href: "/case-studies/steadfast/" },
        ]}
      />

      {/* HERO */}
      <section className="hero-glow">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Case study</Eyebrow>
            <H1>
              A federal service contractor's{" "}
              <span className="text-accent">whole software stack</span>, shipped in six weeks.
            </H1>
            <Lead>
              SteadFast Transportation Inc. administers federally awarded
              USPS contract-delivery routes across rural Montana and
              North Dakota. Doyel Labs built their marketing site, their
              payroll workspace, and the plumbing that ties them
              together.
            </Lead>
            <div className="mt-6 flex flex-wrap gap-3">
              <AccentChip>Live at {steadfastCase.domain}</AccentChip>
              <AccentChip>In operator use</AccentChip>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Start a project" />
              <GhostLink
                href={steadfastCase.liveUrl}
                small
                external
              >
                Visit the live site
              </GhostLink>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <ClientBadge
              name={steadfastCase.name}
              logo={steadfastCase.logo}
              url={steadfastCase.liveUrl}
              size={64}
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIAL — up top so anyone landing here reads the client's words first */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>In their own words</Eyebrow>
        </div>
        <div className="mt-8">
          <Quote
            paragraphs={steadfastTestimonial.full}
            attribution={steadfastTestimonial.attribution}
            company={steadfastTestimonial.company}
            companyUrl={steadfastTestimonial.companyUrl}
            logo={steadfastTestimonial.logo}
            size="large"
          />
        </div>
      </section>

      {/* AT A GLANCE */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>At a glance</Eyebrow>
          <H2>
            <span className="mt-2 block">Two products, one domain, one operator.</span>
          </H2>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="Client">
              SteadFast Transportation Inc.
              <br />
              Plentywood, Montana
              <br />
              Rural USPS route administration
            </Card>
            <Card title="Scope">
              A 10-page marketing site on the operator's own domain and a
              password-gated SCA-first payroll workspace on the same
              domain.
            </Card>
            <Card title="Timeline">
              About six weeks total: marketing site in three days,
              payroll workspace in about a week, then iteration + polish
              as the operator ran real pay periods.
            </Card>
            <Card title="Stack">
              Static HTML on Netlify · Tailwind CSS · schema.org markup ·
              Formspree forms · Resend for stub email · Netlify Blobs for
              per-operator storage.
            </Card>
            <Card title="What ships weekly">
              Every business day a pay run happens somewhere on this
              workspace. Every stub carries the SCA floor line. Every
              draft passes the floor before it leaves the app.
            </Card>
            <Card title="Result">
              An operator running federal service contract routes with a
              paper trail a DOL inspector can read on the first request.
            </Card>
          </Grid3>
        </div>
      </section>

      {/* THE MARKETING SITE */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Marketing site</Eyebrow>
          <H2>
            <span className="mt-2 block">
              A ten-page site on {steadfastCase.domain}.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            Custom domain, mobile-first navigation, hero video, schema.org
            Organization markup, and forms wired to the operator's inbox.
            Deployed as static HTML on Netlify with LCP under two seconds
            on mid-tier mobile.
          </p>
        </div>

        <div className="mt-12">
          <figure className="not-prose">
            <div className="overflow-hidden border border-line bg-surface">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-line2" />
                <span className="h-2.5 w-2.5 rounded-full bg-line2" />
                <span className="h-2.5 w-2.5 rounded-full bg-line2" />
                <span className="ml-3 flex-1 truncate rounded-full border border-line px-3 py-1 font-mono text-[11px] text-mute">
                  https://www.{steadfastCase.domain}/
                </span>
                <span className="hidden font-mono text-[10px] uppercase tracking-wide text-accent md:inline">
                  Live
                </span>
              </div>
              <Image
                src="/media/websites/steadfast-hero-v2.jpg"
                alt="Screenshot of the SteadFast Transportation Inc. home page."
                width={1600}
                height={900}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-wide text-muted">
              Home page · steadfasttransportationinc.com/
            </figcaption>
          </figure>
        </div>

        <div className="mt-12">
          <figure className="not-prose">
            <div className="overflow-hidden border border-line bg-surface">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-line2" />
                <span className="h-2.5 w-2.5 rounded-full bg-line2" />
                <span className="h-2.5 w-2.5 rounded-full bg-line2" />
                <span className="ml-3 flex-1 truncate rounded-full border border-line px-3 py-1 font-mono text-[11px] text-mute">
                  https://www.{steadfastCase.domain}/contractors.html
                </span>
              </div>
              <Image
                src="/media/websites/steadfast-contractors-v2.jpg"
                alt="Screenshot of the SteadFast Transportation Inc. contractors page."
                width={1600}
                height={900}
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-wide text-muted">
              Contractors page · owner-operator inquiry funnel
            </figcaption>
          </figure>
        </div>

        <div className="mt-16">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">
            <span className="accent-bar" />
            What shipped on the marketing side
          </p>
          <div className="mt-6">
            <Grid3>
              <Card title="10 pages">
                Home, About, Services, Routes, Contractors, FAQ, Contact,
                Thank you, Privacy, Terms.
              </Card>
              <Card title="schema.org markup">
                Organization, PostalAddress, and telephone JSON-LD so
                search engines get the business on the first crawl.
              </Card>
              <Card title="Mobile-first nav">
                Sticky top nav with focus states, skip-link for keyboard
                users, WCAG AA contrast throughout.
              </Card>
              <Card title="Hero video">
                Muted looping video on the home hero with a poster
                fallback for slow connections and print-media font preload.
              </Card>
              <Card title="Contact + inquiry forms">
                Formspree-backed with honeypot bot filter. Submissions go
                straight to the operator's inbox, not ours.
              </Card>
              <Card title="Privacy-friendly analytics">
                Plausible for page views. Microsoft Clarity for session
                review — both configured by the operator.
              </Card>
            </Grid3>
          </div>
        </div>
      </section>

      {/* PAYROLL */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Payroll workspace</Eyebrow>
          <H2>
            <span className="mt-2 block">
              SteadFast Payroll — SCA-first pay runs.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            A password-gated workspace that lives at{" "}
            <code className="font-mono text-ink">
              {steadfastCase.domain}/steadfast-payroll-app.html
            </code>
            . Built specifically for federal service contractors paying
            day-rate independent contractors under the Service Contract
            Act. Every draft passes the day-rate floor before it leaves
            the app.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              The floor check
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-mute">
              For every stub, the app pulls the operator's SAM.gov wage
              determination for the contractor's county, computes the
              floor{" "}
              <code className="font-mono text-ink">
                (base wage + H&W) × 8
              </code>
              , and blocks any draft whose day rate doesn't clear it.
            </p>
          </div>
          <PayrollScaFrame />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              The stub
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-mute">
              Every stub carries the compliance line — WD number, base
              wage, H&W fringe, resulting floor, met or not. YTD gross
              and YTD net are on the stub, tabular-numbered. Stubs email
              from the operator's own domain via Resend.
            </p>
          </div>
          <PayrollPaystubFrame />
        </div>

        <div className="mt-16">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">
            <span className="accent-bar" />
            What shipped on the payroll side
          </p>
          <div className="mt-6">
            <Grid3>
              <Card title="Contractor register">
                Names, SSN encrypted at rest, state, WD number, day rate,
                minimum wage, H&W fringe, vacation handling.
              </Card>
              <Card title="Wage-determination auto-lookup">
                City + state → geocode to county → active SAM.gov WD →
                parsed base wage and H&W fringe. Two-year revision
                reminder on the dashboard.
              </Card>
              <Card title="SCA floor enforcement">
                Every draft checks{" "}
                <code className="font-mono text-ink">
                  (base wage + H&W) × 8
                </code>
                . Under-floor drafts are blocked.
              </Card>
              <Card title="Batch pay runs">
                Pick a period and contractors. The app produces every
                stub as PDF in one action.
              </Card>
              <Card title="Stub email from the operator's domain">
                Sent via Resend from{" "}
                <code className="font-mono text-ink">
                  payroll@steadfasttransportationinc.com
                </code>
                . Doyel Labs is not on the email header.
              </Card>
              <Card title="Audit log with CSV export">
                Every stub generated, emailed, or blocked. Every rate
                change. Every sign-in. 180-day retention; operator keeps
                the CSV for the SCA's 3-year rule.
              </Card>
              <Card title="Passkey sign-in">
                WebAuthn enrolment on the operator workspace. Falls back
                to password (PBKDF2) with rate-limited lockout.
              </Card>
              <Card title="Server storage per operator">
                Contractor records, drafts, and audit rows in Netlify
                Blobs scoped to the operator. Local browser cache is a
                fallback only.
              </Card>
              <Card title="Backups you can walk away with">
                Export a full JSON backup or a formatted DOCX report.
                Import merges without overwriting. Your workspace, your
                bytes.
              </Card>
            </Grid3>
          </div>
        </div>
      </section>

      {/* HOW WE APPROACHED IT */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Approach</Eyebrow>
          <H2>
            <span className="mt-2 block">
              How Doyel Labs shipped this quickly.
            </span>
          </H2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Feature step="01" title="Read the compliance regime first">
            Before writing code, we mapped 41 U.S.C. §§ 6701–6707 to the
            fields on a stub. AI helped skim the FAR clauses; humans
            confirmed with the operator's actual USPS solicitation.
          </Feature>
          <Feature step="02" title="Wireframe → schema → UI in one loop">
            AI drafted the Firestore-shaped data model, migration SQL,
            and the UI form in parallel. We shipped the register within
            two days.
          </Feature>
          <Feature step="03" title="Run a real pay period before locking scope">
            Instead of a spec-first approach, we ran a live pay period
            with real (redacted, then live) contractors on day 5. Every
            crash, every stub error, every "wait, what does this button
            do?" was fixed the same day.
          </Feature>
          <Feature step="04" title="Then harden the audit trail">
            Once the pay path worked, we hardened the audit log to a DOL
            inspector's read: every state change becomes a row, every
            row exports to CSV, every export is timestamped.
          </Feature>
        </div>
      </section>

      {/* WHAT WE DID NOT DO */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Scope discipline</Eyebrow>
          <H2>
            <span className="mt-2 block">What SteadFast Payroll doesn't do.</span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            The current build is scoped tightly. These features would be
            fair game for a future release, but shipping without them let
            us hit the operator's first pay period in a week.
          </p>
        </div>
        <div className="mt-12">
          <Grid2>
            <Card title="No tax filing">
              The app doesn't file federal, state, or local returns. It
              doesn't compute income-tax withholding. Deduction lines are
              freeform, entered by the operator or their bookkeeper.
            </Card>
            <Card title="No money movement">
              The app doesn't run direct deposit, ACH, wire, or any form
              of wage transfer. SteadFast pays through its own bank.
              Doyel Labs never touches funds.
            </Card>
          </Grid2>
        </div>
      </section>

      {/* CLOSE */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Your project next</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Tell us what you're trying to run.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              We build for federal service contractors, small operators,
              and mid-market companies who need software that doesn't
              lock them in. If you can describe the operation in a
              paragraph, we can quote it in a business day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Start a project" />
              <GhostLink href={site.phoneHref} small external>
                Call {site.phone}
              </GhostLink>
            </div>
          </div>
          <div />
        </div>
        <div className="mt-16">
          <Notice>
            More case studies land here as new engagements complete.
            See every named client review, in full, on{" "}
            <a
              href="/reviews/"
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              /reviews
            </a>
            . If you&apos;d like a reference call with the SteadFast
            owner about what shipping with Doyel Labs was like,{" "}
            <a
              href={`mailto:${site.supportEmail}?subject=Reference%20call%20request`}
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              ask
            </a>
            .
          </Notice>
        </div>
      </section>
    </Page>
  );
}
