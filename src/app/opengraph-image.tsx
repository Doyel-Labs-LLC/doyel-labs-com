import { ImageResponse } from "next/og";

// Static OG image for the root and every page (unless a route overrides).
// Rendered once at build time; Cloudflare Pages serves the resulting PNG.
//
// Satori (which powers ImageResponse) requires:
//   - every div with multiple children to have explicit `display: flex`
//   - no mixed text + element children in the same div
// The layout below is structured to satisfy both.

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Doyel Labs — the software your business runs on. Casper, Wyoming.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#0a0f14",
          color: "#f0f0fa",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header: logo mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "84px",
              height: "84px",
              gap: "6px",
            }}
          >
            <div style={{ width: "39px", height: "39px", borderRadius: "9px", background: "#3f444b" }} />
            <div style={{ width: "39px", height: "39px", borderRadius: "9px", background: "#878a91" }} />
            <div style={{ width: "39px", height: "39px", borderRadius: "9px", background: "#c7cad0" }} />
            <div style={{ width: "39px", height: "39px", borderRadius: "9px", background: "#10c7eb" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#f0f0fa",
              }}
            >
              Doyel Labs
            </div>
            <div
              style={{
                marginTop: "4px",
                fontSize: "16px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(240, 240, 250, 0.44)",
              }}
            >
              Casper, Wyoming
            </div>
          </div>
        </div>

        {/* Center: tagline (built from flex spans to satisfy Satori) */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: "80px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              maxWidth: "1050px",
            }}
          >
            <span style={{ marginRight: "24px" }}>The</span>
            <span style={{ color: "#10c7eb", marginRight: "24px" }}>software</span>
            <span>your business runs on.</span>
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "24px",
              lineHeight: 1.4,
              color: "rgba(240, 240, 250, 0.66)",
              maxWidth: "950px",
            }}
          >
            Payroll, marketing sites, internal tools, custom programs. Shipped in weeks.
          </div>
        </div>

        {/* Bottom: URL + section list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            borderTop: "1px solid rgba(240, 240, 250, 0.14)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "monospace",
              fontSize: "16px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(240, 240, 250, 0.66)",
            }}
          >
            <div style={{ display: "flex" }}>doyel-labs.com</div>
            <div style={{ display: "flex" }}>Services · Work · Company · Contact</div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
