import type { ReactNode } from "react";
import { steadfastCase } from "@/lib/demo/websites";

/** Minimal browser chrome around a real screenshot. */
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface shadow-lift">
      <div className="flex items-center gap-2 border-b border-line bg-surface2/60 px-4 py-3">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#e8a89b]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#f2cf87]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#a9cf9f]" />
        <span className="ml-3 flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[12px] text-mute">
          <svg aria-hidden="true" viewBox="0 0 16 16" width="11" height="11" className="shrink-0 text-rise">
            <path d="M5 7V5a3 3 0 016 0v2M4 7h8v6H4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <span className="truncate" translate="no">
            {url}
          </span>
        </span>
        <span className="hidden items-center gap-1.5 text-[12px] font-semibold text-rise md:inline-flex">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-rise" />
          Live
        </span>
      </div>
      {children}
    </div>
  );
}

/** Real screenshot of steadfasttransportationinc.com in a browser frame. */
export function WebsiteSteadfastFrame() {
  return (
    <figure className="not-prose">
      <BrowserFrame url={`www.${steadfastCase.domain}`}>
        <img
          src="/media/websites/steadfast-hero-v2-1120.webp"
          alt={`Screenshot of ${steadfastCase.domain} home page — a rural transportation company site built by Doyel Labs.`}
          width={1120}
          height={630}
          decoding="sync"
          fetchPriority="high"
          className="block h-auto w-full"
        />
      </BrowserFrame>
      <figcaption className="mt-4 text-[14px] text-muted">
        Built for {steadfastCase.shortName}, a company owned by Doyel Labs&apos; founder. Live since 2026.
      </figcaption>
    </figure>
  );
}
