import Link from "next/link";
import type { ReactNode } from "react";
import { companyLegal, site } from "@/lib/site";
import { response } from "@/lib/offer";
import { ContactWidget } from "@/components/contact-modal";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { Illus } from "@/components/illus";
import { Photo } from "@/components/photo";

export const nav = [
  { href: "/websites/", label: "Websites" },
  { href: "/software/", label: "Software" },
  { href: "/work/", label: "Work" },
  { href: "/how-we-work/", label: "How we work" },
  { href: "/about/", label: "About" },
];

/** Four-square logo mark, matching the physical icon. */
export function LogoMark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true" focusable="false">
      <rect x="4" y="4" width="44" height="44" rx="10" fill="#3f444b" />
      <rect x="52" y="4" width="44" height="44" rx="10" fill="#878a91" />
      <rect x="4" y="52" width="44" height="44" rx="10" fill="#c7cad0" />
      <rect x="52" y="52" width="44" height="44" rx="10" fill="#10c7eb" />
    </svg>
  );
}

// Header background: fully opaque on mobile so sticky content never bleeds
// through on iOS Safari; translucent + blur on desktop.
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg md:bg-bg/85 md:backdrop-blur-md">
      <div className="mx-auto flex max-w-band items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="group flex items-center gap-3" aria-label="Doyel Labs — home">
          <LogoMark />
          <span className="wordmark text-[13px] text-ink transition-colors group-hover:text-accentHi">Doyel Labs</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-[11px] uppercase tracking-wide text-mute md:flex">
          <NavLinks items={nav} />
          <ContactWidget label="Talk to a person" variant="primary" size="small" />
        </nav>
        <MobileNav items={nav} />
      </div>
    </header>
  );
}

/** The "who answers" block. Every page, above the footer links. */
export function WhoAnswers() {
  return (
    <div className="who-answers rounded-[3px] p-6 md:p-8">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_200px]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">Who answers</p>
          <p className="mt-3 text-h3 text-ink">
            {site.founder}. Not a chatbot, not a ticket queue.
          </p>
          <p className="mt-3 max-w-prose text-small text-mute">
            Call{" "}
            <a href={site.phoneHref} className="text-ink underline decoration-accentDim underline-offset-4 hover:text-accentHi">
              {site.phone}
            </a>{" "}
            {site.hours}. Or email{" "}
            <a href={`mailto:${site.supportEmail}`} className="text-ink underline decoration-accentDim underline-offset-4 hover:text-accentHi">
              {site.supportEmail}
            </a>{" "}
            and a person replies {response.window}, {response.usually}.
          </p>
        </div>
        <Illus name="answer" decorative className="hidden max-w-[200px] md:block" />
      </div>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-band px-6 py-12 md:px-10">
        <WhoAnswers />
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-wide text-mute">
          <span className="flex items-center gap-2 text-ink">
            <LogoMark size={16} />
            <span className="wordmark text-[11px]">Doyel Labs</span>
          </span>
          <span>{site.city}</span>
          <span className="grow" />
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-accentHi">
              {n.label}
            </Link>
          ))}
          <Link href="/contact/" className="hover:text-accentHi">
            Contact
          </Link>
          <Link href="/security/" className="hover:text-accentHi">
            Security
          </Link>
          <Link href="/legal/terms/" className="hover:text-accentHi">
            Legal
          </Link>
        </div>
        <p className="mt-8 max-w-prose text-[12px] leading-relaxed text-muted">
          © {year} {site.company}. {companyLegal} Terms and privacy notices are under review by counsel.
        </p>
      </div>
    </footer>
  );
}

