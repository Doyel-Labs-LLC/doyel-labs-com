import type { Metadata } from "next";
import {
  AccentChip,
  Body,
  Card,
  Close,
  Eyebrow,
  Feature,
  GhostLink,
  Grid3,
  H1,
  H2,
  Lead,
  Notice,
  Page,
  Price,
  Section,
  Split,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PayrollPaystubFrame } from "@/components/frames/payroll-paystub";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { Photo } from "@/components/photo";
import { customSoftware, refused, response } from "@/lib/offer";
import { payrollDisclaimer, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Custom software — ${customSoftware.fromLabel}, ${customSoftware.terms}`,
  description: `Internal tools, payroll workspaces, customer portals, and integrations. One orientation call, a written scope, and a fixed price. ${customSoftware.fromLabel}. Built by a person you can call.`,
  alternates: { canonical: `https://${site.domain}/software/` },
  openGraph: {
    title: `Custom software — ${customSoftware.fromLabel} | Doyel Labs`,
    description: `Tell us what your business does. We can build it. Written scope, fixed price, ${customSoftware.terms}.`,
    url: `https://${site.domain}/software/`,
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/software/#service`,
  serviceType: "Custom software development",
  name: customSoftware.name,
  description:
    "Internal tools, payroll and pay-record workspaces, customer and contractor portals, integrations, dashboards. Quoted per project with a written scope and a fixed price.",
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  offers: [
    {
      "@type": "Offer",
      name: customSoftware.name,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: customSoftware.from,
        priceCurrency: "USD",
      },
      url: `https://${site.domain}/software/#how`,
    },
  ],
};

const canBuild = [
  {
    title: "Internal tools",
    body: "The spreadsheet that became a system. Scheduling, dispatch, inventory, approvals — whatever your people do every day.",
  },
  {
    title: "Payroll & pay-record workspaces",
    body: "Draft pay runs, check them against the rules you work under, and produce stubs and records you can stand behind.",
  },
  {
    title: "Customer or contractor portals",
    body: "A password-gated place where the people you work with see their documents, submit forms, and check status.",
  },
  {
    title: "Integrations & data pipelines",
    body: "Two systems that should talk and don't. We connect them, keep the data clean, and log what moved.",
  },
  {
    title: "Dashboards & reporting",
    body: "The numbers you look up by hand every Monday, on one screen, from the sources you already have.",
  },
  {
    title: "Something you haven't seen yet",
    body: "Yes — tell us. If it runs your business and it can be explained in plain English, it is probably buildable.",
  },
] as const;

export default function Software() {
  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Breadcrumbs items={[{ name: "Software", href: "/software/" }]} />

      {/* 1. HERO */}
      <section className="hero-glow pt-4">
        <div className="grid grid-cols-1 items-center gap-12 [&>*]:min-w-0 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Custom software</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                Custom software, quoted in writing, <span className="text-accent">built by a person you can call.</span>
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                Internal tools, payroll workspaces, customer portals, integrations. Tell us what your business does. We can
                build it.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Talk to a person" />
              <GhostLink href="/work/" small>
                See our work
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>{customSoftware.fromLabel}</AccentChip>
              <AccentChip>Fixed price, never hourly</AccentChip>
              <AccentChip>Reply {response.window}</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <PayrollScaFrame />
          </div>
        </div>
      </section>

      {/* 2. WHAT WE CAN BUILD */}
      <Section>
        <Eyebrow>What we can build</Eyebrow>
        <H2>Software shaped around how your business already works.</H2>
        <div className="mt-10">
          <Grid3>
            {canBuild.map((c) => (
              <Card key={c.title} title={c.title}>
                {c.body}
              </Card>
            ))}
          </Grid3>
        </div>
      </Section>

      {/* 3. HOW A PROJECT RUNS */}
      <Section id="how">
        <Split visual={<Photo name="software-scope" fallback="scope" alt="A shop owner and a builder reviewing a printed plan at a workbench" className="mx-auto max-w-md" />}>
          <Eyebrow>How a software project runs</Eyebrow>
          <H2>One call, one page, one price.</H2>
          <Price amount={customSoftware.fromLabel} terms={customSoftware.terms} />
          <Body>{customSoftware.billing}</Body>
        </Split>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          <Feature step="01" title="Orientation call">
            {customSoftware.steps[0]}
          </Feature>
          <Feature step="02" title="Written scope">
            {customSoftware.steps[1]}
          </Feature>
          <Feature step="03" title="Daily progress">
            {customSoftware.steps[2]}
          </Feature>
          <Feature step="04" title="You own it">
            {customSoftware.steps[3]}
          </Feature>
        </div>
      </Section>

      {/* 4. ONE EXAMPLE */}
      <Section>
        <Split reverse visual={<PayrollPaystubFrame />}>
          <Eyebrow>One example</Eyebrow>
          <H2>A payroll workspace.</H2>
          <Body>
            Built for a transportation operator. It checks each day rate against the published wage floor before a stub can
            be issued. Pay runs go out in one batch with a PDF stub for every contractor. Every draft, email, and blocked
            action lands in an audit log you can export as CSV.
          </Body>
          <Body>
            This is one example of a workspace, not a product. If your business pays people differently, we build for that.
          </Body>
          <div className="mt-8">
            <Notice>{payrollDisclaimer}</Notice>
          </div>
        </Split>
      </Section>

      {/* 5. WHAT WE WON'T BUILD */}
      <Section>
        <Eyebrow>What we won&apos;t build</Eyebrow>
        <H2>Some things are off the table on purpose.</H2>
        <div className="mt-10">
          <Grid3>
            {refused.software.map((r) => {
              const [first, ...rest] = r.split(". ");
              const title = first.endsWith(".") ? first : `${first}.`;
              const body = rest.join(". ");
              return (
                <Card key={r} title={title}>
                  {body || "If we can’t say what it does in plain words, we don’t ship it."}
                </Card>
              );
            })}
          </Grid3>
        </div>
        <Body>Every &ldquo;no&rdquo; here is about a specific build, not a limit on what we&apos;ll try.</Body>
      </Section>

      {/* 6. CLOSE */}
      <Close eyebrow="Start a software project" title="Describe the job you want done. We&apos;ll write back with a scope and a price.">
        A paragraph about your business and the part that is slow, manual, or on paper is enough to start.
      </Close>
    </Page>
  );
}
