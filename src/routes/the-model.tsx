import { createFileRoute } from "@tanstack/react-router";
import { BOOK_PATH } from "@/lib/links";
import { canonicalLink, faqJsonLd, type Faq } from "@/lib/seo";
import {
  CTABand,
  Card,
  FAQSection,
  InfluencerGapCard,
  JourneyMatrix,
  PageHero,
  Reveal,
  RevenueIntelligenceFlow,
  RevenueSignalCard,
  ScoreVsDecision,
  Section,
  SectionHead,
} from "@/components/site";
import { AmbientBand } from "@/components/media";
import { FadeIn } from "@/components/motion";

const FAQS: Faq[] = [
  {
    question: "What is Revenue Channel Intelligence?",
    answer:
      "Revenue Channel Intelligence is the practice of turning partner and broker customer experience into account-level signals of revenue risk and growth. VistaXM runs it as a fully managed, neutral third-party program that measures experience across five journey stages and four personas, then ties each signal to retention, expansion, and churn.",
  },
  {
    question: "How is it different from NPS or CX software?",
    answer:
      "NPS gives you a single score, and CX software gives you a tool to run surveys. Revenue Channel Intelligence gives you the managed program, the analysis, and the workflow that turn experience into revenue decisions, delivered by a neutral third party rather than built in-house.",
  },
  {
    question: "What is the Decision-Maker to Influencer gap?",
    answer:
      "The Decision-Maker to Influencer gap is the difference between how executives and how day-to-day contacts rate the same relationship. It is the most reliable leading indicator of renewal risk, and it is invisible to a single account-level score.",
  },
];

export const Route = createFileRoute("/the-model")({
  head: () => ({
    meta: [
      { title: "What Is Revenue Channel Intelligence | VistaXM" },
      {
        name: "description",
        content:
          "Revenue Channel Intelligence turns customer experience into account-level revenue signals across five journey stages and four personas. See how the model works.",
      },
      { property: "og:title", content: "What Is Revenue Channel Intelligence | VistaXM" },
      {
        property: "og:description",
        content:
          "A score tells you what happened. We tell you what to do about it. See how Revenue Channel Intelligence works.",
      },
    ],
    links: [canonicalLink("/the-model")],
    scripts: [faqJsonLd(FAQS)],
  }),
  component: TheModel,
});

function TheModel() {
  return (
    <>
      <PageHero
        eyebrow="The model"
        title="Revenue Channel Intelligence: turn customer experience into the next revenue decision."
        subtitle="Every account is sending signals about where revenue is headed. We make those signals visible, account by account, and tie each one to a decision you can act on."
        primary={{ label: "Book a 30-minute call", to: BOOK_PATH }}
        secondary={{ label: "See the proof", to: "/proof" }}
        visual={
          <div className="mx-auto w-full max-w-[440px]">
            <RevenueSignalCard
              account="Meridian Manufacturing"
              amountLabel="$940K"
              reason="The survey score looks fine, but the people who influence the renewal have stopped engaging. That is the signal."
              action="Get in front of the influencers this quarter"
              daysToRenewal={112}
              index={2}
              total={5}
            />
          </div>
        }
      />

      {/* Journey x persona */}
      <Section tint>
        <SectionHead
          eyebrow="Journey x persona"
          title="Five stages. Four people. Every intersection is a revenue signal."
          intro="We measure across the journey phases that matter and the personas that drive results. The grid shows exactly where, and with whom, revenue is won or lost."
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

      {/* Ambient divider: from reading to deciding */}
      <Section>
        <Reveal>
          <AmbientBand
            image="/images/ambient/whiteboard-mapping.jpg"
            alt="A small team mapping accounts together at a whiteboard"
            eyebrow="From reading to deciding"
            title="A read is only useful when it changes a decision."
          >
            We do the listening and the analysis. What reaches you is the move worth making.
          </AmbientBand>
        </Reveal>
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

      <FAQSection items={FAQS} />

      <CTABand />
    </>
  );
}
