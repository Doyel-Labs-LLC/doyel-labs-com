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
  MetaRow,
  Notice,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { Reveal } from "@/components/reveal";
import {
  entries,
  formatChangelogDate,
  SECTIONS,
  type ChangelogEntry,
  type ChangelogSection,
} from "@/lib/changelog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog — what shipped, when, and why",
  description: `Company and per-product changelog for ${site.company}. Every entry names a real change — nothing added for marketing, nothing rewritten after ship.`,
  alternates: {
    canonical: `https://${site.domain}/changelog/`,
    types: {
      "application/rss+xml": [
        {
          url: `https://${site.domain}/changelog/rss.xml`,
          title: `${site.company} — Changelog`,
        },
      ],
    },
  },
  openGraph: {
    title: `Changelog — ${site.company}`,
    description: `Every real change we've shipped, in reverse chronological order.`,
    url: `https://${site.domain}/changelog/`,
    type: "website",
  },
};

/**
 * Group entries by version (or by date for entries without a version).
 * Preserves the reverse-chronological order of `entries`.
 */
type Group = {
  key: string; // e.g. "v21" or "2026-09-19"
  label: string; // display label
  version?: string;
  date: string;
  entries: ChangelogEntry[];
};

function groupEntries(all: ChangelogEntry[]): Group[] {
  const groups: Group[] = [];
  for (const entry of all) {
    const key = entry.version ?? entry.date;
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = {
        key,
        label: entry.version ?? formatChangelogDate(entry.date),
        version: entry.version,
        date: entry.date,
        entries: [],
      };
      groups.push(group);
    }
    group.entries.push(entry);
  }
  return groups;
}

/**
 * Small color hint per section — used for the section chip on each
 * entry. All tokens exist in tailwind.config.ts.
 */
const SECTION_TONE: Record<ChangelogSection, string> = {
  Company: "border-accentDim text-accent",
  Design: "border-line2 text-ink",
  Performance: "border-rise/50 text-rise",
  Accessibility: "border-care/50 text-care",
  SEO: "border-accentDim text-accent",
  Writing: "border-line2 text-ink",
  Bugfix: "border-fall/50 text-fall",
  Payroll: "border-line2 text-mute",
  BAI: "border-line2 text-mute",
  ConnectionLoop: "border-line2 text-mute",
  Products: "border-accentDim text-accent",
  Legal: "border-care/50 text-care",
};

export default function Changelog() {
  const groups = groupEntries(entries);
  const totalEntries = entries.length;
  const totalVersions = new Set(
    entries.filter((e) => e.version).map((e) => e.version),
  ).size;

  return (
    <Page
      bandFooter={
        <MetaRow>
          Every entry above is a real, shipped change. No rewrites
          after the fact. If a claim is inaccurate,{" "}
          <a
            href={`mailto:${site.supportEmail}?subject=Changelog%20correction`}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            email us
          </a>{" "}
          and we&apos;ll add a correction entry.
        </MetaRow>
      }
    >
      <Breadcrumbs items={[{ name: "Changelog", href: "/changelog/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <Eyebrow>Changelog</Eyebrow>
          <H1>
            What we <span className="text-accent">shipped</span>. And
            when.
          </H1>
          <Lead>
            Every real change to Doyel Labs and its products, in
            reverse chronological order. Nothing added for marketing.
            Nothing rewritten after it ships. The git commit history
            is the audit trail behind every entry.
          </Lead>
          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-eyebrow text-muted">
            <span>
              <strong className="text-ink">{totalEntries}</strong> entries
            </span>
            <span>
              <strong className="text-ink">{totalVersions}</strong>{" "}
              company versions
            </span>
            <span>
              <a
                href="/changelog/rss.xml"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                Subscribe via RSS →
              </a>
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {SECTIONS.filter((s) =>
              entries.some((e) => e.section === s),
            ).map((section) => (
              <AccentChip key={section}>
                {section} ·{" "}
                {entries.filter((e) => e.section === section).length}
              </AccentChip>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mt-16">
        <ol className="relative border-l border-line pl-6 md:pl-10">
          {groups.map((group, groupIdx) => (
            <Reveal key={group.key}>
              <li
                className={`relative mb-14 ${
                  groupIdx === groups.length - 1 ? "mb-0" : ""
                }`}
              >
                {/* Timeline dot */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[9px] top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg md:-left-[13px]"
                />
                {/* Group header */}
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p
                    id={group.key}
                    className="font-mono text-[13px] font-semibold uppercase tracking-eyebrow text-accent"
                  >
                    {group.label}
                  </p>
                  <time
                    dateTime={group.date}
                    className="font-mono text-[10px] uppercase tracking-wide text-muted"
                  >
                    {formatChangelogDate(group.date)}
                  </time>
                </div>
                {/* Entries in this group */}
                <ul className="mt-4 space-y-6">
                  {group.entries.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} />
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* CLOSE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Want to hire us next?</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  Everything above is what one operator gets.
                </span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                Every entry above is a real ship on our own site,
                shipped by the person who&apos;d work on your build.
                If that&apos;s the cadence you want on your own
                project, book an orientation.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactLink />
                <GhostLink href="/services/#process" small>
                  How we work
                </GhostLink>
                <GhostLink href="/status/" small>
                  Status page
                </GhostLink>
              </div>
            </div>
            <div>
              <Card title="Machine-readable">
                <p className="mb-4">
                  RSS feed at{" "}
                  <Link
                    href="/changelog/rss.xml"
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    /changelog/rss.xml
                  </Link>
                  . Plug it into any reader; when we ship, your reader
                  picks up the entry.
                </p>
                <Notice>
                  <p>
                    Auto-discovery is set in the site&apos;s{" "}
                    <code className="font-mono text-ink">
                      &lt;link rel=&quot;alternate&quot;&gt;
                    </code>{" "}
                    tag, so most readers pick it up when you paste
                    the site URL.
                  </p>
                </Notice>
              </Card>
            </div>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}

/**
 * One entry card in the timeline. Includes the section chip, title,
 * body, and — where present — the version tag as a heading.
 */
function EntryCard({ entry }: { entry: ChangelogEntry }) {
  const tone = SECTION_TONE[entry.section];
  return (
    <li
      id={entry.id}
      className="border-l border-line pl-5 transition-colors hover:border-accentDim"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className={`inline-block border ${tone} px-2 py-0.5 font-mono text-[9px] uppercase tracking-eyebrow`}
        >
          {entry.section}
        </span>
        <a
          href={`#${entry.id}`}
          className="font-mono text-[10px] uppercase tracking-wide text-muted hover:text-accentHi"
          aria-label={`Permalink to ${entry.title}`}
        >
          #
        </a>
      </div>
      <h3 className="mt-3 text-[17px] font-semibold leading-tight text-ink md:text-[18px]">
        {entry.title}
      </h3>
      <p className="mt-2 max-w-prose text-[14px] leading-[1.7] text-mute">
        {entry.body}
      </p>
    </li>
  );
}
