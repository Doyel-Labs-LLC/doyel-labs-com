"use client";

import { useEffect, useRef, useState } from "react";
import { Turnstile } from "@/components/turnstile";
import { site } from "@/lib/site";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type SubmitState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success" }
  | { status: "error"; message: string };

/**
 * ContactWidget — a button that opens an inline modal with a real
 * contact form. The form POSTs to `/api/contact`, which is a Cloudflare
 * Pages Function that emails support@doyel-labs.com via Resend.
 *
 * If the endpoint fails (e.g. env var not set, Resend outage), the
 * form shows a graceful message pointing the visitor at the email
 * and phone number so they can reach us anyway.
 */
export function ContactWidget({
  label = "Contact us",
  variant = "primary",
  size = "regular",
}: {
  label?: string;
  variant?: "primary" | "ghost";
  size?: "regular" | "small";
}) {
  const [open, setOpen] = useState(false);
  const buttonClass =
    variant === "primary"
      ? "inline-flex items-center gap-2 rounded-full border border-accent bg-accentSoft text-accent transition-all duration-200 ease-soft hover:border-accentHi hover:bg-accent/15 hover:text-accentHi focus-visible:border-accentHi"
      : "inline-flex items-center gap-2 rounded-full border border-line2 text-ink transition-colors duration-200 ease-soft hover:border-ink hover:bg-ink/[0.04] focus-visible:border-ink";
  const sizeClass =
    size === "small" ? "px-4 py-2 text-[12px]" : "px-6 py-3 text-[13px]";
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${buttonClass} ${sizeClass} uppercase tracking-wide cursor-pointer`}
      >
        {label}
        <span aria-hidden="true">→</span>
      </button>
      {open ? <Modal onClose={() => setOpen(false)} /> : null}
    </>
  );
}

/** The modal itself + the form. Client-side only. */
function Modal({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "sending" });
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: (fd.get("name") as string) || "",
      email: (fd.get("email") as string) || "",
      projectType: (fd.get("projectType") as string) || "",
      subject: (fd.get("subject") as string) || "",
      message: (fd.get("message") as string) || "",
      // Honeypot — real users leave this blank.
      website: (fd.get("website") as string) || "",
      turnstileToken,
    };
    if (payload.website) {
      // Silently drop bots that filled the honeypot.
      setState({ status: "success" });
      return;
    }
    if (!payload.email || !payload.message) {
      setState({
        status: "error",
        message: "An email and a message are required.",
      });
      return;
    }
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (r.ok) {
        setState({ status: "success" });
        return;
      }
      const body = (await r.json().catch(() => ({}))) as { error?: string };
      setState({
        status: "error",
        message:
          body.error ||
          `Something went wrong (HTTP ${r.status}). Email us at ${site.supportEmail} or call ${site.phone}.`,
      });
    } catch {
      setState({
        status: "error",
        message: `We couldn't reach the server. Email ${site.supportEmail} or call ${site.phone}.`,
      });
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg border border-line2 bg-surface p-6 md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-mute hover:text-ink"
          aria-label="Close"
        >
          <span aria-hidden="true" className="text-xl">×</span>
        </button>
        <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
          <span className="accent-bar" />
          Contact
        </p>
        <h2
          id="contact-title"
          className="mt-2 text-xl font-semibold uppercase tracking-display text-ink md:text-2xl"
        >
          Start a project.
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-mute">
          Tell us the operation and what would make it more defensible on
          paper. We answer within one business day.
        </p>

        {state.status === "success" ? (
          <div className="mt-6 border border-accent bg-accentSoft/40 p-4 text-[13px] text-ink">
            <p className="font-mono text-[11px] uppercase tracking-wide text-accent">
              Message received
            </p>
            <p className="mt-2">
              We'll reply within one business day at the email you provided.
              For anything urgent, call{" "}
              <a
                href={site.phoneHref}
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                {site.phone}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 border border-line2 px-4 py-2 text-[11px] uppercase tracking-wide text-ink hover:border-ink"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-3" noValidate>
            {/* Honeypot */}
            <label className="hidden">
              Website (bots only)
              <input
                type="text"
                name="website"
                autoComplete="off"
                tabIndex={-1}
              />
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Name">
                <input
                  ref={firstFieldRef}
                  name="name"
                  autoComplete="name"
                  className={fieldClass}
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className={fieldClass}
                />
              </Field>
            </div>
            <Field label="What can we help with?">
              <select
                name="projectType"
                defaultValue="general"
                className={fieldClass}
              >
                <option value="general">General inquiry</option>
                <option value="website">I need a marketing site</option>
                <option value="payroll">I need a payroll workspace</option>
                <option value="custom">I have a specific software idea</option>
                <option value="idea">I have an idea but need help scoping it</option>
                <option value="maintenance">I need help with existing software</option>
                <option value="bai">Question about BAI (trading desk)</option>
                <option value="connectionloop">Question about ConnectionLoop</option>
                <option value="other">Something else</option>
              </select>
            </Field>
            <Field label="Subject">
              <input
                name="subject"
                placeholder="A short line describing what you're after"
                className={fieldClass}
              />
            </Field>
            <Field label="Message" required>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="What are you trying to build, and what would make it work well?"
                className={`${fieldClass} resize-y`}
              />
            </Field>
            {TURNSTILE_SITE_KEY ? (
              <Turnstile
                sitekey={TURNSTILE_SITE_KEY}
                onToken={setTurnstileToken}
              />
            ) : null}
            {state.status === "error" ? (
              <p className="border-l-2 border-fall bg-fall/10 px-3 py-2 text-[12px] text-ink">
                {state.message}
              </p>
            ) : null}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={state.status === "sending"}
                className="inline-flex items-center gap-2 rounded-full border border-accent bg-accentSoft px-6 py-3 text-[13px] uppercase tracking-wide text-accent transition-all duration-200 ease-soft hover:border-accentHi hover:bg-accent/15 hover:text-accentHi disabled:opacity-60 cursor-pointer"
              >
                {state.status === "sending" ? "Sending…" : "Send message"}
                {state.status !== "sending" ? (
                  <span aria-hidden="true">→</span>
                ) : null}
              </button>
              <p className="text-[11px] text-muted">
                or{" "}
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                >
                  {site.supportEmail}
                </a>{" "}
                ·{" "}
                <a
                  href={site.phoneHref}
                  className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                >
                  {site.phone}
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

const fieldClass =
  "block w-full border border-line bg-bg/60 px-3 py-2 text-[14px] text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accentDim";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-wide text-mute">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </span>
      {children}
    </label>
  );
}
