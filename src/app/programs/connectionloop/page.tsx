import type { Metadata } from "next";
import {
  Card,
  Eyebrow,
  GhostLink,
  H1,
  H2,
  Lead,
  MetaRow,
  Notice,
  Page,
  StatusChip,
} from "@/components/chrome";
import { ConnectionLoopTodayFrame } from "@/components/frames/connectionloop-today";
import { programStatus, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "ConnectionLoop",
  description:
    "ConnectionLoop — invite-only shared calendar for families and small groups. Free. No ads. Store submission this month. Created by The Hamilton Family, built by Doyel Labs LLC.",
};

export default function ConnectionLoopProgram() {
  return (
    <Page
      bandFooter={
        <div>
          <p className="max-w-prose text-[12px] leading-relaxed text-muted">
            ConnectionLoop is an invite-only mobile application. It does not
            operate a public feed and does not accept accounts under 13.
            Privacy and terms are under attorney review before public store
            release.
          </p>
          <MetaRow>
            Source of truth · ConnectionLoop/docs/PRODUCT_BRIEF_V5.md · ConnectionLoop/docs/SECURITY.md
          </MetaRow>
        </div>
      }
    >
      {/* HERO */}
      <section className="pt-24">
        <Eyebrow>Programs · ConnectionLoop</Eyebrow>
        <H1>Shared plans, lists, and chat — in one loop.</H1>
        <div className="mt-6">
          <StatusChip>{programStatus.connectionloop.label}</StatusChip>
        </div>
        <Lead>
          A free, invite-only shared calendar for families and small groups.
          See what is on today. Add events with Event talk and photos. Share
          lists and notes. Chat in your Space. Alerts stay inside your circle
          — no public feed, no ads.
        </Lead>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-wide text-muted">
          Created by The Hamilton Family · Built by {site.company}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <GhostLink
            href={`mailto:${site.supportEmail}?subject=ConnectionLoop%20waitlist`}
            external
          >
            Join the waitlist
          </GhostLink>
          <GhostLink href="/security/" small>
            Security posture
          </GhostLink>
        </div>
      </section>

      {/* DEMO FRAME */}
      <section className="mt-24 border-t border-line pt-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div>
            <Eyebrow>Space</Eyebrow>
            <H2>
              <span className="mt-2 block">One Space, one loop.</span>
            </H2>
            <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
              You create a Space, share an invite code or link, and everyone
              you invited sees the same calendar, the same lists, and the same
              notes. There is no directory of other families and no way to
              find your Space from outside. Invite-only enforcement lives in
              the database rules, not in the app.
            </p>
          </div>
          <ConnectionLoopTodayFrame />
        </div>
      </section>

      {/* WHAT'S IN */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What is in the app</Eyebrow>
        <H2>
          <span className="mt-2 block">
            The list, from the store copy.
          </span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Calendar">
            One calendar everyone can trust. Today tile with local date.
            Event talk (comments + RSVP) on each event.
          </Card>
          <Card title="Invite">
            Share a code or a link. Codes are nine symbols, CSPRNG-drawn from
            a 32-symbol alphabet, expire in a year at most, and can be
            revoked. Codes do not carry the family name.
          </Card>
          <Card title="Lists and notes">
            Shared checklists with rotation (whose turn it is), and shared
            notes. Owner and admin can prune; members contribute.
          </Card>
          <Card title="Photos">
            Space-only photos on Firebase Storage under `spaces/id/photos`.
            Member-only reads. 8 MiB limit. `createdBy` is immutable metadata.
          </Card>
          <Card title="Space chat">
            One thread per Space. No cross-Space directory.
          </Card>
          <Card title="Voice lists (English)">
            Say a shopping list. The recording goes once to a signed-in
            callable, is transcribed by Google Cloud Speech-to-Text, and is
            not stored anywhere. Categories happen on the phone.
          </Card>
        </div>
      </section>

      {/* WHAT'S NOT */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>What ConnectionLoop is not</Eyebrow>
        <H2>
          <span className="mt-2 block">Refusals, in one place.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card title="Not a public social network">
            There is no public feed. There is no friends-of-friends graph. A
            person you did not invite cannot see your Space.
          </Card>
          <Card title="Not for accounts under 13">
            13+ account holders at launch. A child stays under a parent's
            account until counsel signs off on an under-13 path.
          </Card>
          <Card title="No third-party ads or trackers">
            No AdMob, no analytics SDK on the app. Crash notes are scrubbed
            twice and sent via a first-party function only if the operator
            switched it on.
          </Card>
          <Card title="No cross-account discovery">
            Other people's emails never render in the UI. Member rows use the
            display name and avatar. UIDs are never shown.
          </Card>
        </div>
      </section>

      {/* SECURITY LINE */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>Security</Eyebrow>
        <H2>
          <span className="mt-2 block">
            Everything sensitive is rules-enforced.
          </span>
        </H2>
        <p className="mt-6 max-w-prose text-[16px] leading-[1.7] text-mute">
          Firestore and Storage rules deny by default; every path requires
          Space membership; every write is shape-checked. Sessions live in the
          OS keychain. The on-device cache is AES-256-GCM sealed under a
          per-install key that never leaves the device backup boundary.
          Server-side, only Cloud Functions write other people's
          notifications. Rate limits and App Check protect callables. The
          full data map lives on{" "}
          <a
            href="/security/"
            className="underline decoration-line2 underline-offset-2 hover:text-ink"
          >
            /security
          </a>
          .
        </p>
      </section>

      {/* CLOSE */}
      <section className="mt-24 border-t border-line pt-16">
        <Notice>
          To join the waitlist, email{" "}
          <a
            href={`mailto:${site.supportEmail}?subject=ConnectionLoop%20waitlist`}
            className="underline decoration-line2 underline-offset-2 hover:text-ink"
          >
            {site.supportEmail}
          </a>
          . We answer within one business day. Store review is pending; if a
          reviewer needs an invite code for demo, ask.
        </Notice>
      </section>
    </Page>
  );
}
