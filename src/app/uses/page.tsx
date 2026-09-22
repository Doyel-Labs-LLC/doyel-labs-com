import type { Metadata } from "next";
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
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactLink } from "@/components/contact-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

/**
 * `/uses/`
 *
 * A real, itemized list of the tools Doyel Labs builds with. In the
 * classic developer-blog genre (uses.tech) — signals technical
 * credibility, transparency, and specific tool competence. Two
 * design constraints:
 *
 *   1. Every entry is a tool we actually use in production. No
 *      aspirational tools, no "we're thinking about migrating to..."
 *      No affiliate links (none exist here anyway).
 *   2. The "What we don't use" band is as important as the
 *      "What we use" bands. Prospects who care about privacy /
 *      posture want to know what we've refused as much as what
 *      we've adopted.
 */

export const metadata: Metadata = {
  title: "Uses — the tools Doyel Labs builds with",
  description: `Real, itemized tech stack for ${site.company}. Every tool listed is one we actually use in production — editor, framework, AI, backend, deployment, email, payments, analytics. Plus a "what we don't use" band naming session-replay tools, growth-hack pixels, and other things we've explicitly refused.`,
  alternates: { canonical: `https://${site.domain}/uses/` },
  openGraph: {
    title: `Uses — the tools ${site.companyShort} builds with`,
    description:
      "Real, itemized tech stack. Editor, framework, AI, backend, deployment, comms, and what we refuse to use.",
    url: `https://${site.domain}/uses/`,
    type: "website",
  },
};

type Tool = {
  name: string;
  role: string;
  why?: string;
  url?: string;
};

