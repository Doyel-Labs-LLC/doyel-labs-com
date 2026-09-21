import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AccentChip,
  Card,
  Eyebrow,
  GhostLink,
  Grid2,
  Grid3,
  H1,
  H2,
  Lead,
  MetaRow,
  Notice,
  Page,
  StatusChip,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactWidget } from "@/components/contact-modal";
import { BaiArmFrame } from "@/components/frames/bai-arm";
import { BaiBookFrame } from "@/components/frames/bai-book";
import { ConnectionLoopTodayFrame } from "@/components/frames/connectionloop-today";
import { Reveal } from "@/components/reveal";
import { baiDisclaimer, programStatus, site } from "@/lib/site";

/**
 * `/products/` — the unified products index.
 *
 * Replaces the earlier three-page `/programs/*` tree. Google was
 * grabbing snippets from those individual pages against the company
 * name; consolidating them into a single, well-framed page (plus
 * page-level `noindex` on the whole tree) keeps the SEO surface
 * clean while still giving prospects, testers, and reviewers
 * (looking at you, Alpaca) a single URL that documents everything
 * Doyel Labs builds and ships.
 *
 * `noindex, follow` — this page describes internal products that
 * are not yet public. Flip to `index: true` when at least one of the
 * products has shipped publicly.
 */

export const metadata: Metadata = {
  title: "Products — the software Doyel Labs ships",
  description:
    "The products Doyel Labs builds under its own brand: BAI Desk (an autonomous trading desk you run on your own computer) and ConnectionLoop (an invite-only shared calendar). Client custom software is not on this page — see /services/ for that.",
  alternates: { canonical: `https://${site.domain}/products/` },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Products — BAI Desk and ConnectionLoop | Doyel Labs",
    description:
      "BAI Desk — an autonomous trading desk that runs on your computer. ConnectionLoop — an invite-only shared calendar. Both by Doyel Labs.",
    url: `https://${site.domain}/products/`,
    type: "website",
    images: [
      {
        url: `https://${site.domain}/media/bai/bai-hero.jpg`,
        width: 1024,
        height: 576,
        alt: "BAI Desk — an autonomous trading desk by Doyel Labs",
      },
    ],
  },
};

