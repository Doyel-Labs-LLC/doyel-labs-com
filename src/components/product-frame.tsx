import type { ReactNode } from "react";

/**
 * ProductFrame — the only surface that carries product UI on this site.
 *
 * A chromeless dark box with a 1px hairline and a corner label. The
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
        className={`relative overflow-hidden border border-line bg-surface ${
          aspect ?? ""
        }`}
      >
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_50%_-10%,rgba(240,240,250,0.05),transparent_60%)]" />
        <div className={compact ? "p-4 md:p-5" : "p-5 md:p-7"}>{children}</div>
        <div className="pointer-events-none absolute right-3 top-3">
          <span className="frame-label border border-line px-2 py-1 text-muted">
            Demo · Synthetic data
          </span>
        </div>
        <div className="pointer-events-none absolute left-3 top-3">
          <span className="frame-label text-muted">{screen}</span>
        </div>
      </div>
      {caption ? (
        <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-wide text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
