import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { useReveal, useCountUp } from "@/hooks/use-reveal";
import { FadeIn, Floaty, Parallax, Stagger, StaggerItem } from "@/components/motion";
import { BOOK_PATH, type Brief } from "@/lib/links";

/* ---------------- Primitives ---------------- */

export function CTAButton({
  to,
  className,
  children,
}: {
  to: string;
  className: string;
  children: ReactNode;
}) {
  const newTab = to.startsWith("http");
  return (
    <a
      href={to}
      className={className}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
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

export function Section({
  children,
  className = "",
  tint = false,
  dark = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  tint?: boolean;
  dark?: boolean;
  id?: string;
}) {
  const bg = dark
    ? "bg-[color:var(--navy-deep)] text-white grain"
    : tint
      ? "bg-[color:var(--blue-tint)]"
      : "bg-white";
  return (
    <section id={id} className={`relative section-y ${bg} ${className}`}>
      {dark && (
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              animation: "aurora-drift 22s ease-in-out infinite",
              backgroundImage:
                "radial-gradient(720px 380px at 85% 8%, rgba(49,133,252,0.22), transparent 65%), radial-gradient(560px 320px at 8% 92%, rgba(0,86,167,0.30), transparent 65%), radial-gradient(360px 220px at 70% 95%, rgba(246,130,65,0.12), transparent 70%)",
            }}
          />
        </div>
      )}
      <div className="container-x relative">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
        {eyebrow && (
          <div className={`eyebrow mb-4 ${dark ? "!text-[color:var(--blue-light)]" : ""}`}>
            {eyebrow}
          </div>
        )}
        <h2 className={dark ? "!text-white" : ""}>{title}</h2>
        {intro && (
          <p
            className={`mt-5 text-lg md:text-[1.125rem] leading-relaxed ${dark ? "text-white/75" : "text-[color:var(--ink-soft)]"} max-w-[68ch]`}
          >
            {intro}
          </p>
        )}
      </div>
    </Reveal>
  );
}

export function Stat({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group relative overflow-hidden rounded-2xl hairline bg-white p-7 card-lift h-full">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
        />
        <div
          className="text-4xl md:text-5xl font-semibold text-[color:var(--navy-deep)] tracking-tight tabular-nums"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {value}
        </div>
        <div className="mt-3 text-sm text-[color:var(--ink-soft)] leading-relaxed">{label}</div>
      </div>
    </Reveal>
  );
}

