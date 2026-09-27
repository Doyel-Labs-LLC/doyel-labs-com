"use client";

import { useId, useRef, useState } from "react";
import { Turnstile, type TurnstileHandle } from "@/components/turnstile";
import { PROJECT_TYPES, LIMITS, EMAIL_RE } from "@/lib/contact-form";
import { site } from "@/lib/site";
import { response } from "@/lib/offer";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type SubmitState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success" }
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
  const uid = useId();
  const errId = `${uid}-error`;

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
      setState({ status: "success" });
      return;
    }
    if (!EMAIL_RE.test(payload.email)) {
      setState({ status: "error", message: "Please enter a valid email address.", field: "email" });
      return;
    }
    if (payload.message.length < 5) {
      setState({ status: "error", message: "Please include a short message.", field: "message" });
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
        setState({ status: "success" });
        return;
      }
      const body = (await r.json().catch(() => ({}))) as { error?: string };
      turnstileRef.current?.reset();
      setState({
        status: "error",
        message: body.error || `Something went wrong. Email ${site.supportEmail} or call ${site.phone}.`,
      });
    } catch {
      turnstileRef.current?.reset();
      setState({
        status: "error",
        message: `We couldn't reach the server. Email ${site.supportEmail} or call ${site.phone}.`,
      });
    }
  }

  if (state.status === "success") {
    return (
      <div role="status" className="border border-accent bg-accentSoft p-5 text-[15px] text-ink">
        <p className="font-mono text-[11px] uppercase tracking-wide text-accent">Message received</p>
        <p className="mt-2 leading-relaxed">
          A person will reply {response.window}, {response.usually}. If it&apos;s urgent, call{" "}
          <a href={site.phoneHref} className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi">
            {site.phone}
          </a>{" "}
          ({site.hoursShort}).
        </p>
        {onDone ? (
          <button
            type="button"
            onClick={onDone}
            className="mt-4 rounded-full border border-line2 px-4 py-2 text-[12px] uppercase tracking-wide text-ink hover:border-ink"
          >
            Close
          </button>
        ) : null}
      </div>
    );
  }

  const invalidEmail = state.status === "error" && state.field === "email";
  const invalidMessage = state.status === "error" && state.field === "message";

  return (
    <form onSubmit={submit} className={compact ? "space-y-3" : "space-y-4"} noValidate>
      <label className="hidden" aria-hidden="true">
        Website (leave blank)
        <input type="text" name="website" autoComplete="off" tabIndex={-1} />
      </label>

      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Name" htmlFor={`${uid}-name`}>
          <input id={`${uid}-name`} ref={firstFieldRef} name="name" autoComplete="name" maxLength={LIMITS.name} className={fieldClass} />
        </Field>
        <Field label="Email" htmlFor={`${uid}-email`} required>
          <input
            id={`${uid}-email`}
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            aria-invalid={invalidEmail || undefined}
            aria-describedby={invalidEmail ? errId : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label="What can we help with?" htmlFor={`${uid}-type`}>
        <select id={`${uid}-type`} name="projectType" defaultValue="website" className={fieldClass}>
          {PROJECT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor={`${uid}-message`} required>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={compact ? 4 : 6}
          required
          maxLength={LIMITS.message}
          placeholder="Tell us what your business does and what you'd like built. One paragraph is plenty."
          aria-invalid={invalidMessage || undefined}
          aria-describedby={invalidMessage ? errId : undefined}
          className={`${fieldClass} resize-y`}
        />
      </Field>

      <Field label="Good times for a call (optional)" htmlFor={`${uid}-times`}>
        <input
          id={`${uid}-times`}
          name="preferredTimes"
          maxLength={LIMITS.preferredTimes}
          placeholder="e.g. Tuesday after 2pm Mountain"
          className={fieldClass}
        />
      </Field>

      {TURNSTILE_SITE_KEY ? <Turnstile ref={turnstileRef} sitekey={TURNSTILE_SITE_KEY} onToken={setToken} /> : null}

      {state.status === "error" ? (
        <p id={errId} role="alert" className="border-l-2 border-fall bg-fall/10 px-3 py-2 text-[13px] text-ink">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={state.status === "sending"}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent bg-accentSoft px-6 py-3 text-[13px] uppercase tracking-wide text-accent shadow-glow transition-all duration-200 ease-soft hover:border-accentHi hover:bg-accent/15 hover:text-accentHi disabled:opacity-60"
        >
          {state.status === "sending" ? "Sending…" : "Send message"}
          {state.status !== "sending" ? <span aria-hidden="true">→</span> : null}
        </button>
        <p className="text-[12px] text-muted">
          or{" "}
          <a href={`mailto:${site.supportEmail}`} className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi">
            {site.supportEmail}
          </a>{" "}
          ·{" "}
          <a href={site.phoneHref} className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi">
            {site.phone}
          </a>
        </p>
      </div>
      <p className="text-[12px] leading-relaxed text-muted">
        Your message goes to a person, not a queue. We keep it only as long as it takes to reply and work together. No newsletter, no list.
      </p>
    </form>
  );
}

const fieldClass =
  "block w-full rounded-[3px] border border-line bg-bg/60 px-3 py-2.5 text-[15px] text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accentDim aria-[invalid=true]:border-fall";

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block font-mono text-[10px] uppercase tracking-wide text-mute">
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
      </label>
      {children}
    </div>
  );
}
