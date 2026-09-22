"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ContactLink } from "@/components/contact-link";
import { LogoMark } from "@/components/chrome";

export function MobileNav({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Menu"
        aria-expanded={open}
        aria-controls={open ? "mobile-nav-panel" : undefined}
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-lg border border-line2 px-3 text-sm text-ink"
      >
        <span className="hidden sm:inline">Menu</span><span aria-hidden="true">☰</span>
      </button>
      {open && createPortal(
        <dialog
          ref={dialogRef}
          id="mobile-nav-panel"
          aria-label="Navigation menu"
          onCancel={() => setOpen(false)}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const links = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
            const first = links[0];
            const last = links[links.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
          }}
          onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}
          className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 bg-bg p-0 text-ink backdrop:bg-bg/80"
        >
          <div className="min-h-full px-5 pb-8">
            <div className="flex items-center justify-between border-b border-line py-4">
              <Link href="/" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center gap-3 text-lg font-semibold">
                <LogoMark size={28} /> Doyel Labs
              </Link>
              <button type="button" onClick={() => setOpen(false)} className="min-h-11 rounded-lg px-4 text-sm text-mute">
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label="Primary" className="mt-8">
              <ul>
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                      className="flex items-center justify-between border-b border-line py-5 text-2xl font-medium hover:text-accentHi aria-[current=page]:text-accent"
                    >
                      {item.label}<span aria-hidden="true" className="text-mute">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8"><ContactLink onClick={() => setOpen(false)} /></div>
            </nav>
            <nav aria-label="Utilities" className="mt-10 flex gap-6 text-sm text-mute">
              <Link href="/support/" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center">Support</Link>
              <Link href="/sitemap/" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center">All pages</Link>
            </nav>
          </div>
        </dialog>,
        document.body,
      )}
    </div>
  );
}
