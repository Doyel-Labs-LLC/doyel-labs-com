# Launching — how a change gets live

The site deploys from GitHub. **Pushing to the `master` branch of
`Doyel-Labs-LLC/doyel-labs-com` is the deploy.** Cloudflare Pages builds it
with `npm run build` and puts it live in a couple of minutes. Nothing is
uploaded by hand, so GitHub and the live site can never drift apart.

## One-time Cloudflare settings

In https://dash.cloudflare.com → Workers & Pages → **website** → Settings:

**Build** — Build command `npm run build`, output directory `out`,
Node version `22` (set `NODE_VERSION` = `22` under environment variables
if the build log shows an older Node).

**Environment variables (Production)** — see `.env.example` for the full
list. The important ones:

- `NEXT_PUBLIC_ANALYTICS_PROVIDER` = `cloudflare`
- `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` = your Web Analytics token
- `NEXT_PUBLIC_LOCATION_ANALYTICS_ENABLED` = `true`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` (secret),
  `RESEND_API_KEY` (secret), `RESEND_FROM`, `CONTACT_TO`
- `ANALYTICS_ENABLED` = `true`, `LOCATION_ANALYTICS_ENABLED` = `true`,
  `CF_ACCESS_TEAM_DOMAIN`, `CF_ACCESS_AUD`, `ANALYTICS_ALLOWED_EMAIL`,
  `CF_ACCOUNT_ID`, `CF_ANALYTICS_API_TOKEN`, `CF_WEB_ANALYTICS_SITE_TAG`

**Bindings** — `LOCATION_DB` (D1: website-location-analytics) and either a
Rate Limiting binding `RATE_LIMITER` (5 per 300 s) or the KV binding
`CONTACT_KV`.

## After every deploy (2 minutes)

- https://doyel-labs.com/ loads and looks right on your phone.
- https://doyel-labs.com/contact/ — send yourself a test message.
- https://doyel-labs.com/pricing/ jumps to the websites page.
- https://doyel-labs.com/admin/analytics/ asks you to sign in through
  Cloudflare Access, then shows the dashboard.

## Favicon in Google

Google only shows favicons that are a multiple of 48 px. The site now
ships 48/96/192/512 px PNGs. After deploying, open
https://search.google.com/search-console, pick the doyel-labs.com
property, paste `https://doyel-labs.com/` into the top search box, and
click **Request indexing**. Google usually updates the icon within a few
days of the next crawl.

## Adding photos

See `IMAGES.md`. Drop the file into `public\media\generated\` with the
exact name, push to GitHub, done.
