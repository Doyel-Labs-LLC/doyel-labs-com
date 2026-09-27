import type { Metadata } from "next";
import Link from "next/link";
import {
  AccentChip,
  Body,
  Card,
  Close,
  Eyebrow,
  Feature,
  GhostLink,
  Grid2,
  H1,
  H2,
  H3,
  Lead,
  LogoMark,
  Page,
  Section,
  Split,
  StatusChip,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Illus } from "@/components/illus";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { textLink } from "@/components/button-styles";
import { products } from "@/lib/products";
import { programStatus, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About — ${site.company}, ${site.city}`,
  description: `${site.company} is a software company in ${site.city}, formed ${site.founded}. It builds websites and custom software for businesses, and a person answers the phone.`,
  alternates: { canonical: `https://${site.domain}/about/` },
  openGraph: {
    title: `About | ${site.companyShort}`,
    description: `One company in ${site.city}. One person who answers the phone. Websites and custom software for businesses.`,
    url: `https://${site.domain}/about/`,
    type: "website",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `https://${site.domain}/about/#founder`,
  name: site.founder,
  jobTitle: "Founder",
  worksFor: { "@id": `https://${site.domain}/#organization` },
  email: `mailto:${site.supportEmail}`,
  url: `https://${site.domain}/about/`,
};

const link = textLink;

export default function About() {
  const bai = products.find((p) => p.key === "bai");
  const loop = products.find((p) => p.key === "connectionloop");

  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Breadcrumbs items={[{ name: "About", href: "/about/" }]} />

      {/* 1. HERO */}
      <section className="hero-glow pt-4">
        <div className="grid grid-cols-1 items-center gap-12 [&>*]:min-w-0 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>About</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                One company. <span className="text-accent">One person who answers the phone.</span>
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                {site.company} is a software company in {site.city}, formed {site.founded}. It builds websites and custom
                software for businesses of any size, and keeps them running afterward.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Talk to a person" />
              <GhostLink href="/work/" small>
                See our work
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>{site.city}</AccentChip>
              <AccentChip>{site.hoursShort}</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <Photo name="about-casper" fallback="casper" alt="Casper Mountain and the Wyoming plains at golden hour" className="mx-auto max-w-md" priority />
          </div>
        </div>
      </section>

      {/* 2. WHY A PERSON */}
      <Reveal>
        <Section id="why">
          <Split visual={<Illus name="answer" className="mx-auto max-w-sm" />}>
            <Eyebrow>Why a person</Eyebrow>
            <H2>Plenty of tools will generate a website. Few people will answer the phone about it.</H2>
            <Body>
              Any tool can produce a site in an afternoon. What&apos;s hard to find is someone who will pick up in six
              months when the form stops delivering or the hours change. That&apos;s the whole idea behind Doyel Labs.
            </Body>
            <Body>
              You&apos;ll talk to a person. On the first call, during the build, and any time something needs attention
              afterward. No chatbot, no screening AI, no ticket queue.
            </Body>
          </Split>
        </Section>
      </Reveal>

      {/* 3. HOW WE USE AI */}
      <Reveal>
        <Section id="ai">
          <Eyebrow>How we use AI</Eyebrow>
          <H2>AI builds most of it. A person answers for all of it.</H2>
          <Body>
            We say this plainly because most companies won&apos;t: the majority of the code, layouts, and first-draft
            copy we ship is generated with AI. It&apos;s why a real website costs what it costs. Here is where the line
            sits.
          </Body>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Feature step="01" title="AI does the building">
              Code, tests, layouts, and first-pass copy. Most of the hours in a project are AI hours, and that&apos;s the
              point.
            </Feature>
            <Feature step="02" title="A person reviews every change">
              A person reads every change before it goes in. Nothing ships because a tool said it was done.
            </Feature>
            <Feature step="03" title="A person decides what ships">
              What gets built, what gets cut, and when it goes live are human calls. So is the phone.
            </Feature>
          </div>
        </Section>
      </Reveal>

      {/* 4. THE FACTS */}
      <Reveal>
        <Section id="facts">
          <Eyebrow>The facts</Eyebrow>
          <H2>The plain details.</H2>
          <div className="mt-10">
            <Grid2>
              <Card title="Legal name">
                {site.company}, a Wyoming limited liability company.
              </Card>
              <Card title="Location">{site.city}. Working with businesses anywhere in the United States.</Card>
              <Card title="Founded">{site.founded}.</Card>
              <Card title="Contact">
                <a href={`mailto:${site.supportEmail}`} className={link}>
                  {site.supportEmail}
                </a>{" "}
                or{" "}
                <a href={site.phoneHref} className={link}>
                  {site.phone}
                </a>
                , {site.hours}.
              </Card>
              <Card title="Security disclosures">
                <a href={`mailto:${site.securityEmail}`} className={link}>
                  {site.securityEmail}
                </a>
                . How the site is built and what happens to form data is on the{" "}
                <Link href="/security/" className={link}>
                  security page
                </Link>
                .
              </Card>
            </Grid2>
          </div>
        </Section>
      </Reveal>

      {/* 5. WHO ANSWERS */}
      <Reveal>
        <Section id="who-answers">
          <Eyebrow>Who you&apos;ll talk to</Eyebrow>
          <H2>The person on the other end.</H2>
          <div className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16">
            <div className="rounded-card border border-line bg-surface p-7 shadow-card md:p-9">
              <LogoMark size={40} />
              <p className="mt-6 font-display text-h3 font-medium text-ink">A person at {site.companyShort}</p>
              <p className="mt-1 text-small text-mute">
                {site.city} · {site.hoursShort}
              </p>
              <ul className="mt-6 space-y-2 border-t border-line pt-5 text-small">
                <li>
                  <a href={site.phoneHref} className={link}>
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.supportEmail}`} className={link}>
                    {site.supportEmail}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <Body className="mt-0">
                {site.companyShort} grew up next to a working transportation company. That&apos;s where the payroll
                workspace came from: a real operation that needed pay runs, wage checks, and records done properly.
              </Body>
              <Body>
                The same person takes your first call, watches the build, and picks up when something needs changing. You
                won&apos;t be handed off.
              </Body>
              <div className="mt-10">
                <H3>In the lab</H3>
              </div>
              <Body className="mt-3">
                Two products of our own are in testing: {bai?.name ?? "BAI Desk"}{" "}
                <StatusChip>{programStatus.bai.label}</StatusChip> and {loop?.name ?? "ConnectionLoop"}{" "}
                <StatusChip>{programStatus.connectionloop.label}</StatusChip>. Neither is for sale yet.{" "}
                <Link href="/work/#lab" className={link}>
                  More on the work page
                </Link>
                .
              </Body>
            </div>
          </div>
        </Section>
      </Reveal>

      {/* 6. CLOSE */}
      <Close title="Have a business and an idea? Start there.">
        One paragraph about what you do is enough. A person reads it and replies.
      </Close>
    </Page>
  );
}
