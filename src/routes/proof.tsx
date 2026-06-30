import { createFileRoute } from "@tanstack/react-router";
import { BOOK_A_CALL_URL } from "@/lib/links";
import { CTABand, NPSGauge, PageHero, Reveal, Section, SectionHead } from "@/components/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/proof")({
  head: () => ({
    meta: [
      { title: "Proof | VistaXM" },
      {
        name: "description",
        content:
          "A third-party certified NPS and real channel results. Verified evidence you can put in proposals, RFPs, and marketing, with outcomes from named programs.",
      },
      { property: "og:title", content: "Proof | VistaXM" },
      {
        property: "og:description",
        content:
          "Third-party certified NPS, benchmarked against the channel, plus real results: retention, expansion, and revenue protected.",
      },
    ],
  }),
  component: Proof,
});

/* ---------------- Local: small inline icons (internal icons are not exported) ---------------- */

function ProofIcon({ name, className }: { name: string; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "trend":
      return (
        <svg {...common}>
          <path d="M4 16l5-5 3 3 7-7" />
          <path d="M16 7h4v4" />
        </svg>
      );
    case "vault":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M9 15l6-6" />
          <path d="M8 12l-2 2a3 3 0 0 0 4.2 4.2l2-2" />
          <path d="M16 12l2-2a3 3 0 0 0-4.2-4.2l-2 2" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 16h6M9 10h2" />
        </svg>
      );
    default:
      return null;
  }
}

/* ---------------- Local: result card grouped by client ---------------- */

