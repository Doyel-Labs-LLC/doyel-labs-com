import { demoList, demoSpace, demoToday } from "@/lib/demo/connectionloop";
import { ProductFrame } from "@/components/product-frame";

/**
 * ConnectionLoop phone frame — Today calendar + a shared list, in the
 * two-column shape the tabs give you (Calendar + Lists).
 */
export function ConnectionLoopTodayFrame() {
  return (
    <ProductFrame
      screen="Today / Space"
      caption="ConnectionLoop — one Space, one loop"
    >
      <div className="pt-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: Today */}
          <div className="border border-line p-4">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                Today
              </p>
              <p className="text-[11px] text-muted">{demoSpace.name}</p>
            </div>
            <p className="mt-1 text-[15px] font-semibold text-ink">
              {demoToday.date}
            </p>
            <ul className="mt-4 space-y-3 text-[13px]">
              {demoToday.events.map((e, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span className="w-14 shrink-0 font-mono text-[11px] text-mute">
                    {e.at}
                  </span>
                  <div>
                    <p className="text-ink">{e.title}</p>
                    <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                      {e.who}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-wide text-muted">
              Invite code · {demoSpace.code}
            </div>
          </div>

          {/* Right: Groceries */}
          <div className="border border-line p-4">
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
              Shared list
            </p>
            <p className="mt-1 text-[15px] font-semibold text-ink">
              {demoList.name}
            </p>
            <ul className="mt-4 space-y-2 text-[13px]">
              {demoList.items.map((it, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className={`inline-block h-3.5 w-3.5 border ${
                      it.done ? "border-rise bg-rise/20" : "border-line2"
                    }`}
                  />
                  <span
                    className={
                      it.done
                        ? "text-muted line-through"
                        : "text-ink"
                    }
                  >
                    {it.text}
                  </span>
                  {it.doneBy ? (
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-wide text-muted">
                      {it.doneBy}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-wide text-muted">
              Invite-only · {demoSpace.memberCount} members
            </div>
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}
