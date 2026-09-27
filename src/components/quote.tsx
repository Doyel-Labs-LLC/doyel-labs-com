import Image from "next/image";
import type { Testimonial } from "@/lib/testimonials";

/**
 * A named client quote. The ownership disclosure is rendered inside the
 * same figure, always, so the quote can never appear without it
 * (PROMPT.md §5). Never call this a "review" or "testimonial" in copy.
 */
export function Quote({ t, full = false }: { t: Testimonial; full?: boolean }) {
  const size = full ? "text-[19px] leading-[1.55] md:text-[22px]" : "text-[18px] leading-[1.55] md:text-[21px]";
  return (
    <figure className="rounded-[3px] border-l-2 border-accent bg-accentSoft p-6 shadow-card md:p-8">
      <blockquote className={`max-w-prose text-ink ${size}`}>
        {full ? (
          t.full.map((p, i) => (
            <p key={i} className={i === 0 ? "" : "mt-4"}>
              {i === 0 ? (
                <span aria-hidden="true" className="mr-1 select-none text-accent">
                  “
                </span>
              ) : null}
              {p}
              {i === t.full.length - 1 ? (
                <span aria-hidden="true" className="ml-1 select-none text-accent">
                  ”
                </span>
              ) : null}
            </p>
          ))
        ) : (
          <p>
            <span aria-hidden="true" className="mr-1 select-none text-accent">
              “
            </span>
            {t.short}
            <span aria-hidden="true" className="ml-1 select-none text-accent">
              ”
            </span>
          </p>
        )}
      </blockquote>
      <figcaption className="mt-6 flex flex-wrap items-center gap-4">
        <Image src={t.logo} alt="" width={40} height={40} className="shrink-0" />
        <div>
          <p className="text-[14px] font-semibold text-ink">
            {t.role ? `${t.role}, ` : ""}
            {t.attribution}
          </p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
            <a href={t.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accentHi">
              {t.verify.label}
            </a>
          </p>
        </div>
      </figcaption>
      <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">{t.disclosure}</p>
    </figure>
  );
}
