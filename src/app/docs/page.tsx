import type { Metadata } from "next";
import Link from "next/link";
import { Card, Eyebrow, GhostLink, H1, H2, Lead, Page } from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description: `Product documentation index for ${site.company} — payroll, websites, BAI, and ConnectionLoop.`,
};

/**
 * A company-level docs index. Each product has its own section; the
 * BAI docs page (long-form, from the existing site) is linked at the
 * bottom, still accessible via /docs/#bai until it is ported per-product.
 */
export default function Docs() {
  return (
    <Page narrow>
      <section className="pt-24">
        <Eyebrow>Docs</Eyebrow>
        <H1>Product documentation, per product.</H1>
        <Lead>
          Short guides for each thing Doyel Labs builds. Every claim in the
          docs maps to a real file in the code; if a doc looks out of date,
          write to us. Nothing here tells you what to trade, what to hire, or
          what to pay.
        </Lead>
        <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wide">
          {[
            ["#payroll", "Payroll"],
            ["#websites", "Websites"],
            ["#bai", "BAI"],
            ["#connectionloop", "ConnectionLoop"],
          ].map(([h, t]) => (
            <a
              key={h}
              href={h}
              className="text-mute underline decoration-line2 underline-offset-2 hover:text-ink"
            >
              {t}
            </a>
          ))}
        </nav>
      </section>

      {/* PAYROLL */}
      <section id="payroll" className="mt-24 border-t border-line pt-16">
        <Eyebrow>Payroll</Eyebrow>
        <H2>
          <span className="mt-2 block">Set up an operator workspace.</span>
        </H2>
        <div className="prose-legal mt-6">
          <ol>
            <li>
              <strong>Create the workspace.</strong> We provision the operator
              blob namespace and the Resend sending domain. You give us the
              domain and the from address you want on stubs.
            </li>
            <li>
              <strong>Import the contractor list.</strong> Paste CSV or type
              contractors in the Contractors tab. Every contractor needs a
              name, state, WD number (or leave blank and let the WD auto-lookup
              fill it), a day rate, and a contract number.
            </li>
            <li>
              <strong>Run WD auto-lookup.</strong> SCA tab → enter city and
              state, wait for the four-step pipeline to finish, and press
              Apply. The rate preview shows base wage, H&W fringe, and the
              day-rate floor.
            </li>
            <li>
              <strong>Run the first pay period.</strong> Batch tab → set
              month, year, half, select contractors, review the batch, and
              download every stub. Optional: email the batch.
            </li>
            <li>
              <strong>Save the CSV of the audit log.</strong> Audit tab →
              Export CSV. Keep it for the SCA's three-year rule.
            </li>
          </ol>
        </div>
      </section>

      {/* WEBSITES */}
      <section id="websites" className="mt-24 border-t border-line pt-16">
        <Eyebrow>Websites</Eyebrow>
        <H2>
          <span className="mt-2 block">Edit a Doyel Labs–built site.</span>
        </H2>
        <div className="prose-legal mt-6">
          <p>
            Sites we build ship as static HTML with a small set of files where
            operator copy lives:
          </p>
          <ul>
            <li>
              <code>index.html</code>, <code>about.html</code>,{" "}
              <code>services.html</code>, <code>routes.html</code>,{" "}
              <code>contractors.html</code>, <code>faq.html</code> — the
              public pages
            </li>
            <li>
              <code>assets/tw.css</code> — the compiled Tailwind stylesheet
            </li>
            <li>
              <code>js/sf-config.js</code> — the operator-scoped config (phone,
              email, addresses)
            </li>
            <li>
              <code>netlify/functions/</code> — the workspace-side functions
              (payroll, forms) on the operator's account
            </li>
          </ul>
          <p>
            To change a phone number, an address, or a page copy line, edit
            the file and push. If we hold the build, email the change to{" "}
            <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>{" "}
            and we ship within one business day.
          </p>
        </div>
      </section>

      {/* BAI */}
      <section id="bai" className="mt-24 border-t border-line pt-16">
        <Eyebrow>BAI</Eyebrow>
        <H2>
          <span className="mt-2 block">How BAI works, in the order you meet it.</span>
        </H2>
        <div className="prose-legal mt-6">
          <p>
            BAI is in private testing until 2027. If you have access, the
            in-app Help panel is the source of truth. The short version:
          </p>
          <ol>
            <li>
              Install BAI. The desk opens on the practice tape (simulated
              account, play money, made-up prices).
            </li>
            <li>
              Connect a broker: Alpaca or Tradier today. Keys stay in
              Windows Credential Manager. Doyel Labs never sees them.
            </li>
            <li>
              Type <code>I_UNDERSTAND_THIS_IS_REAL_MONEY</code> once to allow
              live orders on this computer.
            </li>
            <li>
              Add names to watch, set the risk you allow the desk to take,
              and Arm the desk each session. Every entry ships with a stop
              and a target held at the broker.
            </li>
            <li>
              Read the Book. Wins and losses are on one page. The Book is the
              record; your broker is the record; nothing is hidden.
            </li>
          </ol>
          <p>
            The full trading disclaimer is on the{" "}
            <Link href="/programs/bai/">BAI program page</Link>. Trading can
            lose money, including all of it.
          </p>
        </div>
      </section>

      {/* ConnectionLoop */}
      <section id="connectionloop" className="mt-24 border-t border-line pt-16">
        <Eyebrow>ConnectionLoop</Eyebrow>
        <H2>
          <span className="mt-2 block">Getting into a Space.</span>
        </H2>
        <div className="prose-legal mt-6">
          <ol>
            <li>
              Install ConnectionLoop from the App Store or Google Play once
              the store review completes. Waitlist:{" "}
              <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
            </li>
            <li>
              Create an account with an email; verify it. The email link
              lands on the ConnectionLoop hosted page and returns you to the
              app.
            </li>
            <li>
              Create or join a Space. Joining needs a live invite code from a
              Space admin; the code is nine symbols and expires in a year at
              most.
            </li>
            <li>
              Use the tabs: Calendar for events, Lists for shared checklists,
              Space for chat and photos, Me for privacy and account.
            </li>
          </ol>
        </div>
      </section>

      {/* Close */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="flex flex-wrap gap-3">
          <GhostLink href="/support/" small>
            Support
          </GhostLink>
          <GhostLink href="/security/" small>
            Security
          </GhostLink>
          <GhostLink href="/changelog/" small>
            Changelog
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
