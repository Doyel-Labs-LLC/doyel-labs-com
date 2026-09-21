import Link from "next/link";
import { Card, Eyebrow, GhostLink, Grid3, H1, Lead, Page } from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";

export default function NotFound() {
  return (
    <Page>
      <section className="hero-glow pt-24 md:pt-32">
        <Eyebrow>404 · Not found</Eyebrow>
        <H1>
          That page isn't <span className="text-accent">here</span>.
        </H1>
        <Lead>
          Some pages moved when the site was rebuilt from the old BAI-branded
          layout to a Doyel Labs company page. Here's where things live now.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <ContactWidget label="Tell us what you were looking for" />
          <GhostLink href="/" small>
            Company home
          </GhostLink>
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>You might have been looking for</Eyebrow>
        <div className="mt-10">
          <Grid3>
            <Card title="BAI Desk (the trading desk)">
              Formerly the homepage of doyel-labs.com. Now at{" "}
              <Link
                href="/products/#bai"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /products/#bai
              </Link>
              . Old <code className="font-mono text-ink">/download</code>{" "}
              and <code className="font-mono text-ink">/pricing</code> URLs
              redirect there.
            </Card>
            <Card title="ConnectionLoop">
              The invite-only shared calendar. Now at{" "}
              <Link
                href="/products/#connectionloop"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /products/#connectionloop
              </Link>
              .
            </Card>
            <Card title="Payroll product page">
              <Link
                href="/services/payroll/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /services/payroll
              </Link>{" "}
              — SCA-first pay-run workspace for federal service contractors.
            </Card>
            <Card title="Websites service">
              <Link
                href="/services/websites/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /services/websites
              </Link>{" "}
              — small-operator marketing sites we build.
            </Card>
            <Card title="Case study (SteadFast)">
              <Link
                href="/work/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /work/
              </Link>{" "}
              — how we built the SteadFast Transportation site + payroll
              workspace.
            </Card>
            <Card title="Security posture">
              <Link
                href="/security/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /security
              </Link>{" "}
              — data maps for each product, controls table, disclosure email.
            </Card>
            <Card title="Support">
              <Link
                href="/support/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /support
              </Link>{" "}
              — product-scoped FAQs and how to reach a person.
            </Card>
            <Card title="Docs">
              <Link
                href="/docs/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /docs
              </Link>{" "}
              — per-product setup guides.
            </Card>
            <Card title="Status">
              <Link
                href="/status/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                /status
              </Link>{" "}
              — live checks of the website, contact form, and BAI control plane.
            </Card>
          </Grid3>
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <p className="max-w-prose text-[14px] text-mute">
          If a link brought you here that shouldn't have, tell us what you
          clicked and we'll fix the source. It's the fastest way to keep the
          site honest.
        </p>
      </section>
    </Page>
  );
}
