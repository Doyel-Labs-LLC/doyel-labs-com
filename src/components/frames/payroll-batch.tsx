import { demoBatch } from "@/lib/demo/payroll";
import { ProductFrame } from "@/components/product-frame";

/** Batch tab summary — matches the "Batch Payroll Period" card. */
export function PayrollBatchFrame() {
  const total = demoBatch.reduce((s, r) => s + r.gross, 0);
  const totalDays = demoBatch.reduce((s, r) => s + r.days, 0);
  return (
    <ProductFrame
      screen="Batch / Period"
      caption="Batch pay run — one form, many contractors"
    >
      <div className="pt-6">
        <div className="grid grid-cols-3 gap-6 border-b border-line pb-4">
          <Stat label="Period" value="Sep 1 — 15" />
          <Stat label="Contractors" value={`${demoBatch.length}`} />
          <Stat label="Batch gross" value={`$${total.toFixed(2)}`} />
        </div>
        <table className="mt-4 w-full text-[13px]">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="py-2 font-mono text-[10px] uppercase tracking-wide text-muted">
                Contractor
              </th>
              <th className="py-2 font-mono text-[10px] uppercase tracking-wide text-muted">
                Days
              </th>
              <th className="py-2 text-right font-mono text-[10px] uppercase tracking-wide text-muted">
                Gross
              </th>
              <th className="py-2 text-right font-mono text-[10px] uppercase tracking-wide text-muted">
                SCA
              </th>
            </tr>
          </thead>
          <tbody>
            {demoBatch.map((r) => (
              <tr key={r.contractorId} className="border-b border-line/60">
                <td className="py-2 text-ink">{r.name}</td>
                <td className="py-2 text-mute">{r.days}</td>
                <td className="py-2 text-right tabular-nums text-ink">
                  ${r.gross.toFixed(2)}
                </td>
                <td className="py-2 text-right">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide ${
                      r.scaMet ? "text-rise" : "text-fall"
                    }`}
                  >
                    {r.scaMet ? "ok" : "below"}
                  </span>
                </td>
              </tr>
            ))}
            <tr>
              <td className="pt-4 font-mono text-[10px] uppercase tracking-wide text-muted">
                Totals
              </td>
              <td className="pt-4 text-mute">{totalDays}</td>
              <td className="pt-4 text-right tabular-nums text-ink">
                ${total.toFixed(2)}
              </td>
              <td className="pt-4 text-right font-mono text-[10px] uppercase tracking-wide text-rise">
                clean
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </ProductFrame>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-1 text-[18px] font-semibold text-ink">{value}</p>
    </div>
  );
}
