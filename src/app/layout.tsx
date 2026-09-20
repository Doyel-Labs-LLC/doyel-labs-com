import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${site.company} — a small software studio in Casper, Wyoming`,
    template: `%s · ${site.companyShort}`,
  },
  description:
    `${site.company} is a small software studio (Casper, Wyoming) that builds operational software with AI as its main tool. Payroll for federal service contractors, marketing sites for small operators, plus two internal programs.`,
  metadataBase: new URL(`https://${site.domain}`),
  alternates: { canonical: `https://${site.domain}/` },
  openGraph: {
    title: site.company,
    description:
      "A small software studio in Casper, Wyoming. We build payroll software for federal service contractors, websites for small operators, and two internal programs.",
    type: "website",
    url: `https://${site.domain}/`,
    siteName: site.company,
  },
  robots: { index: true, follow: true },
  applicationName: site.company,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f14",
  colorScheme: "dark",
};

/** Organization schema for search engines. Facts only, no marketing prose. */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.company,
  legalName: site.company,
  url: `https://${site.domain}/`,
  email: site.supportEmail,
  telephone: site.phoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casper",
    addressRegion: "WY",
    addressCountry: "US",
  },
  sameAs: [`https://${site.domain}/`],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Organization JSON-LD. Emitted inline as `application/ld+json` so
         * it does not count against the CSP `script-src` (structured data
         * is not executable). Static content, no user input. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
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
