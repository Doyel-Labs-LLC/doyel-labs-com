"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LogoMark } from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { site } from "@/lib/site";

/**
 * Mobile navigation drawer.
 *
 * Toggles from a menu button in the header, covers the full viewport,
 * and closes on Escape / backdrop click / link click. Locks body
 * scroll while open.
 *
 * TWO NON-OBVIOUS BUGS this component avoids:
 *
 * 1. **Backdrop-filter containing block.** The header uses
 *    `backdrop-blur-md`. Any element with `backdrop-filter` creates a
 *    new CSS containing block for its `fixed` descendants — meaning
 *    if we rendered the drawer *inside* the header, `fixed inset-0`
 *    would fill the header's bounds (~75px tall), not the viewport.
 *    Fix: render the drawer via `createPortal` to `document.body`,
 *    outside any transformed / filtered ancestor.
 *
 * 2. **Semi-transparent bleed-through.** An earlier version used
 *    `bg-bg/95` + `backdrop-blur-md` on the drawer itself. On iOS
 *    Safari and some Android browsers, `backdrop-filter` doesn't
 *    render reliably, so the 5% transparency was enough for page
 *    text to show through. Fix: `bg-bg` (100% opaque) — no reliance
 *    on backdrop-filter for readability.
 *
 * The desktop nav is rendered separately in chrome.tsx; this component
 * only shows on `md:hidden` viewports.
 */
export function MobileNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Track mount so we don't try to `createPortal` during SSR (document
  // doesn't exist during static export prerender).
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const drawer =
    open && mounted ? (
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bg"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
          {/* Top row: logo + close */}
          <div className="flex shrink-0 items-center justify-between border-b border-line bg-bg px-6 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3"
              aria-label="Doyel Labs — home"
            >
              <LogoMark />
              <span className="wordmark text-[13px] text-ink">
                Doyel Labs
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center text-mute hover:text-ink"
            >
              <span aria-hidden="true" className="text-2xl leading-none">
                ×
              </span>
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex flex-1 flex-col bg-bg px-6 py-6">
            {/* Primary section — big-type nav */}
            <nav aria-label="Primary">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
                Primary
              </p>
              <ul className="mt-4 space-y-1">
                {items.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-line py-4 text-[20px] font-semibold uppercase tracking-wide text-ink hover:text-accentHi"
                    >
                      <span>{n.label}</span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-[12px] text-mute"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact CTA — the primary conversion action */}
            <div className="mt-8">
              <ContactWidget label="Book an orientation" variant="primary" />
            </div>

            {/* Explore section — the deeper pages */}
            <nav aria-label="Explore" className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
                Explore
              </p>
              <ul className="mt-4 space-y-0.5">
                {EXPLORE_LINKS.map((n) => (
                  <MobileSubLink
                    key={n.href}
                    href={n.href}
                    label={n.label}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </ul>
            </nav>

            {/* Support section — utility + legal */}
            <nav aria-label="Support" className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
                Support &amp; ops
              </p>
              <ul className="mt-4 space-y-0.5">
                {SUPPORT_LINKS.map((n) => (
                  <MobileSubLink
                    key={n.href}
                    href={n.href}
                    label={n.label}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
              </ul>
            </nav>

            {/* Bottom: contact details */}
            <div className="mt-10 space-y-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-wide text-mute">
              <p>
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="hover:text-accentHi"
                >
                  {site.supportEmail}
                </a>
              </p>
              <p>
                <a href={site.phoneHref} className="hover:text-accentHi">
                  {site.phone}
                </a>
              </p>
              <p className="text-muted">
                {site.company} · {site.city}
              </p>
            </div>
          </div>
      </div>
    ) : null;

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
        className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-line2"
      >
        <span aria-hidden="true" className="flex flex-col gap-1">
          <span className="block h-[1.5px] w-4 bg-ink" />
          <span className="block h-[1.5px] w-4 bg-ink" />
          <span className="block h-[1.5px] w-4 bg-ink" />
        </span>
      </button>

      {/* Render the drawer directly on document.body via a portal, so
       * the header's `backdrop-filter` (which creates a new containing
       * block) does not shrink our `fixed inset-0` positioning to the
       * header's bounds. */}
      {mounted && drawer ? createPortal(drawer, document.body) : null}
    </div>
  );
}

/**
 * "Explore" section of the drawer — the pages you might want to look
 * at without them cluttering the top-level nav. Kept in this file so
 * the mobile drawer owns its own IA independently of the desktop
 * footer.
 */
// Products, Work, and Pricing now live in the Primary nav (passed via
// `items`), so they are intentionally absent here to avoid duplicate rows
// in the drawer. Case studies still points at /work/ under its own label.
const EXPLORE_LINKS = [
  { href: "/how-we-work/", label: "How we work" },
  { href: "/industries/", label: "Industries" },
  { href: "/work/", label: "Case studies" },
  { href: "/founder/", label: "Founder" },
  { href: "/writing/", label: "Writing" },
  { href: "/faq/", label: "FAQ" },
];

const SUPPORT_LINKS = [
  { href: "/support/", label: "Support" },
  { href: "/status/", label: "Status" },
  { href: "/press/", label: "Press & media kit" },
  { href: "/uses/", label: "Uses" },
  { href: "/security/", label: "Security" },
  { href: "/engineering/", label: "Engineering" },
  { href: "/changelog/", label: "Changelog" },
  { href: "/legal/terms/", label: "Legal" },
  { href: "/sitemap/", label: "Site map" },
];

/**
 * A single row in the "Explore" / "Support" nav sections. Tap target
 * is at least 44px tall (Apple HIG minimum). Renders label + arrow.
 */
function MobileSubLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className="flex min-h-[44px] items-center justify-between border-b border-line/70 py-3 text-[15px] text-mute hover:text-accentHi"
      >
        <span>{label}</span>
        <span
          aria-hidden="true"
          className="font-mono text-[11px] text-muted"
        >
          →
        </span>
      </Link>
    </li>
  );
}
