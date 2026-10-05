"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { buttonClass } from "@/components/button-styles";
import { ContactForm } from "@/components/contact-form";
import { response } from "@/lib/offer";
import { lockPageScroll } from "@/lib/scroll-lock";
import { site } from "@/lib/site";

/**
 * ContactWidget — a button that opens a modal with the contact form.
 * Portaled to <body> so a backdrop-blurred header can never clip it,
 * traps focus while open, and returns focus to the button on close.
 */
export function ContactWidget({
  label = "Talk to a person",
  variant = "primary",
  size = "regular",
}: {
  label?: string;
  variant?: "primary" | "ghost";
  size?: "regular" | "small";
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const close = useCallback(() => {
    setOpen(false);
    // Return focus after the portal unmounts.
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`group/btn ${buttonClass(variant === "primary" ? "primary" : "secondary", size)}`}
      >
        {label}
        <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className="shrink-0 transition-transform duration-200 ease-soft group-hover/btn:translate-x-0.5">
          <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? <Modal onClose={close} /> : null}
    </>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

function Modal({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Only move focus into a text field on devices with a fine pointer, so
    // phones don't throw the keyboard up over the modal heading.
    if (window.matchMedia("(pointer: fine)").matches) {
      firstFieldRef.current?.focus();
    } else {
      panelRef.current?.focus();
    }
    const unlock = lockPageScroll();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null || n === document.activeElement,
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlock();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-ink/30 p-4 backdrop-blur-sm md:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        aria-describedby="contact-desc"
        tabIndex={-1}
        className="hero-in relative my-6 w-full max-w-xl rounded-panel border border-line bg-surface p-6 shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-mute transition-colors hover:bg-surface2 hover:text-ink"
          aria-label="Close"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16">
            <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
        <p className="text-[13px] font-semibold uppercase tracking-eyebrow text-accent">
          <span className="accent-bar" aria-hidden="true" />
          Talk to a person
        </p>
        <h2 id="contact-title" className="mt-3 pr-10 font-display text-[30px] font-medium leading-[1.12] tracking-[-0.015em] text-ink">
          Tell us about your business.
        </h2>
        <p id="contact-desc" className="mt-3 text-[16px] leading-relaxed text-mute">
          A person reads every message and replies {response.window}, {response.usually}. Prefer the phone? Call{" "}
          <a href={site.phoneHref} className="whitespace-nowrap font-medium text-accent underline decoration-accent/35 underline-offset-4 hover:text-accentInk">
            {site.phone}
          </a>
          .
        </p>
        <div className="mt-7">
          <ContactForm compact firstFieldRef={firstFieldRef} onDone={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
