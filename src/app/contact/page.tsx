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
import { ContactPageForm } from "@/components/contact-page-form";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — book a one-hour orientation with a real human",
  description: `Contact ${site.company}. One paragraph on your business, and a real person will reply within one business day to schedule a one-hour orientation call over Zoom or phone. Free, no obligation.`,
  alternates: { canonical: `https://${site.domain}/contact/` },
  openGraph: {
    title: `Contact ${site.company} — book a one-hour orientation`,
    description:
      "One paragraph on your business, and a real person replies within one business day. Free orientation over Zoom or phone.",
    url: `https://${site.domain}/contact/`,
    type: "website",
  },
};

/**
 * `/contact/` — the primary conversion surface.
 *
 * Layout: hero with orientation framing + trust chips → two-column
 * form + direct-contact panel → a "what happens after you hit send"
 * band so the visitor knows exactly what to expect.
 */
export default function Contact() {
  return (
    <Page>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <div className="hero-in hero-in--1">
            <Eyebrow>Contact</Eyebrow>
          </div>
          <div className="hero-in hero-in--2">
            <H1>
              Let&apos;s <span className="text-accent">talk</span>.
            </H1>
          </div>
          <div className="hero-in hero-in--3">
            <Lead>
              One paragraph on the business is all we need. A real
              person from Doyel Labs replies within one business day
              with a couple of times that could work for a one-hour
              orientation over Zoom or phone. No cost, no obligation,
              no follow-up drip.
            </Lead>
          </div>
          <div className="hero-in hero-in--4 mt-6 flex flex-wrap gap-2">
            <AccentChip>1-business-day reply</AccentChip>
            <AccentChip>Real human, always</AccentChip>
            <AccentChip>Free orientation</AccentChip>
            <AccentChip>No obligation</AccentChip>
          </div>
        </div>
      </section>

      {/* FORM + DIRECT CONTACT */}
      <section className="mt-16 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <ContactPageForm />
        </div>

        <div className="grid gap-4">
          <Card title="Direct" accent>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
              Email
            </p>
            <p className="mt-1">
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.supportEmail}
              </a>
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
              Phone
            </p>
            <p className="mt-1">
              <a
                href={site.phoneHref}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.phone}
              </a>{" "}
              <span className="text-muted">· US business hours (MT)</span>
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
              Response time
            </p>
            <p className="mt-1 text-[13px] leading-[1.6] text-mute">
              One business day, always with a real person on the other
              end — never a chatbot or an autoresponder.
            </p>
          </Card>

          <Card title="Security disclosure">
            Report a vulnerability at{" "}
            <a
              href={`mailto:${site.securityEmail}?subject=Security%20disclosure`}
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              {site.securityEmail}
            </a>
            . Two-business-day response. See{" "}
            <a
              href="/security/"
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              /security
            </a>{" "}
            for our full posture.
          </Card>

          <Card title="Registered office">
            {site.company}
            <br />
            {site.city}, United States
            <br />
            <span className="text-muted">
              Written notice via{" "}
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.supportEmail}
              </a>
              .
            </span>
          </Card>
        </div>
      </section>

      {/* WHAT HAPPENS AFTER YOU HIT SEND */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What happens after you hit send</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Three steps, then a real conversation.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              We spelled this out because a lot of contact forms lie
              about what happens next. Here&apos;s the actual sequence,
              in order.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <StepCard
              step="01"
              title="A real person emails you back"
              body="Within one business day. Not a form-letter, not a chatbot. If you suggested orientation times, we confirm one; if you didn't, we propose two or three."
            />
            <StepCard
              step="02"
              title="One-hour orientation over Zoom or phone"
              body="We listen more than we talk. You describe the operation; we ask questions. At the end of the hour, you decide whether to move forward."
            />
            <StepCard
              step="03"
              title="Written scope + fixed price (only if you're moving forward)"
              body="If you decide yes, a scope + price land in your inbox by the end of the next business day. If you decide no, we send our notes anyway."
            />
          </div>
          <div className="mt-8">
            <GhostLink href="/how-we-work/" small>
              The full &quot;how we work&quot; page
            </GhostLink>
          </div>
        </section>
      </Reveal>

      {/* QUIET COMMITMENTS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Quiet commitments</Eyebrow>
            <H2>
              <span className="mt-2 block">
                What we do not do when you contact us.
              </span>
            </H2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Card title="No sales sequence">
              One reply from a real person. If you don&apos;t reply, we
              don&apos;t chase. No &quot;just checking in&quot; emails,
              no six-touch cadence.
            </Card>
            <Card title="No pressure on the call">
              The one-hour orientation is a conversation, not a pitch.
              If we realize we&apos;re not a fit, we say so and (if we
              can) point you at someone who is.
            </Card>
            <Card title="No hidden charges">
              The orientation is free. The scope + quote is free. You
              only pay against a scope you signed for.
            </Card>
            <Card title="No newsletter sign-up">
              We don&apos;t collect emails for a mailing list. Your
              contact info is used to reply to you and nothing else.
              See our{" "}
              <a
                href="/legal/privacy/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                privacy policy
              </a>
              .
            </Card>
          </div>
        </section>
      </Reveal>

      {/* RELATED */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>While you&apos;re here</Eyebrow>
          <H2>
            <span className="mt-2 block">More places to look.</span>
          </H2>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostLink href="/how-we-work/" small>
            How we work
          </GhostLink>
          <GhostLink href="/services/" small>
            What we build
          </GhostLink>
          <GhostLink href="/pricing/" small>
            Pricing bands
          </GhostLink>
          <GhostLink href="/case-studies/steadfast/" small>
            Case study
          </GhostLink>
          <GhostLink href="/faq/" small>
            FAQ
          </GhostLink>
          <GhostLink href="/writing/" small>
            Writing
          </GhostLink>
        </div>
        <div className="mt-12">
          <Notice>
            <p>
              If you&apos;re here for a security disclosure or a legal
              notice rather than a project, use the direct contact card
              above — those go to different queues than the form.
            </p>
          </Notice>
        </div>
      </section>
    </Page>
  );
}

/** Numbered step card in the "what happens after you hit send" band. */
function StepCard({
  step,
  title,
  body,
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border border-line bg-surface/30 p-6">
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
        Step {step}
      </p>
      <h3 className="mt-3 text-[17px] font-semibold leading-tight text-ink">
        {title}
      </h3>
      <p className="mt-4 text-[13px] leading-[1.65] text-mute">{body}</p>
    </div>
  );
}
