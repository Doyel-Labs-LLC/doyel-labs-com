import { demoContractors, scaFloor } from "@/lib/demo/payroll";
import { ProductFrame } from "@/components/product-frame";

/**
 * SCA / Wage Determination compliance panel — mirrors the "SCA Compliance"
 * card in the real app (steadfast-payroll-app.html, Manual Rate Checker +
 * SCA Reference cards).
 */
export function PayrollScaFrame() {
  const c = demoContractors[0];
  const floor = scaFloor(c.minWage, c.hwFringe);
  const ok = c.dayRate >= floor;
  return (
    <ProductFrame
      screen="SCA / Wage Determination"
      caption="SCA compliance panel — day-rate floor check"
    >
      <div className="pt-6 md:pt-8">
        <div className="grid gap-6 md:grid-cols-3">
          <ScaBig label="Base wage" value={fmt(c.minWage)} unit="per hour" />
          <ScaBig label="H&W fringe" value={fmt(c.hwFringe)} unit="per hour" />
          <ScaBig label="Day-rate floor" value={fmt(floor)} unit="8-hr day" />
        </div>
        <div className="mt-6 border border-line p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                Day rate on paystub
              </p>
              <p className="mt-1 text-[22px] font-semibold text-ink">
                {fmt(c.dayRate)}
              </p>
            </div>
            <div className={ok ? "text-rise" : "text-fall"}>
              <p className="font-mono text-[10px] uppercase tracking-wide">
                {ok ? "Compliant" : "Below floor — blocked"}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-mute">
                {ok
                  ? `${fmt(c.dayRate)} ≥ ${fmt(floor)} · SCA §41 U.S.C. 6707`
                  : `Draft cannot be issued until day rate ≥ ${fmt(floor)}`}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted">
          WD {c.wd} · Sheridan County, MT · verified via SAM.gov
        </p>
      </div>
    </ProductFrame>
  );
}

function ScaBig({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-2 text-[26px] font-semibold text-ink">{value}</p>
      <p className="mt-1 text-[11px] text-muted">{unit}</p>
    </div>
  );
}

function fmt(n: number) {
  return `$${n.toFixed(2)}`;
}
