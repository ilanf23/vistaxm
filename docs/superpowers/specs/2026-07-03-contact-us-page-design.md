# Contact Us page: design spec

Date: 2026-07-03

## Goal

Add a `/contact` page with a **working message form**: a visitor fills in name,
email, company, phone, role/industry, "how did you hear about us", and a
message, submits, and the message is delivered by email to the team. This is the
capability the site lacks today: `/book` handles scheduling and shows contact
details, but there is no way to send a written message.

## Scope and relationship to existing pages

`/book` (scheduling calendar + contact rows) and the footer "Contact" column
already exist. `/contact` is a **complementary** page, not a replacement:

- `/book` stays the scheduling page (Microsoft Bookings calendar).
- `/contact` is the message page (form + the same contact details for people who
  would rather email or call).

## Route and page structure

- New file `src/routes/contact.tsx` -> URL `/contact`, following the pattern of
  `src/routes/book.tsx`: route-scoped helper components, a `head()` meta block,
  and a body built from `PageHero` + `Section` from `@/components/site`.
- Layout:
  - `PageHero` (eyebrow "Contact us", a headline, a subtitle).
  - A two-column `Section`:
    - **Left:** the message form.
    - **Right:** the contact rows reused from the `book.tsx` pattern (Email
      `sales@vistaxm.com`, Phone `(801) 502-4841`, Location "Salt Lake City,
      Utah"), plus a "prefer to book a call?" CTA linking to `/book`, and the
      reassurance line ("One business day response. No marketing list.").

## The form

Library: `react-hook-form` (already a dependency) with `zod` (already a
dependency) for validation.

Fields:

- **Name** (required)
- **Email** (required, email format)
- Company / organization (optional)
- Phone (optional)
- **Role / industry** select (required), options matching the site's
  "Industries We Serve": IT OEM, IT Solution Provider, Insurance Carrier,
  Insurance Broker, Industrial OEM, Industrial Distributor, Technology Provider,
  Other.
- How did you hear about us (optional)
- **Message** (required, min length)
- **Honeypot** hidden field for spam (no captcha: YAGNI). A filled honeypot is
  silently treated as success without sending.

The zod schema lives in one shared module `src/lib/contact-schema.ts` and is used
by **both** the client form and the server handler. The server never trusts the
client: it re-validates with the same schema.

## Delivery: TanStack server function + Resend

- `src/lib/contact.server.ts` exports a `createServerFn` POST handler that:
  1. Re-validates input with the shared zod schema.
  2. Checks the honeypot; if filled, returns success without sending.
  3. Sends the email via Resend to **bruce@vistaxm.com** (recipient "for now").
     - `from`: a verified `noreply@vistaxm.com` sender.
     - `reply-to`: the submitter's email, so a reply goes straight back to them.
     - Subject and body include all submitted fields, formatted readably.
- Delivery is wrapped in a single `sendContactMessage()` function so the provider
  can be swapped later without touching the route or the handler's validation.
- Add the `resend` npm dependency (stable package; does not trip the 24h
  supply-chain guard in `bunfig.toml`).

## Submission states

Explicit state machine in the form component: **idle -> submitting -> success ->
error**.

- `submitting`: disable the submit button, show a pending indicator.
- `success`: replace the form with a confirmation panel.
- `error`: show an inline error message with a `mailto:sales@vistaxm.com`
  fallback so the visitor is never stuck.

## Navigation wiring

- Add `{ to: "/contact", label: "Contact" }` to the `navAfterSolutions` array in
  `src/routes/__root.tsx` (renders in both desktop and mobile nav).
- Footer: make the existing "Contact" column heading link to `/contact` while
  keeping the inline email / phone / location details.

## User-side prerequisites (gate real delivery; not code)

These must be done by the user for the form to actually deliver. The feature can
be built and merged before they are done, but it will not deliver until then, and
completion must not be claimed until a test message is observed to arrive.

1. **Resend domain verification.** vistaxm.com DKIM/SPF DNS records added and
   verified in Resend. Until then, delivery to bruce@vistaxm.com will not work
   (the `onboarding@resend.dev` sandbox only mails the Resend account owner's own
   address).
2. **API key in two places.** `RESEND_API_KEY` as a Cloudflare secret (prod) and
   in a local `.dev.vars` / `.env` (dev testing). Without the local copy the form
   cannot be tested at all.

## Build sequence (de-risk the unknown first)

This is the **first server function** in the codebase, and `bun run dev` (Node)
is not the Cloudflare/Nitro runtime. `process.env.RESEND_API_KEY` may resolve
under dev yet be `undefined` in the built Worker; a top-level module read is
undefined even where a per-handler read works.

1. **Spike env access first.** Write a throwaway server fn that only reports
   whether the key is visible. Verify it against `bun run build` + a restarted
   preview (preview serves a stale in-memory bundle, so kill and restart after
   the build). Only proceed once the key resolves in that build target.
2. Build the shared zod schema.
3. Build the server function + `sendContactMessage()` (Resend).
4. Build the form UI and wire it to the server function.
5. Wire navigation (top nav + footer).
6. Verify end-to-end: submit the form, observe the email arrive at
   bruce@vistaxm.com. Do not claim "working" before this is observed.

## Fallback (noted, not a re-decision)

If Resend domain verification stalls, a third-party form service (e.g.
Web3Forms / Formspree) sidesteps both the DNS and env problems: the form POSTs to
their endpoint and they email the submission. This is a one-line fallback if the
email path is blocked, not a change to the chosen approach.

## Out of scope

- No captcha (honeypot is sufficient).
- No lead storage / database (email only, for now).
- No changes to `/book` beyond it remaining the scheduling page.
