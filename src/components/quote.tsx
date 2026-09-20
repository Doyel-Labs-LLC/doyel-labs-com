import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A named client quote block. Every quote MUST have a real, named
 * attribution — no anonymous "one client told us" copy. Placement:
 * inside the case study for that client, or as a "trusted by" band on
 * the home page.
 *
 * Do not use this component without written permission from the
 * quoted person on file. Attribution and title are shown alongside
 * the quote text; readers see who said it, not just what they said.
 */
export function Quote({
  children,
  attribution,
  role,
  company,
  logo,
  companyUrl,
}: {
  /** The quote itself. Keep it short — one to three sentences. */
  children: ReactNode;
  /** The person's full name, as they've approved it for public use. */
  attribution: string;
  /** Job title / role, e.g. "Owner" or "Operations Manager". */
  role?: string;
  /** Company name. */
  company?: string;
  /** Optional company logo path (in /public/). Grayscale, small. */
  logo?: string;
  /** Optional company website URL. */
  companyUrl?: string;
}) {
  return (
    <figure className="border-l-2 border-accent bg-accentSoft/40 p-6 md:p-8">
      <blockquote className="max-w-prose text-[18px] leading-[1.55] text-ink md:text-[22px]">
        <span
          aria-hidden="true"
          className="mr-2 select-none text-accent"
        >
          "
        </span>
        {children}
        <span
          aria-hidden="true"
          className="ml-1 select-none text-accent"
        >
          "
        </span>
      </blockquote>
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
          <p className="text-[14px] font-semibold text-ink">
            {attribution}
          </p>
          {role || company ? (
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted">
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
    </figure>
  );
}
