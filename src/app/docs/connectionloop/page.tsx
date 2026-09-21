import type { Metadata } from "next";
import Link from "next/link";
import {
  Eyebrow,
  GhostLink,
  H1,
  Lead,
  Notice,
  Page,
} from "@/components/chrome";
import { ContactWidget } from "@/components/contact-modal";
import { site } from "@/lib/site";

/**
 * `noindex, follow` — mirrors /programs/connectionloop/. Docs for a
 * program that hasn't shipped shouldn't rank against the company name.
 */
export const metadata: Metadata = {
  title: "ConnectionLoop docs",
  description:
    "How to get into a ConnectionLoop Space — install, account, invite code, tabs.",
  robots: { index: false, follow: true },
};

export default function ConnectionLoopDocs() {
  return (
    <Page narrow>
      <section className="pt-24">
        <Eyebrow>
          <Link href="/docs/" className="text-mute hover:text-accentHi">
            Docs
          </Link>{" "}
          · ConnectionLoop
        </Eyebrow>
        <H1>
          Getting into a <span className="text-accent">Space</span>.
        </H1>
        <Lead>
          ConnectionLoop is invite-only. There's no public directory of
          Spaces to browse — you either created one or someone shared a
          code with you.
        </Lead>
      </section>

      <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wide">
        {[
          ["#install", "1. Install"],
          ["#account", "2. Account"],
          ["#join", "3. Join or create"],
          ["#tabs", "4. Tabs"],
          ["#privacy", "Privacy"],
        ].map(([h, t]) => (
          <a
            key={h}
            href={h}
            className="text-mute underline decoration-line2 underline-offset-2 hover:text-accentHi"
          >
            {t}
          </a>
        ))}
      </nav>

      <article className="prose-legal mt-12">
        <h2 id="install">1. Install</h2>
        <p>
          Install ConnectionLoop from the App Store or Google Play once
          the store review completes. Until then, it's invite-only via
          TestFlight / internal test track. Waitlist:{" "}
          <a href={`mailto:${site.supportEmail}?subject=ConnectionLoop%20waitlist`}>
            {site.supportEmail}
          </a>
          .
        </p>

        <h2 id="account">2. Create an account</h2>
        <p>
          Email + password. Verify your email through the link that
          lands from{" "}
          <code>noreply@connectionloop.app</code> — the landing page
          bounces you back to the app.
        </p>
        <p>
          Password minimum is eight characters. The recommendation shown
          in the app is "a short sentence" — long is more important than
          weird characters.
        </p>

        <h2 id="join">3. Join a Space or create one</h2>
        <p>
          <strong>To join:</strong> get a live invite code from a Space
          admin. The code is 9 symbols in the format{" "}
          <code>abcd-efgh-j</code>. Codes expire in a year and can be
          revoked; a revoked or expired code returns a "code not found"
          error.
        </p>
        <p>
          <strong>To create:</strong> Welcome screen → Create a Space →
          name it (family or group name) → set the join approval
          setting (invite code only, or admin approves every join).
          You're the first admin.
        </p>

        <h2 id="tabs">4. The tabs</h2>
        <ul>
          <li>
            <strong>Calendar.</strong> Today tile at the top with local
            date. Month view below. Tap an event to open Event talk
            (comments, RSVP, photos).
          </li>
          <li>
            <strong>Lists.</strong> Shared checklists with optional
            rotation (whose turn it is). Voice-add: hold the mic
            button, say a shopping list, tap done. Categories are
            assigned on the phone.
          </li>
          <li>
            <strong>Space.</strong> Space chat + Space photos in one
            place. Photos are member-only.
          </li>
          <li>
            <strong>Me.</strong> Your profile, notifications, privacy
            settings, sign out, delete account.
          </li>
        </ul>

        <h2 id="privacy">Privacy</h2>
        <p>
          ConnectionLoop is invite-only and rules-enforced: Firestore
          and Storage rules deny by default; a member row can only be
          created against a live invite code; other people's emails
          never render in the UI; the on-device cache is AES-256-GCM
          sealed under an OS keychain key. Full data map on the{" "}
          <Link href="/security/">security page</Link>.
        </p>

        <h2 id="delete">Delete my account</h2>
        <p>
          Me → Privacy &amp; Safety → Delete account. A deletion row is
          written to <code>deletionRequests</code>; the hard wipe (auth
          user, profile, all authored content) completes within thirty
          days.
        </p>
      </article>

      <section className="mt-16 border-t border-line pt-8">
        <Notice>
          Bug in the app? Send a developer message from Me → Message
          developer. Attach crash notes if the option is offered.
        </Notice>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap gap-3">
          <ContactWidget label="Join the waitlist" size="small" />
          <GhostLink href="/programs/connectionloop/" small>
            Program page
          </GhostLink>
          <GhostLink href="/docs/" small>
            All docs
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
