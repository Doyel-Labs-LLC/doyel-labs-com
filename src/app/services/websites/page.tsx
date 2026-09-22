import type { Metadata } from "next";
import { Card, GhostLink, Grid3, H1, H2, Lead, Page } from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { WebsiteSteadfastFrame } from "@/components/frames/websites-preview";
import { site } from "@/lib/site";
import { steadfastCase } from "@/lib/demo/websites";

export const metadata: Metadata = {
  title: "Websites for your business",
  description: "Clear, mobile-friendly websites on your own domain, with inquiry forms and code you own. Built by Doyel Labs.",
  alternates: { canonical: `https://${site.domain}/services/websites/` },
  openGraph: {
    title: "Websites · Doyel Labs",
    description: "A professional website, on your own domain, built for your customers.",
    url: `https://${site.domain}/services/websites/`,
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/services/websites/#service`,
  serviceType: "Website development",
  name: "Website development",
  description: "Mobile-friendly business websites on your own domain, with inquiry forms and a clear handover.",
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  offers: {
    "@type": "Offer",
    description: "Quoted per project. Scope and price agreed before work begins.",
    url: `https://${site.domain}/services/#pricing`,
  },
};

export default function Websites() {
  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Breadcrumbs items={[{ name: "Services", href: "/services/" }, { name: "Websites", href: "/services/websites/" }]} />
      <section id="service" className="hero-glow grid grid-cols-1 gap-8 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <H1>A better home for <span className="text-accent">your business.</span></H1>
          <Lead>A clear, mobile-friendly website that helps customers find you and get in touch.</Lead>
          <div className="mt-7 flex flex-wrap gap-3"><ContactLink projectType="website" /><GhostLink href={steadfastCase.liveUrl} external>View live example</GhostLink></div>
        </div>
        <div className="min-w-0">
          <WebsiteSteadfastFrame />
          <p className="mt-3 text-sm text-muted">SteadFast and Doyel Labs share an owner.</p>
        </div>
      </section>

      <section className="section-band">
        <H2>Built for your customers. Owned by you.</H2>
        <div className="mt-6"><Grid3>
          <Card title="Easy to use">Readable pages, simple navigation, and layouts that work on phones.</Card>
          <Card title="Connected to you">Your domain, your branding, and inquiries sent to your inbox.</Card>
          <Card title="A clear handover">Your source code and hosting accounts, with guidance for future updates.</Card>
        </Grid3></div>
        <details className="mt-6 rounded-xl border border-line p-5">
          <summary className="min-h-11 py-2 text-lg font-medium">Inside the SteadFast build</summary>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-mute">
            {steadfastCase.built.map((line) => <li key={line}>{line}</li>)}
          </ul>
          <div className="mt-5"><GhostLink href="/docs/websites/">Website documentation</GhostLink></div>
        </details>
      </section>

      <section className="section-band">
        <div className="section-intro"><H2>Start with your business, not a template.</H2><p>Quoted per project. We agree on the pages, features, and price before building.</p></div>
        <div className="mt-5 flex flex-wrap gap-3"><ContactLink projectType="website" /><GhostLink href="/services/#process">How we work</GhostLink></div>
      </section>
    </Page>
  );
}
