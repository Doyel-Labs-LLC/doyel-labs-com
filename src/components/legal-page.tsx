import Link from "next/link";
import { Eyebrow, H1, Notice, Page } from "@/components/chrome";
import type { LegalDoc } from "@/lib/legal";

const NAV = [
  { slug: "terms", label: "Terms" },
  { slug: "privacy", label: "Privacy" },
  { slug: "payroll-data", label: "Payroll data" },
  { slug: "risk", label: "BAI risk" },
];

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <Page narrow>
      <section className="pt-24">
        <Eyebrow>Legal</Eyebrow>
        <H1>{doc.title}</H1>
        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wide">
          {NAV.map((n) => (
            <Link
              key={n.slug}
              href={`/legal/${n.slug}/`}
              className={
                n.slug === doc.slug
                  ? "text-ink underline decoration-line2 underline-offset-2"
                  : "text-mute underline decoration-line2 underline-offset-2 hover:text-ink"
              }
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {doc.underReview ? (
          <div className="mt-10">
            <Notice>
              This document is a working draft. It has not been reviewed by a
              lawyer and it is not yet binding on any customer. Please do not
              rely on it for a legal question. Version: {doc.version}.
            </Notice>
          </div>
        ) : null}

        <article
          className="prose-legal mt-10"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />

        <p className="mt-16 font-mono text-[10px] uppercase tracking-wide text-muted">
          Version {doc.version} · under review
        </p>
      </section>
    </Page>
  );
}
