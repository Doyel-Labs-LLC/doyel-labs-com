import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Doyel Labs does with information when you visit doyel-labs.com, send the contact form, or use software we build or host. Analytics and location counts match the build you are looking at.",
  alternates: { canonical: "/legal/privacy/" },
  openGraph: {
    title: "Privacy Policy",
    description:
      "What Doyel Labs does with information when you visit doyel-labs.com, send the contact form, or use software we build or host.",
    url: "/legal/privacy/",
  },
};

export default function PrivacyPage() {
  const doc = loadLegal("privacy");
  return <LegalPage doc={doc} />;
}
