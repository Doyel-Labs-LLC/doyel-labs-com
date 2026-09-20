import Link from "next/link";
import type { ReactNode } from "react";
import { companyLegal, site } from "@/lib/site";
import { ContactWidget } from "@/components/contact-modal";
import { MobileNav } from "@/components/mobile-nav";

const nav = [
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/company/", label: "Company" },
];

/** Four-square logo mark, matching the physical icon. */
export function LogoMark({
  size = 22,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="4" y="4" width="44" height="44" rx="10" fill="#3f444b" />
      <rect x="52" y="4" width="44" height="44" rx="10" fill="#878a91" />
      <rect x="4" y="52" width="44" height="44" rx="10" fill="#c7cad0" />
      <rect x="52" y="52" width="44" height="44" rx="10" fill="#10c7eb" />
    </svg>
  );
}

/** Sparse header with the four-square logo and a wordmark next to it. */
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-band items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Doyel Labs — home"
        >
          <LogoMark />
          <span className="wordmark text-[13px] text-ink transition-colors group-hover:text-accentHi">
            Doyel Labs
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-[11px] uppercase tracking-wide text-mute md:flex"
        >
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
          <ContactWidget label="Contact" variant="primary" size="small" />
        </nav>
        <MobileNav items={nav} />
      </div>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto max-w-band px-6 py-12 md:px-10">
        <div className="flex items-center gap-3">
          <LogoMark size={18} />
          <span className="wordmark text-[11px] text-ink">Doyel Labs</span>
        </div>
        <p className="mt-6 max-w-prose text-[12px] leading-relaxed text-muted">
          {companyLegal}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-wide text-mute">
          <span className="text-ink">
            {site.company} · {site.city}
          </span>
          <a
            href={`mailto:${site.supportEmail}`}
            className="hover:text-accentHi"
          >
            {site.supportEmail}
          </a>
          <a href={site.phoneHref} className="hover:text-accentHi">
            {site.phone}
          </a>
          <span className="grow" />
          <Link href="/start/" className="hover:text-accentHi">
            Start here
          </Link>
          <Link href="/faq/" className="hover:text-accentHi">
            FAQ
          </Link>
          <Link href="/legal/terms/" className="hover:text-accentHi">
            Legal
          </Link>
          <Link href="/status/" className="hover:text-accentHi">
            Status
          </Link>
          <Link href="/support/" className="hover:text-accentHi">
            Support
          </Link>
          <span aria-hidden="true">·</span>
          <span className="text-muted">© {year}</span>
        </div>
        <p className="mt-6 max-w-prose text-[11px] text-muted">
          Terms, privacy, and program-specific risk disclosures are under
          review by counsel. Contact{" "}
          <a
            href={`mailto:${site.supportEmail}`}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            {site.supportEmail}
          </a>{" "}
          with any question.
        </p>
      </div>
    </footer>
  );
}

/** Whole-page shell. */
export function Page({
  children,
  narrow = false,
  bandFooter,
}: {
  children: ReactNode;
  narrow?: boolean;
  bandFooter?: ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        id="main"
        className={`mx-auto px-6 md:px-10 ${narrow ? "max-w-3xl" : "max-w-band"}`}
      >
        {children}
        {bandFooter ? (
          <div className="mt-24 border-t border-line pt-8">{bandFooter}</div>
        ) : null}
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

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="mt-4 max-w-4xl text-3xl font-semibold uppercase leading-[1.05] tracking-display text-ink md:text-[54px]">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold uppercase tracking-display text-ink md:text-[32px]">
      {children}
    </h2>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 max-w-prose text-[17px] leading-[1.6] text-mute">
      {children}
    </p>
  );
}

/**
 * Primary CTA. Cyan pill with a hairline. This is the ONE bright button
 * on any page — every other action is a ghost secondary.
 */
export function PrimaryLink({
  href,
  children,
  small = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  small?: boolean;
  external?: boolean;
}) {
  const className = `inline-flex items-center gap-2 rounded-full border border-accent bg-accentSoft text-accent transition-all duration-200 ease-soft hover:border-accentHi hover:bg-accent/15 hover:text-accentHi focus-visible:border-accentHi ${
    small ? "px-4 py-2 text-[12px]" : "px-6 py-3 text-[13px]"
  } uppercase tracking-wide`;
  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
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

/** Ghost secondary CTA — no fill, hairline border. */
export function GhostLink({
  href,
  children,
  small = false,
  external = false,
}: {
  href: string;
  children: ReactNode;
  small?: boolean;
  external?: boolean;
}) {
  const className = `inline-flex items-center gap-2 rounded-full border border-line2 text-ink transition-colors duration-200 ease-soft hover:border-ink hover:bg-ink/[0.04] focus-visible:border-ink ${
    small ? "px-4 py-2 text-[12px]" : "px-6 py-3 text-[13px]"
  } uppercase tracking-wide`;
  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
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

/** A quiet card — hairline, no fill, no shadow. */
export function Card({
  title,
  children,
  accent = false,
}: {
  title: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`border p-6 transition-colors duration-200 ease-soft ${
        accent
          ? "border-accentDim bg-accentSoft/40"
          : "border-line hover:border-line2"
      }`}
    >
      <h3
        className={`text-[13px] font-semibold uppercase tracking-wide ${
          accent ? "text-accent" : "text-ink"
        }`}
      >
        {title}
      </h3>
      <div className="mt-3 text-[14px] leading-[1.65] text-mute">
        {children}
      </div>
    </div>
  );
}

/** Three-across grid on desktop, single column on mobile. */
export function Grid3({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">{children}</div>
  );
}

/** Two-across grid. */
export function Grid2({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">{children}</div>
  );
}

/** A short feature line — icon + label + body. Used in the "how we work"
 * section on the home page and the "what's in the app" band on services. */
export function Feature({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-line pt-4">
      <p className="font-mono text-[10px] uppercase tracking-wide text-accent">
        {step}
      </p>
      <h4 className="mt-2 text-[15px] font-semibold text-ink">{title}</h4>
      <p className="mt-2 text-[14px] leading-[1.65] text-mute">{children}</p>
    </div>
  );
}

/** A boxed callout. */
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-accent bg-accentSoft/40 px-5 py-4 text-[13px] leading-[1.7] text-ink">
      {children}
    </div>
  );
}

/** Status chip for programs (2027, coming this month, etc.). */
export function StatusChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-care/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-care">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-care" />
      {children}
    </span>
  );
}

/** Cyan status chip (for "in use," "shipping now," etc.). */
export function AccentChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-accentDim px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-accent">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

/** Small mono footnote — used to name the source-of-truth file for a claim. */
export function MetaRow({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
      {children}
    </p>
  );
}
