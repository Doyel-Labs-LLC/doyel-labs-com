---
kind: privacy
version: 2026-09-22
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

<!-- analytics:plausible -->
The public pages on `doyel-labs.com` use **Plausible Analytics** (plausible.io).
It is the only visitor analytics provider selected for this website.

- Plausible is cookieless: it sets no cookies on your device and stores no cross-session
  identifier.
- Plausible records page views, referrers, screen sizes, browsers, and coarse country from
  your IP address (which is discarded after the request).
- It does not record mouse movement, clicks inside forms, keystrokes, form values, page
  content, or replay sessions.
- It is not used for advertising, retargeting, or any cross-site profile.
<!-- /analytics -->

<!-- analytics:cloudflare -->
The public pages on `doyel-labs.com` use **Cloudflare Web Analytics**.
It is the only visitor analytics provider selected for this website.

- Cloudflare's browser beacon measures page views, referral information, broad browser,
  device and operating-system categories, approximate country, and page-performance timings.
  These measurements describe website activity, not named visitors or exact people.
- The beacon does not use cookies, local storage, persistent browser identifiers, or
  fingerprinting to track people across sites or sessions.
- Cloudflare receives the source IP address when handling a beacon request. Cloudflare
  states that its RUM service discards that address at the nearest data center rather
  than retaining it in its RUM databases or logs. Our analytics dashboard does not
  request, display, or store raw IP addresses.
- Cloudflare does not log URL query strings in Web Analytics. Our dashboard also
  removes query strings and fragments, groups unknown paths, and displays only referral
  hosts rather than full referral URLs.
- Cloudflare currently makes the previous six months of Web Analytics data available.
  Older data and queries may be sampled. We do not create a separate visitor-event database.

We use these aggregate reports to understand which pages are useful and improve the website.
We do not use them for advertising, retargeting, or linking contact inquiries to browsing
activity. Cloudflare's own [RUM privacy information](https://developers.cloudflare.com/speed/observatory/rum-beacon/#privacy-information)
describes its processing.
<!-- /analytics -->

<!-- analytics:none -->
No visitor analytics provider is enabled for this website build.
<!-- /analytics -->

<!-- location:enabled -->
### Approximate city and region counts

We also collect **first-party approximate location counts** on published public pages.
One same-origin request sends only the published page path, without its query string,
fragment, referrer, or cookies. The server validates and discards that path. Cloudflare
supplies approximate country, region, and city from its request metadata; we do not
request GPS, postal addresses, or latitude/longitude. VPNs and mobile networks can
mislocate activity, and missing locations are grouped as unknown.

Our dedicated Cloudflare D1 database stores only hourly country/region/city counters,
daily admission totals, and the hour when collection first received data. It never
stores raw events, IP addresses, paths, queries, referrers, user agents, visitor IDs,
cookies, fingerprints, or per-person profiles. These are accepted pageviews, not
unique visitors, and are separate from Cloudflare Web Analytics estimates.
Collection starts at launch without historical backfill, stops after 5,000 accepted
pageviews per UTC day, and honors available Global Privacy Control and Do Not Track
signals. Blocked requests, disabled collection, and the cap can make counts incomplete.

Active hourly aggregates and daily budgets are retained for about 31 days, with hourly
cleanup; bucket boundaries and delayed cleanup can extend this slightly. The coarse feature-start
hour is retained while this feature exists. Cloudflare D1's always-on Time Travel
backups may retain deleted aggregates for up to 30 additional days (currently 7 days
on Free and 30 days on Paid); deletion is not immediately unrecoverable.
<!-- /location -->

<!-- location:disabled -->
First-party city and region collection is not enabled for this website build.
<!-- /location -->

Visitor analytics is excluded from the private owner dashboard, local development,
and preview hostnames. We do not record form values, keystrokes, or session replay.
There are no advertising or cross-site visitor-tracking scripts. We do not use
Google Analytics, Meta Pixel, Microsoft Clarity, Hotjar, FullStory, LogRocket, or any
session-replay tool.

Website delivery, Cloudflare Turnstile on the contact form, and Cloudflare Access
for owner sign-in are separate from visitor analytics. They process information needed
to deliver the site, filter abuse, or authenticate the owner. This policy's analytics
statements do not describe all security processing performed by those services.

## Where

Our application servers are in the United States. Cloudflare operates a global network;
website delivery, security services, and any enabled Web Analytics processing may occur
in other countries.

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
