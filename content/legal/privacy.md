---
kind: privacy
version: 2026-09-20
title: Privacy Policy
under_review: true
---

# Doyel Labs Privacy Policy

This policy is Doyel Labs LLC's, the company that makes the software described on this website.
It covers what happens to your information when you visit `doyel-labs.com`, when you email us,
and when you use software Doyel Labs builds or ships.

## Products this policy covers

- **The website itself** at `doyel-labs.com` — marketing pages, the contact form, the changelog,
  and every other page anyone can reach without a sign-in.
- **Custom software we build for you** — websites, payroll workspaces, dashboards, portals,
  internal tools, integrations, and one-off programs. Each build is a separate deployment on
  your own infrastructure; Doyel Labs holds the code and helps you operate it.
- **BAI**, our internal trading desk (installed on your machine).
- **ConnectionLoop**, our internal mobile app (shipped to iOS and Android through their stores).

Each product has a data-map section on `/security` that lists specifically what we hold and what
we never hold.

## What stays on your machine (BAI)

Your broker credentials and tokens, your market-data keys, your trading history, your positions,
your paper book and the brain's ledger live only on your computer, encrypted where the
operating system allows. They are never sent to us. We cannot see your trades or your account
balances.

## What stays on the operator's machine or bank (Payroll)

Bank routing and account numbers. Card numbers. Any tax filing information. The operator pays
their contractors through the operator's own bank; the software prepares the pay run and we
never touch funds.

## What we hold

- **Account:** your email address, a hash of your password, the devices you signed in from,
  which legal documents you accepted and when, and an audit log of sign-ins and account changes.
- **Payroll workspace:** the contractor register, pay-run drafts and generated stubs, the audit
  log, and metadata for any enrolled passkeys. Retention: 180 days on the security audit log,
  export-your-data on request.
- **BAI account services:** subscription status as reported by Stripe, one customer id per
  account, one seat per device.
- **ConnectionLoop backend:** the auth email, display name, avatar reference, Space membership
  rows, invite codes (hashed, not the family name), and the content people write inside their
  own Space (events, comments, photos, messages, lists, notes). See `/security` for the full
  data map.

## Payments

Card details go to our payment processor (Stripe) and never touch our servers. We receive the
status of your subscription and the last four digits of your card for support.

## Crash reports and usage

Off by default in BAI. If you turn them on, they are scrubbed of anything that identifies you
or your trading before they leave your computer. ConnectionLoop crash notes are scrubbed at
the source and again on the server.

## Analytics on this website

`doyel-labs.com` uses **Plausible Analytics** (plausible.io), and only Plausible.

- Plausible is cookieless: it sets no cookies on your device and stores no cross-session
  identifier.
- Plausible records page views, referrers, screen sizes, browsers, and coarse country from
  your IP address (which is discarded after the request).
- It does not record mouse movement, clicks inside forms, keystrokes, form values, page
  content, or replay sessions.
- It is not used for advertising, retargeting, or any cross-site profile.

There are no other third-party marketing scripts on `/` through `/programs/*`. We do not use
Google Analytics, Meta Pixel, Microsoft Clarity, Hotjar, FullStory, LogRocket, or any
session-replay tool.

## Where

Our servers are in the United States.

## How long we keep it

Payroll audit log: 180 days by default, longer on request. BAI audit and security records: two
years. Community posts (if any): ninety days. Private and group messages: one year. Sign-in
attempts: one day. Crash reports you chose to send: ninety days. Billing records: seven years,
for tax purposes.

## Your rights

You can export what we hold for you and ask us to delete your account. Deletion completes
within thirty days, except billing records we must keep. For ConnectionLoop, the delete path
is Me → Privacy & Safety → Delete account.

## Contact

`support@doyel-labs.com`.
