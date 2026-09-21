import type { Metadata } from "next";
import { LegalPage, type LegalNavItem } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";
import { site } from "@/lib/site";

/**
 * `/legal/bai/privacy/` — the BAI-Desk-specific Privacy Policy.
 *
 * Same rationale as `/legal/bai/terms/`. Published for direct link
 * consumption by Alpaca compliance and by users reaching it through
 * the in-app link. `noindex, follow` keeps it out of Google's index
 * during BAI's private-testing period.
 */

export const metadata: Metadata = {
  title: "Privacy Policy — BAI Desk",
  description:
    "Privacy Policy for BAI Desk, a Doyel Labs LLC product. BAI Desk runs on your computer; your broker credentials, trading history, and configuration stay on your device. Doyel Labs does not have a server that stores your trades or holdings.",
  alternates: { canonical: `https://${site.domain}/legal/bai/privacy/` },
  robots: { index: false, follow: true },
  openGraph: {
    title: "BAI Desk — Privacy Policy | Doyel Labs",
    description:
      "Privacy Policy for BAI Desk. Your broker credentials and trading history stay on your device. Doyel Labs does not have a server that stores your trades.",
    url: `https://${site.domain}/legal/bai/privacy/`,
    type: "article",
    images: [
      {
        url: `https://${site.domain}/media/bai/bai-hero.jpg`,
        width: 1024,
        height: 576,
        alt: "BAI Desk — an autonomous trading desk by Doyel Labs",
      },
    ],
  },
};

const BAI_LEGAL_NAV: LegalNavItem[] = [
  { slug: "bai-terms", label: "BAI Terms", href: "/legal/bai/terms/" },
  { slug: "bai-privacy", label: "BAI Privacy", href: "/legal/bai/privacy/" },
];

export default function BaiPrivacyPage() {
  const doc = loadLegal("bai-privacy");
  return (
    <LegalPage
      doc={doc}
      nav={BAI_LEGAL_NAV}
      breadcrumbs={[
        { name: "Legal", href: "/legal/terms/" },
        { name: "BAI Desk", href: "/legal/bai/terms/" },
        { name: "Privacy Policy", href: "/legal/bai/privacy/" },
      ]}
      lead="How Doyel Labs collects, uses, and protects information when you use BAI Desk. Short version: almost everything stays on your device. Doyel Labs does not have a server that stores your trades or your account balance."
    />
  );
}
