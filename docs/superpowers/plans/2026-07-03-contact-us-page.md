# Contact Us Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/contact` page with a working message form that emails submissions to the team via Resend, running on a TanStack Start server function.

**Architecture:** A shared zod schema validates on both client and server. The route renders a `react-hook-form` form (left) beside reused contact details (right). Submitting calls a `createServerFn` POST handler that re-validates, checks a honeypot, and sends email through Resend. Delivery is isolated behind one `sendContactMessage()` function.

**Tech Stack:** TanStack Start (`@tanstack/react-start` server functions), React 19, `react-hook-form` + `@hookform/resolvers/zod`, `zod`, `resend`, Tailwind v4 brand utilities, Bun (build + `bun test`).

## Global Constraints

- Package manager is **Bun**. Install deps with `bun add`, run scripts with `bun run`.
- **Never use em dashes** in any copy, code, comment, or commit message. Use a colon, comma, or restructure.
- No test runner is configured project-wide; typecheck with `bunx tsc --noEmit` and lint with `bun run lint`. A single Bun-native test file (`bun test`) is used only for the pure schema logic.
- Prettier: printWidth 100, semicolons, double quotes, trailing commas.
- Do **not** re-add plugins to `vite.config.ts` (tanstackStart, viteReact, tailwindcss, nitro, etc. are already provided by `@lovable.dev/vite-tanstack-config`).
- **Cloudflare env caveat:** on the Cloudflare Worker, `process.env` is empty at module load. Read `process.env.RESEND_API_KEY` **inside** the `.handler()` per request, never at module top level.
- Do not rewrite published git history (no force-push, rebase, amend, or squash of pushed commits).
- Preview serves a stale in-memory SSR bundle: after every `bun run build`, kill and restart `bun run preview` before verifying.
- Use established brand utilities from `src/styles.css` (`container-x`, `section-y`, `btn-primary`, `hairline`, `eyebrow`, `glass`, `card-lift`, etc.) and reference colors as `bg-[color:var(--navy-deep)]`.

## File Structure

- Create `src/lib/contact-schema.ts` — shared zod schema, inferred type, role/industry options. Client and server both import this.
- Create `src/lib/contact-schema.test.ts` — Bun test for the schema (pure logic).
- Create `src/lib/contact.server.ts` — `createServerFn` POST handler + `sendContactMessage()` (Resend). Server-only.
- Create `src/routes/contact.tsx` — the `/contact` route: `PageHero`, form (react-hook-form), reused contact rows, submission states.
- Modify `src/routes/__root.tsx` — add `/contact` to `navAfterSolutions`; link the footer "Contact" heading.
- `.dev.vars` (gitignored) — local `RESEND_API_KEY` for dev/preview testing.

---

## Task 1: Prove Cloudflare/Nitro env plumbing (throwaway spike)

This is the first server function in the codebase and the highest technical risk: `process.env` behaves differently under `bun run dev` (Node) versus the built Cloudflare Worker. Prove a `.dev.vars` value reaches a server-function handler in the **built** target before building anything real on top. Nothing here is committed; it is deleted at the end.

**Files:**
- Create (temporary): `.dev.vars`
- Create (temporary): `src/routes/env-check.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing permanent. Confirms `process.env.RESEND_API_KEY` resolves inside `.handler()` in the Cloudflare build.

- [ ] **Step 1: Create `.dev.vars` with a placeholder key**

```
RESEND_API_KEY=spike-placeholder-not-a-real-key
```

- [ ] **Step 2: Create a temporary env-check route**

Create `src/routes/env-check.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

// THROWAWAY: proves the Cloudflare/Nitro env binding reaches a handler.
const checkEnv = createServerFn({ method: "GET" }).handler(async () => {
  // Read INSIDE the handler: process.env is empty at module load on Workers.
  return { present: Boolean(process.env.RESEND_API_KEY) };
});

export const Route = createFileRoute("/env-check")({
  loader: () => checkEnv(),
  component: () => {
    const { present } = Route.useLoaderData();
    return <div style={{ padding: 40 }}>RESEND_API_KEY present: {String(present)}</div>;
  },
});
```

- [ ] **Step 3: Typecheck**

Run: `bunx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Build and restart preview**

Run: `bun run build`
Then kill any running preview and start fresh: `bun run preview`
Expected: build completes; preview starts.

