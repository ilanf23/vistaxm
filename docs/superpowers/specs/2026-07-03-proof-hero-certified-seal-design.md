# Proof hero redesign: certified credential seal

Date: 2026-07-03

## Problem

The `/proof` page hero uses the text-only variant of `PageHero`: the headline,
subtitle, and CTA sit in a narrow left column (`max-w-[600px]`) against an empty
right half. That empty half reads as deadspace, and the page's strongest asset
(the certified NPS story) is pushed entirely below the fold.

## Goal

Fill the hero's right half with a visual that leads with the page's
differentiator, the *certification* itself, without spoiling the ePlus "74"
reveal in the featured section directly below.

## Approach

Switch the proof hero to the two-column `PageHero` by passing a `visual`. No
changes to shared `site.tsx`; the visual is a proof-page-local component, next to
the existing `ResultCard` and `SampleDeliverable` in `proof.tsx`.

### New component: `CertifiedSeal`

A glass card (`glass` utility) on the navy hero, matching the crn/homepage hero
visual treatment. Three stacked zones:

1. **Seal header** — a rosette/shield "verified" mark plus a `CERTIFIED NPS`
   label, and an orange-accented `Independently verified` pill reusing the hero's
   existing badge styling (`border-[rgba(246,130,65,0.35)]`, `#ffd2b5` text).
2. **Benchmark strip** — two horizontal bars that animate in on reveal:
   - a tall accent bar for the **top-quartile certified band (70+)**
   - a short muted bar for the **industry average (40-55)**
   The gap between them is the visual argument. Uses `useReveal` to trigger the
   grow animation and `useCountUp` for the numbers; both already respect
   `prefers-reduced-motion`.
3. **Footer hairline row** — `Third-party audited . Benchmarked against the
   channel`.

### Editorial decision

The benchmark bar shows a **generic top-quartile band (70+)**, not ePlus's
specific 74. This keeps the hero as the standard-setter and lets the ePlus
section below pay it off with the real, attributed number, avoiding a
near-duplicate story and any misattribution of ePlus's score as the reader's own.

### Copy

Keep the existing headline. Tighten the subtitle to drop "Real results below"
(the visual now does that work): "Third-party verified and benchmarked against
the channel, evidence you can put in a proposal."

## Out of scope

- No changes to the featured ePlus section, the NPS gauge, result cards, or
  sample deliverables.
- No changes to shared `PageHero` in `site.tsx`.
- The pre-existing broken `WaveMiniChart` import in `how-to-start.tsx`.

## Success criteria

- The proof hero renders as two columns with the seal filling the right half.
- Bars and numbers animate on load and settle to the top-quartile vs industry
  comparison; static under reduced-motion.
- `bun run lint` and `tsc --noEmit` pass.
- No visual regression on mobile (seal stacks under the copy, as `PageHero`
  already handles).
