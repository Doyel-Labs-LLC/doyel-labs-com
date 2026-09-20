import type { Metadata } from "next";
import {
  Card,
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  Notice,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { WebsiteSteadfastFrame } from "@/components/frames/websites-preview";
import { site } from "@/lib/site";
import { steadfastCase } from "@/lib/demo/websites";

export const metadata: Metadata = {
  title: "Websites",
  description:
    "Doyel Labs builds fast, accessible websites for small operators — schema.org markup, mobile-first, forms wired to a real inbox. Live example: steadfasttransportationinc.com.",
};

export default function Websites() {
  return (
    <Page>
      <Breadcrumbs
        items={[
          { name: "Services", href: "/services/" },
          { name: "Websites", href: "/services/websites/" },
        ]}
      />

      {/* HERO */}
      <section>
        <Eyebrow>Services · websites</Eyebrow>
        <H1>Websites for small operators, built to open fast and stay honest.</H1>
        <Lead>
          Custom domain on your own registrar. Mobile-first navigation and a
          skip-link. schema.org structured data so the search engines know who
          you are. Forms wired to your own inbox — not ours. No dark patterns,
          no upsell modals, no cookie banners you did not ask for.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostLink href="/contact/">Start a build</GhostLink>
          <GhostLink
            href={steadfastCase.liveUrl}
            small
            external
          >
            View live example
          </GhostLink>
        </div>
      </section>

      {/* CASE */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Live example</Eyebrow>
            <H2>
              <span className="mt-2 block">
                SteadFast Transportation Inc.
              </span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              {steadfastCase.what} We built the whole site, ten pages, plus a
              password-gated payroll workspace on the same domain. The site is
              live at{" "}
              <a
                href={steadfastCase.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line2 underline-offset-2 hover:text-ink"
              >
                {steadfastCase.domain}
              </a>
              .
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted">
              Operator: {steadfastCase.operator}
            </p>
          </div>
          <WebsiteSteadfastFrame />
        </div>
      </section>

      {/* WHAT WAS BUILT */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What was built</Eyebrow>
        <H2>
          <span className="mt-2 block">
            The concrete list.
          </span>
        </H2>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {steadfastCase.built.map((line) => (
            <li key={line} className="flex gap-3 border-t border-line pt-3 text-[14px] text-mute">
              <span className="mt-2 inline-block h-1 w-4 shrink-0 bg-ink" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* WHAT SHIPS */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What a Doyel Labs website ships with</Eyebrow>
        <H2>
          <span className="mt-2 block">Every project, out of the box.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steadfastCase.ships.map((item) => {
            const [title, ...rest] = item.split(" — ");
            return (
              <Card key={item} title={title}>
                {rest.length ? rest.join(" — ") : item}
              </Card>
            );
          })}
          <Card title="Accessibility">
            WCAG AA contrast, keyboard-reachable nav, visible focus rings,
            semantic headings, alt text everywhere an image ships.
          </Card>
          <Card title="Performance">
            Static output on a CDN. No render-blocking third-party scripts on
            marketing pages. LCP under 2.0s on mid-tier mobile.
          </Card>
          <Card title="Content edits">
            You edit copy and prices from a small set of Markdown files, or —
            for the SteadFast build — from HTML files on the operator's own
            branch. No CMS bill.
          </Card>
        </div>
      </section>

      {/* WHAT WE DON'T DO */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What we do not ship</Eyebrow>
        <H2>
          <span className="mt-2 block">
            Not every operator needs a booking system.
          </span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {steadfastCase.doesNotShip.map((item) => (
            <Card key={item} title="Refused">
              {item}
            </Card>
          ))}
        </div>
      </section>

      {/* CLOSE */}
      <section className="mt-24 border-t border-line pt-16">
        <Notice>
          Email{" "}
          <a
            href={`mailto:${site.supportEmail}`}
            className="underline decoration-line2 underline-offset-2 hover:text-ink"
          >
            {site.supportEmail}
          </a>{" "}
          with a domain you already own, or the domain name you want to buy,
          and a one-paragraph description of the business. We answer within
          one business day.
        </Notice>
      </section>
    </Page>
  );
}
