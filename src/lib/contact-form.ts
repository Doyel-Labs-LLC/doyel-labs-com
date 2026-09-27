/**
 * Shared contact-form contract. Used by the modal, the inline form on
 * /contact/, and the Pages Function in functions/api/contact.ts. One
 * list of project types, one set of limits, one validator.
 *
 * This file must stay free of React and Node imports — it runs in the
 * browser, in the Next build, and in the Cloudflare Workers runtime.
 */

export const PROJECT_TYPES = [
  { value: "website", label: "I need a website ($1,299)" },
  { value: "custom", label: "I have a software idea" },
  { value: "idea", label: "I'm not sure yet — I'd like to talk it through" },
  { value: "maintenance", label: "I need help with software I already have" },
  { value: "general", label: "Something else" },
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number]["value"];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  website: "Website",
  custom: "Custom software",
  idea: "Needs scoping",
  maintenance: "Existing software",
  general: "General",
};

export const LIMITS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000,
  preferredTimes: 500,
  /** Max request body in bytes, checked before JSON parsing. */
  body: 16 * 1024,
} as const;

export type ContactInput = {
  name?: unknown;
  email?: unknown;
  projectType?: unknown;
  subject?: unknown;
  message?: unknown;
  preferredTimes?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
};

export type ContactClean = {
  name: string;
  email: string;
  projectType: ProjectType;
  subject: string;
  message: string;
  preferredTimes: string;
  honeypot: string;
  turnstileToken: string;
};

/** Strict-enough address check: one @, no whitespace, no commas, no
 *  query characters that could smuggle mailto parameters. */
export const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

/** Single-line fields must not carry line breaks (email header safety). */
function line(v: unknown, max: number): string {
  return str(v, max).replace(/[\r\n]+/g, " ");
}

export function isProjectType(v: string): v is ProjectType {
  return PROJECT_TYPES.some((t) => t.value === v);
}

export function cleanContact(raw: ContactInput): ContactClean {
  const pt = line(raw.projectType, 40).toLowerCase();
  return {
    name: line(raw.name, LIMITS.name),
    email: line(raw.email, LIMITS.email),
    projectType: isProjectType(pt) ? pt : "general",
    subject: line(raw.subject, LIMITS.subject),
    message: str(raw.message, LIMITS.message),
    preferredTimes: str(raw.preferredTimes, LIMITS.preferredTimes),
    honeypot: str(raw.website, 200),
    turnstileToken: line(raw.turnstileToken, 2048),
  };
}

/** Returns an error string, or null when the input is acceptable. */
export function validateContact(c: ContactClean): string | null {
  if (!c.email || !EMAIL_RE.test(c.email)) return "A valid email is required.";
  if (!c.message || c.message.length < 5) return "Please include a message.";
  return null;
}
