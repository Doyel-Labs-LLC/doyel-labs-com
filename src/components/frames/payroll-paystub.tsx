import { demoPaystub } from "@/lib/demo/payroll";
import { ProductFrame } from "@/components/product-frame";

/** Paystub live preview — mirrors the "Live Preview" card. */
export function PayrollPaystubFrame() {
  const p = demoPaystub;
  const gross = p.earnings.reduce((s, e) => s + e.amount, 0);
  const totalDeductions = p.deductions.reduce((s, d) => s + d.amount, 0);
  const net = gross - totalDeductions;
  return (
    <ProductFrame
      screen="Paystub / Live Preview"
      caption="Paystub preview — every stub carries the SCA floor line"
    >
      <div className="pt-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-4">
          <div>
            <p className="text-[14px] font-semibold text-ink">
              {p.company.name}
            </p>
            <p className="mt-1 text-[12px] text-mute">{p.company.address}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              EIN {p.company.ein} · Contract #{p.company.contract}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Pay period
            </p>
            <p className="mt-1 text-[13px] text-ink">{p.period.label}</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">
              Pay date {p.period.payDate}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-[13px]">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Contractor
            </p>
            <p className="mt-1 text-ink">{p.contractor.name}</p>
            <p className="text-mute">
              {p.contractor.title} · {p.contractor.state}
            </p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              SSN {p.contractor.ssn} · WD {p.contractor.wd}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
              SCA line
            </p>
            <p className="mt-1 text-mute">
              Base ${p.sca.baseWage.toFixed(2)} + H&W ${p.sca.hwFringe.toFixed(2)}
              /hr
            </p>
            <p className="text-mute">
              Floor ${p.sca.floorPerDay.toFixed(2)} per 8-hr day
            </p>
            <p
              className={`mt-1 font-mono text-[11px] uppercase ${
                p.sca.met ? "text-rise" : "text-fall"
              }`}
            >
              {p.sca.met ? "SCA compliant" : "SCA short — do not issue"}
            </p>
          </div>
        </div>

        <table className="mt-6 w-full text-[13px]">
          <tbody>
            {p.earnings.map((e) => (
              <tr key={e.label} className="border-t border-line/60">
                <td className="py-2 text-mute">{e.label}</td>
                <td className="py-2 text-right tabular-nums text-ink">
                  ${e.amount.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="border-t border-line">
              <td className="py-2 text-[11px] font-semibold uppercase tracking-wide text-ink">
                Gross
              </td>
              <td className="py-2 text-right tabular-nums text-ink">
                ${gross.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 text-mute">Deductions</td>
              <td className="py-2 text-right tabular-nums text-mute">
                ${totalDeductions.toFixed(2)}
              </td>
            </tr>
            <tr className="border-t border-line2">
              <td className="py-2 text-[13px] font-semibold uppercase tracking-wide text-ink">
                Net pay
              </td>
              <td className="py-2 text-right text-[16px] font-semibold tabular-nums text-ink">
                ${net.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted">
          YTD gross ${p.ytd.gross.toFixed(2)} · YTD net ${p.ytd.net.toFixed(2)}
        </p>
      </div>
    </ProductFrame>
  );
}
