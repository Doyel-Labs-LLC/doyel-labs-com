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
  PrimaryLink,
} from "@/components/chrome";
import { positioning, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company",
  description: `${site.company} is a small software studio in ${site.city}, formed ${site.founded}.`,
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
              {site.companyShort}. <span className="text-accent">Small</span> on purpose.
            </H1>
            <Lead>{positioning}</Lead>
            <div className="mt-8">
              <AccentChip>Founded {site.founded} · {site.city}</AccentChip>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryLink
                href={`mailto:${site.supportEmail}?subject=Work%20with%20us`}
                external
              >
                Work with us
              </PrimaryLink>
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
              AI is our tool, not our pitch.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            We use AI to write first drafts of code, migrations, tests, and
            copy. We use AI to read a wage-determination PDF and pull out
            the numbers. We use AI to shape a schema from a spreadsheet of
            live contractor data. Every diff is reviewed by a person and
            every ship decision is human. That combination is why a
            two-person studio can build a payroll workspace in a week and
            a marketing site in three days.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Feature step="What AI does" title="First drafts. Every draft.">
            Generates TypeScript, React, migration SQL, tests, docs, and
            marketing copy. We prompt, we edit, we ship.
          </Feature>
          <Feature step="What humans do" title="Decisions. Every decision.">
            Every commit is authored by a person. AI has no arm-phrase, no
            production key, no path to spend money on the studio's behalf.
          </Feature>
          <Feature step="Where AI is refused" title="Legal, security, medical, financial claims.">
            Legal drafts go to counsel. Security posture is written from
            code, not from prompts. Any factual claim is checked against a
            file in a repo we control.
          </Feature>
          <Feature step="Where AI is verified" title="Tests that pin the dangerous paths.">
            Payroll: does the SCA floor still block? BAI: can chat still
            not spend? ConnectionLoop: does default-deny still hold? Every
            new commit runs those tests.
          </Feature>
        </div>
      </section>

      {/* WHAT WE ARE */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>What we are</Eyebrow>
          <H2>
            <span className="mt-2 block">The narrow facts.</span>
          </H2>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="Entity">
              {site.company}, formed and registered in the State of
              Wyoming. Founded {site.founded}.
            </Card>
            <Card title="Location">
              {site.city}, United States. Governing law: Wyoming for terms
              of service.
            </Card>
            <Card title="Size">
              Small on purpose. We take on the number of engagements we
              can ship without cutting corners.
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
              One-business-day SLA on the email inbox.
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
            </Card>
            <Card title="Public domains">
              <code className="font-mono text-ink">doyel-labs.com</code>
              <br />
              <code className="font-mono text-ink">connectionloop.app</code>
            </Card>
          </Grid3>
        </div>
      </section>

      {/* WHAT WE ARE NOT */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>What we are not</Eyebrow>
          <H2>
            <span className="mt-2 block">
              The list matters more than the resume.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            A small studio has to be honest about scope. What we do not
            claim to be:
          </p>
        </div>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {[
            "Not a broker-dealer or an investment adviser",
            "Not a bank or a money transmitter",
            "Not a payroll processor or a professional employer organization",
            "Not a reporting agent for any tax authority",
            "Not a fiduciary",
            "Not a public social network",
            "Not an enterprise vendor",
            "Not the cheapest thing you can find on Fiverr",
          ].map((s) => (
            <li
              key={s}
              className="flex gap-3 border-t border-line pt-3 text-[14px] text-mute"
            >
              <span className="mt-2 inline-block h-1 w-4 shrink-0 bg-accent" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CLOSE */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>Contact</Eyebrow>
          <H2>
            <span className="mt-2 block">Three inboxes, in plain sight.</span>
          </H2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Card title="Work with us" accent>
            <p>
              A payroll workspace, a marketing site, or both. Send the
              operation and the domain.
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${site.supportEmail}?subject=Work%20with%20us`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.supportEmail}
              </a>
            </p>
          </Card>
          <Card title="Support">
            <p>Existing product questions.</p>
            <p className="mt-3">
              <a
                href={`mailto:${site.supportEmail}?subject=Support`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.supportEmail}
              </a>
            </p>
            <p className="mt-2">
              <a
                href={site.phoneHref}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.phone}
              </a>
            </p>
          </Card>
          <Card title="Security">
            <p>Vulnerability disclosure.</p>
            <p className="mt-3">
              <a
                href={`mailto:${site.securityEmail}`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.securityEmail}
              </a>
            </p>
          </Card>
        </div>
      </section>
    </Page>
  );
}
