import { type ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

/**
 * Bespoke data visuals for the Solutions pages (BrokerPulse, PartnerPulse,
 * IndustrialPulse). These fill the slots that previously held a dashed
 * "custom graphic to come" placeholder, and give each product one signature
 * "in action" read.
 *
 * Design discipline (matches site.tsx viz):
 *   - Robust layout only: CSS grid/flex + percentage positioning, no fragile
 *     absolute-canvas math, so they render correctly server-side and at any width.
 *   - Brand tokens from styles.css (navy / blue-cta / orange-pop, hairline, glass).
 *   - Illustrative data, clearly labeled. Swap the DATA constants when VistaXM
 *     confirms real figures.
 */

// ---------------------------------------------------------------------------
// Shared tone palette (aligns with JourneyMatrix status colors)
// ---------------------------------------------------------------------------

type Tone = "positive" | "watch" | "risk" | "neutral";

const TONE: Record<Tone, { dot: string; soft: string; ring: string }> = {
  positive: { dot: "#5fcf9e", soft: "rgba(95,207,158,0.12)", ring: "rgba(95,207,158,0.55)" },
  watch: { dot: "#e6c34d", soft: "rgba(230,195,77,0.14)", ring: "rgba(230,195,77,0.6)" },
  risk: { dot: "var(--orange-pop)", soft: "rgba(246,130,65,0.12)", ring: "rgba(246,130,65,0.55)" },
  neutral: { dot: "var(--blue-cta)", soft: "rgba(49,133,252,0.08)", ring: "rgba(49,133,252,0.4)" },
};

// ---------------------------------------------------------------------------
// Small shared chrome: product-window toolbar + illustrative tag
// ---------------------------------------------------------------------------

function VizToolbar({ label, tag }: { label: string; tag: string }) {
  return (
    <div className="mb-1 flex items-center justify-between gap-3 border-b border-[color:var(--hairline)] px-1 pb-3">
      <div className="flex items-center gap-2.5 text-sm font-semibold text-[color:var(--navy-deep)]">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[color:var(--gray-line)]" />
          <span className="h-2 w-2 rounded-full bg-[color:var(--gray-line)]" />
          <span className="h-2 w-2 rounded-full bg-[color:var(--gray-line)]" />
        </span>
        {label}
      </div>
      <span className="pill-light">{tag}</span>
    </div>
  );
}

function IllustrativeCaption({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-xs italic text-[color:var(--ink-soft)]/80">{children}</p>;
}

// ---------------------------------------------------------------------------
// QuadrantPlot: the shared primitive behind BrokerBookMap + ConvictionMap.
// Points are positioned by percentage inside a padded inner field so bubbles
// and their labels never clip the edges.
// ---------------------------------------------------------------------------

type QPoint = {
  id: string;
  label: string;
  x: number; // 0..100, maps left -> right
  y: number; // 0..100, maps bottom -> top
  size?: number; // bubble diameter in px (default 22)
  tone: Tone;
  flagged?: boolean;
};

type Quadrant = { label: string; tone: Tone };

// Map a 0..100 value into an 8%..92% field so edge points keep breathing room.
const field = (v: number) => 8 + (Math.max(0, Math.min(100, v)) / 100) * 84;

function QuadrantPlot({
  toolbar,
  tag,
  axisX,
  axisY,
  quadrants,
  points,
  insight,
  caption,
}: {
  toolbar: string;
  tag: string;
  axisX: { low: string; high: string };
  axisY: { low: string; high: string };
  // [topLeft, topRight, bottomLeft, bottomRight]
  quadrants: [Quadrant, Quadrant, Quadrant, Quadrant];
  points: QPoint[];
  insight: ReactNode;
  caption: ReactNode;
}) {
  const { ref, shown } = useReveal(0.25);
  const flagged = points.filter((p) => p.flagged).map((p) => p.label);
  const label =
    `${toolbar}. ${axisX.low} to ${axisX.high} horizontally, ` +
    `${axisY.low} to ${axisY.high} vertically.` +
    (flagged.length ? ` Flagged: ${flagged.join(", ")}.` : "");

  return (
    <div
      ref={ref}
      className="rounded-2xl hairline bg-white p-3 shadow-[var(--shadow-elevation-2)] md:p-5"
    >
      <VizToolbar label={toolbar} tag={tag} />

      <div className="flex gap-3 px-1 pt-4">
        {/* Y axis caption (rotated) */}
        <div className="flex flex-col items-center justify-between py-6">
          <span className="whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)] [writing-mode:vertical-rl] [transform:rotate(180deg)]">
            {axisY.high}
          </span>
          <span className="whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]/70 [writing-mode:vertical-rl] [transform:rotate(180deg)]">
            {axisY.low}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          {/* Plot field. containerType lets bubbles size in cqi (below) so they
              scale down proportionally on narrow screens instead of dominating
              a ~320px mobile field. */}
          <div
            role="img"
            aria-label={label}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[color:var(--hairline)]"
            style={{ containerType: "inline-size" }}
          >
            {/* Quadrant tints */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {quadrants.map((q, i) => (
                <div
                  key={i}
                  className="relative border-[color:var(--hairline)]"
                  style={{
                    background: TONE[q.tone].soft,
                    borderRightWidth: i % 2 === 0 ? 1 : 0,
                    borderBottomWidth: i < 2 ? 1 : 0,
                  }}
                >
                  <span
                    className={`absolute max-w-[48%] px-3 py-2 text-[0.6rem] font-semibold leading-tight text-[color:var(--navy-deep)]/70 md:text-[0.64rem] ${
                      i === 0
                        ? "left-0 top-0"
                        : i === 1
                          ? "right-0 top-0 text-right"
                          : i === 2
                            ? "bottom-0 left-0"
                            : "bottom-0 right-0 text-right"
                    }`}
                  >
                    {q.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Points */}
            {points.map((p, i) => {
              const d = p.size ?? 22;
              const t = TONE[p.tone];
              return (
                <div
                  key={p.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${field(p.x)}%`,
                    top: `${field(100 - p.y)}%`,
                    opacity: shown ? 1 : 0,
                    transform: shown
                      ? "translate(-50%, -50%) scale(1)"
                      : "translate(-50%, -50%) scale(0.4)",
                    transition: `opacity 0.5s ease ${i * 70}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
                  }}
                >
                  {/* Flagged label chip. Sits above the bubble; the plot is
                      overflow-hidden, so keep flagged points off the top edge
                      (y <= ~85) and side edges when editing the DATA constants
                      below, or the chip will clip. */}
                  {p.flagged && (
                    <span
                      className="absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-[color:var(--hairline)] bg-white px-2 py-0.5 text-[0.62rem] font-semibold text-[color:var(--navy-deep)] shadow-sm"
                      style={{ boxShadow: `0 0 0 1px ${t.ring}` }}
                    >
                      {p.label}
                    </span>
                  )}
                  <span
                    className="block rounded-full"
                    style={{
                      // Scale with the plot: full size on desktop, ~half on mobile.
                      width: `clamp(${Math.round(d * 0.5)}px, ${((d / 560) * 100).toFixed(2)}cqi, ${d}px)`,
                      height: `clamp(${Math.round(d * 0.5)}px, ${((d / 560) * 100).toFixed(2)}cqi, ${d}px)`,
                      background: t.dot,
                      boxShadow: p.flagged
                        ? `0 0 0 4px ${t.ring}, 0 6px 16px rgba(2,37,80,0.25)`
                        : "0 3px 10px rgba(2,37,80,0.18)",
                      animation: p.flagged ? "cell-pulse 2.4s ease-out infinite" : undefined,
                    }}
                    title={p.label}
                    aria-hidden
                  />
                </div>
              );
            })}
          </div>

          {/* X axis captions */}
          <div className="mt-2 flex items-center justify-between px-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
            <span className="text-[color:var(--ink-soft)]/70">{axisX.low}</span>
            <span>{axisX.high}</span>
          </div>
        </div>
      </div>

      {/* Insight strip */}
      <div className="mt-4 rounded-xl bg-[color:var(--blue-tint)] px-4 py-3 text-sm leading-relaxed text-[color:var(--navy-deep)]">
        {insight}
      </div>

      <IllustrativeCaption>{caption}</IllustrativeCaption>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BrokerBookMap: BrokerPulse "in action". Your book of agencies plotted by
// premium (x) against experience trend (y). The quiet risk lives top-... no:
// high premium + declining experience = bottom-right = the accounts to catch.
// ---------------------------------------------------------------------------

const BROKER_AGENCIES: QPoint[] = [
  { id: "b1", label: "Meridian Risk", x: 88, y: 30, size: 34, tone: "risk", flagged: true },
  { id: "b2", label: "Coastal Lines", x: 72, y: 22, size: 26, tone: "risk", flagged: true },
  { id: "b3", label: "Granite Agency", x: 82, y: 78, size: 30, tone: "positive" },
  { id: "b4", label: "Harbor & Co", x: 60, y: 68, size: 22, tone: "positive" },
  { id: "b5", label: "Vantage Brokers", x: 48, y: 44, size: 18, tone: "watch" },
  { id: "b6", label: "Delta Assurance", x: 35, y: 74, size: 16, tone: "positive" },
  { id: "b7", label: "Pinehurst", x: 30, y: 34, size: 14, tone: "watch" },
  { id: "b8", label: "Aster Group", x: 64, y: 52, size: 20, tone: "watch" },
  { id: "b9", label: "Ridge Partners", x: 20, y: 58, size: 13, tone: "neutral" },
];

export function BrokerBookMap() {
  return (
    <QuadrantPlot
      toolbar="Agency book read"
      tag="Premium × Experience"
      axisX={{ low: "Lower premium", high: "Higher premium" }}
      axisY={{ low: "Experience declining", high: "Experience improving" }}
      quadrants={[
        { label: "Nurture", tone: "neutral" },
        { label: "Grow with them", tone: "positive" },
        { label: "Low stakes", tone: "neutral" },
        { label: "Catch before production drops", tone: "risk" },
      ]}
      points={BROKER_AGENCIES}
      insight={
        <>
          <span className="font-semibold">2 agencies</span> carry high premium while their
          experience is quietly sliding. That is <span className="font-semibold">$5.1M</span> of
          production to defend before it shows up in the numbers.
        </>
      }
      caption="Illustrative book. Bubble size reflects premium volume; position reflects experience trend. Final agencies and figures to be confirmed by VistaXM."
    />
  );
}

// ---------------------------------------------------------------------------
// ConvictionMap: PartnerPulse "in action". Partner orgs plotted by active
// recommendation rate (x) against conviction (y). The gap to close is
// top-left: they believe, but they are not putting you forward.
// ---------------------------------------------------------------------------

const PARTNER_ORGS: QPoint[] = [
  { id: "p1", label: "Northwind Systems", x: 82, y: 84, size: 30, tone: "positive" },
  { id: "p2", label: "Aperture Cloud", x: 70, y: 74, size: 24, tone: "positive" },
  { id: "p3", label: "Belmont IT", x: 26, y: 80, size: 30, tone: "watch", flagged: true },
  { id: "p4", label: "Cedar Consulting", x: 34, y: 66, size: 22, tone: "watch", flagged: true },
  { id: "p5", label: "Orion Integrators", x: 74, y: 34, size: 20, tone: "watch" },
  { id: "p6", label: "Quill Digital", x: 30, y: 28, size: 24, tone: "risk", flagged: true },
  { id: "p7", label: "Summit Partners", x: 56, y: 52, size: 18, tone: "neutral" },
  { id: "p8", label: "Lakeside Tech", x: 48, y: 40, size: 15, tone: "risk" },
];

export function ConvictionMap() {
  return (
    <QuadrantPlot
      toolbar="Partner conviction read"
      tag="Conviction × Recommendation"
      axisX={{ low: "Rarely recommends", high: "Actively recommends" }}
      axisY={{ low: "Low conviction", high: "High conviction" }}
      quadrants={[
        { label: "Convinced, not recommending", tone: "watch" },
        { label: "Champions", tone: "positive" },
        { label: "At risk", tone: "risk" },
        { label: "Habit, not belief", tone: "neutral" },
      ]}
      points={PARTNER_ORGS}
      insight={
        <>
          <span className="font-semibold">Belmont</span> and{" "}
          <span className="font-semibold">Cedar</span> believe in you but rarely put you forward.
          The conviction is there; the <span className="font-semibold">recommendation is not</span>.
          That is the fastest revenue you can unlock.
        </>
      }
      caption="Illustrative channel. Bubble size reflects partner-sourced revenue; position reflects conviction and recommendation rate. Final partners and figures to be confirmed by VistaXM."
    />
  );
}

// ---------------------------------------------------------------------------
// ChannelSignalMap: IndustrialPulse. The revenue runs OEM -> distributor ->
// end customer, and the experience signal fades the further it travels. A
// shaded "shadow zone" covers the leg where the OEM goes blind.
// ---------------------------------------------------------------------------

const CHANNEL_NODES: {
  id: string;
  label: string;
  sub: string;
  tone: "you" | "mid" | "far";
}[] = [
  { id: "oem", label: "You (OEM)", sub: "See the order, not the experience", tone: "you" },
  { id: "dist", label: "Distributor", sub: "Owns the relationship day to day", tone: "mid" },
  { id: "cust", label: "End customer", sub: "Where the experience actually happens", tone: "far" },
];

const LOST_SIGNALS = [
  "Install friction",
  "Support delays",
  "Spec drift",
  "Quiet switch to a rival",
];

export function ChannelSignalMap() {
  const { ref, shown } = useReveal(0.2);
  return (
    <div
      ref={ref}
      className="rounded-2xl hairline bg-white p-4 shadow-[var(--shadow-elevation-2)] md:p-6"
    >
      <VizToolbar label="Channel signal path" tag="Where visibility fades" />

      {/* Node flow */}
      <div className="mt-5 grid gap-4 md:grid-cols-3 md:gap-0">
        {CHANNEL_NODES.map((n, i) => (
          <div
            key={n.id}
            className="relative md:px-3"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
            }}
          >
            <div
              className={`flex h-full flex-col rounded-xl p-4 ${
                n.tone === "you"
                  ? "bg-[color:var(--navy-deep)] text-white"
                  : "hairline bg-white text-[color:var(--navy-deep)]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-lg text-xs font-semibold tabular-nums"
                  style={{
                    background:
                      n.tone === "you"
                        ? "rgba(255,255,255,0.12)"
                        : n.tone === "mid"
                          ? "var(--blue-tint)"
                          : "rgba(246,130,65,0.14)",
                    color:
                      n.tone === "you"
                        ? "#fff"
                        : n.tone === "mid"
                          ? "var(--blue-cta)"
                          : "var(--orange-pop)",
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-semibold leading-tight">{n.label}</span>
              </div>
              <p
                className={`mt-2 text-xs leading-snug ${
                  n.tone === "you" ? "text-white/70" : "text-[color:var(--ink-soft)]"
                }`}
              >
                {n.sub}
              </p>
              {/* Signal strength meter */}
              <div className="mt-3 flex items-center gap-1.5">
                {[0, 1, 2].map((bar) => {
                  const strong = i === 0 ? bar < 3 : i === 1 ? bar < 2 : bar < 1;
                  return (
                    <span
                      key={bar}
                      className="h-1.5 flex-1 rounded-full"
                      style={{
                        background: strong
                          ? n.tone === "you"
                            ? "#67a6ff"
                            : "var(--blue-cta)"
                          : n.tone === "you"
                            ? "rgba(255,255,255,0.18)"
                            : "var(--gray-soft)",
                      }}
                    />
                  );
                })}
                <span
                  className={`ml-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${
                    n.tone === "you" ? "text-white/55" : "text-[color:var(--ink-soft)]/70"
                  }`}
                >
                  {i === 0 ? "Clear" : i === 1 ? "Faint" : "Dark"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shadow zone: the signals the OEM never sees */}
      <div className="mt-4 rounded-xl border border-dashed border-[color:var(--orange-pop)]/40 bg-[color:var(--orange-pop)]/[0.06] p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--orange-pop)]">
          <span className="h-2 w-2 rounded-full bg-[color:var(--orange-pop)]" />
          Lives in the distributor shadow
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {LOST_SIGNALS.map((s, i) => (
            <span
              key={s}
              className="rounded-lg border border-[color:var(--hairline)] bg-white px-2.5 py-1 text-xs font-medium text-[color:var(--navy-deep)]"
              style={{
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(6px)",
                transition: `opacity 0.5s ease ${400 + i * 90}ms, transform 0.5s ease ${400 + i * 90}ms`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-[color:var(--blue-tint)] px-4 py-3 text-sm leading-relaxed text-[color:var(--navy-deep)]">
        The experience that decides your next order happens{" "}
        <span className="font-semibold">two steps away</span>. IndustrialPulse instruments that last
        leg, so the signal reaches you while you can still act on it.
      </div>

      <IllustrativeCaption>
        Illustrative channel path. Signal strength is a directional read, not measured data. Final
        model to be confirmed by VistaXM.
      </IllustrativeCaption>
    </div>
  );
}
