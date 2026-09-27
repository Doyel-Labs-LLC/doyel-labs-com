# CONTENT — copy source of truth (v9)

Every fact on the site comes from one of these files. Edit the source,
then the page. If a fact is not in a source file, it does not go on a page.

| Fact | Source |
|---|---|
| Prices, inclusions, turnaround, deposit, add-ons, refusals, website FAQ | `src/lib/offer.ts` |
| Company name, city, phone, hours, emails, promise, disclaimers | `src/lib/site.ts` |
| SteadFast quote, scope, disclosure | `src/lib/testimonials.ts` |
| SteadFast site facts | `src/lib/demo/websites.ts` |
| Product frames (synthetic data) | `src/lib/demo/*.ts` |
| BAI / ConnectionLoop status | `src/lib/site.ts` → `programStatus`, `src/lib/products.ts` |
| Legal | `content/legal/*.md` |
| Contact form fields, limits, project types | `src/lib/contact-form.ts` |

## Pages

`/` · `/websites/` · `/software/` · `/work/` · `/how-we-work/` · `/about/`
· `/contact/` · `/security/` · `/legal/*`. Everything else is a 301 in
`public/_redirects` (the retired folders under `src/app/` hold stub pages
and can be deleted).

## Voice

Short sentences. Concrete nouns. Warm. Readable by a non-engineer. The
promise — "Real people build it. A real person answers." — appears once
per page, plus the footer. Say "a person", never a named individual or "our team". See PROMPT.md
§6 for the banned-word list; CI greps for it.
