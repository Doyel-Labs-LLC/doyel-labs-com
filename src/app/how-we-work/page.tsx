import type { Metadata } from "next";
import Link from "next/link";
import {
  AccentChip,
  Card,
  Eyebrow,
  Feature,
  GhostLink,
  Grid2,
  Grid3,
  H1,
  H2,
  Lead,
  MetaRow,
  Notice,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactWidget } from "@/components/contact-modal";
import { Quote } from "@/components/quote";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { steadfastTestimonial } from "@/lib/testimonials";

export const metadata: Metadata = {
  title:
    "How we work — a real one-hour orientation, then a written scope and a build",
  description:
    "Every engagement with Doyel Labs starts with a one-hour orientation call — a real conversation with a real human being over Zoom or phone. We listen; you decide. If you move forward, a written scope and a fixed price land in your inbox the next business day, and we get to work.",
  alternates: { canonical: `https://${site.domain}/how-we-work/` },
  openGraph: {
    title: "How we work — a real conversation, then a real build | Doyel Labs",
    description:
      "One-hour orientation call over Zoom. Real human being on the other end. If you decide to move forward, we get to work.",
    url: `https://${site.domain}/how-we-work/`,
    type: "website",
  },
};

/**
 * `/how-we-work/` is the long-form pitch page.
 *
 * The centerpiece is the one-hour orientation call — a real
 * conversation with a real human being, no pressure, no obligation.
 * Every other band on the page (AI-native, fixed price, scope
 * discipline, human review, ownership) supports that story.
 *
 * The tone here is warmer than the rest of the site because this is
 * where the anxious visitor lands: someone with an idea who has been
 * burned by an agency and is looking for a reason to trust us.
 */

/** JSON-LD Service description of the orientation call itself.
 * Helps Google understand that "one-hour orientation" is a specific
 * step of the engagement, offered free. */
const orientationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://${site.domain}/how-we-work/#orientation`,
  name: "One-hour software orientation call",
  description:
    "A one-hour conversation with a real Doyel Labs engineer, over Zoom or phone. We listen to the operation, ask questions, and take notes. No obligation, no upsell. At the end of the call you decide whether to move forward; if you do, a written scope and fixed price land in your inbox within one business day.",
  provider: { "@id": `https://${site.domain}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    description:
      "No cost, no obligation. A one-hour orientation for prospective clients considering a Doyel Labs build.",
  },
};

export default function HowWeWork() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Every claim on this page is how a Doyel Labs engagement actually
          runs. If you sign a scope with us and something below turns out
          to be untrue, email {site.supportEmail} and we&apos;ll refund
          the invoice.
        </MetaRow>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orientationSchema) }}
      />

      <Breadcrumbs items={[{ name: "How we work", href: "/how-we-work/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <div className="hero-in hero-in--1">
            <Eyebrow>How we work</Eyebrow>
          </div>
          <div className="hero-in hero-in--2">
            <H1>
              A real{" "}
              <span className="text-accent">conversation</span>. Then a
              real build.
            </H1>
          </div>
          <div className="hero-in hero-in--3">
            <Lead>
              Doyel Labs is AI-native, not AI-only. Yes — we use AI to
              scaffold code, tests, and copy. But every engagement starts
              with a one-hour orientation call: an actual conversation
              with an actual human being. We listen. You decide. Only
              then does the work begin.
            </Lead>
          </div>
          <div className="hero-in hero-in--4 mt-8 flex flex-wrap items-center gap-3">
            <ContactWidget label="Book an orientation" />
            <GhostLink href="/pricing/" small>
              Pricing bands
            </GhostLink>
            <GhostLink href="/writing/ai-native-software-what-we-write-what-we-generate/" small>
              What AI drafts, what we write
            </GhostLink>
          </div>
        </div>
      </section>

      {/* ORIENTATION — the centerpiece */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:items-start">
            <div>
              <Eyebrow>Step 01 · The orientation</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  One hour. A real human. No pressure.
                </span>
              </H2>
              <p className="mt-6 text-[16px] leading-[1.75] text-mute">
                Once you email us — or fill in the contact form — we
                schedule a one-hour orientation call. Zoom or phone,
                your choice. On the other end is a person from Doyel
                Labs, not a screening chatbot and not an
                account-executive whose job is to close.
              </p>
              <p className="mt-4 text-[16px] leading-[1.75] text-mute">
                The hour is about you. What does the business do? Where
                does software fit? What&apos;s slow, brittle, or
                embarrassing right now? What would make it defensible
                on paper? What tools do you already own that we should
                reuse? We take notes; we ask questions; we tell you
                honestly if what you need is outside our scope.
              </p>
              <p className="mt-4 text-[16px] leading-[1.75] text-mute">
                At the end of the hour, the decision is yours. If you
                want to think about it, take a week. If you decide to
                move forward, a written scope and a fixed price land in
                your inbox by the end of the next business day. If you
                don&apos;t, we send our notes anyway — you get the
                thinking either way.
              </p>
              <div className="mt-8">
                <ContactWidget label="Book an orientation" />
              </div>
            </div>

            {/* Right-side card summarising the ground rules */}
            <div className="border border-accentDim bg-accentSoft/20 p-6">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                The four ground rules
              </p>
              <ul className="mt-6 space-y-5">
                <RuleItem
                  number="01"
                  title="A real conversation with a real human being."
                  body="Not a form. Not a chatbot. Not a screening AI. A person from Doyel Labs is on the call for the full hour."
                />
                <RuleItem
                  number="02"
                  title="We listen. Your operation is worth our time."
                  body="We ask; you talk. If the idea is rough, that's fine — orientation is where rough turns into a scope."
                />
                <RuleItem
                  number="03"
                  title="No pressure. The decision is yours."
                  body="At the end of the hour you decide. Zero follow-up sequence. Zero drip email. Zero sunk cost."
                />
                <RuleItem
                  number="04"
                  title="If you say yes, we get to work."
                  body="Written scope + fixed price in your inbox within one business day. If you sign, the build starts."
                />
              </ul>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
                One hour · Zoom or phone · No cost, no obligation
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* THE FLOW */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>The full flow</Eyebrow>
            <H2>
              <span className="mt-2 block">
                From first email to a live build.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Every engagement follows the same shape. No surprise steps,
              no phased upsell, no &quot;we&apos;ll figure that out
              later&quot; ambiguity.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Feature step="01" title="First contact">
              You email us, call, or submit the contact form on any page.
              Within one business day you get a real person on email
              proposing an orientation slot.
            </Feature>
            <Feature step="02" title="One-hour orientation">
              A real conversation over Zoom or phone. We listen; you
              talk. At the end of the hour you decide whether to move
              forward.
            </Feature>
            <Feature step="03" title="Written scope + fixed price">
              If you decide to move forward, we write up a one-to-two-page
              scope by the end of the next business day: what ships, what
              does not, the timeline, and the price. You sign it or you
              don&apos;t.
            </Feature>
            <Feature step="04" title="50% up front, then we start">
              An invoice for half. Payable by ACH, card (Stripe), or
              wire. The build begins the day the invoice clears.
            </Feature>
            <Feature step="05" title="Daily preview, weekly Loom">
              Every business day the code is deployed to a preview URL
              you can open. Every week a short Loom walks through what
              shipped and what&apos;s next.
            </Feature>
            <Feature step="06" title="Handoff + optional retainer">
              Balance invoice at handoff. Source on your Git host, your
              domain, your database. Optional monthly retainer if you
              want us to keep it running.
            </Feature>
          </div>
        </section>
      </Reveal>

      {/* AI + HUMAN — this is where the AI-native explanation lives */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>AI-native, not AI-only</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Where AI helps. Where humans hold the pen.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              We use AI to draft the parts of software that are
              well-understood and easy to verify — scaffolding, tests,
              boilerplate, format conversions, first-pass copy. Then a
              person reads every diff. The one-hour orientation, the
              scope, the reviewing, and every decision about what to
              actually build are all human calls.
            </p>
            <p className="mt-4 text-[14px] text-muted">
              Longer story:{" "}
              <Link
                href="/writing/ai-native-software-what-we-write-what-we-generate/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                AI-native software — what we generate, what we still
                write by hand →
              </Link>
            </p>
          </div>
          <div className="mt-12">
            <Grid2>
              <Card title="What AI does">
                Drafts scaffolding, tests, migrations, boilerplate, and
                first-pass copy. Compresses two-month builds to two-week
                ones so we can quote fixed prices with confidence.
              </Card>
              <Card title="What people do">
                Every diff is read before it merges. Every commit is
                authored by a real name. Every &quot;is this ready for
                production?&quot; is a human call against a real
                checklist.
              </Card>
            </Grid2>
          </div>
        </section>
      </Reveal>

      {/* WHY THIS WORKS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Why this works</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Speed from AI. Trust from humans.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              The combination is what makes fixed-price software honest.
              An agency that only writes by hand can&apos;t quote a fixed
              price without padding it 40% for risk. An agency that only
              runs on AI can&apos;t defend the parts that a client&apos;s
              regulator, auditor, or lawyer will read. Doyel Labs sits in
              the middle on purpose.
            </p>
          </div>
          <div className="mt-12">
            <Grid3>
              <Card title="Fixed price">
                Every scope has a number on it. If the scope grows we
                requote — never silent creep.
              </Card>
              <Card title="Weeks, not quarters">
                Marketing sites in days. Operator workspaces in about a
                week. Bigger builds by the sprint.
              </Card>
              <Card title="You own it all">
                Source on your Git host, your domain, your database. No
                proprietary format. No &quot;call us to migrate.&quot;
              </Card>
            </Grid3>
          </div>
        </section>
      </Reveal>

      {/* PROOF — testimonial */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Proof</Eyebrow>
            <H2>
              <span className="mt-2 block">
                One client so far. Here&apos;s what they said.
              </span>
            </H2>
          </div>
          <div className="mt-10">
            <Quote
              paragraphs={steadfastTestimonial.full}
              attribution={steadfastTestimonial.attribution}
              company={steadfastTestimonial.company}
              companyUrl={steadfastTestimonial.companyUrl}
              logo={steadfastTestimonial.logo}
              size="large"
            />
          </div>
          <div className="mt-6">
            <GhostLink href="/work/" small>
              Read the full case study
            </GhostLink>
          </div>
        </section>
      </Reveal>

      {/* NERVOUS QUESTIONS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Before you book the orientation</Eyebrow>
            <H2>
              <span className="mt-2 block">
                The nervous-question section.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              These are the questions people almost ask on the first
              email but don&apos;t. Read them so you can skip the
              awkward part.
            </p>
          </div>
          <div className="mt-10 space-y-4">
            <NervousQ q="What if my idea is rough or half-formed?">
              That&apos;s what the orientation is for. If you already
              had a locked spec you&apos;d be hiring a developer, not
              talking to us. Rough ideas turn into scoped projects
              during the hour — that&apos;s the whole point.
            </NervousQ>
            <NervousQ q="What if I can't afford what you'd normally build?">
              Say so on the call. We&apos;d rather scope tighter — ship
              the core in phase one, phase two later — than underbid
              and cut corners. We also quietly discount for nonprofits
              and small operators we believe in.
            </NervousQ>
            <NervousQ q="What if I don't know anything about software?">
              You don&apos;t need to. The orientation is us listening
              to your business, not you translating your business into
              engineering. If you can describe what your operation does,
              we can figure out what to build.
            </NervousQ>
            <NervousQ q="What if I decide during the call that we're not a fit?">
              Say so. We&apos;ll thank you for the hour, send you our
              notes, and — if it&apos;s useful — point you at a
              different vendor. No hard feelings, no follow-up drip
              email.
            </NervousQ>
            <NervousQ q="What if I book and then need to reschedule?">
              Reply to the calendar invite. We usually have another
              slot within a day or two.
            </NervousQ>
            <NervousQ q="Do I need to sign anything to have the call?">
              No. The orientation is free and non-obligatory. If you
              decide to move forward, we send a scope + price for you
              to sign — never before.
            </NervousQ>
          </div>
          <div className="mt-10">
            <GhostLink href="/faq/" small>
              More questions on the FAQ
            </GhostLink>
          </div>
        </section>
      </Reveal>

      {/* CLOSE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Book an orientation</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  Tell us about your business.
                </span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                One paragraph on what your business does and what
                you&apos;d like to build. We reply within one business
                day with a couple of Zoom or phone times that could work.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactWidget label="Book an orientation" />
                <GhostLink href={site.phoneHref} small external>
                  Or call {site.phone}
                </GhostLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <AccentChip>1 hour</AccentChip>
                <AccentChip>Zoom or phone</AccentChip>
                <AccentChip>Free</AccentChip>
                <AccentChip>No obligation</AccentChip>
              </div>
            </div>
            <div>
              <Notice>
                <p>
                  We answer real email at{" "}
                  <a
                    href={`mailto:${site.supportEmail}`}
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    {site.supportEmail}
                  </a>
                  . One-business-day SLA. If you prefer the phone,{" "}
                  <a
                    href={site.phoneHref}
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    {site.phone}
                  </a>{" "}
                  reaches a real human during US business hours.
                </p>
              </Notice>
            </div>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}

/** One rule of the four-ground-rules card in the orientation section. */
function RuleItem({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="font-mono text-[11px] uppercase tracking-eyebrow text-accent">
        {number}
      </span>
      <div>
        <p className="text-[14px] font-semibold leading-tight text-ink">
          {title}
        </p>
        <p className="mt-2 text-[13px] leading-[1.6] text-mute">{body}</p>
      </div>
    </li>
  );
}

/** Collapsible Q on the "nervous questions" band. Uses native
 * `<details>` so it works with keyboard, screen readers, and JS off. */
function NervousQ({
  q,
  children,
}: {
  q: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group surface-card rounded-[3px] border border-line p-5 shadow-card transition-colors duration-200 ease-soft hover:border-accentDim open:border-accentDim">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-ink hover:text-accentHi">
        <span>{q}</span>
        <span
          aria-hidden="true"
          className="font-mono text-[12px] text-accent transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="mt-4 text-[14px] leading-[1.7] text-mute">
        {children}
      </div>
    </details>
  );
}
