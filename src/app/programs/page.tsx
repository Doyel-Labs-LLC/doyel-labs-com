import type { Metadata } from "next";
import {
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  Page,
  StatusChip,
} from "@/components/chrome";
import { programStatus, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programs",
  description: `Internal ${site.companyShort} programs: BAI (trading desk, 2027) and ConnectionLoop (invite-only shared calendar, store submission this month).`,
};

/** Full-band program rows, SpaceX-style: one program, one band. */
export default function Programs() {
  return (
    <Page>
      <section className="pt-24">
        <Eyebrow>Programs</Eyebrow>
        <H1>Internal products, held to the same rule as the services.</H1>
        <Lead>
          A program is a piece of software Doyel Labs builds for itself, then
          decides whether to ship. Each one has to fail closed and each one has
          to be honest about what it does not do. Two are currently in flight.
        </Lead>
      </section>

      {/* BAI band */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>BAI</Eyebrow>
            <H2>
              <span className="mt-2 block">
                A trading desk that runs on your computer, at your broker, under your rules.
              </span>
            </H2>
            <p className="mt-4">
              <StatusChip>{programStatus.bai.label}</StatusChip>
            </p>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              {programStatus.bai.body} The install stays on your computer.
              Broker credentials live in the operating system credential store.
              Every entry carries a stop and a target held at the broker.
              Nothing in chat or on this website can arm the desk.
            </p>
            <div className="mt-6">
              <GhostLink href="/programs/bai/" small>
                Program page
              </GhostLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <Stat label="Locks between scan and order" value="3" />
            <Stat label="Kill switch reach" value="4 paths" />
            <Stat label="Broker credentials on our servers" value="0" />
            <Stat label="Chat authority to spend" value="0" />
            <Stat label="US-only at launch" value="Yes" />
            <Stat label="Platforms" value="Windows 10 / 11" />
          </div>
        </div>
      </section>

      {/* ConnectionLoop band */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>ConnectionLoop</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Shared plans, lists, and chat for families and small groups.
              </span>
            </H2>
            <p className="mt-4">
              <StatusChip>{programStatus.connectionloop.label}</StatusChip>
            </p>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              {programStatus.connectionloop.body} Invite-only. Free. No ads.
              No public feed. Rules-not-code enforcement: a Space membership is
              minted only against a live invite code. On-device state is
              AES-256-GCM sealed under an OS keychain key.
            </p>
            <div className="mt-6">
              <GhostLink href="/programs/connectionloop/" small>
                Program page
              </GhostLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <Stat label="Public feed" value="None" />
            <Stat label="Ads" value="Zero" />
            <Stat label="Default deny in rules" value="Everywhere" />
            <Stat label="Session storage" value="OS keychain" />
            <Stat label="Local cache" value="AES-256-GCM" />
            <Stat label="Platforms" value="iOS · Android" />
          </div>
        </div>
      </section>
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line pt-3">
      <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-1 text-[15px] text-ink">{value}</p>
    </div>
  );
}
