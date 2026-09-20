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
  PrimaryLink,
} from "@/components/chrome";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { WebsiteSteadfastFrame } from "@/components/frames/websites-preview";
import { site } from "@/lib/site";
import { steadfastCase } from "@/lib/demo/websites";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Two commercial services from Doyel Labs — payroll software for federal service contractors, and marketing websites for small operators. Live example: SteadFast Transportation Inc.",
};

export default function Services() {
  return (
    <Page>
      {/* HERO */}
      <section className="pt-24 md:pt-32">
        <Eyebrow>Services</Eyebrow>
        <H1>
          Two things we sell — <span className="text-accent">honestly</span> priced.
        </H1>
        <Lead>
          Payroll software for federal service contractors, and websites for
          small operators. We do not sell CRMs, applicant-tracking, booking
          systems, or anything that has to live inside an enterprise
          directory. If the software has to move money or make a compliance
          claim, we build it local-first and say what it does not do.
        </Lead>
        <div className="mt-10 flex flex-wrap gap-3">
          <PrimaryLink href="#payroll">Payroll</PrimaryLink>
          <GhostLink href="#websites" small>
            Websites
          </GhostLink>
          <GhostLink href="#engagement" small>
            How an engagement works
          </GhostLink>
          <GhostLink href="#pricing" small>
            Pricing
          </GhostLink>
        </div>
      </section>

      {/* ═══ PAYROLL ═══════════════════════════════════════════════════ */}
      <section id="payroll" className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Service 01 · Payroll</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Pay day-rate contractors the SCA way.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              A pay-run workspace built for federal service contractors and
              small operators paying day-rate independent contractors under
              the Service Contract Act. Every draft passes the day-rate
              floor before it leaves the app.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <AccentChip>
                In use at SteadFast Transportation Inc.
              </AccentChip>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryLink href="/services/payroll/" small>
                Payroll product page
              </PrimaryLink>
              <GhostLink
                href={`mailto:${site.supportEmail}?subject=Payroll%20inquiry`}
                small
                external
              >
                Talk to us
              </GhostLink>
            </div>
          </div>
          <PayrollScaFrame />
        </div>

        {/* Feature grid */}
        <div className="mt-16">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">
            <span className="accent-bar" />
            What is in the app today
          </p>
          <div className="mt-6">
            <Grid3>
              <Card title="Contractor register">
                Names, SSN (encrypted), state, WD number, contract number,
                day rate, minimum wage, H&W fringe, vacation handling (cash-in-lieu under §4.173 or accrue), YTD gross, YTD deductions.
              </Card>
              <Card title="Wage-determination lookup">
                Enter a city and state. The app geocodes to a county, finds
                the active SCA wage determination on SAM.gov, downloads it,
                and parses the base wage and H&W fringe automatically.
              </Card>
              <Card title="SCA floor enforcement">
                Every draft checks{" "}
                <code className="font-mono text-ink">
                  (base wage + H&W) × 8
                </code>{" "}
                against the day rate. Drafts under the floor are blocked
                until the operator fixes them.
              </Card>
              <Card title="Batch pay run">
                Pick a period and a set of contractors. The app runs the SCA
                check on every row and produces the whole batch of PDF stubs
                in one action.
              </Card>
              <Card title="Stub email from your domain">
                Stubs are emailed via Resend from the operator's own
                address (e.g. payroll@your-company.com). Doyel Labs is not
                on the email header. Reply-to is the operator's inbox.
              </Card>
              <Card title="Audit log a DOL inspector can read">
                Paystub generated, paystub emailed, WD lookup, SCA-block,
                rate change, sign-in, passkey enrolment. CSV export.
                180-day server retention; the operator keeps the CSV.
              </Card>
              <Card title="Passkeys">
                WebAuthn passkey enrolment on the operator workspace.
                Optional. Falls back to password with PBKDF2 hashing and
                rate-limited lockout.
              </Card>
              <Card title="Server storage per operator">
                Contractor records, drafts, and audit rows live in Netlify
                Blobs scoped to the operator's namespace. Local browser
                cache is a fallback only.
              </Card>
              <Card title="Backups you can walk away with">
                Export a full JSON backup or a formatted DOCX report. Import
                merges without overwriting. Your workspace, your bytes.
              </Card>
            </Grid3>
          </div>
        </div>

        {/* What it doesn't do */}
        <div className="mt-16">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">
            <span className="accent-bar" />
            What the payroll product does not do
          </p>
          <div className="mt-6">
            <Grid2>
              <Card title="No tax filing">
                We do not file federal, state, or local returns. We do not
                compute income-tax withholding. Deduction lines are
                freeform, entered by the operator or their bookkeeper.
              </Card>
              <Card title="No money movement">
                The software does not run direct deposit, ACH, wire, or any
                form of wage transfer. The operator pays through their own
                bank. Doyel Labs never touches funds.
              </Card>
              <Card title="Not a payroll processor">
                We are a compliance and record-keeping workspace, not a
                payroll processor, professional employer organization, or
                reporting agent for any tax authority.
              </Card>
              <Card title="Not a money transmitter">
                No customer funds are held at any time in any account
                controlled by Doyel Labs. The software cannot move money
                even if a user asked it to.
              </Card>
            </Grid2>
          </div>
        </div>
      </section>

      {/* ═══ WEBSITES ══════════════════════════════════════════════════ */}
      <section id="websites" className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Service 02 · Websites</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Fast sites that read well on a phone.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Marketing sites for small operators, built to open under two
              seconds on a mid-tier phone. Custom domain on your own
              registrar. Mobile-first navigation, schema.org markup, and
              forms wired to your inbox — not ours.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <AccentChip>Live at {steadfastCase.domain}</AccentChip>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryLink href="/services/websites/" small>
                Websites product page
              </PrimaryLink>
              <GhostLink href={steadfastCase.liveUrl} small external>
                View live example
              </GhostLink>
            </div>
          </div>
          <WebsiteSteadfastFrame />
        </div>

        {/* Every project ships with */}
        <div className="mt-16">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">
            <span className="accent-bar" />
            Every project ships with
          </p>
          <div className="mt-6">
            <Grid3>
              <Card title="Custom domain">
                On the registrar you already own, or one we help you
                choose. DNS on Cloudflare. HTTPS with HSTS preload.
              </Card>
              <Card title="Mobile-first design">
                Every page reads on a phone before it reads on a laptop.
                Sticky top nav, skip-link for keyboard users, focus rings
                on every interactive element.
              </Card>
              <Card title="Structured data">
                schema.org Organization, PostalAddress, and telephone
                markup. Search engines get a clean picture of the business
                on the first crawl.
              </Card>
              <Card title="Contact forms to your inbox">
                Formspree or your provider of choice. Every submission
                lands in an inbox you already read. No third-party CRM
                unless you asked for one.
              </Card>
              <Card title="Privacy-respecting analytics">
                Plausible if you want it. Cookieless. No personal data
                collected. Your visitors are not the product.
              </Card>
              <Card title="LCP under 2.0s">
                Static export on a global CDN. No render-blocking scripts,
                no bloated web fonts, no video hero that stalls the fold.
              </Card>
              <Card title="Content edits without a bill">
                Prices, phone numbers, copy — all live in a small set of
                files you can edit. If we run maintenance, one email lands
                the change within a business day.
              </Card>
              <Card title="Accessibility, by default">
                WCAG AA contrast, semantic headings, keyboard-reachable
                nav, alt text on every image that ships. Tested with a
                screen reader before we invoice.
              </Card>
              <Card title="Owned by you">
                Source lives on your Git host. If you fire us tomorrow,
                you keep everything and any developer can pick it up.
              </Card>
            </Grid3>
          </div>
        </div>

        {/* Steadfast case reference */}
        <div className="mt-16 border-l-2 border-accent bg-accentSoft/40 p-6">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
            Case reference
          </p>
          <p className="mt-3 text-[15px] text-ink">
            <strong>SteadFast Transportation Inc.</strong> — a federal
            service contractor running USPS contract-delivery routes across
            rural Montana and North Dakota. We built the whole site (ten
            pages), plus a password-gated payroll workspace on the same
            domain. Live at{" "}
            <a
              href={steadfastCase.liveUrl}
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              target="_blank"
              rel="noopener noreferrer"
            >
              {steadfastCase.domain}
            </a>
            .
          </p>
        </div>
      </section>

      {/* ═══ ENGAGEMENT ════════════════════════════════════════════════ */}
      <section id="engagement" className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>How an engagement works</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Discovery, build, handoff. Fixed price by default.
            </span>
          </H2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          <Feature step="Step 01" title="Discovery call">
            A 30-minute call. You describe the operation and what has to
            be provable on paper. We say what we can and cannot build,
            and what tools you already own that we should reuse.
          </Feature>
          <Feature step="Step 02" title="Scope + quote">
            Within one business day, a written scope: what ships, what does
            not, and a fixed price. If the scope grows later, we requote —
            no silent creep.
          </Feature>
          <Feature step="Step 03" title="Build">
            A marketing site: about three days. A payroll workspace: about
            a week. You get a preview URL and a Loom the moment there is
            something to look at, and every business day after that.
          </Feature>
          <Feature step="Step 04" title="Handoff">
            Source lives on your Git host, your domain, your database.
            You get a short README, an admin credential, and a phone
            number for the next question. Optional maintenance retainer.
          </Feature>
        </div>
      </section>

      {/* ═══ PRICING ═══════════════════════════════════════════════════ */}
      <section id="pricing" className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <H2>
            <span className="mt-2 block">
              We do not publish a rate card. Here is how we price.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            Every operator's stack is different, and a rate card lies
            about that. What we can tell you: we quote fixed prices per
            project, we honour founding-year rates for our first cohort of
            customers, and we do not bill hourly for AI's time.
          </p>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="Small marketing site" accent>
              <p>
                A five-to-ten-page marketing site on your own domain, with
                mobile-first design, structured data, and contact forms.
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-accent">
                From $1,900 · About 3 days
              </p>
            </Card>
            <Card title="Payroll workspace" accent>
              <p>
                Contractor register, pay-run workspace, SCA floor
                enforcement, WD auto-lookup, audit log, stub email from
                your domain, passkey sign-in.
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-accent">
                From $4,800 · About 1 week
              </p>
            </Card>
            <Card title="Custom program" accent>
              <p>
                Anything that involves money movement, compliance claims,
                or long-running automation — quoted after a discovery
                call.
              </p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wide text-accent">
                Quoted per project
              </p>
            </Card>
          </Grid3>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
            Founding-year rates. Prices are ceilings, not floors — a
            simple operator often lands under.
          </p>
        </div>
      </section>

      {/* ═══ CLOSE ════════════════════════════════════════════════════ */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Notice>
            Send an email to{" "}
            <a
              href={`mailto:${site.supportEmail}?subject=Work%20with%20us`}
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              {site.supportEmail}
            </a>{" "}
            with the domain you already own (or want to buy) and a
            one-paragraph description of the operation. We answer within
            one business day. Or call{" "}
            <a
              href={site.phoneHref}
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              {site.phone}
            </a>
            .
          </Notice>
        </div>
        <MetaRow>
          Source of truth · index/steadfast-payroll-app.html · SteadFast
          Transportation Inc. marketing site
        </MetaRow>
      </section>
    </Page>
  );
}
