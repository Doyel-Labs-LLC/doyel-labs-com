import { demoAuditLog } from "@/lib/demo/payroll";
import { ProductFrame } from "@/components/product-frame";

/** Audit log — mirrors the "Paystub audit log" tab, filter chips and all. */
export function PayrollAuditFrame() {
  return (
    <ProductFrame
      screen="Audit / Log"
      caption="Every draft, email, and blocked action leaves a row"
    >
      <div className="pt-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {["All", "Compliant", "Non-compliant"].map((c, i) => (
            <span
              key={c}
              className={`border px-3 py-1 font-mono text-[10px] uppercase tracking-wide ${
                i === 0
                  ? "border-line2 text-ink"
                  : "border-line text-muted"
              }`}
            >
              {c}
            </span>
          ))}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-wide text-muted">
            180-day retention
          </span>
        </div>
        <div className="divide-y divide-line">
          {demoAuditLog.map((r, i) => (
            <div key={i} className="py-3">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p
                  className={`font-mono text-[11px] uppercase tracking-wide ${
                    r.severity === "warn"
                      ? "text-care"
                      : r.severity === "success"
                        ? "text-rise"
                        : "text-mute"
                  }`}
                >
                  {r.event}
                </p>
                <p className="font-mono text-[10px] text-muted">{r.ts}</p>
              </div>
              <p className="mt-1 text-[13px] text-mute">{r.detail}</p>
              <p className="mt-1 font-mono text-[10px] text-muted">
                by {r.actor}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ProductFrame>
  );
}
