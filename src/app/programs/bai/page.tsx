import type { Metadata } from "next";
import {
  AccentChip,
  Card,
  Eyebrow,
  GhostLink,
  Grid2,
  Grid3,
  H1,
  H2,
  Lead,
  MetaRow,
  Notice,
  Page,
  StatusChip,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactWidget } from "@/components/contact-modal";
import { BaiArmFrame } from "@/components/frames/bai-arm";
import { BaiBookFrame } from "@/components/frames/bai-book";
import { baiDisclaimer, programStatus, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "BAI — trading-desk program",
  description:
    "BAI is one of several programs built by Doyel Labs — a local-first trading desk that runs on the operator's own computer, at their broker, under their rules. In private testing. Doyel Labs itself is a custom software studio; see doyel-labs.com for websites, payroll, and internal tools.",
  robots: { index: true, follow: true },
};

export default function BaiProgram() {
  return (
    <Page
      bandFooter={
        <div>
          <p className="max-w-prose text-[12px] leading-relaxed text-muted">
            {baiDisclaimer}
          </p>
          <MetaRow>
            BAI is a Doyel Labs program. It is not the company.
          </MetaRow>
        </div>
      }
    >
      <Breadcrumbs
        items={[
          { name: "Programs", href: "/programs/" },
          { name: "BAI", href: "/programs/bai/" },
        ]}
      />

      {/* HERO */}
      <section className="hero-glow">
        <Eyebrow>Programs · BAI</Eyebrow>
        <H1>
          A trading desk that runs on <span className="text-accent">your</span> computer.
        </H1>
        <div className="mt-6">
          <StatusChip>{programStatus.bai.label}</StatusChip>
        </div>
        <Lead>
          BAI is installed software, not a service that holds your money.
          It connects to the brokerage you already have, watches the names
          you allow, and enters trades only after you type the phrase that
          arms it. You set the rules; the desk applies them.
        </Lead>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ContactWidget label="Request access" />
          <GhostLink href="/security/" small>
            Security posture
          </GhostLink>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          Windows 10 and 11 · macOS later · US-only at launch
        </p>
      </section>

      {/* ARM BAR FRAME */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>The three locks</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Between a scan and an order.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Your broker credentials stay on your computer in the OS
              credential store. You type a phrase to allow live orders on
              this machine. You type Arm each session. Every entry ships
              with a stop and a target held at the broker.
            </p>
          </div>
          <BaiArmFrame />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <H2>
            <span className="mt-2 block">The four cards on the desk.</span>
          </H2>
        </div>
        <div className="mt-12">
          <Grid2>
            <Card title="Your broker, your keys">
              Connect Alpaca or Tradier at launch. The keys live in
              Windows Credential Manager. Doyel Labs never sees them and
              cannot place an order.
            </Card>
            <Card title="Allow live, then arm">
              Connecting a broker is not trading. You type{" "}
              <code className="font-mono text-ink">
                I_UNDERSTAND_THIS_IS_REAL_MONEY
              </code>{" "}
              once to allow live orders on this computer. You type Arm
              each session. Nothing in chat, email, or on this website
              can arm the desk.
            </Card>
            <Card title="One position, one exit">
              Every entry ships to the broker as a bracket — entry, stop,
              and target. If the laptop sleeps, the exit still stands.
              The desk manages exits; it never invents a fill.
            </Card>
            <Card title="Unknown data blocks">
              Stale quote, missing snapshot, unknown earnings date, vendor
              rate limit — each blocks an entry rather than guessing. An
              outage looks like an outage.
            </Card>
          </Grid2>
        </div>
      </section>

      {/* BOOK */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>The Book</Eyebrow>
            <H2>
              <span className="mt-2 block">The record, on one page.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Every trade the desk did or refused to do. Wins and losses
              side by side. Sortable, searchable, exportable. Read the
              Book, then decide whether to arm live.
            </p>
          </div>
          <BaiBookFrame />
        </div>
      </section>

      {/* WHAT STOPS IT */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>What stops it</Eyebrow>
          <H2>
            <span className="mt-2 block">
              Multiple, redundant, deliberate.
            </span>
          </H2>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="Stops at the broker">
              Every trade carries a broker-held stop, whether the computer
              is on or asleep.
            </Card>
            <Card title="Loss limits">
              Daily, monthly, per-campaign. Each ends new entries at its
              threshold. None sells to enforce itself.
            </Card>
            <Card title="Kill switches">
              In the app. In an email link. A local watchdog if the desk
              goes silent for two minutes. Our side if your account is
              compromised. A kill disarms and blocks new orders; it never
              sells behind your back.
            </Card>
            <Card title="Chat cannot spend">
              The research chat reads and explains. It cannot arm, raise
              a cap, or place a ticket. Pinned by tests, not by policy.
            </Card>
            <Card title="Subscription is not a cliff">
              A failed payment stops new entries and keeps managing exits
              on positions the desk already opened.
            </Card>
            <Card title="Signed updates">
              No code we did not sign runs on your machine. Refused mid-trade.
            </Card>
          </Grid3>
        </div>
      </section>

      {/* HONEST LINE */}
      <section className="mt-24 border-t border-line pt-16">
        <Notice>
          BAI is not financial advice. Doyel Labs LLC is not a
          broker-dealer or an investment adviser. Every scan and sized
          ticket is an evaluation of the rules you set against market
          data you chose to receive. You decide what to trade, when to
          arm, and how much to risk. Trading can lose money, including
          all of it.
        </Notice>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostLink href="/security/" small>
            Security
          </GhostLink>
          <GhostLink href="/docs/" small>
            Docs
          </GhostLink>
          <GhostLink
            href={`mailto:${site.supportEmail}?subject=BAI%20access%20request`}
            small
            external
          >
            Request access
          </GhostLink>
        </div>
        <p className="mt-6">
          <AccentChip>Doyel Labs company site → doyel-labs.com</AccentChip>
        </p>
      </section>
    </Page>
  );
}
