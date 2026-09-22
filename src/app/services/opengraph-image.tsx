import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "Doyel Labs — Services. Custom software, websites, payroll, and internal tools for any business.";

export default function Image() {
  return renderOgCard({
    eyebrow: "SERVICES · DOYEL LABS",
    segments: [{ text: "What we" }, { text: "build.", accent: true }],
  });
}
