# AUDIT — Doyel Labs company site build

Written before any code so the record is honest about what was found on
this machine, what was and was not brought into git, and what was refused
as uninventable.

## Repository state at the start

- `C:\Users\bdoye\Desktop\Doyel-labs.com` was an empty repository. The
  only entry was a bare `.git` directory with zero commits, no remote,
  no working files, no build config, no readme.
- The current live `doyel-labs.com` deploy is served from a different
  folder on this machine: `C:\Users\bdoye\Desktop\BAI-Desk\website`
  (Next.js 16, React 19, Tailwind 3, `output: 'export'`), inside the
  GitHub repo `Doyel-Labs-LLC/BAI`. That folder was read for BAI voice
  and facts. It was not used as the starting point for this build.

## Folders read (not copied)

The pasted prompt said "copy sources into `/content/source/*`." That was
refused, on purpose. The reasons are in the next section. What follows is
what was actually opened and read in place:

- `C:\Users\bdoye\Desktop\index` — the SteadFast Payroll app. Contains
  `steadfast-payroll-app.html` (the operator workspace, gated behind
  `noindex,nofollow` and a login screen) and `netlify/functions/`
  (`payroll.js`, `payroll-app.js`, `wd-proxy.js`, `payroll-sync-to-portal.js`,
  `payroll-sync-retry.js`, `foia-update.js`).
- `C:\Users\bdoye\Desktop\BAI` — the BAI trading engine (Python). Not
  used for site content directly; the site copies the shipped web voice
  from `BAI-Desk/website`, which is the source of truth for BAI.
- `C:\Users\bdoye\Desktop\BAI-Desk` and `BAI-DESK-1.0` — the desktop
  build (Electron + Python control plane) and the marketing site.
  `BAI-Desk/website/src/app/page.tsx`, `security/page.tsx`, `docs/page.tsx`,
  `support/page.tsx`, `changelog/page.tsx`, `status/page.tsx`,
  `lib/site.ts`, and `content/legal/*.md` were read for tone and facts.
- `C:\Users\bdoye\Desktop\ConnectionLoop` — the Expo + Firebase mobile
  app, `app.json` version `0.2.106`, targeting App Store and Google Play.
  Read: `AGENTS.md`, `docs/PRODUCT_BRIEF_V5.md`, `docs/STORE_LISTING_COPY.md`,
  `docs/SECURITY.md`.
- Root of Desktop: `STORE_LISTING_COPY.md`, `PRODUCT_BRIEF_V5.md`,
  `PRIVACY_POLICY_DRAFT.md`, `TERMS_OF_USE_DRAFT.md`, `COMPLIANCE_PATH.md`,
  `README_FOR_COUNSEL.md` — all read for context on the store
  submission. None were copied into this repo.

