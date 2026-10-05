import type { Metadata } from "next";
import Link from "next/link";
import {
  AccentChip,
  Card,
  Checks,
  Eyebrow,
  Feature,
  H1,
  H2,
  Lead,
  Notice,
  Page,
  Section,
  Split,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactPageForm } from "@/components/contact-page-form";
import { Photo } from "@/components/photo";
import { customSoftware, response, websiteBuild } from "@/lib/offer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — talk to a person",
  description: `Contact ${site.company}. One paragraph about your business is all we need. A person replies ${response.window}, ${response.usually}. Call ${site.phone}, ${site.hoursShort}.`,
  alternates: { canonical: `https://${site.domain}/contact/` },
  openGraph: {
    title: "Contact — talk to a person",
    description: `Contact ${site.company}. One paragraph about your business is all we need. A person replies ${response.window}, ${response.usually}. Call ${site.phone}, ${site.hoursShort}.`,
    url: `https://${site.domain}/contact/`,
  },
};

const link = "text-ink underline decoration-accentDim underline-offset-4 hover:text-accentInk";

const NOT_DONE = [
  "No sales sequence. One reply from a person, then it's up to you.",
  "No newsletter. Your address is used to answer you, nothing else.",
  "No pressure on the call. It's an orientation: listening, not pitching.",
  "No hidden charges. Every price is written down before work starts, and you see it before you agree to anything.",
] as const;

/**
 * /contact/ — the form is the close. No <Close> band; the page ends after
 * the "what we don't do" split.
 */
export default function Contact() {
  return (
    <Page>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact/" }]} />

      {/* 1. HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <div className="hero-in hero-in--1">
            <Eyebrow>Contact</Eyebrow>
          </div>
          <div className="hero-in hero-in--2">
            <H1>
              Talk to <span className="text-accent">a person</span>.
            </H1>
          </div>
          <div className="hero-in hero-in--3">
            <Lead>
              One paragraph about the business is all we need. You&apos;ll get a reply from a person {response.window},{" "}
              {response.usually}.
            </Lead>
          </div>
          <div className="hero-in hero-in--4 mt-8 flex flex-wrap gap-2">
            <AccentChip>{site.hoursShort}</AccentChip>
            <AccentChip>Real person, always</AccentChip>
            <AccentChip>No obligation</AccentChip>
          </div>
        </div>
      </section>

      {/* 2. FORM + DIRECT LINES */}
        <Section>
          <h2 className="sr-only">Send a message</h2>
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-16">
            <div>
              <ContactPageForm />
            </div>
            <div className="space-y-5">
              <Notice>
                <strong className="text-ink">This form goes to a person, not a queue.</strong> It lands in a person&apos;s
                inbox, and that person replies.
              </Notice>
              <Card title="Call">
                <a href={site.phoneHref} className={link}>
                  {site.phone}
                </a>
                <br />
                {site.hours}. If it goes to voicemail, leave a message and a person calls back.
              </Card>
              <Card title="Email">
                <a href={`mailto:${site.supportEmail}`} className={link}>
                  {site.supportEmail}
                </a>
                <br />
                Read by a person. Reply {response.window}, {response.usually}.
              </Card>
              <Card title="Security disclosures">
                <a href={`mailto:${site.securityEmail}`} className={link}>
                  {site.securityEmail}
                </a>
                <br />
                Found a problem with this site? See{" "}
                <Link href="/security/" className={link}>
                  how we handle reports
                </Link>
                .
              </Card>
            </div>
          </div>
        </Section>

      {/* 3. WHAT HAPPENS NEXT */}
        <Section>
          <Eyebrow>What happens next</Eyebrow>
          <H2>Three steps, no surprises.</H2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Feature step="01" title="A person reads it">
              Not an assistant, not a bot. Someone reads what you wrote and replies {response.window}.
            </Feature>
            <Feature step="02" title="You talk, briefly">
              A short call by phone or Zoom about your business and what you need. Listening, not pitching.
            </Feature>
            <Feature step="03" title="Work starts">
              Websites go live in {websiteBuild.turnaround} once your content is in. Software gets a written scope and a
              fixed price, {customSoftware.fromLabel}, within one business day of the call.
            </Feature>
          </div>
        </Section>

      {/* 4. WHAT WE DON'T DO */}
        <Section>
          <Split reverse visual={<Photo name="contact-call" fallback="call" alt="A phone handset resting on a notebook next to a mug on a warm wooden desk" className="mx-auto max-w-md" />}>
            <Eyebrow>What we don&apos;t do</Eyebrow>
            <H2>What we don&apos;t do when you contact us.</H2>
            <Checks items={NOT_DONE} />
          </Split>
        </Section>
    </Page>
  );
}
