import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/* ============================================================================
 * HIDDEN INTERNAL PREVIEW: /for/brokerpulse-matrix-k9m4
 *
 * A draft of the BrokerPulse-specific Journey × Persona intelligence matrix,
 * for Bruce to review before any decision to promote to the public site.
 *
 * Discoverability: noindex,nofollow,noarchive (head meta below), lives under
 * /for/ which is already Disallow-ed in public/robots.txt, NOT in sitemap.xml,
 * and linked from nowhere. Reachable only by direct URL.
 *
 * Isolation: fully self-contained. It does NOT import site.tsx and does NOT
 * modify any shared component. It only reads existing global CSS variables
 * (--navy-deep, --hairline, etc.), so it cannot affect any other page.
 * ============================================================================ */

type Tone = "neutral" | "accent";

type Cell = { title: string; desc: string; tone?: Tone };

const STAGES = [
  "Advise & Select",
  "Quote & Bind",
  "Implement & Enroll",
  "Service & Advocate",
  "Renew & Reposition",
] as const;

const PERSONAS = [
  "Economic Buyer",
  "Benefits Decision Maker",
  "Compliance & Risk",
  "Member / Employee",
] as const;

// 4 rows (personas) x 5 cols (stages). Source: Bruce's BrokerPulse Intelligence
// Matrix + Persona/Stage Definitions (Jul 22). Two cells intentionally marked
// `accent` because the source calls them out as "absence as the signal".
const CELLS: Cell[][] = [
  // Economic Buyer
  [
    { title: "Cost-Strategy Alignment", desc: "Does the recommendation reflect the real cost and talent tradeoff?" },
    { title: "Rate Justification Confidence", desc: "Belief the broker worked the market, not just the incumbent." },
    { title: "Spend Predictability", desc: "Budgeted cost versus what actually gets billed." },
    { title: "Cost Trajectory Trust", desc: "Claims and billing seen as managed or drifting." },
    { title: "Re-Investment Conviction", desc: "Keep the broker or put it out to bid." },
  ],
  // Benefits Decision Maker
  [
    { title: "Advisory Depth", desc: "Population diagnosed, or last year's design rerun." },
    { title: "Design Tradeoff Clarity", desc: "Confidence in plan and contribution choices made under pressure." },
    { title: "Execution Load", desc: "Burden the broker absorbed versus pushed back to HR." },
    { title: "Responsiveness Signal", desc: "Issues owned and resolved, or recurring." },
    { title: "Broker Relationship Strength", desc: "Advocacy, indispensability, and appetite to expand." },
  ],
  // Compliance & Risk
  [
    { title: "Exposure Visibility", desc: "Obligations surfaced early or discovered late.", tone: "accent" },
    { title: "Contract Clarity", desc: "Documents and disclosures reviewed, not just signed." },
    { title: "Data & Eligibility Integrity", desc: "File feeds, eligibility rules, and notices correct at go-live." },
    { title: "Filing Reliability", desc: "ACA, 5500s, and COBRA run clean or require chasing." },
    { title: "Fiduciary Assurance", desc: "Renewal decision defensible and documented." },
  ],
  // Member / Employee
  [
    { title: "Voice-of-Member Gap", desc: "How much real employee need shaped the recommendation.", tone: "accent" },
    { title: "Perceived Value Baseline", desc: "Do members understand what they get and what it costs." },
    { title: "First-Use Experience", desc: "Enrollment friction, ID cards, and network access at day one." },
    { title: "Lived Care Experience", desc: "Denials, network adequacy, and somewhere to turn." },
    { title: "Benefit Confidence", desc: "Worth the payroll deduction, and the retention risk if not." },
  ],
];

const TONE_STYLE: Record<Tone, { bg: string; border: string; dot: string }> = {
  neutral: {
    bg: "rgba(49,133,252,0.08)",
    border: "var(--hairline)",
    dot: "var(--blue-cta)",
  },
  accent: {
    bg: "rgba(246,130,65,0.12)",
    border: "rgba(246,130,65,0.55)",
    dot: "var(--orange-pop)",
  },
};

export const Route = createFileRoute("/for/brokerpulse-matrix-k9m4")({
  head: () => ({
    meta: [
      { title: "BrokerPulse Journey × Persona (internal preview)" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "googlebot", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: BrokerPulseMatrixPreview,
});

function useReveal(threshold = 0) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setShown(true);
      return;
    }
    // Fallback: guarantee visibility shortly after mount even if the
    // observer never fires (e.g. element already fully in view).
    const fallback = window.setTimeout(() => setShown(true), 300);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
    };
  }, [threshold]);
  return { ref, shown };
}

