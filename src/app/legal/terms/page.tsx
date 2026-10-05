import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms under which Doyel Labs LLC provides its software and services. Read together with the privacy policy and any project-specific rider.",
  alternates: { canonical: "https://doyel-labs.com/legal/terms/" },
  openGraph: {
    title: "Terms of Service",
    description: "The terms under which Doyel Labs LLC provides its software and services.",
    url: "https://doyel-labs.com/legal/terms/",
  },
};

export default function TermsPage() {
  const doc = loadLegal("terms");
  return <LegalPage doc={doc} />;
}
