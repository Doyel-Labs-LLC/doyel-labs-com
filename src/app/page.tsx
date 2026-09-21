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
import { PayrollPaystubFrame } from "@/components/frames/payroll-paystub";
import { HeroPreview } from "@/components/hero-preview";
import { Quote } from "@/components/quote";
import { Reveal } from "@/components/reveal";
import {
  entries as changelogEntries,
  formatChangelogDate,
} from "@/lib/changelog";
import { steadfastCase } from "@/lib/demo/websites";
import { programStatus, site } from "@/lib/site";
import { steadfastTestimonial } from "@/lib/testimonials";

/**
 * Homepage metadata. This is the single most important SEO surface on
 * the site. Google renders the `title` and `description` in search
 * results verbatim; the AI Overview blends them with the Organization
 * schema. Every word should push the "custom software studio for real
 * businesses" identity — not the trading-desk framing that older
 * cached results still show.
 */
export const metadata: Metadata = {
  title: `${site.company} — Custom software for small businesses through enterprises`,
  description:
    "Tell us what your business needs and we'll build it — websites, payroll workspaces, internal tools, custom programs. Doyel Labs is a Casper, Wyoming software studio for mom-and-pop operators through enterprises. Priced per project, shipped in weeks, and we stay on to keep it running.",
  alternates: { canonical: `https://${site.domain}/` },
  openGraph: {
    title: `${site.company} — Custom software for small businesses through enterprises`,
    description:
      "Tell us what your business needs and we'll build it — websites, payroll workspaces, internal tools, custom programs. Priced per project, shipped in weeks.",
    url: `https://${site.domain}/`,
    type: "website",
  },
};

