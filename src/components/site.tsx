import type { ReactNode } from "react";
import { useReveal, useCountUp } from "@/hooks/use-reveal";

/* ---------------- Primitives ---------------- */

function CTAButton({ to, className, children }: { to: string; className: string; children: ReactNode }) {
  const external = to.startsWith("mailto:") || to.startsWith("http") || to.startsWith("tel:") || to.startsWith("#");
  if (external) return <a href={to} className={className}>{children}</a>;
  return <a href={to} className={className}>{children}</a>;
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

export function Section({ children, className = "", tint = false, dark = false, id }: {
  children: ReactNode; className?: string; tint?: boolean; dark?: boolean; id?: string;
}) {
  const bg = dark
    ? "bg-[color:var(--navy-deep)] text-white grain"
    : tint
    ? "bg-[color:var(--blue-tint)]"
    : "bg-white";
  return (
    <section id={id} className={`relative section-y ${bg} ${className}`}>
      <div className="container-x relative">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, center = false, dark = false }: {
  eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean; dark?: boolean;
}) {
  return (
    <Reveal>
      <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
        {eyebrow && <div className={`eyebrow mb-4 ${dark ? "!text-[color:var(--blue-light)]" : ""}`}>{eyebrow}</div>}
        <h2 className={dark ? "!text-white" : ""}>{title}</h2>
        {intro && <p className={`mt-5 text-lg md:text-[1.125rem] leading-relaxed ${dark ? "text-white/75" : "text-[color:var(--ink-soft)]"} max-w-[68ch]`}>{intro}</p>}
      </div>
    </Reveal>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Reveal>
      <div className="rounded-2xl hairline bg-white p-7 card-lift h-full">
        <div className="text-4xl md:text-5xl font-semibold text-[color:var(--navy-deep)] tracking-tight">{value}</div>
        <div className="mt-3 text-sm text-[color:var(--ink-soft)] leading-relaxed">{label}</div>
      </div>
    </Reveal>
  );
}

export function Card({ title, children, kicker }: { title: string; children: ReactNode; kicker?: string }) {
  return (
    <Reveal>
      <div className="rounded-2xl hairline bg-white p-7 h-full card-lift">
        {kicker && <div className="eyebrow mb-3">{kicker}</div>}
        <h3 className="!text-xl">{title}</h3>
        <div className="mt-3 text-[color:var(--ink-soft)] leading-relaxed">{children}</div>
      </div>
    </Reveal>
  );
}

/* ---------------- Hero: score → decision ---------------- */

export function Hero({ eyebrow, title, subtitle, primary, secondary, children }: {
  eyebrow?: string; title: ReactNode; subtitle?: ReactNode;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--navy-deep)] text-white grain">
      {/* Gradient meshes */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(900px 500px at 88% -12%, rgba(49,133,252,0.42) 0%, transparent 60%), radial-gradient(720px 420px at -10% 110%, rgba(0,86,167,0.55) 0%, transparent 60%), radial-gradient(380px 240px at 70% 90%, rgba(246,130,65,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="container-x relative pt-24 pb-24 md:pt-32 md:pb-36">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">
          <Reveal>
            <div>
              {eyebrow && (
                <div className="pill mb-7">
                  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--orange-pop)]" />
                  {eyebrow}
                </div>
              )}
              <h1 className="!text-white">{title}</h1>
              {subtitle && <p className="mt-7 text-lg md:text-xl text-white/75 max-w-[60ch] leading-relaxed">{subtitle}</p>}
              {(primary || secondary) && (
                <div className="mt-9 flex flex-wrap gap-3">
                  {primary && <CTAButton to={primary.to} className="btn-primary">{primary.label}</CTAButton>}
                  {secondary && <CTAButton to={secondary.to} className="btn-secondary">{secondary.label}</CTAButton>}
                </div>
              )}
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                {[
                  { v: "+8", l: "NPS lift" },
                  { v: "$11M+", l: "Revenue protected" },
                  { v: "33%", l: "Tie NPS to revenue" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-semibold text-white tracking-tight">{s.v}</div>
                    <div className="mt-1 text-xs text-white/55 leading-snug">{s.l}</div>
                  </div>
                ))}
              </div>
              {children}
            </div>
          </Reveal>

          <ScoreToDecision />
        </div>
      </div>
      {/* hairline base */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}

function ScoreToDecision() {
  const { ref, shown } = useReveal(0.3);
  const score = useCountUp(42, 1200, shown);
  return (
    <div ref={ref} className="relative h-[440px] md:h-[500px]">
      {/* The score side — large vanity number */}
      <div
        className={`absolute left-0 top-6 w-[55%] glass p-7 transition-all duration-700 ${
          shown ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
        }`}
      >
        <div className="text-[0.7rem] uppercase tracking-[0.14em] text-white/60">The score</div>
        <div className="mt-4 flex items-end gap-3">
          <div className="text-[6rem] leading-none font-semibold text-white tracking-tight tabular-nums">
            {Math.round(score)}
          </div>
          <div className="pb-3 text-xs text-white/55">NPS<br />account-level</div>
        </div>
        <div className="mt-5 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[color:var(--blue-light)] to-[color:var(--blue-cta)]"
            style={{ width: `${shown ? 71 : 0}%`, transition: "width 1.4s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </div>
        <div className="mt-3 text-xs text-white/45">A number. No persona. No journey. No action.</div>
      </div>

      {/* Connector */}
      <svg
        aria-hidden
        className="absolute left-[44%] top-[34%] w-[18%] h-12 hidden md:block"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="conn" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="1" stopColor="rgba(49,133,252,0.7)" />
          </linearGradient>
        </defs>
        <path
          d="M0,20 C40,20 60,20 100,20"
          stroke="url(#conn)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
        />
      </svg>

      {/* The decision side — revenue tiles */}
      <div
        className={`absolute right-0 top-0 w-[60%] space-y-3 transition-all duration-700 ${
          shown ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
        style={{ transitionDelay: "300ms" }}
      >
        <div className="pill" style={{ background: "rgba(49,133,252,0.16)", borderColor: "rgba(49,133,252,0.32)", color: "#cfe3ff" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--blue-light)]" /> The decision
        </div>

        <DecisionTile delay={400} label="Expansion latent" detail="Renewal × Executive" value="$4.2M" tone="blue" shown={shown} />
        <DecisionTile delay={550} label="Accounts at risk" detail="Implementation × Operations" value="7" tone="orange" shown={shown} />
        <DecisionTile delay={700} label="Influencer gap widening" detail="3 named accounts · 7 mo lead" value="51 pts" tone="white" shown={shown} />
        <DecisionTile delay={850} label="MDF re-route" detail="Partners growing accounts" value="$1.8M" tone="blue" shown={shown} />
      </div>
    </div>
  );
}

function DecisionTile({ label, detail, value, tone, delay, shown }: {
  label: string; detail: string; value: string; tone: "blue" | "orange" | "white"; delay: number; shown: boolean;
}) {
  const accent = tone === "orange" ? "var(--orange-pop)" : tone === "blue" ? "var(--blue-light)" : "rgba(255,255,255,0.9)";
  return (
    <div
      className="glass px-5 py-4 flex items-center justify-between gap-4 transition-all"
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: "700ms",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(10px)",
      }}
    >
      <div className="min-w-0">
        <div className="text-[0.7rem] uppercase tracking-[0.12em] text-white/55">{label}</div>
        <div className="text-sm text-white/90 mt-0.5 truncate">{detail}</div>
      </div>
      <div className="text-xl font-semibold tabular-nums shrink-0" style={{ color: accent }}>
        {value}
      </div>
    </div>
  );
}

/* ---------------- CTA Band ---------------- */

export function CTABand() {
  return (
    <section className="relative bg-[color:var(--navy-deep)] text-white grain overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(600px 300px at 85% 50%, rgba(49,133,252,0.25), transparent 70%), radial-gradient(500px 260px at 10% 50%, rgba(0,86,167,0.35), transparent 70%)",
        }}
      />
      <div className="container-x relative py-20 md:py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <Reveal>
          <div>
            <div className="eyebrow !text-[color:var(--blue-light)] mb-3">See the signal</div>
            <h2 className="!text-white !text-3xl md:!text-[2.5rem] max-w-[20ch]">See where your revenue is hiding.</h2>
            <p className="mt-3 text-white/70">A 30-minute conversation. No deck.</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <a href="mailto:sales@vistaxm.com" className="btn-primary">Book a 30-minute conversation</a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Journey × Persona Matrix ---------------- */

const STAGES = ["Sales", "Procurement & Onboarding", "Implementation", "Support & Operations", "Renewal & Expansion"] as const;
const PERSONAS = ["Executive / Decision Maker", "Technical", "Procurement / Commercial", "Operations / Day-to-Day User"] as const;

// Curated signal intensities — meaningful pattern, not random
const INTENSITY: number[][] = [
  // Sales, Procurement, Implementation, Support, Renewal
  [0.85, 0.55, 0.4,  0.35, 0.75], // Executive
  [0.45, 0.7,  0.85, 0.65, 0.5],  // Technical
  [0.7,  0.8,  0.45, 0.4,  0.6],  // Procurement
  [0.3,  0.45, 0.7,  0.8,  1.0],  // Operations  ← Renewal cell = early warning
];

export function JourneyMatrix() {
  const { ref, shown } = useReveal(0.2);
  return (
    <div ref={ref}>
      <div className="rounded-2xl hairline bg-white p-3 md:p-5 shadow-[var(--shadow-elevation-2)] overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Header row */}
          <div className="grid" style={{ gridTemplateColumns: `220px repeat(${STAGES.length}, 1fr)` }}>
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

          {/* Body rows */}
          {PERSONAS.map((p, i) => (
            <div
              key={p}
              className="grid border-t border-[color:var(--hairline)]"
              style={{ gridTemplateColumns: `220px repeat(${STAGES.length}, 1fr)` }}
            >
              <div className="px-3 py-4 text-sm font-semibold text-[color:var(--navy-deep)] flex items-center">
                {p}
              </div>
              {STAGES.map((s, j) => {
                const v = INTENSITY[i][j];
                const isEarly = i === 3 && j === 4;
                const delay = (i * 5 + j) * 45;
                return (
                  <div
                    key={s}
                    className="px-2 py-3 border-l border-[color:var(--hairline)]"
                  >
                    <div
                      title={`${p} × ${s} · intensity ${(v * 100).toFixed(0)}`}
                      className={`relative h-11 rounded-lg flex items-center justify-center text-[0.7rem] font-semibold transition-all duration-700 ${
                        isEarly ? "text-white" : "text-[color:var(--navy-deep)]"
                      }`}
                      style={{
                        background: isEarly
                          ? "linear-gradient(135deg, #f68241 0%, #e35a1f 100%)"
                          : `rgba(49,133,252, ${shown ? v * 0.22 + 0.04 : 0})`,
                        boxShadow: isEarly && shown
                          ? "0 8px 22px -8px rgba(246,130,65,0.55)"
                          : shown
                          ? `inset 0 0 0 1px rgba(49,133,252, ${v * 0.18})`
                          : "inset 0 0 0 1px transparent",
                        opacity: shown ? 1 : 0,
                        transform: shown ? "scale(1)" : "scale(0.92)",
                        transitionDelay: `${delay}ms`,
                        animation: isEarly && shown ? "cell-pulse 2.6s ease-in-out 1.4s infinite" : undefined,
                      }}
                    >
                      {isEarly ? "Early warning" : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-[color:var(--ink-soft)]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ background: "rgba(49,133,252,0.08)" }} />
          Low signal
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ background: "rgba(49,133,252,0.28)" }} />
          Strong signal
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm" style={{ background: "linear-gradient(135deg,#f68241,#e35a1f)" }} />
          Early warning — Operations × Renewal
        </div>
      </div>
    </div>
  );
}

/* ---------------- NPS Gauge ---------------- */

export function NPSGauge({ value = 68 }: { value?: number }) {
  const { ref, shown } = useReveal(0.4);
  const v = useCountUp(value, 1600, shown);
  // Gauge: -100 to 100 mapped to a 180° arc
  const normalized = (Math.max(-100, Math.min(100, v)) + 100) / 200; // 0..1
  const radius = 110;
  const circumference = Math.PI * radius;
  const dash = circumference * normalized;

  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 260 160" className="w-full max-w-[320px] mx-auto block">
        <defs>
          <linearGradient id="gaugeFill" x1="0" x2="1">
            <stop offset="0" stopColor="#3185fc" />
            <stop offset="0.7" stopColor="#67a6ff" />
            <stop offset="1" stopColor="#f68241" />
          </linearGradient>
        </defs>
        {/* Track */}
        <path
          d="M 20 140 A 110 110 0 0 1 240 140"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d="M 20 140 A 110 110 0 0 1 240 140"
          fill="none"
          stroke="url(#gaugeFill)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: "stroke-dasharray 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
        {/* Tick marks */}
        {[-100, -50, 0, 50, 100].map((t) => {
          const a = Math.PI + (Math.PI * (t + 100)) / 200;
          const x1 = 130 + Math.cos(a) * 95;
          const y1 = 140 + Math.sin(a) * 95;
          const x2 = 130 + Math.cos(a) * 88;
          const y2 = 140 + Math.sin(a) * 88;
          return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
        <div className="text-[3.5rem] leading-none font-semibold text-white tabular-nums tracking-tight">
          {Math.round(v)}
        </div>
        <div className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-white/60">Certified NPS</div>
      </div>
    </div>
  );
}

/* ---------------- Promoter / Passive / Detractor spend ---------------- */

export function SpendByCohort() {
  const { ref, shown } = useReveal(0.3);
  const cohorts = [
    { name: "Promoters", share: 62, color: "var(--blue-cta)", note: "Renew, expand, refer" },
    { name: "Passives", share: 26, color: "var(--blue-pale)", note: "Quiet — until they leave" },
    { name: "Detractors", share: 12, color: "var(--orange-pop)", note: "Cost more, churn first" },
  ];
  return (
    <div ref={ref} className="rounded-2xl hairline bg-white p-7 md:p-9 card-lift">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="eyebrow mb-2">Spend follows sentiment</div>
          <h3 className="!text-2xl">Where the revenue actually sits.</h3>
        </div>
        <div className="text-xs text-[color:var(--ink-soft)]">Share of annualized spend</div>
      </div>

      {/* Stacked bar */}
      <div className="mt-7 flex h-14 w-full overflow-hidden rounded-xl hairline">
        {cohorts.map((c, i) => (
          <div
            key={c.name}
            className="relative h-full flex items-center justify-center text-xs font-semibold text-white"
            style={{
              width: shown ? `${c.share}%` : "0%",
              background: c.color,
              transition: `width 1.2s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
              color: c.name === "Passives" ? "var(--navy-deep)" : "#fff",
            }}
          >
            {shown && c.share > 10 ? `${c.share}%` : ""}
          </div>
        ))}
      </div>

      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        {cohorts.map((c) => (
          <div key={c.name} className="flex items-start gap-3">
            <span className="mt-1 w-3 h-3 rounded-sm shrink-0" style={{ background: c.color }} />
            <div>
              <div className="text-sm font-semibold text-[color:var(--navy-deep)]">{c.name} · {c.share}%</div>
              <div className="text-xs text-[color:var(--ink-soft)] mt-0.5">{c.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-[color:var(--hairline)] text-sm text-[color:var(--ink-soft)]">
        Promoter accounts carry <span className="font-semibold text-[color:var(--navy-deep)]">5.2×</span> the lifetime value of detractors. A single point of score motion is a portfolio move.
      </div>
    </div>
  );
}

/* ---------------- Before / After: Score vs Decision ---------------- */

export function ScoreVsDecision() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Reveal>
        <div className="rounded-2xl hairline bg-white p-8 h-full relative overflow-hidden">
          <div className="pill-light">Before</div>
          <div className="mt-5 text-2xl md:text-3xl font-semibold text-[color:var(--navy-deep)] leading-tight">
            A score. Not a decision.
          </div>
          <div className="mt-8 flex items-end gap-5">
            <div className="text-[5.5rem] leading-none font-semibold text-[color:var(--ink)] tabular-nums">42</div>
            <div className="text-sm text-[color:var(--ink-soft)] pb-4">
              NPS · account-level<br />
              No persona. No journey. No action.
            </div>
          </div>
          <div className="mt-6 h-1 w-full rounded-full bg-[color:var(--gray-soft)]">
            <div className="h-full w-[71%] rounded-full bg-[color:var(--gray-line)]" />
          </div>
          <div className="mt-3 text-xs text-[color:var(--ink-soft)]">Quarterly review. Slide 14. Nothing changes.</div>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="relative rounded-2xl p-8 h-full overflow-hidden text-white grain"
             style={{ background: "linear-gradient(160deg, #022550 0%, #062d57 60%, #0d3f7a 100%)" }}>
          <div className="pill" style={{ background: "rgba(49,133,252,0.18)", borderColor: "rgba(49,133,252,0.35)", color: "#cfe3ff" }}>
            After
          </div>
          <div className="mt-5 text-2xl md:text-3xl font-semibold !text-white leading-tight">
            A revenue decision. Not a score.
          </div>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              { v: "7 accounts", t: "at risk in Implementation × Operations", c: "var(--orange-pop)" },
              { v: "$4.2M", t: "expansion latent in Renewal × Executive", c: "var(--blue-light)" },
              { v: "51 pts", t: "Decision Maker → Influencer gap, 3 accounts", c: "var(--blue-light)" },
              { v: "$1.8M", t: "MDF re-routed to partners that grow accounts", c: "var(--blue-light)" },
            ].map((row) => (
              <li key={row.t} className="flex items-baseline gap-3 border-b border-white/10 pb-3 last:border-0">
                <span className="font-semibold tabular-nums shrink-0" style={{ color: row.c }}>{row.v}</span>
                <span className="text-white/85">{row.t}</span>
              </li>
            ))}
          </ul>
          <div
            aria-hidden
            className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-50"
            style={{ background: "radial-gradient(circle, rgba(49,133,252,0.55), transparent 70%)" }}
          />
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------- Decision Maker → Influencer Gap ---------------- */

export function InfluencerGapCard() {
  const { ref, shown } = useReveal(0.3);
  const rows = [
    { label: "Executive / Decision Maker", value: 72, color: "var(--blue-cta)" },
    { label: "Technical", value: 58, color: "var(--blue-light)" },
    { label: "Procurement / Commercial", value: 49, color: "var(--blue-light)" },
    { label: "Operations / Day-to-Day", value: 21, color: "var(--orange-pop)" },
  ];
  return (
    <div ref={ref} className="rounded-2xl hairline bg-white p-7 md:p-9 shadow-[var(--shadow-elevation-2)]">
      <div className="flex items-baseline justify-between">
        <div className="text-sm font-semibold text-[color:var(--navy-deep)]">Account: Acme Logistics</div>
        <div className="text-xs text-[color:var(--ink-soft)]">7-month read</div>
      </div>
      <div className="mt-7 space-y-6">
        {rows.map((r, i) => (
          <div key={r.label}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[color:var(--ink-soft)]">{r.label}</span>
              <span className="font-semibold text-[color:var(--navy-deep)] tabular-nums">NPS {r.value}</span>
            </div>
            <div className="h-2.5 rounded-full bg-[color:var(--gray-soft)] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: shown ? `${(r.value + 100) / 2}%` : "0%",
                  background: r.color,
                  transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 140}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 pt-5 border-t border-[color:var(--hairline)] text-sm text-[color:var(--ink-soft)]">
        Gap of <span className="font-semibold text-[color:var(--orange-pop)]">51 points</span> between executive and operations — flagged <span className="font-semibold text-[color:var(--navy-deep)]">7 months</span> before renewal.
      </div>
    </div>
  );
}
