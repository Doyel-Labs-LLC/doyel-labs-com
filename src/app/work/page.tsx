import type { Metadata } from "next";
import Image from "next/image";
import { GhostLink, H1, H2, Lead, Page } from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { Quote } from "@/components/quote";
import { steadfastTestimonial } from "@/lib/testimonials";
import { steadfastCase } from "@/lib/demo/websites";
import { payrollDisclaimer, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: "The website and payroll workspace built for SteadFast Transportation. Real website captures and labeled software demonstrations.",
  alternates: { canonical: `https://${site.domain}/work/` },
  openGraph: {
    title: "Selected work · Doyel Labs",
    description: "A website and payroll workspace for SteadFast Transportation.",
    url: `https://${site.domain}/work/`,
  },
};

export default function Work() {
  return (
    <Page>
      <Breadcrumbs items={[{ name: "Work", href: "/work/" }]} />
      <section className="pt-6">
        <H1>Software <span className="text-accent">in use.</span></H1>
        <Lead>A website and payroll workspace for SteadFast Transportation.</Lead>
        <p className="mt-4 text-sm text-muted">Doyel Labs and SteadFast share an owner. This is related-business work.</p>
      </section>

      <section id="website" className="section-band">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <figure>
            <Image src="/media/websites/steadfast-hero-v2.webp" alt="SteadFast Transportation's live website, built by Doyel Labs" width={1600} height={900} sizes="(min-width: 1024px) 620px, 90vw" className="h-auto w-full rounded-xl border border-line" />
            <figcaption className="mt-3 text-sm text-muted">SteadFast website capture.</figcaption>
          </figure>
          <div className="section-intro">
            <H2>A clearer online presence.</H2>
            <p>Service information and inquiry forms, on SteadFast&apos;s own domain.</p>
            <div className="mt-5"><GhostLink href={steadfastCase.liveUrl} external>Visit the live website</GhostLink></div>
          </div>
        </div>
      </section>

      <section id="payroll" className="section-band">
        <div className="section-intro">
          <H2>A simpler pay run.</H2>
          <p>Contractor records, wage checks, paystub exports, and an audit trail in one workspace.</p>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{payrollDisclaimer}</p>
        <details className="mt-6 rounded-xl border border-line p-5">
          <summary className="min-h-11 py-2 text-lg font-medium">View the payroll demonstration</summary>
          <div className="mt-5 min-w-0 max-w-3xl"><PayrollScaFrame /></div>
          <div className="mt-5"><GhostLink href="/services/payroll/">About payroll software</GhostLink></div>
        </details>
        <details className="mt-4 rounded-xl border border-line p-5">
          <summary className="min-h-11 py-2 text-lg font-medium">Read the operator&apos;s statement</summary>
          <div className="mt-5"><Quote paragraphs={steadfastTestimonial.full} attribution={steadfastTestimonial.attribution} company={steadfastTestimonial.company} companyUrl={steadfastTestimonial.companyUrl} logo={steadfastTestimonial.logo} /></div>
        </details>
      </section>

      <section className="section-band">
        <H2>What could we build for you?</H2>
        <div className="mt-5"><ContactLink /></div>
      </section>
    </Page>
  );
}