/** Whole-page shell. */
export function Page({ children, narrow = false }: { children: ReactNode; narrow?: boolean }) {
  return (
    <>
      <Header />
      <main id="main" className={`mx-auto px-6 md:px-10 ${narrow ? "max-w-3xl" : "max-w-band"}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}

/** Eyebrow with a cyan accent bar before the label. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-eyebrow text-mute">
      <span className="accent-bar" />
      {children}
    </p>
  );
}

/** Sentence-case display heading. One per page. */
export function H1({ children }: { children: ReactNode }) {
  return <h1 className="mt-4 max-w-4xl text-displaySm text-ink md:text-display">{children}</h1>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-3 max-w-3xl text-h2Sm text-ink md:text-h2">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-h3 text-ink">{children}</h3>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-6 max-w-prose text-[18px] leading-[1.6] text-mute md:text-[19px]">{children}</p>;
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`mt-5 max-w-prose text-body text-mute ${className}`}>{children}</p>;
}

/** A page band: consistent vertical rhythm and an optional top rule. */
export function Section({ children, rule = true, id, className = "" }: { children: ReactNode; rule?: boolean; id?: string; className?: string }) {
  return (
    <section id={id} className={`mt-20 md:mt-28 ${rule ? "border-t border-line pt-14 md:pt-20" : ""} ${className}`}>
      {children}
    </section>
  );
}

/** Two-column split: text on one side, a visual on the other. */
export function Split({ children, visual, reverse = false }: { children: ReactNode; visual: ReactNode; reverse?: boolean }) {
  return (
    <div className={`grid grid-cols-1 items-center gap-10 [&>*]:min-w-0 md:grid-cols-2 md:gap-16 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div>{children}</div>
      <div>{visual}</div>
    </div>
  );
}

const ctaBase =
  "inline-flex items-center gap-2 rounded-full transition-all duration-200 ease-soft uppercase tracking-wide";

/** Primary CTA — the one bright button on any band. */
export function PrimaryLink({ href, children, small = false, external = false }: { href: string; children: ReactNode; small?: boolean; external?: boolean }) {
  const className = `${ctaBase} border border-accent bg-accentSoft text-accent shadow-glow hover:border-accentHi hover:bg-accent/15 hover:text-accentHi focus-visible:border-accentHi ${
    small ? "px-4 py-2 text-[12px]" : "px-6 py-3 text-[13px]"
  }`;
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
        <span aria-hidden="true">→</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

/** Ghost secondary CTA. */
export function GhostLink({ href, children, small = false, external = false }: { href: string; children: ReactNode; small?: boolean; external?: boolean }) {
  const className = `${ctaBase} border border-line2 text-ink hover:border-ink hover:bg-ink/[0.04] focus-visible:border-ink ${
    small ? "px-4 py-2 text-[12px]" : "px-6 py-3 text-[13px]"
  }`;
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
        <span aria-hidden="true">→</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}

/** Elevated card. Sentence-case title. */
export function Card({ title, children, accent = false }: { title: string; children: ReactNode; accent?: boolean }) {
  return (
    <div
      className={`group/card rounded-[3px] border p-6 shadow-card transition-all duration-200 ease-soft hover:-translate-y-0.5 hover:shadow-cardHover ${
        accent ? "border-accentDim bg-accentSoft" : "surface-card border-line hover:border-accentDim"
      }`}
    >
      <h3 className={`text-[17px] font-semibold leading-snug ${accent ? "text-accent" : "text-ink"}`}>{title}</h3>
      <div className="mt-3 text-small text-mute">{children}</div>
    </div>
  );
}

export function Grid3({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-3">{children}</div>;
}

export function Grid2({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>;
}

/** Numbered step. */
export function Feature({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <div className="border-t border-line pt-5">
      <p className="font-mono text-[10px] uppercase tracking-wide text-accent">{step}</p>
      <h3 className="mt-2 text-[17px] font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-small text-mute">{children}</p>
    </div>
  );
}

/** Callout. */
export function Notice({ children }: { children: ReactNode }) {
  return <div className="border-l-2 border-accent bg-accentSoft px-5 py-4 text-small text-ink">{children}</div>;
}

/** Simple check list. */
export function Checks({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-body text-mute">
          <span aria-hidden="true" className="mt-[9px] inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Cyan chip for facts. */
export function AccentChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-accentDim px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-accent">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

/** Amber chip for program status. */
export function StatusChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-care/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-care">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-care" />
      {children}
    </span>
  );
}

/** Big price line. */
export function Price({ amount, terms }: { amount: string; terms: string }) {
  return (
    <p className="mt-2 flex items-baseline gap-3">
      <span className="text-[44px] font-semibold leading-none tracking-display text-ink md:text-[56px]">{amount}</span>
      <span className="font-mono text-[11px] uppercase tracking-wide text-mute">{terms}</span>
    </p>
  );
}

/** FAQ list using native details/summary. */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="mt-8 divide-y divide-line border-y border-line">
      {items.map((it) => (
        <details key={it.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {it.q}
            <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-prose text-small text-mute">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Closing band: one primary CTA plus the phone. */
export function Close({ eyebrow = "Next step", title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <H2>{title}</H2>
          {children ? <Body>{children}</Body> : null}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ContactWidget label="Talk to a person" />
            <GhostLink href={site.phoneHref} small>
              Call {site.phone}
            </GhostLink>
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted">{site.hoursShort} · reply {response.window}</p>
        </div>
        <Photo name="close-desk" fallback="call" alt="A tidy desk with a phone, notebook, and a window with morning light" className="mx-auto max-w-sm" />
      </div>
    </Section>
  );
}

/** Small mono footnote. */
export function MetaRow({ children }: { children: ReactNode }) {
  return <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">{children}</p>;
}
