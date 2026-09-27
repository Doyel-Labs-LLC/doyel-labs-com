import type { Config } from "tailwindcss";

/**
 * Tokens are documented in DESIGN.md and PROMPT.md. Keep them in sync.
 *
 * v12: warm cream canvas, deep teal accent (the logo's cyan, deepened for
 * AA contrast), amber for warmth. Fraunces for headings, Figtree for
 * everything else. No monospace in the marketing UI; the system mono
 * stack is kept only for the synthetic product frames.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // v13: warm linen canvas with ivory cards and a sand band. No pure
        // white anywhere, so the page feels like paper in afternoon light.
        bg: "#f6eee2",
        surface: "#fffaf2",
        surface2: "#f1e7d8",
        // Type
        ink: "#1b1f26",
        mute: "rgba(27, 31, 38, 0.80)",
        // 0.68 alpha clears WCAG AA (4.5:1) for small text on the cream
        // canvas and on white cards (≈ #626366 on #f6eee2 ≈ 5.3:1).
        muted: "rgba(27, 31, 38, 0.68)",
        // Hairlines
        line: "rgba(27, 31, 38, 0.10)",
        line2: "rgba(27, 31, 38, 0.22)",
        // Teal accent — the logo's cyan, deepened so it passes AA as text
        // on cream (#087187 on #f6eee2 ≈ 4.9:1).
        accent: "#087187",
        accentHi: "#0b8aa3",
        // Solid-button hover / pressed: darker, so hover raises contrast.
        accentInk: "#06596a",
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
        care: "#9a6a0f",
      },
      fontFamily: {
        // `--font-display` / `--font-sans` are the self-hosted next/font
        // faces (Fraunces, Figtree) set in layout.tsx; next/font appends
        // metric-matched fallbacks to each variable.
        display: ["var(--font-display)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Cascadia Mono", "Consolas", "Menlo", "monospace"],
      },
      fontSize: {
        // Named scale (PROMPT.md §7). Headings are sentence case, Fraunces.
        display: ["64px", { lineHeight: "1.04", letterSpacing: "-0.025em", fontWeight: "500" }],
        displaySm: ["42px", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "500" }],
        h2: ["44px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "500" }],
        h2Sm: ["32px", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "500" }],
        h3: ["24px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "500" }],
        lead: ["20px", { lineHeight: "1.6" }],
        body: ["18px", { lineHeight: "1.65" }],
        small: ["16px", { lineHeight: "1.6" }],
      },
      letterSpacing: {
        eyebrow: "0.14em",
        display: "-0.01em",
        wide: "0.04em",
      },
      borderRadius: {
        card: "20px",
        panel: "32px",
      },
      maxWidth: { prose: "66ch", band: "1200px" },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
      boxShadow: {
        accent: "0 0 0 1px rgba(8, 113, 135, 0.4)",
        // Real, soft, warm-grey shadows on the light canvas.
        card: "0 1px 2px rgba(60, 44, 20, 0.05), 0 16px 40px -24px rgba(60, 44, 20, 0.28)",
        cardHover: "0 1px 2px rgba(60, 44, 20, 0.06), 0 28px 56px -28px rgba(60, 44, 20, 0.36)",
        lift: "0 2px 4px rgba(60, 44, 20, 0.06), 0 40px 80px -32px rgba(60, 44, 20, 0.40)",
        button: "0 1px 1px rgba(6, 89, 106, 0.25), 0 8px 20px -10px rgba(8, 113, 135, 0.65)",
        glow: "0 1px 2px rgba(8, 113, 135, 0.18), 0 8px 24px -12px rgba(8, 113, 135, 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
