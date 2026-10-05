import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Payroll data processing",
  description:
    "What the operator and Doyel Labs each hold when you use payroll software we build. Written so an auditor or bookkeeper can see which questions to ask.",
  alternates: { canonical: "/legal/payroll-data/" },
  openGraph: {
    title: "Payroll data processing",
    description: "What the operator and Doyel Labs each hold when you use payroll software we build.",
    url: "/legal/payroll-data/",
  },
};

export default function PayrollDataPage() {
  const doc = loadLegal("payroll-data");
  return <LegalPage doc={doc} />;
}
