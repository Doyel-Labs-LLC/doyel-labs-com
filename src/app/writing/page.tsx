import type { Metadata } from "next";
import Link from "next/link";
import {
  Eyebrow,
  H1,
  H2,
  Lead,
  MetaRow,
  Page,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { formatDate, posts } from "@/lib/writing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing — engineering notes from Doyel Labs",
  description:
    "Engineering notes, case studies, and process posts from Doyel Labs. How we ship AI-assisted software for real businesses, one operator at a time. Casper, Wyoming.",
  alternates: { canonical: `https://${site.domain}/writing/` },
  openGraph: {
    title: "Writing — engineering notes | Doyel Labs",
    description:
      "Engineering notes, case studies, and process posts from Doyel Labs.",
    url: `https://${site.domain}/writing/`,
    type: "website",
  },
};

/** JSON-LD Blog schema — helps Google recognise the section as an
 * editorial surface, not just a folder of pages. */
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `https://${site.domain}/writing/#blog`,
  url: `https://${site.domain}/writing/`,
  name: "Doyel Labs — Writing",
  description:
    "Engineering notes, case studies, and process posts from Doyel Labs.",
  publisher: { "@id": `https://${site.domain}/#organization` },
  inLanguage: "en-US",
};

export default function Writing() {
  return (
    <Page
      bandFooter={
        <MetaRow>
          Have a topic you&apos;d like us to write about? Email{" "}
          {site.supportEmail}.
        </MetaRow>
      }
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <Breadcrumbs items={[{ name: "Writing", href: "/writing/" }]} />

      {/* HERO */}
      <section className="hero-glow pt-4">
        <div className="max-w-3xl">
          <Eyebrow>Writing</Eyebrow>
          <H1>
            Engineering notes from{" "}
            <span className="text-accent">Doyel Labs</span>.
          </H1>
          <Lead>
            How we ship software for real operators. Case studies with the
            actual timeline, tools we used, code we wrote, and mistakes we
            made. Written by the engineers, edited by nobody.
          </Lead>
        </div>
      </section>

      {/* POST LIST */}
      <Reveal>
        <section className="mt-24 border-t border-line pt-16">
          <div className="max-w-3xl">
            <Eyebrow>Posts</Eyebrow>
            <H2>
              <span className="mt-2 block">
                Latest, in reverse chronological order.
              </span>
            </H2>
          </div>
          <div className="mt-12 space-y-8">
            {posts.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </Reveal>
    </Page>
  );
}

function PostRow({ post }: { post: (typeof posts)[number] }) {
  return (
    <Link
      href={`/writing/${post.slug}/`}
      className="group block border-t border-line pt-8 transition-colors hover:border-accentDim"
    >
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
      <h3 className="mt-4 text-[24px] font-semibold leading-tight text-ink transition-colors group-hover:text-accentHi md:text-[28px]">
        {post.title}
      </h3>
      <p className="mt-4 max-w-prose text-[15px] leading-[1.7] text-mute">
        {post.excerpt}
      </p>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-eyebrow text-accent">
        Read the post →
      </p>
    </Link>
  );
}
