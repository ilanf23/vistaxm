# How to Start: Journey Spine Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/how-to-start` as a single scroll-driven narrative (signal spine, hero wave chart, tier steps, paper-brief deliverable) with every word unchanged, and fix the site-wide late-reveal bug that leaves viewports blank mid-scroll.

**Architecture:** New presentational components in `src/components/journey.tsx` built on the existing `motion` primitives (`src/components/motion.tsx`). The route `src/routes/how-to-start.tsx` is restructured section by section. One small global fix widens the reveal triggers in `motion.tsx` and `src/hooks/use-reveal.ts`.

**Tech Stack:** React 19, TanStack Start, `motion/react` (framer-motion successor, already a dependency), Tailwind v4 utilities from `src/styles.css`.

## Global Constraints

- **Every visible word on the page stays exactly identical** (including meta/OG strings). Decorative numerals (01, 02, ...) are allowed; new words are not.
- No em dashes anywhere (copy, code, comments, commit messages). Repo rule.
- **Never run `bun run dev`**: Lovable's dev tooling can auto-commit and push the working tree. Verify with `bun run build` + `bun run preview` (serves on http://localhost:4173).
- Never edit `src/routeTree.gen.ts`.
- Reuse design-system utilities (`container-x`, `section-y`, `btn-primary`, `pill`, `pill-light`, `eyebrow`, `hairline`, `grain`, `img-editorial-soft`, `img-frame`, brand CSS vars). Do not fork them.
- Reduced motion: global `MotionConfig reducedMotion="user"` already exists. Do NOT branch component JSX on a reduced-motion check (SSR hydration mismatch). SVG line-draw effects get a CSS `prefers-reduced-motion` override instead (Task 3).
- There is no test runner. The test cycle per task is: `bunx tsc --noEmit`, `bun run lint`, and visual verification against the preview build.
- `$SCRATCH` in commands means the session scratchpad directory (any writable temp dir outside the repo works).
- Commit after every task. Plain commits to `main`; never rewrite pushed history (Lovable constraint).
- The preview server may already be running in the session (background task `bja40we18`). After code changes, rebuild (`bun run build`) and restart preview if needed; preview serves the built output, not source.

---

### Task 1: Baseline word capture + global reveal-timing fix

**Files:**
- Modify: `src/components/motion.tsx:20`
- Modify: `src/hooks/use-reveal.ts:3-29`
- Create (scratch, not committed): `<scratchpad>/how-to-start-before.txt`

