import Image from "next/image";
import { steadfastCase } from "@/lib/demo/websites";
import { response, websiteBuild } from "@/lib/offer";
import { BrowserFrame } from "@/components/frames/websites-preview";

/**
 * Home hero visual: the live SteadFast site in a browser frame, with a
 * small offer card floated over the corner on larger screens. Every
 * number on the card comes from src/lib/offer.ts.
 */
export function HeroPreview() {
  return (
    <div className="hero-preview relative w-full">
      <figure className="not-prose relative">
        <div className="relative">
          <BrowserFrame url={`www.${steadfastCase.domain}`}>
            <Image
              src="/media/websites/steadfast-contractors-v2-1120.webp"
              alt={`Live site we built for ${steadfastCase.name}, at ${steadfastCase.domain}.`}
              width={1120}
              height={630}
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </BrowserFrame>
          <OfferCard />
        </div>
        <figcaption className="mt-4 text-[14px] text-muted">
          A live site we built for {steadfastCase.shortName}, a company owned by Doyel Labs&apos; founder.
        </figcaption>
      </figure>
    </div>
  );
}

function OfferCard() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-6 bottom-6 z-10 hidden w-[232px] rounded-card border border-line bg-surface/95 p-5 shadow-lift backdrop-blur-sm md:block lg:-left-12"
    >
      <p className="text-[13px] font-semibold text-accentInk">{websiteBuild.name}</p>
      <p className="mt-2 font-display text-[34px] font-medium leading-none tracking-tight text-ink tabular-nums">
        {websiteBuild.priceLabel}
      </p>
      <p className="mt-1 text-[13px] text-muted">{websiteBuild.terms} · {websiteBuild.pages} pages</p>
      <ul className="mt-4 space-y-2 border-t border-line pt-4 text-[13px] text-ink">
        <li className="flex items-center gap-2">
          <Dot /> Live in {websiteBuild.turnaround}
        </li>
        <li className="flex items-center gap-2">
          <Dot /> A person replies {response.window}
        </li>
      </ul>
    </div>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warm" />;
}
