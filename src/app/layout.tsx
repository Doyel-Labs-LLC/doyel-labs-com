import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${site.company} — operational software for people who cannot afford a wrong payment or a silent order`,
    template: `%s · ${site.companyShort}`,
  },
  description:
    `${site.company} (Casper, Wyoming) builds operational software for small companies and independent operators — ` +
    "payroll and websites first — and internal programs (BAI, ConnectionLoop) that stay on your machine when they can spend.",
  metadataBase: new URL(`https://${site.domain}`),
  alternates: { canonical: `https://${site.domain}/` },
  openGraph: {
    title: site.company,
    description:
      "Software that moves money under your rules. Payroll and websites for small operators, plus internal programs that fail closed.",
    type: "website",
    url: `https://${site.domain}/`,
    siteName: site.company,
  },
  robots: { index: true, follow: true },
  applicationName: site.company,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
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
