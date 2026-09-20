import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  Eyebrow,
  Feature,
  GhostLink,
  Grid2,
  H1,
  H2,
  Lead,
  Notice,
  Page,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { Quote } from "@/components/quote";
import { site } from "@/lib/site";
import { steadfastTestimonial } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Start here",
  description:
    "Have an idea for software you want built? Start here. Doyel Labs helps you scope, price, and ship — even if the idea is still rough.",
};

export default function Start() {
  return (
    <Page>
      {/* HERO */}
      <section className="hero-glow pt-24 md:pt-32">
        <Eyebrow>Start here</Eyebrow>
        <H1>
          Have an <span className="text-accent">idea</span>? Good — that's what we do.
        </H1>
        <Lead>
          Most people who reach out don't have a spec. They have an
          operation, a problem, and a rough sense of what a piece of
          software would need to do. Our job is to turn that into a
          scope, a price, and working software. Here's how it starts.
        </Lead>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ContactWidget label="Send us a message" />
          <GhostLink href="/services/" small>
            See what we build
          </GhostLink>
          <GhostLink href="/case-studies/steadfast/" small>
            Read a case study
          </GhostLink>
        </div>
      </section>

      {/* STEPS */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>What happens next</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Four steps, four business days.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            None of these steps commit you to anything. The first
            conversation is free, the scope is free, and the price is
            fixed before you sign.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Feature step="Day 01" title="You reach out">
            Send a paragraph — through the contact form, an email, or a
            phone call. What does the business do? What's the problem
            you're trying to solve? What have you tried already? Even
            "I don't really know, I just know we need something better
            than a spreadsheet" is a perfectly good starting point.
          </Feature>
          <Feature step="Day 01" title="We reply within one business day">
            You get a real reply from a real person. Either a short
            discovery-call invitation ("let's talk for 30 minutes and
            figure this out") or, if the idea is well-scoped already, a
            direct quote request.
          </Feature>
          <Feature step="Day 02" title="Discovery call (30 minutes)">
            We talk through the operation, the constraints, the tools
            you already own, and the outcome that would make this
            worthwhile. We say what we can build and what we can't. If
            we're not the right team for the job, we say so and point
            you at who is.
          </Feature>
          <Feature step="Day 03–04" title="Written scope + fixed price">
            You get a written scope: what ships, what does not, timeline,
            price. If it looks right, you sign and we start. If it
            doesn't, we iterate — no pressure, no billing.
          </Feature>
        </div>
      </section>

      {/* WHAT KIND OF IDEAS */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>What kind of ideas</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Examples of ideas we've heard.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            The list below is a mix of what we've shipped and what we've
            been asked about. If any of them sound like your situation,
            reach out — we've thought about the shape of the problem
            before.
          </p>
        </div>
        <div className="mt-12">
          <Grid2>
            <IdeaCard title="A marketing site that reads well on a phone">
              You have a website that looks fine on a laptop and terrible
              on mobile, or no site at all, or a site your business
              outgrew. You want it fast and honest.
            </IdeaCard>
            <IdeaCard title="A pay-run workspace">
              You pay contractors, need to prove wage compliance to a
              regulator, and are tired of doing it in a spreadsheet.
            </IdeaCard>
            <IdeaCard title="An admin dashboard for a small team">
              You have data scattered across spreadsheets and email — you
              want it in one place where your team can update it, search
              it, and export a report when someone asks.
            </IdeaCard>
            <IdeaCard title="A portal for your clients or contractors">
              You have documents, statuses, or reports that other people
              need to see. Emailing them one at a time is not a system.
            </IdeaCard>
            <IdeaCard title="An integration between tools you already use">
              You have a CRM, a billing system, and an inbox — but they
              don't talk to each other. You want one to trigger the
              next.
            </IdeaCard>
            <IdeaCard title="Something no one has built">
              You have a specific problem in your industry that off-the-shelf
              software doesn't solve. You want a piece of custom software
              that solves it, exactly.
            </IdeaCard>
          </Grid2>
        </div>
        <p className="mt-8 max-w-prose text-[14px] text-mute">
          Not on the list? That's fine — most of what we build isn't. The
          list above is examples, not limits.
        </p>
      </section>

      {/* THE PART WHERE YOU MIGHT BE NERVOUS */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Questions people ask</Eyebrow>
          <H2>
            <span className="mt-2 block">
              The nervous stuff, up front.
            </span>
          </H2>
        </div>
        <div className="mt-12">
          <Grid2>
            <Card title="What if my idea is dumb?">
              It's not dumb. It's an idea. Some ideas we build, some we
              tell you to buy off the shelf, some we tell you don't
              need software at all. All three of those are honest
              answers we're comfortable giving.
            </Card>
            <Card title="What if I can't afford it?">
              Tell us the budget. We'd rather scope tighter to fit than
              underbid and cut corners. If the budget doesn't fit any
              version of the project, we say so.
            </Card>
            <Card title="What if I don't know the technical details?">
              You don't need to. You describe the outcome; we translate
              it. If a technical decision matters (which database, which
              cloud, which framework), we'll explain the tradeoffs in
              plain language.
            </Card>
            <Card title="What if it doesn't work out?">
              You own everything we built. Source on your Git host,
              database on your account, domain on your registrar. If you
              want to fire us tomorrow, you keep everything and any
              engineer can pick up.
            </Card>
            <Card title="What if it takes longer than promised?">
              We requote before the timeline slips. If we're going to
              miss, you know a week in advance, not on the day. If we
              caused the slip, we absorb the cost.
            </Card>
            <Card title="What if I go quiet in the middle?">
              We check in. If you disappear for a week, we email. If you
              disappear for a month, we pause the project and refund the
              unearned portion of the deposit. Life happens.
            </Card>
          </Grid2>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>What a client says</Eyebrow>
        </div>
        <div className="mt-8">
          <Quote
            paragraphs={steadfastTestimonial.full}
            attribution={steadfastTestimonial.attribution}
            company={steadfastTestimonial.company}
            companyUrl={steadfastTestimonial.companyUrl}
            logo={steadfastTestimonial.logo}
            size="large"
          />
        </div>
      </section>

      {/* CLOSE */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Ready?</Eyebrow>
          <H2>
            <span className="mt-2 block">Tell us the idea.</span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            One paragraph is plenty. What does the business do, and what
            would make it work better? We'll take it from there.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ContactWidget label="Send us a message" />
            <GhostLink href={site.phoneHref} small external>
              Call {site.phone}
            </GhostLink>
          </div>
        </div>
        <div className="mt-16">
          <Notice>
            Prefer email? Reach us directly at{" "}
            <a
              href={`mailto:${site.supportEmail}?subject=Project%20idea`}
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              {site.supportEmail}
            </a>
            . One-business-day SLA.
          </Notice>
        </div>
      </section>
    </Page>
  );
}

function IdeaCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-line p-6 transition-colors hover:border-accentDim">
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
        Idea
      </p>
      <h3 className="mt-3 text-[16px] font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-[13px] leading-[1.65] text-mute">{children}</p>
    </div>
  );
}