**Interfaces:**
- Produces: `VIEWPORT` in `motion.tsx` becomes `{ once: true, margin: "0px 0px 15% 0px" }` (used verbatim by Task 5's `BriefDoc`).

- [ ] **Step 1: Capture the word baseline from the current preview build**

With the preview running (`bun run preview` if not already up):

```bash
curl -s http://localhost:4173/how-to-start -o "$SCRATCH/how-to-start-before.html"
python3 -c "
import re, html, sys
raw = open(sys.argv[1]).read()
body = raw.split('<body', 1)[1]
body = re.sub(r'<script.*?</script>', ' ', body, flags=re.S)
text = re.sub(r'<[^>]+>', ' ', body)
words = re.findall(r'[A-Za-z][A-Za-z\'\-]*', html.unescape(text))
print('\n'.join(sorted(set(w.lower() for w in words))))
" "$SCRATCH/how-to-start-before.html" > "$SCRATCH/how-to-start-before.txt"
wc -l "$SCRATCH/how-to-start-before.txt"
```

Expected: a few hundred unique words. Keep this file; Task 6 diffs against it.

- [ ] **Step 2: Widen the motion viewport trigger**

In `src/components/motion.tsx`, change line 20 from:

```ts
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;
```

to:

```ts
const VIEWPORT = { once: true, margin: "0px 0px 15% 0px" } as const;
```

- [ ] **Step 3: Widen the IntersectionObserver trigger in useReveal**

In `src/hooks/use-reveal.ts`, change the signature default on line 3 from `threshold = 0.15` to `threshold = 0`, and the observer options on line 25 from:

```ts
      { threshold, rootMargin: "0px 0px -10% 0px" },
```

to:

```ts
      { threshold, rootMargin: "0px 0px 15% 0px" },
```

- [ ] **Step 4: Verify**

```bash
bunx tsc --noEmit && bun run lint
bun run build
```

Expected: all pass. Restart preview, then in Chrome scroll `http://localhost:4173/` and `/how-to-start` top to bottom at normal speed: content should now be visible as it enters the viewport (no fully blank viewports).

- [ ] **Step 5: Commit**

```bash
git add src/components/motion.tsx src/hooks/use-reveal.ts
git commit -m "fix(motion): trigger reveals before elements enter the viewport

Closes solutions-audit finding 8: whole viewports rendered blank during
normal scrolling because reveal margins were negative.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: `journey.tsx` scaffold + `WaveMiniChart` hero visual

**Files:**
- Create: `src/components/journey.tsx`
- Modify: `src/routes/how-to-start.tsx` (PageHero call, lines 87-92)

**Interfaces:**
- Consumes: `PageHero`'s existing `visual?: ReactNode` prop (it already wraps the visual in `FadeIn` + `Floaty`).
- Produces: `WaveMiniChart({ className? })`, plus module-level `EASE` and `VIEWPORT` constants reused by later tasks in this file.

- [ ] **Step 1: Create `src/components/journey.tsx` with the chart**

```tsx
import { type ReactNode, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/motion";

/* ----------------------------------------------------------------------------
   Journey components for the How to Start page: a scroll-drawn "signal spine"
   plus the bespoke section graphics that hang off it. All motion here is
   either a one-shot entrance or scroll-scrubbed drawing; nothing loops except
   what the shared primitives already provide.
---------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px 15% 0px" } as const;

/* Abstract wave-over-wave chart for the hero. Axis-less and numberless on
   purpose: it illustrates "start small, scale when it works" without making
   a readable data claim. */
export function WaveMiniChart({ className }: { className?: string }) {
  const bars = [
    { x: 24, h: 34 },
    { x: 44, h: 46 },
    { x: 96, h: 56 },
    { x: 116, h: 72 },
    { x: 136, h: 64 },
    { x: 188, h: 86 },
    { x: 208, h: 104 },
    { x: 228, h: 94 },
    { x: 248, h: 118 },
  ];
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm md:p-8",
        className,
      )}
    >
      <svg viewBox="0 0 280 160" className="w-full" aria-hidden>
        <defs>
          <linearGradient id="wave-trend" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--orange-pop)" />
            <stop offset="1" stopColor="var(--blue-light)" />
          </linearGradient>
        </defs>
        <line x1="16" y1="140" x2="264" y2="140" stroke="rgba(255,255,255,0.14)" />
        {bars.map((b, i) => (
          <motion.rect
            key={b.x}
            x={b.x}
            width={12}
            rx={3}
            fill="rgba(103,166,255,0.35)"
            initial={{ height: 0, attrY: 140 }}
            animate={{ height: b.h, attrY: 140 - b.h }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: EASE }}
          />
        ))}
        <motion.path
          className="journey-draw"
          d="M28 124 C 66 114, 88 98, 120 86 S 204 48, 252 26"
          fill="none"
          stroke="url(#wave-trend)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
        />
      </svg>
    </div>
  );
}
```

(`Stagger`, `StaggerItem`, `useRef`, `useScroll`, `useSpring`, and `ReactNode` are used by Tasks 3-4; the linter has unused-vars off, so the imports are safe to add now.)

- [ ] **Step 2: Wire the chart into the hero**

In `src/routes/how-to-start.tsx`, add the import and pass the visual:

```tsx
import { WaveMiniChart } from "@/components/journey";
```

```tsx
      <PageHero
        eyebrow="How to start"
        title="Start small. Scale when it works."
        subtitle="Two ways in, both fully managed. Prove the signal exists and that it changes a decision, then expand into the ongoing program."
        primary={{ label: "Book a 30-minute call", to: BOOK_PATH }}
        visual={<WaveMiniChart />}
      />
