import type { Metadata } from "next";
import Link from "next/link";
import {
  AccentChip,
  Card,
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  MetaRow,
  Notice,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClientBadge } from "@/components/client-badge";
import { ContactWidget } from "@/components/contact-modal";
import { Quote } from "@/components/quote";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { testimonials, type Testimonial } from "@/lib/testimonials";

/**
 * `/reviews/`
 *
 * The proof surface. Every named client testimonial goes here — full
 * quote, scope of work, and a public verification link. Design goal:
 * when you have one review the page still feels honest and complete;
 * when you have twenty, the same layout just repeats.
 *
 * Never fabricate reviews. Never add anonymous quotes. Every entry
 * comes from `src/lib/testimonials.ts` and every entry there requires
 * written client approval.
 */

export const metadata: Metadata = {
  title: "Reviews — real, named client feedback",
  description: `Reviews of ${site.company}, in full, from named clients. Every quote is real, written by a real customer, and public on the client's own site. If you've worked with us, add yours.`,
  alternates: { canonical: `https://${site.domain}/reviews/` },
  openGraph: {
    title: `Reviews — ${site.company}`,
    description:
      "Real, named client reviews of Doyel Labs. Full quotes, scope of work, verifiable.",
    url: `https://${site.domain}/reviews/`,
    type: "website",
  },
};

/**
 * schema.org Review + AggregateRating.
 *
 * We intentionally do NOT set a numeric rating (bestRating / worstRating
 * / ratingValue) because our clients don't give us stars — they write
 * paragraphs. Google's rich-result guidelines accept `reviewBody` on
 * its own for `Review` entities, so we ship only body + author + item
 * reviewed. Honest, no manufactured stars.
 */
const reviewSchemas = testimonials.map((t) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "@id": `https://${site.domain}/reviews/#${t.id}`,
  itemReviewed: {
    "@type": "Organization",
    "@id": `https://${site.domain}/#organization`,
  },
  reviewBody: t.full.join("\n\n"),
  author: {
    "@type": "Organization",
    name: t.company,
    url: t.companyUrl,
  },
  datePublished: t.date,
  publisher: { "@id": `https://${site.domain}/#organization` },
}));

