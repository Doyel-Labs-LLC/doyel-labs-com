import type { Metadata } from "next";
import { Card, Eyebrow, H1, H2, Lead, Page } from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.company}: work with us, support, security disclosure.`,
};

/**
 * Three inboxes, one page. Every action is a `mailto:` link so the
 * static export needs no forms runtime and no third-party form vendor
 * for the company site itself.
 */
export default function Contact() {
  return (
    <Page narrow>
      <section className="pt-24">
        <Eyebrow>Contact</Eyebrow>
        <H1>Three inboxes.</H1>
        <Lead>
          There is no contact form on this page. Mail arrives faster and gets
          a real person. We answer support within one business day and
          security disclosure within two.
        </Lead>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-3">
        <Card title="Work with us">
          <p>
            Payroll, a website, or both. Tell us what the operation is,
            what has to be provable on paper, and which domain you want the
            work to live on.
          </p>
          <p className="mt-4">
            <a
              href={`mailto:${site.supportEmail}?subject=Work%20with%20us`}
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              {site.supportEmail}
            </a>
          </p>
        </Card>
        <Card title="Support">
          <p>
            Existing product issues — payroll workspace, website copy edit,
            BAI or ConnectionLoop access.
          </p>
          <p className="mt-4">
            <a
              href={`mailto:${site.supportEmail}?subject=Support`}
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              {site.supportEmail}
            </a>
          </p>
        </Card>
        <Card title="Security disclosure">
          <p>
            Report a vulnerability. Please do not test against other people's
            accounts or data. The machine-readable policy is at{" "}
            <a
              href="/.well-known/security.txt"
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              /.well-known/security.txt
            </a>
            .
          </p>
          <p className="mt-4">
            <a
              href={`mailto:${site.securityEmail}?subject=Security%20disclosure`}
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              {site.securityEmail}
            </a>
          </p>
        </Card>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <H2>
          <span className="mt-2 block">Registered office.</span>
        </H2>
        <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
          {site.company} is a Wyoming limited liability company. Registered in{" "}
          {site.city}. Written correspondence for legal service can be sent to{" "}
          <a
            href={`mailto:${site.supportEmail}?subject=Legal%20correspondence`}
            className="underline decoration-line2 underline-offset-2 hover:text-ink"
          >
            {site.supportEmail}
          </a>{" "}
          and we will provide the current registered-agent address.
        </p>
      </section>
    </Page>
  );
}
