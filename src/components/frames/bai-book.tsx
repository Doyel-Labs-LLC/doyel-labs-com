import { demoBook } from "@/lib/demo/bai";
import { ProductFrame } from "@/components/product-frame";

/** BAI Book page — every row a trade, wins and losses. */
export function BaiBookFrame() {
  return (
    <ProductFrame
      screen="Book / All positions"
      caption="Book page — the whole record of what the desk did"
    >
      <div className="pt-6">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="py-2 font-mono text-[10px] uppercase tracking-wide text-muted">
                Symbol
              </th>
              <th className="py-2 font-mono text-[10px] uppercase tracking-wide text-muted">
                Side
              </th>
              <th className="py-2 text-right font-mono text-[10px] uppercase tracking-wide text-muted">
                Qty
              </th>
              <th className="py-2 text-right font-mono text-[10px] uppercase tracking-wide text-muted">
                Entry
              </th>
              <th className="py-2 text-right font-mono text-[10px] uppercase tracking-wide text-muted">
                Stop
              </th>
              <th className="py-2 text-right font-mono text-[10px] uppercase tracking-wide text-muted">
                Target
              </th>
              <th className="py-2 text-right font-mono text-[10px] uppercase tracking-wide text-muted">
                R:R
              </th>
              <th className="py-2 text-right font-mono text-[10px] uppercase tracking-wide text-muted">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {demoBook.map((r) => (
              <tr key={r.symbol} className="border-b border-line/60">
                <td className="py-2 font-mono text-ink">{r.symbol}</td>
                <td className="py-2 text-mute">{r.side}</td>
                <td className="py-2 text-right tabular-nums text-mute">
                  {r.qty}
                </td>
                <td className="py-2 text-right tabular-nums text-ink">
                  {r.entry.toFixed(2)}
                </td>
                <td className="py-2 text-right tabular-nums text-fall">
                  {r.stop.toFixed(2)}
                </td>
                <td className="py-2 text-right tabular-nums text-rise">
                  {r.target.toFixed(2)}
                </td>
                <td className="py-2 text-right font-mono text-[11px] text-mute">
                  {r.rr}
                </td>
                <td className="py-2 text-right">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wide ${
                      r.status === "open"
                        ? "text-rise"
                        : r.status === "closed"
                          ? "text-mute"
                          : "text-care"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProductFrame>
  );
}
