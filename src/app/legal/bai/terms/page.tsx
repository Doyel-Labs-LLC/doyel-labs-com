import type { Metadata } from "next";
import { LegalPage, type LegalNavItem } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";
import { site } from "@/lib/site";

/**
 * `/legal/bai/terms/` — the BAI-Desk-specific Terms of Use.
 *
 * Published as a public, direct-linked legal document primarily so
 * Alpaca compliance can review Doyel Labs' terms as part of the
 * broker-app onboarding. Kept `noindex, follow` so it stays out of
 * Google's index during BAI's private-testing period; users of the
 * app reach it via an in-app link, and Alpaca reviewers reach it
 * via the direct URL we give them.
 *
 * Also intentionally lives at the URL Alpaca will receive
 * verbatim — do not rename this route without updating the app
 * submission.
 */

export const metadata: Metadata = {
  title: "Terms of Use — BAI Desk",
  description:
    "Terms of Use for BAI Desk, a Doyel Labs LLC product. Governing law: Wyoming. Doyel Labs is not a broker-dealer, investment adviser, or fiduciary. BAI Desk connects to your own brokerage account at Alpaca (or another supported broker); the broker holds your money and executes trades.",
  alternates: { canonical: `https://${site.domain}/legal/bai/terms/` },
  robots: { index: false, follow: true },
};

/** Product-scoped side-nav — Terms + Privacy only. */
const BAI_LEGAL_NAV: LegalNavItem[] = [
  { slug: "bai-terms", label: "BAI Terms", href: "/legal/bai/terms/" },
  { slug: "bai-privacy", label: "BAI Privacy", href: "/legal/bai/privacy/" },
];

export default function BaiTermsPage() {
  const doc = loadLegal("bai-terms");
  return (
    <LegalPage
      doc={doc}
      nav={BAI_LEGAL_NAV}
      breadcrumbs={[
        { name: "Legal", href: "/legal/terms/" },
        { name: "BAI Desk", href: "/legal/bai/terms/" },
        { name: "Terms of Use", href: "/legal/bai/terms/" },
      ]}
      lead="The legally binding Terms of Use for BAI Desk — a Doyel Labs product that runs on your own computer and connects to your own brokerage account. Doyel Labs is not a broker-dealer, investment adviser, or fiduciary; your broker holds your money and executes your trades."
    />
  );
}
