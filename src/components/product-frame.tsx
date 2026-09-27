import type { ReactNode } from "react";

/**
 * ProductFrame — the only surface that carries product UI on this site.
 *
 * A rounded white card with a hairline and corner labels. The
 * body renders a real reproduction of the underlying app screen so the
 * shapes stay honest. No live values ever go inside a frame; the data
 * comes from `src/lib/demo/*.ts` and every corner reads
 * `DEMO · SYNTHETIC DATA`.
 */
export function ProductFrame({
  screen,
  caption,
  children,
  aspect,
  compact = false,
}: {
  /** The literal screen name from the underlying app (e.g. "Paystub / Live Preview"). */
  screen: string;
  /** A one-line caption below the frame. Names the screen, not marketing. */
  caption?: string;
  children: ReactNode;
  /** Optional aspect ratio class, e.g. "aspect-[16/10]". */
  aspect?: string;
  compact?: boolean;
}) {
  return (
    <figure className="not-prose">
      <div
        className={`relative overflow-hidden rounded-card border border-line bg-surface shadow-card ${
          aspect ?? ""
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-surface2/70 to-transparent" />
        <div className={compact ? "p-4 md:p-5" : "p-5 md:p-7"}>{children}</div>
        <div className="pointer-events-none absolute right-4 top-4">
          <span className="frame-label rounded-full border border-line bg-surface px-2.5 py-1 text-muted">
            Demo · Synthetic data
          </span>
        </div>
        <div className="pointer-events-none absolute left-4 top-4">
          <span className="frame-label text-muted">{screen}</span>
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-4 text-[14px] text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
