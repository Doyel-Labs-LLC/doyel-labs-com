import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  Eyebrow,
  GhostLink,
  H1,
  Lead,
  Notice,
  Page,
} from "@/components/chrome";
import { site } from "@/lib/site";
import type { LegalDoc } from "@/lib/legal";

const NAV = [
  { slug: "terms", label: "Terms" },
  { slug: "privacy", label: "Privacy" },
  { slug: "payroll-data", label: "Payroll data" },
  { slug: "risk", label: "BAI risk" },
];

/**
 * Shared shell for `/legal/*` pages. Reads a parsed MDX doc,
 * renders it inside the standard site chrome, and shows a
 * measured "under counsel review" notice when the doc's
 * frontmatter carries `under_review: true`.
 *
 * The notice below is deliberately less alarming than earlier
 * versions — real prospects and clients read these pages, and
 * a "DRAFT / DO NOT RELY" banner scares them without giving
 * useful information. This copy names the review status
 * clearly and points at a route (email us) for concrete legal
 * questions.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <Page narrow>
      <Breadcrumbs
        items={[
          { name: "Legal", href: "/legal/terms/" },
          { name: doc.title, href: `/legal/${doc.slug}/` },
        ]}
      />

      <section className="hero-glow pt-4">
        <Eyebrow>Legal</Eyebrow>
        <H1>{doc.title}</H1>
        <Lead>
          {doc.slug === "terms" &&
            "The terms under which Doyel Labs LLC provides its software and services. Read together with the privacy policy and any project-specific rider."}
          {doc.slug === "privacy" &&
            "What Doyel Labs LLC collects, why, how long we keep it, who else touches it, and how to make us delete it."}
          {doc.slug === "payroll-data" &&
            "The specific data map for payroll workspaces we build and operate — what the operator holds, what Doyel Labs holds, and what nobody holds."}
          {doc.slug === "risk" &&
            "Trading risk disclosure for the BAI program. Read before you arm the desk; read again whenever it changes."}
        </Lead>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          Version {doc.version}
          {doc.underReview ? " · under counsel review" : ""}
        </p>
      </section>

      <nav
        aria-label="Legal documents"
        className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-wide"
      >
        {NAV.map((n) => (
          <Link
            key={n.slug}
            href={`/legal/${n.slug}/`}
            className={
              n.slug === doc.slug
                ? "text-accent underline decoration-accentDim underline-offset-2"
                : "text-mute underline decoration-line2 underline-offset-2 hover:text-accentHi"
            }
          >
            {n.label}
          </Link>
        ))}
      </nav>

      {doc.underReview ? (
        <div className="mt-10">
          <Notice>
            <p>
              <strong className="text-ink">
                Under counsel review — effective as drafted.
              </strong>{" "}
              This document reflects how Doyel Labs actually operates
              today. It is being finalized with counsel; if the
              wording changes as part of that review, we&apos;ll
              publish the new version and note the change on{" "}
              <Link
                href="/changelog/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                the changelog
              </Link>
              . For a specific legal question, email{" "}
              <a
                href={`mailto:${site.supportEmail}?subject=Legal%20question`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.supportEmail}
              </a>{" "}
              and we&apos;ll route it.
            </p>
          </Notice>
        </div>
      ) : null}

      <article
        className="prose-legal mt-10"
        dangerouslySetInnerHTML={{ __html: doc.html }}
      />

      <section className="mt-16 border-t border-line pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-y-2">
          <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
            Version {doc.version}
            {doc.underReview ? " · under counsel review" : ""}
          </p>
          <div className="flex flex-wrap gap-3">
            <GhostLink
              href={`mailto:${site.supportEmail}?subject=Legal%20question`}
              small
              external
            >
              Ask a legal question
            </GhostLink>
            <GhostLink href="/security/" small>
              Security posture
            </GhostLink>
          </div>
        </div>
      </section>
    </Page>
  );
}
