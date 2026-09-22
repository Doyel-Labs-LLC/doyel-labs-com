import type { Metadata } from "next";
import Link from "next/link";
import { Card, GhostLink, Grid3, H1, H2, Lead, Page } from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { PayrollAuditFrame } from "@/components/frames/payroll-audit";
import { PayrollBatchFrame } from "@/components/frames/payroll-batch";
import { PayrollPaystubFrame } from "@/components/frames/payroll-paystub";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { payrollDisclaimer, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payroll workspaces",
  description: "Custom software for pay-run preparation, contractor records, and reporting. Not tax filing or money movement.",
  alternates: { canonical: `https://${site.domain}/services/payroll/` },
  openGraph: {
    title: "Payroll workspaces · Doyel Labs",
    description: "Prepare pay runs and keep useful records in a workspace built around your business.",
    url: `https://${site.domain}/services/payroll/`,
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/services/payroll/#service`,
  serviceType: "Payroll workspace development",
  name: "Payroll workspace development",
  description: "Custom pay-run preparation and record-keeping software. Not tax filing or money movement.",
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  offers: {
    "@type": "Offer",
    description: "Quoted per project. Scope and price agreed before work begins.",
    url: `https://${site.domain}/services/#pricing`,
  },
};

export default function Payroll() {
  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Breadcrumbs items={[{ name: "Services", href: "/services/" }, { name: "Payroll", href: "/services/payroll/" }]} />
      <section id="service" className="hero-glow pt-6">
        <H1>Payroll records.<br /><span className="text-accent">Less busywork.</span></H1>
        <Lead>Prepare pay runs, manage records, and export reports in a workspace built for your operation.</Lead>
        <div className="mt-7 flex flex-wrap gap-3"><ContactLink projectType="payroll" /><GhostLink href="/work/#payroll">See our work</GhostLink></div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">{payrollDisclaimer}</p>
      </section>

      <section className="section-band">
        <H2>Built around the way you pay.</H2>
        <div className="mt-6"><Grid3>
          <Card title="Your pay structure">Day rates, hourly work, salaries, or a mix. Scope starts with your needs.</Card>
          <Card title="Your records">Keep people, pay periods, deductions, and supporting records together.</Card>
          <Card title="Your workflow">Review drafts, export stubs, and keep a traceable record of changes.</Card>
        </Grid3></div>
      </section>

      <section className="section-band">
        <div className="section-intro"><H2>Inside the SteadFast workspace.</H2><p>A federal service contractor&apos;s pay-run tools. SteadFast and Doyel Labs share an owner.</p></div>
        <div className="mt-6 divide-y divide-line border-y border-line">
          <details className="py-4">
            <summary className="min-h-11 py-2 text-lg font-medium">Wage checks</summary>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-mute">The workspace reads the county wage determination from SAM.gov and checks each draft against its configured wage floor before issuing a stub.</p>
            <div className="mt-5 min-w-0 max-w-3xl"><PayrollScaFrame /></div>
          </details>
          <details className="py-4">
            <summary className="min-h-11 py-2 text-lg font-medium">Pay runs and stubs</summary>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-mute">Select a period and contractors, review the batch, then download PDF stubs or email them from the operator&apos;s domain. Deductions are entered by the operator; the app does not calculate federal withholding.</p>
            <div className="mt-5 grid gap-6 lg:grid-cols-2"><div className="min-w-0"><PayrollBatchFrame /></div><div className="min-w-0"><PayrollPaystubFrame /></div></div>
          </details>
          <details className="py-4">
            <summary className="min-h-11 py-2 text-lg font-medium">Audit records and backups</summary>
            <p className="mt-3 max-w-prose text-base leading-relaxed text-mute">Drafts, rate changes, lookups, and sent stubs leave audit rows. Export CSV records and JSON backups. The log retains 180 days by default; the operator keeps exports for the SCA&apos;s three-year requirement.</p>
            <div className="mt-5 min-w-0 max-w-3xl"><PayrollAuditFrame /></div>
          </details>
        </div>
        <div className="mt-5 flex flex-wrap gap-3"><GhostLink href="/docs/payroll/">Payroll documentation</GhostLink><GhostLink href="/legal/payroll-data/">Payroll data policy</GhostLink></div>
      </section>

      <section className="section-band">
        <H2>Know the limits.</H2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-mute">
          <p>The app does not file federal, state, or local returns. It does not compute federal income-tax withholding. Deduction lines are freeform, entered by the operator.</p>
          <p>The operator is the payer of record. Doyel Labs LLC is not a payroll processor, professional employer organization, or reporting agent for any tax authority.</p>
          <p>Contractor records, drafts, and audit rows are stored per operator. Bank account numbers and customer funds are never held by Doyel Labs. See the <Link href="/legal/payroll-data/" className="text-link">data policy</Link> for storage and retention details.</p>
        </div>
        <div className="mt-6"><ContactLink projectType="payroll" /></div>
      </section>
    </Page>
  );
}
