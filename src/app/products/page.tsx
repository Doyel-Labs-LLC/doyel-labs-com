import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, GhostLink, Grid3, H1, H2, Lead, Page, StageBadge } from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { BaiArmFrame } from "@/components/frames/bai-arm";
import { BaiBookFrame } from "@/components/frames/bai-book";
import { ConnectionLoopTodayFrame } from "@/components/frames/connectionloop-today";
import { products } from "@/lib/products";
import { baiDisclaimer, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Products in development",
  description: "Explore BAI Desk and ConnectionLoop: Doyel Labs products in development, not yet publicly available.",
  alternates: { canonical: `https://${site.domain}/products/` },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: {
    title: "Products in development · Doyel Labs",
    description: "An automated trading desk and a shared calendar for families and groups.",
    url: `https://${site.domain}/products/`,
  },
};

export default function Products() {
  const [bai, connectionloop] = products;
  return (
    <Page>
      <Breadcrumbs items={[{ name: "Products", href: "/products/" }]} />
      <section className="hero-glow pt-6">
        <H1>Ideas.<br /><span className="text-accent">Taking shape.</span></H1>
        <Lead>Our own products, in development. Not publicly available yet.</Lead>
      </section>

      <section id="bai" className="section-band">
        <div className="grid gap-6 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div className="flex h-56 items-center justify-center rounded-xl border border-line bg-surface p-4">
            <Image {...bai.image} alt="BAI Desk product artwork" sizes="(min-width: 768px) 440px, 90vw" className="h-full w-full object-contain" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-4"><H2>{bai.name}</H2><StageBadge stage={bai.stage} /></div>
            <p className="mt-3 text-base leading-relaxed text-mute">{bai.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{bai.pathToPublic}</p>
            <p className="mt-3 text-sm text-muted">{bai.meta}</p>
            <div className="mt-5"><ContactLink projectType="bai" label="Ask about BAI" /></div>
          </div>
        </div>
        <details className="mt-6 rounded-xl border border-line p-5">
          <summary className="min-h-11 py-2 text-lg font-medium">How the desk works</summary>
          <div className="mt-5"><Grid3>
            <Card title="Your broker, your keys">Your broker holds your funds and executes trades. Doyel Labs does not.</Card>
            <Card title="Explicit authorization">Connecting a broker does not enable trading. Allow live orders and arm the desk each session.</Card>
            <Card title="Checks before orders">Unknown or stale data blocks entries. Risk controls do not eliminate trading risk.</Card>
          </Grid3></div>
          <p className="mt-5 text-base leading-relaxed text-mute">The desk requires a monthly budget and loss cap. Each entry uses a broker-held bracket with a stop and target. To allow live orders, the operator types <code className="text-sm">I_UNDERSTAND_THIS_IS_REAL_MONEY</code>, then <em>Arm</em> for the session. Chat, email, and this website cannot authorize trading.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2"><div className="min-w-0"><BaiArmFrame /></div><div className="min-w-0"><BaiBookFrame /></div></div>
        </details>
        <div className="mt-5 rounded-xl border border-care/40 p-5">
          <h3 className="text-base font-semibold text-care">Trading involves risk</h3>
          <p className="mt-3 text-sm leading-relaxed text-mute">{baiDisclaimer}</p>
          <p className="mt-3 text-sm leading-relaxed text-mute">Not a broker-dealer, investment adviser, or guarantee. The strategy is mechanical and generic, not personalized advice. You accept every trade the desk places on your behalf.</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link href="/legal/bai/terms/" className="text-link">Terms of use</Link><Link href="/legal/bai/privacy/" className="text-link">BAI privacy policy</Link><Link href="/security/" className="text-link">Security information</Link></div>
        </div>
      </section>

      <section id="connectionloop" className="section-band">
        <div className="grid gap-6 md:grid-cols-[1fr_1.3fr] md:items-center">
          <div className="flex h-56 items-center justify-center rounded-xl border border-line bg-surface p-4">
            <Image {...connectionloop.image} alt="ConnectionLoop product artwork" sizes="(min-width: 768px) 240px, 90vw" className="h-full w-full object-contain" />
          </div>
          <div className="min-w-0 break-words">
            <H2>{connectionloop.name}</H2>
            <div className="mt-3"><StageBadge stage={connectionloop.stage} /></div>
            <p className="mt-3 text-base leading-relaxed text-mute">{connectionloop.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{connectionloop.pathToPublic}</p>
            <p className="mt-3 text-sm text-muted">{connectionloop.meta}</p>
            <div className="mt-5"><ContactLink projectType="connectionloop" label="Ask about ConnectionLoop" /></div>
          </div>
        </div>
        <details className="mt-6 rounded-xl border border-line p-5">
          <summary className="min-h-11 py-2 text-lg font-medium">Explore the calendar</summary>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-mute">Private by invitation. Free to use, with no ads or sale of user data. Built with the Hamilton Family, whose everyday scheduling helped shape the idea.</p>
          <div className="mt-5 min-w-0 max-w-2xl"><ConnectionLoopTodayFrame /></div>
        </details>
      </section>

      <div className="mt-8"><GhostLink href="/services/">Need software for your business?</GhostLink></div>
    </Page>
  );
}