```

- [ ] **Step 3: Verify**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Restart preview; in Chrome confirm the hero right half now shows the animated chart (bars rise, trend line draws once on load), and the hero copy is unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey.tsx src/routes/how-to-start.tsx
git commit -m "feat(how-to-start): fill hero with abstract wave-over-wave chart

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: `JourneyRail` + `RailNode` + reduced-motion CSS

**Files:**
- Modify: `src/components/journey.tsx` (append)
- Modify: `src/styles.css` (append at end)
- Modify: `src/routes/how-to-start.tsx` (wrap sections)

**Interfaces:**
- Produces: `JourneyRail({ children, className? })` and `RailNode({ className? })`. Contract for later tasks: every section that should sit on the rail wraps its content in `<div className="relative xl:pl-14">` with a `<RailNode />` as first child. The rail line sits at the container's inner left edge (`calc(50% - 596px)`, valid because `container-x` is 1240px max with 1.5rem padding and the rail only renders at `xl` (1280px+)).

- [ ] **Step 1: Append rail components to `src/components/journey.tsx`**

```tsx
/* The scroll-drawn vertical line that connects the page's sections. Renders
   only at xl+ where the 1240px container is centered, so the gutter math
   (50% - 596px = the container's inner left edge) holds. */
export function JourneyRail({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.9"],
  });
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  return (
    <div ref={ref} className={cn("relative", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-10 hidden xl:block"
        style={{ left: "calc(50% - 596px)" }}
      >
        <svg
          className="h-full w-[2px] overflow-visible"
          viewBox="0 0 2 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="rail-grad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="var(--orange-pop)" />
              <stop offset="1" stopColor="var(--blue-cta)" />
            </linearGradient>
          </defs>
          <motion.line
            className="journey-rail-line"
            x1="1"
            y1="0"
            x2="1"
            y2="100"
            stroke="url(#rail-grad)"
            strokeWidth={2}
            strokeOpacity={0.45}
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: drawn }}
          />
        </svg>
      </div>
      {children}
    </div>
  );
}

/* Section marker that sits on the rail. Place as the first child of a
   section content wrapper that has className="relative xl:pl-14". */
export function RailNode({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(
        "absolute left-0 top-2 z-20 hidden h-3 w-3 -translate-x-[calc(50%-1px)] rounded-full border-2 border-[color:var(--orange-pop)] bg-white xl:block",
        className,
      )}
    />
  );
}
```

- [ ] **Step 2: Add the reduced-motion override at the end of `src/styles.css`**

```css
/* Scroll-drawn SVG strokes render fully drawn for reduced-motion users.
   !important is required to beat motion's inline stroke-dasharray. */
@media (prefers-reduced-motion: reduce) {
  .journey-draw,
  .journey-rail-line {
    stroke-dasharray: none !important;
    stroke-dashoffset: 0 !important;
  }
}
```

- [ ] **Step 3: Wrap the route's sections in the rail**

In `src/routes/how-to-start.tsx`, import and wrap everything between the hero and `CTABand`:

```tsx
import { JourneyRail, RailNode, WaveMiniChart } from "@/components/journey";
```

```tsx
      <JourneyRail>
        {/* existing sections, unchanged for now */}
        ...
      </JourneyRail>
      <CTABand />
```

Add the wrapper + node to the first section so the rail is visibly anchored (later tasks do the same for their sections):

```tsx
      <Section>
        <div className="relative xl:pl-14">
          <RailNode />
          <SectionHead
            eyebrow="Two ways in"
            ...
```

(Close the new `div` before `</Section>`.)

- [ ] **Step 4: Verify**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Restart preview. Desktop (default window): a thin gradient line draws down the left gutter as you scroll; a node marks the first section. Narrow the window below 1280px: line and node disappear, no horizontal overflow. Emulate reduced motion (DevTools rendering settings): line renders fully drawn.

- [ ] **Step 5: Commit**

```bash
git add src/components/journey.tsx src/styles.css src/routes/how-to-start.tsx
git commit -m "feat(how-to-start): add scroll-drawn signal rail down the page

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Restructure "Two ways in" (Essentials timeline + tier steps)

