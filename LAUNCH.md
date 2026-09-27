# Launching v9 — step by step

Everything below happens on your computer, in the folder
`C:\Users\bdoye\Desktop\Doyel-labs.com`.

## 1. Open a terminal in the site folder

1. Open File Explorer and go to `C:\Users\bdoye\Desktop\Doyel-labs.com`.
2. Click once in the address bar at the top (where the folder path is shown).
3. Type `powershell` and press Enter. A blue window opens, already inside the folder.

## 2. Install and check (about 2 minutes)

Type each line and press Enter. Wait for each to finish before the next.

```
npm install
npm run check
```

`npm run check` runs the type check, the lint, the tests, and the build.
The last line you should see is:

```
csp-hashes: wrote 42 CSP rules (50 rules total, longest line 606 chars)
```

If anything says `error`, stop and send me the text.

## 3. Set two things in Cloudflare (one time, 5 minutes)

The contact form now refuses to run in production unless bot protection
and rate limiting are configured. Do this before deploying.

1. Go to https://dash.cloudflare.com and sign in.
2. Left menu → **Workers & Pages** → click the project named **website**.
3. Click **Settings** (top tabs).
4. Under **Variables and Secrets**, check these exist for **Production**:
   - `TURNSTILE_SECRET_KEY` (type Secret)
   - `RESEND_API_KEY` (type Secret)
   - `RESEND_FROM` and `CONTACT_TO` (plain text)
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (plain text)
   If one is missing, click **Add**, type the name exactly, paste the value, save.
5. Scroll to **Bindings**. You need ONE of these:
   - **Rate Limiting** binding named `RATE_LIMITER`, with limit `5` requests per `300` seconds
     (click Add → Rate limiting → name `RATE_LIMITER` → 5 / 300 → Save), **or**
   - the existing **KV namespace** binding named `CONTACT_KV`.

## 4. Deploy

Back in the blue PowerShell window:

```
npx wrangler pages deploy out --project-name=website --branch=master
```

If it asks you to log in, a browser tab opens; click **Allow**, then come
back to the window. When it finishes it prints a URL. The live site at
https://doyel-labs.com updates within a minute.

## 5. Check the live site (2 minutes)

Open these in your browser and make sure each loads:

- https://doyel-labs.com/
- https://doyel-labs.com/websites/
- https://doyel-labs.com/contact/ — send yourself a test message. It
  should arrive at support@doyel-labs.com within a minute.
- https://doyel-labs.com/pricing/ — should jump to the websites page
  (old address, now redirected).

## 6. Optional cleanup (any time)

These folders under `src\app` are retired. They contain tiny placeholder
files so nothing breaks; you can delete the whole folders in File Explorer
(right-click → Delete):

`changelog`, `company`, `docs`, `engineering`, `faq`, `founder`,
`industries`, `press`, `pricing`, `products`, `services`, `sitemap`,
`status`, `support`, `uses`, `writing`

## 7. Optional: GitHub Actions

If you push this folder to GitHub, put the file `ci.yml` (sent in the chat)
at `.github\workflows\ci.yml`. It runs the same `npm run check` on every
push and blocks a merge if the security headers or copy rules regress.
