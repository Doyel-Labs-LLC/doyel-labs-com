import { renderOgCard, ogSize, ogContentType } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  "Doyel Labs — Industries. If your business runs on software, we can build it. Any industry, any size.";

export default function Image() {
  return renderOgCard({
    eyebrow: "INDUSTRIES · DOYEL LABS",
    segments: [{ text: "Any business," }, { text: "any industry.", accent: true }],
  });
}
