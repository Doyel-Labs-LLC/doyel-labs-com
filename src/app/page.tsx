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
  StatusChip,
} from "@/components/chrome";
import { ClientBadge } from "@/components/client-badge";
import { ContactWidget } from "@/components/contact-modal";
import { WebsiteSteadfastFrame } from "@/components/frames/websites-preview";
import { steadfastCase } from "@/lib/demo/websites";
import { positioning, programStatus, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.company} — the software your business runs on`,
  description: positioning,
};

export default function Home() {
  return (
    <Page>
      {/* HERO */}
      <section className="relative hero-glow pt-24 md:pt-32">
        <Eyebrow>{site.company} · {site.city}</Eyebrow>
        <H1>
          The <span className="text-accent">software</span> your business runs on.
        </H1>
        <Lead>
          Doyel Labs builds it — payroll, marketing sites, internal tools,
          custom programs. We ship in weeks, we stay on to keep it running,
          and we price the project, not the hours.
        </Lead>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ContactWidget label="Start a project" />
          <GhostLink href="/work/" small>
            See our work
          </GhostLink>
        </div>
      </section>

      {/* WHAT WE BUILD — broad capabilities, not narrowed to "two things" */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>What we build</Eyebrow>
          <H2>
            <span className="mt-2 block">
              If it moves data, we can build it.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            Every company has a piece of software that ties the operation
            together. Payroll one week, an inventory tool the next, a
            portal for a partner, a marketing site on your own domain.
            Doyel Labs builds any of it, on your infrastructure, and hands
            it over so it is yours.
          </p>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="Marketing sites">
              Fast, accessible marketing sites on your own domain.
              Mobile-first, schema.org, forms wired to your inbox.
            </Card>
            <Card title="Payroll &amp; compliance">
              Pay-run workspaces, wage-determination checks, audit logs a
              regulator can read.
            </Card>
            <Card title="Internal tools">
              Dashboards, CRUD portals, admin consoles. The stuff a team
              actually opens every day.
            </Card>
            <Card title="Data pipelines">
              Ingest a CSV, hit an API, put the result somewhere useful.
              Cron schedules, retries, and alerts included.
            </Card>
            <Card title="Custom programs">
              Anything that would exist as its own product if you had the
              budget of a mid-market vendor. We build them for less.
            </Card>
            <Card title="API integrations">
              Bank, payments, tax filers, e-signature, mail, SMS — plug
              them into the workflow instead of the other way around.
            </Card>
          </Grid3>
        </div>
      </section>

      {/* SELECTED WORK — real screenshot of Steadfast + program tiles */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>Selected work</Eyebrow>
          <H2>
            <span className="mt-2 block">Recent shipments.</span>
          </H2>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* SteadFast Transportation website */}
          <div>
            <WebsiteSteadfastFrame />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Website · Client
            </p>
            <h3 className="mt-3 text-[22px] font-semibold leading-tight text-ink">
              A ten-page marketing site for a federal service contractor.
            </h3>
            <p className="mt-4 text-[14px] leading-[1.7] text-mute">
              Custom domain, mobile-first navigation, schema.org markup,
              hero video, contractor-inquiry form, and a password-gated
              payroll workspace on the same domain. Live since 2026.
            </p>
            <div className="mt-5">
              <ClientBadge
                name={steadfastCase.name}
                logo={steadfastCase.logo}
                url={steadfastCase.liveUrl}
              />
            </div>
          </div>
        </div>

        {/* Three more work tiles — payroll + programs */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <WorkTile
            eyebrow="Payroll · SteadFast Transportation"
            title="SteadFast Payroll — SCA-first pay-run workspace"
            body="Day-rate contractor register, SAM.gov wage-determination lookups, floor checks on every draft, and an audit log a DOL inspector can read. In production."
            href="/services/payroll/"
            proof="In operator use"
            proofKind="accent"
          />
          <WorkTile
            eyebrow="Program · BAI"
            title="A trading desk that runs on your own computer"
            body="Keys stay on the operator's machine. Every trade has a stop and a target held at the broker. Chat cannot spend. In private testing."
            href="/programs/bai/"
            proof={programStatus.bai.label}
            proofKind="care"
          />
          <WorkTile
            eyebrow="Program · ConnectionLoop"
            title="A shared calendar for families and small groups"
            body="Invite-only. Free. No ads. No public feed. iOS and Android. Built by Doyel Labs, credited to The Hamilton Family."
            href="/programs/connectionloop/"
            proof={programStatus.connectionloop.label}
            proofKind="care"
          />
        </div>
      </section>

      {/* HOW WE WORK — AI-as-tool, honest */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <H2>
              <span className="mt-2 block">AI is our tool. You get the output.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              We use AI to write code, migrations, tests, and copy — then
              a person reads every diff before it ships. That's why we can
              quote fixed prices, hit tight deadlines, and stay on to
              maintain the software once it's live.
            </p>
          </div>
          <div className="grid gap-6">
            <Feature step="01" title="Tight scope, then ship">
              We write down what the software does and does not do before
              we write code. If the scope grows, we requote — no silent
              creep.
            </Feature>
            <Feature step="02" title="AI-assisted, human-reviewed">
              AI drafts. Humans decide. Every commit is authored by a
              person and every ship is a human call.
            </Feature>
            <Feature step="03" title="Weeks, not quarters">
              Marketing sites in days. Operator workspaces in a week.
              Bigger builds by the sprint, with a preview URL and a Loom
              every business day.
            </Feature>
            <Feature step="04" title="You own it">
              Source lives on your Git host, your domain, your database.
              No lock-in, no proprietary format, no "call us to migrate."
            </Feature>
          </div>
        </div>
      </section>

      {/* ONGOING PARTNERSHIP — new band */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>After launch</Eyebrow>
            <H2>
              <span className="mt-2 block">We stay on.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              The build is the beginning, not the deliverable. Every
              engagement includes the option to keep us on a monthly
              retainer — bug fixes, dependency updates, small features,
              and a phone number for the next question.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card title="What's included" accent>
              <ul className="list-disc space-y-1 pl-4">
                <li>Bug fixes on the software we built</li>
                <li>Dependency and security updates</li>
                <li>Small feature requests (one or two per month)</li>
                <li>Direct email + phone line, one-business-day SLA</li>
              </ul>
            </Card>
            <Card title="What it costs">
              <p>
                Priced per month, based on the size of the build and how
                much attention it needs. Cancel any time. Founding-year
                rate for our first customers.
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-accent">
                Quoted after a short call
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CLOSE — big contact CTA */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Get in touch</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Tell us what you're trying to build.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              One paragraph on the operation and what would make it
              better. We reply within one business day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Send a message" />
              <GhostLink href={site.phoneHref} small external>
                Call {site.phone}
              </GhostLink>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <LogoMark size={120} />
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
                {site.company} · {site.city}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

/**
 * A work tile — same visual language as the previous ProductTile, kept
 * for the "Selected work" band. Not to be confused with the case
 * frame at the top of the same section.
 */
function WorkTile({
  eyebrow,
  title,
  body,
  href,
  proof,
  proofKind,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  proof: string;
  proofKind: "accent" | "care";
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
        <h3 className="mt-3 text-[17px] font-semibold leading-tight text-ink group-hover:text-accentHi">
          {title}
        </h3>
        <p className="mt-4 text-[13px] leading-[1.65] text-mute">{body}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        {proofKind === "accent" ? (
          <AccentChip>{proof}</AccentChip>
        ) : (
          <StatusChip>{proof}</StatusChip>
        )}
        <span
          className="text-accent transition-transform duration-200 ease-soft group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </Link>
  );
}
