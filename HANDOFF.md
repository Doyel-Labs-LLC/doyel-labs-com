# Handoff for Claude Code (local terminal) — v11 copy update

You are working in `C:\Users\bdoye\Desktop\Doyel-labs.com`, the live
doyel-labs.com site. The owner (Blake) is not technical: do everything
yourself, ask him only to click "Allow"/"Authorize" if a login window
opens, and report in plain English.

## What changed in this folder

Copy only. Every customer-facing line that named "Blake" now says
"a person" (hero, promise, how-it-works steps, footer "Who answers",
how-we-work page, contact page and form, closing bands, FAQs, privacy
policy line about the mailbox). The founder is still named on
`/about/` and in the Organization JSON-LD. `PROMPT.md` is now v11 and
documents the rule. No code, config, or dependency changes.

Files touched: `PROMPT.md`, `CONTENT.md`, `README.md`,
`content/legal/privacy.md`, `src/lib/site.ts`, `src/lib/offer.ts`,
`src/components/chrome.tsx`, `src/components/contact-form.tsx`,
`src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`,
`src/app/how-we-work/page.tsx`, `src/app/security/page.tsx`,
`src/app/websites/page.tsx`, `src/app/work/page.tsx`.

## Do this, in order

1. `npm run check`. Stop and explain if anything fails (it passes here:
   typecheck, lint, 7 unit tests, build, CSP hashes). Optionally
   `npm run test:analytics` (87 tests).
2. Commit and push:
   - `git add -A`
   - `git commit -m "v11: say 'a person' instead of a name; PROMPT v11"`
   - `git push origin HEAD:master`
3. Deploy the same way the v10 launch was deployed:
   - If Cloudflare Pages builds from GitHub, wait for the build
     (`npx wrangler pages deployment list --project-name=website`).
   - Otherwise `npm run build` then
     `npx wrangler pages deploy out --project-name=website --branch=master`.
4. Verify live: https://doyel-labs.com/ hero ends "you talk to a person —
   not a chatbot, not a ticket queue."; the footer "Who answers" block
   reads "A real person. Not a chatbot, not a ticket queue."; /contact/
   H1 is "Talk to a person." and the button says "Send message";
   /how-we-work/ lead starts "You send a message. A person replies".
5. Tell Blake in two sentences what is live. Remind him to delete any
   GitHub personal access token named "site push" at
   https://github.com/settings/tokens if he has not already.
