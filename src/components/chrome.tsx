import Link from "next/link";
import type { ReactNode } from "react";
import { companyLegal, site } from "@/lib/site";
import { response } from "@/lib/offer";
import { buttonClass, textLink } from "@/components/button-styles";
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

// Opaque on mobile so sticky content never bleeds through on iOS Safari;
// translucent with blur on desktop.
export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg md:bg-bg/80 md:backdrop-blur-lg md:backdrop-saturate-150">
      <div className="mx-auto flex h-[72px] max-w-band items-center justify-between px-6 md:px-10">
        <Link href="/" className="group flex items-center gap-3 rounded-md" aria-label="Doyel Labs — home">
          <LogoMark size={24} />
          <span className="wordmark text-[13px] text-ink transition-colors group-hover:text-accent" translate="no">
            Doyel Labs
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-[15px] font-medium text-mute md:flex">
          <NavLinks items={nav} />
          <ContactWidget label="Talk to a person" size="small" />
        </nav>
        <MobileNav items={nav} />
      </div>
    </header>
  );
}

/** The "who answers" block. Every page, above the footer links. */
export function WhoAnswers() {
  return (
    <div className="who-answers rounded-panel p-7 shadow-card md:p-10">
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_200px]">
        <div>
          <Eyebrow>Who answers</Eyebrow>
          <p className="mt-4 font-display text-h2Sm text-ink md:text-[36px] md:leading-[1.12]">
            A real person. <span className="text-accent">Not a chatbot, not a ticket queue.</span>
          </p>
          <p className="mt-4 max-w-prose text-small text-mute">
            Call{" "}
            <a href={site.phoneHref} className={`${textLink} whitespace-nowrap`}>
              {site.phone}
            </a>{" "}
            {site.hours}. Or email{" "}
            <a href={`mailto:${site.supportEmail}`} className={textLink}>
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

const footerLinks = [...nav, { href: "/contact/", label: "Contact" }, { href: "/security/", label: "Security" }, { href: "/legal/terms/", label: "Legal" }];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-28 md:mt-36">
      <div className="mx-auto max-w-band px-6 pb-12 md:px-10">
        <WhoAnswers />
        <div className="mt-12 flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="flex items-center gap-2.5 text-ink">
              <LogoMark size={20} />
              <span className="wordmark text-[12px]" translate="no">
                Doyel Labs
              </span>
            </span>
            <p className="mt-3 text-[15px] text-mute">{site.city}</p>
            <p className="mt-1 text-[15px] text-mute">
              <a href={site.phoneHref} className="whitespace-nowrap hover:text-accent">
                {site.phone}
              </a>{" "}
              · {site.hoursShort}
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-[15px] text-mute sm:grid-cols-4">
            {footerLinks.map((n) => (
              <Link key={n.href} href={n.href} className="transition-colors hover:text-accent">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-10 max-w-prose text-[13px] leading-relaxed text-muted">
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

/** Small uppercase label with an amber bar before it. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-eyebrow text-accent">
      <span className="accent-bar" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Sentence-case display heading. One per page. A `.text-accent` span inside renders in italic. */
export function H1({ children }: { children: ReactNode }) {
  return <h1 className="mt-5 max-w-4xl font-display text-displaySm text-ink md:text-display">{children}</h1>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-4 max-w-3xl font-display text-h2Sm text-ink md:text-h2">{children}</h2>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-3 font-display text-h3 text-ink">{children}</h3>;
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-6 max-w-prose text-[18px] leading-[1.6] text-mute md:text-lead">{children}</p>;
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`mt-5 max-w-prose text-body text-mute ${className}`}>{children}</p>;
}

/**
 * A page band with consistent vertical rhythm. `tone="warm"` sets the
 * content on a rounded amber-washed panel — use it for one band per page.
 */
export function Section({
  children,
  rule = false,
  id,
  className = "",
  tone,
}: {
  children: ReactNode;
  rule?: boolean;
  id?: string;
  className?: string;
  tone?: "warm";
}) {
  const spacing = "mt-24 md:mt-36";
  if (tone === "warm") {
    return (
      <section id={id} className={`${spacing} band-warm rounded-panel px-6 py-14 md:px-14 md:py-20 ${className}`}>
        {children}
      </section>
    );
  }
  return (
    <section id={id} className={`${spacing} ${rule ? "border-t border-line pt-16 md:pt-24" : ""} ${className}`}>
      {children}
    </section>
  );
}

/** Two-column split: text on one side, a visual on the other. */
export function Split({ children, visual, reverse = false }: { children: ReactNode; visual: ReactNode; reverse?: boolean }) {
  return (
    <div className={`grid grid-cols-1 items-center gap-12 [&>*]:min-w-0 md:grid-cols-2 md:gap-20 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div>{children}</div>
      <div>{visual}</div>
    </div>
  );
}

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" width="16" height="16" className="shrink-0 transition-transform duration-200 ease-soft group-hover/btn:translate-x-0.5">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CtaLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className: string;
  external: boolean;
}) {
  const content = (
    <>
      {children}
      <Arrow />
    </>
  );
  const cls = `group/btn ${className}`;
  const isNative = external || href.startsWith("tel:") || href.startsWith("mailto:");
  if (isNative) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

/** Primary CTA — the one solid button on any band. */
export function PrimaryLink({ href, children, small = false, external = false }: { href: string; children: ReactNode; small?: boolean; external?: boolean }) {
  return (
    <CtaLink href={href} external={external} className={buttonClass("primary", small ? "small" : "regular")}>
      {children}
    </CtaLink>
  );
}

/** Secondary CTA. */
export function GhostLink({ href, children, small = false, external = false }: { href: string; children: ReactNode; small?: boolean; external?: boolean }) {
  return (
    <CtaLink href={href} external={external} className={buttonClass("secondary", small ? "small" : "regular")}>
      {children}
    </CtaLink>
  );
}

/** White card with a soft warm shadow. `accent` marks the recommended option. */
export function Card({ title, children, accent = false }: { title: string; children: ReactNode; accent?: boolean }) {
  return (
    <div
      className={`relative h-full rounded-card border p-7 shadow-card ${
        accent ? "border-accent/30 bg-surface ring-1 ring-accent/15" : "surface-card border-line"
      }`}
    >
      {accent ? <span aria-hidden="true" className="absolute inset-x-7 top-0 h-[3px] rounded-b-full bg-accent" /> : null}
      <h3 className="font-display text-[22px] font-medium leading-snug text-ink">{title}</h3>
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

/** Numbered step: a warm numeral disc, a title, a sentence or two. */
export function Feature({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  const n = Number.parseInt(step, 10);
  return (
    <div>
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-warmSoft font-display text-[20px] italic text-ink ring-1 ring-warm/40"
      >
        {Number.isNaN(n) ? step : n}
      </span>
      <h3 className="mt-5 text-[18px] font-semibold text-ink">
        <span className="sr-only">Step {Number.isNaN(n) ? step : n}: </span>
        {title}
      </h3>
      <p className="mt-2 text-small text-mute">{children}</p>
    </div>
  );
}

/** Callout. */
export function Notice({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-accent/20 bg-accentSoft px-5 py-4 text-small text-ink">{children}</div>;
}

function CheckIcon() {
  return (
    <span aria-hidden="true" className="mt-[3px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accentSoft text-accent ring-1 ring-accent/20">
      <svg viewBox="0 0 16 16" width="12" height="12">
        <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** Check list. */
export function Checks({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-7 space-y-4">
      {items.map((t) => (
        <li key={t} className="flex gap-3.5 text-body text-mute">
          <CheckIcon />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Soft pill for a short fact. */
export function AccentChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-[14px] font-medium text-ink shadow-[0_1px_2px_rgba(60,44,20,0.05)]">
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

/** Amber pill for program status. */
export function StatusChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-care/30 bg-warmSoft px-3 py-1 text-[13px] font-semibold text-care">
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-care" />
      {children}
    </span>
  );
}

/** Big price line. */
export function Price({ amount, terms }: { amount: string; terms: string }) {
  return (
    <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="tabular font-display text-[52px] font-medium leading-none tracking-[-0.02em] text-ink md:text-[64px]">{amount}</span>
      <span className="text-[15px] font-medium text-mute">{terms}</span>
    </p>
  );
}

/** FAQ list using native details/summary. */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="mt-10 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface shadow-card">
      {items.map((it) => (
        <details key={it.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[18px] font-semibold text-ink transition-colors hover:bg-surface2/60 md:px-8 [&::-webkit-details-marker]:hidden">
            {it.q}
            <span aria-hidden="true" className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accentSoft text-[20px] leading-none text-accent">
              +
            </span>
          </summary>
          <p className="max-w-prose px-6 pb-6 text-small text-mute md:px-8">{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Closing band: a warm panel with one primary CTA plus the phone. */
export function Close({ eyebrow = "Next step", title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <Section tone="warm">
      <div className="grid items-center gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-16">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <H2>{title}</H2>
          {children ? <Body>{children}</Body> : null}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ContactWidget label="Talk to a person" />
            <GhostLink href={site.phoneHref}>Call {site.phone}</GhostLink>
          </div>
          <p className="mt-5 text-[14px] text-mute">
            {site.hoursShort} · A person replies {response.window}
          </p>
        </div>
        <Photo name="close-desk" fallback="call" alt="A tidy desk with a phone, notebook, and a window with morning light" className="mx-auto max-w-sm" />
      </div>
    </Section>
  );
}

/** Small footnote line. */
export function MetaRow({ children }: { children: ReactNode }) {
  return <p className="mt-6 text-[14px] text-muted">{children}</p>;
}