const CATEGORIES: { title: string; blurb?: string; tools: Tool[] }[] = [
  {
    title: "Editor + AI tooling",
    blurb:
      "Our AI-native workflow lives here. AI drafts, humans decide — every commit is authored by a person, every diff is read before merge.",
    tools: [
      {
        name: "Cursor",
        role: "Primary IDE (VS Code fork with a first-class AI agent)",
        why:
          "One editor for code, chat, agent actions, and terminal — no context-switching to a separate AI window.",
        url: "https://cursor.sh",
      },
      {
        name: "Claude (Anthropic)",
        role: "Primary drafting model for code, tests, migrations, copy",
        why:
          "Reliably conservative on unsafe code paths. Good at reading a codebase and matching its style.",
        url: "https://anthropic.com",
      },
      {
        name: "GitHub Copilot",
        role: "Inline autocomplete inside Cursor",
        why: "Fast in-line completions where a full agent turn is overkill.",
        url: "https://github.com/features/copilot",
      },
    ],
  },
  {
    title: "Framework + language",
    blurb:
      "Web builds default to a static-first stack. When a project needs a full backend, we reach for the same shape (Cloudflare Workers + edge functions).",
    tools: [
      {
        name: "TypeScript",
        role: "Default language for anything web-shaped",
        why:
          "Strict mode on every project. Types are documentation that also fails the build.",
      },
      {
        name: "Next.js 16 (App Router)",
        role: "Web framework",
        why:
          "Static export by default; RSC where it helps; no lock-in on either.",
        url: "https://nextjs.org",
      },
      {
        name: "React 19",
        role: "UI library",
      },
      {
        name: "Tailwind CSS 3",
        role: "Styling",
        why:
          "Colocated tokens, tiny compiled bundle, no runtime CSS-in-JS.",
        url: "https://tailwindcss.com",
      },
      {
        name: "Zod",
        role: "Runtime validation of untrusted input",
        why:
          "Every form payload / API body goes through a Zod schema before it touches anything else.",
        url: "https://zod.dev",
      },
      {
        name: "Node.js 24",
        role: "Local build and script runtime",
      },
    ],
  },
  {
    title: "Backend + storage",
    blurb:
      "Backends are chosen per-project. We prefer edge-first, per-operator-scoped storage that a client could migrate off of easily.",
    tools: [
      {
        name: "Cloudflare Workers + Pages Functions",
        role: "Serverless runtime for public API routes",
        why:
          "Low-latency edge execution, zero cold-start problem, KV bindings for rate limits.",
        url: "https://developers.cloudflare.com/workers",
      },
      {
        name: "Cloudflare KV",
        role: "Rate limiting, feature flags, small key/value data",
      },
      {
        name: "Netlify Blobs",
        role: "Per-operator storage for the SteadFast payroll workspace",
        why:
          "Each operator gets a scoped namespace — no shared-tenant risk.",
      },
      {
        name: "Firebase (Auth + Firestore + Storage)",
        role: "ConnectionLoop backend",
      },
      {
        name: "Neon (Postgres)",
        role: "SQL when a project needs it — sparingly",
        why:
          "Serverless Postgres with branching for staging environments.",
        url: "https://neon.tech",
      },
    ],
  },
  {
    title: "Deployment + CDN",
    blurb:
      "Static output at the edge for marketing sites. Everything ships from Git.",
    tools: [
      {
        name: "Cloudflare Pages",
        role: "Primary hosting for doyel-labs.com and every marketing site we ship",
        why:
          "First-class custom headers, edge functions, and free HTTPS at scale.",
        url: "https://pages.cloudflare.com",
      },
      {
        name: "Wrangler",
        role: "CLI for Cloudflare Workers + Pages deploys",
        url: "https://developers.cloudflare.com/workers/wrangler",
      },
      {
        name: "Netlify",
        role:
          "Hosting when a client already runs there (SteadFast site + operator workspace)",
      },
      {
        name: "GitHub",
        role: "Source hosting, PR-based reviews, Actions where useful",
        url: "https://github.com",
      },
    ],
  },
  {
    title: "Comms + email",
    blurb:
      "Client email lives on Google Workspace. Transactional email goes through Resend.",
    tools: [
      {
        name: "Google Workspace",
        role: "Real email + calendar + Meet for orientation calls",
      },
      {
        name: "Resend",
        role:
          "Transactional email — contact-form delivery, stub emails from operator domains",
        why: "Clean API, deliverability that actually works.",
        url: "https://resend.com",
      },
      {
        name: "Zoom",
        role: "Alternative to Meet for the one-hour orientation, if you prefer",
      },
      {
        name: "Loom",
        role:
          "Weekly async video walk-throughs during a build — clients open on their own time",
        url: "https://loom.com",
      },
    ],
  },
  {
    title: "Auth + payments",
    tools: [
      {
        name: "WebAuthn (passkeys)",
        role: "Primary sign-in on payroll workspaces and BAI",
        why: "Phish-resistant. No shared passwords.",
      },
      {
        name: "PBKDF2-SHA256 / Argon2id",
        role:
          "Password hashing where a password path is still supported",
      },
      {
        name: "Cloudflare Turnstile",
        role: "Anti-bot on the contact form (invisible to real users)",
        why:
          "Replaces reCAPTCHA. No Google-owned cross-site tracker on our forms.",
        url: "https://developers.cloudflare.com/turnstile",
      },
      {
        name: "Stripe",
        role:
          "Payment processing when a build has billing (never for anything we sell directly today)",
        why:
          "Card numbers live at Stripe. We only hold the last 4 and the subscription state.",
        url: "https://stripe.com",
      },
    ],
  },
  {
    title: "Analytics + monitoring",
    blurb:
      "Every marketing site we ship uses Plausible only, or no analytics at all if the client prefers.",
    tools: [
      {
        name: "Plausible Analytics",
        role: "Cookieless analytics for doyel-labs.com and client marketing sites",
        why:
          "No cookies, no cross-site profile, no PII collected. GDPR-friendly by default.",
        url: "https://plausible.io",
      },
      {
        name: "Cloudflare Web Analytics",
        role: "Secondary check on edge traffic for our own site",
      },
      {
        name: "Sentry",
        role: "Client-side error reporting when a build genuinely needs it",
        why: "Turned off by default; only on when the client asked.",
      },
    ],
  },
  {
    title: "Design + assets",
    tools: [
      {
        name: "Sharp",
        role:
          "Node-native image processing for optimization (mozjpeg, WebP)",
        why:
          "Ships transitively with Next.js. Our optimize-images script uses it directly.",
      },
      {
        name: "SVG by hand",
        role:
          "Logo, icon, favicon, and every four-square mark render on the site",
        why:
          "Vector, tiny, and colorable via CSS variables. No design-tool export needed.",
      },
      {
        name: "next/og",
        role: "OpenGraph card generation at build time",
      },
      {
        name: "Inter",
        role:
          "Sans-serif font family (system fallbacks handle everyone else)",
      },
      {
        name: "JetBrains Mono",
        role:
          "Monospace family for eyebrows, code, and small mono-typed labels",
      },
    ],
  },
  {
    title: "Legal + ops",
    tools: [
      {
        name: "Cloudflare Registrar",
        role: "Domain registration for doyel-labs.com",
        why:
          "At-cost pricing, no auction sniping, native DNS + WAF integration.",
      },
      {
        name: "Wyoming (LLC)",
        role: "Company jurisdiction — Doyel Labs LLC is a Wyoming LLC",
      },
      {
        name: "MDX for legal drafts",
        role:
          "Terms, Privacy, Payroll-data, and BAI Risk drafts live in content/legal/*.md",
        why:
          "Counsel can redline them without touching TSX. Rendered by src/components/legal-page.tsx.",
      },
    ],
  },
];

