import type { Metadata } from "next";
import {
  AccentChip,
  Card,
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  Notice,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactWidget } from "@/components/contact-modal";
import { WebsiteSteadfastFrame } from "@/components/frames/websites-preview";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { steadfastCase } from "@/lib/demo/websites";

export const metadata: Metadata = {
  title: "Websites — custom marketing sites for small businesses through enterprises",
  description:
    "Doyel Labs builds fast, accessible marketing websites on your own domain — mobile-first, schema.org-marked, forms wired to your own inbox. From mom-and-pop operators to enterprises. Live example: steadfasttransportationinc.com.",
  alternates: { canonical: `https://${site.domain}/services/websites/` },
  openGraph: {
    title: "Websites — custom marketing sites | Doyel Labs",
    description:
      "Fast, accessible websites on your own domain. Mobile-first. schema.org-marked. Forms wired to your own inbox.",
    url: `https://${site.domain}/services/websites/`,
    type: "website",
  },
};

/** JSON-LD Service schema — mirrors /services/custom-software so every
 * service deep-page is a distinct, priced offering Google can surface.
 * Price band matches /pricing/ (websites: $2.5k–$8k). */
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/services/websites/#service`,
  serviceType: "Website development",
  name: "Website development",
  description:
    "Fast, accessible marketing websites on your own domain — mobile-first, schema.org-marked, with forms wired to your own inbox. For small operators through enterprises.",
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: 2500,
      maxPrice: 8000,
      priceCurrency: "USD",
    },
    url: `https://${site.domain}/pricing/`,
  },
};

export default function Websites() {
  return (
    <Page>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: "Services", href: "/services/" },
          { name: "Websites", href: "/services/websites/" },
        ]}
      />

      {/* HERO — two-column with the live SteadFast site as the visual anchor */}
      <section className="hero-glow pt-4">
        <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:items-center md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Services · Websites</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                <span className="text-accent">Websites</span> that open fast and
                stay honest.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                Custom domain on your own registrar. Mobile-first navigation
                and a skip-link. schema.org structured data so the search
                engines know who you are. Forms wired to your own inbox — not
                ours. No dark patterns, no upsell modals, no cookie banners you
                did not ask for.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Start a build" />
              <GhostLink href="/pricing/" small>
                How pricing works
              </GhostLink>
              <GhostLink href={steadfastCase.liveUrl} small external>
                View live example
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>Static on a CDN</AccentChip>
              <AccentChip>LCP &lt; 2s</AccentChip>
              <AccentChip>WCAG AA</AccentChip>
              <AccentChip>You own the code</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <WebsiteSteadfastFrame />
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <Reveal>
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Who this is for</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Businesses that need a professional site, but not a design agency.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            Owner-operators. Family-run shops. Contractors. Consultants.
            Regional service companies. Anyone who needs to show up on Google
            with a clean, fast site, an inquiry form, and copy a real customer
            can read — without paying a monthly SaaS bill or committing to a
            page builder they can&apos;t escape from.
          </p>
        </div>
      </section>
      </Reveal>

      {/* WHAT WAS BUILT */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What was built</Eyebrow>
        <H2>
          <span className="mt-2 block">
            The concrete list.
          </span>
        </H2>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {steadfastCase.built.map((line) => (
            <li key={line} className="flex gap-3 border-t border-line pt-3 text-[14px] text-mute">
              <span className="mt-2 inline-block h-1 w-4 shrink-0 bg-ink" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* WHAT SHIPS */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What a Doyel Labs website ships with</Eyebrow>
        <H2>
          <span className="mt-2 block">Every project, out of the box.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steadfastCase.ships.map((item) => {
            const [title, ...rest] = item.split(" — ");
            return (
              <Card key={item} title={title}>
                {rest.length ? rest.join(" — ") : item}
              </Card>
            );
          })}
          <Card title="Accessibility">
            WCAG AA contrast, keyboard-reachable nav, visible focus rings,
            semantic headings, alt text everywhere an image ships.
          </Card>
          <Card title="Performance">
            Static output on a CDN. No render-blocking third-party scripts on
            marketing pages. LCP under 2.0s on mid-tier mobile.
          </Card>
          <Card title="Content edits">
            You edit copy and prices from a small set of Markdown files, or —
            for the SteadFast build — from HTML files on the operator's own
            branch. No CMS bill.
          </Card>
        </div>
      </section>

      {/* WHAT WE DON'T DO */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What we do not ship</Eyebrow>
        <H2>
          <span className="mt-2 block">
            Not every operator needs a booking system.
          </span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {steadfastCase.doesNotShip.map((item) => (
            <Card key={item} title="Refused">
              {item}
            </Card>
          ))}
        </div>
      </section>

      {/* CLOSE */}
      <Reveal>
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Start a website build</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Tell us the domain and one paragraph on the business.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Email{" "}
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.supportEmail}
              </a>{" "}
              with a domain you already own, or the domain name you want to
              buy, and a one-paragraph description of what the business does.
              We answer within one business day with a scope, timeline, and
              price.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactWidget label="Start a build" />
              <GhostLink href="/pricing/" small>
                How pricing works
              </GhostLink>
            </div>
          </div>
          <div>
            <Notice>
              Fastest turnaround we ship: a five-page marketing site with a
              contact form, live on a real domain, in{" "}
              <strong className="text-ink">three business days</strong>.
            </Notice>
          </div>
        </div>
      </section>
      </Reveal>
    </Page>
  );
}
