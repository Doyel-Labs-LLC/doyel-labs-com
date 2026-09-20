import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = { title: "BAI Risk Disclosure" };

export default function RiskPage() {
  const doc = loadLegal("risk");
  return <LegalPage doc={doc} />;
}