/** Tools + patterns we've deliberately refused. Explaining what
 * you *won't* use is a stronger signal than listing every tool
 * you *do* use — a lot of alternatives are on this list. */
const REFUSED = [
  {
    name: "Google Analytics / Meta Pixel",
    why:
      "Cross-site trackers. Every client site ships without them by default. Plausible covers what a small operator actually needs to know.",
  },
  {
    name: "Session-replay tools (Hotjar, FullStory, LogRocket, Microsoft Clarity)",
    why:
      "They record what your users type into forms. That's a privacy footgun that isn't worth the marketing insight. On our own contact form, we'd rather not have those keystrokes.",
  },
  {
    name: "Chat / support widgets (Intercom, Drift, HubSpot chat)",
    why:
      "The point of the /support/ page is that you email a real person. A widget suggests we'd rather triage you than answer.",
  },
  {
    name: "Newsletter pop-ups + exit-intent modals",
    why:
      "We ship one RSS feed and a real contact form. Anything else is a dark pattern.",
  },
  {
    name: "Growth hacks (referral loops, gated content, tripwires)",
    why:
      "If you can't sell the software honestly, growth hacks won't save it long-term.",
  },
  {
    name: "Custom fonts for the sake of it",
    why:
      "System fonts and Inter cover 99% of what we need. Every additional font is a network request plus a FOUT risk.",
  },
];

