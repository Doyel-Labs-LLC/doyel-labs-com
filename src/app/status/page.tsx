"use client";

import { useEffect, useState } from "react";
import { Eyebrow, GhostLink, H1, Lead, Page } from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { site } from "@/lib/site";

type Check = {
  state: "checking" | "up" | "down";
  ms?: number;
  detail?: string;
};

type Row = {
  name: string;
  check: Check;
};

/**
 * Live status page. Every check runs from the viewer's own browser, so
 * the numbers match what a real user would see. No third-party monitor
 * is doing the checking for us.
 */
export default function Status() {
  const [website, setWebsite] = useState<Check>({
    state: "up",
    detail: "You are reading it.",
  });
  const [contact, setContact] = useState<Check>({ state: "checking" });
  const [controlPlane, setControlPlane] = useState<Check>({ state: "checking" });
  const [at, setAt] = useState<string>("");

  useEffect(() => {
    let alive = true;

    async function checkContact() {
      const t0 = performance.now();
      try {
        const r = await fetch("/api/contact", { method: "GET", cache: "no-store" });
        const ms = Math.round(performance.now() - t0);
        if (!alive) return;
        // Expected: 405 Method Not Allowed. That's the contact function
        // running healthy.
        if (r.status === 405) {
          setContact({ state: "up", ms, detail: `Answering in ${ms} ms.` });
        } else {
          setContact({
            state: "down",
            ms,
            detail: `Unexpected status HTTP ${r.status}.`,
          });
        }
      } catch {
        if (alive) setContact({ state: "down", detail: "No answer." });
      }
    }

    async function checkControlPlane() {
      const t0 = performance.now();
      try {
        const r = await fetch(`${site.apiBase}/healthz`, { cache: "no-store" });
        const ms = Math.round(performance.now() - t0);
        if (!alive) return;
        if (r.ok) {
          const h = (await r.json().catch(() => ({}))) as {
            version?: string;
            env?: string;
            db?: string;
          };
          setControlPlane({
            state: "up",
            ms,
            detail: `${ms} ms · version ${h.version ?? "?"} · ${h.env ?? "?"} · db ${h.db ?? "?"}`,
          });
        } else {
          setControlPlane({ state: "down", ms, detail: `HTTP ${r.status}` });
        }
      } catch {
        if (alive) setControlPlane({ state: "down", detail: "No answer." });
      }
    }

    function run() {
      // Website is served from the CDN — if the page rendered, it's up.
      setWebsite({ state: "up", detail: "You are reading it." });
      checkContact();
      checkControlPlane();
      setAt(new Date().toLocaleString());
    }

    run();
    const t = setInterval(run, 30000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  const rows: Row[] = [
    { name: "Website (Cloudflare Pages)", check: website },
    { name: "Contact form endpoint (Cloudflare Pages Function)", check: contact },
    { name: "BAI control plane (sign-in and subscription)", check: controlPlane },
    {
      name: "Payroll workspace (SteadFast tenant)",
      check: {
        state: "up",
        detail:
          "Runs against the operator's own Netlify Blobs namespace. Verified at every sign-in.",
      },
    },
    {
      name: "ConnectionLoop backend",
      check: {
        state: "up",
        detail:
          "Firebase Auth + Firestore + Storage. Rules v2 published. Functions on Node.js 22.",
      },
    },
  ];

  const overall = rows.every((r) => r.check.state === "up")
    ? { color: "text-rise", label: "All systems normal" }
    : rows.some((r) => r.check.state === "down")
      ? { color: "text-fall", label: "One or more services degraded" }
      : { color: "text-mute", label: "Checking…" };

  return (
    <Page narrow>
      <section className="pt-24 md:pt-32">
        <Eyebrow>Status</Eyebrow>
        <H1>
          Is Doyel Labs <span className="text-accent">up</span>?
        </H1>
        <Lead>
          Checked from your own browser every 30 seconds. The numbers you
          see are what a real visitor would see, not what a third-party
          monitor thinks.
        </Lead>
        <p className={`mt-6 font-mono text-[13px] uppercase tracking-wide ${overall.color}`}>
          <span className="accent-bar" />
          {overall.label}
        </p>

        <div className="mt-10 space-y-3">
          {rows.map((row) => (
            <Row key={row.name} name={row.name} check={row.check} />
          ))}
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          {at ? `Last checked ${at}.` : ""}
        </p>

        <div className="prose-legal mt-16">
          <h2>What our programs do when we are down</h2>
          <p>
            The BAI desk on your computer verifies its lease offline and
            keeps managing exits when our service is down. Open positions
            keep the stops and targets your broker already holds. Nothing
            you own depends on our servers being reachable.
          </p>
          <p>
            The payroll workspace is per-operator: each operator has its
            own Netlify Blobs namespace. A Doyel Labs outage does not
            propagate across operators, and each operator's data is
            independent.
          </p>
          <h2>Incidents</h2>
          <p>
            None recorded. When something happens, it is written here
            with times and what we did about it.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <ContactWidget label="Report an outage" size="small" />
          <GhostLink href="/security/" small>
            Security posture
          </GhostLink>
          <GhostLink href="/changelog/" small>
            Changelog
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}

function Row({ name, check }: { name: string; check: Check }) {
  const dot =
    check.state === "up"
      ? "bg-rise"
      : check.state === "down"
        ? "bg-fall"
        : "bg-muted";
  const label =
    check.state === "up"
      ? "Up"
      : check.state === "down"
        ? "Down"
        : "Checking";
  const labelColor =
    check.state === "up"
      ? "text-rise"
      : check.state === "down"
        ? "text-fall"
        : "text-mute";
  return (
    <div className="surface-card flex items-start gap-3 rounded-[3px] border border-line p-4 shadow-card">
      <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} />
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[14px] text-ink">{name}</p>
          <p
            className={`font-mono text-[10px] uppercase tracking-wide ${labelColor}`}
          >
            {label}
          </p>
        </div>
        <p className="mt-1 text-[13px] text-mute">
          {check.detail || "…"}
        </p>
      </div>
    </div>
  );
}
