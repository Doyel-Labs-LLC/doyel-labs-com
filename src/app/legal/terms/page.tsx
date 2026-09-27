import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/legal/terms/" },
};

export default function TermsPage() {
  const doc = loadLegal("terms");
  return <LegalPage doc={doc} />;
}
