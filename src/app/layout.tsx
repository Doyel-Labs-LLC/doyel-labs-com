import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { site } from "@/lib/site";

/** Search-facing description. Read out loud on Google, in the AI Overview,
 * and in Twitter/LinkedIn cards. Must state, in plain English, what
 * Doyel Labs is and who we serve. No industry jargon in the first
 * sentence. This is the single source of truth for how we appear in
 * search; every page should defer to this framing. */
const searchDescription =
  "Doyel Labs LLC is a custom software studio in Casper, Wyoming. We build " +
  "websites, payroll workspaces, internal tools, and bespoke programs for " +
  "small operators through enterprise clients. Tell us what your business " +
  "needs; we'll build it, ship it in weeks, and stay on to keep it running.";

export const metadata: Metadata = {
  title: {
    default: `${site.company} — Custom software, websites, and business tools`,
    template: `%s · ${site.companyShort}`,
  },
  description: searchDescription,
  keywords: [
    "custom software development",
    "custom software agency",
    "website development",
    "web application development",
    "internal tools",
    "business dashboard",
    "client portal",
    "customer portal",
    "payroll workspace",
    "API integrations",
    "small business software",
    "enterprise software",
    "mom and pop software",
    "AI-native software agency",
    "Casper Wyoming software",
    "Doyel Labs",
  ],
  authors: [{ name: site.company, url: `https://${site.domain}/` }],
  creator: site.company,
  publisher: site.company,
  metadataBase: new URL(`https://${site.domain}`),
  alternates: {
    canonical: `https://${site.domain}/`,
    types: {
      "application/rss+xml": [
        {
          url: `https://${site.domain}/changelog/rss.xml`,
          title: `${site.company} — Changelog`,
        },
      ],
    },
  },
  openGraph: {
    title: `${site.company} — Custom software for small operators through enterprises`,
    description: searchDescription,
    type: "website",
    url: `https://${site.domain}/`,
    siteName: site.company,
    locale: "en_US",
    images: [
      {
        url: `https://${site.domain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${site.company} — the software your business runs on`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.company} — Custom software studio`,
    description: searchDescription,
    images: [`https://${site.domain}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  applicationName: site.company,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f14",
  colorScheme: "dark",
};

/**
 * Organization schema. Search engines and AI-overview crawlers use this
 * to answer "who is Doyel Labs?" — so it must state the software-studio
 * identity clearly. The `description`, `slogan`, `knowsAbout`, and
 * `hasOfferCatalog` fields drive Google's Knowledge Panel and AI
 * Overview text. Every entry is a fact, not marketing prose.
 */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `https://${site.domain}/#organization`,
  name: site.company,
  alternateName: site.companyShort,
  legalName: site.company,
  description: searchDescription,
  slogan: "The software your business runs on.",
  url: `https://${site.domain}/`,
  logo: {
    "@type": "ImageObject",
    url: `https://${site.domain}/apple-touch-icon.png`,
    width: 180,
    height: 180,
  },
  image: `https://${site.domain}/opengraph-image`,
  email: site.supportEmail,
  telephone: site.phoneHref.replace("tel:", ""),
  foundingDate: "2026-09",
  founder: {
    "@type": "Person",
    name: "Blake Doyel",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casper",
    addressRegion: "WY",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  serviceArea: {
    "@type": "Country",
    name: "United States",
  },
  knowsAbout: [
    "Custom software development",
    "Web application development",
    "Website development",
    "Marketing site design",
    "Internal tool development",
    "Business dashboard development",
    "Client portal development",
    "Customer portal development",
    "Admin console development",
    "API integrations",
    "Data pipelines",
    "ETL and reporting",
    "Payroll workspace development",
    "E-commerce integration",
    "Payment integration",
    "Software maintenance",
    "AI-assisted software development",
    "Static site generation",
    "Cloudflare Workers development",
    "Next.js development",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Doyel Labs services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom software development",
          description:
            "Bespoke web applications, dashboards, portals, integrations, and internal tools for any industry — from mom-and-pop operators through enterprises. Priced per project, delivered under a written scope.",
          url: `https://${site.domain}/services/`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Website development",
          description:
            "Fast, accessible marketing sites on your own domain with schema.org markup, forms wired to your own inbox, and mobile-first design. For any business.",
          url: `https://${site.domain}/services/websites/`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Payroll workspace development",
          description:
            "Custom pay-run workspaces built for how your business actually pays people — day-rate, hourly + overtime, salaried, tipped, per-diem, or any mix.",
          url: `https://${site.domain}/services/payroll/`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Software maintenance and support",
          description:
            "Monthly retainer for ongoing improvements, bug fixes, dependency updates, and priority operator support on software Doyel Labs builds.",
          url: `https://${site.domain}/services/`,
        },
      },
    ],
  },
  sameAs: [`https://${site.domain}/`],
};

/**
 * WebSite schema. Declares the site itself as a discrete entity so
 * Google renders a proper sitelink search box and understands the
 * relationship between pages. Points back to the Organization @id.
 */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `https://${site.domain}/#website`,
  url: `https://${site.domain}/`,
  name: site.company,
  description: searchDescription,
  publisher: { "@id": `https://${site.domain}/#organization` },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Structured data. JSON-LD is not executable so it is exempt from
         * CSP `script-src`. We emit two graphs: Organization (who we are)
         * and WebSite (how the site is structured). Both are static and
         * built from `site.ts`. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-line2 focus:bg-bg focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
