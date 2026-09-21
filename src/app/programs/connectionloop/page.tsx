import type { Metadata } from "next";
import {
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
  StatusChip,
} from "@/components/chrome";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactWidget } from "@/components/contact-modal";
import { ConnectionLoopTodayFrame } from "@/components/frames/connectionloop-today";
import { programStatus, site } from "@/lib/site";

/**
 * `noindex, follow` — see /programs/page.tsx for the full reasoning.
 * ConnectionLoop is not yet in stores. When it ships publicly, flip
 * this back to `{ index: true, follow: true }`.
 */
export const metadata: Metadata = {
  title: "ConnectionLoop",
  description:
    "ConnectionLoop is an invite-only shared calendar for families and small groups. Free. No ads. Built by Doyel Labs, credited to The Hamilton Family.",
  robots: { index: false, follow: true },
};

export default function ConnectionLoopProgram() {
  return (
    <Page
      bandFooter={
        <div>
          <p className="max-w-prose text-[12px] leading-relaxed text-muted">
            ConnectionLoop is an invite-only mobile application. It does
            not operate a public feed and does not accept accounts under
            13. Privacy and terms are under attorney review before public
            store release.
          </p>
          <MetaRow>
            ConnectionLoop is a Doyel Labs program. It is not the company.
          </MetaRow>
        </div>
      }
    >
      <Breadcrumbs
        items={[
          { name: "Programs", href: "/programs/" },
          { name: "ConnectionLoop", href: "/programs/connectionloop/" },
        ]}
      />

      {/* HERO */}
      <section className="hero-glow">
        <Eyebrow>Programs · ConnectionLoop</Eyebrow>
        <H1>
          Shared plans, lists, and chat — <span className="text-accent">in one loop</span>.
        </H1>
        <div className="mt-6">
          <StatusChip>{programStatus.connectionloop.label}</StatusChip>
        </div>
        <Lead>
          A free, invite-only shared calendar for families and small
          groups. See what's on today. Add events with photos. Share
          lists. Chat in your Space. Alerts stay inside your circle —
          no public feed, no ads.
        </Lead>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          Created by The Hamilton Family · Built by {site.company}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ContactWidget label="Join the waitlist" />
          <GhostLink href="/security/" small>
            Security posture
          </GhostLink>
        </div>
      </section>

      {/* PRODUCT FRAME */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Space</Eyebrow>
            <H2>
              <span className="mt-2 block">One Space, one loop.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              Create a Space, share an invite code, and everyone you
              invited sees the same calendar, the same lists, the same
              notes. There's no directory of other families. No way to
              find your Space from outside.
            </p>
          </div>
          <ConnectionLoopTodayFrame />
        </div>
      </section>

      {/* WHAT'S IN */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>What's inside</Eyebrow>
          <H2>
            <span className="mt-2 block">Everything a family runs on.</span>
          </H2>
        </div>
        <div className="mt-12">
          <Grid3>
            <Card title="Calendar">
              One calendar everyone can trust. Today tile with local
              date. Event talk (comments and RSVP) on each event.
            </Card>
            <Card title="Invite">
              Share a code or a link. Codes are nine symbols, drawn from
              a 32-symbol alphabet, expire in a year at most, and can be
              revoked.
            </Card>
            <Card title="Lists and notes">
              Shared checklists with rotation (whose turn is it), plus
              shared notes.
            </Card>
            <Card title="Photos">
              Space-only photos, 8 MiB per upload. Members only. No
              cross-Space sharing.
            </Card>
            <Card title="Space chat">
              One thread per Space. No cross-Space directory.
            </Card>
            <Card title="Voice lists">
              Say a shopping list. The audio goes once to Google Cloud
              Speech-to-Text and is not stored. Categories happen on the
              phone.
            </Card>
          </Grid3>
        </div>
      </section>

      {/* REFUSALS */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>What it is not</Eyebrow>
          <H2>
            <span className="mt-2 block">The refusals.</span>
          </H2>
        </div>
        <div className="mt-12">
          <Grid2>
            <Card title="Not a public social network">
              No public feed. No friends-of-friends graph. A person you
              didn't invite cannot see your Space.
            </Card>
            <Card title="Not for accounts under 13">
              13+ account holders at launch. A child stays under a
              parent's account until counsel signs off on an under-13
              path.
            </Card>
            <Card title="No third-party ads or trackers">
              No AdMob. No analytics SDK. Crash notes are scrubbed twice
              and sent via a first-party function only if the person
              switched it on.
            </Card>
            <Card title="No cross-account discovery">
              Other people's emails never render in the UI. Member rows
              show display name and avatar only.
            </Card>
          </Grid2>
        </div>
      </section>

      {/* SECURITY LINE */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="max-w-3xl">
          <Eyebrow>Security</Eyebrow>
          <H2>
            <span className="mt-2 block">Rules-enforced everywhere.</span>
          </H2>
          <p className="mt-6 text-[16px] leading-[1.7] text-mute">
            Firestore and Storage rules deny by default. Every path
            requires Space membership. Every write is shape-checked.
            Sessions live in the OS keychain. The on-device cache is
            AES-256-GCM sealed under a per-install key that never leaves
            the device backup boundary. Only Cloud Functions write
            other people's notifications.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GhostLink href="/security/" small>
              Full data map
            </GhostLink>
            <GhostLink href="/legal/privacy/" small>
              Privacy policy draft
            </GhostLink>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="mt-24 border-t border-line pt-16">
        <Notice>
          Join the waitlist by sending an email to{" "}
          <a
            href={`mailto:${site.supportEmail}?subject=ConnectionLoop%20waitlist`}
            className="text-accent underline decoration-accentDim underline-offset-2 hover:text-accentHi"
          >
            {site.supportEmail}
          </a>
          . Store review is pending; if a reviewer needs an invite code
          for demo, ask.
        </Notice>
      </section>
    </Page>
  );
}