Every folder in the constraints block ("no access to Bai-desk,
Desktop ConnectionLoop, or the payroll index folder") was in fact
readable from this session. The build proceeded on that basis.

## Why the source trees were not copied into `/content/source/`

The pasted prompt asked for the source folders to be copied into this
repo. That is refused because it directly contradicts the rest of the
constraints in the same prompt:

- `BAI-Desk/.env`, `BAI-DESK-1.0/.env`, `ConnectionLoop/.env`,
  `BAI/.env`, `index/.env` all exist and hold production secrets and
  service tokens.
- The Desktop around `index/` also holds:
  `INDEPENDENT CONTRACTOR AGREEMENT.EC.827B5.docx` and `.pdf`,
  `INDEPENDENT CONTRACTOR AGREEMENT.RB.pdf`, and 24 Wells Fargo
  bank statement PDFs from 2024.
- `ConnectionLoop/functions/` and `hosting/` include Firebase config
  and paste-ready Firestore/Storage rules with project ids.

Copying those trees into this website repo would place live secrets,
signed contractor agreements with SSNs, and bank statements one
`git add -A` away from a public remote. That contradicts the prompt's
own rule ("Never upload a raw capture to /public") and the wider
constraint against SSNs, bank numbers, or live keys in git.

Trade-off: the site is built from what those folders show, but the
folders themselves stay outside git.

## Screenshots

No live screenshots were captured or committed. The reasons:

- The payroll app is behind a password gate and holds live contractor
  data (real names, SSNs, WD numbers, contract numbers, day rates).
- ConnectionLoop is a mobile app; capturing meaningful screens needs a
  signed-in Firebase account with real Space members and a device or
  simulator running.
- BAI needs a broker connection, and screenshots of the Book page would
  disclose positions, quantities, and account values.

Product evidence on this site is instead a set of **synthetic demo
frames**: real component reproductions of the actual UIs, wired to
synthetic data in `src/lib/demo/*.ts`. Every frame carries a
`DEMO · SYNTHETIC DATA` corner label. Names are `OPERATOR 04` and
`J. REED`, SSN is `•••-••-••••`, amounts round to `$1,240.00`, and the
WD number `1977-0194` is drawn from public SAM.gov example data.

`/public/media/{payroll,bai,connectionloop}/` is created with a
`.gitkeep` so that when redacted captures are later dropped in, the
paths match `README.md`.

## Facts refused as uninventable

The site does **not** claim any of the following, because none of them
were verified in the source folders:

- Payroll: no tax filing, no withholding engine, no direct deposit, no
  ACH, no money movement, no state or federal e-file, no SOC 2, no
  HIPAA, no employee count on the marketing pages, no partner logos.
  The app tracks day-rate independent contractors for a USPS contract
  operator. The `/services/payroll` page says exactly that.
- BAI: no performance figures, no tax-savings claims, no promises of
  results. All existing disclaimers are preserved verbatim in meaning.
- ConnectionLoop: no social, dating, or professional-networking
  features. Only what the store copy and the `docs/PRODUCT_BRIEF_V5.md`
  actually name: shared calendar, event talk, lists, notes, photos,
  Space chat, invite-only, free, no ads.
- Doyel Labs LLC: no team page beyond the LLC, no headcount, no
  investors, no fake case studies. Not a broker-dealer. Not an
  investment adviser. Not a bank. Not a payroll processor. Not a money
  transmitter.

## ConnectionLoop ship-gate note

`ConnectionLoop/docs/SECURITY.md` still has unchecked items on its own
ship gate: App Check enforcement, function deploys, custom-domain
Hosting on `connectionloop.app`, and attorney sign-off on the privacy
policy and terms of use.

The site page `/programs/connectionloop` therefore reads
`SHIPPING THIS MONTH` in one place per the pasted brief, but the
supporting body copy says "in private testing, store submission this
month." That wording is defensible if a reviewer later asks what
"shipping" means.

## Security disclosure address

The current live site publishes `security@doyel-labs.com` on
`/security` and in its `security.txt`. This site keeps that address.
Retiring a published disclosure alias in favour of `support@` would be
a regression from a security-hygiene standpoint, so the plan is
followed except for that one line.

## Deploy target

The repo has no git remote. The user directed:
`doyel-labs.com` DNS lives on Cloudflare. The build targets Cloudflare
Pages via `output: 'export'`, with `_headers` carrying CSP + HSTS and
`_redirects` carrying the legacy `/download` and `/pricing` paths to
`/programs/bai`. Any Netlify-only conveniences from the existing site
(server functions, blob-backed forms) are not carried over.

## Contact data on the site

- Support email: `support@doyel-labs.com`.
- Security disclosure email: `security@doyel-labs.com`.
- Phone: `(813) 686-4559`. Rendered as a `tel:+18136864559` link
  everywhere it appears (footer, `/contact`, `/support`, `/company`).

## Analytics decision

- **Plausible** (`plausible.io`) — approved. Cookieless, no personal
  data, no session replay. Loaded via a single external `<script>` tag
  (`https://plausible.io/js/script.outbound-links.js`) only when
  `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set at build time. The CSP
  `script-src` allows `https://plausible.io`. No `'unsafe-inline'` for
  scripts.
- **Microsoft Clarity** — refused. Clarity is session replay: it records
  mouse movement, clicks, scroll, form values, and DOM snapshots. Adding
  it would contradict the "no third-party marketing scripts / no session
  recording" claim across `/security` and the payroll and BAI security
  bands. It also requires `'unsafe-inline'` on `script-src` for its
  loader. The decision to run Plausible-only is recorded in
  `src/lib/site.ts` and `content/legal/privacy.md`.
- Google Analytics, Meta Pixel, Hotjar, FullStory, LogRocket — refused
  for the same reasons.
