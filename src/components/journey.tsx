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
