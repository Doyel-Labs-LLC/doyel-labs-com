import type { Metadata } from "next";
import {
  AccentChip,
  Body,
  Card,
  Checks,
  Close,
  Eyebrow,
  GhostLink,
  Grid2,
  H1,
  H2,
  Lead,
  Page,
  Section,
  Split,
  StatusChip,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PayrollAuditFrame } from "@/components/frames/payroll-audit";
import { PayrollBatchFrame } from "@/components/frames/payroll-batch";
import { WebsiteSteadfastFrame } from "@/components/frames/websites-preview";
import { Photo } from "@/components/photo";
import { Quote } from "@/components/quote";
import { Reveal } from "@/components/reveal";
import { steadfastCase } from "@/lib/demo/websites";
import { products } from "@/lib/products";
import { baiDisclaimer, programStatus, site } from "@/lib/site";
import { steadfastTestimonial } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Work — what we built for SteadFast Transportation",
  description: `A marketing site and a password-gated payroll workspace for ${steadfastCase.name}, both live and in daily use. Plus two products in the lab. Built by Doyel Labs, ${site.city}.`,
  alternates: { canonical: `https://${site.domain}/work/` },
  openGraph: {
    title: "Work — what we built for SteadFast | Doyel Labs",
    description: `A website and a payroll workspace for ${steadfastCase.name}. Live, in use, and shown here because it is real.`,
    url: `https://${site.domain}/work/`,
    type: "website",
  },
};

export default function Work() {
  return (
    <Page>
      <Breadcrumbs items={[{ name: "Work", href: "/work/" }]} />

      {/* 1. HERO */}
      <section className="hero-glow pt-4">
        <div className="grid grid-cols-1 items-center gap-12 [&>*]:min-w-0 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Work</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                What we&apos;ve built, <span className="text-accent">and what it&apos;s doing today.</span>
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                One named client so far. The work is live and in daily use. We show it because it&apos;s real, and we say who
                owns it.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Talk to a person" />
              <GhostLink href="/websites/" small>
                See the offer
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>Live in production</AccentChip>
              <AccentChip>Named client</AccentChip>
              <AccentChip>Ownership disclosed</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <WebsiteSteadfastFrame />
          </div>
        </div>
      </section>

      {/* 2. STEADFAST */}
      <Reveal>
        <Section id="steadfast">
          <Split visual={<Photo name="work-steadfast-context" fallback="flow" alt="A two-lane highway across Montana at dawn with a single delivery vehicle in the distance" className="mx-auto max-w-md" />}>
            <Eyebrow>Client · Transportation</Eyebrow>
            <H2>A website and a payroll workspace for a Montana transportation operator.</H2>
            <Body>
              {steadfastCase.what} They needed a public site that represented the company well and a private place to run
              contractor pay. Both live on the same domain today.
            </Body>
            <Checks items={steadfastTestimonial.scope} />
            <div className="mt-8">
              <GhostLink href={steadfastCase.liveUrl} external small>
                See the live site
              </GhostLink>
            </div>
          </Split>
        </Section>
      </Reveal>

      {/* 3. IN THEIR WORDS */}
      <Reveal>
        <Section>
          <Eyebrow>In their words</Eyebrow>
          <H2>What SteadFast said about the work.</H2>
          <div className="mt-8 max-w-3xl">
            <Quote t={steadfastTestimonial} full />
          </div>
        </Section>
      </Reveal>

      {/* 4. INSIDE THE PAYROLL WORKSPACE */}
      <Reveal>
        <Section>
          <Eyebrow>Inside the payroll workspace</Eyebrow>
          <H2>Two of the screens the operator uses.</H2>
          <Body>The frames below use synthetic demo data and carry a label saying so. The shapes match the real app.</Body>
          <div className="mt-10">
            <Grid2>
              <PayrollBatchFrame />
              <PayrollAuditFrame />
            </Grid2>
          </div>
        </Section>
      </Reveal>

      {/* 5. IN THE LAB */}
      <Reveal>
        <Section id="lab">
          <Eyebrow>In the lab</Eyebrow>
          <H2>Two products we&apos;re building for ourselves.</H2>
          <Body>Not client work, and not open to the public yet.</Body>
          <div className="mt-10">
            <Grid2>
              {products.map((p) => (
                <Card key={p.key} title={p.name}>
                  <p>{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <StatusChip>{programStatus[p.key].label}</StatusChip>
                    <span className="text-[13px] text-muted">{p.meta}</span>
                  </div>
                </Card>
              ))}
            </Grid2>
          </div>
          <p className="mt-6 max-w-prose text-[12px] leading-relaxed text-muted">{baiDisclaimer}</p>
        </Section>
      </Reveal>

      {/* 6. CLOSE */}
      <Close title="Want something like this for your business?">
        Tell us what you do and what is slow today. A person reads it and replies with what we would build.
      </Close>
    </Page>
  );
}
