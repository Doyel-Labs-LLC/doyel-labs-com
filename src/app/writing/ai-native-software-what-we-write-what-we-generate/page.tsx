import type { Metadata } from "next";
import Link from "next/link";
import {
  AccentChip,
  Card,
  Eyebrow,
  GhostLink,
  Grid2,
  H1,
  H2,
  Lead,
  MetaRow,
  Notice,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { Reveal } from "@/components/reveal";
import { formatDate, posts } from "@/lib/writing";
import { site } from "@/lib/site";

const post = posts.find(
  (p) => p.slug === "ai-native-software-what-we-write-what-we-generate",
)!;

export const metadata: Metadata = {
  title: post.title,
  description: post.excerpt,
  alternates: {
    canonical: `https://${site.domain}/writing/${post.slug}/`,
  },
  openGraph: {
    title: post.title,
    description: post.excerpt,
    type: "article",
    url: `https://${site.domain}/writing/${post.slug}/`,
    publishedTime: post.date,
    authors: [site.company],
    tags: post.tags,
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.excerpt,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `https://${site.domain}/writing/${post.slug}/#article`,
  headline: post.title,
  description: post.excerpt,
  datePublished: post.date,
  dateModified: post.date,
  author: {
    "@type": "Organization",
    "@id": `https://${site.domain}/#organization`,
  },
  publisher: { "@id": `https://${site.domain}/#organization` },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `https://${site.domain}/writing/${post.slug}/`,
  },
  keywords: post.tags.join(", "),
  inLanguage: "en-US",
};

export default function Post() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Written by the Doyel Labs engineering team, reviewed line by
          line before it shipped. Same rule that applies to our code.
        </MetaRow>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Breadcrumbs
        items={[
          { name: "Writing", href: "/writing/" },
          {
            name: "What we generate vs write by hand",
            href: `/writing/${post.slug}/`,
          },
        ]}
      />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <time
              dateTime={post.date}
              className="font-mono text-[10px] uppercase tracking-eyebrow text-muted"
            >
              {formatDate(post.date)}
            </time>
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-muted">
              · {post.readingTime}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-eyebrow text-accent"
              >
                · {tag}
              </span>
            ))}
          </div>
          <H1>
            <span className="block text-[34px] leading-tight md:text-[44px]">
              <span className="text-accent">AI-native</span> software: what
              we generate, what we still write by hand.
            </span>
          </H1>
          <Lead>
            &quot;AI-powered&quot; is a marketing sticker. AI-native is a
            build method. Here&apos;s the honest version: which parts of a
            Doyel Labs project AI is fastest at, which parts we still write
            line by line, and how we keep clients safe when AI drafts real
            code.
          </Lead>
        </div>
      </section>

      {/* BODY */}
      <article className="mt-16 max-w-2xl">
        <Reveal>
          <Section>
            <H2>
              <span className="block">The rule</span>
            </H2>
            <P>
              Every line of code we ship goes through a human. Every one.
              That&apos;s not a marketing line — it&apos;s an engineering
              rule with real teeth, because AI is genuinely bad at some
              things and would happily wreck a client&apos;s production
              database if we let it. What AI is <em>great</em> at, we lean
              into hard. What it&apos;s bad at, we don&apos;t hand it the
              keys.
            </P>
            <Callout>
              AI drafts. Humans decide. Every commit is authored by a
              person, and every diff is read before it ships.
            </Callout>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">Where AI is fastest</span>
            </H2>
            <P>
              On a typical Doyel Labs build, the following categories are
              80&ndash;95% AI-drafted. We prompt with the shape of what we
              need, review the diff, and land the code:
            </P>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <MiniCard title="Boilerplate scaffolding">
                Next.js pages, React components, Tailwind classes, form
                stubs, schema.org JSON-LD blocks, migration SQL, seed
                scripts.
              </MiniCard>
              <MiniCard title="Repetitive translation">
                &quot;This spreadsheet is now this table.&quot; &quot;This
                Figma frame is now this TSX.&quot; &quot;This English
                spec is now this validation schema.&quot;
              </MiniCard>
              <MiniCard title="Test fixtures">
                Realistic-looking demo data, edge-case inputs, synthetic
                users, mock API responses. AI is genuinely great at
                generating &quot;stuff that looks real&quot; without
                touching production data.
              </MiniCard>
              <MiniCard title="Copy that isn&apos;t legal or medical">
                Marketing headlines, product descriptions, form
                placeholders, empty-state text, changelog entries. First
                draft in seconds; a human edits for voice.
              </MiniCard>
              <MiniCard title="Format conversions">
                CSV to JSON, YAML to TypeScript, HTML to Markdown, one
                logger&apos;s output format to another&apos;s. AI reads the
                shape, spits the transform.
              </MiniCard>
              <MiniCard title="Documentation">
                README updates, inline code comments, API docs, handover
                notes. AI drafts to match the codebase style; a human adds
                the &quot;why&quot; sentences a future reader needs.
              </MiniCard>
            </div>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">Where humans still own it</span>
            </H2>
            <P>
              These are the categories where a wrong answer isn&apos;t a
              typo — it&apos;s a real problem for a real client. AI can
              help scaffold, but the final call is a person&apos;s:
            </P>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <MiniCard title="Anything that moves money">
                Payment integrations, refund logic, invoice states, payout
                math. If the code decides how many dollars move, a person
                writes it and a person reads it.
              </MiniCard>
              <MiniCard title="Compliance code paths">
                SCA floor checks. Tax-adjacent math. HIPAA-adjacent access
                rules. Anywhere the wrong branch is a regulator problem,
                humans hold the pen.
              </MiniCard>
              <MiniCard title="Security-critical logic">
                Auth flows, session handling, permission checks, secret
                loading, rate limits, WebAuthn ceremony code. AI is
                confidently wrong on these often enough that we treat its
                drafts as a red flag, not a green light.
              </MiniCard>
              <MiniCard title="Legal + medical claims">
                Any sentence that would need a lawyer&apos;s review is
                written by a human — or by AI and then rewritten. We would
                rather ship less copy than ship copy that overstates what
                the software does.
              </MiniCard>
              <MiniCard title="Data-destructive operations">
                Migrations that drop tables, delete users, or truncate
                rows. AI writes the draft; a person reads it in staging;
                only then does it touch production data.
              </MiniCard>
              <MiniCard title="Product judgement">
                &quot;Which of these three UX patterns is right for this
                operator?&quot; is a human call. AI has taste; it does not
                have your client.
              </MiniCard>
            </div>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">
                How we keep clients safe when AI drafts real code
              </span>
            </H2>
            <P>
              We&apos;ve worked out five rules over enough builds that we
              apply them without arguing:
            </P>
            <NumberedList
              items={[
                {
                  title: "AI never has a production key.",
                  body:
                    "No AI tool we run has direct access to a client's live database, payment provider, email sender, or DNS. Every credential lives in a scoped secret store, and only the person shipping the deploy pulls it.",
                },
                {
                  title: "Every commit is authored by a person.",
                  body:
                    "Git history shows a human name and email. AI is a drafting tool inside a person's editor, not a separate committer with its own trust level.",
                },
                {
                  title: "Diffs are read before merge.",
                  body:
                    "Every pull request opens with a diff a person reads top to bottom. If AI wrote a hundred lines and only ten of them were the answer, the ninety go in the trash — not into the client's repo.",
                },
                {
                  title: "Dangerous paths get tests, not vibes.",
                  body:
                    "Any code that spends money, moves data, or enforces a compliance rule ships with a test that pins the behaviour. If AI regenerates that code later and the test breaks, the code is wrong — not the test.",
                },
                {
                  title: "Staging comes before production.",
                  body:
                    "Every migration, every destructive operation, every third-party integration lands on a preview URL or a staging DB first. Production is the last step, not the debugging environment.",
                },
              ]}
            />
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">Why this matters to a client</span>
            </H2>
            <P>
              Two reasons. First — <strong>speed</strong>. AI-drafted
              scaffolding, tests, and copy compress a two-month build to a
              two-week one. That&apos;s how we can quote fixed prices for
              work that other agencies would price by the hour: our hours
              are just fewer.
            </P>
            <P>
              Second — <strong>quality</strong>. Because the boring parts
              are AI-fast, the interesting parts get the human attention
              they deserve. The floor check on your payroll app, the
              authentication ceremony on your customer portal, the copy
              that a lawyer might one day squint at — those all get read
              carefully, because we&apos;re not tired from writing the
              boilerplate that led up to them.
            </P>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">A short list of things AI does not do here</span>
            </H2>
            <div className="mt-6">
              <Grid2>
                <Card title="AI does not decide what to build.">
                  Scope, feature choice, and roadmap are conversations
                  with the client, not prompts.
                </Card>
                <Card title="AI does not talk to your customers.">
                  Every email a client&apos;s software sends is written
                  and reviewed by a person before the template ships. No
                  live-generated content in transactional email.
                </Card>
                <Card title="AI does not sign off on a launch.">
                  &quot;Is this ready for production?&quot; is a human
                  call made against a real checklist, not a prompt.
                </Card>
                <Card title="AI does not touch legal text.">
                  Terms, privacy, and any risk-related copy is drafted by
                  humans (or drafted by AI and then rewritten) and
                  reviewed by counsel before it goes live.
                </Card>
              </Grid2>
            </div>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">The one-line version</span>
            </H2>
            <div className="mt-6 flex flex-wrap gap-2">
              <AccentChip>AI drafts</AccentChip>
              <AccentChip>Humans decide</AccentChip>
              <AccentChip>Every diff is read</AccentChip>
              <AccentChip>Tests pin the dangerous paths</AccentChip>
              <AccentChip>Staging before prod</AccentChip>
            </div>
            <div className="mt-8">
              <Notice>
                <p>
                  If any of this matches how you&apos;d want a software
                  build to run, email us. If it doesn&apos;t, email us
                  anyway — sometimes the whole point of a first call is
                  to figure out whether we&apos;re a fit.
                </p>
              </Notice>
            </div>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">Start a project</span>
            </H2>
            <P>
              One paragraph on what your business does and what you want
              built. Written scope and fixed price back to you within one
              business day.
            </P>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactLink />
              <GhostLink href="/services/#pricing" small>
                How pricing works
              </GhostLink>
              <GhostLink href="/services/" small>
                What we build
              </GhostLink>
            </div>
          </Section>
        </Reveal>

        <div className="mt-24 border-t border-line pt-8">
          <Link
            href="/writing/"
            className="font-mono text-[10px] uppercase tracking-eyebrow text-muted hover:text-accentHi"
          >
            ← All writing
          </Link>
        </div>
      </article>
    </Page>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mt-16 first:mt-0">{children}</section>;
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-[16px] leading-[1.75] text-mute">{children}</p>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-6 border-l-2 border-accent bg-accentSoft/25 p-5 text-[15.5px] leading-[1.7] text-ink">
      {children}
    </blockquote>
  );
}

/** A tight in-article card. Smaller and denser than the main <Card>
 * component so we can pack a two-column grid of process points. */
function MiniCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-line bg-surface/30 p-4">
      <p className="text-[13px] font-semibold leading-tight text-ink">
        {title}
      </p>
      <p className="mt-2 text-[13px] leading-[1.6] text-mute">{children}</p>
    </div>
  );
}

/** Numbered list block for the "how we keep clients safe" band. */
function NumberedList({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <ol className="mt-6 space-y-5">
      {items.map((item, i) => (
        <li key={item.title} className="flex gap-4">
          <span className="font-mono text-[11px] uppercase tracking-eyebrow text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="text-[15px] font-semibold text-ink">{item.title}</p>
            <p className="mt-2 text-[14px] leading-[1.7] text-mute">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