**Files:**
- Modify: `src/components/journey.tsx` (append `TimelineList`, `TierSteps`)
- Modify: `src/routes/how-to-start.tsx` (replace the whole "Two ways in" `<Section>`; delete `Check`, `GetItem`, and the two-card grid)

**Interfaces:**
- Consumes: `TIERS` and the deliverable strings already defined in the route file; `Stagger`/`StaggerItem` from `@/components/motion`.
- Produces: `TimelineList({ eyebrow, items })` and `TierSteps({ tiers })` where `tiers: { size: string; headline: string; desc: string }[]`.

- [ ] **Step 1: Append the two components to `src/components/journey.tsx`**

```tsx
/* Numbered timeline list: replaces circle-check bullets. The connector line
   visually echoes the rail. */
export function TimelineList({ eyebrow, items }: { eyebrow: string; items: string[] }) {
  return (
    <div>
      <div className="eyebrow mb-5">{eyebrow}</div>
      <Stagger className="relative" stagger={0.1}>
        <span
          aria-hidden
          className="absolute bottom-4 left-[11px] top-4 w-px bg-gradient-to-b from-[color:var(--orange-pop)] to-[color:var(--blue-cta)] opacity-30"
        />
        {items.map((item, i) => (
          <StaggerItem key={item} className="relative flex items-start gap-4 py-3">
            <span className="relative z-10 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-[color:var(--blue-cta)]/30 bg-white text-[11px] font-semibold tabular-nums text-[color:var(--blue-cta)]">
              {i + 1}
            </span>
            <span className="pt-0.5 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">
              {item}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* The three program tiers as ascending steps: each step wider than the last,
   stepping out to the left, with a gradient edge that brightens per tier. */
export function TierSteps({
  tiers,
}: {
  tiers: { size: string; headline: string; desc: string }[];
}) {
  const widths = ["xl:w-[76%]", "xl:w-[88%]", "xl:w-full"];
  return (
    <Stagger className="flex flex-col items-end gap-3" stagger={0.14}>
      {tiers.map((tier, i) => (
        <StaggerItem key={tier.size} className={cn("w-full", widths[i])}>
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5 pl-6 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07]">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-[color:var(--orange-pop)] to-[color:var(--blue-cta)]"
              style={{ opacity: 0.35 + i * 0.3 }}
            />
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-white">{tier.size}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-light)]">
                {tier.headline}
              </span>
            </div>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">{tier.desc}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
```

- [ ] **Step 2: Replace the "Two ways in" section in the route**

Delete the `Check` and `GetItem` components (lines 27-56) and the `DELIVERABLES`-adjacent two-card grid. The section becomes two full-width beats inside the rail. Exact copy is preserved word for word:

