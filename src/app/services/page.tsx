import type { Metadata } from "next";
import { Card, Eyebrow, GhostLink, H1, Lead, Page } from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `${site.company} commercial services — payroll software for small operators, and websites built for federal service contractors and small businesses.`,
};

export default function Services() {
  return (
    <Page>
      <section className="pt-24">
        <Eyebrow>Services</Eyebrow>
        <H1>Two things we sell.</H1>
        <Lead>
          Payroll software for small operators — particularly federal service
          contractors who have to prove wage compliance every pay period. And
          websites, for the same audience, hosted on their own domain and
          hooked up to their own inbox.
        </Lead>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <Card title="Payroll — SCA-first">
            <p>
              A pay-run workspace for day-rate independent contractors under
              the Service Contract Act. SAM.gov wage-determination lookups,
              day-rate floor checks on every draft, per-contractor audit rows,
              batch pay runs, PDF paystubs, and stubs delivered by email from
              the operator's own domain.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-muted">
              Not a payroll processor · Not a money transmitter
            </p>
            <div className="mt-6">
              <GhostLink href="/services/payroll/" small>
                Payroll
              </GhostLink>
            </div>
          </Card>

          <Card title="Websites — small operators">
            <p>
              Fast, accessible marketing sites for small operators. Custom
              domain, mobile-first navigation, schema.org markup, sitemaps,
              per-page metadata, forms wired to a real inbox. Analytics that
              respect your visitors.
            </p>
            <p className="mt-4">
              Live example:{" "}
              <a
                href="https://www.steadfasttransportationinc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line2 underline-offset-2 hover:text-ink"
              >
                steadfasttransportationinc.com
              </a>
              .
            </p>
            <div className="mt-6">
              <GhostLink href="/services/websites/" small>
                Websites
              </GhostLink>
            </div>
          </Card>
        </div>

        <p className="mt-16 max-w-prose text-[14px] text-mute">
          We do not sell CRMs, applicant-tracking, booking systems, or any
          product that has to live inside an enterprise directory. If the
          software has to move money or make a compliance claim, we build it
          local-first and we say what it does not do.
        </p>
      </section>
    </Page>
  );
}
