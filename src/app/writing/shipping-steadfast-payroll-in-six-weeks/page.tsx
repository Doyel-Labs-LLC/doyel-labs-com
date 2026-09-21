import type { Metadata } from "next";
import Link from "next/link";
import {
  AccentChip,
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
import { ContactWidget } from "@/components/contact-modal";
import { PayrollScaFrame } from "@/components/frames/payroll-sca";
import { PayrollAuditFrame } from "@/components/frames/payroll-audit";
import { Quote } from "@/components/quote";
import { Reveal } from "@/components/reveal";
import { formatDate, posts } from "@/lib/writing";
import { site } from "@/lib/site";
import { steadfastTestimonial } from "@/lib/testimonials";

const post = posts.find(
  (p) => p.slug === "shipping-steadfast-payroll-in-six-weeks",
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

/** BlogPosting JSON-LD. Points to Doyel Labs as the publisher and
 * carries the metadata Google needs for the "Discover" surface. */
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
          Case study published with SteadFast Transportation Inc.&apos;s
          permission. All contractor-level data is synthetic.
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
          { name: "SteadFast Payroll in six weeks", href: `/writing/${post.slug}/` },
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
              How we shipped a full{" "}
              <span className="text-accent">payroll workspace</span> in six
              weeks.
            </span>
          </H1>
          <Lead>
            A live pay period on day 5. A defensible audit trail by
            week&nbsp;3. Handover by week&nbsp;6. The playbook for a
            custom pay-run workspace, from zero code to a running
            operation — walked through with SteadFast Transportation as
            the client whose build happens to be the one we can show
            you.
          </Lead>
        </div>
      </section>

      {/* BODY */}
      <article className="mt-16 max-w-2xl">
        <Reveal>
          <Section>
            <H2>
              <span className="block">The operator</span>
            </H2>
            <P>
              SteadFast Transportation Inc. is a federally awarded USPS
              route contractor operating out of Plentywood, Montana. They
              run mail-transport routes across rural Montana and North
              Dakota with a rotating roster of independent day-rate
              contractors. The problem they came to Doyel Labs with was
              simple to describe: the SCA compliance side of their payroll
              had outgrown spreadsheets, and no off-the-shelf payroll SaaS
              understood the Service Contract Act at the level a DOL
              inspector would ask about.
            </P>
            <P>
              What they needed:{" "}
              <strong>a workspace built specifically for SCA payroll</strong>
              , with wage-determination lookups from SAM.gov, day-rate floor
              checks on every draft, and an audit trail an inspector could
              read on the first request. What they did <em>not</em> need:
              tax filing, direct deposit, or a $600/month payroll SaaS bill.
              Their bank already paid the money; they just needed the
              compliance record right.
            </P>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">Week 0 · Read the statute first</span>
            </H2>
            <P>
              Before we wrote a line of code, we read{" "}
              <a
                href="https://www.law.cornell.edu/uscode/text/41/6707"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline decoration-accentDim underline-offset-2"
              >
                41 U.S.C. §§ 6701–6707
              </a>{" "}
              and the FAR clauses that implement it. AI helped us skim; a
              human confirmed the specific fields the operator&apos;s USPS
              solicitation named. The rule that ended up driving the whole
              product is small enough to fit on a napkin:
            </P>
            <Callout>
              For every SCA-covered day of work, the day rate must be at
              least{" "}
              <code className="font-mono text-ink">
                (base wage + H&amp;W fringe) × 8
              </code>
              , where the base wage and H&amp;W fringe come from the wage
              determination for the contractor&apos;s county on SAM.gov.
              Every pay stub has to name the WD number, the base wage, the
              H&amp;W fringe, and the resulting floor.
            </Callout>
            <P>
              That single sentence became the north star for the whole
              workspace. Every screen, every draft, every stub had to
              carry those four facts. When we got tempted to build a
              cleverer feature, we asked: does this help the operator hit
              that floor, or prove they hit it? If not, cut it.
            </P>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">Week 1 · Wireframe, schema, UI in one loop</span>
            </H2>
            <P>
              Instead of the spec-then-design-then-build sequence, we did
              all three in parallel. AI drafted a Firestore-shaped data
              model, a migration SQL script, and the register UI form at
              the same time. Humans read every diff, kept the parts that
              matched the statute, threw out the parts that didn&apos;t,
              and pointed the AI at the next piece.
            </P>
            <P>
              By day 3 the contractor register was live: name, SSN
              (encrypted at rest), state, WD number, contract number, day
              rate, minimum wage, H&amp;W fringe, vacation handling under
              §4.173, YTD gross, YTD deductions. On day 4 the SCA floor
              check went in. By day 5 we ran the operator&apos;s{" "}
              <strong>real pay period</strong> — with redacted contractor
              data first, then live — and started shipping bug fixes the
              same day.
            </P>
          </Section>
        </Reveal>

        <div className="my-12">
          <PayrollScaFrame />
        </div>

        <Reveal>
          <Section>
            <H2>
              <span className="block">Week 2 · Batch pay run + stub email</span>
            </H2>
            <P>
              Once the single-draft path worked, we built the batch. Pick a
              period. Pick contractors. The app runs the SCA check on
              every row, produces the batch of PDF stubs in one action,
              and (optionally) emails each stub to the contractor from{" "}
              <em>the operator&apos;s own domain</em> via Resend.
            </P>
            <P>
              A small but important detail:{" "}
              <strong>Doyel Labs is never on the email header</strong>.
              The from-address is{" "}
              <code className="font-mono text-ink">
                payroll@steadfasttransportationinc.com
              </code>
              . The reply-to is the operator&apos;s inbox. If a contractor
              has a question about their stub, they email SteadFast, not
              a software vendor they&apos;ve never heard of.
            </P>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">Weeks 3 – 4 · Harden the audit trail</span>
            </H2>
            <P>
              With the pay path stable, we hardened the audit log. Every
              state change in the app now leaves a row: every stub
              generated, every stub emailed, every rate change, every WD
              lookup, every blocked SCA-short draft, every sign-in, every
              password change, every passkey enrolment.
            </P>
            <P>
              The audit table has a CSV export button. Retention is 180
              days in the app; the operator is expected to keep the CSV
              locally for the SCA&apos;s 3-year rule. When an inspector
              asks for the pay records, the operator exports a CSV, hands
              them a stub PDF for any contractor + period, and points at
              the WD number on the header. Nothing is behind an
              accountant.
            </P>
          </Section>
        </Reveal>

        <div className="my-12">
          <PayrollAuditFrame />
        </div>

        <Reveal>
          <Section>
            <H2>
              <span className="block">Week 5 · Sign-in, backups, ops</span>
            </H2>
            <P>
              Passkey enrolment via WebAuthn, with a password fallback
              (PBKDF2, rate-limited lockout). A dashboard for the operator
              to see WD revision dates, upcoming pay periods, and the
              current audit count. Backup exports: full JSON, formatted
              DOCX, one-click restore that merges without overwriting.
            </P>
            <P>
              These are the boring, high-leverage features that make
              software actually usable a year after launch. Passkeys mean
              the operator doesn&apos;t lose access when a laptop breaks.
              Backups mean if we vanished tomorrow, the operator still
              has their bytes.
            </P>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">Week 6 · Live and quiet</span>
            </H2>
            <P>
              By week six the workspace was running weekly pay periods
              without our intervention. That&apos;s the outcome we aim
              for: the operator opens the app, does the pay run, and
              closes it. Doyel Labs stays on for maintenance under a
              monthly retainer — dependency updates, small feature adds,
              same-week response on anything broken — but the operator
              doesn&apos;t need us to run their business.
            </P>
            <Quote
              attribution={steadfastTestimonial.attribution}
              company={steadfastTestimonial.company}
              companyUrl={steadfastTestimonial.companyUrl}
              logo={steadfastTestimonial.logo}
            >
              {steadfastTestimonial.short}
            </Quote>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">What we&apos;d change</span>
            </H2>
            <P>
              The SCA statute reading in week 0 was worth 3× its time.
              The next SCA build will start from the same rulebook,
              with the SCA floor formula literally in the top comment of
              the pay-draft file. That single formula drives the whole
              product surface.
            </P>
            <P>
              We&apos;d also invest a little more, earlier, in the
              backup + restore flow. Once the operator has a month of
              data, backups are the difference between &quot;a broken
              laptop is an inconvenience&quot; and &quot;a broken laptop
              is a compliance emergency.&quot; It got there — it just
              could have gotten there in week 2 instead of week 5.
            </P>
          </Section>
        </Reveal>

        <Reveal>
          <Section>
            <H2>
              <span className="block">What&apos;s in the box today</span>
            </H2>
            <div className="mt-6 flex flex-wrap gap-2">
              <AccentChip>SAM.gov WD auto-lookup</AccentChip>
              <AccentChip>Day-rate floor check</AccentChip>
              <AccentChip>Batch pay runs</AccentChip>
              <AccentChip>Stub email from operator&apos;s domain</AccentChip>
              <AccentChip>CSV audit export</AccentChip>
              <AccentChip>WebAuthn passkey sign-in</AccentChip>
              <AccentChip>Full JSON + DOCX backups</AccentChip>
              <AccentChip>Per-operator storage</AccentChip>
            </div>
            <div className="mt-8">
              <Notice>
                <p>
                  If you run federal service contracts and this
                  playbook sounds like something your operation needs,
                  email us. The next SCA-first build will ship faster
                  than this one did.
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
              Tell us the contract type, the counties your contractors
              work in, and a rough headcount. Written scope and fixed
              price back to you within one business day.
            </P>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ContactWidget label="Start a project" />
              <GhostLink
                href="/industries/federal-service-contractors/"
                small
              >
                More on federal-contractor software
              </GhostLink>
              <GhostLink href="/work/" small>
                Read the full case study
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

/** Article body section with consistent vertical rhythm. */
function Section({ children }: { children: React.ReactNode }) {
  return <section className="mt-16 first:mt-0">{children}</section>;
}

/** Body paragraph. Slightly wider leading than card copy, warmer text
 * colour. */
function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 text-[16px] leading-[1.75] text-mute">{children}</p>
  );
}

/** Highlighted quote inside the article — for statute citations, key
 * definitions, or takeaways. Cyan bar on the left, faint bg tint. */
function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-6 border-l-2 border-accent bg-accentSoft/25 p-5 text-[15.5px] leading-[1.7] text-ink">
      {children}
    </blockquote>
  );
}
