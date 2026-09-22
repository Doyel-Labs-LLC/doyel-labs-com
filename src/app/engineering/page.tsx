import type { Metadata } from "next";
import {
  Card,
  Eyebrow,
  Feature,
  GhostLink,
  Grid3,
  H1,
  H2,
  Lead,
  MetaRow,
  Page,
} from "@/components/chrome";
import { ContactLink } from "@/components/contact-link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "How Doyel Labs builds. AI-assisted, human-reviewed. Fail-closed defaults when the software moves money. Structured logs, signed updates, audit rows.",
  alternates: { canonical: `https://${site.domain}/engineering/` },
};

export default function Engineering() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          These principles apply to every build. Program pages describe
          how a specific program implements them.
        </MetaRow>
      }
    >
      {/* HERO */}
      <section className="hero-glow pt-24 md:pt-32">
        <Eyebrow>Engineering</Eyebrow>
        <H1>
          How we <span className="text-accent">build</span>.
        </H1>
        <Lead>
          One rule holds together everything Doyel Labs ships. The thing
          that can spend money — cash, a wage, a share — lives on the
          operator's machine, and the thing we run in the cloud cannot
          spend it.
        </Lead>
      </section>

      {/* AI as tool */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>AI as tool</Eyebrow>
            <H2>
              <span className="mt-2 block">Draft with AI. Ship with humans.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              We use AI to draft code, migrations, tests, and copy. Every
              diff is reviewed by a person and every ship decision is a
              human call. That combination is why we can quote fixed
              prices and hit tight deadlines.
            </p>
          </div>
          <div className="grid gap-6">
            <Feature step="AI does" title="First drafts, every draft.">
              TypeScript, React, migration SQL, tests, docs, and
              marketing copy.
            </Feature>
            <Feature step="Humans do" title="Decisions, every decision.">
              Every commit is authored by a person. AI has no arm phrase,
              no production key, no path to spend money on our behalf.
            </Feature>
            <Feature step="AI is refused" title="Legal, security, financial claims.">
              Legal drafts go to counsel. Security posture is written
              from code, not from prompts.
            </Feature>
            <Feature step="AI is verified" title="Tests pin dangerous paths.">
              Payroll: does the SCA floor still block? BAI: can chat
              still not spend? ConnectionLoop: does default-deny hold?
            </Feature>
          </div>
        </div>
      </section>

      {/* Fail closed */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Rule 1</Eyebrow>
          <H2>
            <span className="mt-2 block">Fail closed.</span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            An unknown value blocks an action rather than filling it in.
            If a wage determination is not on SAM.gov, the draft is
            refused. If a broker quote is stale, the entry is not
            placed. If a Space code expired, the join call returns
            permission-denied. An outage should look like an outage.
          </p>
        </div>
      </section>

      {/* Local-first */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Rule 2</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Local-first for anything that spends money.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            A cloud breach cannot reach a broker account we cannot see.
            Broker credentials for BAI stay in Windows Credential
            Manager. On the payroll side, we store the operator's
            records but not their bank routing or account numbers, and
            we do not move their money.
          </p>
        </div>
      </section>

      {/* Signed updates */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Rule 3</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Signed updates. Refused mid-trade.
            </span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            BAI updates are signed with a key baked into the app and
            refused while the desk is armed or holding a position. The
            website ships as static assets on Cloudflare Pages; there is
            no runtime we can push mutations to.
          </p>
        </div>
      </section>

      {/* Audit */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Rule 4</Eyebrow>
          <H2>
            <span className="mt-2 block">Audit rows on every action.</span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            Every state change worth reading a year later becomes an
            audit row — a sign-in, a rate change, a passkey enrolment,
            an armed session, a blocked stub. Rows export to CSV.
          </p>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="Payroll">
              Paystub, WD lookup, SCA-block, rate change, email
              delivery, sign-in. 180-day server retention.
            </Card>
            <Card title="BAI">
              Sign-in, device change, billing event, staff action.
              Structured logs with a redaction pass tested in CI.
            </Card>
            <Card title="ConnectionLoop">
              Callables log ids, counts, codes, and durations — never
              content. Crash notes scrubbed twice.
            </Card>
          </Grid3>
        </div>
      </section>

      {/* CLOSE */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>What this means for you</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Software you can hand off cleanly.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              These principles are the reason a Doyel Labs build stays
              yours. Source lives on your Git host. Data lives in your
              database. Secrets live in your operator's credential
              store. If you fire us tomorrow, you keep everything and
              any engineer can pick it up.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactLink />
              <GhostLink href="/security/" small>
                Security posture
              </GhostLink>
            </div>
          </div>
          <div />
        </div>
      </section>
    </Page>
  );
}
