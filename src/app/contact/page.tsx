import type { Metadata } from "next";
import {
  Card,
  Eyebrow,
  GhostLink,
  H1,
  Lead,
  Page,
} from "@/components/chrome";
import { ContactPageForm } from "@/components/contact-page-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.company}: work with us, support, security disclosure.`,
};

export default function Contact() {
  return (
    <Page>
      <section className="pt-24 md:pt-32">
        <Eyebrow>Contact</Eyebrow>
        <H1>
          Let's <span className="text-accent">talk</span>.
        </H1>
        <Lead>
          Tell us about the operation. One paragraph is enough. We reply
          within one business day.
        </Lead>
      </section>

      <section className="mt-16 grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <ContactPageForm />

        <div className="grid gap-4">
          <Card title="Direct" accent>
            <p>
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.supportEmail}
              </a>
            </p>
            <p className="mt-2">
              <a
                href={site.phoneHref}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.phone}
              </a>
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-muted">
              One-business-day SLA
            </p>
          </Card>
          <Card title="Security disclosure">
            <a
              href={`mailto:${site.securityEmail}?subject=Security%20disclosure`}
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              {site.securityEmail}
            </a>
            <br />
            Two-business-day response.
          </Card>
          <Card title="Registered office">
            {site.company}
            <br />
            {site.city}, United States
            <br />
            Written notice via{" "}
            <a
              href={`mailto:${site.supportEmail}`}
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              {site.supportEmail}
            </a>
            .
          </Card>
        </div>
      </section>

      <section className="mt-24">
        <div className="flex flex-wrap gap-3">
          <GhostLink href="/services/" small>
            Services
          </GhostLink>
          <GhostLink href="/work/" small>
            Recent work
          </GhostLink>
          <GhostLink href="/company/" small>
            About the company
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
