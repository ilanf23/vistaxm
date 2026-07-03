# Proof page "Real results" motion pass

Date: 2026-07-03
Target: the "Real results" section of `src/routes/proof.tsx` (three `ResultCard`s plus the 33% market-reality band). CRN's similar section is out of scope for this pass.

## Why

The section presents the strongest numbers on the site (Softchoice, Veeam, an anonymized
industrial supplier), but every number is static. The only motion is the entrance stagger
and a hover lift. The homepage already establishes a count-up idiom (`CountStat`), so
static numbers here read as flat by comparison. The goal: the data dramatizes itself,
while staying calm enough for a proof page a revenue executive reads.

## What we are building

Motion level: "data-drawn cards". Count-ups on every metric plus one custom SVG
micro-visualization per card, each shaped to match that card's headline.

### 1. Metric count-ups

- Metrics move from display strings to numeric fields:
  `{ value: number; prefix?: string; suffix?: string; decimals?: number; label: string }`.
  Examples: `$8.4M` = `{ prefix: "$", value: 8.4, decimals: 1, suffix: "M" }`;
  `$11M+` = `{ prefix: "$", value: 11, suffix: "M+" }`; `+8` = `{ prefix: "+", value: 8 }`.
- Each value counts up over 1.6s with the existing `useCountUp` hook when the card
  scrolls into view, matching the homepage idiom. `tabular-nums` (already on the
  metric styles) prevents layout jitter.
- Special case, Veeam's `30 -> 73`: the left "30" and the arrow are static; the
  right-hand number sweeps 30 to 73. The movement is the animation.

### 2. Per-card micro-visualization

A fixed-height (about 52px, full card width) SVG at the bottom of each card so cards do
not shift layout. Each draws itself starting about 0.3s after the count-ups begin.

| Card | Viz kind | Shape | Animation |
|---|---|---|---|
| Softchoice | `compound` | Gently convex rising curve over a faint dashed baseline, soft area fill under it | Curve draws left to right (`draw-line`), area fill fades in |
| Veeam | `step` | Flat-low, sharp rise, flat-high step line | Line draws (`draw-line`); a small dot lands at the top end and keeps a subtle `live-pulse` |
| Industrial supplier | `pool` | Horizontal pool bar: full light track = the $26.8M pool; fill = the $11M+ protected portion (about 41%) | Fill sweeps in with `bar-grow`; tiny end labels ("$26.8M pool", "$11M+ protected") fade in |

Palette: `--blue-cta` strokes on the light card surface; `--orange-pop` only as the
single accent (Veeam's end dot, the pool-bar fill tip). No dark-hero styling here.

### 3. The 33% band

Replace the plain "33%" display with a radial ring + number:

- An SVG circle sweeps from 0 to one-third using the `draw-line` stroke-dashoffset
  trick (`pathLength` 100, dashoffset animates to 67).
- The number counts 0 to 33 (`useCountUp`) centered inside the ring, suffix "%".
- The paragraph beside it is unchanged; layout of the band (flex row on md+) stays.

### 4. Choreography and restraint

- Existing entrance `Stagger`, hover `card-lift`, and the hover top-bar all stay.
- Per card: count-ups start on reveal; the viz starts drawing about 0.3s later.
- Everything is one-shot. The only persistent motion is Veeam's small end-dot pulse.
- `prefers-reduced-motion`: render final state instantly (numbers at value, lines
  fully drawn, ring at one-third). `useCountUp` already snaps to target; the SVG
  pieces gate their `animation` styles behind the same `matchMedia` check the hero
  uses (no animation applied, final geometry rendered).

### 5. Technical shape

- All local to `src/routes/proof.tsx`; no changes to `site.tsx`, no new CSS keyframes
  (reuse `draw-line`, `bar-grow`, `live-pulse` from `styles.css`).
- Local additions:
  - `MetricValue`: renders one counting metric (wraps `useCountUp`; takes
    `{ value, prefix, suffix, decimals, from }`, where `from` covers the Veeam
    30-to-73 sweep).
  - `ResultViz`: renders one of the three viz kinds by `kind` prop; owns the SVG
    shapes and their animation delays; takes `shown`.
  - `RingStat`: the 33% ring + counting number for the band.
- `ResultCard` gains `viz: "compound" | "step" | "pool"` and numeric `metrics`;
  it already has a `useReveal`-equivalent via `Reveal`, but count-ups need the
  `shown` boolean, so the card body switches to `useReveal` directly (keeping the
  same entrance styling) or nests a `useReveal` observer inside; either way the
  observed element is the card so numbers and viz trigger together.

## Verification

- `tsc --noEmit`, ESLint, Prettier clean.
- Visual check on `http://localhost:<port>/proof`: entrance, count-ups, all three
  viz drawing, ring sweep, no layout shift (card heights stable before/after
  animation), no console errors. Check reduced-motion state renders final values.

## Out of scope

- CRN's proof section (follow-up pass if the treatment lands).
- Any copy or metric-value changes; numbers stay exactly as published.
- The certified-NPS hero and sample-deliverable sections of /proof.