```tsx
      {/* The two entry paths: Essentials first, then the program */}
      <Section>
        <div className="relative xl:pl-14">
          <RailNode />
          <SectionHead
            eyebrow="Two ways in"
            title="Pick the entry that fits where you are."
            intro="Both paths are fully managed by us. Start with a fixed first wave, or step straight into the ongoing program. Either way, you act on the signal, not the setup."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <FadeIn>
              <span className="pill-light w-fit">Start here</span>
              <h3 className="mt-4 !text-2xl">Essentials.</h3>
              <p className="mt-3 max-w-[48ch] leading-relaxed text-[color:var(--ink-soft)]">
                A fixed, fast first wave. We stand up your program, deliver your certified NPS and
                your first account-level revenue signals, and hand you a prioritized list of moves.
                Sized to a director-level budget.
              </p>
              <div className="mt-8">
                <a href={BOOK_PATH} className="btn-primary">
                  Start with Essentials
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <TimelineList
                eyebrow="What you get"
                items={[
                  "Certified NPS",
                  "Benchmarked indexes (when available)",
                  "The Decision Maker to Influencer gap",
                  "A named at-risk and expansion account list",
                  "First insight in about 90 days",
                ]}
              />
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Scale beat: the program on dark */}
      <Section dark>
        <div className="relative xl:pl-14">
          <RailNode className="border-[color:var(--blue-light)] bg-[color:var(--navy-deep)]" />
          <FadeIn>
            <span className="pill w-fit !text-[color:var(--blue-light)]">Scale when it works</span>
          </FadeIn>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
            <FadeIn delay={80}>
              <h3 className="!text-2xl !text-white">The Fully Managed Program.</h3>
              <p className="mt-3 max-w-[48ch] leading-relaxed text-white/75">
                The ongoing program that keeps finding and protecting revenue, wave after wave.
                Choose the scope that fits your book. Continuous signal, benchmark tracking, and
                quarterly reviews, all run by us.
              </p>
              <div className="mt-8">
                <a href={BOOK_PATH} className="btn-primary">
                  Scope the program
                </a>
              </div>
            </FadeIn>
            <TierSteps
              tiers={[
                {
                  size: "Standard",
                  headline: "A focused book.",
                  desc: "Continuous signal across a defined set of priority accounts, with the core benchmark and quarterly review.",
                },
                {
                  size: "Advanced",
                  headline: "A growing portfolio.",
                  desc: "Wider coverage across segments and personas, deeper benchmark tracking, and a faster cadence of waves.",
                },
                {
                  size: "Strategic",
                  headline: "The full channel.",
                  desc: "Program-wide measurement across the channel, peer-group benchmarking, and executive reporting end to end.",
                },
              ]}
            />
          </div>
        </div>
      </Section>
```

Keep the module-level `TIERS` array only if still referenced; if the tiers are inlined as above, delete `TIERS` (and keep `DELIVERABLES` for Task 5). Update imports: remove `type ReactNode` if now unused, add `TimelineList, TierSteps` to the journey import, keep `FadeIn` and drop `Stagger, StaggerItem` from the motion import if no longer used in the route.

- [ ] **Step 3: Verify**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Restart preview. Check: Essentials reads as a full-width moment with the numbered timeline; the dark program section shows three ascending steps (Standard narrowest, Strategic full width) stepping out to the left; both CTAs work (route to `/book`); rail nodes mark both sections; below 1280px everything stacks cleanly.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey.tsx src/routes/how-to-start.tsx
git commit -m "feat(how-to-start): stage the two entry paths as a journey

Essentials becomes a full-width moment with a numbered timeline list;
the program tiers render as ascending steps on dark. Same words.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: `BriefDoc` deliverable section

**Files:**
- Modify: `src/components/journey.tsx` (append `BriefDoc`)
- Modify: `src/routes/how-to-start.tsx` (replace the "What lands on your desk" card)

**Interfaces:**
- Consumes: `DELIVERABLES` string array already in the route; `VIEWPORT`/`EASE` from `journey.tsx`.
- Produces: `BriefDoc({ items, footer })` with `items: string[]`, `footer: ReactNode`.

- [ ] **Step 1: Append `BriefDoc` to `src/components/journey.tsx`**

```tsx
/* The deliverable rendered as the thing itself: a paper brief that settles
   onto the desk. Ranked rows instead of check bullets. */
export function BriefDoc({ items, footer }: { items: string[]; footer: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: -1.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative mx-auto max-w-3xl rounded-md bg-white p-8 shadow-[var(--shadow-elevation-3)] md:p-12"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 rounded-t-md bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-cta)]"
      />
      <div
        aria-hidden
        className="flex items-center justify-between border-b border-[color:var(--hairline)] pb-5"
      >
        <span className="h-2 w-24 rounded-full bg-[color:var(--blue-tint)]" />
        <span className="h-2 w-10 rounded-full bg-[color:var(--blue-tint)]" />
      </div>
      <ol>
        {items.map((item, i) => (
          <li
            key={item}
            className="flex items-baseline gap-5 border-b border-[color:var(--hairline)] py-5"
          >
            <span className="text-sm font-semibold tabular-nums text-[color:var(--orange-pop)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[15px] font-medium leading-relaxed text-[color:var(--navy-deep)]">
              {item}
            </span>
          </li>
        ))}
      </ol>
      <p className="pt-5 text-sm italic text-[color:var(--ink-soft)]">{footer}</p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Replace the deliverable section in the route**

```tsx
      {/* What lands on your desk */}
      <Section tint>
        <div className="relative xl:pl-14">
          <RailNode />
          <SectionHead
            eyebrow="The deliverable"
            title="What lands on your desk."
            intro="Not a dashboard to interpret. A short, ranked brief you can act on the day it arrives."
          />
          <div className="mt-12">
            <BriefDoc
              items={DELIVERABLES}
              footer="A sample deliverable, clearly labeled as a sample, is available on request."
            />
          </div>
        </div>
      </Section>
