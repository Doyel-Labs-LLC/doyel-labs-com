/**
 * Synthetic demo data for the BAI trading-desk frames.
 *
 * These are shapes, not signals. No live positions, no real symbols
 * paired with quantities that a viewer could copy. Amounts are round.
 */

export type BookRow = {
  symbol: string;
  side: "long" | "short";
  qty: number;
  entry: number;
  stop: number;
  target: number;
  status: "open" | "closed" | "pending";
  rr: string;
};

export const demoBook: BookRow[] = [
  {
    symbol: "DEMO",
    side: "long",
    qty: 200,
    entry: 42.15,
    stop: 40.9,
    target: 45.6,
    status: "open",
    rr: "1R : 2.8R",
  },
  {
    symbol: "SAMPLE",
    side: "long",
    qty: 100,
    entry: 118.4,
    stop: 115.2,
    target: 126.0,
    status: "open",
    rr: "1R : 2.4R",
  },
  {
    symbol: "TICKER",
    side: "long",
    qty: 300,
    entry: 8.72,
    stop: 8.4,
    target: 9.5,
    status: "closed",
    rr: "1R : 2.4R",
  },
];

export const demoArmState = {
  broker: "Alpaca · paper",
  liveOrdersAllowed: true,
  armed: true,
  sleeve: 25000,
  dailyLossLimit: 300,
  daysActive: 4,
  lastAction: "Bracket entered — DEMO · +200 @ 42.15",
  lastActionAt: "09:41:12 ET",
};

export const demoFailClosed = [
  "Quote for SAMPLE is 12s stale — entry refused.",
  "Earnings date unknown for TICKER — position not opened.",
  "Chat asked to raise cap — refused (chat cannot spend).",
  "Watchdog silent 122s — desk auto-disarmed, no positions sold.",
];
