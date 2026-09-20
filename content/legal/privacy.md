---
kind: privacy
version: 2026-09-20
title: Privacy Policy
under_review: true
---

DRAFT FOR COUNSEL. Not yet reviewed by a lawyer. Do not present to customers until it is.

# Doyel Labs Privacy Policy

This policy is Doyel Labs LLC's, the company that makes the software described on this website.

## Products this policy covers

- **Payroll software** (SteadFast Payroll and any operator workspace we run for you).
- **Websites** we build and host for operators.
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
the source and again on the server. The company website itself records no analytics on
marketing pages; there are no third-party marketing scripts on `/` through `/programs/*`.

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
