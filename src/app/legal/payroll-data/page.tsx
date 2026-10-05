import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { loadLegal } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Payroll data processing",
  description:
    "The data map for payroll workspaces Doyel Labs builds: what the operator holds, what Doyel Labs holds, and what nobody holds.",
  alternates: { canonical: "https://doyel-labs.com/legal/payroll-data/" },
  openGraph: {
    title: "Payroll data processing",
    description: "What a payroll workspace holds, what Doyel Labs holds, and what nobody holds.",
    url: "https://doyel-labs.com/legal/payroll-data/",
  },
};

export default function PayrollDataPage() {
  const doc = loadLegal("payroll-data");
  return <LegalPage doc={doc} />;
}
