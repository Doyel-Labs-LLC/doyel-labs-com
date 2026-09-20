import type { Metadata } from "next";
import {
  Card,
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  MetaRow,
  Notice,
  Page,
  StatusChip,
} from "@/components/chrome";
import { BaiArmFrame } from "@/components/frames/bai-arm";
import { BaiBookFrame } from "@/components/frames/bai-book";
import { baiDisclaimer, programStatus, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "BAI",
  description:
    "BAI — a trading desk that runs on your own computer, at your own broker, under your own rules. In private testing; public availability no earlier than 2027.",
};

/**
 * The BAI program page. Copy is ported from the existing site
 * `BAI-Desk/website/src/app/page.tsx`, compressed, with the primary
 * install / download CTA removed and replaced with a request-access
 * link to /contact. The full trading disclaimer is repeated in the
 * page's own band footer, not just the site footer.
 */
export default function BaiProgram() {
  return (
    <Page
      bandFooter={
        <div>
          <p className="max-w-prose text-[12px] leading-relaxed text-muted">
            {baiDisclaimer}
          </p>
          <MetaRow>
            Source of truth · BAI-Desk/website/src/app/page.tsx · BAI-Desk/website/src/app/security/page.tsx
          </MetaRow>
        </div>
      }
    >
      {/* HERO */}
      <section className="pt-24">
        <Eyebrow>Programs · BAI</Eyebrow>
        <H1>A trading desk that runs on your computer, at your broker, under your rules.</H1>
        <div className="mt-6">
          <StatusChip>{programStatus.bai.label}</StatusChip>
        </div>
        <Lead>
          BAI is installed software, not a service that holds your money. It
          connects to the brokerage account you already have, watches the names
          you allow, and enters and manages trades only after you type the
          phrase that arms it. You set the rules: which names, how much, the
          stop and the target on every trade, the loss that stops the day. The
          desk applies them without asking and shows you its whole record, wins
          and losses, on its Book page.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostLink href="/contact/">Request access</GhostLink>
          <GhostLink href="/security/" small>
            Security posture
          </GhostLink>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          Windows 10 and 11 · macOS later · United States only at launch
        </p>
      </section>

      {/* PROOF · Arm bar */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Three locks</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Between a scan and an order.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              First lock: your broker. You connect your own account. Your
              credentials and tokens stay on your computer in the operating
              system's credential store. Second lock: the phrase. Allow live
              orders once, arm the desk each session — typed by you, on the
              machine. Third lock: one position, one exit. Every entry goes
              with a stop and a target held at the broker.
            </p>
          </div>
          <BaiArmFrame />
        </div>
      </section>

      {/* HOW */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>How it works</Eyebrow>
        <H2>
          <span className="mt-2 block">The four cards on the desk.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="Your broker, your keys">
            Connect one of the brokers BAI knows how to talk to. Alpaca and
            Tradier at launch, more later. The keys live in Windows Credential
            Manager. Doyel Labs never sees them and cannot place an order.
          </Card>
          <Card title="Allow live, then arm">
            Connecting a broker is not trading. You type{" "}
            <code className="font-mono text-ink">I_UNDERSTAND_THIS_IS_REAL_MONEY</code>{" "}
            once to allow live orders on this computer. You type Arm each
            session. Nothing in chat, email, or on this website can arm the
            desk.
          </Card>
          <Card title="One position, one exit">
            Every entry ships to the broker as a bracket — entry + stop +
            target. If the laptop sleeps, the exit still stands. The desk
            manages exits; it never invents a fill.
          </Card>
          <Card title="Fail closed">
            A stale quote, a missing account snapshot, an unknown earnings
            date, a vendor rate limit — each one blocks an entry rather than
            guessing. An outage looks like an outage.
          </Card>
        </div>
      </section>

      {/* BOOK */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Book</Eyebrow>
            <H2>
              <span className="mt-2 block">The whole record, on one page.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Every trade the desk did or refused to do. Wins and losses side
              by side. Sortable, searchable, exportable. The paper book on the
              practice tape uses the same shape — read the book, then decide
              whether to arm live.
            </p>
          </div>
          <BaiBookFrame />
        </div>
      </section>

      {/* SAFETY */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What stops it</Eyebrow>
        <H2>
          <span className="mt-2 block">Multiple, redundant, deliberate.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="Stops at the broker">
            Every trade carries a broker-held stop. Whether or not your
            computer is on.
          </Card>
          <Card title="Loss limits">
            Daily, monthly, and per-campaign. Each ends new entries at its own
            threshold and never sells to enforce itself.
          </Card>
          <Card title="Kill switches">
            In the desk. In the alert email. A watchdog on your computer that
            pulls the switch if the desk goes silent for two minutes. Our side
            server-side if your account is compromised. A kill disarms and
            blocks new orders; it never sells your holdings behind your back.
          </Card>
          <Card title="Chat cannot spend">
            The research chat can read and explain. It cannot arm, raise a
            cap, or place a ticket, and that is pinned by tests, not by policy.
          </Card>
          <Card title="Subscription is not a cliff">
            A failed payment or a cancel stops new entries. Exits on positions
            already opened stay managed. Nothing is abandoned to the broker's
            bracket alone.
          </Card>
          <Card title="Unknown data blocks">
            A stale quote or a missing snapshot returns nothing. The desk
            waits.
          </Card>
        </div>
      </section>

      {/* WHAT IT IS NOT */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What it is not</Eyebrow>
        <H2>
          <span className="mt-2 block">Say the honest thing.</span>
        </H2>
        <Notice>
          BAI is not financial advice. Doyel Labs LLC is not a broker-dealer or
          an investment adviser. Every scan, verdict, and sized ticket is an
          evaluation of the rules you set against market data you chose to
          receive. You decide what to trade, when to arm, and how much to
          risk. Trading can lose money, including all of it.
        </Notice>
        <div className="mt-6 flex flex-wrap gap-3">
          <GhostLink href="/security/" small>
            Security
          </GhostLink>
          <GhostLink href="/docs/" small>
            Docs
          </GhostLink>
          <GhostLink href="/support/" small>
            Support
          </GhostLink>
          <GhostLink
            href={`mailto:${site.supportEmail}?subject=BAI%20access%20request`}
            small
            external
          >
            Request access
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
