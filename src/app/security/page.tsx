import type { Metadata } from "next";
import Link from "next/link";
import {
  Body,
  Card,
  Close,
  Eyebrow,
  Feature,
  Grid3,
  H1,
  H2,
  Lead,
  Notice,
  MetaRow,
  Page,
  Section,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Illus } from "@/components/illus";
import { site } from "@/lib/site";
import { analyticsLabel } from "@/lib/analytics-config";
import { locationAnalyticsEnabled } from "@/lib/location-config";

export const metadata: Metadata = {
  title: "Security — what this website does with your information",
  description: `How ${site.domain} handles your information, in plain English: no cookies, no tracking, and a contact form that emails a person. Every line is backed by the site's code.`,
  alternates: { canonical: `https://${site.domain}/security/` },
  openGraph: {
    title: "Security — what this website does with your information",
    description: `How ${site.domain} handles your information, in plain English: no cookies, no tracking, and a contact form that emails a person. Every line is backed by the site's code.`,
    url: `https://${site.domain}/security/`,
  },
};

const REPO_URL = "https://github.com/Doyel-Labs-LLC/doyel-labs-com";

const link = "text-accent underline decoration-accentDim underline-offset-4 hover:text-accentInk";

/**
 * /security/ — describes doyel-labs.com itself and nothing else. Every
 * claim here is backed by public/_headers, src/components/analytics.tsx,
 * and functions/api/contact.ts. If those change, this page changes the
 * same day (PROMPT.md §8).
 */
export default function Security() {
  return (
    <Page>
      <Breadcrumbs items={[{ name: "Security", href: "/security/" }]} />

      {/* 1. HERO */}
      <section className="hero-glow pt-4">
        <div className="grid grid-cols-1 items-center gap-12 [&>*]:min-w-0 md:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Security</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                What this website does with your information, <span className="text-accent">in plain English</span>.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                This page describes {site.domain} itself. Every line here is backed by the code that runs the site. If
                something changes, this page changes the same day.
              </Lead>
            </div>
          </div>
          <div className="hero-in hero-in--5">
            <Illus name="lock" className="mx-auto max-w-md" />
          </div>
        </div>
      </section>

      {/* 2. WHEN YOU VISIT */}
        <Section>
          <Eyebrow>When you visit</Eyebrow>
          <H2>What we count when you visit, and what we don&apos;t.</H2>
          <Body>
            We do measure traffic, and we&apos;d rather tell you exactly how than pretend we don&apos;t.
          </Body>
          <div className="mt-10">
            <Grid3>
              <Card title="Cookieless analytics">
                {analyticsLabel} counts page views, referrers, and broad browser and device categories. No cookies, no
                persistent identifier, no session recording. If your browser blocks it, nothing breaks.
              </Card>
              <Card title="Approximate location counts">
                {locationAnalyticsEnabled
                  ? "We keep hourly counts of visits by country, region, and city, using the approximate location Cloudflare attaches to the request. Nothing about you is stored with it: no IP address, no page path, no identifier. Do Not Track and Global Privacy Control are honored, and the counts are deleted after about 31 days."
                  : "Approximate-location counting is switched off in this build."}
              </Card>
              <Card title="Static files over HTTPS">
                Every page is a static file served by Cloudflare with strict security headers: HSTS, no framing, and a
                content-security policy that only allows scripts from this site, the analytics provider, and Cloudflare
                Turnstile.
              </Card>
            </Grid3>
          </div>
          <div className="mt-6">
            <Notice>
              The full wording, including retention periods and what the provider itself receives, is in the{" "}
              <Link href="/legal/privacy/" className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentInk">
                privacy policy
              </Link>
              . It is generated from the same configuration the site is built with, so it can&apos;t drift from reality.
            </Notice>
          </div>
        </Section>

      {/* 3. WHEN YOU SEND THE FORM — the data map */}
        <Section id="contact-form">
          <Eyebrow>When you send the form</Eyebrow>
          <H2>Where your message goes, step by step.</H2>
          <Body>
            The contact form is the one place this site takes information from you. Here is exactly what happens to it.
          </Body>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            <Feature step="01" title="It must come from here">
              The message has to be JSON sent from {site.domain}, not from another website, and stay under 16 KB.
              Anything else is refused before it is read.
            </Feature>
            <Feature step="02" title="A person check">
              A Cloudflare Turnstile check confirms you&apos;re a person. On this site and on every preview deployment, if
              the check can&apos;t run, the form refuses to send rather than sending unchecked. In production the check
              only accepts a token minted for {site.domain}.
            </Feature>
            <Feature step="03" title="A limit per network and per email">
              A limit on messages per network address and per email address stops floods. The email is kept only as a
              hash. The limit counts only after the person check, so bots can&apos;t use up your allowance.
            </Feature>
            <Feature step="04" title="Emailed to a person">
              The message is emailed to {site.supportEmail} through Resend, a mail-delivery service, and lands in a Google
              Workspace mailbox. You get one short automatic receipt that doesn&apos;t repeat what you wrote. Nothing is
              written to a database.
            </Feature>
            <Feature step="05" title="Kept only as needed">
              It stays in that mailbox as long as needed to reply and work together. If something fails, the error you
              see never includes internal details.
            </Feature>
          </div>
          <MetaRow>
            Processors: Cloudflare (hosting, Turnstile, analytics) · Resend (email delivery) · Google Workspace (mailbox) · {analyticsLabel}</MetaRow>
        </Section>

      {/* 4. WHAT WE DON'T DO */}
        <Section>
          <Eyebrow>What we don&apos;t do</Eyebrow>
          <H2>Three things this site will never add.</H2>
          <div className="mt-10">
            <Grid3>
              <Card title="No session replay, ever">
                No tools that record your screen, your mouse, or what you type. Not now, not later.
              </Card>
              <Card title="No ad pixels or retargeting">
                Nothing here tells an ad network you visited. You won&apos;t see us following you around the web.
              </Card>
              <Card title="No selling or sharing form data">
                What you write in the contact form goes to Doyel Labs and stays there. It is not sold, shared, or added
                to a list.
              </Card>
            </Grid3>
          </div>
        </Section>

      {/* 5. REPORTING A PROBLEM */}
        <Section>
          <Eyebrow>Reporting a problem</Eyebrow>
          <H2>Found something wrong? Tell a person.</H2>
          <Body>
            Email{" "}
            <a href={`mailto:${site.securityEmail}`} className={link}>
              {site.securityEmail}
            </a>{" "}
            with what you found and how to reproduce it. A person reads it. The machine-readable policy is at{" "}
            <a href="/.well-known/security.txt" className={link}>
              /.well-known/security.txt
            </a>
            . We thank reporters, and we don&apos;t pursue good-faith research.
          </Body>
          <MetaRow>
            The site&apos;s source is public on GitHub:{" "}
            <a href={REPO_URL} className="text-ink hover:text-accentInk" target="_blank" rel="noopener noreferrer">
              {REPO_URL.replace("https://", "")}
            </a>
          </MetaRow>
        </Section>

      {/* 6. CLOSE */}
      <Close eyebrow="Questions" title="Ask a person about any of this.">
        If a line on this page isn&apos;t clear, or you want to know how we&apos;d handle your own site, call or write.
        A person answers.
      </Close>
    </Page>
  );
}
