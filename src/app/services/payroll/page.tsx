import type { Metadata } from "next";
import {
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
import { PayrollAuditFrame } from "@/components/frames/payroll-audit";
import { PayrollBatchFrame } from "@/components/frames/payroll-batch";
import { PayrollPaystubFrame } from "@/components/frames/payroll-paystub";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { payrollDisclaimer, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payroll",
  description:
    "Payroll software for federal service contractors and small operators. SAM.gov wage-determination lookups, day-rate floor checks, and an audit log a DOL inspector can read.",
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
      {/* HERO */}
      <section className="pt-24">
        <Eyebrow>Services · payroll</Eyebrow>
        <H1>Pay day-rate contractors and prove SCA compliance.</H1>
        <Lead>
          For federal service contractors and small operators who pay
          independent contractors by the day and have to hold up their pay
          records to a Department of Labor inspection. The software prepares
          the pay run. Your bank pays the money. The two are on purpose.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostLink href="/contact/">Talk to us</GhostLink>
          <GhostLink href="/security/" small>
            Payroll data map
          </GhostLink>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          Not a payroll processor · Not a money transmitter · Not tax filing
        </p>
      </section>

      {/* PROOF · SCA floor */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>The SCA floor</Eyebrow>
            <H2>
              <span className="mt-2 block">Every draft passes the floor before it leaves the app.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Under 41 U.S.C. §§ 6701–6707 the day rate must clear
              <code className="ml-1 font-mono text-ink"> (base wage + H&W fringe) × 8</code>.
              The app enters the base wage and the H&W fringe from the
              wage determination for the contractor's county, computes the
              floor, and refuses to issue a stub below it. The whole
              transaction is on the stub.
            </p>
          </div>
          <PayrollScaFrame />
        </div>
      </section>

      {/* PROOF · Batch */}
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

      {/* PROOF · Paystub */}
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

      {/* PROOF · Audit */}
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

      {/* Features */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What is in the app today</Eyebrow>
        <H2>
          <span className="mt-2 block">Features, from the actual code.</span>
        </H2>
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

      {/* Does not do */}
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

      {/* Payroll data map preview */}
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

      {/* Close */}
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
    </Page>
  );
}
