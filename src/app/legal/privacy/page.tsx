import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Doyel Labs LLC collects, why, how long we keep it, who else touches it, and how to make us delete it.",
  alternates: { canonical: "https://doyel-labs.com/legal/privacy/" },
  openGraph: {
    title: "Privacy Policy",
    description: "What Doyel Labs LLC collects, why, how long we keep it, and how to make us delete it.",
    url: "https://doyel-labs.com/legal/privacy/",
  },
};

export default function PrivacyPage() {
  const doc = loadLegal("privacy");
  return <LegalPage doc={doc} />;
}
