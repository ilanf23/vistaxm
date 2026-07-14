import { createFileRoute, Link } from "@tanstack/react-router";
import { BOOK_PATH } from "@/lib/links";
import { canonicalLink, faqJsonLd, type Faq } from "@/lib/seo";
import {
  CertifiedScoreSeal,
  CTABand,
  FAQSection,
  NPSGauge,
  PageHero,
  Reveal,
  Section,
  SectionHead,
} from "@/components/site";
import { AmbientBand } from "@/components/media";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { useCountUp, useReveal } from "@/hooks/use-reveal";

const FAQS: Faq[] = [
  {
    question: "Can we put the certified NPS in proposals and RFPs?",
    answer:
      "Yes. It is third-party verified, so you can cite it in proposals, RFPs, investor communications, and marketing, the same way ePlus published theirs. A self-reported number does not carry the same weight, because the party being rated cannot certify itself.",
  },
  {
    question: "What does the score get benchmarked against?",
    answer:
      "Your certified NPS is placed against the channel and the broader technology industry, where the average runs about 40 to 55. You see where you land relative to peers, not just an absolute number floating on its own.",
  },
  {
    question: "How is this different from running our own NPS survey?",
    answer:
      "Neutrality. Customers and partners tell an independent third party things they will never put in a vendor's own survey, and you cannot certify a score you produced yourself. That independence is exactly what makes the result usable as external proof.",
  },
  {
    question: "How large a sample do you need for a credible result?",
    answer:
      "Enough responses to be representative of your customer base, designed up front with you. The ePlus certification drew on more than 1,400 customers. Credibility comes from sound methodology and response quality, not volume alone.",
  },
];

