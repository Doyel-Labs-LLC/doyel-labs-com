"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ContactForm } from "@/components/contact-form";
import { lockPageScroll } from "@/lib/scroll-lock";
import { promise } from "@/lib/site";

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

  const buttonClass =
    variant === "primary"
      ? "inline-flex items-center gap-2 rounded-full border border-accent bg-accentSoft text-accent shadow-glow transition-all duration-200 ease-soft hover:border-accentHi hover:bg-accent/15 hover:text-accentHi focus-visible:border-accentHi"
      : "inline-flex items-center gap-2 rounded-full border border-line2 text-ink transition-colors duration-200 ease-soft hover:border-ink hover:bg-ink/[0.04] focus-visible:border-ink";
  const sizeClass = size === "small" ? "px-4 py-2 text-[12px]" : "px-6 py-3 text-[13px]";

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${buttonClass} ${sizeClass} cursor-pointer uppercase tracking-wide`}
      >
        {label}
        <span aria-hidden="true">→</span>
      </button>
      {open ? <Modal onClose={close} /> : null}
    </>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function Modal({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
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
      if (e.shiftKey && document.activeElement === first) {
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
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-bg/85 p-4 backdrop-blur-md md:items-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        className="relative my-8 w-full max-w-lg rounded-[3px] border border-line2 bg-surface p-6 shadow-cardHover md:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-mute hover:bg-ink/[0.06] hover:text-ink"
          aria-label="Close"
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            ×
          </span>
        </button>
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
          <span className="accent-bar" />
          Contact
        </p>
        <h2 id="contact-title" className="mt-2 text-[24px] font-semibold leading-tight tracking-display text-ink">
          {promise.headline}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-mute">{promise.body}</p>
        <div className="mt-6">
          <ContactForm compact firstFieldRef={firstFieldRef} onDone={onClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
