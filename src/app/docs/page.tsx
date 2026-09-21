import type { Metadata } from "next";
import Link from "next/link";
import {
  Eyebrow,
  GhostLink,
  Grid2,
  H1,
  Lead,
  Page,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description: `Documentation index for ${site.company} products.`,
};

/**
 * Docs are now scoped to *services* Doyel Labs delivers to clients.
 * Product docs (BAI Desk, ConnectionLoop) live inline on the unified
 * /products/ page — those products are in private beta and don't
 * warrant a separate docs surface yet.
 */
const DOC_SECTIONS = [
  {
    href: "/docs/payroll/",
    title: "Payroll workspace",
    body: "Set up an operator workspace: contractor register, wage-determination lookup (where applicable), batch pay run, stub email, audit log.",
    tag: "Service",
  },
  {
    href: "/docs/websites/",
    title: "Websites",
    body: "Edit a Doyel Labs–built marketing site: file layout, copy edits, form providers, deploy pipeline.",
    tag: "Service",
  },
];

export default function DocsIndex() {
  return (
    <Page narrow>
      <section className="hero-glow pt-24 md:pt-32">
        <Eyebrow>Docs</Eyebrow>
        <H1>
          Per-product <span className="text-accent">documentation</span>.
        </H1>
        <Lead>
          Short guides for the services Doyel Labs delivers. Every
          claim maps to a real file in the code. If a doc looks out of
          date, tell us — we fix docs the same business day.
        </Lead>
        <p className="mt-6 text-[14px] leading-[1.7] text-mute">
          Looking for product docs? BAI Desk and ConnectionLoop
          documentation lives inline on the{" "}
          <Link
            href="/products/"
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            /products/
          </Link>{" "}
          page while both are in private beta.
        </p>
      </section>

      <section className="mt-16">
        <Grid2>
          {DOC_SECTIONS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group border border-line p-6 transition-colors hover:border-accentDim"
            >
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                {d.tag}
              </p>
              <h3 className="mt-3 text-[18px] font-semibold uppercase tracking-display text-ink group-hover:text-accentHi">
                {d.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.65] text-mute">
                {d.body}
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-accent">
                Read →
              </p>
            </Link>
          ))}
        </Grid2>
      </section>

      <section className="mt-24 border-t border-line pt-12">
        <p className="max-w-prose text-[14px] text-mute">
          Something missing?{" "}
          <a
            href={`mailto:${site.supportEmail}?subject=Docs%20missing`}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            Email support
          </a>
          {" "}or open the contact form.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ContactWidget label="Ask a question" size="small" />
          <GhostLink href="/support/" small>
            Support FAQs
          </GhostLink>
          <GhostLink href="/changelog/" small>
            Changelog
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
