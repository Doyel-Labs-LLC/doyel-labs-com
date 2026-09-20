import type { Metadata } from "next";
import {
  Card,
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  Page,
} from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company",
  description: `${site.company}, a Wyoming limited liability company (${site.city}). What we build, and what we are not.`,
};

export default function Company() {
  return (
    <Page>
      <section className="pt-24">
        <Eyebrow>Company</Eyebrow>
        <H1>{site.company} · {site.city}.</H1>
        <Lead>
          A Wyoming limited liability company that ships operational software
          for people who cannot afford a wrong payment or a silent order.
          Payroll and websites for small operators. Two internal programs —
          a trading desk and a shared calendar — that stay on your machine
          when they can spend.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostLink href="/services/">Services</GhostLink>
          <GhostLink href="/programs/" small>
            Programs
          </GhostLink>
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What we are</Eyebrow>
        <H2>
          <span className="mt-2 block">The narrow facts.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Entity">
            {site.company}, formed and registered in the State of Wyoming.
          </Card>
          <Card title="Headquarters">{site.city}, United States.</Card>
          <Card title="Support">
            <a
              href={`mailto:${site.supportEmail}`}
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              {site.supportEmail}
            </a>{" "}
            · one-business-day SLA.
          </Card>
          <Card title="Security disclosure">
            <a
              href={`mailto:${site.securityEmail}`}
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              {site.securityEmail}
            </a>{" "}
            · two-business-day response.
          </Card>
          <Card title="Governing law">
            Wyoming for terms of service. Payroll and websites are US-only at
            launch. BAI is US-only at launch.
          </Card>
          <Card title="Public domains">
            <code className="font-mono text-ink">doyel-labs.com</code> ·{" "}
            <code className="font-mono text-ink">connectionloop.app</code>
          </Card>
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What we are not</Eyebrow>
        <H2>
          <span className="mt-2 block">
            The list matters more than the resume.
          </span>
        </H2>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {[
            "Not a broker-dealer or an investment adviser",
            "Not a bank or a money transmitter",
            "Not a payroll processor or a professional employer organization",
            "Not a reporting agent for any tax authority",
            "Not a fiduciary",
            "Not a public social network",
          ].map((s) => (
            <li
              key={s}
              className="flex gap-3 border-t border-line pt-3 text-[14px] text-mute"
            >
              <span className="mt-2 inline-block h-1 w-4 shrink-0 bg-ink" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>Contact</Eyebrow>
        <H2>
          <span className="mt-2 block">Three inboxes, in plain sight.</span>
        </H2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="Support">
            <a
              href={`mailto:${site.supportEmail}`}
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              {site.supportEmail}
            </a>
          </Card>
          <Card title="Security">
            <a
              href={`mailto:${site.securityEmail}`}
              className="underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              {site.securityEmail}
            </a>
          </Card>
          <Card title="Work with us">
            Send a description of the operation and what would make it more
            defensible on paper — email support and we will route it.
          </Card>
        </div>
      </section>
    </Page>
  );
}
