import type { Metadata } from "next";
import {
  AccentChip,
  Card,
  Eyebrow,
  Feature,
  GhostLink,
  Grid3,
  H1,
  H2,
  Lead,
  LogoMark,
  MetaRow,
  Notice,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactWidget } from "@/components/contact-modal";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

/**
 * `/founder/` — who's actually going to work on your project.
 *
 * The single most-asked question by any prospect hiring a small
 * software studio: "who's the human on the other end?" This page
 * answers it, honestly and without technical-credential inflation.
 *
 * PHOTO — when a real headshot is available, drop it at
 *   `public/media/founder/blake-doyel.jpg`
 * (aspect ratio ~4:5, at least 800×1000 px). The layout below
 * already reserves the right column for it; until the file exists,
 * we render the four-square logo mark at large size as a
 * deliberate placeholder — not a "photo coming soon" apology,
 * just the mark that stands for Doyel Labs itself.
 */

const FOUNDER = {
  name: "Blake Doyel",
  role: "Founder & lead engineer",
  city: site.city,
  email: site.supportEmail,
  // FUTURE: when a headshot is available, drop it at
  // `public/media/founder/blake-doyel.jpg` (aspect ratio 4:5, at
  // least 800×1000 px), then swap the placeholder in
  // `<FounderPortrait>` for an `<Image>` at that path.
};

export const metadata: Metadata = {
  title: `Founder — ${FOUNDER.name}, ${FOUNDER.role} at ${site.company}`,
  description: `${FOUNDER.name} is the founder and lead engineer at ${site.company}, a custom software studio in ${site.city}. The person you talk to during the one-hour orientation, and the person who ships your build.`,
  alternates: { canonical: `https://${site.domain}/founder/` },
  openGraph: {
    title: `${FOUNDER.name} — Founder, ${site.company}`,
    description: `The human on the other end of the orientation call. Founder of ${site.company}.`,
    url: `https://${site.domain}/founder/`,
    type: "profile",
  },
};

