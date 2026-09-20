import type { Metadata } from "next";
import Link from "next/link";
import {
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  Page,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about hiring ${site.company} to build software — timeline, pricing, ownership, process.`,
};

type Q = { q: string; a: React.ReactNode };

/**
 * FAQ page. Written for a prospective client who is trying to decide
 * whether to reach out. The tone is conversational — the questions are
 * the actual questions people ask us before signing.
 */
const SECTIONS: { title: string; id: string; questions: Q[] }[] = [
  {
    title: "Before we start",
    id: "before",
    questions: [
      {
        q: "How do I know if my idea is a fit for Doyel Labs?",
        a: (
          <>
            If your idea is a piece of software that ties an operation
            together — a marketing site, a payroll workspace, a portal,
            an integration, an internal tool, a custom program — we can
            probably build it. If you're not sure, send us a paragraph
            and we'll tell you either "yes, let's talk," "no, but here's
            who could," or "you don't need software for that, here's
            what you actually need." All three are honest answers.
          </>
        ),
      },
      {
        q: "Do you require a spec or a wireframe up front?",
        a: (
          <>
            No. Most of our clients arrive with an idea, not a spec. A
            paragraph about the operation is enough to start a discovery
            call. We'll write the spec together during the scoping phase.
          </>
        ),
      },
      {
        q: "What size project do you typically take on?",
        a: (
          <>
            Anywhere from a three-day marketing site to a multi-month
            custom program. We do <em>not</em> take on scope that will
            take longer than a quarter without breaking it into
            milestones — projects that run open-ended tend to lose their
            way.
          </>
        ),
      },
      {
        q: "Do you work with clients outside the United States?",
        a: (
          <>
            Yes, though we're based in Wyoming (US Mountain time) and
            most of our clients are US-based. If your project has
            regulatory or compliance requirements outside the US, we'll
            tell you up front whether we're the right team for it.
          </>
        ),
      },
    ],
  },
  {
    title: "Pricing and timelines",
    id: "pricing",
    questions: [
      {
        q: "How is a project priced?",
        a: (
          <>
            Fixed price, quoted after a short discovery call. We never
            bill hourly. If the scope grows, we requote. Every quote
            covers labor, cloud infrastructure we set up for you, and
            the AI tooling we use during the build.
          </>
        ),
      },
      {
        q: "How much does a typical project cost?",
        a: (
          <>
            It depends heavily on scope. A small marketing site is very
            different from a compliance workspace. The fastest way to
            know is a short call — we can usually quote within one
            business day.
          </>
        ),
      },
      {
        q: "How fast can you deliver?",
        a: (
          <>
            Marketing sites: three days for a small operator, one to two
            weeks for a richer build. Operator workspaces (payroll,
            internal tools): about a week for a first version. Larger
            programs: quoted by the sprint with a preview URL and a Loom
            every business day so you always know where the project
            stands.
          </>
        ),
      },
      {
        q: "Do you take a deposit?",
        a: (
          <>
            Yes — 50% before we start on projects over $1,500, with the
            balance due at delivery (or against milestones for larger
            projects). Retainers are billed monthly, first month at
            signing.
          </>
        ),
      },
    ],
  },
  {
    title: "Working together",
    id: "process",
    questions: [
      {
        q: "How often will we hear from you during the build?",
        a: (
          <>
            Every business day, minimum. A short Loom walkthrough of
            what's new, or an email with the preview URL. On larger
            projects, we set up a shared channel (Slack, email thread,
            or your preferred tool) so you never have to chase us.
          </>
        ),
      },
      {
        q: "Who do I actually talk to?",
        a: (
          <>
            The person who's building your software. No handoff to an
            account manager, no ticket queue.
          </>
        ),
      },
      {
        q: "What if I want to change my mind mid-build?",
        a: (
          <>
            Changes are expected. If the change fits inside the original
            scope, we absorb it. If it grows the scope, we requote — no
            silent creep, no surprise invoices.
          </>
        ),
      },
      {
        q: "What if we go dark for a week?",
        a: (
          <>
            We check in. If you go dark longer than that, we pause the
            project (and pause billing on any active retainer) until
            you're back. Life happens.
          </>
        ),
      },
    ],
  },
  {
    title: "After launch",
    id: "after",
    questions: [
      {
        q: "Do you keep working on the software after it launches?",
        a: (
          <>
            Yes, optionally. Every build comes with the option of a
            monthly retainer for maintenance, dependency updates, small
            new features, and a direct line for anything urgent. If you
            don't want the retainer, you own the source and can hand it
            to any engineer.
          </>
        ),
      },
      {
        q: "What if I want to fire you?",
        a: (
          <>
            You can, at any time, for any reason. Source on your Git
            host, domain on your registrar, database on your cloud
            account. Everything transfers cleanly and any engineer can
            pick it up.
          </>
        ),
      },
      {
        q: "Do you support the software 24/7?",
        a: (
          <>
            No. Retainers cover business-hours support (Mountain time),
            with a one-business-day response SLA. If your operation
            genuinely needs 24/7 on-call, we'll be honest about that
            being outside our current shape and help you find someone
            who does.
          </>
        ),
      },
    ],
  },
  {
    title: "Trust and security",
    id: "trust",
    questions: [
      {
        q: "Who owns the code?",
        a: (
          <>
            You do. Every line of it. It lives on your Git host from
            day one of the build.
          </>
        ),
      },
      {
        q: "Do you sign NDAs?",
        a: (
          <>
            Yes, when the project involves proprietary information.
            Standard mutual NDA; we'll send a template or accept yours.
          </>
        ),
      },
      {
        q: "How do you handle sensitive data?",
        a: (
          <>
            Local-first for anything that spends money — broker
            credentials for BAI stay on the operator's machine; bank
            details for payroll are never stored on our servers. Every
            product has a data map published on{" "}
            <Link
              href="/security/"
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              /security
            </Link>
            .
          </>
        ),
      },
      {
        q: "Are you insured?",
        a: (
          <>
            We carry professional liability (Errors & Omissions) and
            cyber liability insurance. Certificate available on request.
          </>
        ),
      },
    ],
  },
];

export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SECTIONS.flatMap((s) =>
      s.questions.map((q) => ({
        "@type": "Question",
        name: q.q,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            typeof q.a === "string"
              ? q.a
              : `See ${site.domain}/faq/#${s.id} for full answer.`,
        },
      })),
    ),
  };

  return (
    <Page narrow>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero-glow pt-24 md:pt-32">
        <Eyebrow>FAQ</Eyebrow>
        <H1>
          The <span className="text-accent">questions</span> people actually ask.
        </H1>
        <Lead>
          Not the marketing-page kind. The real ones from real emails and
          real discovery calls, answered plainly.
        </Lead>
      </section>

      <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wide">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-mute underline decoration-line2 underline-offset-2 hover:text-accentHi"
          >
            {s.title}
          </a>
        ))}
      </nav>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mt-16 border-t border-line pt-10"
        >
          <H2>
            <span className="mt-2 block">{section.title}</span>
          </H2>
          <div className="mt-8 space-y-6">
            {section.questions.map((qa, i) => (
              <details
                key={i}
                className="group border border-line p-5 open:border-accentDim open:bg-surface/40"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-[15px] font-semibold text-ink group-open:text-accentHi">
                  <span>{qa.q}</span>
                  <span
                    className="shrink-0 font-mono text-[11px] text-accent transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="mt-3 text-[14px] leading-[1.7] text-mute">
                  {qa.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-16 border-t border-line pt-10">
        <div className="max-w-prose">
          <p className="text-[15px] text-mute">
            Something not covered here?{" "}
            <a
              href={`mailto:${site.supportEmail}?subject=Question`}
              className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
            >
              Send us the question
            </a>{" "}
            — we'll answer, and if it's a question others might have, we'll
            add it here.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ContactWidget label="Ask a question" />
          <GhostLink href="/start/" small>
            Start here
          </GhostLink>
          <GhostLink href="/services/" small>
            What we build
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
