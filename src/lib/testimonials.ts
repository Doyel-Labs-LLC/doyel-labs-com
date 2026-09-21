/**
 * Real, named client testimonials. Every entry MUST be approved by the
 * quoted party in writing. Never add anonymous or fabricated copy here.
 *
 * A `Testimonial` carries:
 *   - `full` — the multi-paragraph quote, rendered on case studies and
 *     the /reviews/ page.
 *   - `short` — a one-sentence excerpt for use in tighter surfaces
 *     (home hero band, services hero, etc.).
 *   - `scope` — a short list of what Doyel Labs actually shipped for
 *     this client. Used on /reviews/ so the reader can see what the
 *     testimonial refers to.
 *   - `date` — ISO 8601, when the testimonial was written and approved
 *     for use on the site.
 *   - `verify` — a public URL (or mailto) prospects can use to verify
 *     that the quote is genuine. For SteadFast, that's the live
 *     company site.
 *
 * Adding a new testimonial: append to `testimonials` in reverse
 * chronological order (newest first).
 */
import { steadfastCase } from "@/lib/demo/websites";

export type Testimonial = {
  id: string;
  attribution: string;
  role?: string;
  company: string;
  companyUrl: string;
  logo: string;
  short: string;
  full: string[];
  /** What Doyel Labs actually shipped for this client. Human-readable
   *  short phrases — no marketing adjectives. */
  scope: string[];
  /** ISO 8601 date the testimonial was written. */
  date: string;
  /** How a prospect can verify this is real. Public URL preferred. */
  verify: {
    label: string;
    href: string;
  };
};

export const steadfastTestimonial: Testimonial = {
  id: "steadfast",
  attribution: "SteadFast Transportation Inc.",
  role: "Owner",
  company: steadfastCase.name,
  companyUrl: steadfastCase.liveUrl,
  logo: steadfastCase.logo,
  short:
    "Doyel Labs exceeded our expectations. They took the time to understand our business and delivered a site that looks exceptional and functions far better than we imagined.",
  full: [
    "When we hired Doyel Labs LLC to develop our website, we had little more than a general idea of what we wanted. We needed a professional presence with real depth — something that would represent our company well and stay easy to maintain over time.",
    "Doyel Labs exceeded those expectations. They took the time to understand our business and delivered a site that looks exceptional and functions far better than we imagined. The result is clean, professional, and built for long-term ease of use.",
    "They also developed a comprehensive payroll software solution for our company. It integrates smoothly with our existing programs, is straightforward to operate, and has become a tool we rely on regularly. The system has simplified an important part of our operations and continues to perform reliably.",
    "Doyel Labs brought technical skill, clear communication, and a genuine commitment to quality. We recommend them without hesitation to any organization looking for a capable and dependable development partner.",
  ],
  scope: [
    "Ten-page marketing site on steadfasttransportationinc.com",
    "Password-gated SCA-first payroll workspace on the same domain",
    "SAM.gov wage-determination auto-lookup + floor checks on every draft",
    "Batch pay-run engine with PDF stub export + operator-domain email",
    "180-day audit log with CSV export for the SCA 3-year rule",
    "WebAuthn passkey sign-in + full JSON / DOCX backups",
    "Live in production; running weekly pay periods since 2026",
  ],
  date: "2026-09-15",
  verify: {
    label: "Verify at steadfasttransportationinc.com",
    href: steadfastCase.liveUrl,
  },
};

/** All testimonials, newest first. */
export const testimonials: Testimonial[] = [steadfastTestimonial];
