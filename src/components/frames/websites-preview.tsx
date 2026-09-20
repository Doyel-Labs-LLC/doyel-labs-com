import Image from "next/image";
import { steadfastCase } from "@/lib/demo/websites";

/**
 * Real-screenshot preview of steadfasttransportationinc.com wrapped in a
 * minimal browser-chrome frame. The screenshot lives at
 * `/public/media/websites/steadfast-hero.png` and is 258 KB, already
 * sized for a marketing preview. `next/image` handles responsive
 * sizing; the outer chrome is a hairline card.
 */
export function WebsiteSteadfastFrame() {
  return (
    <figure className="not-prose">
      <div className="overflow-hidden border border-line bg-surface">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
          <span className="h-2.5 w-2.5 rounded-full bg-line2" />
          <span className="ml-3 flex-1 truncate rounded-full border border-line px-3 py-1 font-mono text-[11px] text-mute">
            https://www.{steadfastCase.domain}/
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-wide text-accent md:inline">
            Live
          </span>
        </div>
        {/* Screenshot */}
        <div className="relative">
          <Image
            src="/media/websites/steadfast-hero.jpg"
            alt={`Screenshot of ${steadfastCase.domain} home page — a rural transportation company site built by Doyel Labs.`}
            width={1600}
            height={938}
            className="h-auto w-full"
            priority={false}
          />
        </div>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wide text-muted">
        <span>{steadfastCase.domain}</span>
        <span>Built by Doyel Labs · Live since 2026</span>
      </figcaption>
    </figure>
  );
}