export default function Uses() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          This list moves as the stack does. When we adopt or drop
          something in production, it lands here first — this is the
          canonical answer to &quot;what do you build with?&quot;
        </MetaRow>
      }
    >
      <Breadcrumbs items={[{ name: "Uses", href: "/uses/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <Eyebrow>Uses</Eyebrow>
          <H1>
            The <span className="text-accent">tools</span> Doyel Labs
            builds with.
          </H1>
          <Lead>
            An itemized list of what we actually use, updated when the
            stack moves. Nothing aspirational, no affiliate links, no
            &quot;we&apos;re thinking about migrating to.&quot; Just
            the tools that are on our machines right now.
          </Lead>
          <div className="mt-8 flex flex-wrap gap-2">
            <AccentChip>AI-native</AccentChip>
            <AccentChip>Edge-first</AccentChip>
            <AccentChip>Cookieless analytics</AccentChip>
            <AccentChip>No cross-site trackers</AccentChip>
          </div>
        </div>
      </section>

      {/* TOOLS BY CATEGORY */}
      {CATEGORIES.map((cat) => (
        <Reveal key={cat.title}>
          <section className="mt-24 border-t border-line pt-16">
            <div className="max-w-3xl">
              <Eyebrow>{cat.title}</Eyebrow>
              {cat.blurb ? (
                <p className="mt-4 max-w-prose text-[15px] leading-[1.7] text-mute">
                  {cat.blurb}
                </p>
              ) : null}
            </div>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {cat.tools.map((tool) => (
                <li key={tool.name}>
                  <ToolCard tool={tool} />
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ))}

      {/* WHAT WE DON'T USE */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>What we don&apos;t use</Eyebrow>
            <H2>
              <span className="mt-2 block">
                What we refuse, and why.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              A tech stack tells you what a shop can do. A refusal list
              tells you what a shop values. These are patterns and
              tools we&apos;ve deliberately kept out of every client
              build.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {REFUSED.map((r) => (
              <div
                key={r.name}
                className="border-l-2 border-fall/60 bg-surface/30 p-5"
              >
                <p className="text-[15px] font-semibold text-ink">
                  {r.name}
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.65] text-mute">
                  {r.why}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* PROJECT-SPECIFIC OVERRIDES */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>When we deviate</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Your project may end up with a different stack.
              </span>
            </H2>
            <p className="mt-6 text-[16px] leading-[1.7] text-mute">
              The list above is our defaults. Client projects sometimes
              land on different tools because the client already owns
              them (an existing HubSpot instance, a WordPress site
              they don&apos;t want to migrate off, an AWS account
              they&apos;re committed to). We build against what you
              have, not against what we prefer.
            </p>
          </div>
          <div className="mt-10">
            <Grid3>
              <Card title="You already own it">
                We work with your existing CRM, database, cloud
                account, or CMS. Migration is a separate scope, not a
                prerequisite.
              </Card>
              <Card title="Your rules require it">
                Government contracts, HIPAA-adjacent workloads, or
                specific data-residency clauses can force tool
                choices. We&apos;ll tell you upfront if a rule
                pushes us off our defaults.
              </Card>
              <Card title="Something is genuinely better">
                The stack above is not a religion. If your project
                surfaces a tool that&apos;s genuinely better than our
                default, we adopt it and update this list.
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
              <Eyebrow>Curious about a specific tool?</Eyebrow>
              <H2>
                <span className="mt-2 block">
                  Ask on the orientation.
                </span>
              </H2>
              <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
                We&apos;re happy to walk through why any tool on this
                list ended up in the default stack, or what
                we&apos;d use instead if your project has a specific
                constraint. Bring the question to the orientation
                call — it&apos;s a good use of the hour.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContactLink />
                <GhostLink href="/services/#process" small>
                  How we work
                </GhostLink>
                <GhostLink
                  href="/writing/ai-native-software-what-we-write-what-we-generate/"
                  small
                >
                  How we use AI in code
                </GhostLink>
              </div>
            </div>
            <div>
              <Notice>
                <p>
                  This page borrows the format of{" "}
                  <a
                    href="https://uses.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    uses.tech
                  </a>
                  , a directory of engineers&apos; tool lists. If you
                  run a shop of your own,{" "}
                  <Link
                    href="/contact/"
                    className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
                  >
                    tell us
                  </Link>{" "}
                  — we&apos;d read yours.
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
 * One tool card. Renders name (linked if we have a URL), role, and
 * optional "why" body. Deliberately compact — the value of this page
 * is the density of specific tools, not deep explanations.
 */
function ToolCard({ tool }: { tool: Tool }) {
  const nameNode = tool.url ? (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-accentHi"
    >
      {tool.name}
    </a>
  ) : (
    tool.name
  );
  return (
    <div className="surface-card rounded-[3px] border border-line p-5 shadow-card">
      <p className="text-[15px] font-semibold text-ink">{nameNode}</p>
      <p className="mt-2 text-[13.5px] leading-[1.6] text-mute">
        {tool.role}
      </p>
      {tool.why ? (
        <p className="mt-3 text-[12.5px] leading-[1.6] text-muted">
          {tool.why}
        </p>
      ) : null}
    </div>
  );
}
