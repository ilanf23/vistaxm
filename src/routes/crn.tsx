import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  Factory,
  Users,
  Gauge,
  Route as RouteIcon,
  RefreshCw,
  Zap,
  FileText,
  BarChart3,
  Download,
  ArrowRight,
} from "lucide-react";
import { BOOK_PATH } from "@/lib/links";
import {
  CTAButton,
  PageHero,
  Reveal,
  RevenueDecisionNetwork,
  RevenueSignalCard,
  Section,
  SectionHead,
} from "@/components/site";
import { FadeIn, Parallax } from "@/components/motion";
import { useCountUp, useReveal } from "@/hooks/use-reveal";

/* ============================================================================
   CRN campaign landing page  (/crn)

   A DRAFT campaign page for CRN traffic, built on the VistaXM brand system:
   the shared Header/Footer, PageHero, Section/SectionHead, RevenueSignalCard,
   and the brand utility layer (container-x, hairline, card-lift, eyebrow, pill,
   grain, Reveal/FadeIn/Stagger). It is noindex and is intentionally NOT linked
   from nav, mobile menu, footer, or sitemap: direct link only.
============================================================================ */

export const Route = createFileRoute("/crn")({
  head: () => ({
    meta: [
      { title: "VistaXM x CRN: Revenue Channel Intelligence for the channel" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "The best IT solution providers, MSPs, OEMs and distributors are not working harder. They are working with better intelligence. A fully managed Revenue Channel Intelligence program from VistaXM.",
      },
    ],
  }),
  component: CRNLanding,
});

/* ----------------------------------------------------------------------------
   Config: repointable destinations and download assets.
---------------------------------------------------------------------------- */

// The IT solution provider / MSP chooser card routes here. Left as a named
// constant so it can be repointed to a dedicated provider page later.
const PROVIDER_PATH = "/";

// Placeholder hrefs so the real PDFs can be dropped in later.
const RESOURCES = {
  fiveThings: "#",
  stateOfRci: "#",
} as const;

/* ----------------------------------------------------------------------------
   2. The chooser
---------------------------------------------------------------------------- */

