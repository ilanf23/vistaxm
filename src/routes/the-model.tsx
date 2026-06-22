import { createFileRoute } from "@tanstack/react-router";
import { Hero, Section, SectionHead, Reveal, Card, JourneyMatrix, InfluencerGapCard } from "@/components/site";
import { BookCallButton } from "@/components/book-call";
import { PageCTA } from "@/components/sections";

export const Route = createFileRoute("/the-model")({
  head: () => ({
    meta: [
      { title: "The Model — Revenue Channel Intelligence | VistaXM" },
      {
        name: "description",
        content:
          "The Revenue Channel Intelligence model: five journey stages, four personas, and the Decision Maker to Influencer gap. The category we are creating, in full.",
      },
      { property: "og:url", content: "https://vistaxm.lovable.app/the-model" },
      { property: "og:title", content: "The Model — Revenue Channel Intelligence" },
    ],
    links: [{ rel: "canonical", href: "https://vistaxm.lovable.app/the-model" }],
  }),
  component: TheModel,
});

function TheModel() {
  return (
    <>
      <Hero
        eyebrow="The Model"
        title={
          <>
            A revenue decision,{" "}
            <span className="text-[color:var(--blue-cta)]">not a score.</span>
          </>
        }
        subtitle="The Revenue Channel Intelligence model: five journey stages by four personas, tagged to accounts and dollars. The category we are creating, in full."
        ctas={
          <>
            <BookCallButton variant="primary" source="model-hero" />
            <a href="#matrix" className="btn-secondary">See the matrix</a>
          </>
        }
      />

      <Section id="matrix">
        <SectionHead
          eyebrow="Journey × Persona"
          title="Every intersection is a revenue signal."
          intro="Five stages: Sales, Procurement, Onboarding, Support, Renewal. Four personas: Executive, Technical, Procurement, Operations. Where they cross is where retention, expansion, and churn risk actually live."
        />
        <div className="mt-14"><JourneyMatrix /></div>
      </Section>

      <Section dark>
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 items-center">
          <SectionHead
            dark
            eyebrow="The signature insight"
            title="The Decision Maker → Influencer gap."
            intro="The executive is satisfied. The day-to-day influencers who actually shape the renewal are not. That gap is the most reliable early warning of churn, invisible to an account-level score."
          />
          <Reveal delay={120}><InfluencerGapCard /></Reveal>
        </div>
      </Section>

      <Section tint>
        <SectionHead eyebrow="The manifesto" title="Why a single score fails." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="A score is not a decision" kicker="01">
            A single number can't tell you which account, which stage, or which person. In the
            channel, it can't even tell you whose problem it is to fix.
          </Card>
          <Card title="The partner shadow is real" kicker="02">
            When a partner or broker owns the relationship, the vendor sees the forecast, not the
            experience. The signals that predict churn stay hidden.
          </Card>
          <Card title="Experience is revenue" kicker="03">
            Companies don't spend NPS points. They spend dollars. Sentiment is a spend pattern, and
            the spend pattern is the moat.
          </Card>
        </div>
      </Section>

      <PageCTA
        title="See the model running in your accounts."
        intro="A 30-minute walk-through using a redacted Revenue Channel Intelligence view from a comparable company."
        source="model-cta"
      />
    </>
  );
}