export default function ProductsIndex() {
  return (
    <Page
      bandFooter={
        <div className="space-y-4">
          <p className="max-w-prose text-[12px] leading-relaxed text-muted">
            {baiDisclaimer}
          </p>
          <MetaRow>
            Products vs. services. Products are software Doyel Labs
            builds under its own brand. Services are software Doyel
            Labs builds for clients under their brand. See{" "}
            <Link
              href="/services/"
              className="text-mute underline decoration-line2 underline-offset-2 hover:text-accentHi"
            >
              /services/
            </Link>{" "}
            for the latter.
          </MetaRow>
        </div>
      }
    >
      <Breadcrumbs items={[{ name: "Products", href: "/products/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <Eyebrow>Products</Eyebrow>
          <H1>
            The software Doyel Labs{" "}
            <span className="text-accent">ships</span> under its own
            brand.
          </H1>
          <Lead>
            Two products, both in private beta. One is a trading desk
            you run on your own computer; the other is an invite-only
            shared calendar. Neither is a service Doyel Labs sells to
            clients — those live under{" "}
            <Link
              href="/services/"
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              /services/
            </Link>
            .
          </Lead>
          <div className="mt-8 flex flex-wrap gap-2">
            <AccentChip>Local-first</AccentChip>
            <AccentChip>Doyel Labs never touches your money</AccentChip>
            <AccentChip>Fail-closed by default</AccentChip>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
       * BAI DESK — the autonomous trading desk
       *
       * Full-width hero banner (bai-hero.jpg) sits above the
       * two-column intro. Priority is TRUE because this image is
       * the LCP element on `/products/#bai` — a direct deep-link
       * from search results and Alpaca reviewers.
       * ───────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="bai"
          className="scroll-mt-24 mt-24 border-t border-line pt-16"
        >
          {/* Brand hero banner */}
          <div className="relative overflow-hidden border border-line bg-[#0a0f14]">
            <Image
              src="/media/bai/bai-hero.jpg"
              alt="BAI Desk — an autonomous trading desk built by Doyel Labs, shown as a stylized 3D mark on a dark stage with a cyan light thread running through it"
              width={1024}
              height={576}
              priority
              sizes="(min-width: 1200px) 1024px, 100vw"
              className="h-auto w-full"
            />
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-start">
            <div>
              <Eyebrow>Doyel Labs Product · BAI Desk</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  An autonomous trading desk that runs on{" "}
                  <span className="text-accent">your</span> computer.
                </span>
              </H2>
              <div className="mt-6">
                <StatusChip>{programStatus.bai.label}</StatusChip>
              </div>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                BAI Desk is installed software, not a service that
                holds your money. It connects to your own brokerage
                account (Alpaca at launch), watches the tickers you
                allow, and enters trades only after you set a monthly
                budget, a maximum loss cap, and type the phrase that
                arms live orders. You set the rules; the desk applies
                them.
              </p>
              <p className="mt-4 max-w-prose text-[16px] leading-[1.7] text-mute">
                Every entry ships to the broker as a bracket — entry,
                stop, target — so if the laptop sleeps, the exit still
                stands. If a vendor is stale, an earnings date is
                unknown, or a quote is missing, the desk blocks the
                entry rather than guessing. An outage looks like an
                outage.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactWidget label="Request access" />
                <GhostLink href="/legal/bai/terms/" small>
                  Terms of Use
                </GhostLink>
                <GhostLink href="/legal/bai/privacy/" small>
                  Privacy Policy
                </GhostLink>
                <GhostLink href="/security/" small>
                  Security posture
                </GhostLink>
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
                Windows 10 and 11 · macOS later · US-only at launch
              </p>
            </div>
            <div className="space-y-4">
              {/* Portrait mark — layered above the two functional
               *  product frames. Uses `bai-mark.jpg` (682×1024) so
               *  the mark reads well on the right rail on desktop
               *  and stacks naturally on mobile. */}
              <div className="relative overflow-hidden border border-line bg-[#0a0f14]">
                <Image
                  src="/media/bai/bai-mark.jpg"
                  alt="BAI Desk product mark — the letters BAI rendered in polished bronze on a dark plinth, with a cyan light thread crossing them"
                  width={682}
                  height={1024}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="h-auto w-full"
                />
              </div>
              <BaiArmFrame />
              <BaiBookFrame />
            </div>
          </div>

          {/* THE THREE LOCKS */}
          <div className="mt-16">
            <Eyebrow>The three locks</Eyebrow>
            <p className="mt-4 max-w-prose text-[15px] leading-[1.7] text-mute">
              Between a scan and an order, BAI Desk requires three
              distinct authorizations. None of them can be triggered
              from chat, email, or this website.
            </p>
            <div className="mt-8">
              <Grid3>
                <Card title="Your broker, your keys">
                  Connect Alpaca (more brokers later). Your keys live
                  in Windows Credential Manager / macOS Keychain.
                  Doyel Labs never sees them and cannot place an
                  order.
                </Card>
                <Card title="Allow live, then arm">
                  Connecting a broker is not trading. You type{" "}
                  <code className="font-mono text-ink">
                    I_UNDERSTAND_THIS_IS_REAL_MONEY
                  </code>{" "}
                  once to allow live orders. You type <em>Arm</em>{" "}
                  each session. Nothing else arms the desk.
                </Card>
                <Card title="Unknown data blocks">
                  Stale quote, missing snapshot, unknown earnings
                  date, vendor rate limit — each blocks an entry
                  rather than guessing. Fail-closed by default.
                </Card>
              </Grid3>
            </div>
          </div>

          {/* WHAT BAI IS NOT */}
          <div className="mt-16 border-l-2 border-fall/60 bg-surface/30 p-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-fall">
              What BAI Desk is not
            </p>
            <ul className="mt-3 space-y-2 text-[14px] leading-[1.7] text-mute">
              <li>
                <strong className="text-ink">Not a broker-dealer.</strong>{" "}
                Your broker holds your money and executes trades.
              </li>
              <li>
                <strong className="text-ink">
                  Not an investment adviser.
                </strong>{" "}
                The strategy is mechanical and generic. No
                personalized advice.
              </li>
              <li>
                <strong className="text-ink">Not a guarantee.</strong>{" "}
                Trading can lose money, including all of it. You
                accept every trade the desk places on your behalf.
              </li>
            </ul>
            <p className="mt-4 text-[13px] leading-[1.6] text-muted">
              Read the full{" "}
              <Link
                href="/legal/bai/terms/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                Terms of Use
              </Link>{" "}
              and the{" "}
              <Link
                href="/legal/bai/privacy/"
                className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
              >
                Privacy Policy
              </Link>{" "}
              before you install.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ─────────────────────────────────────────────────────
       * CONNECTIONLOOP — the invite-only calendar
       * ───────────────────────────────────────────────────── */}
      <Reveal>
        <section
          id="connectionloop"
          className="scroll-mt-24 mt-24 border-t border-line pt-16"
        >
          <div className="grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-start">
            <div>
              <Eyebrow>Doyel Labs Product · ConnectionLoop</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  A shared calendar for families and small groups —
                  invite-only, and free.
                </span>
              </H2>
              <div className="mt-6">
                <StatusChip>{programStatus.connectionloop.label}</StatusChip>
              </div>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                ConnectionLoop is a mobile app for a small group of
                people who want a shared calendar without the
                enterprise-software surface. No ads. No data sold. No
                growth loops. You join a Space by invite code, and
                only the people already in it can see it.
              </p>
              <p className="mt-4 max-w-prose text-[16px] leading-[1.7] text-mute">
                Built by Doyel Labs and credited to The Hamilton
                Family, whose day-to-day scheduling is what shaped it.
                Currently in private testing; store submission is in
                progress this month.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactWidget label="Join the waitlist" />
                <GhostLink href="/security/" small>
                  Security posture
                </GhostLink>
              </div>
            </div>
            <ConnectionLoopTodayFrame />
          </div>

          <div className="mt-16">
            <Eyebrow>How it stays small</Eyebrow>
            <div className="mt-8">
              <Grid2>
                <Card title="Invite-only Spaces">
                  Every Space is closed by default. The only way in is
                  a code from someone already inside. No public
                  discovery.
                </Card>
                <Card title="No ads, no data sold">
                  The app is free to use for the group that owns a
                  Space. Doyel Labs does not sell user data or run
                  advertising in the product.
                </Card>
              </Grid2>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ─────────────────────────────────────────────────────
       * PRODUCTS vs SERVICES — where custom builds live
       * ───────────────────────────────────────────────────── */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Looking for the custom-software side?</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Client work is not on this page.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Products are what Doyel Labs ships under its own brand.{" "}
              <em>Services</em> are what Doyel Labs builds for clients
              under their own brand — websites, payroll workspaces,
              internal tools, dashboards, portals, integrations, data
              pipelines, and one-off programs. That is where most of
              the company&apos;s work happens.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <GhostLink href="/services/" small>
              Services overview
            </GhostLink>
            <GhostLink href="/services/websites/" small>
              Websites
            </GhostLink>
            <GhostLink href="/services/payroll/" small>
              Payroll workspaces
            </GhostLink>
            <GhostLink href="/services/custom-software/" small>
              Custom software
            </GhostLink>
            <GhostLink href="/work/" small>
              Case studies
            </GhostLink>
          </div>
        </section>
      </Reveal>

      {/* CLOSE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Want a closer look at either product?</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  Reach out — access is limited but real.
                </span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                Both products are in private testing today. If you
                want to try BAI Desk against your own broker account
                or join a ConnectionLoop Space, email{" "}
                <a
                  href={`mailto:${site.supportEmail}?subject=Product%20access`}
                  className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                >
                  {site.supportEmail}
                </a>{" "}
                and tell us which one and why.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactWidget label="Request access" />
                <GhostLink href="/security/" small>
                  Security posture
                </GhostLink>
              </div>
            </div>
            <div>
              <Notice>
                <p>
                  <strong className="text-ink">
                    Doyel Labs is a software studio first.
                  </strong>{" "}
                  These two products are a small part of what we
                  build. Most of our work is custom software for other
                  people&apos;s businesses — see{" "}
                  <Link
                    href="/services/"
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    /services/
                  </Link>
                  .
                </p>
              </Notice>
            </div>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}
