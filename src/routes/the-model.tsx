import { createFileRoute } from "@tanstack/react-router";
import {
  CTABand,
  Card,
  InfluencerGapCard,
  JourneyMatrix,
  PageHero,
  Reveal,
  RevenueIntelligenceFlow,
  ScoreVsDecision,
  Section,
  SectionHead,
} from "@/components/site";
import { FadeIn } from "@/components/motion";

export const Route = createFileRoute("/the-model")({
  head: () => ({
    meta: [
      { title: "The Model: Revenue Channel Intelligence | VistaXM" },
      {
        name: "description",
        content:
          "Revenue Channel Intelligence maps every account across five journey stages and four personas, then turns each signal into a revenue decision: who is about to grow, who is about to churn, and the move that changes it.",
      },
      { property: "og:title", content: "The Model: Revenue Channel Intelligence | VistaXM" },
      {
        property: "og:description",
        content:
          "A score tells you what happened. We tell you what to do about it. See how Revenue Channel Intelligence works.",
      },
    ],
  }),
  component: TheModel,
});

function TheModel() {
  return (
    <>
      <PageHero
        eyebrow="The model"
        title="Revenue Channel Intelligence: turn experience into the next revenue decision."
        subtitle="Every account is sending signals about where revenue is headed. We make those signals legible, account by account, and tie each one to a decision you can act on."
        primary={{ label: "Book a 30-minute call", to: "/book-a-call" }}
        secondary={{ label: "See the proof", to: "/proof" }}
      />

      {/* What it is */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <SectionHead
            eyebrow="What it is"
            title="A new category, built for how the channel actually sells."
            intro="Traditional revenue intelligence reads only your own pipeline. It cannot see the indirect channel, where a partner or broker sits between you and the end customer. Revenue Channel Intelligence is the neutral way to measure end-customer and partner experience across the channel and tie it to retention, expansion, and churn. Customer experience is the method. Revenue is the point."
          />
          <FadeIn delay={120}>
            <figure className="relative rounded-2xl hairline bg-[color:var(--blue-tint)] p-8 md:p-10">
              <span
                aria-hidden
                className="absolute left-6 top-4 text-6xl leading-none text-[color:var(--orange-pop)]/30"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;
              </span>
              <blockquote
                className="relative text-2xl font-semibold leading-snug text-[color:var(--navy-deep)] md:text-[1.75rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                A score. Not a decision. A revenue decision. Not a score.
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
                Erik Vogel, Founder and CEO
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </Section>

      {/* Journey x persona */}
      <Section tint>
        <SectionHead
          eyebrow="Journey x persona"
          title="Five stages. Four people. Every intersection is a revenue signal."
          intro="We measure experience across five journey stages and the four people who shape the buy. A single number averages them into noise. The grid shows exactly where, and with whom, revenue is won or lost."
        />
        <div className="mt-14">
          <JourneyMatrix />
        </div>
      </Section>

      {/* Signature insight */}
      <Section dark>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <SectionHead
            dark
            eyebrow="The signature insight"
            title="The Decision Maker to Influencer gap."
            intro="The executive is satisfied while the daily users are not. That gap is the most reliable early warning of churn, and it is invisible to an account-level score. Read the other way, it is where expansion hides. Close the gap and a passive account becomes a promoter who buys more. A wide gap today is a churn risk in 12 to 18 months."
          />
          <Reveal delay={120}>
            <InfluencerGapCard />
          </Reveal>
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHead
          eyebrow="How it works"
          title="Managed end to end. First insight in about 90 days."
          intro="We listen across the whole journey and every persona as a neutral third party. We find the signal: the accounts moving, the gap that predicts churn, the upside sitting unused. Then you act. No platform to deploy, no team to hire, no survey vendor to manage. We run it. You act on it."
        />
        <div className="mt-14">
          <RevenueIntelligenceFlow />
        </div>
      </Section>

      {/* From signal to decision */}
      <Section tint>
        <SectionHead
          eyebrow="From signal to decision"
          title="Intelligence only counts when it is used."
          intro="Each signal arrives as a named account, a dollar figure, a reason, and a recommended move with a deadline. Passive accounts ranked by revenue gap. Detractors flagged before the renewal. The expansion plays most likely to land. Decisions, not dashboards."
        />
        <div className="mt-14">
          <ScoreVsDecision />
        </div>
      </Section>

      {/* Our advantage */}
      <Section>
        <SectionHead eyebrow="Our advantage" title="Two things no one else can give you." />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card title="Neutrality is structural" kicker="Advantage 01" delay={0}>
            As a confidential third party, customers and partners tell us what they will never tell
            you directly. Independence is built into the model, not bolted on.
          </Card>
          <Card title="Benchmarks from real data" kicker="Advantage 02" delay={120}>
            See exactly where you stand against your market, with real customer and partner data,
            not a guess. The benchmark compounds with every wave.
          </Card>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
