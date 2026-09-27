import type { Metadata } from "next";
import Link from "next/link";
import {
  AccentChip,
  Body,
  Card,
  Close,
  Eyebrow,
  Faq,
  Feature,
  GhostLink,
  Grid2,
  H1,
  H2,
  Lead,
  Page,
  Section,
  Split,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Illus } from "@/components/illus";
import { Photo } from "@/components/photo";
import { Reveal } from "@/components/reveal";
import { carePlan, customSoftware, response, websiteBuild } from "@/lib/offer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How we work — a call, a written scope, a person who stays on",
  description: `What happens from your first message to long after launch. Fixed prices, ${customSoftware.billing.toLowerCase()} You own the code. You talk to Blake the whole way.`,
  alternates: { canonical: `https://${site.domain}/how-we-work/` },
  openGraph: {
    title: "How we work | Doyel Labs",
    description: `A real conversation, a written scope, and a person who stays on. Websites ${websiteBuild.priceLabel}; software ${customSoftware.fromLabel}. Never hourly.`,
    url: `https://${site.domain}/how-we-work/`,
    type: "website",
  },
};

const faq = [
  {
    q: "What if I don't know what I need?",
    a: "That's normal. Tell Blake what your business does and what's slow or annoying right now. The call is where a rough idea turns into a plan. If what you need is outside what we do, we'll say so.",
  },
  {
    q: "Do you work outside Wyoming and Montana?",
    a: "Yes. We work with businesses anywhere in the United States, by phone and video. Nothing about the build needs us in the same room.",
  },
  {
    q: "What if I need a change after launch?",
    a: `Small edits are included in the care plan, ${carePlan.priceLabel} a month. Anything larger gets a written quote first. Either way, call the same number and you get the same person.`,
  },
  {
    q: "Can I cancel?",
    a: `Websites: cancel before the build starts and the deposit comes back to you. Care plan: ${carePlan.cancel} Software: the written scope says what is owed at each stage, and nothing beyond it.`,
  },
  {
    q: "Who am I talking to?",
    a: `${site.founder}, from the first call to the last. He reads the email, takes the call, builds the work, and answers the phone afterward. No chatbot, no ticket queue.`,
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HowWeWork() {
  return (
    <Page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={[{ name: "How we work", href: "/how-we-work/" }]} />

      {/* 1. HERO */}
      <section className="hero-glow pt-4">
        <div className="grid grid-cols-1 items-center gap-12 [&>*]:min-w-0 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>How we work</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                A real conversation. A written scope. <span className="text-accent">A person who stays on.</span>
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                You send a message. Blake replies and you talk for a bit. You get a price in writing before anything is
                built. Then the work happens where you can see it, and the same person picks up the phone long after
                launch.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Talk to a person" />
              <GhostLink href="/websites/#pricing" small>
                See the website offer
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>Fixed prices</AccentChip>
              <AccentChip>Never hourly</AccentChip>
              <AccentChip>You own the code</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <Photo name="how-we-work-scope" fallback="scope" alt="A one-page written scope on a wooden table beside a coffee mug" className="mx-auto max-w-md" priority />
          </div>
        </div>
      </section>

      {/* 2. THE STEPS */}
      <Reveal>
        <Section id="steps">
          <Eyebrow>The steps</Eyebrow>
          <H2>From first message to long after launch.</H2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <Feature step="01" title="You reach out">
              Form, email, or phone. Blake reads it and replies {response.window}, {response.usually}.
            </Feature>
            <Feature step="02" title="We talk">
              A short orientation call about your business. Listening, no pitch, no obligation. If it&apos;s a website, we
              collect your content on the call.
            </Feature>
            <Feature step="03" title="You get it in writing">
              For websites, the price is already public: {websiteBuild.priceLabel}. For software, a written scope and a
              fixed price within one business day of the call.
            </Feature>
            <Feature step="04" title="We build">
              Websites go live in {websiteBuild.turnaround} after your content is in. Software shows progress you can see
              every business day.
            </Feature>
            <Feature step="05" title="A person stays on">
              Take the care plan, or just call when something needs attention. Same number, same person.
            </Feature>
          </div>
        </Section>
      </Reveal>

      {/* 3. MONEY */}
      <Reveal>
        <Section id="money">
          <Eyebrow>Money, plainly</Eyebrow>
          <H2>Every price is fixed and written down first.</H2>
          <Body>
            AI builds most of what we ship. That&apos;s the reason the prices are what they are. A person checks every change and answers for it.
          </Body>
          <div className="mt-10">
            <Grid2>
              <Card title={`Websites — ${websiteBuild.priceLabel}, ${websiteBuild.terms}`} accent>
                {websiteBuild.depositLabel}. The whole price for five pages on your own domain.{" "}
                <Link href="/websites/" className="text-accent underline decoration-accentDim underline-offset-4 hover:text-accentHi">
                  What&apos;s included
                </Link>
              </Card>
              <Card title={`Care plan — ${carePlan.priceLabel} per month`}>
                Hosting, backups, monitoring, and small edits. Optional. {carePlan.cancel}
              </Card>
              <Card title={`Custom software — ${customSoftware.fromLabel}`}>
                Quoted per project after the call. {customSoftware.billing} If the scope grows, we requote in writing.
              </Card>
              <Card title="What's never charged">
                The first call. Small questions by email. A quote. You only pay for work you agreed to in writing.
              </Card>
            </Grid2>
          </div>
        </Section>
      </Reveal>

      {/* 4. OWNERSHIP */}
      <Reveal>
        <Section id="ownership">
          <Split visual={<Illus name="keys" className="mx-auto max-w-sm" />}>
            <Eyebrow>Ownership</Eyebrow>
            <H2>You own it. All of it.</H2>
            <Body>
              The code, the domain, and the accounts it runs in are yours from the start. Your domain sits on your own
              registrar. Nothing is locked in a format only we can open.
            </Body>
            <Body>
              If you ever leave, we hand over everything and help you move it. No exit fee, no &quot;call us to
              migrate.&quot; We&apos;d rather you stay because the work is good.
            </Body>
          </Split>
        </Section>
      </Reveal>

      {/* 5. FAQ */}
      <Reveal>
        <Section id="faq">
          <Eyebrow>Questions people ask</Eyebrow>
          <H2>Before you send that first message.</H2>
          <div className="max-w-3xl">
            <Faq items={faq} />
          </div>
        </Section>
      </Reveal>

      {/* 6. CLOSE */}
      <Close title="Start with one paragraph about your business.">
        That&apos;s all the first message needs. Blake will reply with a time to talk.
      </Close>
    </Page>
  );
}
