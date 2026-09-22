import type { Metadata } from "next";
import Link from "next/link";
import { Card, H1, H2, Lead, Page } from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { ServiceCards } from "@/components/service-cards";
import { ProcessSteps } from "@/components/process-steps";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites, payroll tools, and custom software. Quoted per project, with clear scope and ongoing support available.",
  alternates: { canonical: `https://${site.domain}/services/` },
  openGraph: {
    title: "Services · Doyel Labs",
    description: "Software built around your business. Scope and price agreed before work begins.",
    url: `https://${site.domain}/services/`,
  },
};

export default function Services() {
  return (
    <Page>
      <Breadcrumbs items={[{ name: "Services", href: "/services/" }]} />
      <section className="hero-glow pt-6">
        <H1>What does your business <span className="text-accent">need next?</span></H1>
        <Lead>A better website, a simpler workflow, or something entirely new.</Lead>
        <div className="mt-7"><ContactLink /></div>
      </section>

      <section id="capabilities" className="section-band">
        <H2>Where we can help.</H2>
        <div className="mt-6"><ServiceCards /></div>
        <p className="mt-5 text-base text-mute">Have something else in mind? <Link className="text-link" href="/contact/?projectType=idea">Tell us about it.</Link></p>
      </section>

      <section id="process" className="section-band">
        <H2>From conversation to launch.</H2>
        <div className="mt-6"><ProcessSteps /></div>
      </section>

      <section id="pricing" className="section-band">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="section-intro">
            <H2>Quoted per project.</H2>
            <p>We agree on scope and price before work starts. Changes are agreed before they are built.</p>
            <div className="mt-5"><ContactLink /></div>
          </div>
          <div id="partnership"><Card title="Support after launch">A clear handover, with maintenance and improvements quoted around your needs.</Card></div>
        </div>
        <div className="mt-8 grid gap-4 border-t border-line pt-6 text-base text-mute md:grid-cols-2">
          <p id="work"><Link href="/work/" className="text-link">See the SteadFast project</Link><br />A website and payroll workspace in use.</p>
          <p id="industries">We work across industries.<br /><Link href="/industries/federal-service-contractors/" className="text-link">Federal service contractor example</Link></p>
        </div>
      </section>

      <section id="faq" className="section-band">
        <H2>A few common questions.</H2>
        <div className="mt-6 max-w-3xl divide-y divide-line border-y border-line">
          <details className="py-3"><summary className="min-h-11 py-2 text-lg font-medium">Do I need a specification?</summary><p className="mt-3 text-base leading-relaxed text-mute">No. Tell us the problem. We can start with a free, one-hour conversation over Zoom or phone.</p></details>
          <details className="py-3"><summary className="min-h-11 py-2 text-lg font-medium">Can you work with our existing software?</summary><p className="mt-3 text-base leading-relaxed text-mute">Yes. We assess your current tools before proposing changes or integrations.</p></details>
          <details className="py-3"><summary className="min-h-11 py-2 text-lg font-medium">Who owns the finished software?</summary><p className="mt-3 text-base leading-relaxed text-mute">You do. Your code, your infrastructure, with a clear handover.</p></details>
        </div>
        <Link href="/faq/" className="text-link mt-5 inline-flex min-h-11 items-center">More questions and answers</Link>
      </section>
    </Page>
  );
}
