import type { Metadata } from "next";
import { Card, GhostLink, Grid3, H1, H2, Lead, Page } from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { positioning, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.company} builds websites, business tools, and custom software for small businesses. Based in ${site.city}.`,
  alternates: { canonical: `https://${site.domain}/company/` },
  openGraph: {
    title: "About Doyel Labs",
    description: "Practical software, clear scope, and ownership of what we build for you.",
    url: `https://${site.domain}/company/`,
  },
};

export default function Company() {
  return (
    <Page>
      <Breadcrumbs items={[{ name: "About", href: "/company/" }]} />
      <section id="founder" className="hero-glow pt-6">
        <H1>Practical software.<br /><span className="text-accent">Clear commitments.</span></H1>
        <Lead>{positioning}</Lead>
        <div className="mt-7 flex flex-wrap gap-3"><ContactLink /><GhostLink href="/work/">View our work</GhostLink></div>
      </section>

      <section className="section-band">
        <H2>What you can expect.</H2>
        <div className="mt-6">
          <Grid3>
            <Card title="Your business first">We understand the problem before proposing the software.</Card>
            <Card title="No guesswork">Scope, price, and changes agreed with you before we build.</Card>
            <Card title="Yours to keep">You own the software. Ongoing support is available.</Card>
          </Grid3>
        </div>
        <p className="mt-8 text-sm leading-relaxed text-muted">{site.company} · {site.city}<br />A Wyoming limited liability company, formed in {site.founded}.</p>
      </section>
    </Page>
  );
}