```

Add `BriefDoc` to the journey import. The old `FadeIn`-wrapped white card with check rows is deleted.

- [ ] **Step 3: Verify**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Restart preview. The deliverable now looks like a document (gradient top edge, ranked 01-05 rows, italic footer) and settles in with a slight tilt once. Words identical.

- [ ] **Step 4: Commit**

```bash
git add src/components/journey.tsx src/routes/how-to-start.tsx
git commit -m "feat(how-to-start): render the deliverable as a paper brief

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Why-managed parallax + full-page verification

**Files:**
- Modify: `src/routes/how-to-start.tsx` (why-managed section)

**Interfaces:**
- Consumes: `Parallax` from `@/components/motion`.

- [ ] **Step 1: Add the rail node and parallax to the why-managed section**

```tsx
      {/* Why managed */}
      <Section>
        <div className="relative xl:pl-14">
          <RailNode />
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <SectionHead
              eyebrow="Why managed"
              title="Managed, neutral, light lift."
              intro="We bring the playbooks, the data scientists, and the technology. Your team stays focused on the customer. Better, faster, and lighter than building it yourself."
            />
            <Parallax distance={28}>
              <FadeIn delay={120}>
                <div className="img-editorial-soft img-frame aspect-[4/3] w-full">
                  <img
                    src="/images/ambient/operator-charts.jpg"
                    alt="An analyst working through charts at a workstation"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </FadeIn>
            </Parallax>
          </div>
        </div>
      </Section>
```

Add `Parallax` to the motion import in the route.

- [ ] **Step 2: Full verification pass**

```bash
bunx tsc --noEmit && bun run lint && bun run build
```

Restart preview, then in Chrome:

1. Desktop scroll top to bottom at normal speed: no blank viewports; rail draws continuously; each section has a node; hero chart animates once; brief settles once; photo drifts subtly.
2. Resize to ~390px width: no rail, no horizontal scrollbar, sections stack, tier steps all full width.
3. DevTools > Rendering > emulate `prefers-reduced-motion: reduce`, reload: all content visible immediately, rail and trend line fully drawn.

- [ ] **Step 3: Word-for-word check against the Task 1 baseline**

```bash
curl -s http://localhost:4173/how-to-start -o "$SCRATCH/how-to-start-after.html"
python3 -c "
import re, html, sys
raw = open(sys.argv[1]).read()
body = raw.split('<body', 1)[1]
body = re.sub(r'<script.*?</script>', ' ', body, flags=re.S)
text = re.sub(r'<[^>]+>', ' ', body)
words = re.findall(r'[A-Za-z][A-Za-z\'\-]*', html.unescape(text))
print('\n'.join(sorted(set(w.lower() for w in words))))
" "$SCRATCH/how-to-start-after.html" > "$SCRATCH/how-to-start-after.txt"
diff "$SCRATCH/how-to-start-before.txt" "$SCRATCH/how-to-start-after.txt"
```

Expected: empty diff (numerals are excluded by the letter-only regex). Any added or missing word is a constraint violation: fix before committing.

- [ ] **Step 4: Commit**

```bash
git add src/routes/how-to-start.tsx
git commit -m "feat(how-to-start): parallax ambient photo and rail terminus

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Push (Lovable syncs from main)**

```bash
git fetch origin && git status -sb
```

If behind, `git pull --no-rebase origin main` first (Lovable commits in parallel; never rebase). Then:

```bash
git push origin main
```