/** Person schema linked to the Organization. Google uses this to
 * populate Knowledge Panel data and confirms who owns the company. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `https://${site.domain}/founder/#person`,
  name: FOUNDER.name,
  jobTitle: FOUNDER.role,
  worksFor: { "@id": `https://${site.domain}/#organization` },
  founder: [{ "@id": `https://${site.domain}/#organization` }],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Casper",
    addressRegion: "WY",
    addressCountry: "US",
  },
  email: FOUNDER.email,
  url: `https://${site.domain}/founder/`,
};

export default function Founder() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Everything on this page is written by Blake, reviewed by
          Blake, and true as of {new Date().getFullYear()}. If
          something on it is out of date,{" "}
          <a
            href={`mailto:${site.supportEmail}?subject=Founder%20page%20correction`}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            email us
          </a>{" "}
          — we'll fix it.
        </MetaRow>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Breadcrumbs items={[{ name: "Founder", href: "/founder/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-start md:gap-10 lg:gap-16">
          <div>
            <div className="hero-in hero-in--1">
              <Eyebrow>Founder</Eyebrow>
            </div>
            <div className="hero-in hero-in--2">
              <H1>
                Hi — I&apos;m{" "}
                <span className="text-accent">Blake</span>.
              </H1>
            </div>
            <div className="hero-in hero-in--3">
              <Lead>
                I&apos;m the founder of {site.company} and the person
                you&apos;ll talk to during the one-hour orientation. I
                write the code, read every diff, ship the release, and
                answer the phone. This page is about how I ended up
                here and what I do all day — so you know who&apos;s on
                the other end of the &quot;book an orientation&quot;
                button.
              </Lead>
            </div>
            <div className="hero-in hero-in--4 mt-8 flex flex-wrap gap-2">
              <AccentChip>Founder &amp; lead engineer</AccentChip>
              <AccentChip>{site.city}</AccentChip>
              <AccentChip>Real human at every step</AccentChip>
            </div>
            <div className="hero-in hero-in--5 mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Book an orientation" />
              <GhostLink href="/how-we-work/" small>
                How I work
              </GhostLink>
            </div>
          </div>

          {/* Right column: photo (when available) or LogoMark. */}
          <div className="hero-in hero-in--5">
            <FounderPortrait />
          </div>
        </div>
      </section>

      {/* WHY DOYEL LABS EXISTS */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Why Doyel Labs exists</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Because most software builds don&apos;t need a team of
                twenty.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.75] text-mute">
              Most operators — mom-and-pop shops, family-run
              businesses, small teams, growing companies — don&apos;t
              need a mid-market SaaS platform. They need a specific
              piece of software that fits their operation, ships in
              weeks, and doesn&apos;t chain them to a monthly bill
              forever. That&apos;s the entire premise of Doyel Labs.
            </p>
            <p className="mt-4 text-[16px] leading-[1.75] text-mute">
              I&apos;m not a career software engineer with a computer
              science degree. What I am is somebody who spent enough
              time trying to make operations run cleanly to know when
              software would help — and when it would just get in the
              way. When AI-native tooling got good enough that a
              disciplined person could scaffold real production code
              in a fraction of the time it used to take, I built
              Doyel Labs to serve the operators that mid-market
              vendors ignore.
            </p>
            <p className="mt-4 text-[16px] leading-[1.75] text-mute">
              The company launched in September 2026, in Casper,
              Wyoming.
            </p>
          </div>
        </section>
      </Reveal>

      {/* WHAT I DO */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What I do all day</Eyebrow>
            <H2>
              <span className="mt-2 block">
                The four things that fill my week.
              </span>
            </H2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Feature step="01" title="Take the orientation calls">
              Every prospect gets an hour on my calendar. No account
              executive, no screener, no chatbot. If you email us,
              I&apos;m the person emailing you back.
            </Feature>
            <Feature step="02" title="Write the scopes and quotes">
              After the orientation, I write the one-to-two-page
              scope, decide the price, and put it in your inbox by
              the end of the next business day. Nothing else starts
              until you sign it.
            </Feature>
            <Feature step="03" title="Build the software">
              AI drafts the boilerplate, tests, migrations, and copy.
              I read every diff, make the product decisions, own the
              deployments, and write the parts that AI is confidently
              wrong on (auth, money paths, compliance code).
            </Feature>
            <Feature step="04" title="Stay on to keep it running">
              After handoff, if you retain us, I&apos;m the person
              answering the &quot;something&apos;s broken&quot; email
              within one business day. Same phone number, same email
              address, same person.
            </Feature>
          </div>
        </section>
      </Reveal>

      {/* HOW I GOT HERE — honest about non-traditional path */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>How I got here</Eyebrow>
            <H2>
              <span className="mt-2 block">
                A non-traditional path, on purpose.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.75] text-mute">
              I don&apos;t have a computer science degree. I don&apos;t
              have an engineering degree. What I have is enough
              operational experience to know what kinds of software
              actually make a business run, and enough discipline to
              use AI as a serious building tool without letting it
              ship something wrong.
            </p>
            <p className="mt-4 text-[16px] leading-[1.75] text-mute">
              I&apos;m saying this out loud because it matters. If you
              hire Doyel Labs expecting a career SaaS engineer with a
              LinkedIn full of FAANG stints, we&apos;re not that. If
              you hire us expecting somebody who has actually
              paid contractors, filed compliance paperwork, and been
              on the operator side of the software they&apos;re
              building — that&apos;s who I am.
            </p>
            <p className="mt-4 text-[16px] leading-[1.75] text-mute">
              The trade-off is real. What you don&apos;t get from
              Doyel Labs is a big-agency name on the invoice. What
              you do get is a person who reads every line of code
              your business depends on, an engagement that costs a
              fraction of what a mid-market vendor would charge, and
              a build that ships in weeks instead of quarters.
            </p>
          </div>
        </section>
      </Reveal>

      {/* WHAT I BELIEVE ABOUT SOFTWARE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What I believe about software</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Five convictions I&apos;ve tested with real clients.
              </span>
            </H2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Own your code.">
              Every line of software I build for you lives on your
              Git host from day one. No proprietary format, no
              &quot;call us to migrate.&quot;
            </Card>
            <Card title="Fixed price, or don&apos;t bother.">
              Hourly billing is agency-friendly and client-hostile.
              Every Doyel Labs engagement is a fixed price against a
              written scope. If the scope grows, I requote.
            </Card>
            <Card title="AI drafts. Humans decide.">
              Every commit is authored by me. Every diff is read by
              me. AI has no path to spend money on your behalf. No
              exceptions.
            </Card>
            <Card title="Weeks, not quarters.">
              Marketing sites in days. Operator workspaces in about
              a week. Bigger builds by the sprint, with a preview
              URL every business day.
            </Card>
            <Card title="Tests pin the dangerous paths.">
              Payment logic, compliance code, and destructive
              operations ship with tests that pin the behaviour. If
              AI regenerates that code later and the tests break,
              the code is wrong — not the test.
            </Card>
            <Card title="Stay small on purpose.">
              I&apos;d rather ship well for one client at a time
              than badly for ten. Doyel Labs will grow when the
              quality of the work stays the same.
            </Card>
          </div>
        </section>
      </Reveal>

      {/* HOW TO REACH ME */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>How to reach me</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Direct. Real. No screener.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.75] text-mute">
              Every one of the contact routes below reaches me
              directly. There is no queue, no ticketing system, and
              no automated response. If you email {site.supportEmail}{" "}
              during US business hours you usually hear back the
              same day; outside business hours, you hear back the
              next morning.
            </p>
          </div>
          <div className="mt-10">
            <Grid3>
              <Card title="Email" accent>
                <a
                  href={`mailto:${site.supportEmail}?subject=For%20Blake`}
                  className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                >
                  {site.supportEmail}
                </a>
                <br />
                <span className="text-muted">
                  Read personally, 1-business-day SLA.
                </span>
              </Card>
              <Card title="Phone">
                <a
                  href={site.phoneHref}
                  className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                >
                  {site.phone}
                </a>
                <br />
                <span className="text-muted">
                  US business hours (MT). Real human, always.
                </span>
              </Card>
              <Card title="One-hour orientation">
                <a
                  href="/how-we-work/"
                  className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                >
                  How it works →
                </a>
                <br />
                <span className="text-muted">
                  Free, no obligation, no pressure.
                </span>
              </Card>
            </Grid3>
          </div>
        </section>
      </Reveal>

      {/* CLOSE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Ready to talk?</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  Book an orientation. Let&apos;s see if we&apos;re
                  a fit.
                </span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.75] text-mute">
                One paragraph on what your business does and what
                you&apos;d like to build. I reply within one business
                day with a couple of times that could work for a
                one-hour call — Zoom or phone, your choice.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactWidget label="Book an orientation" />
                <GhostLink href={site.phoneHref} small external>
                  Or call {site.phone}
                </GhostLink>
              </div>
            </div>
            <div>
              <Notice>
                <p>
                  Not looking to hire us, just want to say hi?
                  That&apos;s fine too. Email works.
                </p>
              </Notice>
            </div>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}

/**
 * Founder portrait. If a real photo exists at the expected path,
 * this component renders it. Otherwise it falls back to the
 * four-square logo mark on a dark card with the founder's name and
 * role — a deliberate placeholder that reads as "the company,"
 * not a "photo missing" apology.
 *
 * Because we're on `output: 'export'`, we can't do server-side
 * `fs.existsSync` at render time. Instead we always render the
 * fallback card as the reserved layout, and when a real photo
 * lands at `public/media/founder/blake-doyel.jpg`, replace this
 * body with a `<Image>` element pointing at it.
 */
function FounderPortrait() {
  return (
    <div className="mx-auto w-full max-w-sm md:mx-0 md:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface/40">
        {/* Placeholder: LogoMark centered on a dark card. Replace
         * this block with an `<Image>` once a real headshot lands
         * at `public/media/founder/blake-doyel.jpg`. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
          <LogoMark size={140} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              Founder
            </p>
            <p className="mt-3 text-[20px] font-semibold uppercase tracking-wide text-ink">
              {FOUNDER.name}
            </p>
            <p className="mt-1 text-[13px] text-mute">{FOUNDER.role}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-muted">
              {FOUNDER.city}
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-muted">
        {FOUNDER.name} · {FOUNDER.role}
      </p>
    </div>
  );
}

