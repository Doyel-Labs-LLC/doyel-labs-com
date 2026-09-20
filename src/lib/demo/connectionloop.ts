/**
 * Synthetic demo data for ConnectionLoop frames.
 *
 * ConnectionLoop is an invite-only shared calendar for families and
 * small groups (Expo + Firebase). No real Space, no real member, no
 * real invite code. Members are demo labels.
 */

export const demoSpace = {
  name: "The Demo Family",
  memberCount: 4,
  code: "abcd-efgh-j",
  role: "admin",
};

export const demoToday = {
  date: "Thursday · September 20, 2026",
  events: [
    { at: "07:30", title: "School run — Sam", who: "OWNER 01" },
    { at: "16:00", title: "Soccer practice", who: "MEMBER 02" },
    { at: "18:30", title: "Family dinner", who: "OWNER 01" },
  ],
  lists: [
    { name: "Groceries", pending: 6, doneToday: 2 },
    { name: "Weekend chores", pending: 4, doneToday: 0 },
  ],
};

export const demoList = {
  name: "Groceries",
  items: [
    { text: "Milk", done: true, doneBy: "MEMBER 02" },
    { text: "Whole-wheat bread", done: false, doneBy: null },
    { text: "Chicken thighs", done: false, doneBy: null },
    { text: "Yogurt (any brand)", done: true, doneBy: "OWNER 01" },
    { text: "Apples", done: false, doneBy: null },
  ],
};