export default function Home() {
  return (
    <Page>
      {/* HERO — two-column with layered product preview on the right.
       * The right column is only visible on md+; on mobile the preview
       * stacks below the copy. */}
      <section className="relative hero-glow pt-24 md:pt-32">
        <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:items-center md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>
                {site.company} · {site.city}
              </Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                The <span className="text-accent">software</span> your business
                runs on.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                Have an idea? Tell us what your business does and we&apos;ll
                tell you what we can build. Marketing sites, payroll
                workspaces, internal tools, custom programs — priced per
                project, shipped in weeks, and we stay on to keep it
                running.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-10 flex flex-wrap items-center gap-3">
              <ContactWidget label="Start a conversation" />
              <GhostLink href="/work/" small>
                See our work
              </GhostLink>
              <GhostLink href="/contact/" small>
                I&apos;m still figuring it out
              </GhostLink>
            </div>
          </div>

          {/* Layered product preview — right column on desktop, stacks on mobile */}
          <div className="hero-in hero-in--5 md:pl-4 lg:pl-0">
            <HeroPreview />
          </div>
        </div>

        {/* Trust strip — mono-typed proof signals under the hero.
         * Facts about the whole company, never pinned to one industry
         * or one client's compliance regime. */}
        <div className="hero-in hero-in--5 mt-14 border-t border-line pt-6">
          <p className="trust-strip">
            <span>
              <span className="dot" aria-hidden="true" />
              Live client work since <strong>2026</strong>
            </span>
            <span>
              Any industry, any operation
            </span>
            <span>
              Shipping in <strong>days</strong>, not quarters
            </span>
            <span>
              <strong>{site.city}</strong>-based
            </span>
            <span>
              Reply within <strong>1 business day</strong>
            </span>
          </p>
        </div>
      </section>

      {/* TESTIMONIAL — big proof point right below the hero */}
      <Reveal>
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
          Full case study with screenshots and product frames at{" "}
          <Link
            href="/work/"
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            /work
          </Link>
          .
        </p>
        </section>
      </Reveal>

      {/* WHAT WE BUILD — broad capabilities */}
      <Reveal>
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
      </Reveal>

      {/* SELECTED WORK — real screenshot of Steadfast + program tiles */}
      <Reveal>
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>Selected work</Eyebrow>
          <H2>
            <span className="mt-2 block">Recent shipments.</span>
          </H2>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <PayrollPaystubFrame />
          </div>
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Payroll · Client build
            </p>
            <h3 className="mt-3 text-[22px] font-semibold leading-tight text-ink">
              A custom payroll workspace, live for a real operator.
            </h3>
            <p className="mt-4 text-[14px] leading-[1.7] text-mute">
              Contractor register, batch pay runs, stubs from the
              operator&apos;s own domain, an audit log with CSV export,
              passkey sign-in, and full-JSON backups. This particular
              build layers on SCA wage-determination checks for the
              client&apos;s federal award — yours would layer on
              whatever compliance rules your business answers to.
            </p>
            <div className="mt-5">
              <ClientBadge
                name={steadfastCase.name}
                logo={steadfastCase.logo}
                url={steadfastCase.liveUrl}
              />
            </div>
            <div className="mt-6">
              <GhostLink href="/work/" small>
                Read the case study
              </GhostLink>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <WorkTile
            eyebrow="Services · Payroll workspaces"
            title="Custom pay-run software for any business"
            body="Day-rate, hourly + overtime, salaried, tipped, per-diem, or any mix. Your bank pays the money; the software prepares the run and keeps a defensible record."
            href="/services/payroll/"
            proof="Live client build"
            proofKind="accent"
          />
          <WorkTile
            eyebrow="Product · BAI Desk"
            title="An autonomous trading desk that runs on your own computer"
            body="Keys stay on the operator's machine. Every trade has a stop and a target held at the broker. Chat cannot spend."
            href="/products/#bai"
            proof={programStatus.bai.label}
            proofKind="care"
          />
          <WorkTile
            eyebrow="Product · ConnectionLoop"
            title="A shared calendar for families and small groups"
            body="Invite-only. Free. No ads. No public feed. iOS and Android. Built by Doyel Labs, credited to The Hamilton Family."
            href="/products/#connectionloop"
            proof={programStatus.connectionloop.label}
            proofKind="care"
          />
        </div>
      </section>
      </Reveal>

      {/* HOW WE WORK — leads with the orientation call, then the four beats. */}
      <Reveal>
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>How we work</Eyebrow>
            <H2>
              <span className="mt-2 block">
                A real conversation. Then a real build.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              AI-native, not AI-only. We use AI to draft code, tests,
              and copy — but every engagement starts with a one-hour
              orientation over Zoom or phone. A real person, on the
              other end, listening. You&apos;re worth our time.
            </p>
            <div className="mt-6">
              <GhostLink href="/how-we-work/" small>
                The full engagement flow
              </GhostLink>
            </div>
          </div>
          <div className="grid gap-6">
            <Feature step="01" title="One-hour orientation">
              Zoom or phone. A real human from Doyel Labs — not a
              chatbot, not a screener. We listen; you decide. No
              pressure, no upsell, no cost.
            </Feature>
            <Feature step="02" title="Written scope, fixed price">
              If you move forward, a written scope lands in your inbox
              by the end of the next business day: what ships, what
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
              No lock-in, no proprietary format, no &quot;call us to
              migrate.&quot; Optional monthly retainer to keep us on.
            </Feature>
          </div>
        </div>
      </section>
      </Reveal>

      {/* WHAT YOU MIGHT BE HERE FOR — audience */}
      <Reveal>
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
              title="I need to run payroll"
              body="A workspace that pays who you actually pay — day-rate, hourly, salaried, tipped, per-diem, or a mix — and keeps a defensible record."
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
              href="/contact/"
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
      </Reveal>

      {/* RECENTLY SHIPPED — live signal that we're actively iterating.
       * Pulls the 3 most recent changelog entries so a repeat visitor
       * immediately sees new work without hunting for it. */}
      <Reveal>
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-start">
          <div>
            <Eyebrow>Recently shipped</Eyebrow>
            <H2>
              <span className="mt-2 block">
                What changed this week.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Every real change to Doyel Labs itself lands on the
              changelog. Three most recent below; the full timeline
              plus RSS is at{" "}
              <Link
                href="/changelog/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /changelog
              </Link>
              .
            </p>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
              <span>
                <strong className="text-ink">
                  {changelogEntries.length}
                </strong>{" "}
                entries on file
              </span>
              <span>
                <a
                  href="/changelog/rss.xml"
                  className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                >
                  RSS →
                </a>
              </span>
            </div>
          </div>
          <ul className="space-y-4">
            {changelogEntries.slice(0, 3).map((entry) => (
              <li key={entry.id}>
                <Link
                  href={`/changelog/#${entry.id}`}
                  className="group block border border-line bg-surface/30 p-5 transition-colors hover:border-accentDim"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                      {entry.version ?? entry.section}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
                      · {entry.section}
                    </span>
                    <time
                      dateTime={entry.date}
                      className="font-mono text-[10px] uppercase tracking-wide text-muted"
                    >
                      · {formatChangelogDate(entry.date)}
                    </time>
                  </div>
                  <h3 className="mt-3 text-[16px] font-semibold leading-tight text-ink group-hover:text-accentHi">
                    {entry.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.65] text-mute">
                    {entry.body}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <GhostLink href="/changelog/" small>
            See the full timeline →
          </GhostLink>
        </div>
      </section>
      </Reveal>

      {/* CLOSE — big contact CTA */}
      <Reveal>
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Book an orientation</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Tell us what you&apos;re trying to build.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              One paragraph on the operation, or the idea, and we reply
              within one business day with a couple of Zoom or phone
              times that could work. The orientation is one hour, no
              cost, no obligation, and always with a real human being.
              If the idea is rough, that&apos;s fine — that&apos;s what
              the hour is for.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Book an orientation" />
              <GhostLink href="/how-we-work/" small>
                How we work
              </GhostLink>
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
      </Reveal>
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
