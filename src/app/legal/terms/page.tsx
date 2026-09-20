import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  const doc = loadLegal("terms");
  return <LegalPage doc={doc} />;
}
