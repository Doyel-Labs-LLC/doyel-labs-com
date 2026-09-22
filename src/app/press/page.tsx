import type { Metadata } from "next";
import Link from "next/link";
import {
  AccentChip,
  Card,
  Eyebrow,
  GhostLink,
  Grid2,
  Grid3,
  H1,
  H2,
  Lead,
  LogoMark,
  MetaRow,
  Notice,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactWidget } from "@/components/contact-modal";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

/**
 * `/press/` — the media kit.
 *
 * Everything a journalist, podcast host, investor, or partner needs
 * to reference Doyel Labs without having to email us first: company
 * boilerplate, logo assets, canonical descriptions, founder facts,
 * usage rules.
 *
 * Keep this page short and factual. If it feels like a marketing
 * page, we've written it wrong.
 */

export const metadata: Metadata = {
  title: "Press & media kit — logos, boilerplate, and facts",
  description: `Media kit for ${site.company}. Company boilerplate, downloadable logos, canonical descriptions, and everything a journalist or partner needs to reference us without asking first.`,
  alternates: { canonical: `https://${site.domain}/press/` },
  openGraph: {
    title: `Press & media kit — ${site.company}`,
    description: `Media kit for ${site.company}. Logos, boilerplate, facts.`,
    url: `https://${site.domain}/press/`,
    type: "website",
  },
};

/** Canonical company descriptions of three lengths. Copy the exact
 * text — do not paraphrase. If you need a different length, pick the
 * next closest one; do not mix. */
const BOILERPLATE = {
  oneLine:
    "Doyel Labs LLC is a custom software studio in Casper, Wyoming that builds websites, payroll workspaces, internal tools, and bespoke programs for any business — AI-native, human-reviewed, priced per project.",
  oneParagraph:
    "Doyel Labs LLC is a custom software studio in Casper, Wyoming, formed September 2026. We build custom software for any business — mom-and-pop operators through enterprises. Every engagement starts with a one-hour orientation call with a real human being; if the client decides to move forward, a written scope and fixed price land within one business day. We use AI to draft code, tests, and copy; every diff is reviewed by a person before it ships. Current live client work includes SteadFast Transportation Inc. (a USPS route contractor in Plentywood, MT), for whom we built both a marketing site and an SCA-first payroll workspace.",
  short:
    "Doyel Labs LLC builds custom software for any business. Casper, Wyoming.",
};

/** Downloadable asset descriptors. Each entry maps to a real file in
 * `public/` — never claim an asset that doesn't exist. */
const ASSETS = [
  {
    label: "Doyel Labs logo — SVG",
    href: "/logo.svg",
    format: "SVG",
    size: "vector",
    note: "Full-color four-square icon + wordmark. Preferred format.",
  },
  {
    label: "Doyel Labs icon — SVG",
    href: "/favicon.svg",
    format: "SVG",
    size: "vector",
    note: "Just the four-square icon, no wordmark. Use for square avatars.",
  },
  {
    label: "Doyel Labs icon — PNG 180×180",
    href: "/apple-touch-icon.png",
    format: "PNG",
    size: "180×180",
    note: "Sharp on Retina at typical avatar sizes. Rounded corners baked in.",
  },
  {
    label: "Doyel Labs icon — PNG 32×32",
    href: "/favicon-32.png",
    format: "PNG",
    size: "32×32",
    note: "Small size for favicons and inline references.",
  },
  {
    label: "OpenGraph card — PNG 1200×630",
    href: "/opengraph-image",
    format: "PNG",
    size: "1200×630",
    note: "Default social preview card. Black canvas, cyan accent.",
  },
];

/** Canonical facts. Journalists and analysts often need these ready
 * to lift — dates, jurisdictions, contact routes. */
const FACTS = [
  { label: "Legal name", value: "Doyel Labs LLC" },
  { label: "Short name", value: "Doyel Labs" },
  { label: "Entity type", value: "Limited Liability Company" },
  { label: "Jurisdiction", value: "State of Wyoming, USA" },
  { label: "Formed", value: "September 2026" },
  { label: "Headquarters", value: "Casper, Wyoming, USA" },
  { label: "Primary domain", value: "doyel-labs.com" },
  { label: "Support email", value: "support@doyel-labs.com" },
  { label: "Security disclosure", value: "security@doyel-labs.com" },
  { label: "Phone (US business hours, MT)", value: "(307) 429-0389" },
  {
    label: "Current live clients",
    value: "SteadFast Transportation Inc. (steadfasttransportationinc.com)",
  },
  {
    label: "Public products",
    value: "None yet. Internal programs: BAI (2027), ConnectionLoop (2026).",
  },
];