function Matrix() {
  const { ref, shown } = useReveal(0.15);
  return (
    <div ref={ref}>
      <div className="rounded-2xl hairline bg-white p-3 md:p-5 shadow-[var(--shadow-elevation-2)]">
        <div className="flex items-center justify-between gap-3 px-1 pb-3 mb-1 border-b border-[color:var(--hairline)]">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-[color:var(--navy-deep)]">
            <span className="flex gap-1" aria-hidden>
              <span className="w-2 h-2 rounded-full bg-[color:var(--gray-line)]" />
              <span className="w-2 h-2 rounded-full bg-[color:var(--gray-line)]" />
              <span className="w-2 h-2 rounded-full bg-[color:var(--gray-line)]" />
            </span>
            BrokerPulse revenue signal map
          </div>
          <span className="pill-light">Journey × Persona</span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="grid" style={{ gridTemplateColumns: `240px repeat(${STAGES.length}, 1fr)` }}>
              <div className="px-3 py-3 text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                Persona ↓ / Stage →
              </div>
              {STAGES.map((s, idx) => (
                <div
                  key={s}
                  className="px-3 py-3 text-xs font-semibold text-[color:var(--navy-deep)] border-l border-[color:var(--hairline)]"
                  style={{ opacity: shown ? 1 : 0, transition: `opacity 500ms ease ${idx * 60}ms` }}
                >
                  {s}
                </div>
              ))}
            </div>

            {PERSONAS.map((p, i) => (
              <div
                key={p}
                className="grid border-t border-[color:var(--hairline)]"
                style={{ gridTemplateColumns: `240px repeat(${STAGES.length}, 1fr)` }}
              >
                <div className="px-3 py-4 text-sm font-semibold text-[color:var(--navy-deep)] flex items-center">
                  {p}
                </div>
                {STAGES.map((s, j) => {
                  const cell = CELLS[i][j];
                  const st = TONE_STYLE[cell.tone ?? "neutral"];
                  const delay = (i * STAGES.length + j) * 40;
                  return (
                    <div key={s} className="group/flip px-2 py-3 border-l border-[color:var(--hairline)]">
                      <div
                        className="rounded-lg [perspective:900px] focus-within:ring-2 focus-within:ring-[color:var(--blue-cta)] focus-within:ring-offset-1"
                        style={{ opacity: shown ? 1 : 0, transition: `opacity 500ms ease ${delay}ms` }}
                      >
                        <button
                          type="button"
                          aria-label={`${p} at ${s}: ${cell.title}. ${cell.desc}`}
                          className="relative block h-[6rem] w-full rounded-lg text-left transition-transform duration-500 [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)] focus:[transform:rotateY(180deg)] focus:outline-none motion-reduce:transition-none"
                        >
                          <span
                            className="absolute inset-0 flex items-start gap-1.5 overflow-hidden rounded-lg px-2.5 py-2 text-[0.72rem] font-semibold leading-tight text-[color:var(--navy-deep)] [backface-visibility:hidden]"
                            style={{ background: st.bg, boxShadow: `inset 0 0 0 1px ${st.border}` }}
                          >
                            <span aria-hidden className="mt-0.5 h-2 w-2 flex-none rounded-full" style={{ background: st.dot }} />
                            <span className="min-w-0">{cell.title}</span>
                          </span>
                          <span
                            className="absolute inset-0 flex flex-col justify-center gap-1 overflow-hidden rounded-lg px-2.5 py-2 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]"
                            style={{ background: st.bg, boxShadow: `inset 0 0 0 1px ${st.border}` }}
                          >
                            <span className="flex items-center gap-1.5 text-[0.64rem] font-semibold leading-snug text-[color:var(--navy-deep)]">
                              <span aria-hidden className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: st.dot }} />
                              {cell.title}
                            </span>
                            <span className="text-[0.58rem] font-medium leading-snug text-[color:var(--ink-soft)]">
                              {cell.desc}
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-[color:var(--ink-soft)]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ background: TONE_STYLE.neutral.bg, boxShadow: `inset 0 0 0 1px ${TONE_STYLE.neutral.border}` }} />
          Intelligence developed at this intersection
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ background: TONE_STYLE.accent.bg, boxShadow: `inset 0 0 0 1px ${TONE_STYLE.accent.border}` }} />
          Absence is the signal (an unserved need)
        </div>
      </div>

      <p className="mt-3 text-xs italic text-[color:var(--ink-soft)]/80">
        Internal preview. Hover or focus any cell to reveal the signal it reads. Cell colors are a
        draft treatment, not a health reading; final visual language to be confirmed with VistaXM.
      </p>
    </div>
  );
}

function BrokerPulseMatrixPreview() {
  return (
    <main style={{ background: "var(--gray-soft, #f6f8fb)", minHeight: "100vh" }}>
      <div className="mx-auto max-w-[1120px] px-5 py-12 md:py-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--hairline)] bg-white px-3 py-1 text-xs font-semibold text-[color:var(--ink-soft)]">
          Internal preview — not linked or published
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--blue-link)]">
          BrokerPulse
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-[color:var(--navy-deep)]" style={{ fontFamily: "var(--font-display)" }}>
          Journey × Persona. Every intersection is a revenue signal.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[color:var(--ink-soft)]">
          Five stages of the benefits lifecycle across the four people who decide whether the broker
          keeps the account. Where they cross is where retention, expansion, and re-bid risk live.
        </p>
        <div className="mt-10">
          <Matrix />
        </div>
      </div>
    </main>
  );
}
