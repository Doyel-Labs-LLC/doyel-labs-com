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
import { Quote } from "@/components/quote";
import { steadfastCase } from "@/lib/demo/websites";
import { programStatus, site } from "@/lib/site";
import { steadfastTestimonial } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: `${site.company} — the software your business runs on`,
  description:
    "Doyel Labs builds custom software — marketing sites, payroll workspaces, internal tools, custom programs. Have an idea? Tell us what your business does; we'll tell you what we can build.",
};

export default function Home() {
  return (
    <Page>
      {/* HERO — warmer, consultative, "start a conversation" */}
      <section className="relative hero-glow pt-24 md:pt-32">
        <Eyebrow>
          {site.company} · {site.city}
        </Eyebrow>
        <H1>
          The <span className="text-accent">software</span> your business runs on.
        </H1>
        <Lead>
          Have an idea? Tell us what your business does and we'll tell you
          what we can build. Marketing sites, payroll workspaces, internal
          tools, custom programs — priced per project, shipped in weeks,
          and we stay on to keep it running.
        </Lead>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ContactWidget label="Start a conversation" />
          <GhostLink href="/work/" small>
            See our work
          </GhostLink>
          <GhostLink href="/start/" small>
            I'm still figuring it out
          </GhostLink>
        </div>
      </section>

      {/* TESTIMONIAL — big proof point right below the hero */}
      <section className="mt-24 border-t border-line pt-16 md:pt-20">
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
        <p className="mt-6 max-w-prose text-[14px] text-muted">
          The full case study, with screenshots and product frames from the
          SteadFast site and payroll workspace, is at{" "}
          <Link
            href="/case-studies/steadfast/"
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            /case-studies/steadfast
          </Link>
          .
        </p>
      </section>

      {/* WHAT WE BUILD — broad capabilities */}
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
              Fast, accessible sites on your own domain. Mobile-first,
              schema.org markup, forms wired to your inbox.
            </Card>
            <Card title="Payroll &amp; compliance">
              Pay-run workspaces, wage-determination checks, audit logs a
              regulator can read.
            </Card>
            <Card title="Internal tools">
              Dashboards, CRUD portals, admin consoles — the stuff a team
              opens every day.
            </Card>
            <Card title="Data pipelines">
              CSV ingest, API scrapes, cron schedules, retries and alerts
              included.
            </Card>
            <Card title="Custom programs">
              Anything that would exist as its own product if you had the
              budget of a mid-market vendor.
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
            <div className="mt-6">
              <GhostLink href="/case-studies/steadfast/" small>
                Read the case study
              </GhostLink>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <WorkTile
            eyebrow="Payroll · SteadFast Transportation"
            title="SteadFast Payroll — SCA-first pay-run workspace"
            body="Day-rate contractor register, SAM.gov wage-determination lookups, floor checks on every draft, and an audit log a DOL inspector can read."
            href="/services/payroll/"
            proof="In operator use"
            proofKind="accent"
          />
          <WorkTile
            eyebrow="Program · BAI"
            title="A trading desk that runs on your own computer"
            body="Keys stay on the operator's machine. Every trade has a stop and a target held at the broker. Chat cannot spend."
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

      {/* HOW WE WORK */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <H2>
              <span className="mt-2 block">AI is our tool. You get the output.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              We use AI to write code, migrations, tests, and copy — then
              a person reads every diff before it ships. That's how we
              quote fixed prices, hit tight deadlines, and stay on to
              maintain the software once it's live.
            </p>
          </div>
          <div className="grid gap-6">
            <Feature step="01" title="Start with a conversation">
              A short call or email exchange. You describe the operation
              or the idea — even if it's rough. We say what we can build,
              what tools you already own that we should reuse, and how
              much it should cost.
            </Feature>
            <Feature step="02" title="Written scope, fixed price">
              Within one business day, a written scope: what ships, what
              does not, timeline, price. If the scope grows later, we
              requote — no silent creep.
            </Feature>
            <Feature step="03" title="Weeks, not quarters">
              Marketing sites in days. Operator workspaces in about a
              week. Bigger builds by the sprint, with a preview URL and
              a Loom every business day.
            </Feature>
            <Feature step="04" title="You own the software">
              Source lives on your Git host, your domain, your database.
              No lock-in, no proprietary format, no "call us to migrate."
              Optional monthly retainer to keep us on for maintenance.
            </Feature>
          </div>
        </div>
      </section>

      {/* WHAT YOU MIGHT BE HERE FOR — audience */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>What might you be here for?</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Pick the one that sounds like you.
            </span>
          </H2>
        </div>
        <div className="mt-12">
          <Grid3>
            <PathCard
              title="I need a marketing site"
              body="A fast, professional site on my own domain that actually reads well on a phone."
              href="/services/websites/"
            />
            <PathCard
              title="I need to pay contractors"
              body="A workspace that handles day-rate contractors, wage-determination checks, and stubs that hold up to an inspection."
              href="/services/payroll/"
            />
            <PathCard
              title="I have a specific software idea"
              body="A dashboard, a portal, an internal tool, an integration — I know what it should do."
              href="/services/"
            />
            <PathCard
              title="I have an idea but need help scoping"
              body="I know the outcome I want but I'm not sure what to build first."
              href="/start/"
            />
            <PathCard
              title="I need help with existing software"
              body="I have software that breaks or slows me down and I need someone to fix it."
              href="/services/#partnership"
            />
            <PathCard
              title="I'm still browsing"
              body="I'm just seeing what's out there. Take a look at what we've built."
              href="/work/"
            />
          </Grid3>
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
              One paragraph on the operation, or the idea. We reply within
              one business day. If the idea is rough, that's fine — a
              short conversation usually turns "somewhere between an
              inventory tracker and a Slack bot" into a scope + price.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Start a conversation" />
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

/**
 * A conversational path card — used in the "What might you be here for?"
 * band. Reads more like a helpful librarian pointing at the right shelf
 * than a marketing tile.
 */
function PathCard({
  title,
  body,
  href,
}: {
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between border border-line p-6 transition-all duration-200 ease-soft hover:border-accentDim hover:bg-surface/40"
    >
      <div>
        <p className="text-[15px] font-semibold text-ink group-hover:text-accentHi">
          {title}
        </p>
        <p className="mt-3 text-[13px] leading-[1.65] text-mute">{body}</p>
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-accent">
        Go here →
      </p>
    </Link>
  );
}