export default function Reviews() {
  const first = testimonials[0];
  const count = testimonials.length;

  return (
    <Page
      bandFooter={
        <MetaRow>
          Every review on this page is a real, named client. If a claim
          on this page turns out to be untrue,{" "}
          <a
            href={`mailto:${site.supportEmail}?subject=Review%20verification`}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            email us
          </a>{" "}
          and we&apos;ll take it down.
        </MetaRow>
      }
    >
      {reviewSchemas.map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Breadcrumbs items={[{ name: "Reviews", href: "/reviews/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <div className="hero-in hero-in--1">
            <Eyebrow>Reviews</Eyebrow>
          </div>
          <div className="hero-in hero-in--2">
            <H1>
              What clients{" "}
              <span className="text-accent">actually say</span>.
            </H1>
          </div>
          <div className="hero-in hero-in--3">
            <Lead>
              Every review below is a real, named client. Full quotes,
              scope of what we built, and a public link so you can
              verify. No anonymous &quot;a client told us&quot; copy,
              no five-stars-with-no-name testimonials, no
              made-up-sounding first names next to stock photos.
            </Lead>
          </div>
          <div className="hero-in hero-in--4 mt-8 flex flex-wrap gap-2">
            <AccentChip>
              {count} {count === 1 ? "review" : "reviews"} · all named
            </AccentChip>
            <AccentChip>Publicly verifiable</AccentChip>
            <AccentChip>Full quotes, no cherry-picking</AccentChip>
          </div>
        </div>
      </section>

      {/* FEATURED REVIEW (first / most recent) */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <ReviewBlock testimonial={first} featured />
        </section>
      </Reveal>

      {/* SUBSEQUENT REVIEWS — none today. Rendered automatically as they
       * land in `testimonials`. */}
      {testimonials.slice(1).map((t) => (
        <Reveal key={t.id}>
          <section className="mt-16 border-t border-line pt-16">
            <ReviewBlock testimonial={t} />
          </section>
        </Reveal>
      ))}

      {/* HONEST NOTE — turns "only one review" into positioning */}
      {count === 1 ? (
        <Reveal>
          <section className="mt-24 border-t border-line pt-16">
            <div className="max-w-3xl">
              <Eyebrow>An honest note</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  Why there&apos;s only one review here.
                </span>
              </H2>
              <p className="mt-6 text-[16px] leading-[1.7] text-mute">
                Doyel Labs was formed in September 2026. Every
                engagement we&apos;ve delivered so far ships with a
                real request for a review — but we only add a review
                to this page after the client has written it, approved
                the copy verbatim, and given us permission to link back
                to their site. That&apos;s a slower path than most
                agency &quot;wall of love&quot; pages take, and
                it&apos;s the reason we currently show one review
                instead of twenty.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mute">
                What we would rather do than fake it:
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <Card title="Show the full quote">
                  Not a cherry-picked sentence. Every review here is
                  reproduced as the client wrote it, in full, with a
                  publicly verifiable link.
                </Card>
                <Card title="Show the scope of work">
                  A short list of what we actually shipped for the
                  client, so a reader can judge whether the review is
                  proportional to the work.
                </Card>
                <Card title="Show the case study">
                  If you want depth, click through — we publish a
                  detailed engagement writeup for every client who
                  lets us, on{" "}
                  <Link
                    href="/case-studies/steadfast/"
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    /case-studies
                  </Link>
                  .
                </Card>
              </div>
            </div>
          </section>
        </Reveal>
      ) : null}

      {/* NUMBERS SO FAR — small, honest counters */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>The counts, honestly</Eyebrow>
            <H2>
              <span className="mt-2 block">Where Doyel Labs stands.</span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              Small numbers by design. We&apos;d rather ship well for
              one client at a time than badly for ten. As these change,
              they change here first.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Counter
              label="Named clients live"
              value={String(count)}
              caption="Public, verifiable, in production"
            />
            <Counter
              label="Reviews on file"
              value={String(count)}
              caption="Every review reproduced in full"
            />
            <Counter
              label="Founded"
              value="Sep 2026"
              caption="Wyoming LLC, Casper"
            />
            <Counter
              label="Response SLA"
              value="1 day"
              caption="Real human, US business hours (MT)"
            />
          </div>
        </section>
      </Reveal>

      {/* LEAVE A REVIEW — for anyone who has worked with us */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
            <div>
              <Eyebrow>Worked with us?</Eyebrow>
              <H2>
                <span className="mt-2 block">Leave a review.</span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                If Doyel Labs has shipped software for you, we&apos;d
                be honoured to add your review here — under your name,
                your company, and a public link to your site. Send us
                the paragraphs you&apos;d like to share and
                we&apos;ll reproduce them exactly as you wrote them.
                Or, if you&apos;d rather leave a review somewhere
                else, tell us where and we&apos;ll link to it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.supportEmail}?subject=Review%20for%20Doyel%20Labs`}
                  className="inline-flex items-center gap-2 rounded-full border border-accent bg-accentSoft px-6 py-3 text-[13px] uppercase tracking-wide text-accent transition-all duration-200 ease-soft hover:border-accentHi hover:bg-accent/15 hover:text-accentHi"
                >
                  Email us a review →
                </a>
                <GhostLink href={site.phoneHref} small external>
                  Or call {site.phone}
                </GhostLink>
              </div>
            </div>
            <div>
              <Notice>
                <p>
                  Every review is opt-in. We never publish an email or
                  a Slack message you sent us without asking first, and
                  we never edit a review beyond fixing typos with your
                  permission.
                </p>
              </Notice>
            </div>
          </div>
        </section>
      </Reveal>

      {/* THINKING ABOUT HIRING US? */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Thinking about hiring us?</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Book an orientation, not a demo.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              The best way to know whether Doyel Labs is right for your
              build is an actual conversation. One hour, Zoom or phone,
              a real human being on the other end. No cost, no
              obligation.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Book an orientation" />
              <GhostLink href="/how-we-work/" small>
                How we work
              </GhostLink>
              <GhostLink href="/case-studies/steadfast/" small>
                Read the case study
              </GhostLink>
            </div>
          </div>
        </section>
      </Reveal>
    </Page>
  );
}

/**
 * Renders a single testimonial with its full quote, scope of work,
 * client attribution, and a public verification link. The `featured`
 * variant elevates the first review on the page visually.
 */
function ReviewBlock({
  testimonial: t,
  featured = false,
}: {
  testimonial: Testimonial;
  featured?: boolean;
}) {
  const formattedDate = new Date(t.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      {/* Left: the quote itself */}
      <div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
            Review · {t.company}
          </p>
          <time
            dateTime={t.date}
            className="font-mono text-[10px] uppercase tracking-eyebrow text-muted"
          >
            {formattedDate}
          </time>
          {featured ? (
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
              · Featured
            </span>
          ) : null}
        </div>
        <div className="mt-6">
          <Quote
            paragraphs={t.full}
            attribution={t.attribution}
            role={t.role}
            company={t.company}
            companyUrl={t.companyUrl}
            logo={t.logo}
            size={featured ? "large" : "regular"}
          />
        </div>
      </div>

      {/* Right: metadata + scope + verification */}
      <div className="flex flex-col gap-5">
        <div className="border border-line bg-surface/30 p-6">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
            Client
          </p>
          <div className="mt-3">
            <ClientBadge
              name={t.company}
              logo={t.logo}
              url={t.companyUrl}
            />
          </div>
          {t.role ? (
            <p className="mt-4 text-[13px] text-mute">
              Written by the <strong className="text-ink">{t.role}</strong>{" "}
              of {t.company}.
            </p>
          ) : null}
        </div>

        <div className="border border-line bg-surface/30 p-6">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
            What we shipped
          </p>
          <ul className="mt-4 space-y-2">
            {t.scope.map((line) => (
              <li
                key={line}
                className="flex gap-2 text-[13px] leading-[1.55] text-mute"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1 w-2.5 shrink-0 bg-accent"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-accentDim bg-accentSoft/20 p-5">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
            Verify
          </p>
          <p className="mt-2 text-[13px] leading-[1.6] text-mute">
            This review is reproduced verbatim from a written email
            from the client, on file. You can visit the client&apos;s
            live site directly:
          </p>
          <a
            href={t.verify.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold text-accent underline decoration-accentDim underline-offset-4 hover:text-accentHi"
          >
            {t.verify.label} →
          </a>
        </div>

        <GhostLink href="/case-studies/steadfast/" small>
          Read the full case study
        </GhostLink>
      </div>
    </article>
  );
}

/** Small counter card used in the "counts, honestly" band. */
function Counter({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="border border-line bg-surface/30 p-5">
      <p className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
        {label}
      </p>
      <p className="mt-3 text-[26px] font-semibold leading-none text-ink tabular-nums">
        {value}
      </p>
      <p className="mt-3 text-[12px] leading-[1.5] text-muted">{caption}</p>
    </div>
  );
}
