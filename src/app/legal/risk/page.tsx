import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Risk disclosure — BAI program",
  description:
    "Risk disclosure for the BAI trading-desk program built by Doyel Labs. BAI is one of several programs Doyel Labs ships; the company itself builds custom software, websites, and payroll workspaces.",
  alternates: { canonical: "/legal/risk/" },
  robots: { index: true, follow: true },
};

export default function RiskPage() {
  const doc = loadLegal("risk");
  return <LegalPage doc={doc} />;
}