export const Route = createFileRoute("/proof")({
  head: () => ({
    meta: [
      { title: "Proof: Certified NPS and Revenue Results | VistaXM" },
      {
        name: "description",
        content:
          "Independent, certified NPS results, including ePlus at 74 versus the 40 to 55 industry average. See how VistaXM protects and grows channel revenue.",
      },
      { property: "og:title", content: "Proof: Certified NPS and Revenue Results | VistaXM" },
      {
        property: "og:description",
        content:
          "Third-party certified NPS, benchmarked against the channel, plus real results: retention, expansion, and revenue protected.",
      },
    ],
    links: [canonicalLink("/proof")],
    scripts: [faqJsonLd(FAQS)],
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
  quote,
  attribution,
  ctaLabel,
  ctaTo,
  delay = 0,
}: {
  client: string;
  headline: string;
  metrics: { value: string; label: string }[];
  icon: string;
  quote?: string;
  attribution?: string;
  ctaLabel?: string;
  ctaTo?: "/case-studies/jf-petroleum";
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
                className="whitespace-nowrap text-3xl font-semibold tabular-nums tracking-tight text-[color:var(--navy-deep)]"
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
        {quote && (
          <figure className="mt-6 border-t border-[color:var(--hairline)] pt-5">
            <blockquote className="text-sm italic leading-relaxed text-[color:var(--ink)]">
              <span aria-hidden className="mr-1 text-[color:var(--navy-deep)]">
                &ldquo;
              </span>
              {quote}
              <span aria-hidden className="ml-0.5 text-[color:var(--navy-deep)]">
                &rdquo;
              </span>
            </blockquote>
            {attribution && (
              <figcaption className="mt-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
                {attribution}
              </figcaption>
            )}
          </figure>
        )}
        {ctaTo && ctaLabel && (
          <div className="mt-auto pt-6">
            <Link
              to={ctaTo}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--blue-link)] hover:text-[color:var(--navy-deep)]"
            >
              {ctaLabel}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </Reveal>
  );
}

/* ---------------- Local: sample deliverable mock (clearly tagged) ---------------- */

function SampleDeliverable({
  account,
  signal,
  title,
  hero,
  metric,
  move,
}: {
  account: string;
  signal: "risk" | "upside";
  title: string;
  hero: { value: string; label: string };
  metric: { label: string; value: string; fill: number };
  move: string;
}) {
  // One hot accent, reserved for the account at risk; upside stays calm navy.
  const sig = signal === "risk" ? "var(--orange-pop)" : "var(--navy-deep)";
  return (
    <div className="flex flex-col gap-4 rounded-2xl hairline bg-[color:var(--blue-tint)] p-5 md:p-[22px]">
      {/* Header: source + named account */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] hairline bg-white text-[color:var(--blue-link)]">
            <ProofIcon name="doc" className="h-[13px] w-[13px]" />
          </span>
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[color:var(--ink-soft)] opacity-70">
            Account readout
          </span>
        </div>
        <span className="text-[0.85rem] font-bold text-[color:var(--navy-deep)]">{account}</span>
      </div>

      {/* The finding */}
      <div className="text-[17px] font-bold leading-snug text-[color:var(--navy-deep)]">
        {title}
      </div>

      {/* Dollars in play: the hero figure */}
      <div className="flex items-baseline gap-2.5">
        <span
          className="text-[2.5rem] font-bold leading-[0.9] tracking-tight tabular-nums"
          style={{ fontFamily: "var(--font-display)", color: sig }}
        >
          {hero.value}
        </span>
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-[color:var(--ink-soft)] opacity-75">
          {hero.label}
        </span>
      </div>

      {/* Supporting signal */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <span className="text-[12.5px] text-[color:var(--ink-soft)]">{metric.label}</span>
          <span className="text-[13px] font-bold tabular-nums text-[color:var(--navy-deep)]">
            {metric.value}
          </span>
        </div>
        <div className="h-[5px] overflow-hidden rounded-full bg-[rgba(2,37,80,0.08)]">
          <span
            className="block h-full rounded-full"
            style={{ width: `${metric.fill}%`, background: sig }}
          />
        </div>
      </div>

      {/* The move that changes the outcome */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[color:var(--ink-soft)] opacity-60">
          Recommended move
        </span>
        <div className="flex items-center gap-2.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[17px] w-[17px] shrink-0"
            style={{ color: sig }}
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="text-[15px] font-bold text-[color:var(--navy-deep)]">{move}</span>
        </div>
      </div>

      {/* Visible sample tag: never a real client */}
      <div className="flex items-center gap-1.5 border-t border-[color:var(--gray-line)] pt-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--ink-soft)] opacity-55">
        <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
        Sample, not a real client
      </div>
    </div>
  );
}

/* ---------------- Local: certified-NPS credential seal (hero visual) ---------------- */

function SealMark({ className }: { className?: string }) {
  // A rosette / verified badge: notched outer ring with an inner check.
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className}>
      <path
        d="M24 3.5l4.6 2.9 5.4-.7 2.2 5 4.6 3-1.4 5.3 1.4 5.3-4.6 3-2.2 5-5.4-.7L24 44.5l-4.6-2.9-5.4.7-2.2-5-4.6-3 1.4-5.3L7.2 18l4.6-3 2.2-5 5.4.7L24 3.5z"
        fill="rgba(103,166,255,0.14)"
        stroke="#67a6ff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 24.2l4.4 4.3 8.6-9"
        stroke="#67a6ff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BenchmarkBar({
  label,
  score,
  fill,
  accent,
  shown,
  delay,
}: {
  label: string;
  score: number;
  fill: number; // 0-100 width of the bar
  accent: boolean;
  shown: boolean;
  delay: number;
}) {
  const value = useCountUp(score, 1100, shown);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.8rem] font-medium text-[#bcd6f5]">{label}</span>
        <span
          className="text-[0.95rem] font-semibold tabular-nums text-white"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {Math.round(value)}
          {accent ? "+" : ""}
        </span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full"
          style={{
            width: shown ? `${fill}%` : "0%",
            transition: `width 1100ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            background: accent
              ? "linear-gradient(90deg, var(--blue-cta), var(--blue-light))"
              : "rgba(159,192,232,0.4)",
          }}
        />
      </div>
    </div>
  );
}

function CertifiedSeal() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="glass relative overflow-hidden p-7 md:p-8">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--orange-pop)]"
      />

      {/* Seal header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <CertifiedScoreSeal className="h-12 w-12 flex-none" />
          <div>
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#67a6ff]">
              Certified NPS
            </div>
            <div className="mt-1 text-[0.95rem] font-semibold leading-tight text-white">
              The channel standard
            </div>
          </div>
        </div>
        <span className="inline-flex flex-none items-center gap-1.5 rounded-full border border-[rgba(246,130,65,0.35)] bg-[rgba(246,130,65,0.14)] px-2.5 py-1 text-[0.68rem] font-semibold text-[#ffd2b5]">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" />
          Independently verified
        </span>
      </div>

      {/* Benchmark strip */}
      <div className="mt-8 space-y-5">
        <BenchmarkBar
          label="Top-quartile certified"
          score={70}
          fill={100}
          accent
          shown={shown}
          delay={80}
        />
        <BenchmarkBar
          label="Technology industry average"
          score={55}
          fill={62}
          accent={false}
          shown={shown}
          delay={220}
        />
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center gap-2 border-t border-[color:var(--hairline-dark)] pt-4 text-[0.72rem] font-medium text-[#9fc0e8]">
        <ProofIcon name="shield" className="h-4 w-4 flex-none text-[#67a6ff]" />
        Third-party audited, benchmarked against the channel
      </div>
    </div>
  );
}

/* ---------------- Local: featured ePlus NPS benchmark card ---------------- */

function EPlusBenchmarkCard() {
  const { ref, shown } = useReveal(0.4);
  const v = useCountUp(74, 1600, shown);
  return (
    <Reveal className="h-full">
      <div
        ref={ref}
        className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] hairline bg-[color:var(--blue-tint)] p-9 md:p-12"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--orange-pop)]"
        />

        {/* Attribution + certified chip */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-link)]">
            <span className="normal-case">ePlus</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--blue-pale)] bg-white px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-[0.1em] text-[color:var(--navy-mid)]">
            <ProofIcon name="shield" className="h-3 w-3 text-[color:var(--blue-cta)]" />
            Independently certified
          </span>
        </div>

        {/* The score */}
        <div className="mt-7 flex items-start gap-3">
          <span
            className="text-[6rem] font-semibold leading-[0.85] tracking-tight tabular-nums text-[color:var(--navy-deep)] md:text-[7rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {Math.round(v)}
          </span>
          <span className="mt-3 text-xl font-semibold text-[color:var(--ink-soft)] opacity-[0.55]">
            /100
          </span>
        </div>
        <div className="mt-3 text-lg font-semibold text-[color:var(--navy-deep)]">
          Net Promoter Score
        </div>

        {/* Benchmark scale: 40–55 industry band vs the 74 marker */}
        <div className="mt-8">
          <div className="flex items-baseline justify-between text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[color:var(--ink-soft)]">
            <span>vs. industry average</span>
            <span className="text-[color:var(--orange-pop)]">+19 above the industry average</span>
          </div>
          <div className="relative mt-9 h-3 rounded-full bg-[rgba(2,37,80,0.07)]">
            {/* Industry average band (40 to 55 on a 0 to 100 scale) */}
            <span
              aria-hidden
              className="absolute inset-y-0 rounded bg-[color:var(--blue-pale)] transition-opacity duration-700"
              style={{ left: "40%", width: "15%", opacity: shown ? 1 : 0 }}
            />
            <span
              className="absolute top-[18px] -translate-x-1/2 whitespace-nowrap text-[0.6875rem] font-semibold text-[color:var(--navy-mid)]"
              style={{ left: "47.5%" }}
            >
              Industry avg 40&ndash;55
            </span>
            {/* ePlus marker at 74 */}
            <span
              aria-hidden
              className="absolute top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[color:var(--orange-pop)] shadow-[0_2px_8px_rgba(246,130,65,0.5)]"
              style={{
                left: shown ? "74%" : "0%",
                transition: "left 1.1s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <span
              className="absolute -top-[30px] -translate-x-1/2 whitespace-nowrap text-xs font-bold text-[color:var(--navy-deep)] transition-opacity duration-700"
              style={{ left: "74%", opacity: shown ? 1 : 0 }}
            >
              ePlus &middot; 74
            </span>
          </div>
          <div className="mt-11 flex justify-between text-[0.6875rem] tabular-nums text-[color:var(--ink-soft)] opacity-70">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        {/* Verified-for lockup, replacing the logo placeholder */}
        <div className="mt-auto flex items-center gap-3 border-t border-[color:var(--gray-line)] pt-6">
          <CertifiedScoreSeal className="h-16 w-16 flex-none" />
          <span>
            <span className="block text-sm font-bold text-[color:var(--navy-deep)]">
              Verified for ePlus
            </span>
            <span className="block text-xs text-[color:var(--ink-soft)]">
              1,400+ customers surveyed
            </span>
          </span>
        </div>
      </div>
    </Reveal>
  );
}

function Proof() {
  return (
    <>
      <PageHero
        eyebrow="Proof"
        title="The only certified NPS your competitors cannot print for themselves."
        subtitle="Third-party verified and benchmarked against the channel, evidence you can put in a proposal."
        primary={{ label: "Book a 30-minute call", to: BOOK_PATH }}
        visual={<CertifiedSeal />}
      />

      {/* Featured proof: ePlus independent validation */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <EPlusBenchmarkCard />

          <div>
            <FadeIn>
              <span className="eyebrow">Independently validated</span>
              <p className="mt-5 text-base leading-relaxed text-[color:var(--ink-soft)] md:text-lg">
                In an independent survey of more than 1,400 ePlus customers, conducted by VistaXM as
                a neutral third party, ePlus scored a Net Promoter Score of 74. ePlus, a
                NASDAQ-listed solutions provider, published the result in its own investor
                communications. This is what the independent, certified NPS standard for the channel
                looks like: confirmed by us, an independent, unbiased third party.
              </p>
            </FadeIn>

            <Stagger className="mt-8 grid gap-4" stagger={0.1}>
              <StaggerItem>
                <figure className="rounded-2xl hairline bg-white p-6 md:p-7">
                  <blockquote className="text-[0.95rem] font-medium leading-relaxed text-[color:var(--navy-deep)]">
                    &ldquo;An NPS of 74, validated by an independent body and drawn from more than
                    1,400 voices, tells us that we are not just meeting expectations, we are
                    consistently exceeding them.&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-[color:var(--navy-deep)]">
                    Deanna Davenport
                    <span className="mt-0.5 block text-xs font-normal text-[color:var(--ink-soft)]">
                      Vice President of Customer Experience, ePlus
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
              <StaggerItem>
                <figure className="rounded-2xl hairline bg-white p-6 md:p-7">
                  <blockquote className="text-[0.95rem] font-medium leading-relaxed text-[color:var(--navy-deep)]">
                    &ldquo;An NPS of 74 is exceptionally strong for an IT services company. Scores
                    like this do not happen by accident; they reflect a sustained, organization-wide
                    commitment to the customer relationship.&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-[color:var(--navy-deep)]">
                    Dr. Howard Lax
                    <span className="mt-0.5 block text-xs font-normal text-[color:var(--ink-soft)]">
                      Principal Strategist, Experience Management and Data Science, VistaXM
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            </Stagger>

            <FadeIn delay={160} className="mt-8">
              <a
                href="https://www.eplus.com/who-we-are/investor-relations/press-releases/2026/07/eplus-surpasses-industry-benchmarks-with-outstanding-net-promoter-score-in-independent-survey"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Read the ePlus announcement
              </a>
              <p className="mt-3 text-xs leading-relaxed text-[color:var(--ink-soft)]">
                The announcement also drew endorsements from several of ePlus&rsquo;s major
                technology partners.
              </p>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* The certified NPS */}
      <Section dark>
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <SectionHead
            dark
            eyebrow="The certified NPS"
            title="The independent, certified NPS standard for the channel."
            intro="A third-party certified NPS you can use in proposals, RFPs, and marketing. Verifiable evidence, where a self-reported number is not. Prospects trust independent ratings much more than self-proclaimed greatness."
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
        />

        {/* Market-reality lead-in: connects the header to the results below. */}
        <FadeIn delay={80} className="mt-8">
          <div className="flex flex-col gap-5 rounded-2xl hairline bg-[color:var(--blue-tint)] p-7 md:flex-row md:items-center md:gap-8 md:p-9">
            <div
              className="text-5xl font-semibold tabular-nums tracking-tight text-[color:var(--navy-deep)] md:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              33%
            </div>
            <p className="text-base leading-relaxed text-[color:var(--ink-soft)] md:max-w-[62ch]">
              33% of companies never link NPS to revenue. We are different, we give you the
              insights to take action. Real programs, real numbers.
            </p>
          </div>
        </FadeIn>

        <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          <StaggerItem className="h-full">
            <ResultCard
              client="Fintech SaaS Provider"
              headline="NPS and eNPS tied directly to Net Revenue Retention, and the whole program stood up without a new headcount."
              icon="trend"
              metrics={[
                { value: "85% → 95%", label: "Net Revenue Retention (105% target)" },
                { value: "6×", label: "Survey response rate, first cycle" },
                { value: "Weeks", label: "Time to value, not quarters" },
                { value: "0", label: "Internal CX headcount added" },
              ]}
            />
          </StaggerItem>
          <StaggerItem className="h-full">
            <ResultCard
              client="Industrial Distributor"
              headline="A full-service industrial distributor, anonymized. Hidden risk and upside, surfaced."
              icon="vault"
              metrics={[
                { value: "$26.8M", label: "Opportunity-and-risk pool surfaced" },
                { value: "$11M+", label: "Revenue protected" },
              ]}
            />
          </StaggerItem>
          <StaggerItem className="h-full">
            <ResultCard
              client="JF Petroleum"
              headline="From volume to value: unified operations, assets, and experience with PTC ServiceMax and VistaXM."
              icon="trend"
              metrics={[
                { value: "+30", label: "Technician eNPS, at 55% engagement" },
                { value: "+53%", label: "Transactional NPS improvement" },
                { value: "15%", label: "Improvement in ease of communication" },
                { value: "2×", label: "Detractors more likely to leave" },
              ]}
              ctaLabel="Read the case study"
              ctaTo="/case-studies/jf-petroleum"
            />
          </StaggerItem>
        </Stagger>

        {/* Fintech SaaS pull-quote, extracted to full-width, styled like the OEM
            page's Deanna Davenport quote. */}
        <FadeIn delay={140} className="mt-14">
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote
              className="text-2xl font-semibold leading-snug text-[color:var(--navy-deep)] md:text-[2rem] md:leading-[1.25]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;The correlation of NPS and eNPS to NRR was the aha moment. It was
              gold.&rdquo;
            </blockquote>
            <figcaption className="mt-7 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-link)]">
              Customer Experience Leader, Fintech SaaS Company
            </figcaption>
          </figure>
        </FadeIn>
      </Section>


      {/* Ambient divider: behind the numbers */}
      <Section>
        <Reveal>
          <AmbientBand
            image="/images/ambient/reviewing-results.jpg"
            alt="A team reviewing printed performance charts around a table"
            eyebrow="Behind the numbers"
            title="A result is a decision, made earlier."
          >
            Every outcome above started as a signal someone acted on in time.
          </AmbientBand>
        </Reveal>
      </Section>

      {/* Sample deliverables */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Sample deliverables"
              title="See a readout before you commit."
              intro="A sample deliverable is available upon request. It shows the exact format you receive: a named account, the dollars in play, and the move that changes the outcome."
            />
            <div className="mt-8">
              <a
                href="mailto:contactus@vistaxm.com?subject=Sample%20deliverable%20request&body=Hi%20VistaXM%20team%2C%20please%20send%20me%20the%20sample%20deliverable."
                className="btn-primary"
              >
                Request the sample deliverable
              </a>
              <p className="mt-3 text-xs text-[color:var(--ink-soft)]">Sent to you on request.</p>
            </div>
          </div>
          <FadeIn delay={140}>
            <div className="grid gap-4 sm:grid-cols-2">
              <SampleDeliverable
                account="Sample Client"
                signal="risk"
                title="A renewal is drifting toward risk."
                hero={{ value: "$1.4M", label: "revenue at risk" }}
                metric={{ label: "Detractor gap", value: "44 pts", fill: 44 }}
                move="Re-engage users"
              />
              <SampleDeliverable
                account="Sample Client"
                signal="upside"
                title="Expansion is sitting unused."
                hero={{ value: "$2.1M", label: "latent expansion" }}
                metric={{ label: "Promoter strength", value: "Strong", fill: 82 }}
                move="Open the play"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      <FAQSection items={FAQS} grid />

      <CTABand />
    </>
  );
}
