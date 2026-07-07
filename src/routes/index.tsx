import { createFileRoute } from "@tanstack/react-router";
import { BOOK_PATH } from "@/lib/links";
import { canonicalLink } from "@/lib/seo";
import {
  CTABand,
  CTAButton,
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
  TeamSection,
} from "@/components/site";
import { AmbientBand } from "@/components/media";

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
    links: [canonicalLink("/")],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero
        eyebrow="Revenue Channel Intelligence"
        title="Know which accounts are about to grow or walk, while you can still do something about it."
        subtitle="VistaXM turns customer and partner experience into the revenue moves leading firms make every day. Not another score. The next decision."
        primary={{ label: "Book a 30-minute call", to: BOOK_PATH }}
        secondary={{ label: "See how it works", to: "#model" }}
      />

      {/* Proven results: aggregate outcomes */}
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
          intro="Five journey stages across four personas. Where they cross is where retention, expansion, and churn risk really live."
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
            intro="The executive is satisfied. The day-to-day influencers who shape the renewal are not. That gap is the most reliable early warning of churn, and it is invisible to an account-level score."
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

      {/* Our advantage */}
      <Section tint>
        <SectionHead eyebrow="Our advantage" title="Why no one else can produce this." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card title="Structural neutrality" kicker="Advantage 01" delay={0}>
            Our neutrality is a structural advantage. As a neutral third party, customers and
            partners tell us things confidentially that they would never put in a vendor survey.
          </Card>
          <Card title="Industry benchmarks" kicker="Advantage 02" delay={120}>
            We have a robust set of industry benchmarks built from our experience across the
            channel. We help OEMs and Channel Partners understand where they stand against the
            competition with real customer and partner data.
          </Card>
        </div>
      </Section>

      {/* Ambient divider: the work behind the signal */}
      <Section>
        <Reveal>
          <AmbientBand
            image="/images/ambient/analytics-dashboard.jpg"
            alt="Two colleagues reviewing an analytics dashboard on a laptop"
            eyebrow="Where revenue actually moves"
            title="The next decision hides in the day-to-day."
          >
            Not in the headline score, but in how the people closest to the work actually feel.
          </AmbientBand>
        </Reveal>
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
            title="The independent, certified NPS standard for the channel."
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

      {/* How to start */}
      <Section tint>
        <SectionHead
          eyebrow="How to start"
          title="Start small. Scale when it works."
          intro="Two ways in, both fully managed. Prove the signal exists, then expand into the ongoing program."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card title="Essentials" kicker="First wave in about 90 days" delay={0}>
            A fixed, fast first wave. Your certified NPS and your first account-level revenue
            signals, with a prioritized list of moves.
          </Card>
          <Card
            title="The Fully Managed Program"
            kicker="Standard · Advanced · Strategic"
            delay={120}
          >
            The ongoing program that keeps finding and protecting revenue, wave after wave.
            Continuous signal, benchmark tracking, and quarterly reviews, all run by us.
          </Card>
        </div>
        <div className="mt-8">
          <CTAButton to="/how-to-start" className="btn-ghost">
            See how to start
          </CTAButton>
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
            "The data advantage.",
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

      <TeamSection />

      <CTABand />
    </>
  );
}
