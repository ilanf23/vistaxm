## Goal

Rebuild VistaXM as a conversion-first, category-creation site. Primary CTA everywhere: "Book a 30-minute call." Secondary: "Start a 3-week Diagnostic."

## Scope & Approach

### Phase 1 — Tokens, motion, shell (foundation)

- Add `framer-motion` (`bun add framer-motion`).
- Extend `src/styles.css` tokens to match the exact palette (navy #022550 / #062d57 / #0056a7, CTA #3185fc, link #1863dc, light blues #67a6ff / #cfe3ff, tint #f1f7ff, accent #f68241, text #212121 / #363636). Swap display font to Inter only. Refine H1/H2/H3 clamps and body sizing.
- Reusable motion primitives in `src/components/motion.tsx`: `Reveal`, `Stagger`, `CountUp`, `HoverLift`, `Parallax` — all respect `prefers-reduced-motion`.
- Rebuild `Header` in `__root.tsx`: real routes (The Model, Solutions dropdown → PartnerPulse + BrokerPulse, Proof, Insights), one bold "Book a 30-minute call" button. Sticky, condense on scroll.
- `BookCallModal` component: opens on every primary CTA, embeds Calendly inline (`https://calendly.com/d/placeholder` — user can swap URL). Fallback 4-field form (name, work email, company, role) posting to a server fn that stores to console/log for now (no Cloud unless asked).
- `Footer` upgrade with final CTA band repeat.

### Phase 2 — Homepage (full polish)

Rebuild `src/routes/index.tsx` with sections in this order:

1. **Hero** — headline, subhead, primary + secondary CTA, animated glassmorphic RCI dashboard: count-up KPI tiles, certified-NPS gauge, 5×4 journey-by-persona matrix lighting in sequence with one red "renewal risk" cell, score↔decision morphing tile, drawing sparkline, parallax tilt on mouse, ambient pulse, drifting gradient mesh. 5-second test passes.
2. **Trust bar** — partner/client wordmarks + one quantified stat.
3. **The problem (old way)** — vanity NPS + partner shadow, cost framing.
4. **The new way: RCI** — category definition, 5×4 model, DM→Influencer gap, score-vs-decision contrast.
5. **How it works** — 3–4 managed, neutral, ~90-day steps.
6. **Proof & results** — Softchoice, Veeam, 33% market stat, industrial supplier $26.8M / $11M+, certified-NPS as "J.D. Power of the channel." Proof element beside CTA.
7. **For your role** — tabbed multi-persona (Revenue/CRO, Channel/Distribution, Technical, Ops/Procurement) with matching proof per tab.
8. **On-ramp (offer ladder)** — Diagnostic (hero, risk-reversal), Essentials, Managed.
9. **Objections / FAQ** — accordion.
10. **Insights / POV** — manifesto + State of RCI report, ungated.
11. **Leadership** — Erik Vogel + Bruce Coughlin cards with quotes + LinkedIn.
12. **Final CTA band** — "Book a 30-minute call" + risk-reducing microcopy + Diagnostic secondary.

### Phase 3 — Other pages (same system)

Create routes (each with unique `head()` meta and CTA band):

- `/the-model` — full category education + manifesto
- `/partnerpulse` — OEM & IT channel
- `/brokerpulse` — insurance carriers
- `/proof` — results detail
- `/offers` — Diagnostic / Essentials / Managed
- `/insights` — POV + report
- `/about` — leadership detail
- `/book` — embedded calendar page
- Update routeTree.gen.ts automatically via dev plugin.

### Hard rules baked in

- No "infrastructure" anywhere in copy.
- No competitor names.
- NPS only as "old way" reframe + certified-NPS proof.
- Only real proof points (Softchoice, Veeam, 33%, industrial supplier). No Zynaptic/Meridian.
- One primary CTA repeated at hero, mid, footer; Diagnostic clearly subordinate.
- Proof element adjacent to every CTA.

### Quality bars

- WCAG AA contrast checked on all token combos.
- Keyboard nav + visible focus rings on every interactive element.
- `prefers-reduced-motion` short-circuits all motion.
- Lazy-load below-fold sections, no heavy images, SVG-only viz.

## Technical notes

- New deps: `framer-motion` only. Calendar embed uses an `<iframe>` to a placeholder Calendly URL — clearly flagged so you can drop in the real link.
- Keep existing `src/components/site.tsx` building blocks; refactor into smaller files only where it improves clarity (`hero.tsx`, `dashboard.tsx`, `personas.tsx`, `offers.tsx`, `leadership.tsx`, `faq.tsx`, `book-call.tsx`).
- No backend / Cloud needed unless you want booking persistence later.

## Questions before I build

1. **Calendar URL** — do you have a Calendly/Chili Piper link to embed, or should I stub a placeholder?
2. **Logos for trust bar** — are Softchoice / Veeam / the industrial supplier OK to show as wordmarks, or do you want neutral "Trusted by leaders in IT channel and insurance" with no marks?
3. **Leadership photos** — generate stylized placeholder avatars, or leave initials-in-circle until you supply headshots?
4. **Report/manifesto links** — do these exist yet, or should "Read the report" anchor to a coming-soon section?
