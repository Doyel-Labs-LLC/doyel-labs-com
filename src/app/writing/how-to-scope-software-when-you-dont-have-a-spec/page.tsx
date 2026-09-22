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
  (p) => p.slug === "how-to-scope-software-when-you-dont-have-a-spec",
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
          Every technique on this page is what we actually do on a
          Doyel Labs orientation call. If you&apos;d like to try it
          out on your idea, book one — we walk through the same
          exercise in real time.
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
            name: "How to scope software without a spec",
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
              How to <span className="text-accent">scope software</span>{" "}
              when you don&apos;t have a spec.
            </span>
          </H1>
          <Lead>
            Most software builds start without a spec. That&apos;s
            fine — the spec is what the first conversation is for.
            Here&apos;s the exact framework we use on a Doyel Labs
            orientation call to turn &quot;I think we need
            something&quot; into a written scope, a fixed price, and
            a working build.
          </Lead>
        </div>
      </section>

      {/* BODY */}
      <article className="mt-16 max-w-2xl">
        <Reveal>
          <Section>
            <H2>
              <span className="block">
                The myth of the &quot;proper spec&quot;
              </span>
            </H2>
            <P>
              A lot of prospects apologize on the first email:{" "}
              <em>&quot;Sorry, I don&apos;t really have a spec yet.
              I just have an idea.&quot;</em> Our reply is always
              the same. You don&apos;t need one. You never did.
            </P>
            <P>
              The industry&apos;s obsession with pre-written
              specifications is a leftover from the era of
              waterfall consulting, when a firm needed six weeks of
              &quot;discovery&quot; before they&apos;d quote a
              price. Modern build cycles are short enough that the
              scope emerges in the first hour of talking. If a
              vendor still needs a written spec before they&apos;ll
              return your email, that&apos;s not a scope problem
              — that&apos;s a vendor problem.
            </P>
            <Callout>
              A scope is a decision, not a document. Twenty minutes
              of the right questions produces a better scope than
              twenty pages of the wrong ones.
            </Callout>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">
                The seven questions that produce a scope
              </span>
            </H2>
            <P>
              These are the questions we walk through on the
              one-hour orientation. Answer them in your own words —
              don&apos;t translate to engineering language, and
              don&apos;t try to sound &quot;technical.&quot; The
              plainer the answer, the better the scope.
            </P>
            <div className="mt-8">
              <NumberedList
                items={[
                  {
                    title: "What does the business do?",
                    body:
                      "Describe the operation. Who works there. What comes in, what goes out. What the customer buys. If your explanation would confuse a smart 12-year-old, keep going until it wouldn't.",
                  },
                  {
                    title:
                      "What's slow, brittle, or embarrassing right now?",
                    body:
                      "Not what you want to build — what's actually broken. \"We track contractors in a spreadsheet.\" \"Our contact form goes to somebody who left in 2024.\" \"Every pay run takes a full Sunday.\" The pain points are usually specific and small.",
                  },
                  {
                    title: "Who else uses this?",
                    body:
                      "Employees. Contractors. Customers. Regulators. Suppliers. Family members. Each user has different needs, different permissions, different tolerance for friction. A tool for you alone is a very different tool from a tool five contractors will log into every week.",
                  },
                  {
                    title:
                      "What rules do you actually have to follow?",
                    body:
                      "Regulator names, compliance regimes, contract clauses, industry standards. \"SCA on our USPS contract.\" \"HIPAA-adjacent, we handle scheduling but not medical records.\" \"California AB-5 for our tipped staff.\" Rules drive the schema before the schema drives the UI.",
                  },
                  {
                    title:
                      "What tools do you already own that we should reuse?",
                    body:
                      "Domains. Cloud accounts. CRM, accounting, or email tools that already work. Data in a spreadsheet you've been maintaining. We build around what you already own, not on top of a fresh stack.",
                  },
                  {
                    title:
                      "What would make this obviously worth it?",
                    body:
                      "The outcome, not the feature. \"I don't have to spend Sunday on payroll.\" \"A DOL inspector can read our records on the first request.\" \"New contractors can sign up without emailing me.\" The outcome disciplines what actually needs to ship.",
                  },
                  {
                    title:
                      "What's the honest budget shape?",
                    body:
                      "A budget range is fine. Knowing your constraints lets us shape the scope realistically instead of underbidding and cutting corners. The project is quoted after we understand the work.",
                  },
                ]}
              />
            </div>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">
                From answers to a written scope
              </span>
            </H2>
            <P>
              After the seven questions, we have enough to draft a
              real scope. The template we use is boring on purpose —
              boring scopes ship on time.
            </P>
            <div className="mt-8">
              <Grid2>
                <Card title="Section 1 — What ships">
                  <ul className="list-disc space-y-1 pl-4">
                    <li>Named features, in plain English</li>
                    <li>The user roles that can do each thing</li>
                    <li>The specific tools we&apos;re integrating with</li>
                    <li>The compliance line we&apos;re building against</li>
                  </ul>
                </Card>
                <Card title="Section 2 — What does not ship">
                  <ul className="list-disc space-y-1 pl-4">
                    <li>
                      The things that would be reasonable to want but
                      aren&apos;t in this scope
                    </li>
                    <li>
                      The categories we&apos;re explicitly saying no to
                      (tax filing, money movement, etc.)
                    </li>
                    <li>
                      The &quot;phase two&quot; features that
                      we&apos;d requote separately if you want them
                    </li>
                  </ul>
                </Card>
                <Card title="Section 3 — Timeline">
                  <ul className="list-disc space-y-1 pl-4">
                    <li>Start date, contingent on signed scope</li>
                    <li>Milestone dates for the visible chunks</li>
                    <li>Handoff date</li>
                    <li>Buffer, if it&apos;s a build with real unknowns</li>
                  </ul>
                </Card>
                <Card title="Section 4 — Price">
                  <ul className="list-disc space-y-1 pl-4">
                    <li>One number, fixed</li>
                    <li>50% up front, balance at handoff</li>
                    <li>What triggers a requote (scope growth, new integrations)</li>
                    <li>What&apos;s included in ongoing support</li>
                  </ul>
                </Card>
              </Grid2>
            </div>
            <P>
              That&apos;s the whole document. One to two pages. You
              read it, we clarify anything that&apos;s not clear, and
              you sign it or you don&apos;t. Nothing else starts
              until you sign.
            </P>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">
                Common scoping mistakes
              </span>
            </H2>
            <P>
              These are the traps we watch for in the first
              conversation. If we notice any of them in what
              you&apos;re describing, we&apos;ll flag it out
              loud.
            </P>
            <div className="mt-6 space-y-5">
              <Mistake title="Feature list masquerading as a scope">
                &quot;We want a login page, a dashboard, a settings
                page, a...&quot; That&apos;s not a scope, that&apos;s
                a UI shopping list. What does the operator need to
                DO on the dashboard? What decision does it help
                them make? Features without outcomes always
                over-scope.
              </Mistake>
              <Mistake title="Scope creep by adjective">
                &quot;Just make it flexible.&quot; &quot;It should
                be scalable.&quot; &quot;We want it to be
                intuitive.&quot; Those words each add 30% to the
                estimate because they mean everything to some
                stakeholder and nothing to the builder. If a word
                doesn&apos;t translate to a concrete design
                decision, cut it.
              </Mistake>
              <Mistake title="Solving the wrong layer">
                &quot;We need a new CRM.&quot; Do you? Or do you
                need one specific report your current CRM
                doesn&apos;t produce? A focused report may avoid an
                unnecessary CRM migration. We&apos;ll ask before
                scoping.
              </Mistake>
              <Mistake title="Compliance by rumor">
                &quot;Someone told us this needs to be HIPAA
                compliant.&quot; Sometimes that&apos;s right,
                often it&apos;s not. Rules are specific: 41 U.S.C.
                §§ 6701–6707 governs SCA payroll; HIPAA governs
                Protected Health Information as the regulator
                defines it. If you don&apos;t know the specific
                statute, we&apos;ll help you find out.
              </Mistake>
              <Mistake title="Building for imaginary users">
                &quot;Eventually the whole team will use this.
                Then subcontractors. Then customers directly.
                Then a partner reseller channel.&quot; That&apos;s
                a five-year roadmap in one conversation. Ship for
                the user who exists this month. Ship for the
                imaginary user in a phase two that costs its own
                scope.
              </Mistake>
            </div>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">
                A concrete example, start to finish
              </span>
            </H2>
            <P>
              Here&apos;s a hypothetical (composited from real
              orientations we&apos;ve done). Names are made up; the
              shape is real.
            </P>
            <Callout>
              &quot;Hi — I run a small commercial plumbing outfit
              in Denver. Three trucks, six plumbers. Everything is
              in QuickBooks and my personal email. When customers
              call me for an estimate I&apos;m looking through my
              inbox to find similar past jobs. I don&apos;t need
              anything fancy. I think we need something.&quot;
            </Callout>
            <P>
              After the seven questions, the scope that came out
              looked like this:
            </P>
            <div className="mt-6 border border-line bg-surface/30 p-6">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent">
                Written scope — plumbing operator
              </p>
              <ul className="mt-4 space-y-2 text-[14px] leading-[1.65] text-mute">
                <li>
                  <strong className="text-ink">Ships:</strong> a private
                  password-gated dashboard at{" "}
                  <code className="font-mono text-ink">
                    yourdomain.com/ops
                  </code>{" "}
                  with a searchable job history (customer, address,
                  scope of work, final invoice, date), an
                  &quot;estimate this new job&quot; form that
                  pre-fills from similar past jobs, and PDF export.
                </li>
                <li>
                  <strong className="text-ink">Does not ship:</strong>{" "}
                  a full-blown CRM, dispatching, plumber time tracking,
                  QuickBooks sync (the operator will keep pasting into
                  QB manually — cheaper than integrating).
                </li>
                <li>
                  <strong className="text-ink">Timeline:</strong> live
                  in ten business days.
                </li>
                <li>
                  <strong className="text-ink">Price:</strong>{" "}
                  quoted per project, with scope and payment terms
                  agreed in writing before work begins.
                </li>
                <li>
                  <strong className="text-ink">
                    Optional next scope:
                  </strong>{" "}
                  Plumber-facing mobile view; QuickBooks two-way sync;
                  customer-facing quote acceptance. Each quoted
                  separately if the operator wants them.
                </li>
              </ul>
            </div>
            <P>
              None of that requires a &quot;spec.&quot; The
              conversation surfaced everything the scope needed.
              The operator signed it two days later; the build
              shipped on day 11.
            </P>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">
                What to do next
              </span>
            </H2>
            <P>
              If you have a rough idea and no spec, do this:
            </P>
            <NumberedList
              items={[
                {
                  title: "Write a single paragraph",
                  body:
                    "In your own words, describe what the business does and what you'd like to change about it. One paragraph is plenty. It's the first sentence of your future scope.",
                },
                {
                  title: "Email it to us",
                  body: "support@doyel-labs.com. A real person replies within one business day.",
                },
                {
                  title: "Book the one-hour orientation",
                  body:
                    "Zoom or phone, whichever you prefer. We walk through the seven questions in real time. If you'd rather not book yet — call us and try the first two questions right now, on the phone.",
                },
                {
                  title: "Read the written scope when it lands",
                  body:
                    "One to two pages. What ships, what doesn't, timeline, price. If it matches what you actually need, you sign. If it doesn't, we iterate. Cost so far: zero.",
                },
              ]}
            />
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ContactLink />
              <GhostLink href="/services/#process" small>
                How we work
              </GhostLink>
              <GhostLink href="/services/#pricing" small>
                How pricing works
              </GhostLink>
            </div>
            <div className="mt-10">
              <Notice>
                <p>
                  If you&apos;d rather see this in practice before
                  you commit to a call, our{" "}
                  <Link
                    href="/work/"
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    SteadFast case study
                  </Link>{" "}
                  walks through a full engagement start-to-finish,
                  including the actual scope we wrote and shipped
                  against.
                </p>
              </Notice>
            </div>
          </Section>
        </Reveal>

        <div className="mt-24 border-t border-line pt-8">
          <div className="flex flex-wrap gap-2">
            <AccentChip>No spec required</AccentChip>
            <AccentChip>One paragraph is enough</AccentChip>
            <AccentChip>Scope in one hour</AccentChip>
            <AccentChip>Fixed price</AccentChip>
          </div>
          <div className="mt-8">
            <Link
              href="/writing/"
              className="font-mono text-[10px] uppercase tracking-eyebrow text-muted hover:text-accentHi"
            >
              ← All writing
            </Link>
          </div>
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

/** Numbered "the seven questions" and "what to do next" list. */
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

/** A single "common mistake" card in the mistakes band. Small red
 * accent bar; body reads like a firm nudge, not a lecture. */
function Mistake({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-fall/60 bg-surface/30 p-5">
      <p className="text-[14px] font-semibold text-ink">{title}</p>
      <p className="mt-2 text-[13.5px] leading-[1.65] text-mute">
        {children}
      </p>
    </div>
  );
}
