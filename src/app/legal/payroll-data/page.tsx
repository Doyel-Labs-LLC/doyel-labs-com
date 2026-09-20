import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = { title: "Payroll data processing" };

export default function PayrollDataPage() {
  const doc = loadLegal("payroll-data");
  return <LegalPage doc={doc} />;
}
