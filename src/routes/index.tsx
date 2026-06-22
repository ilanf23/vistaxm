import { createFileRoute } from "@tanstack/react-router";
import {
  CTABand,
  Card,
  Hero,
  InfluencerGapCard,
  JourneyMatrix,
  NPSGauge,
  PartnerShadow,
  ProvenResults,
  Reveal,
  RevenueIntelligenceFlow,
  Section,
  SectionHead,
  SpendByCohort,
} from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VistaXM: Revenue Channel Intelligence" },
      {
        name: "description",
        content:
          "Your NPS is a score. Your renewal is a decision. VistaXM turns partner and broker experience into account-level revenue signals for OEMs, IT channel companies, and insurance carriers.",
      },
      { property: "og:title", content: "VistaXM: Revenue Channel Intelligence" },
      {
        property: "og:description",
        content:
          "Turn partner and broker experience into the account-level signal of where revenue is about to grow or walk.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero
        eyebrow="Revenue Channel Intelligence"
        title={
          <>
            Your NPS is a score. Your renewal is{" "}
            <span className="text-[color:var(--blue-cta)]">a decision.</span>
          </>
        }
        subtitle="Revenue Channel Intelligence turns partner and broker experience into the account-level signal of where revenue is about to grow or walk, before it shows up in a renewal."
        primary={{ label: "Book a 30-minute conversation", to: "mailto:sales@vistaxm.com" }}
        secondary={{ label: "Start with a 3-week Rapid Diagnostic", to: "#model" }}
        hint="Click any cell in the dashboard to see the account-level signal."
      />

      {/* Proven results — aggregate outcomes */}
      <ProvenResults />

      {/* Why a single score fails: signals to revenue intelligence */}
      <Section tint>
        <SectionHead
          eyebrow="Why a single score fails"
          title="A score can't tell you which account, which stage, or which person."
          intro="In the channel it can't even tell you whose problem it is to fix. The score is a vanity metric. The decision is a revenue act."
        />
        <div className="mt-14">
          <RevenueIntelligenceFlow />
        </div>
      </Section>

      {/* The model: Journey × Persona */}
      <Section id="model">
        <SectionHead
          eyebrow="The model"
          title="Journey × Persona. Every intersection is a revenue signal."
          intro="Five journey stages across four personas. Where they cross is where retention, expansion, and churn risk actually live."
        />
        <div className="mt-14">
          <JourneyMatrix />
        </div>
      </Section>

      {/* Signature insight: Decision Maker → Influencer gap */}
      <Section dark>
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
          <SectionHead
            dark
            eyebrow="The signature insight"
            title="The Decision Maker → Influencer gap."
            intro="The executive is satisfied. The day-to-day influencers who actually shape the renewal are not. That gap is the most reliable early warning of churn, and it is invisible to an account-level score."
          />
          <Reveal delay={120}>
            <InfluencerGapCard />
          </Reveal>
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
          <Reveal delay={120}>
            <SpendByCohort />
          </Reveal>
        </div>
      </Section>

      {/* Two moats */}
      <Section tint>
        <SectionHead eyebrow="The two moats" title="Why no one else can produce this." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card title="Neutrality" kicker="Moat 01" delay={0}>
            As a neutral third party, VistaXM gets candid signal neither the vendor nor the partner
            can collect for themselves. Customers tell us what they would never put in a vendor
            survey.
          </Card>
          <Card title="The data moat" kicker="Moat 02" delay={120}>
            The channel's largest standardized, apples-to-apples benchmark set, compounding with
            every customer added. You are measured against the channel, not against yourself last
            quarter.
          </Card>
        </div>
      </Section>

      {/* The partner shadow */}
      <Section id="partner-shadow" tint className="overflow-hidden">
        <PartnerShadow />
      </Section>

      {/* Certified NPS: gauge */}
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

      {/* Offer ladder */}
      <Section tint>
        <SectionHead
          eyebrow="The offer ladder"
          title="Three ways to start."
          intro="Low-risk proof to fully managed program."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Card title="Rapid Diagnostic" kicker="$25k–$50k · 3 weeks" delay={0}>
            Targeted slice of your channel or book of business. Low-risk proof that the signal
            exists and that it changes a decision.
          </Card>
          <Card title="RCI Essentials" kicker="~$25k · first wave in 90 days" delay={110}>
            First production wave of Revenue Channel Intelligence across journey × persona.
            Account-level scoring and your first benchmark.
          </Card>
          <Card title="Managed Program" kicker="Ongoing" delay={220}>
            The full ongoing program. PartnerPulse and BrokerPulse, continuous signal, executive
            reviews, certified NPS, benchmark compounding.
          </Card>
        </div>
      </Section>

      {/* Pillars strip */}
      <section className="relative bg-[color:var(--navy)] text-white grain overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-50"
          style={{
            animation: "aurora-drift 26s ease-in-out infinite",
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
          ].map((p, i) => (
            <Reveal key={p} delay={i * 90}>
              <div
                className="text-sm md:text-[0.95rem] font-semibold text-white tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
