/**
 * Real, named client testimonials. Every entry MUST be approved by the
 * quoted party in writing. Never add anonymous or fabricated copy here.
 *
 * The `full` field is what renders inside a `<Quote>` block on a page
 * like the case study. The `short` field is a one-sentence excerpt for
 * use in tighter surfaces (home hero band, services hero, etc.).
 */
import { steadfastCase } from "@/lib/demo/websites";

export type Testimonial = {
  id: string;
  attribution: string;
  company: string;
  companyUrl: string;
  logo: string;
  short: string;
  full: string[];
};

export const steadfastTestimonial: Testimonial = {
  id: "steadfast",
  attribution: "SteadFast Transportation Inc.",
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
};

export const testimonials: Testimonial[] = [steadfastTestimonial];
