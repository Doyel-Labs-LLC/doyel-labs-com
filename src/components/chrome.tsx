import Link from "next/link";
import type { ReactNode } from "react";
import { companyLegal, site } from "@/lib/site";

const nav = [
  { href: "/services/", label: "Services" },
  { href: "/programs/", label: "Programs" },
  { href: "/engineering/", label: "Engineering" },
  { href: "/security/", label: "Security" },
  { href: "/company/", label: "Company" },
];

/**
 * Sparse fixed nav. No CTA. The wordmark is DOYEL LABS in spaced small
 * caps — same visual weight as the nav items so the page can lead with
 * the H1 rather than the header.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-band items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="wordmark text-[13px] text-ink"
          aria-label="Doyel Labs home"
        >
          Doyel Labs
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
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}

/** Compact hamburger-less mobile nav: two lines of small caps, wrapped. */
function MobileNav() {
  return (
    <nav
      aria-label="Primary"
      className="flex flex-wrap justify-end gap-x-4 gap-y-1 text-[10px] uppercase tracking-wide text-mute md:hidden"
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
    </nav>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto max-w-band px-6 py-12 md:px-10">
        <p className="max-w-prose text-[12px] leading-relaxed text-muted">
          {companyLegal}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-wide text-mute">
          <span className="text-ink">
            {site.company} · {site.city}
          </span>
          <a
            href={`mailto:${site.supportEmail}`}
            className="hover:text-ink"
          >
            {site.supportEmail}
          </a>
          <a href={site.phoneHref} className="hover:text-ink">
            {site.phone}
          </a>
          <span className="grow" />
          <Link href="/legal/terms/" className="hover:text-ink">
            Legal
          </Link>
          <Link href="/status/" className="hover:text-ink">
            Status
          </Link>
          <Link href="/support/" className="hover:text-ink">
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
            className="underline decoration-line2 underline-offset-2 hover:text-ink"
          >
            {site.supportEmail}
          </a>{" "}
          with any question.
        </p>
      </div>
    </footer>
  );
}

/** The whole-page shell. `bandFooter` adds an extra band-level footer
 * override — used on `/programs/bai/` for the full trading disclaimer. */
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

/** Small caps 11px eyebrow, tracked at 0.18em. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">
      {children}
    </p>
  );
}

/** H1: uppercase, tracked -0.01em, ink. On black at ~48px this reads
 * as an aerospace briefing headline. */
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

/** Ghost pill CTA. There is exactly one primary style; nothing filled.
 * Renders as an `<a>` through next/link. */
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

/** A quiet row used inside bands — hairline top, generous vertical rhythm. */
export function Band({
  eyebrow,
  title,
  children,
  right,
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <section className="border-t border-line pt-16 md:pt-24">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          {title ? (
            <H2>
              <span className="mt-2 block">{title}</span>
            </H2>
          ) : null}
        </div>
        <div>{children}</div>
      </div>
      {right ? <div className="mt-10">{right}</div> : null}
    </section>
  );
}

/** A restrained "card" — hairline box, no fill, no shadow. */
export function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border border-line p-6">
      <h3 className="text-[13px] font-semibold uppercase tracking-wide text-ink">
        {title}
      </h3>
      <div className="mt-3 text-[14px] leading-[1.65] text-mute">
        {children}
      </div>
    </div>
  );
}

/** A boxed callout. Used for legal / disclaimer text at the bottom of a
 * program page or the risk section on /programs/bai. */
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="border border-line2 px-5 py-4 text-[13px] leading-[1.7] text-ink">
      {children}
    </div>
  );
}

/** Status chip — used on program cards to say NOT SHIPPING or SHIPPING
 * <period>. Yellow "care" hairline. */
export function StatusChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 border border-care/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-care">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-care" />
      {children}
    </span>
  );
}

/** Meta row — the small line at the bottom of a page footer that names
 * the source-of-truth file for a claim. Used sparingly. */
export function MetaRow({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
      {children}
    </p>
  );
}
