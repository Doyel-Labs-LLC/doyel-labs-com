import Image from "next/image";
import type { Testimonial } from "@/lib/testimonials";

/**
 * A named client quote. The ownership disclosure is rendered inside the
 * same figure, always, so the quote can never appear without it
 * (PROMPT.md §5). Never call this a "review" or "testimonial" in copy.
 */
export function Quote({ t, full = false }: { t: Testimonial; full?: boolean }) {
  const size = full
    ? "text-[21px] leading-[1.5] md:text-[26px]"
    : "text-[22px] leading-[1.45] md:text-[28px]";
  return (
    <figure className="relative overflow-hidden rounded-panel border border-line bg-surface p-7 shadow-card md:p-12">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-6 select-none font-display text-[160px] leading-none text-warmSoft md:right-10 md:text-[220px]"
      >
        &rdquo;
      </span>
      <blockquote className={`relative max-w-prose font-display font-normal tracking-[-0.01em] text-ink ${size}`}>
        {full ? (
          t.full.map((p, i) => (
            <p key={i} className={i === 0 ? "" : "mt-5"}>
              {i === 0 ? "\u201C" : null}
              {p}
              {i === t.full.length - 1 ? "\u201D" : null}
            </p>
          ))
        ) : (
          <p>
            {"\u201C"}
            {t.short}
            {"\u201D"}
          </p>
        )}
      </blockquote>
      <figcaption className="relative mt-8 flex flex-wrap items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-bg">
          <Image src={t.logo} alt="" width={32} height={32} />
        </span>
        <div>
          <p className="text-[15px] font-semibold text-ink">
            {t.role ? `${t.role}, ` : ""}
            {t.attribution}
          </p>
          <p className="mt-0.5 text-[14px] text-muted">
            <a
              href={t.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-line2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {t.verify.label}
            </a>
          </p>
        </div>
      </figcaption>
      <p className="relative mt-7 border-t border-line pt-5 text-[14px] leading-relaxed text-muted">{t.disclosure}</p>
    </figure>
  );
}