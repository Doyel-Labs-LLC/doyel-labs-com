import type { Metadata } from "next";
import { Card, Eyebrow, GhostLink, H1, H2, Lead, Page } from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Contact ${site.companyShort} support at ${site.supportEmail}. One-business-day response.`,
};

export default function Support() {
  return (
    <Page>
      <section className="pt-24">
        <Eyebrow>Support</Eyebrow>
        <H1>Ask a person.</H1>
        <Lead>
          Email{" "}
          <a
            href={`mailto:${site.supportEmail}`}
            className="underline decoration-line2 underline-offset-2 hover:text-ink"
          >
            {site.supportEmail}
          </a>
          . We answer within one business day and sooner on trading days.
          Inside BAI, the Help panel attaches a diagnostic bundle that never
          contains your broker credentials, your positions, or your order
          history.
        </Lead>
      </section>

      {/* Product-scoped FAQs */}
      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>Payroll</Eyebrow>
        <H2>
          <span className="mt-2 block">Payroll answers.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card title="A draft is being blocked">
            The blue banner names the reason. Most often: day rate under the
            SCA floor for the contractor's county. Fix the day rate or add a
            supplementary H&W line; the stub then issues.
          </Card>
          <Card title="An email did not deliver">
            Check the Audit tab. Each stub-email row carries the delivery
            state from Resend. Bounces show as a warn row with the reason.
          </Card>
          <Card title="How to export for DOL">
            Backup tab → Download raw backup (.json) and Export CSV on the
            Audit tab. Keep both against the SCA's three-year rule.
          </Card>
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>Websites</Eyebrow>
        <H2>
          <span className="mt-2 block">Websites answers.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card title="Change a price or copy">
            The build ships with a small documented set of files where copy
            lives; edit and push. If we run maintenance on your build, email
            the change and we do it within one business day.
          </Card>
          <Card title="A form did not arrive">
            Formspree (or the operator's chosen provider) logs each submission.
            Check the spam folder first, then the provider's dashboard, then
            us.
          </Card>
          <Card title="Add a page">
            Send the copy and a rough shape (band 1, band 2, contact). We
            match the site's own design system.
          </Card>
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>BAI</Eyebrow>
        <H2>
          <span className="mt-2 block">BAI answers.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card title="The desk will not arm">
            The Arm dialog says why: a lock you have not typed, a subscription
            that is not active, terms to accept, or a broker that is not
            connected. Each has one fix, named on the screen.
          </Card>
          <Card title="A position looks wrong">
            Your broker is the record. Log in there directly. The desk
            reconciles against the broker every few seconds and will never
            sell more than the broker says you hold.
          </Card>
          <Card title="Billing">
            Change plan, update the card, or cancel from Account → Manage
            billing in the app. Refund terms are in the pricing rider you
            agreed to at purchase.
          </Card>
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <Eyebrow>ConnectionLoop</Eyebrow>
        <H2>
          <span className="mt-2 block">ConnectionLoop answers.</span>
        </H2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card title="Cannot join a Space">
            The invite code has expired or been rotated. Ask the Space owner
            for a fresh one from Invite → Make a new code.
          </Card>
          <Card title="Delete my account">
            Me → Privacy &amp; Safety → Delete account. The row is written to
            `deletionRequests`; hard wipe completes within thirty days.
          </Card>
          <Card title="A push did not arrive">
            Check notification permission on the device. Push payloads carry
            kind + ids only, so a suppressed lock-screen line means the push
            reached the device.
          </Card>
        </div>
      </section>

      <section className="mt-24 border-t border-line pt-16">
        <p className="max-w-prose text-[14px] text-mute">
          Outside the United States? Payroll, websites, and BAI are US-only at
          launch. ConnectionLoop is available where its stores are.
        </p>
        <div className="mt-8">
          <GhostLink
            href={`mailto:${site.supportEmail}`}
            external
          >
            Email support
          </GhostLink>
        </div>
      </section>
    </Page>
  );
}
