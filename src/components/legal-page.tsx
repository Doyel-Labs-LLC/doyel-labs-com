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

/** Default side-nav shown across the company-wide legal docs. */
const COMPANY_NAV: LegalNavItem[] = [
  { slug: "terms", label: "Terms", href: "/legal/terms/" },
  { slug: "privacy", label: "Privacy", href: "/legal/privacy/" },
  { slug: "payroll-data", label: "Payroll data", href: "/legal/payroll-data/" },
  { slug: "risk", label: "BAI risk", href: "/legal/risk/" },
];

/** Default lead text keyed by the company-wide legal slugs. */
const COMPANY_LEADS: Record<string, string> = {
  terms:
    "The terms under which Doyel Labs LLC provides its software and services. Read together with the privacy policy and any project-specific rider.",
  privacy:
    "What Doyel Labs LLC collects, why, how long we keep it, who else touches it, and how to make us delete it.",
  "payroll-data":
    "The specific data map for payroll workspaces we build and operate — what the operator holds, what Doyel Labs holds, and what nobody holds.",
  risk:
    "Trading risk disclosure for the BAI program. Read before you arm the desk; read again whenever it changes.",
};

/** One item in the side-nav rail. */
export type LegalNavItem = { slug: string; label: string; href: string };

/**
 * A single crumb in the top breadcrumb trail.
 * Duplicated here (not imported from `Breadcrumbs`) so callers can
 * construct the crumbs without pulling in the crumb type.
 */
export type LegalCrumb = { name: string; href: string };

export type LegalPageProps = {
  doc: LegalDoc;
  /**
   * Optional overrides. If a caller doesn't pass them, we fall back
   * to the company-wide legal chrome (Terms / Privacy / Payroll data
   * / BAI risk). Product-specific legal pages (e.g. BAI Desk terms)
   * pass their own set to keep the rail scoped and the breadcrumb
   * accurate.
   */
  nav?: LegalNavItem[];
  breadcrumbs?: LegalCrumb[];
  lead?: string;
};

/**
 * Shared shell for `/legal/**` pages. Reads a parsed MDX doc,
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
 *
 * Callers can override the side-nav, the breadcrumb trail, and
 * the intro `<Lead>` — used by product-scoped legal (e.g. the
 * BAI Desk Terms of Use published for Alpaca's compliance
 * review) so those pages don't drag the company-wide nav rail
 * with them.
 */
export function LegalPage({ doc, nav, breadcrumbs, lead }: LegalPageProps) {
  const navItems = nav ?? COMPANY_NAV;
  const crumbs =
    breadcrumbs ??
    ([
      { name: "Legal", href: "/legal/terms/" },
      { name: doc.title, href: `/legal/${doc.slug}/` },
    ] as LegalCrumb[]);
  const leadText = lead ?? COMPANY_LEADS[doc.slug] ?? "";

  return (
    <Page narrow>
      <Breadcrumbs items={crumbs} />

      <section className="hero-glow pt-4">
        <Eyebrow>Legal</Eyebrow>
        <H1>{doc.title}</H1>
        {leadText ? <Lead>{leadText}</Lead> : null}
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          Version {doc.version}
          {doc.underReview ? " · under counsel review" : ""}
        </p>
      </section>

      <nav
        aria-label="Legal documents"
        className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-wide"
      >
        {navItems.map((n) => (
          <Link
            key={n.href}
            href={n.href}
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
