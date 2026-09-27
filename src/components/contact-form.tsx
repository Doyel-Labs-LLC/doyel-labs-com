"use client";

import { useId, useRef, useState } from "react";
import { buttonClass, textLink } from "@/components/button-styles";
import { Turnstile, type TurnstileHandle } from "@/components/turnstile";
import { PROJECT_TYPES, LIMITS, EMAIL_RE } from "@/lib/contact-form";
import { site } from "@/lib/site";
import { response } from "@/lib/offer";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type SubmitState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success"; email: string; receipt: boolean }
  | { status: "error"; message: string; field?: "email" | "message" };

/**
 * The one contact form. Used inside the header modal and inline on
 * /contact/. POSTs JSON to /api/contact (a Cloudflare Pages Function).
 * If the endpoint fails, the visitor always sees the email and phone.
 */
export function ContactForm({
  compact = false,
  firstFieldRef,
  onDone,
}: {
  compact?: boolean;
  firstFieldRef?: React.RefObject<HTMLInputElement | null>;
  onDone?: () => void;
}) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [token, setToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const uid = useId();
  const errId = `${uid}-error`;

  function fieldError(field: "email" | "message", message: string) {
    setState({ status: "error", message, field });
    requestAnimationFrame(() => (field === "email" ? emailRef.current : messageRef.current)?.focus());
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || "").trim(),
      projectType: String(fd.get("projectType") || "general"),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || "").trim(),
      preferredTimes: String(fd.get("preferredTimes") || ""),
      website: String(fd.get("website") || ""),
      turnstileToken: token,
    };
    if (payload.website) {
      setState({ status: "success", email: payload.email, receipt: false });
      return;
    }
    if (!EMAIL_RE.test(payload.email)) {
      fieldError("email", "Please enter an email address like name@business.com so we can reply.");
      return;
    }
    if (payload.message.length < 5) {
      fieldError("message", "Please add a sentence or two about your business so we know how to help.");
      return;
    }
    setState({ status: "sending" });
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (r.ok) {
        const body = (await r.json().catch(() => ({}))) as { receipt?: boolean };
        setState({ status: "success", email: payload.email, receipt: body.receipt === true });
        return;
      }
      const body = (await r.json().catch(() => ({}))) as { error?: string };
      turnstileRef.current?.reset();
      setState({
        status: "error",
        message: body.error || `Something went wrong. Please email ${site.supportEmail} or call ${site.phone}.`,
      });
    } catch {
      turnstileRef.current?.reset();
      setState({
        status: "error",
        message: `We couldn't reach the server. Please email ${site.supportEmail} or call ${site.phone}.`,
      });
    }
  }

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-card border border-accent/20 bg-accentSoft p-6 md:p-7">
        <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white shadow-button">
          <svg viewBox="0 0 16 16" width="18" height="18">
            <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-5 font-display text-[26px] font-medium leading-tight text-ink">Thank you. A person has your message.</p>
        <p className="mt-3 text-[16px] leading-relaxed text-mute">
          You&apos;ll hear back {response.window}, {response.usually}.
          {state.receipt ? (
            <>
              {" "}
              A short confirmation is on its way to <span className="break-anywhere font-medium text-ink">{state.email}</span>.
            </>
          ) : null}{" "}
          If it&apos;s urgent, call{" "}
          <a href={site.phoneHref} className={`${textLink} whitespace-nowrap`}>
            {site.phone}
          </a>{" "}
          ({site.hoursShort}).
        </p>
        {onDone ? (
          <button type="button" onClick={onDone} className={`mt-6 ${buttonClass("secondary", "small")}`}>
            Close
          </button>
        ) : null}
      </div>
    );
  }

  const invalidEmail = state.status === "error" && state.field === "email";
  const invalidMessage = state.status === "error" && state.field === "message";
  const sending = state.status === "sending";

  return (
    <form onSubmit={submit} className={compact ? "space-y-4" : "space-y-5"} noValidate aria-busy={sending || undefined}>
      <label className="hidden" aria-hidden="true">
        Website (leave blank)
        <input type="text" name="website" autoComplete="off" tabIndex={-1} />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" htmlFor={`${uid}-name`}>
          <input
            id={`${uid}-name`}
            ref={firstFieldRef}
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            placeholder="Jordan Reed"
            className={fieldClass}
          />
        </Field>
        <Field label="Email" htmlFor={`${uid}-email`} required>
          <input
            id={`${uid}-email`}
            ref={emailRef}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            autoCapitalize="none"
            required
            maxLength={LIMITS.email}
            placeholder="you@business.com"
            aria-invalid={invalidEmail || undefined}
            aria-describedby={invalidEmail ? errId : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label="What can we help with?" htmlFor={`${uid}-type`}>
        <div className="relative">
          <select id={`${uid}-type`} name="projectType" defaultValue="website" className={`${fieldClass} appearance-none pr-10`}>
            {PROJECT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mute">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Field>

      <Field label="Your message" htmlFor={`${uid}-message`} required hint="One paragraph is plenty.">
        <textarea
          id={`${uid}-message`}
          ref={messageRef}
          name="message"
          rows={compact ? 4 : 6}
          required
          maxLength={LIMITS.message}
          placeholder="We run a bakery in Casper and need a site with our hours, menu, and a way to order cakes…"
          aria-invalid={invalidMessage || undefined}
          aria-describedby={invalidMessage ? errId : undefined}
          className={`${fieldClass} min-h-[120px] resize-y py-3`}
        />
      </Field>

      <Field label="Good times for a call" htmlFor={`${uid}-times`} optional>
        <input
          id={`${uid}-times`}
          name="preferredTimes"
          autoComplete="off"
          maxLength={LIMITS.preferredTimes}
          placeholder="Tuesday after 2 p.m. Mountain…"
          className={fieldClass}
        />
      </Field>

      {TURNSTILE_SITE_KEY ? <Turnstile ref={turnstileRef} sitekey={TURNSTILE_SITE_KEY} onToken={setToken} /> : null}

      <div aria-live="polite">
        {state.status === "error" ? (
          <p id={errId} role="alert" className="flex gap-3 rounded-2xl border border-fall/25 bg-fall/[0.06] px-4 py-3 text-[15px] leading-relaxed text-ink">
            <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fall text-[12px] font-bold text-white">
              !
            </span>
            <span>{state.message}</span>
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
        <button type="submit" disabled={sending} className={`group/btn ${buttonClass("primary", "regular")}`}>
          {sending ? (
            <>
              <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className="shrink-0 transition-transform duration-200 ease-soft group-hover/btn:translate-x-0.5">
                <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
        <p className="text-[14px] text-mute">
          or email{" "}
          <a href={`mailto:${site.supportEmail}`} className={textLink}>
            {site.supportEmail}
          </a>
        </p>
      </div>
      <p className="text-[14px] leading-relaxed text-muted">
        A person reads this, not a queue. We use your details only to reply and work together. No newsletter, no list.
      </p>
    </form>
  );
}

const fieldClass =
  "block h-12 w-full rounded-xl border border-line2 bg-surface px-4 text-[16px] text-ink shadow-[inset_0_1px_2px_rgba(60,44,20,0.04)] transition-[border-color,box-shadow] duration-150 placeholder:text-muted/80 hover:border-ink/35 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-fall aria-[invalid=true]:ring-fall/15";

function Field({
  label,
  htmlFor,
  required,
  optional,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-[15px] font-semibold text-ink">
          {label}
          {required ? (
            <>
              <span className="text-accent" aria-hidden="true">
                {" "}
                *
              </span>
              <span className="sr-only"> (required)</span>
            </>
          ) : null}
          {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
        </label>
        {hint ? <span className="text-[13px] text-muted">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
