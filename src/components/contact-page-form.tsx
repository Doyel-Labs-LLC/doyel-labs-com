"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Turnstile, type TurnstileHandle } from "@/components/turnstile";
import { contactTopics, isProjectType, type ProjectType } from "@/lib/contact";
import { site } from "@/lib/site";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
type SubmitState = { status: "idle" | "sending" | "success" } | { status: "error"; message: string };
type FieldErrors = { email?: string; message?: string };

export function ContactPageForm() {
  const query = useSearchParams().get("projectType");
  const topic = isProjectType(query) ? query : "general";
  return <InquiryForm key={topic} initialTopic={topic} />;
}

function InquiryForm({ initialTopic }: { initialTopic: ProjectType }) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) || "").trim();
    const email = value("email");
    const message = value("message");
    const nextErrors: FieldErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 100) nextErrors.email = "Enter a valid email address (up to 100 characters).";
    if (message.length < 5 || message.length > 5000) nextErrors.message = "Write a message between 5 and 5,000 characters.";
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.message) {
      setState({ status: "idle" });
      if (nextErrors.email) emailRef.current?.focus();
      else messageRef.current?.focus();
      return;
    }
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setState({ status: "error", message: "Please complete the verification before sending. If it cannot load, email or call us directly." });
      return;
    }
    sendingRef.current = true;
    setState({ status: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify({
          name: value("name"),
          email,
          projectType: value("projectType"),
          subject: "",
          message,
          preferredTimes: value("preferredTimes"),
          website: value("website"),
          turnstileToken,
        }),
      });
      const body: unknown = await response.json();
      if (response.ok && typeof body === "object" && body !== null && "ok" in body && body.ok === true) {
        form.reset();
        setState({ status: "success" });
      } else {
        const message = typeof body === "object" && body !== null && "error" in body && typeof body.error === "string"
          ? body.error
          : "We could not confirm delivery. Your message is still here. Please try again or contact us directly.";
        setState({ status: "error", message });
      }
    } catch {
      setState({ status: "error", message: "We could not confirm delivery. Your message is still here. Check your connection, try again, or contact us directly." });
    } finally {
      setTurnstileToken("");
      turnstileRef.current?.reset();
      sendingRef.current = false;
    }
  }

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className="rounded-lg border border-accentDim p-6">
        <h2 className="text-xl font-semibold">Thanks. Your message is on its way to us.</h2>
        <p role="status" className="mt-4 text-base leading-relaxed text-mute">A person from Doyel Labs will reply within one business day. We will respond to your question or help you work out the next step.</p>
        <button type="button" className="mt-6 min-h-11 rounded-lg border border-line2 px-4 text-base" onClick={() => { setState({ status: "idle" }); setErrors({}); }}>Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate aria-busy={state.status === "sending"} className="space-y-5">
      <p className="text-sm text-muted">Only email and message are required.</p>
      <div className="hidden" aria-hidden="true"><label>Leave this empty<input name="website" autoComplete="off" tabIndex={-1} /></label></div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="contact-name" className={labelClass}>Name <span className="font-normal text-muted">(optional)</span></label><input id="contact-name" name="name" autoComplete="name" maxLength={100} className={fieldClass} /></div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email <span className="font-normal text-muted">(required)</span></label>
          <input ref={emailRef} id="contact-email" name="email" type="email" autoComplete="email" required maxLength={100} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={fieldClass} />
          {errors.email && <p id="email-error" className="mt-2 text-sm text-fall">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-topic" className={labelClass}>What can we help with? <span className="font-normal text-muted">(optional)</span></label>
        <select id="contact-topic" name="projectType" defaultValue={initialTopic} className={fieldClass}>{contactTopics.map((topic) => <option key={topic.value} value={topic.value}>{topic.label}</option>)}</select>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>Your message <span className="font-normal text-muted">(required)</span></label>
        <textarea ref={messageRef} id="contact-message" name="message" required rows={5} minLength={5} maxLength={5000} placeholder="What would you like to build, improve, or ask us about?" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className={`${fieldClass} resize-y`} />
        {errors.message && <p id="message-error" className="mt-2 text-sm text-fall">{errors.message}</p>}
      </div>
      <details className="border-y border-line py-2">
        <summary className="min-h-11 py-3 text-sm text-mute">Want to suggest a time to talk? (optional)</summary>
        <label htmlFor="contact-times" className={`${labelClass} mt-2`}>Preferred times and time zone</label>
        <textarea id="contact-times" name="preferredTimes" maxLength={500} rows={2} placeholder="For example: weekday afternoons, Mountain Time, by phone." className={`${fieldClass} mb-3 resize-y`} />
      </details>
      {TURNSTILE_SITE_KEY && <Turnstile ref={turnstileRef} sitekey={TURNSTILE_SITE_KEY} onToken={setTurnstileToken} />}
      {state.status === "error" && (
        <div role="alert" className="rounded-lg border border-fall/40 bg-fall/10 p-4 text-sm leading-relaxed">
          <p>{state.message}</p>
          <p className="mt-2"><a className="text-link" href={`mailto:${site.supportEmail}`}>Email us</a> or <a className="text-link" href={site.phoneHref}>call {site.phone}</a>.</p>
        </div>
      )}
      <p className="text-sm leading-relaxed text-muted">Your details are used only to respond. <Link href="/legal/privacy/" className="text-link">Privacy policy</Link></p>
      <button type="submit" disabled={state.status === "sending"} className="inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-accent px-6 py-3 text-base font-medium text-bg hover:bg-accentHi disabled:cursor-wait disabled:opacity-60">
        {state.status === "sending" ? "Sending..." : "Send message"} <span aria-hidden="true">→</span>
      </button>
      <span role="status" className="sr-only">{state.status === "sending" ? "Sending your message." : ""}</span>
    </form>
  );
}

const labelClass = "mb-2 block text-sm font-medium text-ink";
const fieldClass = "block min-h-11 w-full rounded-lg border border-line2 bg-bg px-3 py-3 text-base text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accentDim";
