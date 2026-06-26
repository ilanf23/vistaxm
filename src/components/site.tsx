import { type CSSProperties, type ReactNode } from "react";
import { useReveal, useCountUp } from "@/hooks/use-reveal";
import { FadeIn, Floaty, Parallax, Stagger, StaggerItem } from "@/components/motion";

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
  const external =
    to.startsWith("mailto:") ||
    to.startsWith("http") ||
    to.startsWith("tel:") ||
    to.startsWith("#");
  if (external)
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  return (
    <a href={to} className={className}>
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
            When a partner or broker owns the relationship, the vendor sees the forecast—not the
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
              VistaXM makes the invisible measurable <span aria-hidden>→</span>
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

export function Hero({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  trust,
}: {
  eyebrow?: string;
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

  return (
    <section className="hero-rci relative overflow-hidden bg-[#022550] text-white">
      <div ref={ref} className="container-x relative pt-20 pb-20 md:pt-24 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          {/* Left column: the message */}
          <div className="max-w-[560px]">
            {eyebrow && (
              <div
                className="inline-flex items-center rounded-full bg-[#0a3a6b] px-3 py-1 text-[0.8rem] font-semibold text-[#67a6ff]"
                style={reveal(0)}
              >
                {eyebrow}
              </div>
            )}
            <h1
              className="mt-5 !text-[1.875rem] !font-bold !leading-[1.12] !tracking-[-0.02em] !text-white md:!text-[2.125rem]"
              style={reveal(120)}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="mt-5 max-w-[430px] text-[0.95rem] leading-relaxed text-[#bcd6f5] md:text-[1rem]"
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
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2a5183] px-6 py-3.5 text-[0.9375rem] font-semibold text-[#cfe3ff] transition-[transform,background-color,border-color] duration-200 hover:border-[#67a6ff] hover:bg-white/[0.04] active:scale-[0.98]"
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

          {/* Right column: the "next move" signal card */}
          <div className="w-full lg:w-[340px] lg:justify-self-end">
            <RevenueSignalCard />
          </div>
        </div>
      </div>
      {/* hairline base */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
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
}: {
  account?: string;
  amountLabel?: string;
  reason?: string;
  action?: string;
  daysToRenewal?: number;
  index?: number;
  total?: number;
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
            Renewals · {account}
          </div>
          <div
            className="mt-2.5 text-[17px] font-bold leading-snug text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A {amountLabel} renewal is about to walk.
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-[#cfe0f7]">{reason}</p>

          <div className="mt-3.5 flex items-start gap-2">
            <CircleCheckIcon className="mt-px h-4 w-4 flex-none text-[#f68241]" />
            <span className="text-[12.5px] font-semibold text-white">{action}</span>
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-[0.72rem] text-[#9fc0e8]">
            <ClockIcon className="h-3.5 w-3.5" />
            {daysToRenewal} days to renewal
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "#08305c", borderTop: "1px solid rgba(255,255,255,.08)" }}
        >
          <button
            type="button"
            className="rounded-lg bg-white px-3.5 py-2 text-[0.8rem] font-semibold text-[#022550] transition-[transform,background-color] duration-200 hover:bg-[#eaf2ff] active:scale-[0.98]"
          >
            Start the play
          </button>
          <button
            type="button"
            aria-label="Assign"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0a3a6b] text-[#cfe3ff] transition-[transform,filter] duration-200 hover:brightness-125 active:scale-[0.98]"
          >
            <UserPlusIcon className="h-4 w-4" />
          </button>
          <span className="ml-auto text-[0.72rem] text-[#7fa3cf]">
            {index} of {total}
          </span>
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
  initials,
  delay = 0,
}: {
  name: string;
  title: string;
  bio: string;
  quote: string;
  linkedin: string;
  initials: string;
  delay?: number;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <Reveal delay={delay} className="h-full">
      <div
        ref={ref}
        className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-8 md:p-10 card-lift"
      >
        <div className="flex items-center gap-5">
          <span
            aria-hidden
            className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--navy-deep)] to-[color:var(--blue-cta)] text-xl font-semibold tracking-wide text-white ring-2 ring-[color:var(--blue-cta)] ring-offset-2 ring-offset-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {initials}
          </span>
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

        <div className="mt-auto pt-7">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="inline-flex text-[color:var(--ink-soft)]/40 transition-colors hover:text-[color:var(--blue-cta)] group-hover:text-[color:var(--blue-cta)]"
          >
            <LinkedInIcon className="h-6 w-6" />
          </a>
        </div>
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
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
        <LeaderCard
          name="Erik Vogel"
          title="Founder and CEO"
          initials="EV"
          linkedin="https://www.linkedin.com/in/erikvogel2020/"
          bio="Twenty-six years in IT services. Built the customer experience program for HPE GreenLake, then led the high-tech and telecom practice at Qualtrics, the leading experience platform, advising the world's top technology brands. He founded VistaXM to bring that rigor to the channel."
          quote="Companies don't spend NPS points. They spend dollars."
          delay={0}
        />
        <LeaderCard
          name="Bruce Coughlin"
          title="Chief Growth Officer"
          initials="BC"
          linkedin="https://www.linkedin.com/in/brucecoughlin"
          bio="Former CEO of Cloud Technology Partners, which he helped guide to its acquisition by HPE. A relationship-first channel leader who believes the experience you deliver is the only real differentiator left."
          quote="The most progressive partners create differentiation and sustain it with customer experience. That is the fundamental tenet of what is happening in the channel."
          delay={120}
        />
      </div>
    </Section>
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
          <CTAButton to="/book-a-call" className="btn-primary">
            Book a 30-minute conversation
          </CTAButton>
        </Reveal>
      </div>
    </section>
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
      <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-5">
        {RESULTS.map((r, i) => (
          <CountStat
            key={r.label}
            value={r.value}
            prefix={r.prefix}
            suffix={r.suffix}
            label={r.label}
            delay={i * 120}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Journey × Persona Matrix ---------------- */

const STAGES = [
  "Sales",
  "Procurement & Onboarding",
  "Implementation",
  "Support & Operations",
  "Renewal & Expansion",
] as const;
const PERSONAS = [
  "Executive / Decision Maker",
  "Technical",
  "Procurement / Commercial",
  "Operations / Day-to-Day User",
] as const;

// Curated signal intensities: meaningful pattern, not random
const INTENSITY: number[][] = [
  // Sales, Procurement, Implementation, Support, Renewal
  [0.85, 0.55, 0.4, 0.35, 0.75], // Executive
  [0.45, 0.7, 0.85, 0.65, 0.5], // Technical
  [0.7, 0.8, 0.45, 0.4, 0.6], // Procurement
  [0.3, 0.45, 0.7, 0.8, 1.0], // Operations  ← Renewal cell = early warning
];

export function JourneyMatrix() {
  const { ref, shown } = useReveal(0.2);
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
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            {/* Header row */}
            <div
              className="grid"
              style={{ gridTemplateColumns: `220px repeat(${STAGES.length}, 1fr)` }}
            >
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
                    <div key={s} className="px-2 py-3 border-l border-[color:var(--hairline)]">
                      <div
                        title={`${p} × ${s} · intensity ${(v * 100).toFixed(0)}`}
                        className={`relative h-11 rounded-lg flex items-center justify-center text-[0.7rem] font-semibold transition-all duration-700 ${
                          isEarly ? "text-white" : "text-[color:var(--navy-deep)]"
                        }`}
                        style={{
                          background: isEarly
                            ? "linear-gradient(135deg, #f68241 0%, #e35a1f 100%)"
                            : `rgba(49,133,252, ${shown ? v * 0.22 + 0.04 : 0})`,
                          boxShadow:
                            isEarly && shown
                              ? "0 8px 22px -8px rgba(246,130,65,0.55)"
                              : shown
                                ? `inset 0 0 0 1px rgba(49,133,252, ${v * 0.18})`
                                : "inset 0 0 0 1px transparent",
                          opacity: shown ? 1 : 0,
                          transform: shown ? "scale(1)" : "scale(0.92)",
                          transitionDelay: `${delay}ms`,
                          animation:
                            isEarly && shown
                              ? "cell-pulse 2.6s ease-in-out 1.4s infinite"
                              : undefined,
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
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "linear-gradient(135deg,#f68241,#e35a1f)" }}
          />
          Early warning: Operations × Renewal
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
        <span className="font-semibold text-[color:var(--navy-deep)]">5.2×</span> the lifetime value
        of detractors. A single point of score motion is a portfolio move.
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
            A revenue decision. Not a score.
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
    desc: "See what is actually driving performance.",
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
    desc: "Bring fragmented channel signal into one account-level view.",
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

function FlowRail({ variant }: { variant: "in" | "out" }) {
  const inYs = [28, 89, 150, 210, 271, 332];
  const outYs = [78, 152, 226, 300];
  return (
    <div className="hidden lg:block lg:w-16 self-stretch shrink-0" aria-hidden>
      <svg
        viewBox="0 0 64 360"
        preserveAspectRatio="none"
        className="w-full h-full text-[color:var(--blue-light)]"
      >
        {variant === "in" ? (
          <>
            {inYs.map((y) => (
              <path
                key={y}
                d={`M0 ${y} C 26 ${y}, 30 180, 50 180`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                opacity={0.55}
              />
            ))}
            <path d="M50 180 H64" stroke="currentColor" strokeWidth={1.6} opacity={0.7} />
            <circle cx="50" cy="180" r="3.4" fill="var(--blue-cta)" />
          </>
        ) : (
          <>
            <path d="M0 180 H14" stroke="currentColor" strokeWidth={1.6} opacity={0.7} />
            <circle cx="14" cy="180" r="3.4" fill="var(--blue-cta)" />
            {outYs.map((y) => (
              <path
                key={y}
                d={`M14 180 C 36 180, 40 ${y}, 64 ${y}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.4}
                opacity={0.55}
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
}: {
  label: string;
  children: ReactNode;
  foot: string;
  footColor: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
      <div className="text-[0.6rem] uppercase tracking-wider text-white/55">{label}</div>
      <div className="mt-1.5">{children}</div>
      <div className="mt-1 text-[0.65rem] font-medium" style={{ color: footColor }}>
        {foot}
      </div>
    </div>
  );
}

function FlowDashboard() {
  const { ref, shown } = useReveal();
  const health = Math.round(useCountUp(78, 1300, shown));
  const churn = Math.round(useCountUp(12, 1300, shown));
  const pipeline = useCountUp(2.4, 1300, shown);
  const R = 15;
  const circ = 2 * Math.PI * R;
  return (
    <div className="flex-1 min-w-0">
      <div
        ref={ref}
        className="relative h-full rounded-2xl p-6 md:p-7 text-white grain overflow-hidden shadow-[var(--shadow-elevation-3)]"
        style={{ background: "linear-gradient(160deg, #022550 0%, #062d57 60%, #0d3f7a 100%)" }}
      >
        <div className="relative z-10 flex items-center gap-2.5">
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
          <span className="text-sm font-semibold tracking-tight">VistaXM Revenue Intelligence</span>
        </div>

        <div className="relative z-10 mt-5 grid grid-cols-3 gap-2.5">
          <FlowStatTile label="Health Score" foot="Good" footColor="var(--blue-light)">
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

          <FlowStatTile label="Churn Risk" foot="At Risk" footColor="var(--orange-pop)">
            <span
              className="text-2xl font-semibold tabular-nums"
              style={{ color: "var(--orange-pop)" }}
            >
              {churn}%
            </span>
          </FlowStatTile>

          <FlowStatTile label="Expansion" foot="Pipeline" footColor="var(--blue-light)">
            <span className="text-2xl font-semibold tabular-nums text-white">
              ${pipeline.toFixed(1)}M
            </span>
          </FlowStatTile>
        </div>

        <div className="relative z-10 mt-2.5 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-white/[0.06] border border-white/10 p-3">
            <div className="text-[0.6rem] uppercase tracking-wider text-white/55">
              Signal Trends
            </div>
            <svg
              viewBox="0 0 120 42"
              className="mt-2 w-full h-10"
              preserveAspectRatio="none"
              aria-hidden
            >
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
            <div className="text-[0.6rem] uppercase tracking-wider text-white/55">Top Drivers</div>
            <div className="mt-2.5 space-y-2">
              {[82, 64, 46].map((w, i) => (
                <div key={w} className="h-1.5 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: shown ? `${w}%` : "0%",
                      background: i === 0 ? "var(--blue-cta)" : "var(--blue-light)",
                      transition: `width 0.9s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
                    }}
                  />
                </div>
              ))}
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
  return (
    <div>
      <Reveal>
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-6 lg:gap-0">
          {/* Inputs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:flex lg:flex-col lg:justify-between lg:w-[190px] lg:shrink-0">
            {FLOW_INPUTS.map((it) => (
              <div
                key={it.label}
                className="flex items-center gap-2.5 rounded-xl bg-white hairline px-3.5 py-3 card-lift text-[color:var(--navy-deep)]"
              >
                <span className="grid place-items-center w-8 h-8 rounded-lg bg-[color:var(--blue-tint)] text-[color:var(--blue-cta)] shrink-0">
                  <Glyph name={it.icon} />
                </span>
                <span className="text-sm font-medium leading-tight">{it.label}</span>
              </div>
            ))}
          </div>

          <FlowRail variant="in" />

          <FlowDashboard />

          <FlowRail variant="out" />

          {/* Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:flex lg:flex-col lg:justify-between lg:w-[235px] lg:shrink-0">
            {FLOW_OUTPUTS.map((it) => (
              <div key={it.title} className="rounded-xl bg-white hairline p-3.5 card-lift">
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
            ))}
          </div>
        </div>
      </Reveal>

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
  primary = { label: "Book a 30-minute call", to: "/book-a-call" },
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
