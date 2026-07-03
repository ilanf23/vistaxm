# How to Start: Journey Spine Redesign

Date: 2026-07-03
Status: Approved (Journey spine direction)
Related: [Homepage Craft + Humanization](./2026-07-01-homepage-craft-humanization-design.md),
[Solutions Design Audit](../../../.design/solutions-audit/DESIGN_REVIEW.md) (finding 8: reveal timing)

## Problem

`/how-to-start` is the weakest page on the site. Observed against the production preview build:

- The hero is a near-empty navy band; the entire right half is void.
- Whole viewports render blank during normal scrolling because reveal animations fire too late
  (known audit finding 8). This reads as broken, not just plain.
- The body is three thin screens of generic patterns: two side-by-side pricing-style cards with
  circle-check lists, a second white card with more check bullets, and one grayscale stock photo.
  No bespoke graphics, no data-viz, uniform 256px section voids.

## Constraints (hard)

- **Every word on the page stays exactly the same.** Formatting, order, and visual treatment can
  change; the words cannot. This includes meta/OG copy.
- Gentle, professional motion only: no scroll hijacking, no pinning, no bounce. Entrances are
  short (0.5 to 0.8s) and small-distance.
- Reuse the design system (`container-x`, `section-y`, `btn-*`, brand vars, `hairline`, `grain`)
  and the motion primitives in `src/components/motion.tsx`.
- `prefers-reduced-motion` respected: global `MotionConfig reducedMotion="user"` already covers
  transforms; the SVG spine must additionally render fully drawn when reduced motion is on.
- Ambient photo in "Why managed" stays, per the ambient photography spec.
- No em dashes anywhere. `routeTree.gen.ts` is never edited.

## Design

One continuous narrative down the page, anchored by a **signal spine**: a thin vertical SVG line
(orange-to-blue brand gradient) in the left gutter that draws itself as the user scrolls
(scroll-scrubbed via `useScroll` + `pathLength`), with a node marking each section. Desktop only;
on mobile the spine is hidden and sections use standard reveals.

### Section order and treatment

1. **Hero** (dark navy, current copy and CTA). Right half gets `WaveMiniChart`: an abstract SVG
   wave-over-wave chart (three ascending bar/dot clusters plus a drawn trend line) that animates
   on load. Axis-less and numberless so it cannot be read as a data claim. The spine starts at
   the hero's base.
2. **Two ways in**: same `SectionHead`, then a staged sequence instead of twin cards.
   - **Essentials** first, full width: copy left; the five "What you get" items on the right as
     a numbered timeline list with its own short connector line that visually echoes the spine
     (each row drawing in on scroll). "Start with Essentials" CTA stays.
   - Short transition beat where the spine passes the "Scale when it works" pill.
   - **The Fully Managed Program**, full width on dark navy: copy left; the three tiers
     (Standard, Advanced, Strategic) as `TierSteps`, an ascending step graphic, each step larger
     than the last, containing the exact tier copy. The spine climbs the steps. "Scope the
     program" CTA stays.
3. **The deliverable**: the five items render inside `BriefDoc`, a mock paper brief (page edge,
   header rule, ranked rows 01 to 05) so the section shows the thing that lands on your desk.
   The italic sample-on-request note becomes the document footer. Entrance: the brief settles
   into place with a few degrees of tilt, once.
4. **Why managed**: layout unchanged (copy + ambient photo); photo gets subtle `Parallax`. The
   spine terminates into the CTA band.
5. **CTABand** unchanged.

### Motion system

- Two motion kinds only: one-shot entrances (existing `FadeIn` / `Stagger`) and scroll-scrubbed
  drawing (spine, node list, tier steps). Scrubbed motion is tied directly to scroll position so
  it feels responsive, never cinematic.
- **Reveal-timing fix (global, root cause of blank viewports):** widen the reveal trigger so
  entrances begin roughly 15% before an element enters the viewport, in both
  `src/components/motion.tsx` (`VIEWPORT` margin) and `src/hooks/use-reveal.ts`. Small change,
  benefits every page; closes audit finding 8.

## Components

New, in `src/components/journey.tsx` (or local to the route if single-use):

- `SignalSpine`: scroll-scrubbed gutter line + section nodes. Hidden below `lg`.
- `WaveMiniChart`: hero SVG, load-animated, abstract.
- `TierSteps`: ascending three-step tier graphic wrapping existing tier copy.
- `BriefDoc`: paper-brief deliverables panel.

## Verification

- `bun run build` + `bun run preview`; scroll the full page in Chrome at desktop and ~390px
  widths. Confirm: no blank viewports mid-scroll, spine draws smoothly, mobile shows no spine
  and no horizontal overflow.
- With reduced motion emulated: everything visible statically, spine fully drawn.
- `bun run lint` and `tsc --noEmit` pass.
- Word-for-word diff of rendered page text against the current page: identical.
