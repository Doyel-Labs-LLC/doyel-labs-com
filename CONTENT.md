# CONTENT — copy source of truth

Everything on this site is written from one of the following sources.
When the copy needs to change, edit the source-of-truth file **and** the
page. Do not add a claim to a page whose source file does not support it.

## Company facts

- `src/lib/site.ts` — `company`, `city`, `supportEmail`, `securityEmail`,
  `companyLegal`, `baiDisclaimer`, `payrollDisclaimer`, `programStatus`.

## Page → source-of-truth map

| Page                                       | Source of truth                                                                     |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| `/`                                         | `src/lib/site.ts`; four concise sections, with project evidence in the hero          |
| `/services/`                                | This file. No product-specific claims.                                             |
| `/services/payroll/`                        | `C:\Users\bdoye\Desktop\index\steadfast-payroll-app.html`, `index/netlify/functions/payroll.js` |
| `/services/websites/`                       | `C:\Users\bdoye\Desktop\index\` marketing HTML pages; `src/lib/demo/websites.ts`   |
| `/products/`                               | `src/lib/products.ts`, with release context from `src/lib/site.ts`                   |
| `/engineering/`                             | All product security docs                                                           |
| `/security/`                                | The three product security docs plus `index/netlify/functions/payroll.js`           |
| `/docs/`                                    | Product help docs; short-form only                                                  |
| `/changelog/`                               | `src/lib/changelog.ts`, also used by the public RSS feed                              |
| `/status/`                                  | Live health of `NEXT_PUBLIC_API_BASE` from the viewer's browser                     |
| `/legal/*/`                                 | `content/legal/*.md` — attorney-review pending                                       |

## Voice

- Short sentences. Concrete nouns.
- One short hero sentence; no repeated pitch across sections. Put walkthroughs
  in optional disclosures and keep important limitations visible.
- Company-led identity, not a founder profile. No personal engineer title,
  signature card, founder navigation, or Person schema.
- Product counts are inventory, not a headline or limit on the company.
- No: "revolutionize", "next-gen", "AI-powered", "world-class", "unlock",
  "transform", "seamless", "cutting-edge".
- No performance promises. No tax-savings promises. No labor outcome
  promises. No trading-return promises.
- If a fact is not in a source file, omit it.
- Lead company copy with business outcomes. Keep BAI-specific technical
  language on the product and security surfaces.

## Pricing, attribution, and routes

- Use "Quoted per project". Do not publish service price ranges, retainer
  amounts, or quote examples in marketing copy, JSON-LD, metadata, or RSS.
  Labeled synthetic payroll/trading amounts are not service prices.
- SteadFast and Doyel Labs share an owner. Disclose this without naming a person when
  using the SteadFast endorsement; do not present it as independent proof.
- Keep availability in `src/lib/products.ts` consistent across every page.
  Do not add release dates or relative promises such as "this month".
- About uses `/company/` and describes the company, not its founder.
  Pricing and process live on Services; industry examples are contextual links.
  See `public/_redirects` for the retired URLs.

## Refusals

The site never claims Doyel Labs LLC is:

- A broker-dealer or investment adviser.
- A bank or a money transmitter.
- A payroll processor, professional employer organization, or reporting
  agent for any tax authority.
- A fiduciary.
- A public social network.

The site never invents:

- Tax filing, tax withholding, direct deposit, ACH, or wage transfer
  features for the payroll product.
- Trading results, back-test outcomes, or Sharpe ratios for BAI.
- Social, dating, or professional-networking features for
  ConnectionLoop.
- Team photos, headcount, investor logos, or awards for the company.

## Adding a new product frame

1. Add synthetic demo data to `src/lib/demo/<product>.ts`. Never live
   values. Names read `OPERATOR NN` or `J. REED`. SSN is `•••-••-••••`.
   Amounts are round demo numbers.
2. Build the frame component under
   `src/components/frames/<product>-<screen>.tsx`, using
   `ProductFrame`.
3. Import and render the frame on the relevant page.

## Adding a real (redacted) screenshot later

The site does not require any real screenshots to launch. If you later
want to add one:

1. Capture the screen.
2. Redact per the checklist in `README.md`.
3. Save the derivative as `.webp` under
   `public/media/<product>/<screen-name>.webp`.
4. Replace the demo frame with `next/image` on the page, keeping the
   corner label.
