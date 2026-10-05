import type { Metadata } from "next";
import {
  AccentChip,
  Body,
  Card,
  Checks,
  Close,
  Eyebrow,
  Faq,
  GhostLink,
  Grid2,
  H1,
  H2,
  H3,
  Lead,
  Notice,
  Page,
  Price,
  Section,
  Split,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WebsiteSteadfastFrame } from "@/components/frames/websites-preview";
import { Illus } from "@/components/illus";
import { Photo } from "@/components/photo";
import { addOns, carePlan, money, refused, websiteBuild, websiteFaq } from "@/lib/offer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Websites — ${websiteBuild.priceLabel}, live in ${websiteBuild.turnaround}`,
  description: `A five-page business website for ${websiteBuild.priceLabel}, on your own domain, live in ${websiteBuild.turnaround}. Optional care plan ${carePlan.priceLabel}/month. Built by a person you can call.`,
  alternates: { canonical: `https://${site.domain}/websites/` },
  openGraph: {
    title: `Websites — ${websiteBuild.priceLabel} | Doyel Labs`,
    description: `Five pages, your domain, live in ${websiteBuild.turnaround}. Care plan ${carePlan.priceLabel}/month, cancel any month.`,
    url: `https://${site.domain}/websites/`,
    type: "website",
  },
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/websites/#service`,
  serviceType: "Website development",
  name: "Website build",
  description: `A five-page business website on your own domain, live in ${websiteBuild.turnaround} after content is received.`,
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  offers: [
    {
      "@type": "Offer",
      name: websiteBuild.name,
      price: websiteBuild.price,
      priceCurrency: "USD",
      url: `https://${site.domain}/websites/#pricing`,
    },
    {
      "@type": "Offer",
      name: carePlan.name,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: carePlan.price,
        priceCurrency: "USD",
        unitCode: "MON",
        billingDuration: 1,
      },
      url: `https://${site.domain}/websites/#care`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: websiteFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Websites() {
  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={[{ name: "Websites", href: "/websites/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="grid grid-cols-1 items-center gap-12 [&>*]:min-w-0 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Websites</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                A real website for <span className="text-accent">{websiteBuild.priceLabel}</span>. Live in {websiteBuild.turnaround}.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                Five pages on your own domain. A contact form that lands in your inbox. Fast on a phone, no cookie banner, no
                page builder you can&apos;t leave. Built by a person you can call afterward.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Talk to a person" />
              <GhostLink href="#pricing" small>
                What&apos;s included
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>Your domain, your files</AccentChip>
              <AccentChip>No tracking scripts</AccentChip>
              <AccentChip>{websiteBuild.depositLabel}</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <WebsiteSteadfastFrame />
          </div>
        </div>
      </section>

      {/* PRICING — the build */}
        <Section id="pricing">
          <Split visual={<Illus name="three-days" className="mx-auto max-w-md" />}>
            <Eyebrow>The build</Eyebrow>
            <H2>What {websiteBuild.priceLabel} gets you.</H2>
            <Price amount={websiteBuild.priceLabel} terms={websiteBuild.terms} />
            <Checks items={websiteBuild.includes} />
            <div className="mt-8">
              <Notice>
                <strong className="text-ink">Live in {websiteBuild.turnaround}.</strong> {websiteBuild.turnaroundNote}
              </Notice>
            </div>
          </Split>
        </Section>

      {/* CARE PLAN */}
        <Section id="care">
          <Split reverse visual={<Photo name="websites-care" fallback="care" alt="A small-business storefront with an open sign, seen in warm morning light" className="mx-auto max-w-md" />}>
            <Eyebrow>After launch</Eyebrow>
            <H2>The care plan: a person keeps it running.</H2>
            <Price amount={carePlan.priceLabel} terms={carePlan.terms} />
            <Checks items={carePlan.includes} />
            <Body>{carePlan.cancel}</Body>
          </Split>
        </Section>

      {/* ADD-ONS + REFUSALS */}
        <Section>
          <Grid2>
            <div>
              <Eyebrow>Add-ons</Eyebrow>
              <H3>Flat prices, only if you want them.</H3>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {addOns.map((a) => (
                  <li key={a.name} className="flex items-baseline justify-between gap-4 py-3">
                    <div>
                      <p className="text-[16px] font-semibold text-ink">{a.name}</p>
                      <p className="mt-0.5 text-[14px] text-mute">{a.note}</p>
                    </div>
                    <p className="shrink-0 font-display text-[20px] font-medium text-ink tabular-nums">{money(a.price)}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>What we won&apos;t do</Eyebrow>
              <H3>Some things are off the table on purpose.</H3>
              <div className="mt-6 space-y-4">
                {refused.websites.map((r) => (
                  <Card key={r} title={r.split(".")[0] + "."}>
                    {r.split(". ").slice(1).join(". ")}
                  </Card>
                ))}
              </div>
            </div>
          </Grid2>
        </Section>

      {/* FAQ */}
        <Section id="faq">
          <Eyebrow>Questions people ask</Eyebrow>
          <H2>Before you decide.</H2>
          <div className="max-w-3xl">
            <Faq items={websiteFaq} />
          </div>
        </Section>

      <Close eyebrow="Start a website" title="Send the name of your business and one paragraph about it.">
        That&apos;s enough to start. A person will reply with what we need from you and a date it goes live.
      </Close>
    </Page>
  );
}
