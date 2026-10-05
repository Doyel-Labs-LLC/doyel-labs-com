import type { Config } from "tailwindcss";

/**
 * Tokens are documented in DESIGN.md and PROMPT.md. Keep them in sync.
 *
 * The palette is the v10 warm light canvas. The logo mark keeps its own
 * cyan; text and buttons use a deeper teal that stays WCAG AA on cream.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // v10: warm light canvas. Cream, not white, so the page feels like
        // paper rather than a form. Ink is a warm near-black.
        bg: "#faf7f2",
        surface: "#ffffff",
        surface2: "#f3efe8",
        // Type
        ink: "#1b1f26",
        mute: "rgba(27, 31, 38, 0.80)",
        // 0.68 alpha clears WCAG AA (4.5:1) for small text on the cream
        // canvas and on white cards (≈ #626366 on #faf7f2 ≈ 5.3:1).
        muted: "rgba(27, 31, 38, 0.68)",
        // Hairlines
        line: "rgba(27, 31, 38, 0.10)",
        line2: "rgba(27, 31, 38, 0.22)",
        // Teal accent — the logo's cyan, deepened so it passes AA as text
        // on cream (#087187 on #faf7f2 ≈ 4.9:1).
        accent: "#087187",
        // Hover / pressed teal. Darker than `accent` so small text stays
        // above 4.5:1 on cream (#065e70 on #faf7f2 ≈ 6.9:1). The previous
        // #0b8aa3 lightened on hover and dropped to about 3.8:1.
        accentHi: "#065e70",
        accentDim: "rgba(8, 113, 135, 0.35)",
        accentSoft: "rgba(8, 113, 135, 0.08)",
        // Warm highlight — used for illustration fills and one soft band
        // wash. Never for text.
        warm: "#f2b455",
        warmSoft: "rgba(242, 180, 85, 0.16)",
        // Icon palette (the physical mark; unchanged)
        iconDark: "#3f444b",
        iconMid: "#878a91",
        iconLight: "#c7cad0",
        iconCyan: "#10c7eb",
        // Semantic (light-safe)
        rise: "#1f8f5f",
        fall: "#c8434f",
        // Amber status text. #8a5e0c on cream is about 5.3:1; #9a6a0f was 4.4:1.
        care: "#8a5e0c",
      },
      fontFamily: {
        // `--font-sans` / `--font-mono` are the self-hosted next/font faces
        // (Inter, JetBrains Mono) set in layout.tsx; the rest are fallbacks
        // for the pre-hydration flash and any font-load failure.
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "Cascadia Mono",
          "Consolas",
          "ui-monospace",
          "monospace",
        ],
      },
      fontSize: {
        // Named scale (PROMPT.md §7). Headings are sentence case.
        display: ["56px", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "600" }],
        displaySm: ["38px", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "600" }],
        h2: ["36px", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "600" }],
        h2Sm: ["28px", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
        h3: ["22px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        body: ["17px", { lineHeight: "1.65" }],
        small: ["15px", { lineHeight: "1.55" }],
      },
      letterSpacing: {
        eyebrow: "0.18em",
        display: "-0.01em",
        wide: "0.06em",
      },
      maxWidth: { prose: "68ch", band: "1200px" },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      boxShadow: {
        accent: "0 0 0 1px rgba(8, 113, 135, 0.4)",
        // Real, soft shadows on the light canvas.
        card: "0 1px 2px rgba(27, 31, 38, 0.05), 0 12px 32px -20px rgba(27, 31, 38, 0.28)",
        cardHover: "0 1px 2px rgba(27, 31, 38, 0.06), 0 22px 48px -22px rgba(27, 31, 38, 0.32)",
        glow: "0 1px 2px rgba(8, 113, 135, 0.18), 0 8px 24px -12px rgba(8, 113, 135, 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
