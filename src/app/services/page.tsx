import type { Metadata } from "next";
import {
  AccentChip,
  Card,
  Eyebrow,
  Feature,
  GhostLink,
  Grid2,
  Grid3,
  H1,
  H2,
  Lead,
  Notice,
  Page,
} from "@/components/chrome";
import { ClientBadge } from "@/components/client-badge";
import { ContactWidget } from "@/components/contact-modal";
import { WebsiteSteadfastFrame } from "@/components/frames/websites-preview";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { Quote } from "@/components/quote";
import { site } from "@/lib/site";
import { steadfastCase } from "@/lib/demo/websites";
import { steadfastTestimonial } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Services — custom software, websites, payroll, internal tools",
  description:
    "Doyel Labs builds custom software for any business — marketing sites, payroll workspaces, internal tools, data pipelines, portals, mobile apps, and one-off programs. Priced per project. Ongoing partnership available.",
  alternates: { canonical: `https://${site.domain}/services/` },
  openGraph: {
    title: "Services — custom software for any business | Doyel Labs",
    description:
      "Custom software built on your infrastructure. Marketing sites, payroll workspaces, internal tools, and one-off programs.",
    url: `https://${site.domain}/services/`,
    type: "website",
  },
};

export default function Services() {
  return (
    <Page>
      {/* HERO — two-column with a live-work preview on the right */}
      <section className="hero-glow pt-24 md:pt-32">
        <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:items-center md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Services</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                What we <span className="text-accent">build</span>.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                Doyel Labs builds custom software. Marketing sites, payroll
                workspaces, internal tools, data pipelines, portals, mobile
                apps, and one-off programs. For any industry, at any size.
                If the business needs it and it&apos;s legal to build, we
                can build it.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-10 flex flex-wrap items-center gap-3">
              <ContactWidget label="Book an orientation" />
              <GhostLink href="/how-we-work/" small>
                How we work
              </GhostLink>
              <GhostLink href="/pricing/" small>
                Pricing bands
              </GhostLink>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap gap-2">
              <AccentChip>Written scope</AccentChip>
              <AccentChip>Fixed price</AccentChip>
              <AccentChip>You own the source</AccentChip>
              <AccentChip>Retainer optional</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <WebsiteSteadfastFrame />
          </div>
        </div>
      </section>

      {/* SHORT TESTIMONIAL — one-line proof right up front */}
      <section className="mt-24 border-t border-line pt-16">
        <Quote
          attribution={steadfastTestimonial.attribution}
          company={steadfastTestimonial.company}
          companyUrl={steadfastTestimonial.companyUrl}
          logo={steadfastTestimonial.logo}
        >
          {steadfastTestimonial.short}
        </Quote>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>Capabilities</Eyebrow>
          <H2>
            <span className="mt-2 block">The full range.</span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            These are the kinds of software we build. The list is not
            exhaustive — if you don't see the thing you need, ask.
          </p>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="Marketing sites">
              Custom domain, mobile-first, schema.org markup, structured
              content, contact forms wired to your inbox. Cloudflare or
              Netlify deploys.
            </Card>
            <Card title="Payroll &amp; compliance">
              Pay-run workspaces, wage-determination checks, contractor
              registers, audit logs, PDF stub generation, stub email from
              your own domain.
            </Card>
            <Card title="Internal tools">
              Admin dashboards, CRUD portals, moderation queues, back-office
              consoles. The stuff a team opens every day.
            </Card>
            <Card title="Data pipelines">
              CSV ingest, API scrapes, cron jobs, retries, dead-letter
              queues, alerting. Bring your data in, put it somewhere useful.
            </Card>
            <Card title="Portals for partners">
              Signed-in surfaces for contractors, vendors, or clients.
              Document exchange, e-signature, notifications.
            </Card>
            <Card title="API integrations">
              Stripe, Resend, Twilio, Plaid, DocuSign, SAM.gov, Firebase,
              Neon, S3, whatever your operation runs on.
            </Card>
            <Card title="Mobile apps">
              Expo + React Native. iOS and Android from one codebase.
              Firebase or your own backend. Store submission included.
            </Card>
            <Card title="Public web apps">
              Full-stack builds — signed-in users, billing, admin, and a
              marketing site on the same domain.
            </Card>
            <Card title="Custom programs">
              Anything a mid-market vendor would sell as a product — we
              build it for your operation, priced honestly.
            </Card>
          </Grid3>
        </div>
      </section>

      {/* PAST WORK */}
      <section id="work" className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>Past work</Eyebrow>
          <H2>
            <span className="mt-2 block">Recent shipments.</span>
          </H2>
        </div>

        <p className="mt-6 max-w-3xl text-[16px] leading-[1.7] text-mute">
          We have one named client at this stage — <strong className="text-ink">SteadFast Transportation Inc.</strong> —
          and we built two things for them: a full marketing site and a
          custom payroll workspace. Both are live. Both are here as one
          example of the range, not the outline of what we do.
        </p>

        {/* SteadFast website case — text-only summary (frame is in the hero) */}
        <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Client · Website build
            </p>
            <h3 className="mt-3 text-[22px] font-semibold leading-tight text-ink">
              A ten-page marketing site on a real domain.
            </h3>
            <p className="mt-4 text-[14px] leading-[1.7] text-mute">
              Custom domain on their own registrar, hero video, schema.org
              markup, mobile-first navigation, forms wired to the operator&apos;s
              own inbox, and a password-gated workspace on the same
              domain. Live at{" "}
              <a
                href={steadfastCase.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {steadfastCase.domain}
              </a>
              .
            </p>
            <div className="mt-5">
              <ClientBadge
                name={steadfastCase.name}
                logo={steadfastCase.logo}
                url={steadfastCase.liveUrl}
              />
            </div>
            <p className="mt-4 flex flex-wrap gap-2">
              <AccentChip>Live since 2026</AccentChip>
              <AccentChip>10 pages</AccentChip>
              <AccentChip>WCAG AA</AccentChip>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <GhostLink href="/case-studies/steadfast/" small>
                Full case study
              </GhostLink>
              <GhostLink href="/services/websites/" small>
                Websites service
              </GhostLink>
            </div>
          </div>
          <div>
            <div className="border border-line bg-surface/30 p-6">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
                What shipped
              </p>
              <ul className="mt-4 space-y-2 text-[13px] leading-[1.55] text-mute">
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-2.5 shrink-0 bg-accent" />
                  <span>Home, About, Services, Routes, Contractors, FAQ, Contact, +&nbsp;3 legal / thank-you</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-2.5 shrink-0 bg-accent" />
                  <span>Muted looping hero video with print-media font preload</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-2.5 shrink-0 bg-accent" />
                  <span>schema.org Organization + PostalAddress JSON-LD</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-2.5 shrink-0 bg-accent" />
                  <span>Formspree contact + contractor-inquiry with honeypot</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-2.5 shrink-0 bg-accent" />
                  <span>OpenGraph + Twitter cards for social previews</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* SteadFast Payroll case — visual anchor + broader framing */}
        <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <PayrollScaFrame />
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Client · Payroll workspace
            </p>
            <h3 className="mt-3 text-[22px] font-semibold leading-tight text-ink">
              A custom payroll workspace, live for a real operator.
            </h3>
            <p className="mt-4 text-[14px] leading-[1.7] text-mute">
              A password-gated workspace with a contractor register,
              batch pay runs, PDF stubs, stub email from the operator&apos;s
              own domain, 180-day audit log with CSV export, and passkey
              sign-in. This particular build layers on SCA
              wage-determination checks for the client&apos;s federal
              award — yours would layer on whatever compliance rules
              your business answers to.
            </p>
            <div className="mt-5">
              <ClientBadge
                name={steadfastCase.name}
                logo={steadfastCase.logo}
                url={steadfastCase.liveUrl}
              />
            </div>
            <p className="mt-4 flex flex-wrap gap-2">
              <AccentChip>In operator use</AccentChip>
              <AccentChip>Not tax filing</AccentChip>
              <AccentChip>Not money movement</AccentChip>
            </p>
            <div className="mt-6">
              <GhostLink href="/services/payroll/" small>
                Payroll service
              </GhostLink>
            </div>
          </div>
        </div>

        {/* Internal work — brief mentions with links */}
        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Card title="BAI — internal">
            A trading desk that runs on the operator's computer, at their
            broker, under their rules. In private testing. Details on{" "}
            <a
              href="/programs/bai/"
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              the program page
            </a>
            .
          </Card>
          <Card title="ConnectionLoop — internal">
            An invite-only shared calendar for families and small groups.
            Expo + Firebase. Store submission in progress. Details on{" "}
            <a
              href="/programs/connectionloop/"
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              the program page
            </a>
            .
          </Card>
        </div>
      </section>

      {/* PARTNERSHIP */}
      <section id="partnership" className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>Ongoing partnership</Eyebrow>
          <H2>
            <span className="mt-2 block">
              We stay on to keep it running.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            The build is where most agencies stop. We prefer to stay on —
            fix bugs the moment they surface, ship small features month by
            month, and give you a direct line for anything urgent.
          </p>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="What's included" accent>
              <ul className="list-disc space-y-1 pl-4">
                <li>Bug fixes on the software we built</li>
                <li>Dependency and security updates</li>
                <li>Small feature requests each month</li>
                <li>One-business-day SLA on email + phone</li>
              </ul>
            </Card>
            <Card title="What's optional">
              <ul className="list-disc space-y-1 pl-4">
                <li>Larger new features, scoped and quoted separately</li>
                <li>Migrations to new infrastructure</li>
                <li>Compliance updates when your regulator changes rules</li>
              </ul>
            </Card>
            <Card title="How it's priced">
              Fixed monthly rate, quoted after we understand the size of
              the build and how much attention it needs. Cancel any time
              on 30 days' notice.
            </Card>
          </Grid3>
        </div>
      </section>

      {/* HOW AN ENGAGEMENT WORKS */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>How an engagement works</Eyebrow>
          <H2>
            <span className="mt-2 block">
              A real conversation, then a real build.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            Every project starts with a one-hour orientation over Zoom or
            phone — a real conversation with a real human being from
            Doyel Labs. We listen. You decide. If you move forward, we
            get to work.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Feature step="Step 01" title="One-hour orientation">
            Zoom or phone. A real person from Doyel Labs — not a
            chatbot, not a screener. We ask about the business and
            listen. No pressure, no upsell. You&apos;re worth our time.
          </Feature>
          <Feature step="Step 02" title="Scope + fixed price">
            If you move forward, a written scope lands in your inbox by
            the end of the next business day: what ships, what does
            not, timeline, and a fixed price. If the scope grows later,
            we requote — no silent creep.
          </Feature>
          <Feature step="Step 03" title="Build with weekly Loom">
            Preview URL and a Loom the moment there&apos;s something to
            look at. New progress every business day. A human reads
            every commit before it ships.
          </Feature>
          <Feature step="Step 04" title="Handoff + optional retainer">
            Source lives on your Git host, your domain, your database.
            You get a short README, an admin credential, and the option
            to keep us on a monthly retainer.
          </Feature>
        </div>
        <div className="mt-10">
          <GhostLink href="/how-we-work/" small>
            Read the full &quot;how we work&quot; page
          </GhostLink>
        </div>
      </section>

      {/* PRICING PHILOSOPHY */}
      <section id="pricing" className="mt-32 border-t border-line pt-16 md:pt-24">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Priced per project. Contact for a quote.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            Every operation is different, and a rate card lies about
            that. What we can tell you: we quote a fixed price after a
            short call, we do not bill hourly for AI's time, and we
            honour founding-year rates for our first customers. If your
            budget is tight, say so — we'd rather scope tighter than
            underbid and cut corners.
          </p>
          <div className="mt-8">
            <ContactWidget label="Get a quote" />
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="mt-32 border-t border-line pt-16 md:pt-24">
        <Notice>
          Or reach us directly at{" "}
          <a
            href={`mailto:${site.supportEmail}?subject=Work%20with%20us`}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            {site.supportEmail}
          </a>{" "}
          ·{" "}
          <a
            href={site.phoneHref}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            {site.phone}
          </a>
          . We answer within one business day.
        </Notice>
      </section>
    </Page>
  );
}
