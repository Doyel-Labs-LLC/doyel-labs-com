import type { Metadata } from "next";
import Link from "next/link";
import {
  Eyebrow,
  GhostLink,
  H1,
  Lead,
  Notice,
  Page,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "BAI docs",
  description:
    "How BAI works, in the order you meet it: install, broker keys, allow live, arm, campaigns, safety.",
};

export default function BaiDocs() {
  return (
    <Page narrow>
      <section className="pt-24">
        <Eyebrow>
          <Link href="/docs/" className="text-mute hover:text-accentHi">
            Docs
          </Link>{" "}
          · BAI
        </Eyebrow>
        <H1>
          How <span className="text-accent">BAI</span> works, in the order you meet it.
        </H1>
        <Lead>
          BAI is in private testing until 2027. If you have access, the
          in-app Help panel is the source of truth. This is the
          short version.
        </Lead>
      </section>

      <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wide">
        {[
          ["#start", "1. Getting started"],
          ["#broker", "2. Brokers"],
          ["#data", "3. Market data"],
          ["#arm", "4. Arm phrase"],
          ["#campaign", "5. Campaigns"],
          ["#stop", "6. What stops it"],
        ].map(([h, t]) => (
          <a
            key={h}
            href={h}
            className="text-mute underline decoration-line2 underline-offset-2 hover:text-accentHi"
          >
            {t}
          </a>
        ))}
      </nav>

      <article className="prose-legal mt-12">
        <h2 id="start">1. Getting started</h2>
        <ol>
          <li>
            <strong>Install.</strong> Download from the release page,
            run the installer, open BAI. Windows will warn about an
            unknown publisher until our signing certificate is fully
            propagated — choose More info, then Run anyway.
          </li>
          <li>
            <strong>Create an account.</strong> Sign-in window → Create
            an account → confirm the email → sign in.
          </li>
          <li>
            <strong>Read and accept.</strong> Terms, Privacy, and Risk
            Disclosure appear side by side. Each box enables once you
            scroll that document to its end.
          </li>
          <li>
            <strong>The desk opens on the practice tape.</strong>{" "}
            Everything works, nothing is real. Add a few names to watch
            and look around before you connect a broker.
          </li>
        </ol>

        <h2 id="broker">2. Brokers</h2>
        <p>
          Settings → Broker: one tile per venue. Choosing one disarms
          the desk and pauses any campaign — nothing sells. Every venue
          needs its own account; BAI never holds your money.
        </p>
        <p>
          <strong>Supported today:</strong> Alpaca (paper and live),
          Tradier (sandbox and live).{" "}
          <strong>Waiting:</strong> Schwab, until its partner programme
          answers.
        </p>
        <p>
          <strong>Alpaca setup:</strong> open an account at{" "}
          <a href="https://alpaca.markets" target="_blank" rel="noopener noreferrer">
            alpaca.markets
          </a>
          , finish identity check, generate a paper-account API key,
          paste both key ID and secret into BAI's Alpaca tile, click
          Test connection. Should read "Connected to a paper account."
        </p>
        <p>
          <strong>Tradier setup:</strong> open an account at{" "}
          <a href="https://tradier.com" target="_blank" rel="noopener noreferrer">
            tradier.com
          </a>
          , copy the sandbox access token from API Access, paste into
          BAI's Tradier tile, click Test connection. Real orders on
          either broker still need the Allow live + Arm phrases.
        </p>

        <h2 id="data">3. Market data</h2>
        <p>
          Settings → Market data: three named providers. One is enough
          to start, each has a free tier. Recommended first setup:
          Finnhub for live quotes (paste the API key, press Test). Your
          broker also provides chart history once connected.
        </p>

        <h2 id="arm">4. Allow live, then arm</h2>
        <p>
          A connected broker is not trading. Real orders need two
          things typed by you: the phrase{" "}
          <code>I_UNDERSTAND_THIS_IS_REAL_MONEY</code> once to allow
          live orders on this computer, and Arm each session you want
          the scanner to act. Nothing in chat, email, or on this
          website can arm the desk.
        </p>

        <h2 id="campaign">5. Campaigns</h2>
        <p>
          A campaign is the desk trading a set amount of money on its
          own for a set number of days: it arms itself each regular
          session, stops for the day at the daily loss limit, and
          pauses itself for good at the campaign loss limit.
        </p>
        <ol>
          <li>Pick how careful (Careful / Balanced / Active) — fills the numbers from your account size.</li>
          <li>Pick how long — a week, two, a month, or a date.</li>
          <li>Read the sentence describing exactly what you're choosing.</li>
          <li>Type the phrase and start.</li>
        </ol>

        <h2 id="stop">6. What stops it</h2>
        <ul>
          <li>The stop on every trade, held at your broker.</li>
          <li>Daily / monthly / campaign loss limits.</li>
          <li>Kill switches: in the desk, in the alert email, watchdog on your computer, and our side server-side.</li>
          <li>Lapsed subscription: no new entries, exits still managed.</li>
          <li>Unknown data (stale quote, missing snapshot, unknown earnings date): the desk waits.</li>
        </ul>
      </article>

      <section className="mt-16 border-t border-line pt-8">
        <Notice>
          BAI is a tool, not advice. Doyel Labs LLC is not a
          broker-dealer or investment adviser. Trading can lose money,
          including all of it. Questions:{" "}
          <a
            href={`mailto:${site.supportEmail}`}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            {site.supportEmail}
          </a>
          .
        </Notice>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap gap-3">
          <ContactWidget label="Request access" size="small" />
          <GhostLink href="/programs/bai/" small>
            Program page
          </GhostLink>
          <GhostLink href="/legal/risk/" small>
            Risk disclosure
          </GhostLink>
          <GhostLink href="/docs/" small>
            All docs
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
