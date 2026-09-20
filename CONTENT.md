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
| `/`                                         | `src/lib/site.ts`, plus one paragraph each per band                                 |
| `/services/`                                | This file. No product-specific claims.                                             |
| `/services/payroll/`                        | `C:\Users\bdoye\Desktop\index\steadfast-payroll-app.html`, `index/netlify/functions/payroll.js` |
| `/services/websites/`                       | `C:\Users\bdoye\Desktop\index\` marketing HTML pages; `src/lib/demo/websites.ts`   |
| `/programs/`                                | `src/lib/site.ts` `programStatus`                                                   |
| `/programs/bai/`                            | `BAI-Desk/website/src/app/page.tsx`, `BAI-Desk/website/src/app/security/page.tsx`   |
| `/programs/connectionloop/`                 | `ConnectionLoop/docs/PRODUCT_BRIEF_V5.md`, `ConnectionLoop/docs/SECURITY.md`        |
| `/engineering/`                             | All product security docs                                                           |
| `/security/`                                | The three product security docs plus `index/netlify/functions/payroll.js`           |
| `/docs/`                                    | Product help docs; short-form only                                                  |
| `/changelog/`                               | Manually entered per product; commits are the record                                 |
| `/status/`                                  | Live health of `NEXT_PUBLIC_API_BASE` from the viewer's browser                     |
| `/legal/*/`                                 | `content/legal/*.md` — attorney-review pending                                       |

## Voice

- Short sentences. Concrete nouns.
- No: "revolutionize", "next-gen", "AI-powered", "world-class", "unlock",
  "transform", "seamless", "cutting-edge".
- No performance promises. No tax-savings promises. No labor outcome
  promises. No trading-return promises.
- If a fact is not in a source file, omit it.
- Match the existing BAI cadence. Example of allowed voice:
  "When the desk does not know, it does nothing."

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
