import { Fragment, type ReactNode, useRef } from "react";
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

/* Labeled hero graphic: the shape of the whole engagement. Wave 1 is the
   fixed Essentials entry, a decision gate follows it, and coverage grows
   wave over wave inside the managed program. */
const ARC_WAVES = [
  { label: "Wave 1", sub: "Essentials", bars: [34, 46, 56], accent: true },
  { label: "Wave 2", sub: "Expand", bars: [62, 74, 68], accent: false },
  { label: "Wave 3+", sub: "Fully managed", bars: [84, 98, 92, 112], accent: false },
];

export function ProgramArcChart({ className }: { className?: string }) {
  let barIndex = 0;
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm md:p-7",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9fc0e8]">
          The program arc
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" />
          First insight in about 90 days
        </span>
      </div>

      <div className="mt-7 flex items-stretch">
        {ARC_WAVES.map((wave, wi) => {
          const group = (
            <div className="flex flex-1 flex-col">
              <div className="flex h-[118px] items-end justify-center gap-1.5">
                {wave.bars.map((h, i) => {
                  const delay = 0.2 + barIndex++ * 0.06;
                  return (
                    <motion.div
                      key={i}
                      className="w-4 rounded-t-[3px]"
                      style={{
                        background: wave.accent
                          ? "linear-gradient(to top, var(--blue-cta), var(--orange-pop))"
                          : "rgba(103,166,255,0.38)",
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: h }}
                      transition={{ duration: 0.55, delay, ease: EASE }}
                    />
                  );
                })}
              </div>
              <div className="mt-0 border-t border-white/15 pt-2.5 text-center">
                <div className="text-xs font-semibold text-white">{wave.label}</div>
                <div className="mt-0.5 text-[11px] leading-tight text-white/55">{wave.sub}</div>
              </div>
            </div>
          );
          return (
            <Fragment key={wave.label}>
              {wi > 0 && (
                <div aria-hidden className="relative mx-3 w-px self-stretch">
                  <span className="absolute inset-y-0 left-0 border-l border-dashed border-white/25" />
                  {wi === 1 && (
                    <span className="absolute -left-px top-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#0a3a6b] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9fc0e8]">
                      expand or stop
                    </span>
                  )}
                </div>
              )}
              {group}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* What actually happens between signing and the first brief: the educational
   counterpart to the "What you get" list. */
const PLAN_STEPS = [
  {
    when: "Day 0",
    title: "Kickoff",
    desc: "We stand up the program: accounts, personas, questionnaire.",
  },
  {
    when: "Wks 2-8",
    title: "Wave in field",
    desc: "Decision makers and influencers respond. We manage every touch.",
  },
  {
    when: "Day 75",
    title: "Analysis and benchmarking",
    desc: "Certified NPS, indexes, and the gaps that matter.",
  },
  {
    when: "Day 90",
    title: "Your first brief lands",
    desc: "Named accounts, ranked moves, dollars at stake.",
  },
];

export function NinetyDayPlan({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl hairline bg-white p-6 shadow-[var(--shadow-elevation-2)] md:p-7",
        className,
      )}
    >
      <div className="eyebrow mb-5">The first 90 days</div>
      <Stagger className="relative" stagger={0.1}>
        <span
          aria-hidden
          className="absolute bottom-6 left-[90px] top-3 w-px bg-gradient-to-b from-[color:var(--orange-pop)] to-[color:var(--blue-cta)] opacity-30"
        />
        {PLAN_STEPS.map((step) => (
          <StaggerItem key={step.title} className="relative flex gap-4 py-2.5">
            <span className="w-[70px] flex-none pt-0.5 text-right text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--orange-pop)]">
              {step.when}
            </span>
            <span className="relative z-10 mt-1 h-2.5 w-2.5 flex-none translate-x-[3.5px] rounded-full border-2 border-[color:var(--blue-cta)] bg-white" />
            <span className="min-w-0">
              <span className="block text-[15px] font-semibold leading-snug text-[color:var(--navy-deep)]">
                {step.title}
              </span>
              <span className="mt-0.5 block text-[13.5px] leading-relaxed text-[color:var(--ink-soft)]">
                {step.desc}
              </span>
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/* The scroll-drawn vertical line that connects the page's sections. Renders
   only at xl+ where the 1240px container is centered, so the gutter math
   (50% - 596px = the container's inner left edge) holds. */
export function JourneyRail({ children, className }: { children: ReactNode; className?: string }) {
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
        <motion.div
          className="journey-rail-line h-full w-[2px] origin-top rounded-full opacity-45"
          style={{
            scaleY: drawn,
            backgroundImage: "linear-gradient(to bottom, var(--orange-pop), var(--blue-cta))",
          }}
        />
      </div>
      {children}
    </div>
  );
}

/* Numbered section marker that sits on the rail. Place as the first child of
   a section content wrapper that has className="relative xl:pl-14". */
export function RailNode({ className, step }: { className?: string; step?: number }) {
  return (
    <motion.span
      aria-hidden
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(
        step == null
          ? "absolute left-0 top-2 z-20 hidden h-3 w-3 -translate-x-[calc(50%-1px)] rounded-full border-2 border-[color:var(--orange-pop)] bg-white xl:block"
          : "absolute left-0 top-0 z-20 hidden h-7 w-7 -translate-x-[calc(50%-1px)] items-center justify-center rounded-full border border-[color:var(--orange-pop)]/60 bg-white text-[12px] font-bold text-[color:var(--orange-pop)] shadow-[var(--shadow-elevation-1)] xl:flex",
        className,
      )}
    >
      {step}
    </motion.span>
  );
}

/* The three program tiers as ascending steps with a coverage meter: each
   step wider than the last, the meter showing how far across the channel
   the scope reaches. */
const TIER_SCOPES = ["priority accounts", "segments and personas", "the full channel"];

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
            <div className="mt-3.5 flex items-center gap-1.5">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className={cn(
                    "h-1.5 w-7 rounded-full",
                    d <= i ? "bg-[color:var(--blue-light)]" : "bg-white/15",
                  )}
                />
              ))}
              <span className="ml-2 text-[10.5px] font-medium uppercase tracking-[0.1em] text-white/45">
                Coverage: {TIER_SCOPES[i]}
              </span>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* The deliverable rendered as the thing itself: a titled sample brief with
   ranked rows and a plain-language note on what each line is for. */
export function BriefDoc({
  items,
  footer,
}: {
  items: { text: string; note: string }[];
  footer: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: -1.2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.8, ease: EASE }}
      className="relative rounded-md bg-white p-7 shadow-[var(--shadow-elevation-3)] md:p-10"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 rounded-t-md bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-cta)]"
      />
      <div className="flex items-center justify-between gap-4 border-b border-[color:var(--hairline)] pb-4">
        <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[color:var(--navy-deep)]">
          Quarterly revenue brief
        </span>
        <span className="rounded-full border border-[color:var(--orange-pop)]/40 bg-[color:var(--orange-pop)]/10 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-[color:var(--orange-pop)]">
          Sample
        </span>
      </div>
      <ol>
        {items.map((item, i) => (
          <li
            key={item.text}
            className="flex items-baseline gap-4 border-b border-[color:var(--hairline)] py-4"
          >
            <span className="text-sm font-semibold tabular-nums text-[color:var(--orange-pop)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-semibold leading-snug text-[color:var(--navy-deep)]">
                {item.text}
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-[color:var(--ink-soft)]">
                {item.note}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <p className="pt-4 text-[13px] italic text-[color:var(--ink-soft)]">{footer}</p>
    </motion.div>
  );
}
