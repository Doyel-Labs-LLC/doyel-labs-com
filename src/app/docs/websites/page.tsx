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
  title: "Websites docs",
  description:
    "How to edit and maintain a Doyel Labs–built marketing site.",
};

export default function WebsitesDocs() {
  return (
    <Page narrow>
      <section className="pt-24">
        <Eyebrow>
          <Link href="/docs/" className="text-mute hover:text-accentHi">
            Docs
          </Link>{" "}
          · Websites
        </Eyebrow>
        <H1>
          Edit a Doyel Labs <span className="text-accent">website</span>.
        </H1>
        <Lead>
          Every site we build is yours — source on your Git host, domain
          on your registrar, forms wired to your inbox. Here's where the
          moving parts are.
        </Lead>
      </section>

      <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wide">
        {[
          ["#layout", "1. File layout"],
          ["#copy", "2. Copy edits"],
          ["#forms", "3. Forms + inbox"],
          ["#deploy", "4. Deploy pipeline"],
          ["#dns", "5. DNS + domain"],
          ["#analytics", "Analytics"],
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
        <h2 id="layout">1. File layout</h2>
        <p>
          A typical Doyel Labs marketing site ships as static HTML. The
          key files, using the SteadFast build as the reference:
        </p>
        <ul>
          <li>
            <code>index.html</code>, <code>about.html</code>,{" "}
            <code>services.html</code>, <code>routes.html</code>,{" "}
            <code>contractors.html</code>, <code>faq.html</code>,{" "}
            <code>thank-you.html</code>, <code>privacy-policy.html</code>,{" "}
            <code>terms-of-service.html</code> — the public pages.
          </li>
          <li>
            <code>assets/tw.css</code> — the compiled Tailwind stylesheet.
          </li>
          <li>
            <code>js/sf-config.js</code> — operator-scoped config values
            (phone, email, addresses) referenced from every page.
          </li>
          <li>
            <code>netlify/functions/</code> — workspace-side functions
            (payroll, forms) on the operator's Netlify account.
          </li>
          <li>
            <code>_headers</code> / <code>_redirects</code> — CDN
            response headers and URL rewrites.
          </li>
        </ul>

        <h2 id="copy">2. Copy edits</h2>
        <p>
          To change a phone number, an address, a page headline, or any
          static copy: edit the HTML file and commit. Deploy happens
          automatically (see step 4).
        </p>
        <p>
          For operator-scoped values (phone, email, addresses) that
          repeat across many pages, edit <code>js/sf-config.js</code>{" "}
          once — every page picks it up on next load.
        </p>

        <h2 id="forms">3. Forms + inbox</h2>
        <p>
          Every contact / inquiry form on a Doyel Labs site posts to the
          form provider you own (typically Formspree). Submissions land
          in the inbox you configured — Doyel Labs is never a
          recipient.
        </p>
        <p>
          To change where a form's submissions go: log in to Formspree
          (or your provider), edit the form's "Send to" address, save.
          No code change on the site side is needed.
        </p>

        <h2 id="deploy">4. Deploy pipeline</h2>
        <p>
          Push to <code>main</code> on your Git host → the CDN
          (Netlify or Cloudflare Pages) auto-builds and publishes the
          new version within about two minutes. Rollback is one click in
          the CDN dashboard.
        </p>
        <p>
          If we're on retainer, we can also push on your behalf and
          watch the deploy. Email the change to{" "}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>{" "}
          and we'll do it within one business day.
        </p>

        <h2 id="dns">5. DNS + domain</h2>
        <p>
          DNS is usually on Cloudflare, even when the CDN is Netlify —
          Cloudflare in front gets you free WAF and DDoS protection.
          The critical records to know:
        </p>
        <ul>
          <li>
            <strong>A / CNAME for the apex + www</strong> — points at
            the CDN. Cloudflare proxied (orange cloud) if the CDN
            supports it.
          </li>
          <li>
            <strong>MX for email</strong> — points at Google Workspace
            or your mail provider.
          </li>
          <li>
            <strong>SPF, DKIM, DMARC</strong> — three TXT records that
            keep email deliverable and un-spoofable. See the security
            page for our defaults.
          </li>
        </ul>

        <h2 id="analytics">Analytics</h2>
        <p>
          Every site we build ships without third-party marketing
          scripts by default. If the operator wants analytics, we
          install <strong>Plausible</strong> (cookieless, no personal
          data). Session replay tools like Microsoft Clarity are
          available on request but we recommend against them for
          operator sites that collect PII in forms.
        </p>
      </article>

      <section className="mt-16 border-t border-line pt-8">
        <Notice>
          Want a new page, a new form, or a design refresh? Email{" "}
          <a
            href={`mailto:${site.supportEmail}?subject=Website%20edit`}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            {site.supportEmail}
          </a>{" "}
          or send it through the contact form. Retainer clients get a
          one-business-day turnaround.
        </Notice>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap gap-3">
          <ContactWidget label="Ask a question" size="small" />
          <GhostLink href="/services/websites/" small>
            Product page
          </GhostLink>
          <GhostLink href="/work/" small>
            Case study
          </GhostLink>
          <GhostLink href="/docs/" small>
            All docs
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
