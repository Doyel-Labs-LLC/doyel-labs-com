import Image from "next/image";
import { steadfastCase } from "@/lib/demo/websites";
import { demoContractors, scaFloor } from "@/lib/demo/payroll";

/**
 * Layered product preview for the home hero.
 *
 * Composition:
 *   - Primary: a browser-chrome frame with the SteadFast marketing-site
 *     screenshot (proves we ship real, live marketing sites)
 *   - Secondary: a small SCA compliance card floated behind the primary
 *     and offset up-right (proves the range: same team also ships
 *     compliance-grade internal tools)
 *
 * On mobile (<md) the secondary card is hidden and only the primary
 * browser frame renders, so nothing overlaps or clips.
 *
 * All assets are real: the SteadFast screenshot is the actual live
 * site, the SCA numbers come from `demoContractors[0]` which is the
 * same fixture the /services/payroll page uses.
 */
export function HeroPreview() {
  const c = demoContractors[0];
  const floor = scaFloor(c.minWage, c.hwFringe);
  const ok = c.dayRate >= floor;

  return (
    <div className="hero-preview relative w-full">
      {/* Secondary card — SCA compliance snapshot, hidden on mobile */}
      <div className="pointer-events-none absolute -right-2 -top-6 z-10 hidden w-[220px] md:block lg:-right-6 lg:w-[260px]">
        <div className="border border-line bg-[#12181f]/95 p-4 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] uppercase tracking-eyebrow text-accent">
              SCA compliance
            </p>
            <span
              className={`inline-flex h-2 w-2 rounded-full ${
                ok ? "bg-accent" : "bg-fall"
              }`}
              aria-hidden="true"
            />
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-wide text-muted">
            Day-rate floor
          </p>
          <p className="mt-1 text-[22px] font-semibold leading-none text-ink tabular-nums">
            {fmt(floor)}
          </p>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-wide text-muted">
            Draft rate
          </p>
          <p className="mt-1 text-[16px] font-semibold leading-none text-ink tabular-nums">
            {fmt(c.dayRate)}
          </p>
          <div className="mt-3 border-t border-line pt-3">
            <p
              className={`font-mono text-[9px] uppercase tracking-wide ${
                ok ? "text-accent" : "text-fall"
              }`}
            >
              {ok ? "✓ Cleared — stub can issue" : "Blocked — under floor"}
            </p>
          </div>
        </div>
      </div>

      {/* Primary: browser-chrome frame with the live SteadFast screenshot */}
      <figure className="not-prose relative z-0">
        <div className="overflow-hidden border border-line bg-surface shadow-xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 border-b border-line px-3 py-2 md:gap-2 md:px-4 md:py-2.5">
            <span className="h-2 w-2 rounded-full bg-line2 md:h-2.5 md:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-line2 md:h-2.5 md:w-2.5" />
            <span className="h-2 w-2 rounded-full bg-line2 md:h-2.5 md:w-2.5" />
            <span className="ml-2 flex-1 truncate rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-mute md:ml-3 md:px-3 md:py-1 md:text-[11px]">
              https://www.{steadfastCase.domain}/contractors.html
            </span>
            <span className="hidden font-mono text-[9px] uppercase tracking-wide text-accent md:inline">
              ● Live
            </span>
          </div>
          <div className="relative">
            <Image
              src="/media/websites/steadfast-contractors-v2.jpg"
              alt={`Live site we built for ${steadfastCase.name}, at ${steadfastCase.domain}.`}
              width={1600}
              height={900}
              priority
              sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
        <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-eyebrow text-muted md:text-[10px]">
          <span>Client · {steadfastCase.shortName}</span>
          <span>Live since 2026 · Built by Doyel Labs</span>
        </figcaption>
      </figure>
    </div>
  );
}

function fmt(n: number) {
  return `$${n.toFixed(2)}`;
}
