"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { site } from "@/lib/site";

/**
 * Mobile navigation drawer. Toggles from a menu button in the header,
 * covers the full viewport, and closes on Escape / backdrop click /
 * link click. Locks body scroll while open.
 *
 * The desktop nav is rendered separately in chrome.tsx; this component
 * only shows on md:hidden viewports.
 */
export function MobileNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

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

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
        className="inline-flex h-9 w-9 items-center justify-center border border-line text-ink transition-colors hover:border-line2"
      >
        <span aria-hidden="true" className="flex flex-col gap-1">
          <span className="block h-[1.5px] w-4 bg-ink" />
          <span className="block h-[1.5px] w-4 bg-ink" />
          <span className="block h-[1.5px] w-4 bg-ink" />
        </span>
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          {/* Top row: logo + close */}
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
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
              className="text-mute hover:text-ink"
            >
              <span aria-hidden="true" className="text-2xl">×</span>
            </button>
          </div>

          {/* Nav list */}
          <nav aria-label="Primary" className="flex flex-1 flex-col px-6 py-8">
            <ul className="space-y-1">
              {items.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line py-4 text-[20px] font-semibold uppercase tracking-wide text-ink hover:text-accentHi"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact CTA */}
            <div className="mt-10">
              <ContactWidget label="Contact us" variant="primary" />
            </div>

            {/* Bottom: contact details */}
            <div className="mt-auto space-y-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-wide text-mute">
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
          </nav>
        </div>
      ) : null}
    </div>
  );
}
