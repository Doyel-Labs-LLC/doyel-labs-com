import type { Metadata } from "next";
import { Body, Eyebrow, GhostLink, H1, Page } from "@/components/chrome";
import { Illus } from "@/components/illus";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Page narrow>
      <section className="hero-glow pt-24 md:pt-32">
        <div className="hero-in hero-in--1">
          <Eyebrow>404</Eyebrow>
        </div>
        <div className="hero-in hero-in--2">
          <H1>That page isn&apos;t here.</H1>
        </div>
        <div className="hero-in hero-in--3">
          <Body>It may have moved when the site was rebuilt. Everything that matters is one click away.</Body>
        </div>
        <div className="hero-in hero-in--4">
          <Illus name="lost" className="mt-10 max-w-sm" />
        </div>
        <div className="hero-in hero-in--5 mt-10 flex flex-wrap gap-3">
          <GhostLink href="/" small>
            Home
          </GhostLink>
          <GhostLink href="/websites/" small>
            Websites
          </GhostLink>
          <GhostLink href="/software/" small>
            Software
          </GhostLink>
          <GhostLink href="/contact/" small>
            Talk to a person
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