- [ ] **Step 5: Verify the key resolves in the built worker**

Visit `http://localhost:<preview-port>/env-check` (the port printed by preview).
Expected: page shows `RESEND_API_KEY present: true`.

If it shows `false`: the env binding does not flow through `process.env` in this build. STOP and resolve before continuing (options: read via Nitro's runtime config / `getEvent().context`, or confirm the Cloudflare preset name). Do not build the form on a broken env path.

- [ ] **Step 6: Delete the spike**

```bash
rm src/routes/env-check.tsx
```

Keep `.dev.vars` (it is gitignored and reused for real testing later). Do not commit anything from this task.

---

## Task 2: Shared contact schema

**Files:**
- Create: `src/lib/contact-schema.ts`
- Test: `src/lib/contact-schema.test.ts`

**Interfaces:**
- Produces:
  - `ROLE_OPTIONS: readonly string[]` — select options.
  - `contactSchema: z.ZodType` — validates a submission.
  - `type ContactInput = z.infer<typeof contactSchema>` — `{ name, email, company, phone, role, heardFrom, message, honeypot }`.

- [ ] **Step 1: Write the schema module**

Create `src/lib/contact-schema.ts`:

```ts
import { z } from "zod";

/** Role / industry options, aligned with the site's "Industries We Serve". */
export const ROLE_OPTIONS = [
  "IT OEM",
  "IT Solution Provider",
  "Insurance Carrier",
  "Insurance Broker",
  "Industrial OEM",
  "Industrial Distributor",
  "Technology Provider",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  role: z.enum(ROLE_OPTIONS, { message: "Please choose one" }),
  heardFrom: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(10, "A few words about what you need").max(4000),
  // Honeypot: real users leave this empty. Bots tend to fill every field.
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

- [ ] **Step 2: Write the failing test**

Create `src/lib/contact-schema.test.ts`:

```ts
import { expect, test } from "bun:test";
import { contactSchema } from "./contact-schema";

const valid = {
  name: "Jordan Reyes",
  email: "jordan@acme.com",
  role: "IT Solution Provider",
  message: "We would like to understand how the model applies to us.",
};

test("accepts a valid submission", () => {
  expect(contactSchema.safeParse(valid).success).toBe(true);
});

test("rejects a bad email", () => {
  expect(contactSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
});

test("rejects a too-short message", () => {
  expect(contactSchema.safeParse({ ...valid, message: "hi" }).success).toBe(false);
});

test("rejects an unknown role", () => {
  expect(contactSchema.safeParse({ ...valid, role: "Astronaut" }).success).toBe(false);
});

test("rejects a filled honeypot", () => {
  expect(contactSchema.safeParse({ ...valid, honeypot: "spam" }).success).toBe(false);
});
```

- [ ] **Step 3: Run the test**

Run: `bun test src/lib/contact-schema.test.ts`
Expected: 5 pass.

- [ ] **Step 4: Typecheck and lint**

Run: `bunx tsc --noEmit && bun run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/contact-schema.ts src/lib/contact-schema.test.ts
git commit -m "feat(contact): shared zod schema for the contact form"
```

---

## Task 3: Server function and Resend delivery

**Files:**
- Create: `src/lib/contact.server.ts`
- Modify: `package.json` (add `resend` via `bun add`)

**Interfaces:**
- Consumes: `contactSchema`, `ContactInput` from Task 2.
- Produces:
  - `submitContact` — a TanStack server fn: `submitContact({ data: ContactInput }) => Promise<{ ok: true }>`. Throws on validation failure or send error.

- [ ] **Step 1: Add the Resend dependency**

Run: `bun add resend`
Expected: `resend` appears in `package.json` dependencies. (Stable package; not blocked by the 24h supply-chain guard.)

- [ ] **Step 2: Write the server function**

Create `src/lib/contact.server.ts`:

```ts
import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";
import { contactSchema, type ContactInput } from "./contact-schema";

/** Where submissions land for now. */
const TO_ADDRESS = "bruce@vistaxm.com";
/** Verified sender on the vistaxm.com domain (Resend domain verification). */
const FROM_ADDRESS = "VistaXM Contact <noreply@vistaxm.com>";

/**
 * Delivery, isolated behind one function so the provider can be swapped
 * later (e.g. a third-party form service) without touching the route or
 * the handler's validation.
 */
async function sendContactMessage(data: ContactInput): Promise<void> {
  // Read the key INSIDE the request path: process.env is empty at module
  // load on the Cloudflare Worker.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  const resend = new Resend(apiKey);

  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "-"}`,
    `Phone: ${data.phone || "-"}`,
    `Role/industry: ${data.role}`,
    `Heard from: ${data.heardFrom || "-"}`,
    "",
    "Message:",
    data.message,
  ];

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: data.email,
    subject: `New contact form message from ${data.name}`,
    text: lines.join("\n"),
  });

  if (error) {
    throw new Error(`Resend failed: ${error.message}`);
  }
}

export const submitContact = createServerFn({ method: "POST" })
  // Re-validate on the server: never trust the client.
  .validator(contactSchema)
  .handler(async ({ data }) => {
    // Honeypot filled -> treat as success without sending (silent to bots).
    if (data.honeypot) {
      return { ok: true as const };
    }
    await sendContactMessage(data);
    return { ok: true as const };
  });
```

- [ ] **Step 3: Typecheck and lint**

Run: `bunx tsc --noEmit && bun run lint`
Expected: no errors. (Full delivery is verified end-to-end in Task 6, after the user completes Resend setup.)

- [ ] **Step 4: Commit**

```bash
git add src/lib/contact.server.ts package.json bun.lock
git commit -m "feat(contact): server function that emails submissions via Resend"
```

---

## Task 4: Contact route and form UI

**Files:**
- Create: `src/routes/contact.tsx`

**Interfaces:**
- Consumes: `submitContact` (Task 3), `contactSchema`, `ROLE_OPTIONS`, `ContactInput` (Task 2); `PageHero`, `Section`, `SectionHead`, `Reveal` from `@/components/site`; `FadeIn` from `@/components/motion`; `BOOK_PATH` from `@/lib/links`.
- Produces: the `/contact` route.

- [ ] **Step 1: Write the route with form, states, and contact rows**

Create `src/routes/contact.tsx`. The `ContactRow` and glyph helpers mirror the route-scoped pattern already in `src/routes/book.tsx` (kept local per the codebase convention rather than shared):

```tsx
import { type ReactNode, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BOOK_PATH } from "@/lib/links";
import { PageHero, Section, SectionHead, Reveal } from "@/components/site";
import { FadeIn } from "@/components/motion";
import { submitContact } from "@/lib/contact.server";
import { contactSchema, ROLE_OPTIONS, type ContactInput } from "@/lib/contact-schema";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | VistaXM" },
      {
        name: "description",
        content:
          "Send the VistaXM team a message. We reply within one business day, and never add you to a marketing list.",
      },
      { property: "og:title", content: "Contact Us | VistaXM" },
      {
        property: "og:description",
        content:
          "Tell us about your channel or book of business. A real person on our team will reply within one business day.",
      },
    ],
  }),
  component: ContactPage,
});

/* ---------------- Local elements (route-scoped) ---------------- */

function EmailGlyph({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

function PhoneGlyph({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5V20a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function PinGlyph({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CheckGlyph({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4 py-5">
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="eyebrow mb-1">{label}</div>
        {href ? (
          <a href={href} className="text-lg font-semibold text-[color:var(--navy-deep)] transition-colors hover:text-[color:var(--blue-link)]">
            {value}
          </a>
        ) : (
          <span className="text-lg font-semibold text-[color:var(--navy-deep)]">{value}</span>
        )}
      </div>
    </div>
  );
}

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-[color:var(--hairline)] bg-white px-4 py-3 text-[0.95rem] text-[color:var(--navy-deep)] outline-none transition-colors focus:border-[color:var(--blue-cta)] focus:ring-2 focus:ring-[color:var(--blue-cta)]/20";
const labelClass = "block text-sm font-semibold text-[color:var(--navy-deep)]";
const errorClass = "mt-1 text-xs font-medium text-[color:var(--orange-pop)]";

/* ---------------- Form ---------------- */

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { role: undefined },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus("submitting");
    try {
      await submitContact({ data });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl hairline bg-white p-8 shadow-[var(--shadow-elevation-2)] md:p-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-cta)]">
          <CheckGlyph className="h-5 w-5" />
        </span>
        <h3 className="mt-5 !text-xl !font-semibold text-[color:var(--navy-deep)]">Message sent.</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-[color:var(--ink-soft)]">
          Thanks for reaching out. A real person on our team will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl hairline bg-white p-7 shadow-[var(--shadow-elevation-2)] md:p-9"
    >
      {/* Honeypot: visually hidden, off the tab order. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>
          Do not fill this in
          <input type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Name</label>
          <input id="name" className={fieldClass} autoComplete="name" {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" type="email" className={fieldClass} autoComplete="email" {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="company">Company <span className="font-normal text-[color:var(--ink-soft)]">(optional)</span></label>
          <input id="company" className={fieldClass} autoComplete="organization" {...register("company")} />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone <span className="font-normal text-[color:var(--ink-soft)]">(optional)</span></label>
          <input id="phone" type="tel" className={fieldClass} autoComplete="tel" {...register("phone")} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="role">Role / industry</label>
          <select id="role" className={fieldClass} defaultValue="" {...register("role")}>
            <option value="" disabled>Select one</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.role && <p className={errorClass}>{errors.role.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="heardFrom">How did you hear about us? <span className="font-normal text-[color:var(--ink-soft)]">(optional)</span></label>
          <input id="heardFrom" className={fieldClass} {...register("heardFrom")} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">Message</label>
          <textarea id="message" rows={5} className={fieldClass} {...register("message")} />
          {errors.message && <p className={errorClass}>{errors.message.message}</p>}
        </div>
      </div>

      {status === "error" && (
        <p className="mt-5 rounded-xl bg-[color:var(--orange-pop)]/10 px-4 py-3 text-sm font-medium text-[color:var(--navy-deep)]">
          Something went wrong sending your message. Please email{" "}
          <a href="mailto:sales@vistaxm.com" className="font-semibold text-[color:var(--blue-link)]">sales@vistaxm.com</a>{" "}
          and we will pick it up.
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-70">
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

/* ---------------- Page ---------------- */

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Tell us where your revenue is hiding."
        subtitle="Send us a message about your channel or book of business. A real person on our team replies within one business day. No marketing list."
        primary={null}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-16">
          <FadeIn>
            <ContactForm />
          </FadeIn>

          <div>
            <SectionHead
              eyebrow="Reach us directly"
              title="Prefer email, phone, or a call?"
              intro="Use whatever is easiest. We are direct, and we respect your time."
            />
            <Reveal delay={80}>
              <div className="mt-8 rounded-2xl hairline bg-white p-7 shadow-[var(--shadow-elevation-2)] md:p-8">
                <div className="divide-y divide-[color:var(--hairline)]">
                  <ContactRow icon={<EmailGlyph className="h-5 w-5" />} label="Email" value="sales@vistaxm.com" href="mailto:sales@vistaxm.com" />
                  <ContactRow icon={<PhoneGlyph className="h-5 w-5" />} label="Phone" value="(801) 502-4841" href="tel:+18015024841" />
                  <ContactRow icon={<PinGlyph className="h-5 w-5" />} label="Location" value="Salt Lake City, Utah" />
                </div>
                <a href={BOOK_PATH} className="btn-secondary mt-6 inline-flex w-full items-center justify-center">
                  Prefer to book a call?
                </a>
                <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-[color:var(--blue-tint)] px-4 py-3 text-sm font-medium text-[color:var(--navy-deep)]">
                  <CheckGlyph className="h-4 w-4 flex-none text-[color:var(--blue-cta)]" />
                  One business day response. No marketing list.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
```

- [ ] **Step 2: Regenerate the route tree and typecheck**

Run: `bunx tsc --noEmit`
Expected: `routeTree.gen.ts` picks up `/contact` on the next dev/build; typecheck passes. If `submitContact`'s type is not found, ensure Task 3 is committed and the import path is `@/lib/contact.server`.

- [ ] **Step 3: Lint**

Run: `bun run lint`
Expected: no errors.

- [ ] **Step 4: Visually verify in dev**

Run: `bun run dev`, open `/contact`. Click into the page first (reveal-gated content needs focus). Confirm: hero renders, form fields show, submitting with empty fields shows inline validation errors (name, email, role, message).

- [ ] **Step 5: Commit**

```bash
git add src/routes/contact.tsx src/routeTree.gen.ts
git commit -m "feat(contact): /contact route with message form and contact details"
```

---

## Task 5: Navigation wiring

**Files:**
- Modify: `src/routes/__root.tsx` (the `navAfterSolutions` array near line 167, and the footer "Contact" column near line 487)

**Interfaces:**
- Consumes: the `/contact` route (Task 4).
- Produces: a top-nav "Contact" link (desktop + mobile) and a linked footer "Contact" heading.

- [ ] **Step 1: Add Contact to the top nav array**

In `src/routes/__root.tsx`, change `navAfterSolutions`:

```ts
const navAfterSolutions = [
  { to: "/how-to-start", label: "How to Start" },
  { to: "/proof", label: "Proof" },
  { to: "/for-oems", label: "For OEMs" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
```

- [ ] **Step 2: Link the footer "Contact" heading**

In the footer, the Contact column heading is currently a plain `div`:

```tsx
<div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4">Contact</div>
```

Replace it with a `Link` that keeps the same visual treatment:

```tsx
<Link to="/contact" className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4 inline-block transition-colors hover:!text-white">
  Contact
</Link>
```

(`Link` is already imported in `__root.tsx`. Leave the inline email / phone / location list items unchanged.)

- [ ] **Step 3: Typecheck and lint**

Run: `bunx tsc --noEmit && bun run lint`
Expected: no errors.

- [ ] **Step 4: Visually verify**

Run: `bun run dev`. Confirm "Contact" appears in the desktop nav and the mobile menu, the footer "Contact" heading is now a working link, and both route to `/contact`.

- [ ] **Step 5: Commit**

```bash
git add src/routes/__root.tsx
git commit -m "feat(contact): link the contact page from the nav and footer"
```

---

## Task 6: End-to-end delivery verification (gated on user prerequisites)

Code is complete after Task 5, but delivery cannot be confirmed until the user finishes Resend setup. Do **not** claim the feature is "working" until a real message is observed to arrive.

**User prerequisites (hand off explicitly):**
1. Create a Resend account; verify the **vistaxm.com** sending domain (add the DKIM/SPF DNS records Resend provides). Until verified, sends to bruce@vistaxm.com fail and `onboarding@resend.dev` only mails the account owner.
2. Provide a `RESEND_API_KEY`. Set it in two places: `.dev.vars` (local, already present as a placeholder from Task 1 -> replace with the real key) and a Cloudflare secret for production (`RESEND_API_KEY`).

**Files:** none (verification only).

- [ ] **Step 1: Put the real key in `.dev.vars`**

Replace the placeholder in `.dev.vars` with the real `RESEND_API_KEY` value.

- [ ] **Step 2: Build and restart preview**

Run: `bun run build`, then kill and restart `bun run preview`.
Expected: clean build.

- [ ] **Step 3: Submit a real message**

Open `/contact` in the preview build, fill every field with test data, and submit.
Expected: the form swaps to the "Message sent." success panel.

- [ ] **Step 4: Confirm arrival**

Check the bruce@vistaxm.com inbox.
Expected: an email titled "New contact form message from <name>", body containing all fields, reply-to set to the submitter's address. Reply to it and confirm the reply addresses the submitter.

- [ ] **Step 5: Set the production secret**

Add `RESEND_API_KEY` as a Cloudflare secret for the deployed Worker (Cloudflare dashboard or `wrangler secret put RESEND_API_KEY`). Only after this does the live site deliver.

- [ ] **Step 6: Report status honestly**

Only now state the feature is working end-to-end, citing the observed email. If domain verification is still pending, report it as "built and merged, delivery blocked on Resend domain verification" and offer the Web3Forms/Formspree fallback from the spec.

---

## Self-Review

- **Spec coverage:** Route/layout (Task 4), all form fields + shared zod schema (Tasks 2, 4), server fn + Resend + `sendContactMessage` + honeypot (Task 3), submission states (Task 4), nav + footer wiring (Task 5), both prerequisites + env spike + build sequence + honest completion (Tasks 1, 6). Fallback noted (Task 6, Step 6). All spec sections map to a task.
- **Placeholder scan:** No TBD/TODO; every code step shows complete code. `.dev.vars` placeholder value is intentional and replaced with a real key in Task 6.
- **Type consistency:** `contactSchema` / `ContactInput` / `ROLE_OPTIONS` defined in Task 2 are used verbatim in Tasks 3 and 4. `submitContact({ data })` signature defined in Task 3 matches its call in Task 4. Field names (`name`, `email`, `company`, `phone`, `role`, `heardFrom`, `message`, `honeypot`) are consistent across schema, server body, and form registers.
```
