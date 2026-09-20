import type { Metadata } from "next";
import { Eyebrow, GhostLink, H1, H2, Lead, Page, StatusChip } from "@/components/chrome";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { BaiArmFrame } from "@/components/frames/bai-arm";
import { WebsiteSteadfastFrame } from "@/components/frames/websites-preview";
import { site, programStatus } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.company} — operational software`,
  description:
    "Doyel Labs LLC builds operational software for people who cannot afford a wrong payment or a silent order — payroll and websites for small operators, plus internal programs.",
};

export default function Home() {
  return (
    <Page>
      {/* HERO */}
      <section className="pt-24 md:pt-32">
        <Eyebrow>
          {site.company} · {site.city}
        </Eyebrow>
        <H1>Software that moves money under your rules.</H1>
        <Lead>
          Doyel Labs builds operational software for people who cannot afford a
          wrong payment or a silent order. We ship payroll and websites for
          small operators, and run internal programs — a trading desk and a
          shared calendar — that stay on your machine when they can spend.
        </Lead>
        <div className="mt-10 flex flex-wrap gap-3">
          <GhostLink href="/services/">See what we build</GhostLink>
          <GhostLink href="/engineering/" small>
            How we build it
          </GhostLink>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          Not a broker-dealer · Not a bank · Not a payroll processor
        </p>
      </section>

      {/* BAND 1 · PAYROLL */}
      <section className="mt-24 md:mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Services · payroll</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Pay day-rate contractors the SCA way.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              For federal service contractors and small operators. A clean pay
              run, wage-determination lookups from SAM.gov, an explicit
              day-rate floor line on every stub, and an audit log a Department
              of Labor inspector can read.
            </p>
            <div className="mt-6">
              <GhostLink href="/services/payroll/" small>
                Payroll
              </GhostLink>
            </div>
          </div>
          <PayrollScaFrame />
        </div>
      </section>

      {/* BAND 2 · WEBSITES */}
      <section className="mt-24 md:mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Services · websites</Eyebrow>
            <H2>
              <span className="mt-2 block">
                We can build your website too.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Fast, accessible, structured for search, and connected to the
              same operator workspace when you also run payroll. The
              SteadFast Transportation site is a live example — schema.org
              markup, mobile-first navigation, forms that reach a real inbox.
            </p>
            <div className="mt-6">
              <GhostLink href="/services/websites/" small>
                Websites
              </GhostLink>
            </div>
          </div>
          <WebsiteSteadfastFrame />
        </div>
      </section>

      {/* BAND 3 · PROGRAMS */}
      <section className="mt-24 md:mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Programs</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Internal products, held to the same rule.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              BAI is a trading desk that runs on your own computer, at your
              own broker, under your own rules. ConnectionLoop is an
              invite-only shared calendar for families and small groups. Both
              start closed. Neither replaces a professional.
            </p>
            <ul className="mt-6 space-y-3 text-[13px] text-mute">
              <li>
                <StatusChip>{programStatus.bai.label}</StatusChip>
                <span className="ml-2">BAI — trading desk</span>
              </li>
              <li>
                <StatusChip>
                  {programStatus.connectionloop.label}
                </StatusChip>
                <span className="ml-2">ConnectionLoop — shared calendar</span>
              </li>
            </ul>
            <div className="mt-6">
              <GhostLink href="/programs/" small>
                Programs
              </GhostLink>
            </div>
          </div>
          <BaiArmFrame />
        </div>
      </section>

      {/* BAND 4 · ENGINEERING */}
      <section className="mt-24 md:mt-32 border-t border-line pt-16 md:pt-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Engineering</Eyebrow>
            <H2>
              <span className="mt-2 block">
                When the software does not know, it does nothing.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Fail-closed by default. Anything that can spend money runs
              locally where possible. Updates are signed. Logs are structured
              and redacted. Every rate change, every draft, every armed session
              leaves an audit row.
            </p>
            <div className="mt-6">
              <GhostLink href="/engineering/" small>
                Engineering
              </GhostLink>
            </div>
          </div>
          <div className="grid gap-4">
            <Rule
              label="Fail closed"
              body="Stale quote, missing snapshot, unknown earnings date — each blocks an action instead of guessing."
            />
            <Rule
              label="Local-first for money"
              body="Broker credentials stay on the operator's machine. Payroll data lives inside the operator's own bucket."
            />
            <Rule
              label="Signed updates"
              body="Refused while a program is armed or holding a position."
            />
            <Rule
              label="Audit rows"
              body="Every sign-in, rate change, armed session, and stub delivery is recorded and exportable."
            />
          </div>
        </div>
      </section>
    </Page>
  );
}

function Rule({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-t border-line pt-4">
      <p className="font-mono text-[11px] uppercase tracking-wide text-ink">
        {label}
      </p>
      <p className="mt-2 text-[14px] leading-[1.65] text-mute">{body}</p>
    </div>
  );
}
