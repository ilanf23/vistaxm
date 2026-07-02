# Hero graphic redesign: one account's story

Date: 2026-07-02
Component: `RevenueDecisionNetwork` in `src/components/site.tsx` (hero right-column visual on `/` and `/crn`).

## Why

The current graphic is a radar/orbit: a central hub ringed by six metric cards plus a
problem box and an action card. Three problems for our ICP (revenue executives at IT
solution providers, MSPs, OEMs, distributors, carriers, not data people):

1. **Too techy.** The sci-fi radar reads as a system diagram, not a business story.
2. **Hard to read.** Eight competing elements, no focal point.
3. **Not chronological.** An orbit has no beginning or end, but the brand promise is a
   sequence: experience signal, then the account-level read, then the next move
   ("Not another score. The next decision.").

Keep what works: it is animated with lots of moving parts. The redesign preserves that
energy but channels it into a forward-moving narrative.

## What we are building

A **diagonal three-beat cascade** that follows ONE illustrative account
("Cordova Health", the same account the mobile fallback already names) through the arc:

```
 (1) SIGNAL      top-left
       \
        \
     (2) READ     center  (the "engine", keeps faint radar rings + breathing glow)
          \
           \
        (3) MOVE  bottom-right
```

Same 600 x 660 portrait viewBox and footprint as today, so neither hero layout shifts.
The eye reads top-left to bottom-right, which is the chronology. Color travels with the
story: **orange (problem) -> blue (clarity) -> green (resolved)**.

### The three beats

| Beat | Eyebrow | Headline | Data | Accent |
|---|---|---|---|---|
| 1 Signal | SIGNAL | "The partner went quiet" | NPS 71 -> 42, falling sparkline; support "day-to-day contact - last 90 days" | orange |
| 2 Read | THE READ | "Cordova Health is about to walk" | "$1.2M at risk" (count-up), "61% renewal confidence" (progress bar); account line "Renewals - Cordova Health" | blue |
| 3 Move | NEXT MOVE | "Re-engage the day-to-day team now" | "58 days to renewal"; "Take action" CTA to BOOK_PATH | green -> blue |

Beat 2 is the largest card and sits on the faint radar rings + breathing glow retained
from the old hub, so the texture the user liked survives as the engine of the story.

### Motion (layered, not a one-time sweep)

1. **Entrance (one-shot):** beat 1 pops; a pulse travels the spine to beat 2, which pops
   as it arrives; a second pulse travels to beat 3, which pops last. Reuses the existing
   `net-pop` + `signal-travel` orchestration.
2. **Ambient loop (after entrance):** pulses keep threading the spine, orange->blue on
   segment 1, blue->green on segment 2.
3. **Live sparkline** in beat 1 (the NPS line keeps drawing).
4. **Count-up** on "$1.2M" and progress-bar fill on "61%".
5. **Idle drift** (`float-y-sm`) on each beat + breathing glow (`hub-breath`) on beat 2.

All gated by `useReveal` and an `entered` timeout exactly like today; respects
`prefers-reduced-motion` (renders the final resting state, no loops).

### Structure / technical

- **Hybrid, unchanged in principle:** one absolutely-positioned SVG layer draws the
  spine, segment gradients, radar rings, and sparkline; HTML cards carry the readable
  copy (better legibility + accessibility than SVG `<text>`).
- **Geometry** (viewBox 600 x 660): beat centers A(165,130), B(330,335), C(450,548);
  spine = two straight segments A->B and B->C, each carrying a `signal-travel` pulse
  via `--dx/--dy`.
- Reuse `useCountUp`, the `MiniChart` sparkline, `NetIcon`, `NextMoveArrow`, the
  `ACCENTS` palette, and the `u()` scaling helper. Retire the orbit-only helpers
  (`ProblemBox`, `NetActionCard`, `NetMetricCard`, `NET_CARDS`, hub block) or refactor
  them into the three beat components.
- "Illustrative" tag stays bottom-left.

### Mobile

Below `lg`, both heroes already swap in `RevenueSignalCard`, which already tells the
punchline beat ("A $1.2M renewal is about to walk" -> "Re-engage the day-to-day team
now", 58 days, partner-went-quiet reason) for Cordova Health. It already matches this
story, so it stays as the single-beat mobile version; only touch it if copy/numbers
drift from the desktop beats.

## Out of scope

- No new breadth viz (RevenueIntelligenceFlow / JourneyMatrix already carry breadth).
- No change to hero copy, layout grid, or the mobile fallback's structure.
