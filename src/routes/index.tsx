import { createFileRoute } from "@tanstack/react-router";
import {
  CTABand,
  Card,
  Hero,
  InfluencerGapCard,
  JourneyMatrix,
  NPSGauge,
  Reveal,
  ScoreVsDecision,
  Section,
  SectionHead,
  SpendByCohort,
  Stat,
} from "@/components/site";
import { useReveal, useCountUp } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VistaXM — Revenue Channel Intelligence" },
      { name: "description", content: "Your NPS is a score. Your renewal is a decision. VistaXM turns partner and broker experience into account-level revenue signals for OEMs, IT channel companies, and insurance carriers." },
      { property: "og:title", content: "VistaXM — Revenue Channel Intelligence" },
      { property: "og:description", content: "Turn partner and broker experience into the account-level signal of where revenue is about to grow or walk." },
    ],
  }),
  component: Home,
});

function AnimatedStat({ value, suffix = "", prefix = "", label }: { value: number; suffix?: string; prefix?: string; label: string }) {
  const { ref, shown } = useReveal(0.4);
  const v = useCountUp(value, 1500, shown);
  const display = value >= 100 ? Math.round(v).toLocaleString() : v.toFixed(0);
  return (
    <div ref={ref} className="rounded-2xl hairline bg-white p-7 card-lift h-full">
      <div className="text-4xl md:text-5xl font-semibold text-[color:var(--navy-deep)] tracking-tight tabular-nums">
        {prefix}{display}{suffix}
      </div>
      <div className="mt-3 text-sm text-[color:var(--ink-soft)] leading-relaxed">{label}</div>
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero
        eyebrow="Revenue Channel Intelligence"
        title={<>Your NPS is a score.<br className="hidden md:block" /> <span className="text-[color:var(--blue-light)]">Your renewal is a decision.</span></>}
        subtitle="We turn partner and broker experience into the account-level signal of where revenue is about to grow or walk — months before it shows up in a renewal."
        primary={{ label: "Book a 30-minute conversation", to: "mailto:sales@vistaxm.com" }}
        secondary={{ label: "See the model", to: "#model" }}
      />

      {/* The partner shadow */}
      <Section>
        <SectionHead
          eyebrow="The partner shadow"
          title="The channel runs on recurring revenue. The relationship is the revenue."
          intro="When there is a partner or broker in the middle, the vendor cannot see or trust how the end customer is being served. That blind spot is where churn forms — months before it shows up in the numbers."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Card title="Vendor" kicker="What they see">A pipeline number and a partner-reported forecast. No window into the end-customer relationship.</Card>
          <Card title="Partner / Broker" kicker="What they share">What helps the deal. The candid signal that predicts retention is rarely written down.</Card>
          <Card title="End Customer" kicker="What's invisible">Frustration with onboarding, support, or operations — voiced to no one until renewal arrives.</Card>
        </div>
      </Section>

      {/* Why a single score fails — Before / After */}
      <Section tint>
        <SectionHead
          eyebrow="Why a single score fails"
          title="A score can't tell you which account, which stage, or which person."
          intro="In the channel it can't even tell you whose problem it is to fix. The score is a vanity metric. The decision is a revenue act."
        />
        <div className="mt-14"><ScoreVsDecision /></div>
      </Section>

      {/* The model — Journey × Persona */}
      <Section id="model">
        <SectionHead
          eyebrow="The model"
          title="Journey × Persona. Every intersection is a revenue signal."
          intro="Five journey stages across four personas. Where they cross is where retention, expansion, and churn risk actually live."
        />
        <div className="mt-14"><JourneyMatrix /></div>
      </Section>

      {/* Signature insight — Decision Maker → Influencer gap */}
      <Section tint>
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
          <SectionHead
            eyebrow="The signature insight"
            title="The Decision Maker → Influencer gap."
            intro="The executive is satisfied. The day-to-day influencers who actually shape the renewal are not. That gap is the most reliable early warning of churn — and it is invisible to an account-level score."
          />
          <Reveal delay={120}><InfluencerGapCard /></Reveal>
        </div>
      </Section>

      {/* Spend by cohort */}
      <Section>
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
          <SectionHead
            eyebrow="Promoter · Passive · Detractor"
            title="Sentiment is a spend pattern."
            intro="When you stack actual revenue against cohort, the chart stops being satisfaction research and starts being a portfolio map."
          />
          <Reveal delay={120}><SpendByCohort /></Reveal>
        </div>
      </Section>

      {/* Two moats */}
      <Section tint>
        <SectionHead
          eyebrow="The two moats"
          title="Why no one else can produce this."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card title="Neutrality" kicker="Moat 01">
            As a neutral third party, VistaXM gets candid signal neither the vendor nor the partner can collect for themselves. Customers tell us what they would never put in a vendor survey.
          </Card>
          <Card title="The data moat" kicker="Moat 02">
            The channel's largest standardized, apples-to-apples benchmark set — compounding with every customer added. You are measured against the channel, not against yourself last quarter.
          </Card>
        </div>
      </Section>

      {/* Certified NPS — gauge */}
      <Section dark>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <SectionHead
            dark
            eyebrow="The certified NPS"
            title="The J.D. Power of the channel."
            intro="A third-party certified NPS, usable in proposals, RFPs, and marketing. The only certified NPS a carrier or OEM cannot produce for itself."
          />
          <Reveal delay={140}>
            <div className="relative rounded-2xl glass p-8 md:p-10">
              <NPSGauge value={68} />
              <div className="mt-6 flex items-center justify-between text-xs text-white/70">
                <span>Top quartile · Channel benchmark</span>
                <span className="pill" style={{ background: "rgba(246,130,65,0.16)", borderColor: "rgba(246,130,65,0.35)", color: "#ffd2b5" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--orange-pop)]" />
                  Independently verified
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Proof — animated counters */}
      <Section>
        <SectionHead eyebrow="Proof" title="Experience is revenue. Here's the receipts." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedStat value={8} prefix="+" label="Softchoice NPS lift over two years — $8.4M business impact, 4% lower churn, 10% higher win rates." />
          <Stat value="30 → 73" label="Veeam NPS lift alongside 27% year-over-year revenue growth." />
          <AnimatedStat value={26.8} prefix="$" suffix="M" label="Opportunity-and-risk pool surfaced for an industrial supplier; $11M+ protected." />
          <AnimatedStat value={33} suffix="%" label="Only one-third of companies that measure NPS link it to revenue. The rest are flying blind." />
        </div>
      </Section>

      {/* Offer ladder */}
      <Section tint>
        <SectionHead eyebrow="The offer ladder" title="Three ways to start." intro="Low-risk proof to fully managed program." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Card title="Rapid Diagnostic" kicker="$25k–$50k · 3 weeks">
            Targeted slice of your channel or book of business. Low-risk proof that the signal exists and that it changes a decision.
          </Card>
          <Card title="RCI Essentials" kicker="~$25k · first wave in 90 days">
            First production wave of Revenue Channel Intelligence across journey × persona. Account-level scoring and your first benchmark.
          </Card>
          <Card title="Managed Program" kicker="Ongoing">
            The full ongoing program. PartnerPulse and BrokerPulse, continuous signal, executive reviews, certified NPS, benchmark compounding.
          </Card>
        </div>
      </Section>

      {/* Pillars strip */}
      <section className="relative bg-[color:var(--navy)] text-white grain overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(700px 200px at 50% 50%, rgba(49,133,252,0.18), transparent 70%)",
          }}
        />
        <div className="container-x relative py-16 grid gap-6 md:grid-cols-5 text-center">
          {[
            "Experience is revenue.",
            "Persona × journey, not a score.",
            "Neutral and certified.",
            "Managed, fast, proven.",
            "The data moat.",
          ].map((p) => (
            <Reveal key={p}>
              <div className="text-sm md:text-[0.95rem] font-semibold text-white tracking-tight">{p}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
