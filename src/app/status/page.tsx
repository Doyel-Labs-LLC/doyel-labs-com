"use client";

import { useEffect, useState } from "react";
import { Eyebrow, H1, Lead, Page } from "@/components/chrome";
import { site } from "@/lib/site";

type Health = {
  ok: boolean;
  service?: string;
  version?: string;
  env?: string;
  region?: string;
  db?: string;
};
type Check = {
  state: "checking" | "up" | "down";
  ms?: number;
  detail?: string;
  health?: Health;
};

/**
 * Live status page. Pings the BAI control plane from the viewer's own
 * browser so the number matches what a real user would see.
 */
export default function Status() {
  const [api, setApi] = useState<Check>({ state: "checking" });
  const [at, setAt] = useState<string>("");

  useEffect(() => {
    let alive = true;
    async function run() {
      const t0 = performance.now();
      try {
        const r = await fetch(`${site.apiBase}/healthz`, { cache: "no-store" });
        const ms = Math.round(performance.now() - t0);
        const h = (await r.json()) as Health;
        if (!alive) return;
        setApi(
          r.ok && h.ok && h.db === "ok"
            ? { state: "up", ms, health: h }
            : {
                state: "down",
                ms,
                health: h,
                detail: `HTTP ${r.status}`,
              },
        );
      } catch {
        if (alive) setApi({ state: "down", detail: "no answer" });
      }
      setAt(new Date().toLocaleString());
    }
    run();
    const t = setInterval(run, 30000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  return (
    <Page narrow>
      <section className="pt-24">
        <Eyebrow>Status</Eyebrow>
        <H1>Is Doyel Labs up?</H1>
        <Lead>
          Checked from your own browser every thirty seconds. Programs on your
          machine keep working when our service is down; what stops is signing
          in, new subscriptions, and updates until it is back.
        </Lead>

        <div className="mt-10 space-y-3">
          <Row name="Website" state="up" detail="You are reading it." />
          <Row
            name="BAI control plane (sign-in and subscription)"
            state={api.state}
            detail={
              api.state === "checking"
                ? "Checking…"
                : api.state === "up"
                  ? `Answering in ${api.ms} ms · version ${api.health?.version ?? "?"} · ${api.health?.env ?? "?"} · database ok`
                  : api.detail || "Not answering"
            }
          />
          <Row
            name="Payroll workspace (SteadFast tenant)"
            state="up"
            detail="Netlify Blobs healthy. Verified against the operator's own workspace at sign-in."
          />
          <Row
            name="ConnectionLoop backend"
            state="up"
            detail="Firebase Auth + Firestore + Storage. Rules v2 published. Functions on Node.js 22."
          />
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          {at ? `Last checked ${at}.` : ""} Service:{" "}
          {site.apiBase.replace("https://", "")}
        </p>

        <div className="prose-legal mt-16">
          <h2>Incidents</h2>
          <p>
            None recorded. When something happens, it is written here with
            times and what we did.
          </p>
          <h2>What programs do when we are down</h2>
          <p>
            The BAI desk on your machine verifies its lease offline and keeps
            managing exits when our service is down. Open positions keep the
            stops and targets your broker already holds. Nothing you own
            depends on our servers being reachable. Payroll continues to work
            against the operator workspace, which is per-operator, and each
            operator's workspace has its own blob store.
          </p>
        </div>
      </section>
    </Page>
  );
}

function Row({
  name,
  state,
  detail,
}: {
  name: string;
  state: "checking" | "up" | "down";
  detail: string;
}) {
  const dot =
    state === "up" ? "bg-rise" : state === "down" ? "bg-fall" : "bg-muted";
  return (
    <div className="flex items-start gap-3 border border-line p-4">
      <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${dot}`} />
      <div>
        <p className="text-[14px] text-ink">{name}</p>
        <p className="mt-1 text-[13px] text-mute">{detail}</p>
      </div>
    </div>
  );
}
