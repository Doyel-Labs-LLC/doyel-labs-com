import Image from "next/image";
import type { ReactNode } from "react";
import { steadfastTestimonial } from "@/lib/testimonials";

/**
 * A named client quote block. Every quote MUST have a real, named
 * attribution — no anonymous "one client told us" copy. Placement:
 * inside the case study for that client, or as a proof band on the
 * home / services / work pages.
 *
 * Two rendering modes:
 *   - Pass `children` for a single short quote (excerpt).
 *   - Pass `paragraphs` for a full multi-paragraph testimonial.
 *
 * Do not use this component without written permission from the
 * quoted party on file.
 */
export function Quote({
  children,
  paragraphs,
  attribution,
  role,
  company,
  logo,
  companyUrl,
  size = "regular",
}: {
  /** A single quote (short excerpt). Use for tight surfaces. */
  children?: ReactNode;
  /** Full multi-paragraph testimonial. Use on case studies. */
  paragraphs?: string[];
  attribution: string;
  role?: string;
  company?: string;
  logo?: string;
  companyUrl?: string;
  size?: "regular" | "large";
}) {
  const quoteSize =
    size === "large"
      ? "text-[20px] leading-[1.55] md:text-[24px]"
      : "text-[18px] leading-[1.55] md:text-[22px]";
  return (
    <figure className="rounded-xl border-l-2 border-accent bg-surface p-6 md:p-8">
      {paragraphs ? (
        <blockquote className={`max-w-prose text-ink ${quoteSize}`}>
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "" : "mt-4"}>
              {i === 0 ? (
                <span aria-hidden="true" className="mr-2 select-none text-accent">
                  "
                </span>
              ) : null}
              {p}
              {i === paragraphs.length - 1 ? (
                <span aria-hidden="true" className="ml-1 select-none text-accent">
                  "
                </span>
              ) : null}
            </p>
          ))}
        </blockquote>
      ) : (
        <blockquote className={`max-w-prose text-ink ${quoteSize}`}>
          <span aria-hidden="true" className="mr-2 select-none text-accent">
            "
          </span>
          {children}
          <span aria-hidden="true" className="ml-1 select-none text-accent">
            "
          </span>
        </blockquote>
      )}
      <figcaption className="mt-6 flex flex-wrap items-center gap-4">
        {logo ? (
          <Image
            src={logo}
            alt=""
            width={40}
            height={40}
            className="shrink-0"
          />
        ) : null}
        <div>
          <p className="text-[14px] font-semibold text-ink">{attribution}</p>
          {role || company ? (
            <p className="mt-1 text-sm text-muted">
              {role}
              {role && company ? " · " : ""}
              {company && companyUrl ? (
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accentHi"
                >
                  {company}
                </a>
              ) : company ? (
                company
              ) : null}
            </p>
          ) : null}
        </div>
      </figcaption>
      {company === steadfastTestimonial.company || attribution === steadfastTestimonial.attribution ? (
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Doyel Labs and SteadFast share an owner. This is not an independent endorsement.
        </p>
      ) : null}
    </figure>
  );
}
