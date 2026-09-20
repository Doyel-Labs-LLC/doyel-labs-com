"use client";

import { useState } from "react";
import { Turnstile } from "@/components/turnstile";
import { site } from "@/lib/site";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

type SubmitState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "success" }
  | { status: "error"; message: string };

/**
 * The full contact form used inline on /contact/. Same payload as the
 * modal version, same endpoint (/api/contact), same graceful fallback
 * to the direct email + phone if the endpoint fails.
 */
export function ContactPageForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const [turnstileToken, setTurnstileToken] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "sending" });
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: (fd.get("name") as string) || "",
      email: (fd.get("email") as string) || "",
      subject: (fd.get("subject") as string) || "",
      message: (fd.get("message") as string) || "",
      website: (fd.get("website") as string) || "",
      turnstileToken,
    };
    if (payload.website) {
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
        form.reset();
        return;
      }
      const body = (await r.json().catch(() => ({}))) as { error?: string };
      setState({
        status: "error",
        message:
          body.error ||
          `Something went wrong. Email ${site.supportEmail} or call ${site.phone}.`,
      });
    } catch {
      setState({
        status: "error",
        message: `We couldn't reach the server. Email ${site.supportEmail} or call ${site.phone}.`,
      });
    }
  }

  if (state.status === "success") {
    return (
      <div className="border border-accent bg-accentSoft/40 p-6">
        <p className="font-mono text-[11px] uppercase tracking-wide text-accent">
          Message received
        </p>
        <p className="mt-3 text-[15px] text-ink">
          Thanks — we'll be in touch within one business day. For anything
          urgent, call{" "}
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
          onClick={() => setState({ status: "idle" })}
          className="mt-6 border border-line2 px-4 py-2 text-[11px] uppercase tracking-wide text-ink hover:border-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      {/* Honeypot */}
      <label className="hidden">
        Website (bots only)
        <input type="text" name="website" autoComplete="off" tabIndex={-1} />
      </label>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Name">
          <input name="name" autoComplete="name" className={fieldClass} />
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
      <Field label="Subject">
        <input
          name="subject"
          placeholder="What's the operation?"
          className={fieldClass}
        />
      </Field>
      <Field label="Message" required>
        <textarea
          name="message"
          rows={7}
          required
          placeholder="What are you trying to build, and what would make it work well?"
          className={`${fieldClass} resize-y`}
        />
      </Field>
      {TURNSTILE_SITE_KEY ? (
        <Turnstile sitekey={TURNSTILE_SITE_KEY} onToken={setTurnstileToken} />
      ) : null}
      {state.status === "error" ? (
        <p className="border-l-2 border-fall bg-fall/10 px-3 py-2 text-[12px] text-ink">
          {state.message}
        </p>
      ) : null}
      <div className="pt-2">
        <button
          type="submit"
          disabled={state.status === "sending"}
          className="inline-flex items-center gap-2 rounded-full border border-accent bg-accentSoft px-6 py-3 text-[13px] uppercase tracking-wide text-accent transition-all duration-200 ease-soft hover:border-accentHi hover:bg-accent/15 hover:text-accentHi disabled:opacity-60"
        >
          {state.status === "sending" ? "Sending…" : "Send message"}
          {state.status !== "sending" ? <span aria-hidden="true">→</span> : null}
        </button>
      </div>
    </form>
  );
}

const fieldClass =
  "block w-full border border-line bg-surface px-3 py-2 text-[14px] text-ink placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accentDim";

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