export default function Press() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Anything on this page can be reproduced without prior permission
          for editorial, analyst, or partnership use, provided the wording
          is not altered and links back to doyel-labs.com are preserved.
        </MetaRow>
      }
    >
      <Breadcrumbs items={[{ name: "Press", href: "/press/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:items-center md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Press &amp; media kit</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                Everything you need to write about{" "}
                <span className="text-accent">Doyel Labs</span>.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                Boilerplate copy in three lengths, downloadable logo
                assets, and canonical facts about the company. Copy
                verbatim; ask first if you want to paraphrase. For
                interviews or additional materials, email{" "}
                <a
                  href={`mailto:${site.supportEmail}?subject=Press%20inquiry`}
                  className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                >
                  {site.supportEmail}
                </a>
                .
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap gap-2">
              <AccentChip>Free to reproduce</AccentChip>
              <AccentChip>Verbatim only</AccentChip>
              <AccentChip>Link back preserved</AccentChip>
            </div>
          </div>
          <div className="hero-in hero-in--5 flex items-center justify-center">
            <LogoMark size={200} />
          </div>
        </div>
      </section>

      {/* BOILERPLATE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Boilerplate</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Three canonical descriptions.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Pick the length that fits. Copy the text exactly; do not
              paraphrase or reorder. Contact us if the closest length is
              still wrong for the surface — we&apos;ll write you a fresh
              one under embargo.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            <BoilerplateBlock
              label="Short (1 sentence, ~14 words)"
              copy={BOILERPLATE.short}
            />
            <BoilerplateBlock
              label="One-liner (~50 words)"
              copy={BOILERPLATE.oneLine}
            />
            <BoilerplateBlock
              label="One paragraph (~140 words)"
              copy={BOILERPLATE.oneParagraph}
            />
          </div>
        </section>
      </Reveal>

      {/* LOGO ASSETS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Logo assets</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Downloadable, no login required.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              The four-square mark uses charcoal, mid-gray, light-gray,
              and cyan (<code className="font-mono text-ink">#10c7eb</code>)
              on a black background. Do not recolor the cyan square. Do
              not stretch or crop the mark. Place on a dark background
              wherever possible.
            </p>
          </div>

          <div className="mt-10">
            <Grid3>
              {ASSETS.map((asset) => (
                <a
                  key={asset.href}
                  href={asset.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group surface-card flex flex-col rounded-[3px] border border-line p-5 shadow-card transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:border-accentDim hover:shadow-cardHover"
                >
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                    {asset.format} · {asset.size}
                  </p>
                  <p className="mt-3 text-[15px] font-semibold text-ink group-hover:text-accentHi">
                    {asset.label}
                  </p>
                  <p className="mt-3 text-[13px] leading-[1.55] text-mute">
                    {asset.note}
                  </p>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-accent">
                    Download →
                  </p>
                </a>
              ))}
            </Grid3>
          </div>
        </section>
      </Reveal>

      {/* FACTS TABLE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Facts</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Canonical, verifiable.
              </span>
            </H2>
          </div>
          <div className="mt-10 border border-line bg-surface/30">
            <dl className="divide-y divide-line">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="grid gap-2 px-5 py-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:items-baseline"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
                    {fact.label}
                  </dt>
                  <dd className="text-[14px] text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </Reveal>

      {/* USAGE RULES */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Usage rules</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Small list of please-and-do-nots.
              </span>
            </H2>
          </div>
          <div className="mt-10">
            <Grid2>
              <Card title="Please do">
                <ul className="list-disc space-y-1 pl-4">
                  <li>Copy the boilerplate verbatim.</li>
                  <li>
                    Preserve links to{" "}
                    <a
                      href={`https://${site.domain}`}
                      className="text-accent underline decoration-accentDim underline-offset-2"
                    >
                      doyel-labs.com
                    </a>
                    .
                  </li>
                  <li>
                    Use the four-square mark on a dark background where
                    possible.
                  </li>
                  <li>
                    Email us for interviews, quotes, embargoes, or
                    additional materials.
                  </li>
                </ul>
              </Card>
              <Card title="Please do not">
                <ul className="list-disc space-y-1 pl-4">
                  <li>Recolor, stretch, or crop the mark.</li>
                  <li>Add taglines that we didn&apos;t write.</li>
                  <li>
                    Reference programs (BAI, ConnectionLoop) as though
                    they were the company. Doyel Labs is the company;
                    they are programs.
                  </li>
                  <li>
                    Claim we ship regulated financial products, tax
                    filing, or money transmission — we don&apos;t.
                  </li>
                </ul>
              </Card>
            </Grid2>
          </div>
        </section>
      </Reveal>

      {/* CLOSE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Interview or partnership</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  Real people answer real email.
                </span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                For interviews, on-record comments, embargoed news, or
                partnership discussions, email{" "}
                <a
                  href={`mailto:${site.supportEmail}?subject=Press%20inquiry`}
                  className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                >
                  {site.supportEmail}
                </a>{" "}
                or call{" "}
                <a
                  href={site.phoneHref}
                  className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                >
                  {site.phone}
                </a>{" "}
                during US business hours (MT). One business day, always
                with a real person on the other end.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactWidget label="Send a press inquiry" />
                <GhostLink href="/company/" small>
                  Company page
                </GhostLink>
                <GhostLink href="/work/" small>
                  Reviews
                </GhostLink>
              </div>
            </div>
            <div>
              <Notice>
                <p>
                  For security-related disclosures rather than press
                  inquiries, use{" "}
                  <a
                    href={`mailto:${site.securityEmail}?subject=Security%20disclosure`}
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    {site.securityEmail}
                  </a>
                  . Two-business-day response.
                </p>
              </Notice>
            </div>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}

/** Copy-friendly boilerplate block. Renders the label + the exact
 * copy in a monospace-family paragraph so it's easy to select and
 * clone into a document. */
function BoilerplateBlock({ label, copy }: { label: string; copy: string }) {
  return (
    <div className="border border-line bg-surface/30 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
          {label}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
          Copy verbatim
        </p>
      </div>
      <p className="mt-4 text-[15px] leading-[1.75] text-ink">{copy}</p>
    </div>
  );
}
