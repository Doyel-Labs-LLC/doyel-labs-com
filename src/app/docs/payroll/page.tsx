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
  title: "Payroll docs",
  description:
    "How to set up and run an SCA-first payroll workspace built by Doyel Labs.",
  alternates: { canonical: `https://${site.domain}/docs/payroll/` },
};

export default function PayrollDocs() {
  return (
    <Page narrow>
      <section className="pt-24">
        <Eyebrow>
          <Link href="/docs/" className="text-mute hover:text-accentHi">
            Docs
          </Link>{" "}
          · Payroll
        </Eyebrow>
        <H1>
          Set up a <span className="text-accent">payroll</span> workspace.
        </H1>
        <Lead>
          These are the steps we walk every operator through. The whole
          setup takes about a week from discovery call to a live pay
          period.
        </Lead>
      </section>

      <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wide">
        {[
          ["#provision", "1. Provision"],
          ["#contractors", "2. Contractor register"],
          ["#wd", "3. Wage determination"],
          ["#run", "4. First pay run"],
          ["#audit", "5. Audit + backup"],
          ["#dol", "DOL export"],
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
        <h2 id="provision">1. Provision the operator workspace</h2>
        <p>
          Doyel Labs provisions the operator's blob namespace on Netlify
          Blobs and the Resend sending domain for stubs. You (the
          operator) provide:
        </p>
        <ul>
          <li>
            The <strong>domain</strong> the payroll app should live on
            (subdomain of your existing site works — e.g.{" "}
            <code>payroll.your-company.com</code>).
          </li>
          <li>
            The <strong>from-address</strong> stubs should be emailed
            from (e.g. <code>payroll@your-company.com</code>).
          </li>
          <li>
            The <strong>administrator account</strong> — usually one
            person on the operator side who signs in and runs the pay
            period.
          </li>
        </ul>

        <h2 id="contractors">2. Import the contractor register</h2>
        <p>
          Two paths, pick either:
        </p>
        <ol>
          <li>
            <strong>Paste CSV.</strong> Contractors tab → Import CSV →
            paste rows with headers <code>first,last,state,wd,contract,day_rate,min_wage,hw_fringe</code>.
          </li>
          <li>
            <strong>Type one at a time.</strong> Contractors tab → +
            Add Contractor. Every contractor needs at minimum: name,
            state (2-letter), a day rate, and a start date.
          </li>
        </ol>
        <p>
          SSNs are encrypted at rest. The UI never shows more than the
          last 4 digits in a running app; the full SSN is only decrypted
          when generating a PDF stub.
        </p>

        <h2 id="wd">3. Run wage-determination auto-lookup</h2>
        <p>
          SCA tab → enter the city and 2-letter state → wait for the
          four-step pipeline: geocode → SAM.gov find → download WD →
          parse rates. The rate preview shows base wage, H&W fringe,
          and the day-rate floor (<code>(base + H&W) × 8</code>).
        </p>
        <p>
          If the WD hasn't been revised in over two years, the
          dashboard shows a WD reminder chip. Click "Verify WD rates"
          when you've confirmed the WD is still current.
        </p>

        <h2 id="run">4. Run the first pay period</h2>
        <p>
          Batch tab → set month + year + half → select contractors →
          review the batch → download every stub as PDF. Optional:
          email the batch to contractors from your own domain via Resend.
        </p>
        <p>
          Every stub the app produces carries the SCA line: WD number,
          base wage, H&W fringe, resulting floor, met or not. Drafts
          below the floor are refused with a red banner explaining why.
        </p>

        <h2 id="audit">5. Audit log + backup</h2>
        <p>
          Every draft, every emailed stub, every WD lookup, every
          rate change, every SCA-block leaves a row. Audit tab →
          Export CSV. Keep the CSV against the SCA's three-year
          retention rule; the server-side log auto-prunes at 180 days.
        </p>
        <p>
          Also on the Backup tab: <em>Download raw backup (.json)</em>{" "}
          exports every contractor, every stub, every audit row. Keep
          one before any big change (WD revision, new contractor batch,
          etc.).
        </p>

        <h2 id="dol">Preparing for a DOL inspection</h2>
        <p>
          If a Wage and Hour Division inspector reaches out, here's the
          list of files to hand them:
        </p>
        <ul>
          <li>
            The full audit CSV (Audit → Export CSV) for the requested
            date range.
          </li>
          <li>
            All generated PDF stubs for the requested date range
            (Backup → Download raw backup, then unzip the{" "}
            <code>stubs/</code> folder).
          </li>
          <li>
            The current WD file the app is using (SCA → Recent lookups
            → download the WD PDF).
          </li>
          <li>
            Your written contractor agreements (kept outside the app,
            in your ops folder).
          </li>
        </ul>
        <p>
          If the inspector asks something the app doesn't cover, email{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>{" "}
          — we'll help you extract whatever else you need.
        </p>
      </article>

      <section className="mt-16 border-t border-line pt-8">
        <Notice>
          <strong>Product limits.</strong> The current SteadFast Payroll
          build does not compute federal withholding, run direct
          deposit, or file taxes. Those can be added on a future build —
          not caps of the product, just scope decisions on the first
          release.
        </Notice>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap gap-3">
          <ContactWidget label="Ask a question" size="small" />
          <GhostLink href="/services/payroll/" small>
            Product page
          </GhostLink>
          <GhostLink href="/security/" small>
            Security posture
          </GhostLink>
          <GhostLink href="/docs/" small>
            All docs
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
