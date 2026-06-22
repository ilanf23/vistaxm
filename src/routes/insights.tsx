import { createFileRoute } from "@tanstack/react-router";
import { Hero, Section, SectionHead, Card, Reveal } from "@/components/site";
import { BookCallButton } from "@/components/book-call";
import { PageCTA } from "@/components/sections";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — The State of Revenue Channel Intelligence | VistaXM" },
      {
        name: "description",
        content:
          "Our point of view, ungated. Read the manifesto and the State of Revenue Channel Intelligence report. Self-educate before you talk to anyone.",
      },
      { property: "og:url", content: "https://vistaxm.lovable.app/insights" },
      { property: "og:title", content: "Insights — Revenue Channel Intelligence" },
    ],
    links: [{ rel: "canonical", href: "https://vistaxm.lovable.app/insights" }],
  }),
  component: Insights,
});

function Insights() {
  return (
    <>
      <Hero
        eyebrow="Insights · Ungated"
        title={
          <>
            Self-educate before you{" "}
            <span className="text-[color:var(--blue-cta)]">talk to anyone.</span>
          </>
        }
        subtitle="Our point of view is public. Read the manifesto. Read the State of Revenue Channel Intelligence report. Bring questions, not budget."
        ctas={<BookCallButton variant="primary" source="insights-hero" />}
      />

      <Section>
        <SectionHead
          eyebrow="The manifesto"
          title="Your NPS is a score. Your renewal is a decision."
          intro="Why the channel needs a new category, and what it looks like when you have one. Read the long-form argument."
        />
        <Reveal delay={120}>
          <article className="mt-12 max-w-3xl space-y-5 text-[1.0625rem] text-[color:var(--ink-soft)] leading-relaxed">
            <p>
              A single satisfaction score has become the dominant way companies measure customer
              relationships. It is also the most expensive vanity metric in B2B. A flat NPS number
              cannot tell you which account, which stage in the journey, or which person on the
              buying committee actually changed their mind. In the channel, it cannot even tell you
              whose problem it is to fix.
            </p>
            <p>
              When a partner or broker sits in the middle of the relationship, the vendor sees the
              forecast, not the experience behind it. We call that the partner shadow. The signals
              that predict churn stay hidden inside the partner's relationship until the renewal is
              already at risk. By the time the score moves, the dollars have already moved.
            </p>
            <p>
              The fix is not a better survey. The fix is a new category. Revenue Channel
              Intelligence treats experience as a portfolio map: journey × persona, tagged to the
              account and the dollars at risk. The Decision Maker to Influencer gap becomes the
              leading indicator. The certified NPS becomes the credential, not the strategy.
            </p>
            <p>
              Companies don't spend NPS points. They spend dollars. The companies that win on
              customer experience are the only ones with a real moat. We built VistaXM to give the
              channel that moat.
            </p>
          </article>
        </Reveal>
      </Section>

      <Section tint>
        <SectionHead
          eyebrow="The report"
          title="The State of Revenue Channel Intelligence."
          intro="Benchmarks, patterns, and the partner shadow that's hiding inside every channel forecast. Ungated. We'll publish chapters here as they're released."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Chapter 1 — The vanity metric" kicker="Coming soon">
            Why only one in three companies link NPS to revenue, and what the other two-thirds are
            actually measuring.
          </Card>
          <Card title="Chapter 2 — The partner shadow" kicker="Coming soon">
            The information filter inside every channel relationship, and the revenue warning system
            no one has instrumented.
          </Card>
          <Card title="Chapter 3 — The DM-Influencer gap" kicker="Coming soon">
            Why the executive is satisfied and the renewal still walks. The single most reliable
            early-warning signal in B2B.
          </Card>
        </div>
      </Section>

      <PageCTA
        title="Want the report when it drops?"
        intro="Book a 30-minute call and we'll send chapters as they ship, plus the redacted RCI walkthrough."
        source="insights-cta"
      />
    </>
  );
}
