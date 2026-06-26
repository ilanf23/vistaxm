import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, type MotionStyle } from "motion/react";

/* ----------------------------------------------------------------------------
   Motion primitives (motion / framer-motion successor).

   These layer on top of the existing CSS reveal system in styles.css and the
   useReveal / useCountUp hooks. Use them for richer, orchestrated entrances,
   scroll-linked parallax, and ambient float.

   Reduced motion is handled globally: RootComponent wraps the app in
   <MotionConfig reducedMotion="user">, so transform animations are disabled and
   opacity still resolves to its visible end state for users who ask for less
   motion. Do not branch component output on a reduced-motion check (it would
   cause SSR hydration mismatches); rely on the global config instead.
---------------------------------------------------------------------------- */

// Matches the cubic-bezier used by the CSS `reveal` utility for a consistent feel.
const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;

/** Single element that fades + rises into view once when scrolled to. */
export function FadeIn({
  children,
  delay = 0,
  y = 16,
  duration = 0.7,
  className,
}: {
  children: ReactNode;
  /** milliseconds, to match the existing Reveal API */
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers the entrance of its <StaggerItem> children. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Child of <Stagger>. Rises + fades as part of the orchestrated sequence. */
export function StaggerItem({
  children,
  className,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-linked parallax. Translates its children on the Y axis as the element
 * passes through the viewport. Best for decorative layers, hero visuals, and
 * background accents. `distance` is the total px travel (top to bottom).
 */
export function Parallax({
  children,
  className,
  distance = 60,
  style,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  style?: MotionStyle;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}

/** Gentle, continuous vertical float for ambient/decorative elements. */
export function Floaty({
  children,
  className,
  amplitude = 10,
  duration = 6,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
