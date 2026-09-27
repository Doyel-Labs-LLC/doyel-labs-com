"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-mute transition-colors hover:text-ink"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex flex-1 flex-col bg-bg px-6 py-6">
            {/* Primary section — big-type nav */}
            <nav aria-label="Menu">
              <p className="text-[13px] font-semibold text-muted">
                Menu
              </p>
              <ul className="mt-4 space-y-1">
                {items.map((n) => {
                  const active =
                    pathname === n.href ||
                    (n.href !== "/" && pathname.startsWith(n.href));
                  return (
                    <li key={n.href}>
                      <Link
                        href={n.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between border-b border-line py-4 font-display text-[26px] font-medium tracking-tight transition-colors hover:text-accent ${
                          active ? "text-accent" : "text-ink"
                        }`}
                      >
                        <span>{n.label}</span>
                        {active ? (
                          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-warm" />
                        ) : (
                          <Arrow />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Contact CTA — the primary conversion action */}
            <div className="mt-8">
              <ContactWidget label="Talk to a person" variant="primary" />
            </div>

            {/* Explore section — the deeper pages */}
            <nav aria-label="Explore" className="mt-10">
              <p className="text-[13px] font-semibold text-muted">
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
            <nav aria-label="More" className="mt-8">
              <p className="text-[13px] font-semibold text-muted">
                More
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
            <div className="mt-10 space-y-1 border-t border-line pt-6 text-[15px] text-mute">
              <p>
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-accent"
                >
                  {site.supportEmail}
                </a>
              </p>
              <p>
                <a href={site.phoneHref} className="inline-flex min-h-[44px] items-center transition-colors hover:text-accent">
                  {site.phone}
                </a>
              </p>
              <p className="text-muted">
                {site.company} · {site.city}
              </p>
              <p className="text-muted">{site.hours}</p>
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
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-button transition-colors hover:border-line2"
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
  { href: "/contact/", label: "Contact" },
  { href: "/websites/#pricing", label: "Website pricing" },
  { href: "/websites/#faq", label: "Questions people ask" },
];

const SUPPORT_LINKS = [
  { href: "/security/", label: "Security" },
  { href: "/legal/terms/", label: "Legal" },
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
        className="flex min-h-[44px] items-center justify-between border-b border-line/70 py-3 text-[16px] text-mute transition-colors hover:text-accent"
      >
        <span>{label}</span>
        <Arrow />
      </Link>
    </li>
  );
}

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" className="shrink-0 text-muted">
      <path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}