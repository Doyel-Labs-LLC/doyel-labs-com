import type { Metadata } from "next";
import { Card, GhostLink, Grid3, H1, H2, Lead, Page } from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom software",
  description: "Apps, portals, internal tools, and integrations built around your business. Quoted per project, with code you own.",
  alternates: { canonical: `https://${site.domain}/services/custom-software/` },
  openGraph: {
    title: "Custom software · Doyel Labs",
    description: "Connect your systems, simplify a workflow, or build something new.",
    url: `https://${site.domain}/services/custom-software/`,
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/services/custom-software/#service`,
  serviceType: "Custom software development",
  name: "Custom software development",
  description: "Custom applications, portals, internal tools, integrations, and data pipelines. Quoted per project. You own the code.",
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  offers: {
    "@type": "Offer",
    description: "Quoted per project. Scope and price agreed before work begins.",
    url: `https://${site.domain}/services/#pricing`,
  },
};

export default function CustomSoftware() {
  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Breadcrumbs items={[{ name: "Services", href: "/services/" }, { name: "Custom software", href: "/services/custom-software/" }]} />
      <section id="service" className="hero-glow pt-6">
        <H1>Your workflow.<br /><span className="text-accent">Your software.</span></H1>
        <Lead>Connect your systems, replace repetitive work, or turn an idea into an application.</Lead>
        <div className="mt-7 flex flex-wrap gap-3"><ContactLink projectType="custom" /><GhostLink href="/work/">View our work</GhostLink></div>
      </section>

      <section className="section-band">
        <H2>A few starting points.</H2>
        <div className="mt-6"><Grid3>
          <Card title="Apps & portals">Customer accounts, shared workspaces, and tools for a new product.</Card>
          <Card title="Internal tools">Dashboards, records, approvals, and the everyday work behind your business.</Card>
          <Card title="Integrations">Connect existing systems and move data without copying it by hand.</Card>
        </Grid3></div>
      </section>

      <section className="section-band">
        <H2>Build only what you need.</H2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-mute">
          <p>Custom software makes sense when existing tools cannot support your workflow. If an off-the-shelf tool fits, we will say so.</p>
          <p>We agree on scope, price, and delivery before building. You see progress along the way and own the finished code.</p>
        </div>
        <details className="mt-6 rounded-xl border border-line p-5">
          <summary className="min-h-11 py-2 text-lg font-medium">What we plan with you</summary>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-mute">
            <li>Who uses it, what they can access, and how they sign in.</li>
            <li>Where data lives, which systems connect, and what needs an audit trail.</li>
            <li>Backups, recovery, and the requirements specific to your business.</li>
            <li>Source code, deployment notes, account ownership, and ongoing support.</li>
          </ul>
        </details>
        <div className="mt-6 flex flex-wrap gap-3"><ContactLink projectType="custom" /><GhostLink href="/services/#process">How we work</GhostLink></div>
      </section>
    </Page>
  );
}