export function Card({
  title,
  children,
  kicker,
  delay = 0,
  image,
}: {
  title: string;
  children: ReactNode;
  kicker?: string;
  delay?: number;
  image?: string;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`group relative overflow-hidden rounded-2xl hairline p-7 h-full card-lift ${
          image ? "flex min-h-[28rem] items-end bg-[color:var(--navy-deep)] text-white" : "bg-white"
        }`}
      >
        {image && (
          <>
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              loading="lazy"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[rgba(2,18,46,0.08)] via-[rgba(2,18,46,0.3)] to-[rgba(2,18,46,0.97)]"
            />
          </>
        )}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
        />
        <div className="relative z-10">
          {kicker && (
            <div className={`eyebrow mb-3 ${image ? "!text-[color:var(--blue-light)]" : ""}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--orange-pop)]" />
              {kicker}
            </div>
          )}
          <h3 className={`!text-xl ${image ? "!text-white" : ""}`}>{title}</h3>
          <div
            className={`mt-3 leading-relaxed ${image ? "text-white/78" : "text-[color:var(--ink-soft)]"}`}
          >
            {children}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- Partner shadow: channel visibility gap ---------------- */

function ShadowIcon({ type }: { type: "vendor" | "partner" | "customer" | "hidden" }) {
  if (type === "hidden") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.8 10.8 0 0 1 12 4c5.5 0 9 5 9 5a15.7 15.7 0 0 1-2.1 2.6M6.6 6.6C4.3 8 3 10 3 10s3.5 5 9 5c1 0 1.9-.2 2.8-.4" />
      </svg>
    );
  }
  if (type === "partner") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <path d="M8.5 12.5 11 15a2 2 0 0 0 2.8 0l4.7-4.7M14 7l-1-1a2.8 2.8 0 0 0-4 0L4.5 10.5M2 8l4 4M22 8l-4 4M7 13l2.5-2.5a2 2 0 0 1 2.8 0l1.2 1.2" />
      </svg>
    );
  }
  if (type === "customer") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden
      >
        <circle cx="12" cy="8" r="3" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M4 20V7l8-4 8 4v13M8 10h2m4 0h2m-8 4h2m4 0h2M9 20v-3h6v3" />
    </svg>
  );
}

export function CertifiedScoreSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" role="img" aria-label="VistaXM Certified Score, independently verified" className={className}>
      <defs>
        <path id="cs-top" d="M 20 100 A 80 80 0 0 1 180 100" />
        <path id="cs-bottom" d="M 180 100 A 80 80 0 0 1 20 100" />
      </defs>
      <circle cx="100" cy="100" r="97" stroke="#022550" strokeWidth="3" />
      <circle cx="100" cy="100" r="90" stroke="#022550" strokeWidth="1.25" />
      <circle cx="100" cy="100" r="72" stroke="#3185fc" strokeWidth="2" strokeDasharray="1.5 5.5" opacity="0.55" />
      <circle cx="100" cy="100" r="63" fill="#3185fc" fillOpacity="0.06" stroke="#022550" strokeWidth="1.25" />
      <text fill="#022550" fontSize="15.5" fontWeight="700" letterSpacing="3" fontFamily="var(--font-display), Georgia, serif">
        <textPath href="#cs-top" startOffset="50%" textAnchor="middle">CERTIFIED SCORE</textPath>
      </text>
      <text fill="#022550" fontSize="10.5" fontWeight="700" letterSpacing="3.4" fontFamily="system-ui, Helvetica, Arial, sans-serif">
        <textPath href="#cs-bottom" startOffset="50%" textAnchor="middle">INDEPENDENTLY VERIFIED</textPath>
      </text>
      <path d="M18 100 l3.5 -3.5 3.5 3.5 -3.5 3.5 z" fill="#f68241" />
      <path d="M175 100 l3.5 -3.5 3.5 3.5 -3.5 3.5 z" fill="#f68241" />
      <path d="M76 80 L76 120 L98 100 Z" fill="#022550" />
      <path d="M124 80 L124 120 L102 100 Z" fill="#3185fc" />
      <text x="100" y="142" textAnchor="middle" fontSize="12.5" fontWeight="800" letterSpacing="1.5" fontFamily="var(--font-display), Georgia, serif">
        <tspan fill="#022550">VISTA</tspan><tspan fill="#3185fc">XM</tspan>
      </text>
      <text x="150" y="64" fontSize="11" fontWeight="700" fill="#022550" fontFamily="system-ui, Helvetica, Arial, sans-serif">{"\u2122"}</text>
    </svg>
  );
}

function CROForecastGraphic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 176" fill="none" role="img" aria-label="A CRO viewing a healthy revenue forecast" className={className}>
      <rect width="320" height="176" rx="16" fill="#3185fc" fillOpacity="0.05" />
      <circle cx="66" cy="70" r="34" fill="#ffffff" stroke="#022550" strokeWidth="1.5" />
      <circle cx="66" cy="60" r="12" fill="#022550" />
      <path d="M44 92 a22 20 0 0 1 44 0" fill="#022550" />
      <rect x="34" y="118" width="64" height="16" rx="8" fill="#022550" />
      <text x="66" y="130" textAnchor="middle" fontSize="9" fontWeight="700" letterSpacing="1" fill="#ffffff" fontFamily="system-ui, Helvetica, Arial, sans-serif">CRO</text>
      <rect x="132" y="30" width="158" height="104" rx="12" fill="#ffffff" stroke="#022550" strokeWidth="1.5" />
      <text x="146" y="50" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="#3185fc" fontFamily="system-ui, Helvetica, Arial, sans-serif">FORECAST</text>
      <polyline points="146,112 172,100 196,104 222,86 250,72 276,54" stroke="#3185fc" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M146 118 L146 60" stroke="#022550" strokeOpacity="0.2" strokeWidth="1" />
      <path d="M146 118 L280 118" stroke="#022550" strokeOpacity="0.2" strokeWidth="1" />
      <circle cx="276" cy="54" r="4" fill="#f68241" />
      <path d="M262 44 l14 -10 4 16" fill="none" stroke="#f68241" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SignalFilterGraphic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 176" fill="none" role="img" aria-label="Many customer signals filtered down to a selective few" className={className}>
      <circle cx="60" cy="26" r="5" fill="#67a6ff" />
      <circle cx="96" cy="20" r="5" fill="#f68241" />
      <circle cx="132" cy="28" r="5" fill="#67a6ff" />
      <circle cx="168" cy="20" r="5" fill="#67a6ff" />
      <circle cx="204" cy="28" r="5" fill="#f68241" />
      <circle cx="240" cy="22" r="5" fill="#67a6ff" />
      <g stroke="#67a6ff" strokeWidth="1.6" strokeOpacity="0.55" fill="none">
        <path d="M60 32 C 90 60, 120 60, 150 74" />
        <path d="M96 26 C 120 56, 140 60, 152 74" />
        <path d="M132 34 L 156 74" />
        <path d="M168 26 L 164 74" />
        <path d="M204 34 C 190 56, 175 62, 168 74" />
        <path d="M240 28 C 210 58, 185 62, 170 74" />
      </g>
      <path d="M104 78 L216 78 L176 108 L144 108 Z" fill="#022550" stroke="#67a6ff" strokeWidth="2" />
      <line x1="120" y1="86" x2="200" y2="86" stroke="#67a6ff" strokeWidth="2" strokeOpacity="0.7" />
      <line x1="130" y1="94" x2="190" y2="94" stroke="#67a6ff" strokeWidth="2" strokeOpacity="0.7" />
      <line x1="140" y1="102" x2="180" y2="102" stroke="#67a6ff" strokeWidth="2" strokeOpacity="0.7" />
      <text x="160" y="70" textAnchor="middle" fontSize="8.5" fontWeight="700" letterSpacing="2" fill="#67a6ff" fontFamily="system-ui, Helvetica, Arial, sans-serif">FILTER</text>
      <path d="M160 108 L160 138" stroke="#f68241" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="160" cy="146" r="5" fill="#f68241" />
      <path d="M150 132 l10 12 10 -12" fill="none" stroke="#f68241" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PartnerShadow() {
  const signals = ["Onboarding friction", "Support fatigue", "Operational risk"];

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -right-52 -top-52 h-[30rem] w-[30rem] rounded-full bg-[color:var(--blue-pale)]/55 blur-3xl"
      />
      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
        <SectionHead
          eyebrow="The partner shadow"
          title={
            <>
              Your customer is speaking.
              <br />
              You’re just not in the room.
            </>
          }
        />
        <Reveal delay={100}>
          <p className="max-w-xl text-lg leading-relaxed text-[color:var(--ink-soft)] lg:pb-1">
            When a partner or broker owns the relationship, the vendor sees the forecast, not the
            experience behind it. The signals that predict churn stay hidden until the renewal is
            already at risk.
          </p>
        </Reveal>
      </div>

      <Reveal delay={160} className="mt-12">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_30px_80px_-40px_rgba(2,37,80,.35)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--hairline)] px-5 py-4 md:px-7">
            <div className="flex items-center gap-2 text-sm font-semibold text-[color:var(--navy-deep)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
                <ShadowIcon type="hidden" />
              </span>
              Channel visibility map
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.12em] text-[color:var(--ink-soft)]/60">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[color:var(--orange-pop)]" />
              Revenue risk forms here
            </div>
          </div>

          <div className="relative grid lg:grid-cols-[1fr_1.08fr_1fr]">
            <div className="relative flex min-h-[25rem] flex-col justify-between p-5 md:p-7 lg:border-r lg:border-[color:var(--hairline)]">
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <span className="eyebrow !text-[color:var(--navy-mid)]">01 · Vendor</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
                    <ShadowIcon type="vendor" />
                  </span>
                </div>
                <h3 className="!text-[1.55rem]">The reported view</h3>
                <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-[color:var(--ink-soft)]/75">
                  Pipeline, forecasts, and a relationship status filtered through the partner.
                </p>
              </div>
              <div className="relative mt-7 h-44 overflow-hidden rounded-2xl">
                <img
                  src="/images/partner-shadow/vendor.jpg"
                  alt="Vendor team reviewing channel performance"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,37,80,.82)] via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-xs font-semibold text-white">
                  <span>Partner forecast</span>
                  <span className="rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">
                    Looks healthy
                  </span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex min-h-[25rem] flex-col bg-[color:var(--navy-deep)] p-5 text-white md:p-7 lg:-my-3 lg:rounded-[1.4rem] lg:shadow-[0_24px_60px_-28px_rgba(2,37,80,.7)]">
              <div aria-hidden className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <div className="absolute -right-20 top-10 h-52 w-52 rounded-full bg-[color:var(--blue-cta)]/25 blur-3xl" />
              </div>
              <div className="relative mb-5 flex items-center justify-between">
                <span className="eyebrow !text-[color:var(--blue-light)]">
                  02 · Partner / Broker
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[color:var(--blue-light)]">
                  <ShadowIcon type="partner" />
                </span>
              </div>
              <h3 className="relative !text-[1.55rem] !text-white">The information filter</h3>
              <p className="relative mt-3 max-w-[32ch] text-[15px] leading-relaxed text-white/68">
                What moves the deal gets shared. What threatens the relationship rarely gets written
                down.
              </p>
              <div className="relative mt-auto pt-7">
                <div className="relative h-44 overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src="/images/partner-shadow/partner-broker.jpg"
                    alt="Partner responsible for the customer relationship"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[color:var(--navy-deep)]/25" />
                  <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-[rgba(2,37,80,.78)] px-4 py-3 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/55">Signal transmitted</span>
                      <span className="font-semibold text-white">Selective</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex min-h-[25rem] flex-col justify-between border-t border-[color:var(--hairline)] p-5 md:p-7 lg:border-l lg:border-t-0">
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <span className="eyebrow !text-[color:var(--orange-pop)]">03 · End customer</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[color:var(--orange-pop)]">
                    <ShadowIcon type="customer" />
                  </span>
                </div>
                <h3 className="!text-[1.55rem]">The actual experience</h3>
                <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed text-[color:var(--ink-soft)]/75">
                  Small moments of friction compound quietly into a renewal decision.
                </p>
              </div>
              <div className="mt-7 overflow-hidden rounded-2xl border border-orange-100 bg-orange-50/60">
                <div className="h-24 overflow-hidden">
                  <img
                    src="/images/partner-shadow/end-customer.jpg"
                    alt="Customer experiencing unresolved service friction"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-2 p-3">
                  {signals.map((signal, index) => (
                    <div
                      key={signal}
                      className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs shadow-sm"
                    >
                      <span className="font-medium text-[color:var(--navy-deep)]">{signal}</span>
                      <span
                        className={
                          index === 2
                            ? "font-semibold text-red-600"
                            : "font-semibold text-[color:var(--orange-pop)]"
                        }
                      >
                        {index === 2 ? "High" : "Rising"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 border-t border-[color:var(--hairline)] bg-[color:var(--blue-tint)]/65 px-5 py-5 md:grid-cols-[1fr_auto] md:items-center md:px-7">
            <p className="text-sm font-medium text-[color:var(--navy-deep)]">
              The partner shadow is not a data gap. It is a{" "}
              <span className="text-[color:var(--orange-pop)]">revenue warning system</span> no one
              has instrumented.
            </p>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--blue-pale)] bg-white px-3 py-1.5 text-xs font-semibold text-[color:var(--blue-link)]">
              VistaXM makes the invisible measurable
            </span>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------- Hero ----------------
   The hero pairs the revenue-and-decision message with a single, embedded
   "next move" signal. The right-side card is illustrative example data only
   (see RevenueSignalCard), never a real client result. */

/* Dotted "data terrain" that drifts along the lower-left of the hero. */
function HeroDataWave() {
  // Round trig-derived values: Node (SSR) and browser V8 differ in the last
  // ULPs of Math.sin/cos, which would otherwise cause hydration mismatches.
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const cols = 50;
  const span = 1200;
  const step = span / cols;
  const dots: { x: number; y: number; o: number; d: number }[] = [];
  for (let i = 0; i < cols; i++) {
    const x = i * step;
    const baseY = 300 - Math.sin(i * 0.28) * 34 - Math.cos(i * 0.11) * 18 - i * 1.1;
    const stack = 3 + (i % 4);
    for (let k = 0; k < stack; k++) {
      dots.push({
        x: r2(x),
        y: r2(baseY - k * 16),
        o: r2(Math.max(0.12, 0.6 - k * 0.12)),
        d: r2((i * 0.06 + k * 0.22) % 4),
      });
    }
  }
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 z-0 hidden h-[340px] w-[78%] overflow-hidden sm:block"
      style={{ maskImage: "linear-gradient(90deg, #000 55%, transparent 100%)" }}
    >
      <svg
        viewBox="0 0 1200 360"
        preserveAspectRatio="xMidYMax meet"
        className="absolute inset-0 h-full w-full"
        style={{ animation: "wave-drift 14s linear infinite alternate" }}
      >
        {dots.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={2.1}
            fill="#67a6ff"
            opacity={p.o}
            style={{
              animation: `dot-twinkle ${3.2 + (i % 5) * 0.4}s ${p.d}s ease-in-out infinite`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  trust,
}: {
  eyebrow?: string | string[];
  title: ReactNode;
  subtitle?: ReactNode;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  trust?: string;
}) {
  const { ref, shown } = useReveal(0.05);
  const reveal = (delay: number): CSSProperties => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(16px)",
    transition:
      "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
    transitionDelay: `${delay}ms`,
  });

  const eyebrowItems = eyebrow ? (Array.isArray(eyebrow) ? eyebrow : [eyebrow]) : [];

  return (
    <section className="hero-rci relative overflow-hidden bg-[#022550] text-white">
      {/* Background depth: gradient base, glow zones, vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(1100px 620px at 78% 18%, rgba(13,78,216,0.34), transparent 62%)," +
            "radial-gradient(900px 700px at 96% 78%, rgba(37,99,235,0.22), transparent 60%)," +
            "linear-gradient(160deg, #062a68 0%, #041b4a 46%, #03153a 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(820px 560px at 74% 30%, rgba(49,133,252,0.16), transparent 60%)",
          animation: "aurora-drift 24s ease-in-out infinite",
        }}
      />
      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ boxShadow: "inset 0 0 220px 60px rgba(3,15,42,0.55)" }}
      />
      <HeroDataWave />

      <div ref={ref} className="container-x relative z-10 pt-20 pb-24 md:pt-24 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-12">
          {/* Left column: the message */}
          <div className="max-w-[580px]">
            {eyebrowItems.length > 0 && (
              <div className="flex flex-wrap gap-2" style={reveal(0)}>
                {eyebrowItems.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(103,166,255,0.32)] bg-[rgba(13,78,216,0.18)] px-3.5 py-1.5 text-[0.78rem] font-semibold text-[#9cc4ff] backdrop-blur-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#67a6ff] shadow-[0_0_8px_2px_rgba(103,166,255,0.7)]" />
                    {item}
                  </span>
                ))}
              </div>
            )}
            <h1
              className="mt-6 !text-[2.3rem] !font-bold !leading-[1.04] !tracking-[-0.028em] !text-white sm:!text-[2.7rem] md:!text-[3.15rem] lg:!text-[3.35rem]"
              style={reveal(120)}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="mt-6 max-w-[470px] text-[1rem] leading-relaxed text-[#b8c6e3] md:text-[1.05rem]"
                style={reveal(260)}
              >
                {subtitle}
              </p>
            )}
            {(primary || secondary) && (
              <div className="mt-8 flex flex-wrap gap-3.5" style={reveal(400)}>
                {primary && (
                  <CTAButton to={primary.to} className="btn-primary">
                    {primary.label}
                  </CTAButton>
                )}
                {secondary && (
                  <a
                    href={secondary.to}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2a5183] bg-white/[0.02] px-6 py-3.5 text-[0.9375rem] font-semibold text-[#cfe3ff] transition-[transform,background-color,border-color] duration-200 hover:border-[#67a6ff] hover:bg-white/[0.06] active:scale-[0.98]"
                  >
                    {secondary.label}
                  </a>
                )}
              </div>
            )}
            {trust && (
              <div
                className="mt-7 flex items-center gap-2.5 text-[0.85rem] text-[#9fc0e8]"
                style={reveal(540)}
              >
                <ShieldCheckIcon className="h-[18px] w-[18px] flex-none text-[#67a6ff]" />
                {trust}
              </div>
            )}
          </div>

          {/* Right column: the revenue decision network (lg+) / signal card fallback */}
          <div className="w-full lg:justify-self-end">
            <div className="hidden lg:block">
              <RevenueDecisionNetwork />
            </div>
            <div className="mx-auto max-w-[360px] lg:hidden">
              <RevenueSignalCard />
            </div>
          </div>
        </div>
      </div>
      {/* hairline base */}
      <div className="absolute bottom-0 inset-x-0 z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}

/* ---------------- Hero icons (Tabler-style, decorative) ---------------- */

function HeroIcon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <HeroIcon className={className}>
      <path d="M10 5a2 2 0 1 1 4 0 7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </HeroIcon>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <HeroIcon className={className}>
      <path d="M5 4h4l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
    </HeroIcon>
  );
}

function CircleCheckIcon({ className }: { className?: string }) {
  return (
    <HeroIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </HeroIcon>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <HeroIcon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </HeroIcon>
  );
}

function UserPlusIcon({ className }: { className?: string }) {
  return (
    <HeroIcon className={className}>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-1a5 5 0 0 1 5-5h2" />
      <path d="M16 11h6M19 8v6" />
    </HeroIcon>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <HeroIcon className={className}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </HeroIcon>
  );
}

/* ---------------- Revenue decision network (hero right visual) ----------------
   A floating "revenue intelligence decision map": a glowing central hub, six
   metric cards, and a recommended-action card, wired together with illuminated
   connectors carrying signal pulses. Built on a fixed 640x600 design canvas; an
   SVG (same viewBox) draws the connectors/rings while cards are positioned in
   container-query units so the whole composition scales without distortion.
   All values are illustrative example data, never a real client result. */

const NET_W = 600;
const NET_H = 660;
const HUB = { x: 300, y: 300 };
// Symmetric 2-column x 3-row layout: left/right columns equidistant from the
// hub, three evenly-spaced rows. Keeps the network balanced rather than fanned.
const COL_L = 108;
const COL_R = NET_W - COL_L; // 492
// Middle row sits wider than top/bottom so the two side cards pull away from
// the hub (a gentle outward bulge at the widest point of the network).
const COL_MID_L = 63;
const COL_MID_R = NET_W - COL_MID_L; // 537
const ROW_TOP = 170;
const ROW_MID = HUB.y; // 300: middle cards align with the hub
const ROW_BOT = HUB.y + (HUB.y - ROW_TOP); // 430
// The problem statement sits at the top and feeds the decision hub.
const PROBLEM = { x: HUB.x, y: 60 };

type Accent = "orange" | "blue" | "green";
type ChartKind = "spark-down" | "line-up" | "bars" | "progress";

const ACCENTS: Record<
  Accent,
  { stroke: string; icon: string; ring: string; border: string; glow: string }
> = {
  orange: {
    stroke: "#f9a26a",
    icon: "#f68241",
    ring: "rgba(246,130,65,0.16)",
    border: "rgba(246,130,65,0.34)",
    glow: "rgba(246,130,65,0.22)",
  },
  blue: {
    stroke: "#67a6ff",
    icon: "#3185fc",
    ring: "rgba(49,133,252,0.18)",
    border: "rgba(49,133,252,0.36)",
    glow: "rgba(49,133,252,0.24)",
  },
  green: {
    stroke: "#5ee0b0",
    icon: "#22c55e",
    ring: "rgba(52,211,153,0.16)",
    border: "rgba(52,211,153,0.36)",
    glow: "rgba(52,211,153,0.22)",
  },
};

type NetCard = {
  x: number;
  y: number;
  accent: Accent;
  icon: "alert" | "arrow-up" | "people" | "shield" | "gauge" | "graph";
  title: string;
  metric: string;
  support: string;
  chart: ChartKind;
};

const NET_CARDS: NetCard[] = [
  {
    x: COL_L,
    y: ROW_TOP,
    accent: "orange",
    icon: "alert",
    title: "Revenue at risk",
    metric: "$1.2M",
    support: "revenue at risk",
    chart: "spark-down",
  },
  {
    x: COL_R,
    y: ROW_TOP,
    accent: "blue",
    icon: "arrow-up",
    title: "Expansion opportunity",
    metric: "$480K",
    support: "expansion potential",
    chart: "line-up",
  },
  {
    x: COL_MID_L,
    y: ROW_MID,
    accent: "blue",
    icon: "people",
    title: "Partner-sourced growth",
    metric: "+18%",
    support: "vs last 90 days",
    chart: "bars",
  },
  {
    x: COL_MID_R,
    y: ROW_MID,
    accent: "green",
    icon: "shield",
    title: "Renewal confidence",
    metric: "61%",
    support: "confidence score",
    chart: "progress",
  },
  {
    x: COL_L,
    y: ROW_BOT,
    accent: "orange",
    icon: "gauge",
    title: "Margin pressure",
    metric: "-3.2 pts",
    support: "gross margin impact",
    chart: "spark-down",
  },
  {
    x: COL_R,
    y: ROW_BOT,
    accent: "blue",
    icon: "graph",
    title: "Pipeline shift",
    metric: "$2.7M",
    support: "at risk next quarter",
    chart: "bars",
  },
];

const ACTION = { x: HUB.x, y: 566 };

/* ---- Orchestrated entrance timeline (seconds) ----
   One-time, chronological reveal: the problem box appears, a dot flies down
   into the hub, then the hub radiates a signal out to each box in turn and the
   box only pops when its signal arrives. The action card is strictly last. */
const POP = 0.45; // box / hub entrance duration
const P2H_START = 0.35; // problem -> hub dot launch
const P2H_TRAVEL = 0.45; // problem -> hub dot travel
const HUB_REVEAL = P2H_START + P2H_TRAVEL; // hub pops when the dot arrives (~0.8s)
const LINE = 0.35; // hub -> box connector draw + dot travel
const STAGGER = 0.45; // gap between consecutive spokes
const CARD_BASE = 1.25; // first spoke's line/dot launch
const ACTION_BEAT = 0.15; // extra pause before the finale
const ENTRANCE_MS = 5000; // when the ambient loops take over

// Spoke i in 0..6 (6 == ACTION). When its connector/dot launches from the hub.
const spokeStart = (i: number) => CARD_BASE + i * STAGGER + (i === 6 ? ACTION_BEAT : 0);
// When the box pops: the moment its signal arrives.
const cardReveal = (i: number) => spokeStart(i) + LINE;

// design unit -> scaled length (640 design units == container inline width)
const u = (n: number) => `calc(${n} * var(--net-u))`;

function NetIcon({ kind, color }: { kind: NetCard["icon"]; color: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    width: "100%",
    height: "100%",
    "aria-hidden": true,
  };
  switch (kind) {
    case "alert":
      return (
        <svg {...common}>
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
          <path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
        </svg>
      );
    case "arrow-up":
      return (
        <svg {...common}>
          <path d="M7 14l5-5 5 5" />
          <path d="M12 9v10" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
          <path d="M16 5.2a3 3 0 0 1 0 5.6" />
          <path d="M21 20v-1a5 5 0 0 0-3-4.6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "gauge":
      return (
        <svg {...common}>
          <path d="M4 18a8 8 0 1 1 16 0" />
          <path d="M12 18l4-5" />
          <circle cx="12" cy="18" r="1.2" fill={color} stroke="none" />
        </svg>
      );
    case "graph":
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M8 15l3-3 3 2 4-5" />
        </svg>
      );
  }
}

function MiniChart({ kind, accent }: { kind: ChartKind; accent: Accent }) {
  const c = ACCENTS[accent];
  if (kind === "progress") {
    return (
      <svg viewBox="0 0 64 18" width="100%" height="100%" aria-hidden>
        <rect x="0" y="7" width="64" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect
          x="0"
          y="7"
          width="39"
          height="4"
          rx="2"
          fill={c.icon}
          style={{ transformOrigin: "left center", animation: "bar-grow 1.1s 0.3s both ease-out" }}
        />
        <circle cx="39" cy="9" r="4" fill="#06294e" stroke={c.stroke} strokeWidth="1.6" />
      </svg>
    );
  }
  if (kind === "bars") {
    const hs = [9, 5, 12, 8, 14, 11];
    return (
      <svg viewBox="0 0 64 18" width="100%" height="100%" aria-hidden>
        {hs.map((h, i) => (
          <rect
            key={i}
            x={i * 11 + 1}
            y={18 - h}
            width="6"
            height={h}
            rx="1.4"
            fill={c.stroke}
            opacity={0.55 + i * 0.07}
            style={{
              transformOrigin: "center bottom",
              animation: `bar-grow 0.7s ${0.25 + i * 0.08}s both cubic-bezier(0.22,1,0.36,1)`,
            }}
          />
        ))}
      </svg>
    );
  }
  // line charts (up or down)
  const pts =
    kind === "line-up" ? "0,15 12,12 24,13 36,7 48,8 64,2" : "0,4 12,6 24,5 36,10 48,9 64,15";
  return (
    <svg viewBox="0 0 64 18" width="100%" height="100%" aria-hidden>
      <defs>
        <linearGradient id={`mg-${accent}-${kind}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.stroke} stopOpacity="0.32" />
          <stop offset="100%" stopColor={c.stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${pts} 64,18 0,18`} fill={`url(#mg-${accent}-${kind})`} opacity="0.9" />
      <polyline
        points={pts}
        fill="none"
        stroke={c.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        style={{
          strokeDasharray: 100,
          strokeDashoffset: 100,
          animation: "draw-line 1.3s 0.3s ease forwards",
        }}
      />
    </svg>
  );
}

function NetMetricCard({ card, delay, shown }: { card: NetCard; delay: number; shown: boolean }) {
  const c = ACCENTS[card.accent];
  return (
    <div
      className="absolute"
      style={{
        left: u(card.x),
        top: u(card.y),
        width: u(150),
        // Center on the anchor point. The float animation lives on the inner
        // element so its transform does not clobber this centering.
        transform: "translate(-50%, -50%)",
        // Entrance: stay hidden until the hub's signal reaches this box.
        opacity: shown ? undefined : 0,
        animation: shown ? `net-pop ${POP}s ${delay}s both` : undefined,
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: u(15),
          padding: `${u(13)} ${u(14)}`,
          background: "linear-gradient(165deg, rgba(10,42,80,0.92), rgba(5,28,58,0.94))",
          border: `1px solid ${c.border}`,
          boxShadow: `0 ${u(18)} ${u(40)} rgba(2,16,40,0.55), 0 0 ${u(26)} ${c.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
          backdropFilter: "blur(8px)",
          animation: `float-y-sm ${6 + (delay % 3)}s ease-in-out ${delay}s infinite`,
        }}
      >
        <div className="flex items-center" style={{ gap: u(8) }}>
          <span
            className="flex flex-none items-center justify-center"
            style={{
              width: u(26),
              height: u(26),
              borderRadius: u(8),
              background: c.ring,
              border: `1px solid ${c.border}`,
              padding: u(5),
            }}
          >
            <NetIcon kind={card.icon} color={c.icon} />
          </span>
          <span
            className="font-semibold leading-tight text-white/85"
            style={{ fontSize: u(11.5), letterSpacing: "-0.01em" }}
          >
            {card.title}
          </span>
        </div>
        <div
          className="font-bold leading-none text-white"
          style={{ fontFamily: "var(--font-display)", fontSize: u(25), marginTop: u(11) }}
        >
          {card.metric}
        </div>
        <div className="flex items-center justify-between" style={{ marginTop: u(8), gap: u(8) }}>
          <span className="text-white/55" style={{ fontSize: u(9.8), letterSpacing: "0.01em" }}>
            {card.support}
          </span>
          <span className="flex-none" style={{ width: u(46), height: u(15) }}>
            <MiniChart kind={card.chart} accent={card.accent} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* The problem statement at the top of the network: an orange-accented "issue"
   box that feeds the decision hub below it. Outer div centers on the anchor;
   inner div carries the float so its transform does not clobber centering. */
function ProblemBox({ shown, delay }: { shown: boolean; delay: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: u(PROBLEM.x),
        top: u(PROBLEM.y),
        width: u(258),
        transform: "translate(-50%, -50%)",
        // Entrance: the problem is the first thing to appear.
        opacity: shown ? undefined : 0,
        animation: shown ? `net-pop ${POP}s ${delay}s both` : undefined,
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: u(15),
          padding: `${u(13)} ${u(16)}`,
          background: "linear-gradient(165deg, rgba(58,33,18,0.62), rgba(7,28,58,0.93))",
          border: "1px solid rgba(246,130,65,0.42)",
          boxShadow: `0 ${u(20)} ${u(44)} rgba(2,16,40,0.55), 0 0 ${u(30)} rgba(246,130,65,0.2), inset 0 1px 0 rgba(255,255,255,0.07)`,
          backdropFilter: "blur(8px)",
          animation: "float-y-sm 7s ease-in-out 0.15s infinite",
        }}
      >
        <div className="flex items-center" style={{ gap: u(8) }}>
          <span
            className="flex flex-none items-center justify-center"
            style={{
              width: u(26),
              height: u(26),
              borderRadius: u(8),
              background: "rgba(246,130,65,0.16)",
              border: "1px solid rgba(246,130,65,0.4)",
              padding: u(5),
            }}
          >
            <NetIcon kind="alert" color="#f68241" />
          </span>
          <span
            className="font-semibold uppercase"
            style={{ fontSize: u(10.5), letterSpacing: "0.14em", color: "#f9a26a" }}
          >
            The problem
          </span>
        </div>
        <div
          className="font-bold leading-snug text-white"
          style={{ fontFamily: "var(--font-display)", fontSize: u(15.5), marginTop: u(9) }}
        >
          A score won&apos;t tell you which account is about to walk.
        </div>
      </div>
    </div>
  );
}

/* A sleeker "next move" arrow: a forward arrow that nudges with a motion
   trail, inside a glowing badge. */
function NextMoveArrow() {
  return (
    <span
      className="relative flex flex-none items-center justify-center overflow-hidden"
      style={{
        width: u(24),
        height: u(24),
        borderRadius: u(8),
        background: "linear-gradient(135deg, rgba(49,133,252,0.42), rgba(13,78,216,0.16))",
        border: "1px solid rgba(103,166,255,0.55)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 12px rgba(49,133,252,0.5)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="64%"
        height="64%"
        fill="none"
        stroke="#dbeafe"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {/* fading motion trail behind the arrow */}
        <path
          d="M2 12h6"
          stroke="#67a6ff"
          strokeWidth="2"
          style={{ animation: "arrow-trail 1.8s ease-in-out infinite" }}
        />
        {/* the arrow itself, nudging forward */}
        <g style={{ animation: "arrow-nudge 1.8s ease-in-out infinite" }}>
          <path d="M5 12h9" />
          <path d="M11.5 7.5l5 4.5-5 4.5" />
        </g>
      </svg>
    </span>
  );
}

function NetActionCard({ shown, delay }: { shown: boolean; delay: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: u(ACTION.x),
        top: u(ACTION.y),
        width: u(200),
        transform: "translate(-50%, -50%)",
        // Entrance: the "next best move" is the finale, revealed last.
        opacity: shown ? undefined : 0,
        animation: shown ? `net-pop ${POP}s ${delay}s both` : undefined,
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: u(16),
          padding: `${u(15)} ${u(16)}`,
          background: "linear-gradient(165deg, rgba(11,46,92,0.96), rgba(5,28,58,0.97))",
          border: "1px solid rgba(49,133,252,0.42)",
          boxShadow: `0 ${u(24)} ${u(50)} rgba(2,16,40,0.6), 0 0 ${u(34)} rgba(49,133,252,0.28), inset 0 1px 0 rgba(255,255,255,0.07)`,
          backdropFilter: "blur(8px)",
          animation: "float-y-sm 7.5s ease-in-out 0.4s infinite",
        }}
      >
        <div className="flex items-center" style={{ gap: u(7) }}>
          <NextMoveArrow />
          <span
            className="font-semibold uppercase text-[color:var(--blue-light)]"
            style={{ fontSize: u(10), letterSpacing: "0.12em" }}
          >
            Next best move
          </span>
        </div>
        <div
          className="font-bold leading-snug text-white"
          style={{ fontFamily: "var(--font-display)", fontSize: u(17.5), marginTop: u(10) }}
        >
          Re-engage the day-to-day team now
        </div>
        <div className="flex items-center" style={{ gap: u(6), marginTop: u(9) }}>
          <span className="flex-none" style={{ width: u(13), height: u(13) }}>
            <ClockIcon className="h-full w-full text-[#9fc0e8]" />
          </span>
          <span className="text-white/60" style={{ fontSize: u(10.5) }}>
            58 days to renewal
          </span>
        </div>
        <a
          href={BOOK_PATH}
          className="flex items-center justify-center font-semibold text-white transition-[transform,box-shadow] hover:brightness-110 active:scale-[0.98]"
          style={{
            marginTop: u(13),
            width: "100%",
            borderRadius: u(9),
            padding: `${u(9)} ${u(12)}`,
            fontSize: u(11.5),
            background: "var(--blue-cta)",
            boxShadow: `0 ${u(8)} ${u(18)} rgba(49,133,252,0.45)`,
          }}
        >
          Take action
        </a>
      </div>
    </div>
  );
}

export function RevenueDecisionNetwork() {
  const { ref, shown } = useReveal(0.1);
  const targets = [...NET_CARDS.map((c) => ({ x: c.x, y: c.y })), ACTION];

  // Once the entrance has played, hand off to the ambient (looping) signals.
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!shown) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setEntered(true);
      return;
    }
    const t = setTimeout(() => setEntered(true), ENTRANCE_MS);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full"
      style={{
        maxWidth: 560,
        aspectRatio: `${NET_W} / ${NET_H}`,
        // NET_W design units span the container's inline width
        ["--net-u" as string]: `calc(100cqi / ${NET_W})`,
        containerType: "inline-size",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition:
          "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Connectors, radar rings and anchor dots (under the cards) */}
      <svg
        viewBox={`0 0 ${NET_W} ${NET_H}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient id="net-ring" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="rgba(103,166,255,0)" />
            <stop offset="100%" stopColor="rgba(103,166,255,0.12)" />
          </radialGradient>
          {/* One gradient per connector in user space so it paints at any angle
              (an objectBoundingBox gradient does not render on a perfectly
              horizontal/vertical line, which would drop the middle connectors). */}
          {targets.map((t, i) => (
            <linearGradient
              key={`cg${i}`}
              id={`conn-${i}`}
              gradientUnits="userSpaceOnUse"
              x1={HUB.x}
              y1={HUB.y}
              x2={t.x}
              y2={t.y}
            >
              <stop offset="0%" stopColor="rgba(103,166,255,0.6)" />
              <stop offset="100%" stopColor="rgba(103,166,255,0.1)" />
            </linearGradient>
          ))}
          {/* Problem -> hub: orange at the problem fading to blue at the engine. */}
          <linearGradient
            id="conn-problem"
            gradientUnits="userSpaceOnUse"
            x1={PROBLEM.x}
            y1={PROBLEM.y}
            x2={HUB.x}
            y2={HUB.y}
          >
            <stop offset="0%" stopColor="rgba(246,130,65,0.6)" />
            <stop offset="100%" stopColor="rgba(103,166,255,0.12)" />
          </linearGradient>
        </defs>

        {/* Faint radar rings behind the hub */}
        {[150, 116, 84].map((r) => (
          <circle
            key={r}
            cx={HUB.x}
            cy={HUB.y}
            r={r}
            fill="none"
            stroke="rgba(120,170,255,0.14)"
            strokeWidth="1"
          />
        ))}
        <circle cx={HUB.x} cy={HUB.y} r="190" fill="url(#net-ring)" />
        {/* faint outer radar arc */}
        <path
          d={`M ${HUB.x - 220} ${HUB.y} A 220 220 0 0 1 ${HUB.x + 220} ${HUB.y}`}
          fill="none"
          stroke="rgba(120,170,255,0.1)"
          strokeWidth="1"
          strokeDasharray="2 7"
        />

        {/* Connector lines from hub to each card. Each draws outward from the
            hub so the line reaches the box exactly as the box pops in. */}
        {targets.map((t, i) => (
          <line
            key={i}
            x1={HUB.x}
            y1={HUB.y}
            x2={t.x}
            y2={t.y}
            stroke={`url(#conn-${i})`}
            strokeWidth="1.4"
            pathLength={100}
            style={{
              strokeDasharray: 100,
              strokeDashoffset: 100,
              animation: shown
                ? `draw-line ${LINE}s ${spokeStart(i)}s ease-out forwards`
                : undefined,
            }}
          />
        ))}

        {/* Problem -> hub connector (feeds the engine from the top) */}
        <line
          x1={PROBLEM.x}
          y1={PROBLEM.y}
          x2={HUB.x}
          y2={HUB.y}
          stroke="url(#conn-problem)"
          strokeWidth="1.6"
          pathLength={100}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 100,
            animation: shown
              ? `draw-line ${P2H_TRAVEL}s ${P2H_START}s ease-out forwards`
              : undefined,
          }}
        />

        {/* Anchor dots on the hub ring at each connector angle.
            Round trig output so SSR (Node) and client (browser) match. */}
        {targets.map((t, i) => {
          const ang = Math.atan2(t.y - HUB.y, t.x - HUB.x);
          const rr = 76;
          return (
            <circle
              key={`a${i}`}
              cx={Math.round((HUB.x + Math.cos(ang) * rr) * 100) / 100}
              cy={Math.round((HUB.y + Math.sin(ang) * rr) * 100) / 100}
              r="3"
              fill="#9cc4ff"
              style={{
                filter: "drop-shadow(0 0 4px rgba(103,166,255,0.9))",
                opacity: shown ? undefined : 0,
                animation: shown ? `net-fade 0.3s ${spokeStart(i)}s both` : undefined,
              }}
            />
          );
        })}
        {/* Anchor dot where the problem connector meets the top of the hub ring */}
        <circle
          cx={HUB.x}
          cy={HUB.y - 76}
          r="3"
          fill="#f9a26a"
          style={{
            filter: "drop-shadow(0 0 4px rgba(246,130,65,0.9))",
            opacity: shown ? undefined : 0,
            animation: shown ? `net-fade 0.3s ${HUB_REVEAL}s both` : undefined,
          }}
        />
      </svg>

      {/* Entrance (one-shot): a dot flies from the problem down into the hub,
          then the hub fires a dot out to each box, landing as the box pops. */}
      {!entered && (
        <>
          <span
            className="absolute rounded-full"
            aria-hidden
            style={{
              left: u(PROBLEM.x),
              top: u(PROBLEM.y),
              width: u(6),
              height: u(6),
              marginLeft: u(-3),
              marginTop: u(-3),
              background: "#ffd2b5",
              boxShadow: "0 0 8px 2px rgba(246,130,65,0.8)",
              opacity: 0,
              ["--dx" as string]: u(0),
              ["--dy" as string]: u(HUB.y - PROBLEM.y),
              animation: shown
                ? `signal-travel ${P2H_TRAVEL}s ${P2H_START}s ease-out 1 both`
                : undefined,
            }}
          />
          {targets.map((t, i) => (
            <span
              key={`ed${i}`}
              className="absolute rounded-full"
              aria-hidden
              style={{
                left: u(HUB.x),
                top: u(HUB.y),
                width: u(6),
                height: u(6),
                marginLeft: u(-3),
                marginTop: u(-3),
                background: "#bcdcff",
                boxShadow: "0 0 8px 2px rgba(120,170,255,0.8)",
                opacity: 0,
                ["--dx" as string]: u(t.x - HUB.x),
                ["--dy" as string]: u(t.y - HUB.y),
                animation: shown
                  ? `signal-travel ${LINE}s ${spokeStart(i)}s ease-out 1 both`
                  : undefined,
              }}
            />
          ))}
        </>
      )}

      {/* Ambient (looping) signal pulses, once the entrance has finished. */}
      {entered && (
        <>
          {targets.map((t, i) => (
            <span
              key={`p${i}`}
              className="absolute rounded-full"
              aria-hidden
              style={{
                left: u(HUB.x),
                top: u(HUB.y),
                width: u(6),
                height: u(6),
                marginLeft: u(-3),
                marginTop: u(-3),
                background: "#bcdcff",
                boxShadow: "0 0 8px 2px rgba(120,170,255,0.8)",
                ["--dx" as string]: u(t.x - HUB.x),
                ["--dy" as string]: u(t.y - HUB.y),
                animation: `signal-travel ${3.4 + (i % 3) * 0.5}s ${i * 0.55}s ease-in-out infinite`,
              }}
            />
          ))}
          <span
            className="absolute rounded-full"
            aria-hidden
            style={{
              left: u(PROBLEM.x),
              top: u(PROBLEM.y),
              width: u(6),
              height: u(6),
              marginLeft: u(-3),
              marginTop: u(-3),
              background: "#ffd2b5",
              boxShadow: "0 0 8px 2px rgba(246,130,65,0.8)",
              ["--dx" as string]: u(0),
              ["--dy" as string]: u(HUB.y - PROBLEM.y),
              animation: "signal-travel 3s 0.3s ease-in-out infinite",
            }}
          />
        </>
      )}

      {/* Central hub. Gated as one unit so its radar rings and glow (children)
          do not emit before the problem's dot has reached the hub. */}
      <div
        className="absolute"
        style={{
          left: u(HUB.x),
          top: u(HUB.y),
          width: u(150),
          height: u(150),
          transform: "translate(-50%, -50%)",
          opacity: shown ? undefined : 0,
          animation: shown ? `net-pop ${POP}s ${HUB_REVEAL}s both` : undefined,
        }}
      >
        {/* expanding signal rings */}
        {[0, 1.3].map((d) => (
          <span
            key={d}
            className="absolute inset-0 rounded-full"
            aria-hidden
            style={{
              border: "1px solid rgba(103,166,255,0.5)",
              animation: `radar-emit 3.8s ${d}s ease-out infinite`,
            }}
          />
        ))}
        {/* glow halo */}
        <span
          className="absolute rounded-full"
          aria-hidden
          style={{
            inset: u(-22),
            background: "radial-gradient(circle, rgba(49,133,252,0.4), transparent 68%)",
            animation: "hub-breath 5s ease-in-out infinite",
          }}
        />
        {/* hub disc */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-full text-center"
          style={{
            background:
              "radial-gradient(circle at 50% 36%, rgba(20,58,108,0.96), rgba(4,24,52,0.97))",
            border: "1px solid rgba(120,170,255,0.45)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 30px rgba(49,133,252,0.25), 0 20px 50px rgba(2,16,40,0.6)",
            padding: u(14),
          }}
        >
          <span
            className="absolute rounded-full"
            aria-hidden
            style={{ inset: u(11), border: "1px solid rgba(120,170,255,0.2)" }}
          />
          <svg viewBox="0 0 24 24" style={{ width: u(26), height: u(26) }} aria-hidden>
            <rect x="3" y="13" width="4" height="8" rx="1" fill="#67a6ff" />
            <rect x="10" y="8" width="4" height="13" rx="1" fill="#9cc4ff" />
            <rect x="17" y="4" width="4" height="17" rx="1" fill="#3185fc" />
          </svg>
          <span
            className="font-semibold leading-tight text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: u(11.8),
              marginTop: u(8),
              maxWidth: u(116),
              letterSpacing: "-0.012em",
            }}
          >
            Revenue decisions
            <br />
            with confidence
          </span>
        </div>
      </div>

      {/* The problem, at the top, feeding the hub (revealed first) */}
      <ProblemBox shown={shown} delay={0} />

      {/* Metric cards, each popping in as the hub's signal reaches it */}
      {NET_CARDS.map((card, i) => (
        <NetMetricCard key={card.title} card={card} delay={cardReveal(i)} shown={shown} />
      ))}

      {/* Recommended action: the finale, revealed last (spoke index 6) */}
      <NetActionCard shown={shown} delay={cardReveal(6)} />

      {/* Illustrative tag */}
      <div
        className="absolute left-0 flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[#6f93c4]"
        style={{ bottom: u(4) }}
      >
        <span className="h-1 w-1 rounded-full bg-[#6f93c4]" aria-hidden />
        Illustrative
      </div>
    </div>
  );
}

/* ---------------- Revenue signal card ----------------
   ILLUSTRATIVE example only. A reusable component with clearly-labeled
   placeholder defaults and a visible "Illustrative" tag. Never present the
   contents as a real client result. Pass props to render different signals. */

export function RevenueSignalCard({
  account = "Cordova Health",
  amountLabel = "$1.2M",
  reason = "The team that uses you daily has gone quiet while the exec stays happy. That gap shows up at renewal.",
  action = "Re-engage the day-to-day team now",
  daysToRenewal = 58,
  index = 1,
  total = 3,
  headline,
  contextLabel,
  metaLabel,
}: {
  account?: string;
  amountLabel?: string;
  reason?: string;
  action?: string;
  daysToRenewal?: number;
  index?: number;
  total?: number;
  headline?: string;
  contextLabel?: string;
  metaLabel?: string;
}) {

  const { ref, shown } = useReveal(0.2);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div
        className="overflow-hidden rounded-[14px]"
        style={{
          background: "#06294e",
          border: "0.5px solid #1f4878",
          borderLeft: "3px solid #f68241",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a3a6b]">
              <BellIcon className="h-4 w-4 text-[#67a6ff]" />
            </span>
            <span className="text-[0.8rem] font-semibold text-white">VistaXM signal</span>
          </div>
          <span className="flex items-center gap-1.5 text-[0.72rem] font-semibold text-[#f68241]">
            <span className="signal-dot h-1.5 w-1.5 rounded-full bg-[#f68241]" aria-hidden />
            New
          </span>
        </div>

        {/* Body */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-1.5 text-[0.72rem] text-[#7fa3cf]">
            <FolderIcon className="h-3.5 w-3.5" />
            {contextLabel ?? `Renewals · ${account}`}
          </div>
          <div
            className="mt-2.5 text-[17px] font-bold leading-snug text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {headline ?? `A ${amountLabel} renewal is about to walk.`}
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#cfe0f7]">{reason}</p>

          <div className="mt-3.5 flex items-start gap-2">
            <CircleCheckIcon className="mt-px h-4 w-4 flex-none text-[#f68241]" />
            <span className="text-[12.5px] font-semibold text-white">{action}</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-[0.72rem] text-[#9fc0e8]">
            <ClockIcon className="h-3.5 w-3.5" />
            {metaLabel ?? `${daysToRenewal} days to renewal`}
          </div>

        </div>

      </div>


      {/* Illustrative tag */}
      <div className="mt-2.5 flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#7fa3cf]">
        <span className="h-1 w-1 rounded-full bg-[#7fa3cf]" aria-hidden />
        Illustrative
      </div>
    </div>
  );
}

/* ---------------- Leadership ---------------- */

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function LeaderCard({
  name,
  title,
  bio,
  quote,
  linkedin,
  showLinkedIn = true,
  initials,
  photo,
  delay = 0,
}: {
  name: string;
  title: string;
  bio: string;
  quote: string;
  linkedin?: string;
  /** When false, the LinkedIn icon is not rendered at all (e.g. no public profile). */
  showLinkedIn?: boolean;
  initials: string;
  photo?: string;
  delay?: number;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const linkedinHref = linkedin ?? "#";
  return (
    <Reveal delay={delay} className="h-full">
      <div
        ref={ref}
        className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-8 md:p-10 card-lift"
      >
        <div className="flex items-center gap-5">
          {photo ? (
            <img
              src={photo}
              alt={name}
              loading="lazy"
              className="h-20 w-20 flex-none rounded-full object-cover ring-2 ring-[color:var(--blue-cta)] ring-offset-2 ring-offset-white"
            />
          ) : (
            <span
              aria-hidden
              className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--navy-deep)] to-[color:var(--blue-cta)] text-xl font-semibold tracking-wide text-white ring-2 ring-[color:var(--blue-cta)] ring-offset-2 ring-offset-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {initials}
            </span>
          )}
          <div>
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">{name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
              {title}
            </p>
          </div>
        </div>

        <p className="mt-6 leading-relaxed text-[color:var(--ink-soft)]">{bio}</p>

        <blockquote
          className={`quote-emphasis ${shown ? "quote-emphasis-in" : ""} mt-6 text-lg italic leading-relaxed text-[color:var(--ink)]`}
        >
          <span aria-hidden className="mr-1 text-[color:var(--orange-pop)]">
            &ldquo;
          </span>
          {quote}
        </blockquote>

        {showLinkedIn && (
          <div className="mt-auto pt-7">
            <a
              href={linkedinHref}
              target={linkedin ? "_blank" : undefined}
              rel={linkedin ? "noopener noreferrer" : undefined}
              aria-label={`${name} on LinkedIn`}
              className="inline-flex text-[color:var(--ink-soft)]/40 transition-colors hover:text-[color:var(--blue-cta)] group-hover:text-[color:var(--blue-cta)]"
            >
              <LinkedInIcon className="h-6 w-6" />
            </a>
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function TeamSection() {
  return (
    <Section tint id="team">
      <SectionHead
        center
        eyebrow="Leadership"
        title="The team behind the category."
        intro="Revenue Channel Intelligence was built by people who have run customer experience and the channel at scale."
      />
      <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:mt-14 md:grid-cols-3 md:gap-8">
        <LeaderCard
          name="Erik Vogel"
          title="Chief Executive Officer"
          initials="EV"
          photo="/images/team/erik-vogel.avif"
          linkedin="https://www.linkedin.com/in/erikvogel2020/"
          bio="Twenty-six years in IT services. Built the customer experience program for HPE GreenLake, then led the high-tech and telecom practice at a leading experience-management platform, advising the world's top technology brands. He founded VistaXM to bring that rigor to the channel."
          quote="Companies don't spend NPS points. They spend dollars."
          delay={0}
        />
        <LeaderCard
          name="Paul Barr"
          title="Chief Revenue Officer"
          initials="PB"
          photo="/images/team/paul.avif"
          linkedin="https://www.linkedin.com/in/pbarr97"
          bio="Chief Revenue Officer at VistaXM, responsible for customer acquisition and revenue generation. 25+ years of experience across Fortune 50, channel, and start-up organizations, driving go-to-market strategy and growth. Previously led Fungible's worldwide channel organization and held leadership roles at Intel and multiple channel organizations."
          quote="87% of companies say they provide excellent CX yet only 11% of customers agree. Which side is your company on?"
          delay={80}
        />
        <LeaderCard
          name="Alexey Gerasimov"
          title="Chief Operating Officer"
          initials="AG"
          photo="/images/team/alexey-gerasimov.avif"
          linkedin="https://www.linkedin.com/in/alexey"
          bio="Chief Operating Officer at VistaXM, leading Services and Delivery. 30+ years in consulting and professional services, scaling organizations and driving digital transformations for the world's largest brands. Previously led Capgemini's North American Cloud organization; earlier senior roles at HPE, Cloud Technology Partners, and MoFuse."
          quote="Behind every unforgettable customer experience is flawless execution and a united team."
          delay={160}
        />
        <LeaderCard
          name="Bruce Coughlin"
          title="Chief Growth Officer"
          initials="BC"
          photo="/images/team/bruce-coughlin.jpg"
          linkedin="https://www.linkedin.com/in/brucecoughlin"
          bio="Former CEO of Cloud Technology Partners, which he helped guide to its acquisition by HPE. A relationship-first channel leader who believes the experience you deliver is the only real differentiator left."
          quote="The most progressive partners create differentiation and sustain it with customer experience. That is the fundamental tenet of what is happening in the channel."
          delay={0}
        />
        <LeaderCard
          name="Alan Zall"
          title="Chief Technology Officer"
          initials="AZ"
          photo="/images/team/alan-zall.avif"
          linkedin="https://www.linkedin.com/in/alanzall"
          bio="Chief Technology Officer at VistaXM, overseeing Product and Engineering. 30+ years scaling technology organizations and driving digital innovation. Delivers VistaXM's AI-enabled platform. Previously Global CPTO at CSpace, with senior leadership roles at HPE, Cloud Technology Partners, and Fiserv."
          quote="We build platforms that empower real connections between brands and people."
          delay={80}
        />
        <LeaderCard
          name="Candice A. Vogel"
          title="Chief Legal Officer"
          initials="CV"
          photo="/images/team/candice-vogel.webp"
          showLinkedIn={false}
          bio="Chief Legal Officer at VistaXM, responsible for all legal, administrative, and compliance aspects of the business. A seasoned attorney with deep commercial and employment law experience, advising companies of all sizes on federal and state employment matters."
          quote="Trust is earned through integrity; every promise and every policy matters to our customers."
          delay={160}
        />
      </div>
    </Section>
  );
}

/* ---------------- CTA Band ---------------- */

/* ---------------- Get the brief ---------------- */

function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}

/**
 * "Get the brief" block for the Pulse pages. Shows a download (or a disabled
 * "Brief coming soon" placeholder), an optional "Learn more" whitepaper link,
 * and the Book a 30-minute call CTA alongside it.
 */
export function GetTheBrief({ brief }: { brief: Brief }) {
  return (
    <FadeIn>
      <div className="relative overflow-hidden rounded-2xl hairline bg-[color:var(--blue-tint)] p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <div className="eyebrow mb-3 !text-[color:var(--blue-link)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" />
              Get the brief
            </div>
            <p className="max-w-[52ch] text-lg leading-relaxed text-[color:var(--navy-deep)]">
              {brief.catchphrase}
            </p>
          </div>
          <div className="flex flex-col gap-3 lg:items-end">
            {brief.comingSoon || !brief.pdfHref ? (
              <span
                aria-disabled="true"
                className="btn-secondary-dark inline-flex cursor-not-allowed items-center gap-2 opacity-60"
              >
                <DownloadIcon />
                Brief coming soon
              </span>
            ) : (
              <a
                href={brief.pdfHref}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <DownloadIcon />
                Download the brief (PDF)
              </a>
            )}
            {brief.learnMore && (
              <a
                href={brief.learnMore.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[color:var(--blue-link)] transition-colors hover:text-[color:var(--blue-cta)]"
              >
                {brief.learnMore.label} &rarr;
              </a>
            )}
            <CTAButton to={BOOK_PATH} className="btn-secondary-dark inline-flex items-center gap-2">
              {brief.comingSoon ? "Talk to us about an early pilot" : "Book a 30-minute call"}
            </CTAButton>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ---------------- CTA band ---------------- */

export function CTABand() {
  return (
    <section className="relative bg-[color:var(--navy-deep)] text-white grain overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-80"
        style={{
          animation: "aurora-drift 24s ease-in-out infinite",
          backgroundImage:
            "radial-gradient(600px 300px at 85% 50%, rgba(49,133,252,0.25), transparent 70%), radial-gradient(500px 260px at 10% 50%, rgba(0,86,167,0.35), transparent 70%), radial-gradient(320px 200px at 60% 90%, rgba(246,130,65,0.12), transparent 70%)",
        }}
      />
      <div className="container-x relative py-20 md:py-24 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <Reveal>
          <div>
            <div className="eyebrow !text-[color:var(--blue-light)] mb-3">See the signal</div>
            <h2 className="!text-white !text-3xl md:!text-[2.5rem] max-w-[20ch]">
              See where your revenue is hiding.
            </h2>
            <p className="mt-3 text-white/70">A 30-minute conversation. No deck.</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <CTAButton to={BOOK_PATH} className="btn-primary">
            Book a 30-minute conversation
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ (visible, answer-first; pairs with FAQPage JSON-LD) ---------------- */

export function FAQSection({
  items,
  title = "Frequently asked questions",
  intro,
  tint = true,
  grid = false,
}: {
  items: { question: string; answer: string }[];
  title?: string;
  intro?: ReactNode;
  tint?: boolean;
  /** When true, lay the questions out in a two-column grid instead of a single stack. */
  grid?: boolean;
}) {
  return (
    <Section tint={tint}>
      <SectionHead eyebrow="FAQ" title={title} intro={intro} />
      <div
        className={
          grid
            ? "mt-12 grid gap-5 md:grid-cols-2 md:gap-6"
            : "mt-12 grid max-w-3xl gap-5"
        }
      >
        {items.map((f, i) => (
          <Reveal key={f.question} delay={i * 80}>
            <div className="rounded-2xl hairline bg-white p-7 h-full">
              <h3 className="text-lg font-semibold text-[color:var(--navy-deep)]">{f.question}</h3>
              <p className="mt-3 leading-relaxed text-[color:var(--ink-soft)]">{f.answer}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Proven Results ---------------- */

const RESULTS: { value: number; prefix?: string; suffix?: string; label: string }[] = [
  { value: 250, suffix: "%", label: "Increase in Customer Engagement" },
  { value: 4, suffix: "×", label: "Faster Time to Value Than DIY CX Programs" },
  { value: 10, suffix: "%", label: "Conversion Improvement" },
  { value: 17, prefix: ">", suffix: "%", label: "Reduction in Support Ticket Volume" },
  { value: 40, suffix: "%+", label: "Less Expensive than Internal Teams" },
];

function CountStat({
  value,
  prefix = "",
  suffix = "",
  label,
  delay,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay: number;
}) {
  const { ref, shown } = useReveal(0.4);
  const v = useCountUp(value, 1600, shown);
  return (
    <div
      ref={ref}
      className="group relative pt-6"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition:
          "opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-[2px] w-10 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--orange-pop)] transition-all duration-500 group-hover:w-16"
      />
      <div
        className="text-5xl md:text-6xl font-semibold text-[color:var(--navy-deep)] tracking-tight tabular-nums"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {prefix}
        {Math.round(v)}
        {suffix}
      </div>
      <div className="mt-3 text-sm text-[color:var(--ink-soft)] leading-relaxed max-w-[22ch]">
        {label}
      </div>
    </div>
  );
}

/* Lead proof chip: the independently validated NPS badge. Links to /proof. */
function EPlusNPSStat() {
  const { ref, shown } = useReveal<HTMLAnchorElement>(0.4);
  return (
    <a
      href="/proof"
      ref={ref}
      className="group relative block pt-6"
      aria-label="Independently validated NPS. See the proof."
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition:
          "opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-[2px] w-10 bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-cta)] transition-all duration-500 group-hover:w-16"
      />
      <div className="mt-3 text-sm text-[color:var(--ink-soft)] leading-relaxed max-w-[22ch]">
        Independently Validated NPS
      </div>
    </a>
  );
}

export function ProvenResults() {
  return (
    <Section>
      <SectionHead
        eyebrow="Proven results"
        title={
          <>
            Proven results.
            <br className="hidden md:block" />{" "}
            <span className="text-[color:var(--blue-cta)]">Not vanity metrics.</span>
          </>
        }
      />
      <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
        <EPlusNPSStat />
        {RESULTS.map((r, i) => (
          <CountStat
            key={r.label}
            value={r.value}
            prefix={r.prefix}
            suffix={r.suffix}
            label={r.label}
            delay={(i + 1) * 120}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Journey × Persona Matrix ---------------- */

type CellStatus = "red" | "yellow" | "green" | "neutral";

type HeatCell = { title: string; status: CellStatus; desc?: string };

// Status color tokens. Fills are low-alpha tints of the confirmed hexes so the
// navy cell text stays legible; the border and dot carry the full-strength
// color. Green #5fcf9e, yellow #e6c34d, red #f0807f.
const STATUS_STYLES: Record<
  CellStatus,
  { bg: string; border: string; dot: string; label: string }
> = {
  red: {
    bg: "rgba(240,128,127,0.16)",
    border: "rgba(240,128,127,0.6)",
    dot: "#f0807f",
    label: "At risk",
  },
  yellow: {
    bg: "rgba(230,195,77,0.18)",
    border: "rgba(230,195,77,0.65)",
    dot: "#e6c34d",
    label: "Watch",
  },
  green: {
    bg: "rgba(95,207,158,0.18)",
    border: "rgba(95,207,158,0.6)",
    dot: "#5fcf9e",
    label: "Healthy",
  },
  neutral: {
    bg: "var(--gray-soft)",
    border: "var(--hairline)",
    dot: "var(--gray-line)",
    label: "TBD",
  },
};

// Single source of truth for the Journey x Persona heat map. Swap the cell
// `title`, `status`, and optional `desc` here when VistaXM finalizes them.
// IMPORTANT: colors and hover text below are ILLUSTRATIVE placeholders; the
// status colors and one-line signal descriptions are to be confirmed by
// VistaXM. A cell with no `desc` falls back to a clearly-marked placeholder.
// TODO(VistaXM): final per-cell colors + hover copy pending
const HEATMAP: {
  stages: readonly string[];
  personas: readonly string[];
  cells: HeatCell[][];
} = {
  stages: ["Sales", "Purchase", "Onboard", "Support", "Renew"],
  personas: ["Executive / Economic Buyer", "Procurement", "Technical", "Day-to-Day User"],
  cells: [
    // Executive / Economic Buyer
    [
      { title: "Business-Case Conviction", status: "green", desc: "Do I believe this vendor's solution meets my business needs?" },
      { title: "Investment Confidence", status: "green", desc: "Value-to-price conviction." },
      { title: "Time-to-Value Tracking", status: "yellow", desc: "Is there a clear path to the expected ROI?" },
      { title: "Outcome Realization", status: "green", desc: "Is the vendor delivering on their promise?" },
      { title: "Re-Investment Conviction", status: "yellow", desc: "Willingness to renew, advocacy strength, and desire to expand." },
    ],
    // Procurement
    [
      { title: "Evaluation Rigor", status: "green", desc: "Does the vendor have a believable, risk-adjusted value prop?" },
      { title: "Terms Friction", status: "yellow", desc: "Is the vendor reasonable and fair in their contracting approach?" },
      { title: "Activation Governance", status: "yellow", desc: "Provisioning accuracy, seat/license fit, and process handoff quality." },
      { title: "Vendor Accountability", status: "green", desc: "SLA adherence, responsiveness, and relationship-management quality." },
      { title: "Renewal Posture", status: "red", desc: "Renegotiation risk and likelihood of competitive re-evaluation." },
    ],
    // Technical
    [
      { title: "Solution-Fit Confidence", status: "green", desc: "Architecture validated and confidently confirmed." },
      { title: "Diligence Gates", status: "green", desc: "Security and integration requirements met versus flagged." },
      { title: "Implementation Health", status: "yellow", desc: "Integration success, configuration friction, and deployment confidence." },
      { title: "Resolution Effectiveness", status: "yellow", desc: "Have the technical teams earned my trust and confidence?" },
      { title: "Stickiness vs. Fragility", status: "red", desc: "Is the value provided worth more than the risk of change?" },
    ],
    // Day-to-Day User
    [
      { title: "Adoption Foresight", status: "yellow", desc: "Do end-users understand what the solution brings to the table?" },
      { title: "Voice-of-User Gap", status: "red", desc: "Have real end-user needs been considered in the buying decision?" },
      { title: "First-Use Experience", status: "green", desc: "Ramp friction, training adequacy, and early adoption momentum." },
      { title: "Daily Friction Signal", status: "red", desc: "Is the solution easy to use with minimal pain of adoption?" },
      { title: "Loyalty & Adoption Depth", status: "yellow", desc: "Is the solution being used fully, churn risk minimized?" },
    ],
  ],
};

// One-line hover copy for a cell: use the confirmed `desc` when present,
// otherwise a clearly-labeled placeholder VistaXM can replace.
const cellDesc = (c: HeatCell) =>
  c.desc ?? `${c.title}: signal placeholder; VistaXM to supply final text.`;

const LEGEND: { status: CellStatus; meaning: string }[] = [
  { status: "green", meaning: "Healthy" },
  { status: "yellow", meaning: "Watch" },
  { status: "red", meaning: "At risk" },
];

export function JourneyMatrix() {
  const { ref, shown } = useReveal(0.2);
  const { stages, personas, cells } = HEATMAP;
  return (
    <div ref={ref}>
      <div className="rounded-2xl hairline bg-white p-3 md:p-5 shadow-[var(--shadow-elevation-2)]">
        {/* Product-style toolbar */}
        <div className="flex items-center justify-between gap-3 px-1 pb-3 mb-1 border-b border-[color:var(--hairline)]">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-[color:var(--navy-deep)]">
            <span className="flex gap-1" aria-hidden>
              <span className="w-2 h-2 rounded-full bg-[color:var(--gray-line)]" />
              <span className="w-2 h-2 rounded-full bg-[color:var(--gray-line)]" />
              <span className="w-2 h-2 rounded-full bg-[color:var(--gray-line)]" />
            </span>
            Revenue signal map
          </div>
          <span className="pill-light">Journey × Persona</span>
        </div>
        {/* Narrow screens scroll horizontally rather than squashing the grid. */}
        <div className="overflow-x-auto">
          <div className="min-w-[880px]">
            {/* Header row: stage labels across the top */}
            <div
              className="grid"
              style={{ gridTemplateColumns: `220px repeat(${stages.length}, 1fr)` }}
            >
              <div className="px-3 py-3 text-[0.7rem] uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                Persona ↓ / Stage →
              </div>
              {stages.map((s, idx) => (
                <div
                  key={s}
                  className="px-3 py-3 text-xs font-semibold text-[color:var(--navy-deep)] border-l border-[color:var(--hairline)]"
                  style={{ opacity: shown ? 1 : 0, transition: `opacity 500ms ease ${idx * 60}ms` }}
                >
                  {s}
                </div>
              ))}
            </div>

            {/* Body rows: persona label down the left, one cell per stage */}
            {personas.map((p, i) => (
              <div
                key={p}
                className="grid border-t border-[color:var(--hairline)]"
                style={{ gridTemplateColumns: `220px repeat(${stages.length}, 1fr)` }}
              >
                <div className="px-3 py-4 text-sm font-semibold text-[color:var(--navy-deep)] flex items-center">
                  {p}
                </div>
                {stages.map((s, j) => {
                  const cell = cells[i][j];
                  const st = STATUS_STYLES[cell.status];
                  const note = cellDesc(cell);
                  const delay = (i * stages.length + j) * 40;
                  return (
                    <div
                      key={s}
                      className="group/flip px-2 py-3 border-l border-[color:var(--hairline)]"
                    >
                      {/* Flip card: front shows the title, back reveals the
                          signal note on hover/focus. Hovering anywhere in the
                          cell flips it. No overlay above the grid. */}
                      <div
                        className="rounded-lg [perspective:900px] focus-within:ring-2 focus-within:ring-[color:var(--blue-cta)] focus-within:ring-offset-1"
                        style={{
                          opacity: shown ? 1 : 0,
                          transition: `opacity 500ms ease ${delay}ms`,
                        }}
                      >
                        <button
                          type="button"
                          aria-label={`${p} at ${s}: ${cell.title}. Status: ${st.label}. ${note}`}
                          className="relative block h-[5.75rem] w-full rounded-lg text-left transition-transform duration-500 [transform-style:preserve-3d] group-hover/flip:[transform:rotateY(180deg)] focus:[transform:rotateY(180deg)] focus:outline-none motion-reduce:transition-none"
                        >
                          {/* Front */}
                          <span
                            className="absolute inset-0 flex items-start gap-1.5 overflow-hidden rounded-lg px-2.5 py-2 text-[0.72rem] font-semibold leading-tight text-[color:var(--navy-deep)] [backface-visibility:hidden]"
                            style={{
                              background: st.bg,
                              boxShadow: `inset 0 0 0 1px ${st.border}`,
                            }}
                          >
                            <span
                              aria-hidden
                              className="mt-0.5 h-2 w-2 flex-none rounded-full"
                              style={{ background: st.dot }}
                            />
                            <span className="min-w-0">{cell.title}</span>
                          </span>
                          {/* Back */}
                          <span
                            className="absolute inset-0 flex flex-col justify-center gap-1 overflow-hidden rounded-lg px-2.5 py-2 text-left [backface-visibility:hidden] [transform:rotateY(180deg)]"
                            style={{
                              background: st.bg,
                              boxShadow: `inset 0 0 0 1px ${st.border}`,
                            }}
                          >
                            <span className="flex items-center gap-1.5 text-[0.64rem] font-semibold leading-snug text-[color:var(--navy-deep)]">
                              <span
                                aria-hidden
                                className="h-1.5 w-1.5 flex-none rounded-full"
                                style={{ background: st.dot }}
                              />
                              {cell.title}
                            </span>
                            <span className="text-[0.58rem] font-medium leading-snug text-[color:var(--ink-soft)]">
                              {note}
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

      {/* Legend: green Healthy, yellow Watch, red At risk */}
      <div className="mt-5 flex flex-wrap items-center gap-5 text-xs text-[color:var(--ink-soft)]">
        {LEGEND.map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm"
              style={{
                background: STATUS_STYLES[item.status].bg,
                boxShadow: `inset 0 0 0 1px ${STATUS_STYLES[item.status].border}`,
              }}
            />
            {item.meaning}
          </div>
        ))}
      </div>

      {/* Illustrative-data caption */}
      <p className="mt-3 text-xs italic text-[color:var(--ink-soft)]/80">
        Illustrative colors and hover text: final signal language and status to be confirmed by
        VistaXM. Hover or focus any cell for detail.
      </p>
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
          return (
            <line
              key={t}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-3">
        <div className="text-[3.5rem] leading-none font-semibold text-white tabular-nums tracking-tight">
          {Math.round(v)}
        </div>
        <div className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-white/60">
          Certified NPS
        </div>
      </div>
    </div>
  );
}

/* ---------------- Promoter / Passive / Detractor spend ---------------- */

export function SpendByCohort() {
  const { ref, shown } = useReveal(0.3);
  const cohorts = [
    { name: "Promoters", share: 62, color: "var(--blue-cta)", note: "Renew, expand, refer" },
    { name: "Passives", share: 26, color: "var(--blue-pale)", note: "Quiet until they leave" },
    { name: "Detractors", share: 12, color: "var(--orange-pop)", note: "Cost more, churn first" },
  ];
  return (
    <div ref={ref} className="rounded-2xl hairline bg-white p-7 md:p-9 card-lift">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="eyebrow mb-2">Spend follows sentiment</div>
          <h3 className="!text-2xl">Where the revenue really sits.</h3>
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
              <div className="text-sm font-semibold text-[color:var(--navy-deep)]">
                {c.name} · {c.share}%
              </div>
              <div className="text-xs text-[color:var(--ink-soft)] mt-0.5">{c.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-[color:var(--hairline)] text-sm text-[color:var(--ink-soft)]">
        Promoter accounts carry{" "}
        <span className="font-semibold text-[color:var(--navy-deep)] tabular-nums">5.2<span className="align-baseline">×</span></span> the lifetime value
        of detractors. Small improvements drive large revenue gains.
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
            A score, and nowhere to go.
          </div>
          <div className="mt-8 flex items-end gap-5">
            <div className="text-[5.5rem] leading-none font-semibold text-[color:var(--ink)] tabular-nums">
              42
            </div>
            <div className="text-sm text-[color:var(--ink-soft)] pb-4">
              NPS · account-level
              <br />
              No persona. No journey. No action.
            </div>
          </div>
          <div className="mt-6 h-1 w-full rounded-full bg-[color:var(--gray-soft)]">
            <div className="h-full w-[71%] rounded-full bg-[color:var(--gray-line)]" />
          </div>
          <div className="mt-3 text-xs text-[color:var(--ink-soft)]">
            Quarterly review. Slide 14. Nothing changes.
          </div>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div
          className="relative rounded-2xl p-8 h-full overflow-hidden text-white grain"
          style={{ background: "linear-gradient(160deg, #022550 0%, #062d57 60%, #0d3f7a 100%)" }}
        >
          <div
            className="pill"
            style={{
              background: "rgba(49,133,252,0.18)",
              borderColor: "rgba(49,133,252,0.35)",
              color: "#cfe3ff",
            }}
          >
            After
          </div>
          <div className="mt-5 text-2xl md:text-3xl font-semibold !text-white leading-tight">
            A revenue decision, with the next move attached.
          </div>
          <ul className="mt-8 space-y-3 text-sm">
            {[
              {
                v: "7 accounts",
                t: "at risk in Implementation × Operations",
                c: "var(--orange-pop)",
              },
              { v: "$4.2M", t: "expansion latent in Renewal × Executive", c: "var(--blue-light)" },
              {
                v: "51 pts",
                t: "Decision Maker → Influencer gap, 3 accounts",
                c: "var(--blue-light)",
              },
              {
                v: "$1.8M",
                t: "MDF re-routed to partners that grow accounts",
                c: "var(--blue-light)",
              },
            ].map((row) => (
              <li
                key={row.t}
                className="flex items-baseline gap-3 border-b border-white/10 pb-3 last:border-0"
              >
                <span className="font-semibold tabular-nums shrink-0" style={{ color: row.c }}>
                  {row.v}
                </span>
                <span className="text-white/85">{row.t}</span>
              </li>
            ))}
          </ul>
          <div
            aria-hidden
            className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-50"
            style={{
              background: "radial-gradient(circle, rgba(49,133,252,0.55), transparent 70%)",
            }}
          />
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------- Revenue Intelligence Flow ---------------- */

function Glyph({ name }: { name: string }) {
  const c = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "w-[18px] h-[18px]",
    "aria-hidden": true,
  };
  switch (name) {
    case "clipboard":
      return (
        <svg {...c}>
          <rect x="8" y="3.5" width="8" height="4" rx="1" />
          <path d="M9 5.5H7a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.5a2 2 0 0 0-2-2h-2" />
          <path d="M9 13l1.6 1.6L14 11.5" />
        </svg>
      );
    case "headset":
      return (
        <svg {...c}>
          <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
          <rect x="3" y="13" width="4" height="6" rx="1.5" />
          <rect x="17" y="13" width="4" height="6" rx="1.5" />
          <path d="M20 19a4 4 0 0 1-4 4h-2" />
        </svg>
      );
    case "usage":
      return (
        <svg {...c}>
          <path d="M4 4v16h16" />
          <rect x="7" y="12" width="3" height="5" />
          <rect x="12" y="8" width="3" height="9" />
          <rect x="17" y="5" width="3" height="12" />
        </svg>
      );
    case "user":
      return (
        <svg {...c}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
      );
    case "phone":
      return (
        <svg {...c}>
          <path d="M6 3h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "star":
      return (
        <svg {...c}>
          <path d="M12 4l2.3 4.7 5.2.8-3.8 3.7.9 5.1L12 16.9 7.4 18.1l.9-5.1L4.5 9.5l5.2-.8z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...c}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
          <path d="M12 9v3.5" />
          <path d="M12 15.5h.01" />
        </svg>
      );
    case "trend":
      return (
        <svg {...c}>
          <path d="M4 16l5-5 3 3 7-7" />
          <path d="M16 7h4v4" />
        </svg>
      );
    case "pie":
      return (
        <svg {...c}>
          <path d="M12 4a8 8 0 1 0 8 8h-8z" />
          <path d="M12 4v8l5.6 5.6" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...c}>
          <path d="M12 4l1.4 3.6L17 9l-3.6 1.4L12 14l-1.4-3.6L7 9l3.6-1.4z" />
          <path d="M18 13l.7 1.8L20.5 16l-1.8.7L18 18.5l-.7-1.8L15.5 16l1.8-.7z" />
        </svg>
      );
    default:
      return null;
  }
}

const FLOW_INPUTS = [
  { label: "Surveys", icon: "clipboard" },
  { label: "Support", icon: "headset" },
  { label: "Product Usage", icon: "usage" },
  { label: "CRM", icon: "user" },
  { label: "Calls", icon: "phone" },
  { label: "NPS / Reviews", icon: "star" },
];

const FLOW_OUTPUTS = [
  { title: "Churn Risk", desc: "Protect the revenue at risk.", icon: "shield", danger: true },
  {
    title: "Expansion Opportunities",
    desc: "Find and prioritize growth accounts.",
    icon: "trend",
    danger: false,
  },
  {
    title: "Executive Reporting",
    desc: "See what is really driving performance.",
    icon: "pie",
    danger: false,
  },
  {
    title: "Next Best Actions",
    desc: "Guide teams to the right move, every time.",
    icon: "sparkles",
    danger: false,
  },
];

const FLOW_STEPS = [
  {
    n: "01",
    title: "Unify the customer story",
    desc: "Bring fragmented channel signals into one account-level view.",
  },
  {
    n: "02",
    title: "Surface revenue opportunities",
    desc: "Reveal churn risk, growth signal, and the moments that decide a renewal.",
  },
  {
    n: "03",
    title: "Prove business impact",
    desc: "Connect customer experience to retention, expansion, and revenue.",
  },
];

/* Orchestrated entrance for the flow diagram (seconds). Left inputs slide in one
   at a time, each with its connector line; the dashboard then arrives and the
   outputs cascade in one at a time as the "result" of the flow. ~3s total. */
const FLOW_IN_STAGGER = 0.28; // gap between each left input + its line
const FLOW_BOX_DUR = 0.45; // input / output / dashboard entrance duration
const FLOW_LINE_DUR = 0.4; // connector draw duration
const FLOW_IN_HUB = 1.5; // convergence node + stub reveal (after last input)
const FLOW_OUT_BEAT = 1.85; // dashboard arrives; first output + out-rail begin here
const FLOW_OUT_STAGGER = 0.26; // outputs cascade one at a time, like the inputs
const FLOW_COUNT_MS = 1000; // dashboard count-up duration

const FLOW_DRIVERS = [
  { label: "Exec engagement", value: 82 },
  { label: "Onboarding", value: 64 },
  { label: "Support load", value: 46 },
];

const FLOW_WATCHLIST = [
  { name: "Cordova Health", status: "At risk", tone: "risk", amount: "$1.2M" },
  { name: "Northwind Group", status: "Watch", tone: "watch", amount: "$480K" },
  { name: "Apex Systems", status: "Healthy", tone: "healthy", amount: "$2.7M" },
];

const WATCH_TONE: Record<string, { bg: string; color: string }> = {
  risk: { bg: "rgba(246,130,65,0.16)", color: "#f9a26a" },
  watch: { bg: "rgba(234,179,8,0.18)", color: "#f2c14e" },
  healthy: { bg: "rgba(52,211,153,0.16)", color: "#5ee0b0" },
};

function FlowRail({ variant, shown }: { variant: "in" | "out"; shown: boolean }) {
  const inYs = [28, 89, 150, 210, 271, 332];
  const outYs = [78, 152, 226, 300];
  // Draw a path from hidden (dashoffset 100) to full over `dur`, after `delay`.
  // pathLength normalizes the draw despite the rail's non-uniform stretch.
  const draw = (delay: number, dur: number): CSSProperties => ({
    strokeDasharray: 100,
    strokeDashoffset: 100,
    animation: shown ? `draw-line ${dur}s ${delay}s ease-out forwards` : undefined,
  });
  const fade = (delay: number): CSSProperties => ({
    opacity: shown ? undefined : 0,
    animation: shown ? `net-fade 0.3s ${delay}s both` : undefined,
  });
  return (
    <div className="hidden lg:block lg:w-16 self-stretch shrink-0" aria-hidden>
      <svg
        viewBox="0 0 64 360"
        preserveAspectRatio="none"
        className="w-full h-full text-[color:var(--blue-light)]"
      >
        {variant === "in" ? (
          <>
            {inYs.map((y, i) => (
              <path
                key={y}
                d={`M0 ${y} C 26 ${y}, 30 180, 50 180`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                opacity={0.55}
                pathLength={100}
                style={draw(i * FLOW_IN_STAGGER, FLOW_LINE_DUR)}
              />
            ))}
            <path
              d="M50 180 H64"
              stroke="currentColor"
              strokeWidth={1.6}
              opacity={0.7}
              pathLength={100}
              style={draw(FLOW_IN_HUB, 0.3)}
            />
            <circle cx="50" cy="180" r="3.4" fill="var(--blue-cta)" style={fade(FLOW_IN_HUB)} />
          </>
        ) : (
          <>
            <path
              d="M0 180 H14"
              stroke="currentColor"
              strokeWidth={1.6}
              opacity={0.7}
              pathLength={100}
              style={draw(FLOW_OUT_BEAT, 0.3)}
            />
            <circle cx="14" cy="180" r="3.4" fill="var(--blue-cta)" style={fade(FLOW_OUT_BEAT)} />
            {outYs.map((y, i) => (
              <path
                key={y}
                d={`M14 180 C 36 180, 40 ${y}, 64 ${y}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                opacity={0.55}
                pathLength={100}
                style={draw(FLOW_OUT_BEAT + i * FLOW_OUT_STAGGER, FLOW_LINE_DUR)}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
}

function FlowStatTile({
  label,
  children,
  foot,
  footColor,
  delta,
  deltaColor,
}: {
  label: string;
  children: ReactNode;
  foot: string;
  footColor: string;
  delta?: string;
  deltaColor?: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
      <div className="text-[0.6rem] uppercase tracking-wider text-white/55">{label}</div>
      <div className="mt-1.5">{children}</div>
      <div className="mt-1 flex items-center gap-1.5">
        <span className="text-[0.65rem] font-medium" style={{ color: footColor }}>
          {foot}
        </span>
        {delta ? (
          <span
            className="text-[0.58rem] font-semibold tabular-nums"
            style={{ color: deltaColor ?? footColor }}
          >
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function FlowDashboard({ shown, delaySec }: { shown: boolean; delaySec: number }) {
  // The dashboard is the "result" of the flow, so its numbers should count up
  // when it arrives (delaySec), not when the section first scrolls into view.
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!shown) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setGo(true);
      return;
    }
    const t = setTimeout(() => setGo(true), delaySec * 1000);
    return () => clearTimeout(t);
  }, [shown, delaySec]);

  const health = Math.round(useCountUp(78, FLOW_COUNT_MS, go));
  const churn = Math.round(useCountUp(12, FLOW_COUNT_MS, go));
  const pipeline = useCountUp(2.4, FLOW_COUNT_MS, go);
  const R = 15;
  const circ = 2 * Math.PI * R;
  return (
    <div
      className="flex-1 min-w-0"
      style={{
        opacity: shown ? undefined : 0,
        animation: shown ? `flow-pop ${FLOW_BOX_DUR}s ${delaySec}s both` : undefined,
      }}
    >
      <div
        className="relative h-full rounded-2xl text-white grain overflow-hidden shadow-[var(--shadow-elevation-3)]"
        style={{ background: "linear-gradient(160deg, #022550 0%, #062d57 60%, #0d3f7a 100%)" }}
      >
        {/* window chrome: product identity + live status */}
        <div className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-white/10 text-[color:var(--blue-light)]">
              <svg viewBox="0 0 24 24" className="w-[15px] h-[15px]" fill="none" aria-hidden>
                <path
                  d="M4 4l8 16 8-16"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                VistaXM Revenue Intelligence
              </div>
              <div className="text-[0.62rem] text-white/45">Account signal dashboard</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#5ee0b0]"
                style={{ animation: "live-pulse 2s ease-in-out infinite" }}
              />
              <span className="text-[0.6rem] font-medium text-white/70">Live</span>
            </span>
            <span className="text-[0.6rem] text-white/40">Synced just now</span>
          </div>
        </div>

        <div className="relative z-10 p-5 md:p-6">
          {/* KPI tiles with period deltas */}
          <div className="grid grid-cols-3 gap-2.5">
            <FlowStatTile
              label="Health Score"
              foot="Good"
              footColor="var(--blue-light)"
              delta="▲ 4"
              deltaColor="#5ee0b0"
            >
              <div className="relative grid place-items-center w-[46px] h-[46px]">
                <svg viewBox="0 0 36 36" className="w-[46px] h-[46px] -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r={R}
                    fill="none"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r={R}
                    fill="none"
                    stroke="var(--blue-cta)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={circ * (1 - health / 100)}
                    style={{ transition: "stroke-dashoffset 0.2s linear" }}
                  />
                </svg>
                <span className="absolute text-[0.95rem] font-semibold tabular-nums">{health}</span>
              </div>
            </FlowStatTile>

            <FlowStatTile
              label="Churn Risk"
              foot="At Risk"
              footColor="var(--orange-pop)"
              delta="▲ 2 pts"
              deltaColor="var(--orange-pop)"
            >
              <span
                className="text-2xl font-semibold tabular-nums"
                style={{ color: "var(--orange-pop)" }}
              >
                {churn}%
              </span>
            </FlowStatTile>

            <FlowStatTile
              label="Expansion"
              foot="Pipeline"
              footColor="var(--blue-light)"
              delta="▲ $0.3M"
              deltaColor="#5ee0b0"
            >
              <span className="text-2xl font-semibold tabular-nums text-white">
                ${pipeline.toFixed(1)}M
              </span>
            </FlowStatTile>
          </div>

          {/* Signal trends + top drivers */}
          <div className="mt-2.5 grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[0.6rem] uppercase tracking-wider text-white/55">
                  Signal Trends
                </span>
                <span className="text-[0.6rem] font-semibold text-[#5ee0b0]">+18%</span>
              </div>
              <svg
                viewBox="0 0 120 42"
                className="mt-2 w-full h-10"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="flow-spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(103,166,255,0.35)" />
                    <stop offset="100%" stopColor="rgba(103,166,255,0)" />
                  </linearGradient>
                </defs>
                <polygon
                  points="2,34 22,28 42,30 62,20 82,22 102,11 118,6 118,42 2,42"
                  fill="url(#flow-spark)"
                />
                <polyline
                  points="2,34 22,28 42,30 62,20 82,22 102,11 118,6"
                  fill="none"
                  stroke="var(--blue-light)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="118" cy="6" r="2.6" fill="#fff" />
              </svg>
            </div>
            <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
              <div className="text-[0.6rem] uppercase tracking-wider text-white/55">
                Top Drivers
              </div>
              <div className="mt-2 space-y-1.5">
                {FLOW_DRIVERS.map((d, i) => (
                  <div key={d.label}>
                    <div className="mb-1 flex items-center justify-between text-[0.62rem]">
                      <span className="text-white/70">{d.label}</span>
                      <span className="tabular-nums text-white/50">{d.value}</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: go ? `${d.value}%` : "0%",
                          background: i === 0 ? "var(--blue-cta)" : "var(--blue-light)",
                          transition: `width 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Account watchlist: the realistic "what to act on" layer */}
          <div className="mt-2.5 rounded-xl bg-white/[0.06] border border-white/10 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[0.6rem] uppercase tracking-wider text-white/55">
                Account Watchlist
              </span>
              <span className="text-[0.6rem] text-white/40">3 flagged</span>
            </div>
            <div className="mt-2 space-y-1.5">
              {FLOW_WATCHLIST.map((a) => {
                const tone = WATCH_TONE[a.tone];
                return (
                  <div key={a.name} className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate text-xs font-medium text-white/85">
                      {a.name}
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[0.58rem] font-semibold"
                        style={{ background: tone.bg, color: tone.color }}
                      >
                        {a.status}
                      </span>
                      <span className="w-12 text-right text-[0.68rem] tabular-nums text-white/70">
                        {a.amount}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(49,133,252,0.55), transparent 70%)" }}
        />
      </div>
    </div>
  );
}

export function RevenueIntelligenceFlow() {
  // Drive the orchestration off a single in-view trigger (not the shared
  // <Reveal>, which would fade the whole block in at once and defeat the
  // per-element sequencing). Entrance transforms live on outer wrappers so the
  // inner boxes keep their card-lift hover transform.
  const { ref, shown } = useReveal(0.15);
  return (
    <div>
      <div ref={ref} className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-0">
        {/* Inputs: slide in one at a time */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:flex lg:flex-col lg:justify-between lg:w-[190px] lg:shrink-0">
          {FLOW_INPUTS.map((it, i) => (
            <div
              key={it.label}
              style={{
                opacity: shown ? undefined : 0,
                animation: shown
                  ? `flow-in-left ${FLOW_BOX_DUR}s ${i * FLOW_IN_STAGGER}s both`
                  : undefined,
              }}
            >
              <div className="flex items-center gap-2.5 rounded-xl bg-white hairline px-3.5 py-3 card-lift text-[color:var(--navy-deep)]">
                <span className="grid place-items-center w-8 h-8 rounded-lg bg-[color:var(--blue-tint)] text-[color:var(--blue-cta)] shrink-0">
                  <Glyph name={it.icon} />
                </span>
                <span className="text-sm font-medium leading-tight">{it.label}</span>
              </div>
            </div>
          ))}
        </div>

        <FlowRail variant="in" shown={shown} />

        <FlowDashboard shown={shown} delaySec={FLOW_OUT_BEAT} />

        <FlowRail variant="out" shown={shown} />

        {/* Outputs: arrive together as the flow's result */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:flex lg:flex-col lg:justify-between lg:w-[235px] lg:shrink-0">
          {FLOW_OUTPUTS.map((it, i) => (
            <div
              key={it.title}
              style={{
                opacity: shown ? undefined : 0,
                animation: shown
                  ? `flow-in-right ${FLOW_BOX_DUR}s ${FLOW_OUT_BEAT + i * FLOW_OUT_STAGGER}s both`
                  : undefined,
              }}
            >
              <div className="rounded-xl bg-white hairline p-3.5 card-lift">
                <div className="flex items-center gap-2">
                  <span
                    className="grid place-items-center w-7 h-7 rounded-lg shrink-0"
                    style={{
                      background: it.danger ? "rgba(246,130,65,0.12)" : "var(--blue-tint)",
                      color: it.danger ? "var(--orange-pop)" : "var(--blue-cta)",
                    }}
                  >
                    <Glyph name={it.icon} />
                  </span>
                  <span className="text-sm font-semibold text-[color:var(--navy-deep)] leading-tight">
                    {it.title}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[color:var(--ink-soft)] leading-snug">
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Three steps */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {FLOW_STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 110}>
            <div className="h-full rounded-2xl bg-white hairline p-6 card-lift">
              <div className="flex items-center gap-3">
                <span
                  className="grid place-items-center w-8 h-8 rounded-full text-xs font-semibold text-white tabular-nums shrink-0"
                  style={{ background: "var(--blue-cta)" }}
                >
                  {s.n}
                </span>
                <span className="text-base font-semibold text-[color:var(--navy-deep)] leading-tight">
                  {s.title}
                </span>
              </div>
              <p className="mt-3 text-sm text-[color:var(--ink-soft)] leading-relaxed">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Decision Maker → Influencer Gap ---------------- */

function GapRow({
  label,
  value,
  fill,
  glow,
  delay,
  shown,
  danger = false,
}: {
  label: string;
  value: number;
  fill: string;
  glow: string;
  delay: number;
  shown: boolean;
  danger?: boolean;
}) {
  const v = useCountUp(value, 1300, shown);
  const pct = (value + 100) / 2; // map NPS (-100..100) to 0..100
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className={danger ? "text-white/90 font-medium" : "text-white/60"}>{label}</span>
        <span
          className="font-semibold tabular-nums"
          style={{ color: danger ? "var(--orange-pop)" : "#fff" }}
        >
          NPS {Math.round(v)}
        </span>
      </div>
      <div className="relative h-2.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full overflow-hidden"
          style={{
            width: shown ? `${pct}%` : "0%",
            background: fill,
            boxShadow: glow,
            transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        >
          <span
            aria-hidden
            className="absolute inset-y-0 w-1/2 -skew-x-12"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              animation: "shimmer-bar 2.6s ease-in-out infinite",
              animationDelay: `${delay + 700}ms`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function InfluencerGapCard() {
  const { ref, shown } = useReveal(0.3);
  const rows = [
    {
      label: "Executive / Decision Maker",
      value: 72,
      fill: "linear-gradient(90deg, var(--blue-cta), var(--blue-light))",
      glow: "0 0 16px rgba(49,133,252,0.45)",
    },
    {
      label: "Technical",
      value: 58,
      fill: "linear-gradient(90deg, rgba(49,133,252,0.7), var(--blue-light))",
      glow: "0 0 12px rgba(103,166,255,0.35)",
    },
    {
      label: "Procurement / Commercial",
      value: 49,
      fill: "linear-gradient(90deg, rgba(103,166,255,0.6), var(--blue-light))",
      glow: "0 0 12px rgba(103,166,255,0.3)",
    },
    {
      label: "Operations / Day-to-Day",
      value: 21,
      fill: "linear-gradient(90deg, #c95a26, var(--orange-pop))",
      glow: "0 0 20px rgba(246,130,65,0.6)",
      danger: true,
    },
  ];
  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl glass p-7 md:p-9">
      {/* Sheen sweep on reveal */}
      {shown && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
            animation: "sheen 1.9s ease-out 0.35s both",
          }}
        />
      )}

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2 w-2 rounded-full bg-[color:var(--orange-pop)]"
            style={{ animation: "cell-pulse 2s ease-out infinite" }}
          />
          <span className="text-sm font-semibold text-white">Acme Logistics</span>
        </div>
        <span className="pill">7-month read</span>
      </div>

      <div className="relative mt-7 space-y-6">
        {rows.map((r, i) => (
          <GapRow
            key={r.label}
            label={r.label}
            value={r.value}
            fill={r.fill}
            glow={r.glow}
            delay={i * 140}
            shown={shown}
            danger={r.danger}
          />
        ))}
      </div>

      {/* The gap is the insight */}
      <div
        className="relative mt-7 rounded-xl p-5"
        style={{
          background: "rgba(246,130,65,0.10)",
          border: "1px solid rgba(246,130,65,0.30)",
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className="text-2xl font-semibold tabular-nums text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              72
            </span>
            <span className="text-lg text-[color:var(--orange-pop)]">↓</span>
            <span
              className="text-2xl font-semibold tabular-nums text-[color:var(--orange-pop)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              21
            </span>
          </div>
          <div className="text-right">
            <div
              className="text-3xl font-semibold tabular-nums text-[color:var(--orange-pop)] leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Δ 51
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-wide text-white/55">point gap</div>
          </div>
        </div>
        <div className="mt-3 text-sm text-white/70">
          Flagged <span className="font-semibold text-white">7 months</span> before renewal, the
          earliest reliable signal this account is at risk.
        </div>
      </div>
    </div>
  );
}

/* ---------------- Interior page hero ----------------
   A lighter hero for interior marketing pages (not the homepage). Navy ground
   that matches the header, an orchestrated stagger entrance, and scroll-linked
   parallax on the decorative layer. Pass `visual` to render a right-side panel
   (two-column); omit it for a single, centered statement. */

export function PageHero({
  eyebrow,
  badge,
  title,
  subtitle,
  primary = { label: "Book a 30-minute call", to: BOOK_PATH },
  secondary,
  trust,
  visual,
  align = "left",
}: {
  eyebrow?: string;
  badge?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  primary?: { label: string; to: string } | null;
  secondary?: { label: string; to: string };
  trust?: string;
  visual?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center" && !visual;
  return (
    <section className="hero-rci relative overflow-hidden bg-[#022550] text-white">
      {/* Decorative, scroll-parallaxed glow layer */}
      <Parallax
        aria-hidden
        distance={70}
        className="pointer-events-none absolute inset-0"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute inset-0 opacity-80"
          style={{
            animation: "aurora-drift 24s ease-in-out infinite",
            backgroundImage:
              "radial-gradient(720px 360px at 82% 6%, rgba(49,133,252,0.24), transparent 64%), radial-gradient(540px 320px at 6% 96%, rgba(0,86,167,0.32), transparent 66%), radial-gradient(360px 220px at 70% 92%, rgba(246,130,65,0.12), transparent 70%)",
          }}
        />
      </Parallax>

      <div
        className={`container-x relative pt-20 pb-20 md:pt-24 md:pb-28 ${
          visual ? "grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16" : ""
        }`}
      >
        <Stagger className={centered ? "mx-auto max-w-3xl text-center" : "max-w-[600px]"}>
          {(eyebrow || badge) && (
            <StaggerItem className={centered ? "flex justify-center" : ""}>
              <div className="flex flex-wrap items-center gap-2.5">
                {eyebrow && (
                  <span className="inline-flex items-center rounded-full bg-[#0a3a6b] px-3 py-1 text-[0.8rem] font-semibold text-[#67a6ff]">
                    {eyebrow}
                  </span>
                )}
                {badge && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(246,130,65,0.35)] bg-[rgba(246,130,65,0.14)] px-3 py-1 text-[0.8rem] font-semibold text-[#ffd2b5]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" />
                    {badge}
                  </span>
                )}
              </div>
            </StaggerItem>
          )}
          <StaggerItem>
            <h1 className="mt-5 !text-[2rem] !font-bold !leading-[1.1] !tracking-[-0.02em] !text-white md:!text-[2.6rem]">
              {title}
            </h1>
          </StaggerItem>
          {subtitle && (
            <StaggerItem>
              <p
                className={`mt-5 text-[1rem] leading-relaxed text-[#bcd6f5] md:text-[1.075rem] ${
                  centered ? "mx-auto max-w-[52ch]" : "max-w-[48ch]"
                }`}
              >
                {subtitle}
              </p>
            </StaggerItem>
          )}
          {(primary || secondary) && (
            <StaggerItem>
              <div className={`mt-8 flex flex-wrap gap-3.5 ${centered ? "justify-center" : ""}`}>
                {primary && (
                  <CTAButton to={primary.to} className="btn-primary">
                    {primary.label}
                  </CTAButton>
                )}
                {secondary && (
                  <a
                    href={secondary.to}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2a5183] px-6 py-3.5 text-[0.9375rem] font-semibold text-[#cfe3ff] transition-[transform,background-color,border-color] duration-200 hover:border-[#67a6ff] hover:bg-white/[0.04] active:scale-[0.98]"
                  >
                    {secondary.label}
                  </a>
                )}
              </div>
            </StaggerItem>
          )}
          {trust && (
            <StaggerItem>
              <div
                className={`mt-7 flex items-center gap-2.5 text-[0.85rem] text-[#9fc0e8] ${
                  centered ? "justify-center" : ""
                }`}
              >
                <ShieldCheckIcon className="h-[18px] w-[18px] flex-none text-[#67a6ff]" />
                {trust}
              </div>
            </StaggerItem>
          )}
        </Stagger>

        {visual && (
          <FadeIn delay={200} className="w-full">
            <Floaty amplitude={8} duration={7}>
              {visual}
            </Floaty>
          </FadeIn>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}

/* ---------------- Scheduling embed ----------------
   Embed-ready booking slot. When a scheduling URL is provided (Calendly,
   HubSpot Meetings, etc.) it renders the embed; otherwise it shows a styled
   "book by email" fallback so the page is live today. Drop in `url` later to
   activate live scheduling. */

export function SchedulingEmbed({
  url,
  email = "sales@vistaxm.com",
  height = 680,
}: {
  url?: string;
  email?: string;
  height?: number;
}) {
  const fields = ["Name", "Work email", "Company", "Role"];
  return (
    <Reveal>
      <div className="overflow-hidden rounded-2xl hairline bg-white shadow-[var(--shadow-elevation-2)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--hairline)] px-5 py-4 md:px-7">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-[color:var(--navy-deep)]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
              <ClockIcon className="h-4 w-4" />
            </span>
            Pick a time
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]/60">
            <span className="h-2 w-2 rounded-full bg-[color:var(--blue-cta)]" />
            30 minutes
          </span>
        </div>

        {url ? (
          <iframe
            title="Book a call"
            src={url}
            className="w-full"
            style={{ height, border: "0" }}
            loading="lazy"
          />
        ) : (
          <div className="px-6 py-10 md:px-10 md:py-12">
            <p className="text-lg font-semibold text-[color:var(--navy-deep)]">
              Book by email while we finish wiring live scheduling.
            </p>
            <p className="mt-2 max-w-prose text-[color:var(--ink-soft)]">
              Send a note and we will reply within one business day with times. No marketing list,
              no obligation. When you reach out, share these four things so we come prepared:
            </p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {fields.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 rounded-xl bg-[color:var(--blue-tint)] px-4 py-3 text-sm font-medium text-[color:var(--navy-deep)]"
                >
                  <CircleCheckIcon className="h-4 w-4 flex-none text-[color:var(--blue-cta)]" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a href={`mailto:${email}`} className="btn-primary">
                Email {email}
              </a>
              <span className="text-sm text-[color:var(--ink-soft)]">
                One business day response.
              </span>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}
