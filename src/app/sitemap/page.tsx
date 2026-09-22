import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, H1, H2, Lead, Page } from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "All pages",
  description: "Find services, projects, products, company information, support, and legal resources from Doyel Labs.",
  alternates: { canonical: `https://${site.domain}/sitemap/` },
};

const groups = [
  { name: "Start here", links: [
    ["/", "Home", "A quick introduction to what we build."],
    ["/services/", "Services", "Websites, business tools, and custom software."],
    ["/work/", "Work", "Our SteadFast website and payroll project."],
    ["/products/", "Products", "BAI and ConnectionLoop, both in development."],
    ["/company/", "About", "Our company and how we work."],
    ["/contact/", "Contact", "Start a conversation or ask a question."],
  ] },
  { name: "Services and getting started", links: [
    ["/services/websites/", "Websites", "Professional websites on your own domain."],
    ["/services/payroll/", "Payroll workspaces", "Software for preparing pay runs and records."],
    ["/services/custom-software/", "Custom software", "Applications, internal tools, and integrations."],
    ["/services/#process", "Our process", "What working together looks like."],
    ["/services/#pricing", "How pricing works", "Quoted per project, with scope agreed first."],
    ["/faq/", "Frequently asked questions", "Practical answers before and after a build."],
    ["/industries/federal-service-contractors/", "Federal service contractors", "One example of industry-specific software."],
  ] },
  { name: "Support and documentation", links: [
    ["/support/", "Support", "Help with an existing service or product."],
    ["/docs/", "Documentation", "Guides to using and maintaining your software."],
    ["/docs/websites/", "Website documentation", "Maintaining a Doyel Labs website."],
    ["/docs/payroll/", "Payroll documentation", "Working with the payroll workspace."],
    ["/status/", "Service status", "Current connectivity checks."],
    ["/security/", "Security", "Controls and vulnerability reporting."],
  ] },
  { name: "Company resources", links: [
    ["/engineering/", "Engineering", "How we build and review software."],
    ["/press/", "Press and media", "Company information and brand assets."],
    ["/uses/", "Tools we use", "The tools behind the work."],
    ["/changelog/", "Changelog", "A record of website and product changes."],
    ["/changelog/rss.xml", "Changelog RSS", "Follow changes in your feed reader."],
  ] },
  { name: "Writing", links: [
    ["/writing/", "All writing", "Notes on building useful software."],
    ["/writing/how-to-scope-software-when-you-dont-have-a-spec/", "Scoping software without a specification", "Turning an idea into a plan."],
    ["/writing/ai-native-software-what-we-write-what-we-generate/", "AI and the work we do", "What is generated and what people decide."],
    ["/writing/shipping-steadfast-payroll-in-six-weeks/", "Building the SteadFast payroll workspace", "An account of a specific build."],
  ] },
  { name: "Legal", links: [
    ["/legal/terms/", "Terms of service", "Company terms."],
    ["/legal/privacy/", "Privacy policy", "How information is handled."],
    ["/legal/payroll-data/", "Payroll data", "Payroll-specific information handling."],
    ["/legal/risk/", "Trading risk", "Risk disclosures for BAI."],
    ["/legal/bai/terms/", "BAI terms", "Product terms of use."],
    ["/legal/bai/privacy/", "BAI privacy", "Product privacy policy."],
  ] },
];

export default function SitemapPage() {
  return (
    <Page>
      <Breadcrumbs items={[{ name: "All pages", href: "/sitemap/" }]} />
      <section className="pt-6"><Eyebrow>All pages</Eyebrow><H1>Find what you need.</H1><Lead>Services, products, and useful resources.</Lead></section>
      {groups.map((group) => (
        <section key={group.name} className="section-band">
          <H2>{group.name}</H2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {group.links.map(([href, label, description]) => (
              <li key={href}><Link href={href} className="block rounded-lg border border-line p-5 transition-colors hover:border-accentDim">
                <h3 className="text-base font-medium text-ink">{label} <span aria-hidden="true" className="text-accent">→</span></h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{description}</p>
              </Link></li>
            ))}
          </ul>
        </section>
      ))}
      <p className="mt-10 text-sm text-muted">For search engines: <a className="text-link" href="/sitemap.xml">XML sitemap</a>.</p>
    </Page>
  );
}
