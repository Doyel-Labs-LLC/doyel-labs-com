import type { Metadata } from "next";
import {
  AccentChip,
  Card,
  Eyebrow,
  Feature,
  GhostLink,
  Grid3,
  H1,
  H2,
  Lead,
  LogoMark,
  Page,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { Quote } from "@/components/quote";
import { Reveal } from "@/components/reveal";
import { positioning, site } from "@/lib/site";
import { steadfastTestimonial } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Company — a software studio in Casper, Wyoming",
  description: `${site.company} is a custom software studio based in ${site.city}, formed ${site.founded}. We build for any business — AI-native, human-reviewed, priced per project, shipped in weeks.`,
  alternates: { canonical: `https://${site.domain}/company/` },
  openGraph: {
    title: `Company — ${site.company}`,
    description: `A custom software studio in ${site.city}. AI-native, human-reviewed, priced per project.`,
    url: `https://${site.domain}/company/`,
    type: "website",
  },
};

export default function Company() {
  return (
    <Page>
      {/* HERO — logo left, company card right */}
      <section className="hero-glow pt-24 md:pt-32">
        <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:items-center md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Company</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                <span className="text-accent">Doyel Labs</span>. Casper,
                Wyoming.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>{positioning}</Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap gap-2">
              <AccentChip>Founded {site.founded}</AccentChip>
              <AccentChip>Wyoming LLC</AccentChip>
              <AccentChip>AI-native, human-reviewed</AccentChip>
              <AccentChip>Priced per project</AccentChip>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-3">
              <ContactWidget label="Book an orientation" />
              <GhostLink href="/how-we-work/" small>
                How we work
              </GhostLink>
              <GhostLink href="/services/" small>
                What we build
              </GhostLink>
            </div>
          </div>
          {/* Right column: logo + company card */}
          <div className="hero-in hero-in--5 flex flex-col items-center">
            <LogoMark size={160} />
            <div className="mt-10 w-full max-w-md border border-line bg-surface/40 p-6">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                Company card
              </p>
              <dl className="mt-4 space-y-3 text-[13px]">
                <FactRow label="Legal name" value={site.company} />
                <FactRow label="Founded" value={site.founded} />
                <FactRow label="Location" value={site.city} />
                <FactRow label="Domain" value={site.domain} />
                <FactRow label="Governing law" value="Wyoming, USA" />
                <FactRow
                  label="Support SLA"
                  value="1 business day, human"
                />
                <FactRow label="What we build" value="Custom software" />
                <FactRow label="For" value="Any business, any industry" />
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL — short quote near the top */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <Quote
            attribution={steadfastTestimonial.attribution}
            company={steadfastTestimonial.company}
            companyUrl={steadfastTestimonial.companyUrl}
            logo={steadfastTestimonial.logo}
          >
            {steadfastTestimonial.short}
          </Quote>
          <div className="mt-4">
            <GhostLink href="/work/" small>
              Read the case study
            </GhostLink>
          </div>
        </section>
      </Reveal>

      {/* WHO'S BEHIND DOYEL LABS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Who&apos;s behind Doyel Labs</Eyebrow>
            <H2>
              <span className="mt-2 block">
                A real human, not a &quot;team&quot; page with stock
                photos.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Doyel Labs is founded and run by Blake Doyel — the
              person you email, the person on the orientation call,
              and the person who reads every line of code we ship.
              Non-traditional path, honest AI-native approach,
              based in {site.city}.
            </p>
            <div className="mt-6">
              <GhostLink href="/founder/" small>
                Read the founder page
              </GhostLink>
            </div>
          </div>
        </section>
      </Reveal>

      {/* HOW WE WORK */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>How we work</Eyebrow>
          <H2>
            <span className="mt-2 block">
              AI is the tool. Judgement is the product.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            We use AI to draft code, migrations, tests, and copy. Every
            diff is reviewed by a person, and every ship decision is a
            human call. The output is the same as a traditional
            engineering team's — the difference is that we can quote a
            fixed price and hit it.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Feature step="What AI does" title="First drafts. Every draft.">
            Generates TypeScript, React, migration SQL, tests, docs, and
            marketing copy. We prompt, we edit, we ship.
          </Feature>
          <Feature step="What humans do" title="Decisions. Every decision.">
            Every commit is authored by a person. AI has no arm-phrase, no
            production key, and no path to spend money on our behalf.
          </Feature>
          <Feature step="Where AI is refused" title="Legal, security, and financial claims.">
            Legal drafts go to counsel. Security posture is written from
            code, not from prompts. Any factual claim is verified against
            a real file we control.
          </Feature>
          <Feature step="Where AI is verified" title="Tests pin the dangerous paths.">
            Payroll: does the SCA floor still block? BAI: can chat still
            not spend? ConnectionLoop: does default-deny still hold? Every
            commit runs those tests.
          </Feature>
        </div>
      </section>

      {/* FACTS */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>Facts</Eyebrow>
          <H2>
            <span className="mt-2 block">The narrow stuff.</span>
          </H2>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="Entity">
              {site.company}, formed and registered in the State of Wyoming
              in {site.founded}.
            </Card>
            <Card title="Location">
              {site.city}, United States. Governing law: Wyoming for terms
              of service.
            </Card>
            <Card title="Public domains">
              <code className="font-mono text-ink">doyel-labs.com</code>
              <br />
              <code className="font-mono text-ink">connectionloop.app</code>
            </Card>
            <Card title="Support">
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.supportEmail}
              </a>
              <br />
              <a
                href={site.phoneHref}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.phone}
              </a>
              <br />
              One-business-day SLA.
            </Card>
            <Card title="Security disclosure">
              <a
                href={`mailto:${site.securityEmail}`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.securityEmail}
              </a>
              <br />
              Two-business-day response.
              <br />
              <a
                href="/security/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                Security posture
              </a>
            </Card>
            <Card title="Engineering">
              Fail-closed defaults for anything that moves money.{" "}
              <a
                href="/engineering/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                How we build
              </a>
              .
            </Card>
          </Grid3>
        </div>
      </section>

      {/* CLOSE */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Book an orientation</Eyebrow>
            <H2>
              <span className="mt-2 block">Let&apos;s talk.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              One paragraph on the operation is all we need to schedule a
              one-hour orientation call. A real person, over Zoom or
              phone. Free, no obligation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Book an orientation" />
              <GhostLink href={site.phoneHref} small external>
                Call {site.phone}
              </GhostLink>
            </div>
          </div>
          <div />
        </div>
      </section>
    </Page>
  );
}

/** Row in the hero company card. Mono label on the left, ink value on
 * the right, hairline separator. */
function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line/70 pb-2 last:border-b-0 last:pb-0">
      <dt className="shrink-0 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
        {label}
      </dt>
      <dd className="text-right text-[13px] text-ink">{value}</dd>
    </div>
  );
}
