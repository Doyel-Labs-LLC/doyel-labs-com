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
        // v14: a deeper vellum canvas — warmer and more "material" than the
        // old linen, and off the generated-cream tell. Ivory cards, sand band.
        bg: "#efe6d5",
        surface: "#fbf6ec",
        surface2: "#e7dbc4",
        // Type
        ink: "#191b1e",
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
        // Deepest teal — reserved for large Fraunces display accents.
        accentDeep: "#06485a",
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
        // v14: larger, lower-weight display so Fraunces reads high-contrast
        // and editorial — the single boldest move on the page.
        display: ["80px", { lineHeight: "0.98", letterSpacing: "-0.03em", fontWeight: "440" }],
        displaySm: ["46px", { lineHeight: "1.04", letterSpacing: "-0.025em", fontWeight: "450" }],
        h2: ["48px", { lineHeight: "1.06", letterSpacing: "-0.025em", fontWeight: "450" }],
        h2Sm: ["33px", { lineHeight: "1.12", letterSpacing: "-0.02em", fontWeight: "460" }],
        h3: ["25px", { lineHeight: "1.22", letterSpacing: "-0.012em", fontWeight: "480" }],
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
