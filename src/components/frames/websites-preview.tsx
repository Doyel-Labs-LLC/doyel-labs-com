import { ProductFrame } from "@/components/product-frame";
import { steadfastCase } from "@/lib/demo/websites";

/**
 * Website work — a browser-chrome preview labeled with the real domain
 * we build against. The interior is a wireframe of the SteadFast home
 * page (hero, hero copy, three-band services, footer address). No
 * screenshots.
 */
export function WebsiteSteadfastFrame() {
  return (
    <ProductFrame
      screen="Website / Home"
      caption={`${steadfastCase.domain} — live at ${steadfastCase.liveUrl.replace(/^https?:\/\//, "")}`}
    >
      <div className="pt-6">
        {/* Fake browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-line pb-3">
          <span className="h-2 w-2 rounded-full bg-line2" />
          <span className="h-2 w-2 rounded-full bg-line2" />
          <span className="h-2 w-2 rounded-full bg-line2" />
          <span className="ml-3 flex-1 truncate border border-line px-3 py-1 font-mono text-[11px] text-mute">
            https://www.{steadfastCase.domain}/
          </span>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* Hero copy */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Rural route administration
            </p>
            <p className="mt-2 text-[22px] font-semibold leading-tight text-ink">
              Federally awarded contract delivery for rural America.
            </p>
            <p className="mt-3 text-[13px] text-mute">
              A Montana-headquartered contract delivery company. USPS route
              administration, owner-operator recruiting, and a compliance
              workspace for pay runs.
            </p>
            <div className="mt-4 flex gap-2">
              <span className="border border-line2 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-ink">
                Contractor inquiry
              </span>
              <span className="border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-mute">
                About
              </span>
            </div>
          </div>

          {/* Right: video/hero placeholder */}
          <div className="relative aspect-[16/9] overflow-hidden border border-line bg-black">
            <div className="absolute inset-0 [background-image:radial-gradient(circle_at_50%_30%,rgba(240,240,250,0.06),transparent_60%)]" />
            <span className="absolute left-3 top-3 frame-label text-muted">
              Hero video · muted loop
            </span>
            <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-wide text-muted">
              LCP &lt; 2.0s
            </span>
          </div>
        </div>

        {/* Three-band services strip */}
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {[
            { label: "Route administration", body: "USPS CDS agreements, revision tracking" },
            { label: "Independent operators", body: "Recruit, onboard, and pay under SCA" },
            { label: "Operator workspace", body: "Password-gated payroll + audit log" },
          ].map((c) => (
            <div key={c.label} className="border border-line p-3">
              <p className="font-mono text-[10px] uppercase tracking-wide text-mute">
                {c.label}
              </p>
              <p className="mt-1 text-[12px] text-mute">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Footer address */}
        <div className="mt-6 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-wide text-muted">
          301 E 1st Ave · Plentywood, MT 59254 · (813) 686-4559
        </div>
      </div>
    </ProductFrame>
  );
}
