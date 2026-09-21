---
kind: payroll-data
version: 2026-09-20
title: Payroll data processing
under_review: true
---

# Payroll data processing

This document names what the operator (you) and Doyel Labs LLC (we) each hold when you use
our payroll software. The intent is that a Department of Labor inspector, a state auditor, or
your bookkeeper can read this and know exactly what to ask for.

## Roles

**Operator.** The federal service contractor or small operator who uses the payroll workspace.
The operator is the payer of record for its independent contractors, the recordkeeping party
for the SCA's three-year retention rule, and the party responsible for tax filings.

**Doyel Labs LLC.** The software vendor. We provide the workspace, its storage, its email
sender via Resend (from the operator's own domain), and its security controls. We are not the
payroll processor. We are not the reporting agent for any tax authority. We do not touch funds.

## What Doyel Labs holds for you

- Contractor register (name, title, state, WD, contract, day rate, min wage, H&W fringe,
  vacation handling).
- SSN, encrypted at rest. Last-4 is shown in UI where operators need to disambiguate rows.
- Pay-run drafts and generated stubs (PDF).
- The audit log: paystub generated, paystub emailed, WD lookup, SCA-block, contractor rate
  update, sign-in, password change, passkey enrolment.
- Password hash (PBKDF2-SHA256), passkey metadata, session tokens.

## What Doyel Labs does not hold

- Bank routing numbers.
- Bank account numbers.
- Any wage as a movable balance.
- Any tax return.
- Any card number (Stripe holds card numbers if a workspace is billed).
- Any SSN in plaintext logs, emails, or exports.

## Storage

Per-operator storage on Netlify Blobs, scoped to the operator's namespace. Server region is US.
Audit log retention is 180 days by default; the operator is expected to export the CSV against
the SCA's three-year rule.

## Subprocessors

- Netlify (blob storage, HTTP delivery of the operator workspace).
- Resend (transactional email — stubs to contractors, security notices).
- Stripe (if the workspace is billed).
- SAM.gov / api.sam.gov (public wage-determination data; Doyel Labs sends the operator's
  city + state for lookup, receives the WD identifier back).
- Cloudflare (public marketing site delivery).

## Retention

- Contractor records: kept for the life of the workspace unless the operator deletes them.
- Draft paystubs: kept 60 days after generation, then archived on request.
- Generated PDFs: kept until the operator downloads the batch backup and confirms.
- Audit log: 180 days by default; export CSV to keep longer.
- Backup export: on demand.

## Rights

The operator may export the workspace at any time (Backup tab → Download raw backup .json) and
ask us to delete the workspace and its blobs. Deletion completes within thirty days, minus any
billing records we must keep.

## Not covered here

Tax filings, direct deposit, wage transfer, professional employer relationships, and payroll
processing. Doyel Labs LLC does none of these. If you need any of them, they are the operator's
responsibility to run against their bank or their tax filer of choice.
