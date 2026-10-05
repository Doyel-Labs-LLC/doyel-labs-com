import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for the websites, custom software, and hosting offered by Doyel Labs LLC, a Wyoming company in Casper. BAI has its own terms.",
  alternates: { canonical: "/legal/terms/" },
  openGraph: {
    title: "Terms of Service",
    description: "Terms for the websites, custom software, and hosting offered by Doyel Labs LLC.",
    url: "/legal/terms/",
  },
};

export default function TermsPage() {
  const doc = loadLegal("terms");
  return <LegalPage doc={doc} />;
}
