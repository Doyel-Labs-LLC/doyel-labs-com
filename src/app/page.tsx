import type { Metadata } from "next";
import Link from "next/link";
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
  StatusChip,
} from "@/components/chrome";
import { positioning, programStatus, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.company} — a small software studio`,
  description: positioning,
};

export default function Home() {
  return (
    <Page>
      {/* HERO — company-first. No BAI framing, no engineering language. */}
      <section className="relative hero-glow pt-24 md:pt-32">
        <Eyebrow>
          {site.company} · {site.city} · Founded {site.founded}
        </Eyebrow>
        <H1>
          A small studio building{" "}
          <span className="text-accent">software</span> for people who cannot afford a wrong payment or a silent order.
        </H1>
        <Lead>
          Doyel Labs is a two-person software studio in Casper, Wyoming.
          We build with AI as our main tool, so we ship what used to take a
          ten-person team — payroll for federal service contractors,
          marketing sites for small operators, and a pair of internal
          programs.
        </Lead>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <PrimaryLink href="/services/">See what we build</PrimaryLink>
          <GhostLink href="/company/" small>
            About the studio
          </GhostLink>
        </div>
        <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-wide text-muted">
          <span>Not a broker-dealer</span>
          <span aria-hidden="true">·</span>
          <span>Not a bank</span>
          <span aria-hidden="true">·</span>
          <span>Not a payroll processor</span>
        </p>
      </section>

      {/* WHAT WE BUILD — three-across, equal billing. */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>What we build</Eyebrow>
          <H2>
            <span className="mt-2 block">Two things we sell. Two we run.</span>
          </H2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ProductTile
            eyebrow="Service · payroll"
            title="Payroll for SCA operators"
            body="A pay-run workspace for day-rate independent contractors under the Service Contract Act. Wage-determination lookups, floor checks, audit rows a DOL inspector can read."
            href="/services/payroll/"
            proof="Live at SteadFast Transportation Inc."
            proofColor="accent"
          />
          <ProductTile
            eyebrow="Service · websites"
            title="Websites for small operators"
            body="Fast, accessible marketing sites. Custom domain on your own registrar, mobile-first navigation, schema.org markup, no dark patterns."
            href="/services/websites/"
            proof="Live at steadfasttransportationinc.com"
            proofColor="accent"
          />
          <ProductTile
            eyebrow="Program · BAI"
            title="A trading desk that runs on your own computer"
            body="At your broker, under your rules. Keys stay on your machine. Every trade has a stop and a target held at the broker. Chat cannot spend."
            href="/programs/bai/"
            proof={programStatus.bai.label}
            proofColor="care"
          />
          <ProductTile
            eyebrow="Program · ConnectionLoop"
            title="Shared plans, lists, and chat for families"
            body="Invite-only. Free. No ads. No public feed. Built by Doyel Labs, credited to The Hamilton Family."
            href="/programs/connectionloop/"
            proof={programStatus.connectionloop.label}
            proofColor="care"
          />
        </div>
      </section>

      {/* HOW WE WORK — the AI-native studio angle, honestly. */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <H2>
              <span className="mt-2 block">A small studio, modern tools.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              We use AI to write code and draft copy, and we spend the time
              we get back on the parts a machine cannot do — talking to
              operators, reading labor law, testing what could go wrong,
              and cleaning up after ourselves. That is why a small studio
              can ship for small operators at a price the enterprise world
              never bothered to offer.
            </p>
            <div className="mt-8">
              <GhostLink href="/company/" small>
                Read more about the studio
              </GhostLink>
            </div>
          </div>
          <div className="grid gap-6">
            <Feature step="01" title="Tight scope, then ship">
              We write down what the software does and does not do before
              we write code. If the scope grows, the timeline grows with
              it — no silent scope creep.
            </Feature>
            <Feature step="02" title="AI-assisted, human-reviewed">
              We use AI to generate first drafts of code, migrations,
              tests, and copy. Every diff is read by a person before it
              ships. AI never touches production without a human commit.
            </Feature>
            <Feature step="03" title="Weeks, not quarters">
              A marketing site: about three days for a small operator.
              An operator payroll workspace: about a week. A program like
              BAI: months, because the failure modes are the whole point.
            </Feature>
            <Feature step="04" title="You own it">
              Source lives on your Git host, your domain, your database.
              You can walk away with the whole thing. No lock-in, no
              proprietary format, no "call us to migrate."
            </Feature>
          </div>
        </div>
      </section>

      {/* WHO WE BUILD FOR — audience clarity. */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>Who we build for</Eyebrow>
          <H2>
            <span className="mt-2 block">
              People with real operations and honest budgets.
            </span>
          </H2>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="Federal service contractors">
              USPS contract-delivery operators, service-contract awardees,
              anyone paying day-rate independent contractors under the
              SCA. You need clean pay records, not a payroll processor
              you cannot afford.
            </Card>
            <Card title="Small operators">
              You need a fast site, on your own domain, that reads well on
              a phone and does not leak your visitors to a dozen ad
              networks. We build the whole thing.
            </Card>
            <Card title="Ourselves">
              BAI and ConnectionLoop are things the studio is trying to
              make work. If either one interests you, we would rather you
              read the security page than the pitch.
            </Card>
          </Grid3>
        </div>
      </section>

      {/* WHERE WE ARE — location + founding note. */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            <Eyebrow>Where we are</Eyebrow>
            <H2>
              <span className="mt-2 block">Casper, Wyoming.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Doyel Labs LLC was formed in {site.founded}. Wyoming for the
              LLC. United States for the customers. Time zones will figure
              themselves out.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryLink
                href={`mailto:${site.supportEmail}?subject=Work%20with%20us`}
                external
              >
                Work with us
              </PrimaryLink>
              <GhostLink href={site.phoneHref} small external>
                Call {site.phone}
              </GhostLink>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <LogoMark size={128} />
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
                Doyel Labs · {site.city}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

/**
 * A large product tile — used four-across on the "What we build" band.
 * The tile is a hairline card that lifts a cyan hairline on hover.
 */
function ProductTile({
  eyebrow,
  title,
  body,
  href,
  proof,
  proofColor,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  proof: string;
  proofColor: "accent" | "care";
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between border border-line bg-surface/30 p-6 transition-all duration-200 ease-soft hover:border-accentDim hover:bg-surface/60"
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-mute">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-[17px] font-semibold uppercase leading-tight tracking-display text-ink group-hover:text-accentHi">
          {title}
        </h3>
        <p className="mt-4 text-[13px] leading-[1.65] text-mute">{body}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        {proofColor === "accent" ? (
          <AccentChip>{proof}</AccentChip>
        ) : (
          <StatusChip>{proof}</StatusChip>
        )}
        <span className="text-accent transition-transform duration-200 ease-soft group-hover:translate-x-1" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
