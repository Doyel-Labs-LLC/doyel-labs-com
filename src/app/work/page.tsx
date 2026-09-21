import type { Metadata } from "next";
import Link from "next/link";
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
  StatusChip,
} from "@/components/chrome";
import { ClientBadge } from "@/components/client-badge";
import { ContactWidget } from "@/components/contact-modal";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { WebsiteSteadfastFrame } from "@/components/frames/websites-preview";
import { Quote } from "@/components/quote";
import { programStatus, site } from "@/lib/site";
import { steadfastCase } from "@/lib/demo/websites";
import { steadfastTestimonial } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Work — recent shipments from Doyel Labs",
  description:
    "Real software Doyel Labs has shipped — a live marketing site and custom payroll workspace for SteadFast Transportation Inc., plus internal programs BAI and ConnectionLoop. Every project names the client, the domain, and what shipped.",
  alternates: { canonical: `https://${site.domain}/work/` },
  openGraph: {
    title: "Work — recent shipments | Doyel Labs",
    description:
      "Real software Doyel Labs has shipped. Live marketing sites, custom payroll workspaces, internal programs.",
    url: `https://${site.domain}/work/`,
    type: "website",
  },
};

export default function Work() {
  return (
    <Page>
      {/* HERO */}
      <section className="pt-24 md:pt-32">
        <Eyebrow>Work</Eyebrow>
        <H1>
          What we've <span className="text-accent">shipped</span>.
        </H1>
        <Lead>
          Every project below is real software running in production or
          in private testing. Each one names the client, the domain, and
          what shipped.
        </Lead>
      </section>

      {/* Full multi-paragraph testimonial — /reviews/ was folded into
       * this page, so the whole quote lives here. Short-form use of
       * the same quote continues on the homepage. */}
      <section className="mt-24 border-t border-line pt-16">
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
        <p className="mt-6 max-w-prose text-[13px] leading-[1.65] text-muted">
          Approved and signed off by the quoted party.{" "}
          <a
            href={steadfastTestimonial.verify.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mute underline decoration-line2 underline-offset-2 hover:text-accentHi"
          >
            {steadfastTestimonial.verify.label}
          </a>
          .
        </p>
      </section>

      {/* STEADFAST WEBSITE */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <WebsiteSteadfastFrame />
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Client · Website build
            </p>
            <H2>
              <span className="mt-2 block">
                A federal service contractor's marketing site.
              </span>
            </H2>
            <p className="mt-4 text-[15px] leading-[1.7] text-mute">
              Ten pages, custom domain, mobile-first navigation, hero
              video, schema.org markup, and contact + contractor-inquiry
              forms wired to the operator's inbox. Password-gated payroll
              workspace on the same domain.
            </p>
            <div className="mt-5">
              <ClientBadge
                name={steadfastCase.name}
                logo={steadfastCase.logo}
                url={steadfastCase.liveUrl}
              />
            </div>
            <p className="mt-4 flex flex-wrap gap-2">
              <AccentChip>Live at {steadfastCase.domain}</AccentChip>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <GhostLink
                href={steadfastCase.liveUrl}
                small
                external
              >
                Visit the live site
              </GhostLink>
              <GhostLink href="/services/websites/" small>
                Websites service
              </GhostLink>
            </div>
          </div>
        </div>
      </section>

      {/* STEADFAST PAYROLL */}
      <section className="mt-32 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <PayrollScaFrame />
          <div className="flex flex-col justify-center">
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Client · Payroll workspace
            </p>
            <H2>
              <span className="mt-2 block">
                A custom payroll workspace, live for a real operator.
              </span>
            </H2>
            <p className="mt-4 text-[15px] leading-[1.7] text-mute">
              A password-gated workspace with a contractor register,
              batch pay runs, PDF stubs from the operator&apos;s own
              domain, 180-day audit log with CSV export, and passkey
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
            <div className="mt-6 flex flex-wrap gap-3">
              <GhostLink href="/services/payroll/" small>
                Payroll service
              </GhostLink>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL PRODUCTS */}
      <section className="mt-32 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Doyel Labs products</Eyebrow>
          <H2>
            <span className="mt-2 block">Software we ship under our own brand.</span>
          </H2>
          <p className="mt-6 text-[15px] leading-[1.7] text-mute">
            Two products, both in private beta today. Full details on the{" "}
            <Link
              href="/products/"
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              products page
            </Link>
            .
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <ProgramCard
            eyebrow="Product · BAI Desk"
            title="An autonomous trading desk that runs on your own computer."
            body="At your broker, under your rules. Keys stay on the operator's machine. Every trade has a stop and a target held at the broker. Chat cannot spend."
            href="/products/#bai"
            status={programStatus.bai.label}
          />
          <ProgramCard
            eyebrow="Product · ConnectionLoop"
            title="Shared plans, lists, and chat for families."
            body="Invite-only. Free. No ads. No public feed. iOS and Android. Built by Doyel Labs, credited to The Hamilton Family."
            href="/products/#connectionloop"
            status={programStatus.connectionloop.label}
          />
        </div>
      </section>

      {/* CLOSE */}
      <section className="mt-32 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Your project next</Eyebrow>
            <H2>
              <span className="mt-2 block">
                What would you like to see here?
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Tell us what you'd like to build and we'll tell you what it
              would take.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Start a project" />
              <GhostLink href={site.phoneHref} small external>
                Call {site.phone}
              </GhostLink>
            </div>
          </div>
          <div />
        </div>
        <div className="mt-16">
          <Notice>
            Or reach us directly at{" "}
            <a
              href={`mailto:${site.supportEmail}?subject=New%20project`}
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              {site.supportEmail}
            </a>
            . One-business-day response.
          </Notice>
        </div>
      </section>
    </Page>
  );
}

function ProgramCard({
  eyebrow,
  title,
  body,
  href,
  status,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  status: string;
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
        <h3 className="mt-3 text-[19px] font-semibold leading-tight text-ink group-hover:text-accentHi">
          {title}
        </h3>
        <p className="mt-4 text-[14px] leading-[1.65] text-mute">{body}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <StatusChip>{status}</StatusChip>
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
