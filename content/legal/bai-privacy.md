---
kind: bai-privacy
version: 2026-09-21
title: Privacy Policy — BAI Desk
under_review: false
---

**Effective date:** September 21, 2026
**Last updated:** September 21, 2026
**Product:** BAI Desk (the "Software")
**Publisher:** Doyel Labs LLC, a Wyoming limited liability company ("Doyel Labs," "we," "us," "our")
**Contact:** [support@doyel-labs.com](mailto:support@doyel-labs.com)
**Website:** [https://doyel-labs.com](https://doyel-labs.com)

This Privacy Policy describes how Doyel Labs LLC collects, uses, and
protects information when you use BAI Desk. If you do not agree with this
Policy, do not use the Software.

## 1. The short version

**BAI Desk runs on your computer.** Almost everything about your use of
the Software — your Alpaca (or other broker) credentials, your trading
history, your holdings, your monthly budget, your notifications
configuration — stays on your device. Doyel Labs LLC does not have a
server that stores your trades or your account balance.

The narrow exceptions are:

- **Payment information** (if and when we launch a paid subscription) will
  be processed by a third-party payment processor (Stripe or similar) on
  our behalf. We receive from that processor only the information needed
  to bill you and provide support: your email, your subscription status,
  and the last four digits of your card. We do not receive your full
  card number.

- **Support communications** you initiate by emailing
  [support@doyel-labs.com](mailto:support@doyel-labs.com).

- **A subscription-status check** ("entitlement lease") the Software may
  perform against a Doyel Labs LLC server so that your paid features
  stay unlocked. This check reports only that you are a valid subscriber
  as of that moment; it does not report your trades, your holdings, or
  your account balance.

**We do not sell your personal information.** We do not track you
across the web with advertising cookies. We do not share your data
with third parties for their marketing.

## 2. What information we collect

### 2.1 Information you provide directly

- **Email address**, if you subscribe or contact us for support.
- **Payment information**, if you subscribe. Handled by our payment
  processor as described above.
- **Support messages** you send us.

### 2.2 Information collected automatically by the Software (on your device)

The Software stores the following on your local machine, in a folder
under your user profile (`%LOCALAPPDATA%\com.doyellabs.bai\` on Windows,
`~/Library/Application Support/com.doyellabs.bai/` on macOS, or the
project's `data/` directory when run from source):

- **Your Alpaca (or other broker) credentials** — either the API key/secret
  you paste in, or the OAuth access token issued by the broker. Stored in
  the operating system's credential manager (Windows Credential Manager,
  macOS Keychain, or a comparable secret store on Linux). Not on our
  servers.
- **Your monthly budget, max-loss cap, and other configuration** in JSON
  files.
- **A local journal** of the Software's cycles: what it looked at, what
  reason it recorded, what orders it placed. Not on our servers.
- **A local heartbeat file** with the Software's status.
- **Log files** in the `logs/` folder for troubleshooting.

None of this information leaves your device unless you export it (for
example, by using the Support-bundle feature to send us a zipped copy
for troubleshooting, in which case the file is only what you attach to
the email).

### 2.3 Information collected by third parties on our behalf

- **Your broker** (Alpaca or another) receives every order the Software
  places for you. That is the entire point of connecting your broker
  account. Your broker's own privacy policy governs how it handles this
  data.
- **Our payment processor** (Stripe or similar), if applicable, receives
  the payment information required to bill you. Their privacy policy
  governs how they handle it.
- **Our subscription-status service** may receive your subscription
  identifier (a token) so we can verify your entitlement. It does not
  receive your trades or holdings.

## 3. How we use information

We use the information we collect to:

- Provide, maintain, and improve BAI Desk and any related services.
- Process subscriptions and payments.
- Respond to your support requests.
- Send you service messages (for example, about outages, security fixes,
  or changes to these policies).
- Comply with applicable laws and enforce our
  [Terms of Use](/legal/bai/terms/).

We do not use the information we collect to train machine-learning models,
sell to advertisers, or profile you for marketing.

## 4. How we share information

We share information only in these narrow cases:

- **With third-party service providers** who help us operate the business
  (for example, our payment processor, our email provider, our hosting
  provider for the subscription-status service). These providers may only
  use the information to provide services to us, under written contract.
- **When required by law**, including in response to a subpoena, court
  order, or other lawful request from a government or regulator. We will
  push back on overbroad or unlawful requests.
- **To protect rights, safety, or property**, including to investigate
  fraud or violations of the Terms of Use.
- **With your consent**, or at your direction.
- **In a business transfer** (merger, acquisition, sale of substantially
  all assets, or bankruptcy), your information may transfer with the
  business, subject to this Policy or a successor policy that is at least
  as protective.

**We do not sell your personal information** as that term is defined under
the California Consumer Privacy Act, the Virginia Consumer Data Protection
Act, or comparable state laws.

## 5. Security

We use reasonable technical and organizational measures to protect the
information we collect. The Software stores your broker credentials in
the operating system's secret store, which encrypts them at rest with a
key derived from your user profile. Communications with your broker use
TLS. Payment communications with our processor use TLS.

**No system is perfectly secure.** If we become aware of a security
incident affecting your data, we will notify you as required by
applicable law.

## 6. Data retention

- **On your device:** information stays until you delete it (or uninstall
  the Software, which wipes the local configuration folder). You can
  delete individual files or the whole folder at any time.
- **With us:** we retain the information we collect for as long as your
  account is active plus a reasonable period afterward to comply with
  legal, accounting, tax, or fraud-prevention obligations.
- **Payment records:** retained by our payment processor per their
  standard schedule (typically 7 years for tax and financial-reporting
  reasons).

## 7. Your choices and rights

You can:

- **Stop using the Software** at any time by uninstalling it.
- **Delete your local data** by deleting the local configuration folder
  (see section 2.2 for the path on your operating system).
- **Cancel your subscription** through the subscription portal (if
  applicable) or by contacting us.
- **Access, correct, or delete** any information Doyel Labs LLC holds
  about you (for example, your email or support-ticket history) by
  contacting [support@doyel-labs.com](mailto:support@doyel-labs.com).
- **Opt out of non-essential service emails** by using the unsubscribe
  link in the email or by contacting us. We will still send you
  transactional and legal notices (billing, security incidents, changes
  to these policies).

### California residents

You have specific rights under the California Consumer Privacy Act
(CCPA), including the right to know what personal information we
collect, the right to delete it, the right to correct it, and the right
not to be discriminated against for exercising these rights. Contact us
at [support@doyel-labs.com](mailto:support@doyel-labs.com) to exercise any of these rights.

### Other U.S. state privacy laws

If you live in a state with a comprehensive consumer-privacy law
(Virginia, Colorado, Connecticut, Utah, and others as those laws come
into effect), you have similar rights and can exercise them the same
way. Contact us at [support@doyel-labs.com](mailto:support@doyel-labs.com).

## 8. Children

BAI Desk is not intended for use by anyone under 18. We do not knowingly
collect information from anyone under 18. If you believe a person under
18 has provided information to us, contact us at [support@doyel-labs.com](mailto:support@doyel-labs.com)
and we will delete it.

## 9. International users

BAI Desk is offered to residents of the United States. If you access the
Software from outside the U.S., your information will be processed in
the U.S. under U.S. law, which may not be as protective as the law of
your country. Do not use the Software if that is not acceptable to you.

## 10. Changes to this Policy

We may update this Policy from time to time. If we make a material change,
we will notify you (for example, by updating the "Last updated" date at
the top and, where practical, by an in-app or email notice). Continued
use of the Software after the change takes effect means you accept the
updated Policy.

## 11. Contact

Questions about this Policy, or a request to exercise your rights?

**Doyel Labs LLC**
Email: [support@doyel-labs.com](mailto:support@doyel-labs.com)
Website: [https://doyel-labs.com](https://doyel-labs.com)
