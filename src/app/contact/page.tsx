import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { H1, Lead, Page } from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactPageForm } from "@/components/contact-page-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a conversation",
  description: "Tell Doyel Labs what you want to build or ask about our products. A short message is enough to start. No specification or commitment required.",
  alternates: { canonical: `https://${site.domain}/contact/` },
  openGraph: {
    title: "Start a conversation · Doyel Labs",
    description: "Tell us what you want to build, improve, or ask about. A short message is enough to start.",
    url: `https://${site.domain}/contact/`,
  },
};

export default function Contact() {
  return (
    <Page>
      <Breadcrumbs items={[{ name: "Contact", href: "/contact/" }]} />
      <section className="pt-6">
        <H1>Let&apos;s make something <span className="text-accent">useful.</span></H1>
        <Lead>Tell us what you need. A short message is enough.</Lead>
      </section>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="min-w-0 rounded-xl border border-line bg-surface/40 p-5 md:p-7">
          <Suspense fallback={<p className="text-base text-mute">Loading the form. You can also <a href={`mailto:${site.supportEmail}`} className="text-link">email us directly</a>.</p>}>
            <ContactPageForm />
          </Suspense>
        </div>
        <aside className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold">Contact us directly</h2>
            <a href={`mailto:${site.supportEmail}`} className="text-link mt-3 inline-flex min-h-11 items-center">{site.supportEmail}</a>
            <div><a href={site.phoneHref} className="text-link inline-flex min-h-11 items-center">{site.phone}</a></div>
            <p className="mt-2 text-sm text-muted">US business hours · Mountain Time</p>
          </div>
          <div className="border-t border-line pt-6">
            <h2 className="text-lg font-semibold">A reply within one business day</h2>
            <p className="mt-3 text-base leading-relaxed text-mute">Project, product, or support questions welcome. No mailing lists.</p>
          </div>
          <div className="border-t border-line pt-6 text-sm leading-relaxed text-mute">
            <p><Link href="/support/" className="text-link">Support resources</Link></p>
            <p className="mt-3">Security concerns go to <a href={`mailto:${site.securityEmail}`} className="text-link">{site.securityEmail}</a>.</p>
          </div>
        </aside>
      </div>
    </Page>
  );
}
