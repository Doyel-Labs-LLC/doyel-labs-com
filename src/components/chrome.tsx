import Link from "next/link";
import type { ReactNode } from "react";
import { companyLegal, site } from "@/lib/site";
import { stageMeta, type Stage } from "@/lib/products";
import { ContactLink } from "@/components/contact-link";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";

const nav = [
  { href: "/services/", label: "Services" },
  { href: "/work/", label: "Work" },
  { href: "/products/", label: "Products" },
  { href: "/company/", label: "About" },
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
// Header background: fully opaque on mobile (`bg-bg`) so sticky-header
// content never bleeds through on iOS Safari — where `backdrop-filter`
// can drop under certain compositing conditions. Desktop keeps the
// tasteful light translucency + blur.
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg md:bg-bg/85 md:backdrop-blur-md">
      <div className="mx-auto flex max-w-band items-center justify-between gap-3 px-5 py-4 md:px-10">
        <Link
          href="/"
          className="group flex min-h-11 shrink-0 items-center gap-3"
          aria-label="Doyel Labs — home"
        >
          <LogoMark size={28} />
          <span className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-accentHi">
            Doyel Labs
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm font-medium text-mute lg:flex"
        >
          <NavLinks items={nav} />
          <ContactLink size="small" />
        </nav>
        <MobileNav items={nav} />
      </div>
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const groups = [
    { label: "Explore", links: nav.slice(0, 3) },
    { label: "Doyel Labs", links: [
      { href: "/company/", label: "About" },
      { href: "/contact/", label: "Contact" },
      { href: "/sitemap/", label: "All pages" },
    ] },
    { label: "Help & legal", links: [
      { href: "/support/", label: "Support" },
      { href: "/legal/privacy/", label: "Privacy" },
      { href: "/legal/terms/", label: "Terms" },
    ] },
  ];
  return (
    <footer className="mt-24 border-t border-line bg-surface/30">
      <div className="mx-auto max-w-band px-5 py-12 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link href="/" className="inline-flex min-h-11 items-center gap-3 text-lg font-semibold">
              <LogoMark size={24} /> Doyel Labs
            </Link>
            <p className="mt-3 text-sm text-mute">Software built around your business.</p>
            <p className="mt-2 text-sm text-muted">{site.city}</p>
            <a href={`mailto:${site.supportEmail}`} className="mt-4 block py-2 text-sm text-mute hover:text-accentHi">
              {site.supportEmail}
            </a>
            <a href={site.phoneHref} className="inline-block py-2 text-sm text-mute hover:text-accentHi">{site.phone}</a>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {groups.map((group) => (
              <nav key={group.label} aria-label={group.label}>
                <h2 className="text-sm font-semibold text-ink">{group.label}</h2>
                <ul className="mt-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex min-h-11 items-center text-sm text-mute hover:text-accentHi">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <p className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">{companyLegal}</p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
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
        <p className="mt-4 text-xs text-muted">© {year} {site.company}</p>
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
        className={`mx-auto px-5 md:px-10 ${narrow ? "max-w-3xl" : "max-w-band"}`}
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
    <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-[-0.035em] text-ink md:text-[56px]">
      {children}
    </h1>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl font-semibold leading-tight tracking-[-0.025em] text-ink md:text-4xl">
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

/** Primary link for actions outside the inquiry flow. */
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
  const className = `inline-flex min-h-11 max-w-full items-center justify-center gap-3 rounded-lg border border-accent bg-accent font-medium text-bg transition-colors hover:bg-accentHi ${
    small ? "px-4 py-2 text-sm" : "px-5 py-3 text-base"
  }`;
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
  const className = `inline-flex min-h-11 max-w-full items-center justify-center gap-3 rounded-lg border border-line2 font-medium text-ink transition-colors hover:border-ink hover:bg-ink/[0.04] ${
    small ? "px-4 py-2 text-sm" : "px-5 py-3 text-base"
  }`;
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
      className={`rounded-xl border p-6 ${
        accent
          ? "border-accentDim bg-accent/5"
          : "surface-card border-line"
      }`}
    >
      <h3
        className={`text-lg font-semibold ${
          accent ? "text-accent" : "text-ink"
        }`}
      >
        {title}
      </h3>
      <div className="mt-3 text-base leading-[1.65] text-mute">
        {children}
      </div>
    </div>
  );
}

/** Three-across grid on desktop, single column on mobile. */
export function Grid3({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">{children}</div>
  );
}

/** Two-across grid. */
export function Grid2({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">{children}</div>
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
      {/* Feature steps live inside a band whose section heading is
       * `<H2>`, so an `<h3>` here keeps the outline hierarchy tight
       * (no H2→H4 skips). Visual size stays deliberately small — this
       * is a step title, not a section header. */}
      <h3 className="mt-2 text-[15px] font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-base leading-[1.65] text-mute">{children}</p>
    </div>
  );
}

/** A boxed callout. */
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-accent bg-accent/5 px-5 py-4 text-[13px] leading-[1.7] text-ink">
      {children}
    </div>
  );
}

/** Informational status chip. Product availability uses StageBadge. */
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

/**
 * The one status badge for Doyel Labs' own-brand products. Three stages,
 * one visual language, used everywhere a product appears so a visitor
 * never has to guess what "live" vs "beta" vs "coming" means. The label
 * text comes from `stageMeta` in `@/lib/products` — single source of truth.
 *
 *   live → rise green   (shipped, in real use)
 *   beta → care amber    (real software, invite-only)
 *   soon → muted         (announced, not yet available)
 */
const STAGE_STYLES: Record<Stage, { border: string; text: string; dot: string }> =
  {
    live: { border: "border-rise/60", text: "text-rise", dot: "bg-rise" },
    beta: { border: "border-care/60", text: "text-care", dot: "bg-care" },
    soon: { border: "border-line2", text: "text-mute", dot: "bg-mute" },
  };

export function StageBadge({
  stage,
  children,
}: {
  stage: Stage;
  /** Optional override; defaults to the canonical stage label. */
  children?: ReactNode;
}) {
  const s = STAGE_STYLES[stage];
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1 font-mono text-[10px] uppercase tracking-wide ${s.border} ${s.text}`}
    >
      <span className={`inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {children ?? stageMeta[stage].label}
    </span>
  );
}

/**
 * A one-line legend that defines the three stages up front. Used at the
 * top of the products page so the status vocabulary is explicit before
 * the reader meets a single badge.
 */
export function StageLegend() {
  const order: Stage[] = ["live", "beta", "soon"];
  return (
    <dl className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
      {order.map((stage) => (
        <div key={stage} className="flex items-center gap-3">
          <StageBadge stage={stage} />
          <dd className="text-[12px] leading-snug text-muted">
            {stageMeta[stage].blurb}
          </dd>
        </div>
      ))}
    </dl>
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
