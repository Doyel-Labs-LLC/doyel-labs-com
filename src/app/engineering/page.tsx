import type { Metadata } from "next";
import {
  Card,
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  MetaRow,
  Page,
} from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Engineering",
  description: `How ${site.companyShort} builds — fail-closed, local-first where money moves, signed updates, redacted logs, and audit rows on every action.`,
};

/**
 * The engineering page is the "why this looks like an aerospace lab"
 * argument. Every claim below maps to a real file in a real repository.
 * The trailing `MetaRow` names the source of truth.
 */
export default function Engineering() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Source of truth · BAI-Desk/website/src/app/security/page.tsx ·
          ConnectionLoop/docs/SECURITY.md · index/netlify/functions/payroll.js
        </MetaRow>
      }
    >
      {/* HERO */}
      <section className="pt-24">
        <Eyebrow>Engineering</Eyebrow>
        <H1>When the software does not know, it does nothing.</H1>
        <Lead>
          One rule holds together every product Doyel Labs ships. The thing
          that can spend money — cash, a wage, a share — lives on your
          machine, and the thing we run in the cloud cannot spend it.
          Everything below follows from that.
        </Lead>
      </section>

      {/* Fail closed */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Rule 1</Eyebrow>
            <H2>
              <span className="mt-2 block">Fail closed.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              An unknown value blocks an action rather than filling it in.
              Nothing here has a fallback that pretends. If the wage
              determination for a contractor's county is not on SAM.gov, the
              draft is refused. If a broker quote is stale, the entry is not
              placed. If a Space code has expired, the join call returns
              permission-denied. An outage should look like an outage.
            </p>
          </div>
          <div className="grid gap-4">
            <Example
              app="Payroll"
              claim="A day rate below the SCA floor blocks the draft. Every stub carries the floor line."
            />
            <Example
              app="BAI"
              claim="A stale quote, a missing account snapshot, an unknown earnings date each block an entry; chat cannot spend."
            />
            <Example
              app="ConnectionLoop"
              claim="Firestore and Storage rules default-deny. A member row is created only against a live invite code."
            />
          </div>
        </div>
      </section>

      {/* Local-first for money */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Rule 2</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Local-first for anything that can move money.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              A cloud breach cannot reach a broker account we cannot see.
              Broker credentials for BAI stay in Windows Credential Manager.
              The device holds the arm phrase; we hold none of them. On the
              payroll side, we store the operator's records — but we do not
              hold their bank routing or account numbers, and we do not move
              their money.
            </p>
          </div>
          <div className="grid gap-4">
            <Example
              app="BAI"
              claim="Broker keys and access tokens live on the operator's machine, encrypted where the OS allows. Never sent to Doyel Labs."
            />
            <Example
              app="Payroll"
              claim="Bank routing and account numbers are not stored. The operator pays through their own bank; the software prepares the pay run."
            />
            <Example
              app="ConnectionLoop"
              claim="Sessions live in the OS keychain (Keychain / Keystore). The on-device state cache is AES-256-GCM sealed under a per-install key."
            />
          </div>
        </div>
      </section>

      {/* Signed updates */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Rule 3</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Updates are signed and refused mid-trade.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              No one, including us, can push code to your desk that we did not
              sign with a key baked into the app. An update is refused while
              the desk is armed or holding a position. The website ships as
              static assets on Cloudflare Pages; there is no runtime we can
              push mutations to.
            </p>
          </div>
          <div className="grid gap-4">
            <Example
              app="BAI"
              claim="Signed with a key baked into the app. Refused while armed or holding a position."
            />
            <Example
              app="Website"
              claim="Static export, immutable per deploy on Cloudflare. `_headers` bans third-party scripts on marketing pages."
            />
          </div>
        </div>
      </section>

      {/* Logs + audit */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Rule 4</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Structured logs, redacted at the source, one row per action.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Log lines carry ids, counts, and durations — not content. A
              redaction pass in CI drops any field that looks like a secret
              or a wage. Every state change worth reading a year later becomes
              an audit row: a sign-in, a rate change, a passkey enrolment, an
              armed session, a blocked stub. Rows export to CSV.
            </p>
          </div>
          <div className="grid gap-4">
            <Example
              app="Payroll"
              claim="Paystub, WD lookup, SCA-block, contractor-rate change, email delivery — all logged with actor and detail. 180-day retention."
            />
            <Example
              app="BAI"
              claim="Sign-in, device change, billing event, staff action. Structured logs with a redaction pass tested in CI."
            />
            <Example
              app="ConnectionLoop"
              claim="Callables log ids, counts, codes, durations — never content. Crash notes are scrubbed twice."
            />
          </div>
        </div>
      </section>

      {/* Tests pin dangerous paths */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>Rule 5</Eyebrow>
        <H2>
          <span className="mt-2 block">
            Tests pin the paths a subtle regression could break.
          </span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Chat cannot spend">
            Pinned by tests, not by policy. Four code paths originate an order
            in BAI and each checks the entitlement, the arm phrase, and the
            kill switch.
          </Card>
          <Card title="SCA floor is enforced">
            The stub renderer refuses to produce a stub whose day rate does
            not clear the WD floor for the county.
          </Card>
          <Card title="Rules v2 is exercised">
            ConnectionLoop's Firestore + Storage rules run against
            `rules-tests/` on the emulator. A rules change without a green
            run is not shipped.
          </Card>
          <Card title="Kill disarms, never sells">
            A kill switch pull disarms and blocks new orders. It never sells
            a position out from under a customer.
          </Card>
          <Card title="Subscription failure is not a cliff">
            A lapsed payment stops new entries and keeps managing exits on
            positions the desk already opened.
          </Card>
          <Card title="Update refused while armed">
            The updater checks armed state and holding state before applying.
          </Card>
        </div>
      </section>

      {/* Close */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>The company decision</Eyebrow>
        <H2>
          <span className="mt-2 block">
            Say what the software does not do, in the same voice.
          </span>
        </H2>
        <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
          Doyel Labs LLC is not a broker-dealer, an investment adviser, a
          bank, a payroll processor, a professional employer organization, a
          money transmitter, or a reporting agent. None of the software above
          holds customer money or securities. We ship one company. We say the
          same thing everywhere.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostLink href="/security/">Security posture</GhostLink>
          <GhostLink href="/company/" small>
            The LLC
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}

function Example({ app, claim }: { app: string; claim: string }) {
  return (
    <div className="border-t border-line pt-3">
      <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
        {app}
      </p>
      <p className="mt-1 text-[14px] leading-[1.65] text-mute">{claim}</p>
    </div>
  );
}