function ChooserCard({
  to,
  icon,
  title,
  body,
  delay = 0,
}: {
  to: string;
  icon: ReactNode;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={to}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl hairline bg-white p-8 card-lift"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
        />
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
          {icon}
        </span>
        <h3 className="mt-6 !text-xl">{title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-[color:var(--ink-soft)]">{body}</p>
        <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--blue-link)]">
          See how it works for you
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

function Chooser() {
  return (
    <Section id="chooser">
      <SectionHead
        eyebrow="Start here"
        title="First, which best describes you?"
        intro="We tailor the whole story to how you sell. Pick your path."
      />
      <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
        <ChooserCard
          to="/for-oems"
          icon={<Factory className="h-6 w-6" strokeWidth={1.6} />}
          title="OEM or Distributor"
          body="You sell through partners and need a neutral, benchmarked view of how your whole channel serves the end customer, before it shows up in revenue."
          delay={0}
        />
        <ChooserCard
          to={PROVIDER_PATH}
          icon={<Users className="h-6 w-6" strokeWidth={1.6} />}
          title="IT Solution Provider or MSP"
          body="You serve customers directly and want to protect renewals and find the expansion sitting unused in your book, without building a CX team."
          delay={120}
        />
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   3. The gap (stats)

   Navy numerals on white, matching the brand Stat/CountStat (orange-on-white
   would fail WCAG AA). The orange top-accent bar carries the section's tension.
---------------------------------------------------------------------------- */

function GapStat({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  // Inner observer drives the count-up; the outer Reveal handles the entrance
  // transform (kept off the card so card-lift's hover translate still works).
  const { ref, shown } = useReveal<HTMLDivElement>(0.4);
  const v = useCountUp(value, 1600, shown);
  return (
    <Reveal delay={delay} className="h-full">
      <div
        ref={ref}
        className="group relative h-full overflow-hidden rounded-2xl hairline bg-white p-8 card-lift"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
        />
        <div
          className="text-5xl font-semibold tracking-tight text-[color:var(--navy-deep)] tabular-nums md:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {Math.round(v)}
          {suffix}
        </div>
        <p className="mt-4 leading-relaxed text-[color:var(--ink-soft)]">{label}</p>
      </div>
    </Reveal>
  );
}

function TheGap() {
  return (
    <section className="relative section-y overflow-hidden bg-[color:var(--blue-tint)]">
      {/* Soft background depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-[color:var(--blue-pale)]/45 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full bg-white/60 blur-3xl"
      />
      <div className="container-x relative">
        <SectionHead
          eyebrow="The gap"
          title="The distance between top performers and the rest is not effort. It is intelligence."
          intro="Most of the channel still runs on gut feel. The providers pulling ahead run on data, and the numbers show the gap."
        />
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3">
          <GapStat
            value={62}
            suffix="%"
            label="of providers still drive account-health decisions off sales-team feedback, not data."
            delay={0}
          />
          <GapStat
            value={58}
            suffix="%"
            label="of B2B tech customers who churn at first renewal blame a bad early experience."
            delay={120}
          />
          <GapStat
            value={78}
            suffix="%"
            label="of providers who collect feedback act on fewer than half the insights they get."
            delay={240}
          />
        </div>
        <Reveal delay={120}>
          <p className="mt-8 text-sm text-[color:var(--ink-soft)]/70">
            Sources: Channel Futures MSP 501, TSIA, VistaXM Channel Research (to confirm).
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   4. Five things
---------------------------------------------------------------------------- */

const PRACTICES = [
  {
    icon: <Gauge className="h-6 w-6" strokeWidth={1.6} />,
    n: "01",
    title: "Replace gut feel with structured measurement",
    practice:
      "They know the health of every account at every stage, from a system that continuously collects and surfaces signal.",
    vistaxm:
      "a continuous program we run for you, producing verified account-health data that flows into renewal and expansion decisions.",
  },
  {
    icon: <RouteIcon className="h-6 w-6" strokeWidth={1.6} />,
    n: "02",
    title: "Measure the full journey, not just the renewal",
    practice:
      "They measure procurement, delivery, onboarding, support, and operations, and act on friction before it compounds.",
    vistaxm:
      "measurement mapped to every phase, surfacing signals early enough to act, not just document.",
  },
  {
    icon: <Users className="h-6 w-6" strokeWidth={1.6} />,
    n: "03",
    title: "See the full buying committee",
    practice:
      "Renewals aren't decided by one person. They track alignment across technical, operations, procurement, and executive stakeholders.",
    vistaxm:
      "programs that reach every stakeholder and surface alignment gaps a single relationship can't detect.",
  },
  {
    icon: <RefreshCw className="h-6 w-6" strokeWidth={1.6} />,
    n: "04",
    title: "Make continuous engagement the advantage",
    practice:
      "Renewals become confirmation conversations, not rescue operations, because drift is caught months early.",
    vistaxm: "the touchpoints, analysis, and alerts that enable proactive management at scale.",
  },
  {
    icon: <Zap className="h-6 w-6" strokeWidth={1.6} />,
    n: "05",
    title: "Turn customer signals into revenue actions",
    practice:
      "A negative signal becomes a CRM flag; a disengaged stakeholder triggers outreach; an expansion signal hits the pipeline review.",
    vistaxm:
      "the survey design, analysis, and workflow integration that turn feedback into decisions, no data scientists to hire.",
  },
];

function PracticeCard({
  icon,
  n,
  title,
  practice,
  vistaxm,
}: {
  icon: ReactNode;
  n: string;
  title: string;
  practice: string;
  vistaxm: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl hairline bg-white p-7 card-lift md:p-8">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="flex gap-5 md:gap-7">
        <div className="flex flex-none flex-col items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
            {icon}
          </span>
          <span
            className="text-sm font-semibold text-[color:var(--ink-soft)]/40 tabular-nums"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {n}
          </span>
        </div>
        <div>
          <h3 className="!text-xl">{title}</h3>
          <p className="mt-3 leading-relaxed text-[color:var(--ink-soft)]">
            {practice}{" "}
            <span className="font-medium text-[color:var(--navy-deep)]">
              <span className="font-semibold text-[color:var(--blue-link)]">With VistaXM:</span>{" "}
              {vistaxm}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function FiveThings() {
  return (
    <Section>
      <SectionHead
        eyebrow="What separates them"
        title="5 things the best providers do differently."
      />
      <div className="mt-12 space-y-5 md:mt-14">
        {PRACTICES.map((p, i) => (
          <Reveal key={p.n} delay={i * 80}>
            <PracticeCard {...p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   Managed band  (cinematic image + parallax, "real people run it for you")
---------------------------------------------------------------------------- */

function ManagedBand() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--navy-deep)] text-white">
      {/* Stock image of the team reviewing signal, scroll-parallaxed */}
      <Parallax distance={40} className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src="/images/partner-shadow/vendor.jpg"
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute left-0 top-1/2 h-[135%] w-full -translate-y-1/2 object-cover object-[70%_center]"
        />
      </Parallax>
      {/* Readability + brand wash: navy on the left, image showing through on the right */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[color:var(--navy-deep)] via-[color:var(--navy-deep)]/90 to-[color:var(--navy-deep)]/25"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 160px 50px rgba(2,21,58,0.75)" }}
      />

      <div className="container-x relative py-24 md:py-32">
        <Reveal>
          <div className="max-w-xl">
            <div className="eyebrow !text-[color:var(--blue-light)] mb-4">Fully managed</div>
            <h2 className="!text-white !text-3xl md:!text-[2.4rem] max-w-[20ch]">
              You don&rsquo;t build the program. Our team runs it for you.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/80">
              Survey design, continuous measurement, analysis, and the workflow that turns signal
              into action, run end to end by VistaXM. No CX team to hire, no data scientists, no
              dashboards to babysit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["First insight in ~90 days", "Neutral third party", "Built for the channel"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-[#cfe3ff] backdrop-blur-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--blue-light)]" />
                    {chip}
                  </span>
                ),
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   5. How it works  (navy band + journey/persona revenue-signal map)
---------------------------------------------------------------------------- */

const HEAT_STAGES = ["Procurement", "Onboarding", "Delivery", "Support", "Operations"] as const;
const HEAT_PERSONAS = ["Technical", "Operations", "Procurement", "Executive"] as const;
type Health = "healthy" | "watch" | "risk";
const HEAT_GRID: Health[][] = [
  ["healthy", "watch", "healthy", "risk", "watch"],
  ["healthy", "healthy", "watch", "risk", "risk"],
  ["watch", "healthy", "healthy", "watch", "healthy"],
  ["healthy", "healthy", "healthy", "watch", "healthy"],
];
// Brand status language (matches JourneyMatrix STATUS_STYLES).
const HEALTH_STYLE: Record<Health, { bg: string; border: string; dot: string; label: string }> = {
  healthy: {
    bg: "rgba(22,163,74,0.10)",
    border: "rgba(22,163,74,0.45)",
    dot: "#16a34a",
    label: "Healthy",
  },
  watch: {
    bg: "rgba(234,179,8,0.14)",
    border: "rgba(202,138,4,0.5)",
    dot: "#ca8a04",
    label: "Watch",
  },
  risk: {
    bg: "rgba(220,38,38,0.10)",
    border: "rgba(220,38,38,0.45)",
    dot: "#dc2626",
    label: "At risk",
  },
};

function SignalMap() {
  return (
    <div className="rounded-2xl hairline bg-white p-3 shadow-[var(--shadow-elevation-3)] md:p-5">
      <div className="mb-1 flex items-center justify-between gap-3 border-b border-[color:var(--hairline)] px-1 pb-3">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-[color:var(--navy-deep)]">
          <span className="flex gap-1" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-[color:var(--gray-line)]" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--gray-line)]" />
            <span className="h-2 w-2 rounded-full bg-[color:var(--gray-line)]" />
          </span>
          Revenue signal map
        </div>
        <span className="pill-light">Journey × Persona</span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[420px]">
          {/* Header row */}
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `92px repeat(${HEAT_STAGES.length}, 1fr)` }}
          >
            <div />
            {HEAT_STAGES.map((s) => (
              <div
                key={s}
                className="px-1 pb-1 text-center text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--ink-soft)]/70"
              >
                {s}
              </div>
            ))}
          </div>
          {/* Body rows */}
          {HEAT_GRID.map((row, r) => (
            <div
              key={HEAT_PERSONAS[r]}
              className="mt-1.5 grid gap-1.5"
              style={{ gridTemplateColumns: `92px repeat(${HEAT_STAGES.length}, 1fr)` }}
            >
              <div className="flex items-center text-[0.72rem] font-semibold text-[color:var(--navy-deep)]">
                {HEAT_PERSONAS[r]}
              </div>
              {row.map((cell, c) => {
                const st = HEALTH_STYLE[cell];
                return (
                  <div
                    key={`${r}-${c}`}
                    className="flex h-10 items-center justify-center rounded-lg"
                    style={{ background: st.bg, boxShadow: `inset 0 0 0 1px ${st.border}` }}
                    aria-label={`${HEAT_PERSONAS[r]}, ${HEAT_STAGES[c]}: ${st.label}`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: st.dot }}
                      aria-hidden
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center gap-5 border-t border-[color:var(--hairline)] pt-4 text-xs text-[color:var(--ink-soft)]">
        {(["healthy", "watch", "risk"] as Health[]).map((k) => (
          <span key={k} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-sm"
              style={{
                background: HEALTH_STYLE[k].bg,
                boxShadow: `inset 0 0 0 1px ${HEALTH_STYLE[k].border}`,
              }}
            />
            {HEALTH_STYLE[k].label}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]/50">
          <span className="h-1 w-1 rounded-full bg-[color:var(--ink-soft)]/50" aria-hidden />
          Illustrative
        </span>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <Section dark>
      <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHead
            dark
            eyebrow="How it works"
            title="Five stages. Four personas. Every intersection is a revenue signal."
            intro="We measure experience across the whole journey and every persona, as a neutral third party, then tie each signal to retention, expansion, and churn. Managed end to end, first insight in about 90 days."
          />
          <Reveal delay={140}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="pill">Signal</span>
              <ArrowRight className="h-4 w-4 text-[color:var(--blue-light)]" aria-hidden />
              <span className="pill">Decision</span>
              <ArrowRight className="h-4 w-4 text-[color:var(--blue-light)]" aria-hidden />
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold"
                style={{
                  background: "rgba(246,130,65,0.16)",
                  border: "1px solid rgba(246,130,65,0.4)",
                  color: "#ffd2b5",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" />
                Action
              </span>
            </div>
          </Reveal>
        </div>
        <FadeIn delay={160}>
          <SignalMap />
        </FadeIn>
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   6. Proof
---------------------------------------------------------------------------- */

function ResultCard({
  brand,
  metric,
  detail,
  delay = 0,
}: {
  brand: string;
  metric: string;
  detail: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group relative h-full overflow-hidden rounded-2xl hairline bg-white p-8 card-lift">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
        />
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--blue-link)]">
          {brand}
        </div>
        <div
          className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--navy-deep)] tabular-nums md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {metric}
        </div>
        <p className="mt-3 leading-relaxed text-[color:var(--ink-soft)]">{detail}</p>
      </div>
    </Reveal>
  );
}

function Proof() {
  return (
    <Section>
      <SectionHead eyebrow="Proof" title="Real programs. Real numbers." />
      <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3">
        <ResultCard
          brand="IT Solution Provider"
          metric="+8 NPS"
          detail="$8.4M impact · 4% lower churn · 10% higher win rates"
          delay={0}
        />
        <ResultCard
          brand="Fintech SaaS Provider"
          metric="85% → 95%"
          detail="Net Revenue Retention · 6× survey response · weeks to value · zero internal CX headcount"
          delay={120}
        />
        <ResultCard
          brand="Industrial Distributor"
          metric="$11M+"
          detail="revenue protected from a $26.8M risk-and-opportunity pool"
          delay={240}
        />
      </div>

      <Reveal delay={160}>
        <figure className="relative mt-8 overflow-hidden rounded-2xl bg-white p-8 shadow-[var(--shadow-elevation-2)] md:p-10">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1 bg-[color:var(--orange-pop)]"
          />
          <span
            aria-hidden
            className="absolute left-7 top-4 text-6xl leading-none text-[color:var(--orange-pop)]/25"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;
          </span>
          <blockquote
            className="relative pl-4 text-xl font-semibold leading-snug text-[color:var(--navy-deep)] md:text-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            They bring an agnostic viewpoint into the data... having that unbiased filter, with the
            readout coming from the VistaXM team, is critical to our mission.&rdquo;
          </blockquote>
          <figcaption className="relative mt-5 pl-4 text-sm text-[color:var(--ink-soft)]">
            <span className="font-semibold text-[color:var(--navy-deep)]">Deanna Davenport</span>,
            VP of Customer Experience, ePlus · quoted in CRN, April 2026.
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   7. Downloads
---------------------------------------------------------------------------- */

function DownloadCard({
  href,
  icon,
  title,
  kind,
  delay = 0,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  kind: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <a
        href={href}
        className="group relative flex h-full items-center gap-5 overflow-hidden rounded-2xl hairline bg-white p-7 card-lift"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
        />
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
          {icon}
        </span>
        <div className="flex-1">
          <h3 className="!text-lg">{title}</h3>
          <div className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]/60">
            {kind}
          </div>
        </div>
        <Download className="h-5 w-5 flex-none text-[color:var(--blue-link)] transition-transform duration-200 group-hover:translate-y-0.5" />
      </a>
    </Reveal>
  );
}

function Downloads() {
  return (
    <Section tint>
      <SectionHead eyebrow="Take the research with you" title="Two reads, free to download." />
      <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
        <DownloadCard
          href={RESOURCES.fiveThings}
          icon={<FileText className="h-6 w-6" strokeWidth={1.6} />}
          title="5 Things the Best Providers Do Differently"
          kind="Brief · PDF"
          delay={0}
        />
        <DownloadCard
          href={RESOURCES.stateOfRci}
          icon={<BarChart3 className="h-6 w-6" strokeWidth={1.6} />}
          title="The State of Revenue Channel Intelligence"
          kind="Report · PDF"
          delay={120}
        />
      </div>
    </Section>
  );
}

/* ----------------------------------------------------------------------------
   8. Final CTA  (brand navy band, mirrors CTABand)
---------------------------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--navy-deep)] text-white grain">
      <div
        aria-hidden
        className="absolute inset-0 opacity-80"
        style={{
          animation: "aurora-drift 24s ease-in-out infinite",
          backgroundImage:
            "radial-gradient(600px 300px at 85% 50%, rgba(49,133,252,0.25), transparent 70%), radial-gradient(500px 260px at 10% 50%, rgba(0,86,167,0.35), transparent 70%), radial-gradient(320px 200px at 60% 90%, rgba(246,130,65,0.12), transparent 70%)",
        }}
      />
      <div className="container-x relative py-20 text-center md:py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <div className="eyebrow !text-[color:var(--blue-light)] mb-3 justify-center">
              See the signal
            </div>
            <h2 className="!text-white !text-3xl md:!text-[2.5rem]">
              See where your revenue is really headed.
            </h2>
            <p className="mt-4 text-white/70">
              A 30-minute conversation. No deck. We show you the signal in your own accounts.
            </p>
            <div className="mt-8 flex justify-center">
              <CTAButton to={BOOK_PATH} className="btn-primary">
                Book a 30-minute call
              </CTAButton>
            </div>
            <p className="mt-8 text-sm text-white/55">
              VistaXM · Revenue Channel Intelligence · paul@vistaxm.com
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------
   Page
---------------------------------------------------------------------------- */

function CRNLanding() {
  return (
    <>
      <PageHero
        eyebrow="For IT solution providers, MSPs, OEMs & distributors"
        badge="In partnership with CRN"
        title={
          <>
            The best providers aren&rsquo;t working harder.{" "}
            <span className="text-[color:var(--blue-light)]">
              They&rsquo;re working with better intelligence.
            </span>
          </>
        }
        subtitle="Top performers grow net revenue retention, expand accounts, and walk into renewals with confidence, not because they try harder, but because they see what is happening in every account before it shows up in the numbers. VistaXM runs that program for you, fully managed."
        primary={{ label: "Book a 30-minute call", to: BOOK_PATH }}
        secondary={{ label: "Choose your path", to: "#chooser" }}
        visual={
          <>
            {/* Same revenue-signal graphic as the homepage hero: the full
                decision network on large screens, the signal card on mobile. */}
            <div className="hidden lg:block">
              <RevenueDecisionNetwork />
            </div>
            <div className="mx-auto max-w-[360px] lg:hidden">
              <RevenueSignalCard />
            </div>
          </>
        }
      />
      <Chooser />
      <TheGap />
      <FiveThings />
      <ManagedBand />
      <HowItWorks />
      <Proof />
      <Downloads />
      <FinalCTA />
    </>
  );
}
