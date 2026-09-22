import type { Metadata } from "next";
import { Card, GhostLink, Grid3, H1, H2, Lead, Page } from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { PayrollAuditFrame } from "@/components/frames/payroll-audit";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { payrollDisclaimer, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Software for federal service contractors",
  description: "Custom payroll workspaces with SAM.gov wage lookups, draft checks, and audit records. Explore the SteadFast implementation.",
  keywords: ["federal service contractor software", "SCA payroll", "Service Contract Act payroll", "SAM.gov wage determination", "USPS route contractor software"],
  alternates: { canonical: `https://${site.domain}/industries/federal-service-contractors/` },
  openGraph: {
    title: "Federal service contractor software · Doyel Labs",
    description: "Wage lookups, pay-run checks, and audit records built around the contract.",
    url: `https://${site.domain}/industries/federal-service-contractors/`,
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/industries/federal-service-contractors/#service`,
  serviceType: "Software development for federal service contractors",
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  audience: { "@type": "BusinessAudience", audienceType: "Federal service contractors" },
  name: "SCA payroll workspace development",
  description: "Custom payroll workspaces with SAM.gov wage-determination lookups, draft checks, and audit records.",
  offers: {
    "@type": "Offer",
    description: "Quoted per project. Scope and price agreed before work begins.",
    url: `https://${site.domain}/services/#pricing`,
  },
};

export default function FederalServiceContractors() {
  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Breadcrumbs items={[{ name: "Services", href: "/services/#industries" }, { name: "Federal service contractors", href: "/industries/federal-service-contractors/" }]} />
      <section id="service" className="hero-glow pt-6">
        <H1>Software built around <span className="text-accent">your contract.</span></H1>
        <Lead>Wage lookups, pay-run checks, and audit records for federal service contractors.</Lead>
        <div className="mt-7 flex flex-wrap gap-3"><ContactLink projectType="payroll" /><GhostLink href="/work/">See the SteadFast project</GhostLink></div>
      </section>

      <section className="section-band">
        <div className="section-intro"><H2>Built for SteadFast.</H2><p>A workspace for a USPS route contractor. SteadFast and Doyel Labs share an owner.</p></div>
        <div className="mt-6"><Grid3>
          <Card title="Wage lookups">County-level wage determinations from SAM.gov, including base wage and health-and-welfare fringe.</Card>
          <Card title="Draft checks">Compare day rates with the configured wage floor before issuing a stub.</Card>
          <Card title="A traceable record">Rate changes, drafts, and sent stubs recorded in an exportable audit log.</Card>
        </Grid3></div>
        <details className="mt-6 rounded-xl border border-line p-5">
          <summary className="min-h-11 py-2 text-lg font-medium">Explore the workspace</summary>
          <div className="mt-5 grid gap-6 lg:grid-cols-2"><div className="min-w-0"><PayrollScaFrame /></div><div className="min-w-0"><PayrollAuditFrame /></div></div>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-mute">The log retains 180 days by default. The operator must keep exported records for the SCA&apos;s three-year requirement.</p>
          <div className="mt-5"><GhostLink href="/services/payroll/">Payroll features and limitations</GhostLink></div>
        </details>
      </section>

      <section className="section-band">
        <H2>A workspace, not a payroll processor.</H2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-mute">{payrollDisclaimer}</p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">Doyel Labs is not a federal-benefits administrator. Demo amounts are illustrative; wage determinations in the app come from SAM.gov.</p>
      </section>

      <section className="section-band">
        <div className="section-intro"><H2>Tell us what your contract requires.</H2><p>We start with your workflow and requirements, then quote the project.</p></div>
        <div className="mt-5 flex flex-wrap gap-3"><ContactLink projectType="payroll" /><GhostLink href="/services/">All services</GhostLink></div>
      </section>
    </Page>
  );
}
