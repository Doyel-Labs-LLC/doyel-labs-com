import type { Metadata } from "next";
import Link from "next/link";
import {
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  MetaRow,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { site } from "@/lib/site";

/**
 * Human-readable site map at `/sitemap/`.
 *
 * Coexists with the machine-readable `/sitemap.xml` (generated from
 * `src/app/sitemap.ts`) — the XML sitemap is a special Next.js file
 * route and doesn't collide with the `/sitemap/` folder route.
 *
 * When you add a new page anywhere on the site, add it here too. This
 * is a curated index, not an auto-generated one: the ordering, grouping,
 * and blurbs are intentional and support skimming.
 */

export const metadata: Metadata = {
  title: "Site map — every page on doyel-labs.com",
  description:
    "A human-readable map of every page on doyel-labs.com. Services, case studies, industries, writing, reviews, legal, and program pages — grouped for skimming.",
  alternates: { canonical: `https://${site.domain}/sitemap/` },
  openGraph: {
    title: "Site map — every page on doyel-labs.com",
    description:
      "A human-readable map of every page on doyel-labs.com.",
    url: `https://${site.domain}/sitemap/`,
    type: "website",
  },
};

type SitemapLink = {
  href: string;
  label: string;
  blurb: string;
};

type Section = {
  title: string;
  intro?: string;
  links: SitemapLink[];
};

const SECTIONS: Section[] = [
  {
    title: "Front door",
    links: [
      {
        href: "/",
        label: "Home",
        blurb:
          "The company hero, testimonial band, capability grid, selected work, engagement flow, and audience path cards.",
      },
      {
        href: "/how-we-work/",
        label: "How we work",
        blurb:
          "The full engagement flow, centered on the one-hour orientation call.",
      },
      {
        href: "/start/",
        label: "Start here",
        blurb:
          "For visitors with a rough idea who want a friendly on-ramp.",
      },
      {
        href: "/contact/",
        label: "Contact",
        blurb:
          "Real contact form + direct email + phone. Book an orientation.",
      },
      {
        href: "/faq/",
        label: "FAQ",
        blurb:
          "Questions people actually ask before hiring us. JSON-LD FAQPage schema.",
      },
    ],
  },
  {
    title: "Services",
    intro: "What Doyel Labs builds, priced per project.",
    links: [
      {
        href: "/services/",
        label: "Services overview",
        blurb: "Capabilities, past work, partnership, engagement flow, pricing.",
      },
      {
        href: "/services/websites/",
        label: "Websites",
        blurb: "Custom marketing sites on your own domain.",
      },
      {
        href: "/services/payroll/",
        label: "Payroll workspaces",
        blurb: "Custom pay-run software for how your business actually pays people.",
      },
      {
        href: "/pricing/",
        label: "Pricing",
        blurb: "Typical price bands and how billing works.",
      },
    ],
  },
  {
    title: "Industries",
    intro:
      "Verticals we&apos;ve shipped for or would gladly ship for. Not a closed list.",
    links: [
      {
        href: "/industries/",
        label: "Industries overview",
        blurb: "Twelve starting-point verticals, alphabetized.",
      },
      {
        href: "/industries/federal-service-contractors/",
        label: "Federal service contractors",
        blurb:
          "SCA payroll, SAM.gov wage-determination compliance, DOL-ready audit trails.",
      },
    ],
  },
  {
    title: "Proof",
    intro: "Named clients, real reviews, real case studies.",
    links: [
      {
        href: "/work/",
        label: "Work",
        blurb: "Recent shipments — client work + internal programs.",
      },
      {
        href: "/case-studies/steadfast/",
        label: "Case study — SteadFast Transportation",
        blurb:
          "Marketing site + payroll workspace shipped in six weeks.",
      },
      {
        href: "/reviews/",
        label: "Reviews",
        blurb:
          "Every named client review, in full, with a public verification link.",
      },
    ],
  },
  {
    title: "Writing",
    intro: "Engineering notes and process posts.",
    links: [
      {
        href: "/writing/",
        label: "Writing overview",
        blurb: "All posts, newest first.",
      },
      {
        href: "/writing/ai-native-software-what-we-write-what-we-generate/",
        label: "AI-native software",
        blurb: "What we generate with AI, what humans still write by hand.",
      },
      {
        href: "/writing/shipping-steadfast-payroll-in-six-weeks/",
        label: "Shipping SteadFast Payroll in six weeks",
        blurb:
          "The playbook for a custom pay-run workspace, from zero code to a live pay run.",
      },
    ],
  },
  {
    title: "Programs",
    intro:
      "Internal products Doyel Labs builds for itself and, in some cases, for other operators.",
    links: [
      {
        href: "/programs/",
        label: "Programs overview",
        blurb: "BAI and ConnectionLoop.",
      },
      {
        href: "/programs/bai/",
        label: "BAI",
        blurb:
          "A trading desk that runs on your own computer, at your broker, under your rules.",
      },
      {
        href: "/programs/connectionloop/",
        label: "ConnectionLoop",
        blurb:
          "A shared calendar for families and small groups. Invite-only, free, no ads.",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        href: "/company/",
        label: "Company",
        blurb: "Who we are, where we&apos;re based, how we work.",
      },
      {
        href: "/founder/",
        label: "Founder",
        blurb:
          "Blake Doyel — the person on the orientation call, and the person who ships your build.",
      },
      {
        href: "/engineering/",
        label: "Engineering",
        blurb:
          "How Doyel Labs builds — fail-closed defaults, human-reviewed AI, audit rows.",
      },
      {
        href: "/security/",
        label: "Security",
        blurb:
          "Data maps for each product, controls table, vulnerability reports.",
      },
      {
        href: "/press/",
        label: "Press & media kit",
        blurb: "Logos, boilerplate, and everything a journalist needs.",
      },
    ],
  },
  {
    title: "Support & ops",
    links: [
      {
        href: "/support/",
        label: "Support",
        blurb: "Contact info, one-business-day SLA, common questions.",
      },
      {
        href: "/status/",
        label: "Status",
        blurb: "Live checks against every Doyel Labs service, from your browser.",
      },
      {
        href: "/changelog/",
        label: "Changelog",
        blurb: "What changed, when, and why.",
      },
    ],
  },
  {
    title: "Docs",
    intro: "Product-specific documentation.",
    links: [
      {
        href: "/docs/",
        label: "Docs overview",
        blurb: "Websites · Payroll · BAI · ConnectionLoop.",
      },
      { href: "/docs/websites/", label: "Websites docs", blurb: "How Doyel Labs websites are built and maintained." },
      { href: "/docs/payroll/", label: "Payroll docs", blurb: "How the payroll workspace is operated." },
      { href: "/docs/bai/", label: "BAI docs", blurb: "How BAI is installed and armed." },
      { href: "/docs/connectionloop/", label: "ConnectionLoop docs", blurb: "How the ConnectionLoop app is used." },
    ],
  },
  {
    title: "Legal",
    intro: "Under counsel review — every version has a date.",
    links: [
      { href: "/legal/terms/", label: "Terms", blurb: "Terms of service." },
      { href: "/legal/privacy/", label: "Privacy", blurb: "What we collect and why." },
      { href: "/legal/payroll-data/", label: "Payroll data", blurb: "How payroll data is handled." },
      { href: "/legal/risk/", label: "Risk (BAI)", blurb: "Trading risk disclosure for the BAI program." },
    ],
  },
  {
    title: "Machine-readable",
    intro:
      "For crawlers, feed readers, and other machines. Not typically browsed by humans.",
    links: [
      {
        href: "/sitemap.xml",
        label: "sitemap.xml",
        blurb: "The XML sitemap for search engines.",
      },
      {
        href: "/changelog/rss.xml",
        label: "changelog.rss",
        blurb: "RSS feed of every changelog entry.",
      },
      {
        href: "/opengraph-image",
        label: "opengraph-image.png",
        blurb: "The default OpenGraph card for social previews.",
      },
      {
        href: "/manifest.webmanifest",
        label: "manifest.webmanifest",
        blurb: "PWA manifest with the four-square icon set.",
      },
    ],
  },
];

export default function SitemapPage() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Missing a page? Email {site.supportEmail} — this list is curated
          by hand and occasionally lags a fresh route by a deploy or two.
        </MetaRow>
      }
    >
      <Breadcrumbs items={[{ name: "Site map", href: "/sitemap/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <Eyebrow>Site map</Eyebrow>
          <H1>
            Every page on{" "}
            <span className="text-accent">doyel-labs.com</span>.
          </H1>
          <Lead>
            One curated list, grouped by section. If you&apos;re trying
            to orient yourself, or if a link on another page didn&apos;t
            get you where you expected, this is the map. Machines want{" "}
            <a
              href="/sitemap.xml"
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              /sitemap.xml
            </a>{" "}
            instead.
          </Lead>
        </div>
      </section>

      {/* SECTIONS */}
      {SECTIONS.map((section) => (
        <section
          key={section.title}
          className="mt-16 border-t border-line pt-10"
        >
          <div className="max-w-3xl">
            <H2>
              <span className="mt-2 block">{section.title}</span>
            </H2>
            {section.intro ? (
              <p
                className="mt-4 text-[15px] leading-[1.7] text-mute"
                dangerouslySetInnerHTML={{ __html: section.intro }}
              />
            ) : null}
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {section.links.map((link) => (
              <li
                key={link.href}
                className="border border-line bg-surface/30 p-5 transition-colors hover:border-accentDim"
              >
                <Link href={link.href} className="block">
                  <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                    {link.href}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-ink">
                    {link.label}
                  </p>
                  <p
                    className="mt-2 text-[13px] leading-[1.6] text-mute"
                    dangerouslySetInnerHTML={{ __html: link.blurb }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* CLOSE */}
      <section className="mt-16 border-t border-line pt-10">
        <div className="flex flex-wrap gap-3">
          <GhostLink href="/" small>
            Home
          </GhostLink>
          <GhostLink href="/contact/" small>
            Contact
          </GhostLink>
          <GhostLink href="/support/" small>
            Support
          </GhostLink>
          <GhostLink href="/legal/terms/" small>
            Legal
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
