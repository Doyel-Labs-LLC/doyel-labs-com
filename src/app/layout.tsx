import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { promise, site } from "@/lib/site";
import { carePlan, customSoftware, websiteBuild } from "@/lib/offer";

/**
 * Brand typefaces, self-hosted via next/font from `src/fonts/` (both SIL
 * OFL). No runtime request to a font CDN, so no third-party network I/O
 * and no CSP change. Fraunces (soft axis) sets every heading; Figtree
 * sets everything else. The CSS variables feed `tailwind.config.ts`.
 */
const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-soft.woff2", style: "normal" },
    { path: "../fonts/fraunces-latin-wght-italic.woff2", style: "italic" },
  ],
  weight: "300 900",
  display: "swap",
  variable: "--font-display",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});
const figtree = localFont({
  src: "../fonts/figtree-latin-wght.woff2",
  weight: "300 900",
  display: "swap",
  variable: "--font-sans",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

/** Search-facing description. One plain sentence about what Doyel Labs
 * is and who it serves. Every page defers to this framing. */
const searchDescription =
  `${site.company} builds websites and custom software for businesses, from ${site.city}. ` +
  `A five-page website is ${websiteBuild.priceLabel}, live in ${websiteBuild.turnaround}. ` +
  `Custom software is quoted in writing. You talk to a person, not a chatbot.`;

export const metadata: Metadata = {
  title: {
    default: `${site.company} — Websites and custom software. Real people build it.`,
    template: `%s · ${site.companyShort}`,
  },
  description: searchDescription,
  keywords: [
    "website design",
    "small business website",
    "custom software development",
    "internal tools",
    "payroll workspace",
    "Casper Wyoming web design",
    "Doyel Labs",
  ],
  authors: [{ name: site.company, url: `https://${site.domain}/` }],
  creator: site.company,
  publisher: site.company,
  metadataBase: new URL(`https://${site.domain}`),
  alternates: { canonical: `https://${site.domain}/` },
  openGraph: {
    title: `${site.company} — Real people build it. A real person answers.`,
    description: searchDescription,
    type: "website",
    url: `https://${site.domain}/`,
    siteName: site.company,
    locale: "en_US",
    images: [{ url: `https://${site.domain}/opengraph-image`, width: 1200, height: 630, alt: `${site.company}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.company} — Websites and custom software`,
    description: searchDescription,
    images: [`https://${site.domain}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  applicationName: site.company,
  manifest: "/manifest.webmanifest",
  // Google Search only shows favicons that are a multiple of 48px, so the
  // 48/96/192/512 PNGs come first. The .ico carries 16/32/48.
  icons: {
    icon: [
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48 32x32 16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6eee2",
  colorScheme: "light",
};

/** Organization schema. Every value is a fact from site.ts / offer.ts. */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `https://${site.domain}/#organization`,
  name: site.company,
  alternateName: site.companyShort,
  legalName: site.company,
  description: searchDescription,
  slogan: promise.headline,
  url: `https://${site.domain}/`,
  logo: { "@type": "ImageObject", url: `https://${site.domain}/apple-touch-icon.png`, width: 180, height: 180 },
  image: `https://${site.domain}/opengraph-image`,
  email: site.supportEmail,
  telephone: site.phoneHref.replace("tel:", ""),
  foundingDate: "2026-09",
  founder: { "@type": "Person", "@id": `https://${site.domain}/about/#founder`, name: site.founder, url: `https://${site.domain}/about/` },
  address: { "@type": "PostalAddress", addressLocality: "Casper", addressRegion: "WY", addressCountry: "US" },
  areaServed: { "@type": "Country", name: "United States" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  knowsAbout: ["Website development", "Custom software development", "Internal tools", "Payroll workspaces", "API integrations", "Software maintenance"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Doyel Labs services",
    itemListElement: [
      {
        "@type": "Offer",
        price: websiteBuild.price,
        priceCurrency: "USD",
        itemOffered: { "@type": "Service", name: websiteBuild.name, url: `https://${site.domain}/websites/` },
      },
      {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: { "@type": "UnitPriceSpecification", price: carePlan.price, priceCurrency: "USD", unitCode: "MON" },
        itemOffered: { "@type": "Service", name: carePlan.name, url: `https://${site.domain}/websites/#care` },
      },
      {
        "@type": "Offer",
        priceCurrency: "USD",
        priceSpecification: { "@type": "PriceSpecification", minPrice: customSoftware.from, priceCurrency: "USD" },
        itemOffered: { "@type": "Service", name: customSoftware.name, url: `https://${site.domain}/software/` },
      },
    ],
  },
};

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
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border focus:border-line2 focus:bg-surface focus:px-5 focus:py-2.5 focus:text-[15px] focus:font-semibold focus:text-ink focus:shadow-card"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
