import { demoArmState, demoFailClosed } from "@/lib/demo/bai";
import { ProductFrame } from "@/components/product-frame";

/** BAI Arm bar + fail-closed log strip. */
export function BaiArmFrame() {
  const s = demoArmState;
  return (
    <ProductFrame
      screen="Arm bar / Fail-closed log"
      caption="Three locks between a scan and an order"
    >
      <div className="pt-6">
        <div className="grid gap-6 md:grid-cols-4">
          <ArmStat
            label="Broker"
            value={s.broker}
            state={s.liveOrdersAllowed ? "on" : "off"}
          />
          <ArmStat
            label="Allow live"
            value={s.liveOrdersAllowed ? "phrase accepted" : "not typed"}
            state={s.liveOrdersAllowed ? "on" : "off"}
          />
          <ArmStat
            label="Arm"
            value={s.armed ? "armed" : "disarmed"}
            state={s.armed ? "on" : "off"}
          />
          <ArmStat
            label="Daily loss limit"
            value={`$${s.dailyLossLimit}`}
            state="on"
          />
        </div>

        <div className="mt-6 border border-line p-4">
          <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
            Latest action · {s.lastActionAt}
          </p>
          <p className="mt-1 text-[14px] text-ink">{s.lastAction}</p>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          Fail-closed log (last four events)
        </p>
        <ul className="mt-2 space-y-2 text-[13px] text-mute">
          {demoFailClosed.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 bg-care" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </ProductFrame>
  );
}

function ArmStat({
  label,
  value,
  state,
}: {
  label: string;
  value: string;
  state: "on" | "off";
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-2 flex items-center gap-2 text-[14px] text-ink">
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            state === "on" ? "bg-rise" : "bg-muted"
          }`}
        />
        {value}
      </p>
    </div>
  );
}
