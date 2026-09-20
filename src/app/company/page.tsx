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
import { positioning, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company",
  description: `${site.company} is a software company in ${site.city}, formed ${site.founded}.`,
};

export default function Company() {
  return (
    <Page>
      {/* HERO */}
      <section className="hero-glow pt-24 md:pt-32">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            <Eyebrow>Company</Eyebrow>
            <H1>
              <span className="text-accent">Doyel Labs</span>. Casper, Wyoming.
            </H1>
            <Lead>{positioning}</Lead>
            <div className="mt-8">
              <AccentChip>Founded {site.founded}</AccentChip>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactWidget label="Work with us" />
              <GhostLink href="/services/" small>
                See what we build
              </GhostLink>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <LogoMark size={200} />
          </div>
        </div>
      </section>

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
            <Eyebrow>Get in touch</Eyebrow>
            <H2>
              <span className="mt-2 block">Let's talk.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              A short description of the operation is all we need to give
              you a scope and a quote.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Send a message" />
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
