import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  Hero,
  InfluencerGapCard,
  JourneyMatrix,
  PartnerShadow,
  Reveal,
  RevenueIntelligenceFlow,
  Section,
  SectionHead,
} from "@/components/site";
import { BookCallButton } from "@/components/book-call";
import {
  FAQ,
  HowItWorks,
  InsightsPreview,
  Leadership,
  OfferLadder,
  PersonaTabs,
  RealProof,
  TrustBar,
} from "@/components/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VistaXM: Revenue Channel Intelligence" },
      {
        name: "description",
        content:
          "Your NPS is a score. Your renewal is a decision. Revenue Channel Intelligence turns partner and broker experience into account-level revenue signals for OEMs, IT channel companies, and insurance carriers.",
      },
      { property: "og:url", content: "https://vistaxm.lovable.app/" },
      { property: "og:title", content: "VistaXM: Revenue Channel Intelligence" },
      {
        property: "og:description",
        content:
          "Turn partner and broker experience into the account-level signal of where revenue is about to grow or walk, before it shows up in a renewal.",
      },
    ],
    links: [{ rel: "canonical", href: "https://vistaxm.lovable.app/" }],
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
        ctas={
          <>
            <BookCallButton variant="primary" source="hero" />
            <a href="#offers" className="btn-secondary">
              Start the 3-week Diagnostic
            </a>
          </>
        }
        hint="30 minutes · no obligation · one business day response"
      />

      <TrustBar />

      {/* The problem: vanity score + partner shadow */}
      <Section tint>
        <SectionHead
          eyebrow="The old way"
          title="A flat NPS number is a vanity metric. The partner shadow is a revenue blind spot."
          intro="When a partner or broker sits in the middle, the vendor sees the forecast, not the experience behind it. The signals that predict churn stay hidden until the renewal is already at risk. Two-thirds of companies never link NPS to revenue at all."
        />
        <div className="mt-14">
          <RevenueIntelligenceFlow />
        </div>
      </Section>

      <Section tint className="!pt-0 overflow-hidden">
        <PartnerShadow />
      </Section>

      {/* The new way: RCI */}
      <Section id="model">
        <SectionHead
          eyebrow="The new way · Revenue Channel Intelligence"
          title="Journey × Persona. Every intersection is a revenue signal."
          intro="Five journey stages across four personas. Where they cross is where retention, expansion, and churn risk actually live. A revenue decision, not a score."
        />
        <div className="mt-14">
          <JourneyMatrix />
        </div>
      </Section>

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

      <HowItWorks />

      <RealProof />

      <PersonaTabs />

      <OfferLadder />

      <FAQ />

      <InsightsPreview />

      <Leadership />

      {/* The two moats, repeated as a closing argument */}
      <Section tint>
        <SectionHead eyebrow="Why no one else can produce this" title="The two moats." />
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
    </>
  );
}
