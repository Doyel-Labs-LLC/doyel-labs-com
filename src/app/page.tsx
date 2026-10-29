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
  Grid3,
  H1,
  H2,
  Lead,
  Page,
  PrimaryLink,
  Section,
  Split,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { Photo } from "@/components/photo";
import { Quote } from "@/components/quote";
import { textLink } from "@/components/button-styles";
import { carePlan, customSoftware, response, websiteBuild } from "@/lib/offer";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { promise, site } from "@/lib/site";
import { steadfastTestimonial } from "@/lib/testimonials";

export const metadata: Metadata = {
  // Absolute: the root layout template would otherwise append the site name again.
  title: { absolute: `${site.company} — Websites and custom software. Real people build it.` },
  description: `Websites for ${websiteBuild.priceLabel}, live in ${websiteBuild.turnaround}. Custom software quoted per project. You talk to a person, not a chatbot. ${site.city}.`,
  alternates: { canonical: `https://${site.domain}/` },
  openGraph: {
    title: `${site.company} — Websites and custom software. Real people build it.`,
    description: `Websites for ${websiteBuild.priceLabel}, live in ${websiteBuild.turnaround}. Custom software quoted per project. You talk to a person, not a chatbot. ${site.city}.`,
    url: `https://${site.domain}/`,
  },
};

export default function Home() {
  return (
    <Page>
      {/* 1. HERO */}
      <section className="hero-glow pt-16 md:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 [&>*]:min-w-0 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>
                {site.company} · {site.city}
              </Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                Real people build it. <span className="text-accent">A real person answers.</span>
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                Websites and custom software for businesses. A five-page site is {websiteBuild.priceLabel}, live in{" "}
                {websiteBuild.turnaround}. Bigger ideas get a written scope and a fixed price. Either way, you talk to a person —
                not a chatbot, not a ticket queue.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Talk to a person" />
              <GhostLink href="/websites/" small>
                See the {websiteBuild.priceLabel} website
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>{site.hoursShort}</AccentChip>
              <AccentChip>Reply {response.window}</AccentChip>
              <AccentChip>You own the code</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5 tilt-scene">
            <div className="tilt">
              <figure className="hero-photo m-0">
                <Photo
                  name="home-answer"
                  fallback="answer"
                  alt="A person at a desk taking a phone call in morning light"
                  frame={false}
                  priority
                  width={1200}
                  height={900}
                />
                <figcaption className="photo-chip">
                  <span className="photo-dot" aria-hidden="true" />
                  <span className="leading-snug">
                    <span className="block text-[15px] font-semibold text-ink">A real person, answering</span>
                    <span className="block text-[13px] text-muted">
                      {site.phone} · reply {response.window}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE LAB — what we've built (hybrid) */}
      <Section>
        <div className="reveal">
          <Eyebrow>Built and in use</Eyebrow>
          <H2>The things we&apos;ve built.</H2>
          <Body>
            Software we build for other businesses, and four of our own — a payroll platform, a family calendar, a game, and a
            trading desk — each in early access or testing.
          </Body>
        </div>
        <div className="reveal mt-12">
          <Grid2>
            {products.map((p) => (
              <ProductCard key={p.key} p={p} />
            ))}
          </Grid2>
        </div>
      </Section>

      {/* 3. THE OFFER — three lanes */}
      <Section className="reveal">
        <Eyebrow>What we build</Eyebrow>
        <H2>Three ways to start. One person on the other end.</H2>
        <div className="mt-10">
          <Grid3>
            <Card title={`Website — ${websiteBuild.priceLabel}`} accent>
              Five pages on your own domain, a contact form to your inbox, no cookie banner. Live in {websiteBuild.turnaround}{" "}
              once your content is in.{" "}
              <Link href="/websites/" className={textLink}>
                What&apos;s included
              </Link>
            </Card>
            <Card title={`Care plan — ${carePlan.priceLabel}/month`}>
              Hosting, backups, monitoring, and small edits whenever you need them. One number to call. Cancel any month.{" "}
              <Link href="/websites/#care" className={textLink}>
                How it works
              </Link>
            </Card>
            <Card title={`Custom software — ${customSoftware.fromLabel}`}>
              Internal tools, payroll workspaces, portals, integrations. One call, a written scope, a fixed price.{" "}
              <Link href="/software/" className={textLink}>
                What we can build
              </Link>
            </Card>
          </Grid3>
        </div>
      </Section>

      {/* 4. THE PROMISE */}
      <Section className="reveal">
        <Split visual={<Photo name="software-scope" fallback="scope" alt="A scope document and a build plan on a desk" className="mx-auto max-w-md" />}>
          <Eyebrow>Why it&apos;s different</Eyebrow>
          <H2>
            Built with AI. <span className="text-accent">Checked by a person.</span>
          </H2>
          <Body>{promise.body}</Body>
          <Body>
            We&apos;re open about it: AI does most of the building. That&apos;s why a real website costs{" "}
            {websiteBuild.priceLabel} instead of eight thousand. A person checks every change, stands behind it, and
            picks up the phone.
          </Body>
          <div className="mt-8">
            <PrimaryLink href="/how-we-work/" small>
              How we work
            </PrimaryLink>
          </div>
        </Split>
      </Section>

      {/* 5. PROOF */}
      <Section tone="warm" className="reveal">
        <Eyebrow>Built and in use</Eyebrow>
        <H2>What we built for SteadFast Transportation.</H2>
        <div className="mt-10">
          <Split
            visual={
              <img
                src="/media/websites/steadfast-hero-v2.jpg"
                alt="The SteadFast Transportation website, built by Doyel Labs"
                width={1120}
                height={630}
                decoding="async"
                className="w-full rounded-card border border-line shadow-lift"
              />
            }
          >
            <Body>
              A marketing site and a payroll workspace for a transportation operator in Montana. Both live, both in daily use.
            </Body>
            <div className="mt-8 max-w-3xl">
              <Quote t={steadfastTestimonial} />
            </div>
            <div className="mt-6">
              <GhostLink href="/work/" small>
                See the work
              </GhostLink>
            </div>
          </Split>
        </div>
      </Section>

      {/* 6. HOW IT WORKS */}
      <Section className="reveal">
        <Eyebrow>How it works</Eyebrow>
        <H2>A real conversation, then a real build.</H2>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <Feature step="01" title="You reach out">
            Form, email, or phone. A person reads it and replies {response.window}, {response.usually}.
          </Feature>
          <Feature step="02" title="We talk">
            A short call about your business. No pitch, no pressure. If it&apos;s a website, we collect your content right then.
          </Feature>
          <Feature step="03" title="We build">
            Websites go live in {websiteBuild.turnaround}. Software gets a written scope and a fixed price first, then daily progress.
          </Feature>
          <Feature step="04" title="A person stays on">
            Something needs changing? Call the same number. No help desk, no queue.
          </Feature>
        </div>
      </Section>

      {/* 7. CLOSE */}
      <Close title="Tell us what your business does. We&apos;ll tell you what we can build.">
        One paragraph is enough. If you&apos;re not sure what you need yet, that&apos;s fine — most people aren&apos;t.
      </Close>
    </Page>
  );
}
