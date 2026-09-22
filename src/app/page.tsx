import type { Metadata } from "next";
import Image from "next/image";
import { GhostLink, H1, H2, Lead, Page } from "@/components/chrome";
import { ContactLink } from "@/components/contact-link";
import { ServiceCards } from "@/components/service-cards";
import { ProductCards } from "@/components/product-cards";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom software, websites & business tools",
  description: "Websites, payroll tools, and custom software for small businesses. Built by Doyel Labs in Casper, Wyoming.",
  alternates: { canonical: `https://${site.domain}/` },
  openGraph: {
    title: "Software built around your business · Doyel Labs",
    description: "Websites, payroll tools, and custom software for small businesses.",
    url: `https://${site.domain}/`,
  },
};

export default function Home() {
  return (
    <Page>
      <section className="hero-glow grid gap-10 pt-12 md:pt-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <H1>Software built around <span className="text-accent">your business.</span></H1>
          <Lead>Websites, payroll tools, and custom software for small businesses.</Lead>
          <div className="mt-7 flex flex-wrap gap-3">
            <ContactLink />
            <GhostLink href="/work/">View our work</GhostLink>
          </div>
        </div>
        <figure className="min-w-0 rounded-2xl border border-line2 bg-surface p-4 md:p-5">
          <Image src="/media/websites/steadfast-hero-v2.webp" alt="The SteadFast Transportation website built by Doyel Labs" width={1600} height={900} priority sizes="(min-width: 1024px) 510px, 90vw" className="h-auto w-full rounded-lg border border-line" />
          <figcaption className="pt-4">
            <p className="text-base font-medium">Built for SteadFast Transportation</p>
            <p className="mt-2 text-sm text-muted">Website and payroll workspace. A related business with shared ownership.</p>
          </figcaption>
        </figure>
      </section>

      <section className="section-band">
        <H2>What can we build for you?</H2>
        <div className="mt-6"><ServiceCards /></div>
      </section>

      <section className="section-band">
        <H2>Our own products.</H2>
        <p className="mt-3 text-base text-mute">In development. Not publicly available yet.</p>
        <div className="mt-6"><ProductCards /></div>
      </section>

      <section className="section-band">
        <div className="rounded-2xl border border-accentDim bg-surface p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <H2>What do you have in mind?</H2>
          <div className="mt-5 shrink-0 md:mt-0"><ContactLink /></div>
        </div>
      </section>
    </Page>
  );
}
