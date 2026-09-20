/**
 * Synthetic demo data for the payroll product frames.
 *
 * The DOM fields, labels, and formulas match the real app in
 * `C:\Users\bdoye\Desktop\index\steadfast-payroll-app.html` (kept out of
 * git). Names are demo-only. SSN is masked. WD 1977-0194 is a public
 * SAM.gov example. Amounts are round demo numbers.
 */

export type Contractor = {
  id: string;
  name: string; // demo label only
  title: string;
  state: string;
  ssnLast4: string; // always shown as ***
  wd: string;
  contract: string;
  dayRate: number;
  minWage: number;
  hwFringe: number;
  status: "active" | "inactive";
};

export const demoContractors: Contractor[] = [
  {
    id: "op-04",
    name: "OPERATOR 04",
    title: "Driver / Caser",
    state: "MT",
    ssnLast4: "••••",
    wd: "1977-0194",
    contract: "691A3",
    dayRate: 277.23,
    minWage: 20.73,
    hwFringe: 5.55,
    status: "active",
  },
  {
    id: "op-07",
    name: "J. REED",
    title: "Driver / Caser",
    state: "MT",
    ssnLast4: "••••",
    wd: "1977-0194",
    contract: "691A3",
    dayRate: 277.23,
    minWage: 20.73,
    hwFringe: 5.55,
    status: "active",
  },
  {
    id: "op-11",
    name: "OPERATOR 11",
    title: "Driver / Caser",
    state: "ND",
    ssnLast4: "••••",
    wd: "1977-0194",
    contract: "691A3",
    dayRate: 285.0,
    minWage: 21.4,
    hwFringe: 5.55,
    status: "active",
  },
];

/** SCA floor for the day: (base wage + H&W) x 8 hours. */
export function scaFloor(minWage: number, hw: number) {
  return (minWage + hw) * 8;
}

export type BatchRow = {
  contractorId: string;
  name: string;
  days: number;
  gross: number;
  scaMet: boolean;
};

export const demoBatch: BatchRow[] = [
  { contractorId: "op-04", name: "OPERATOR 04", days: 13, gross: 3603.99, scaMet: true },
  { contractorId: "op-07", name: "J. REED", days: 12, gross: 3326.76, scaMet: true },
  { contractorId: "op-11", name: "OPERATOR 11", days: 13, gross: 3705.0, scaMet: true },
];

export const demoAuditLog: Array<{
  ts: string;
  severity: "success" | "info" | "warn";
  event: string;
  actor: string;
  detail: string;
}> = [
  {
    ts: "2026-09-18 08:14 MDT",
    severity: "success",
    event: "paystub.generated",
    actor: "admin@steadfast",
    detail: "OPERATOR 04 · 1st–15th · SCA floor met",
  },
  {
    ts: "2026-09-18 08:14 MDT",
    severity: "success",
    event: "paystub.emailed",
    actor: "admin@steadfast",
    detail: "OPERATOR 04 · via Resend · delivered",
  },
  {
    ts: "2026-09-16 14:02 MDT",
    severity: "warn",
    event: "sca.day-rate.below-floor",
    actor: "admin@steadfast",
    detail: "Draft blocked — day rate $205.00 < floor $210.24",
  },
  {
    ts: "2026-09-16 14:00 MDT",
    severity: "info",
    event: "wd.lookup.success",
    actor: "admin@steadfast",
    detail: "Plentywood, MT → Sheridan County → WD 1977-0194 rev 26",
  },
  {
    ts: "2026-09-01 09:30 MDT",
    severity: "info",
    event: "contractor.rate.updated",
    actor: "admin@steadfast",
    detail: "OPERATOR 04 · $270.00 → $277.23 · reason: WD revision",
  },
];

/** A single paystub used by the paystub frame. */
export const demoPaystub = {
  company: {
    name: "SteadFast Transportation Inc.",
    address: "301 E 1st Ave, Plentywood, MT 59254",
    ein: "••-•••••••",
    contract: "691A3",
  },
  contractor: {
    name: "OPERATOR 04",
    title: "Driver / Caser",
    state: "MT",
    ssn: "•••-••-••••",
    wd: "1977-0194",
  },
  period: {
    label: "Sep 1 — Sep 15, 2026",
    payDate: "2026-09-18",
    check: "auto",
  },
  earnings: [
    { label: "Regular days worked (13 × $277.23)", amount: 3603.99 },
    { label: "Holiday worked (0 × $277.23)", amount: 0.0 },
    { label: "Vacation cash-in-lieu", amount: 0.0 },
  ],
  deductions: [] as Array<{ label: string; amount: number }>,
  ytd: {
    gross: 46_875.87,
    deductions: 0,
    net: 46_875.87,
  },
  sca: {
    baseWage: 20.73,
    hwFringe: 5.55,
    floorPerDay: (20.73 + 5.55) * 8,
    met: true,
  },
};