function ResultCard({
  client,
  headline,
  metrics,
  icon,
  delay = 0,
}: {
  client: string;
  headline: string;
  metrics: { value: string; label: string }[];
  icon: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl hairline bg-white p-7 md:p-8 card-lift">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-link)]">
            {client}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
            <ProofIcon name={icon} className="h-[18px] w-[18px]" />
          </span>
        </div>
        <p className="mt-4 text-[1.0625rem] font-semibold leading-snug text-[color:var(--navy-deep)]">
          {headline}
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-6">
          {metrics.map((m) => (
            <div key={m.label}>
              <dt
                className="text-3xl font-semibold tabular-nums tracking-tight text-[color:var(--navy-deep)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {m.value}
              </dt>
              <dd className="mt-1.5 text-xs leading-relaxed text-[color:var(--ink-soft)]">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}

/* ---------------- Local: sample deliverable mock (clearly tagged) ---------------- */

function SampleDeliverable({
  account,
  title,
  rows,
}: {
  account: string;
  title: string;
  rows: { label: string; value: string; accent?: boolean }[];
}) {
  return (
    <div
      className="overflow-hidden rounded-[14px]"
      style={{
        background: "#06294e",
        border: "0.5px solid #1f4878",
        borderLeft: "3px solid #67a6ff",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a3a6b]">
            <ProofIcon name="doc" className="h-4 w-4 text-[#67a6ff]" />
          </span>
          <span className="text-[0.8rem] font-semibold text-white">Account readout</span>
        </div>
        <span className="text-[0.72rem] font-semibold text-[#7fa3cf]">{account}</span>
      </div>

      <div className="px-4 py-4">
        <div
          className="text-[15px] font-bold leading-snug text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </div>
        <div className="mt-3.5 space-y-2.5">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-baseline justify-between border-b border-white/10 pb-2.5 last:border-0 last:pb-0"
            >
              <span className="text-[12.5px] text-[#cfe0f7]">{r.label}</span>
              <span
                className="text-[12.5px] font-semibold tabular-nums"
                style={{ color: r.accent ? "#f68241" : "#ffffff" }}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Visible sample tag: never a real client */}
      <div
        className="flex items-center gap-1.5 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#7fa3cf]"
        style={{ background: "#08305c", borderTop: "1px solid rgba(255,255,255,.08)" }}
      >
        <span className="h-1 w-1 rounded-full bg-[#7fa3cf]" aria-hidden />
        Sample, not a real client
      </div>
    </div>
  );
}

function Proof() {
  return (
    <>
      <PageHero
        eyebrow="Proof"
        title="The only certified NPS your competitors cannot print for themselves."
        subtitle="Third-party verified, benchmarked against the channel. Real results below."
        primary={{ label: "Book a 30-minute call", to: BOOK_A_CALL_URL }}
      />

      {/* The certified NPS */}
      <Section dark>
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <SectionHead
            dark
            eyebrow="The certified NPS"
            title="The independent, certified NPS standard for the channel."
            intro="A third-party certified NPS you can use in proposals, RFPs, and marketing. Verifiable evidence, where a self-reported number is not. One competitive win attributable to the credential pays for the program many times over."
          />
          <Reveal delay={140}>
            <div className="relative rounded-2xl glass p-8 md:p-10">
              <NPSGauge value={68} />
              <div className="mt-6 flex items-center justify-between text-xs text-white/70">
                <span>Top quartile · Channel benchmark</span>
                <span
                  className="pill"
                  style={{
                    background: "rgba(246,130,65,0.16)",
                    borderColor: "rgba(246,130,65,0.35)",
                    color: "#ffd2b5",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--orange-pop)]" />
                  Independently verified
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Real results */}
      <Section>
        <SectionHead
          eyebrow="Real results"
          title="Outcomes, not vanity metrics."
          intro="Real programs, real numbers. Retention held, expansion found, and revenue protected before a renewal was ever at risk."
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          <StaggerItem className="h-full">
            <ResultCard
              client="Softchoice"
              headline="Compounding score motion that moved the business, over two years."
              icon="trend"
              metrics={[
                { value: "+8", label: "NPS over two years" },
                { value: "$8.4M", label: "Business impact" },
                { value: "4%", label: "Lower churn" },
                { value: "10%", label: "Higher win rates" },
              ]}
            />
          </StaggerItem>
          <StaggerItem className="h-full">
            <ResultCard
              client="Veeam"
              headline="A step change in sentiment that tracked directly with growth."
              icon="trend"
              metrics={[
                { value: "30 → 73", label: "NPS movement" },
                { value: "27%", label: "Year-over-year growth" },
              ]}
            />
          </StaggerItem>
          <StaggerItem className="h-full">
            <ResultCard
              client="Industrial supplier"
              headline="A full-service industrial supplier, anonymized. Hidden risk and upside, surfaced."
              icon="vault"
              metrics={[
                { value: "$26.8M", label: "Opportunity-and-risk pool surfaced" },
                { value: "$11M+", label: "Revenue protected" },
              ]}
            />
          </StaggerItem>
        </Stagger>

        <FadeIn delay={120} className="mt-6">
          <div className="flex flex-col gap-5 rounded-2xl hairline bg-[color:var(--blue-tint)] p-7 md:flex-row md:items-center md:gap-8 md:p-9">
            <div
              className="text-5xl font-semibold tabular-nums tracking-tight text-[color:var(--navy-deep)] md:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              33%
            </div>
            <p className="text-base leading-relaxed text-[color:var(--ink-soft)] md:max-w-[60ch]">
              Market reality: only 33% of companies that measure NPS ever link it to revenue. A
              number that is never tied to a dollar is a number that never changes a decision.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Testimonial */}
      <Section tint>
        <FadeIn>
          <figure className="relative mx-auto max-w-4xl rounded-[1.75rem] hairline bg-white p-9 shadow-[0_30px_80px_-40px_rgba(2,37,80,.35)] md:p-14">
            <span
              aria-hidden
              className="absolute left-7 top-3 text-7xl leading-none text-[color:var(--orange-pop)]/25 md:left-10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;
            </span>
            <blockquote
              className="relative text-xl font-semibold leading-snug text-[color:var(--navy-deep)] md:text-[1.625rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              They bring an agnostic viewpoint into the data we are gathering and help us break down
              the results to highlight where we are doing well and where we need to make
              adjustments. Having that unbiased filter, with the readout coming from the VistaXM
              team, is critical to our mission.
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3 text-sm">
              <span
                aria-hidden
                className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--navy-deep)] to-[color:var(--blue-cta)] font-semibold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                DD
              </span>
              <span className="font-semibold text-[color:var(--navy-deep)]">
                Deanna Davenport, VP of Customer Experience, ePlus
                <span className="mt-0.5 block text-xs font-normal text-[color:var(--ink-soft)]">
                  Quoted in CRN, April 2026
                </span>
              </span>
            </figcaption>
          </figure>
        </FadeIn>
      </Section>

      {/* Sample deliverables */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHead
            eyebrow="Sample deliverables"
            title="See a readout before you commit."
            intro="Sample deliverables, clearly labeled as samples and not real client data, are available on request. They show the exact format you receive: a named account, the dollars in play, and the move that changes the outcome."
          />
          <FadeIn delay={140}>
            <div className="grid gap-4 sm:grid-cols-2">
              <SampleDeliverable
                account="Zynaptic"
                title="A renewal is drifting toward risk."
                rows={[
                  { label: "Revenue at risk", value: "$1.4M", accent: true },
                  { label: "Detractor gap", value: "44 pts", accent: true },
                  { label: "Recommended move", value: "Re-engage users" },
                ]}
              />
              <SampleDeliverable
                account="Meridian"
                title="Expansion is sitting unused."
                rows={[
                  { label: "Latent expansion", value: "$2.1M" },
                  { label: "Promoter strength", value: "Strong" },
                  { label: "Recommended move", value: "Open the play" },
                ]}
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
