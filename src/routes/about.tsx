import { createFileRoute } from "@tanstack/react-router";
import { CTABand, Card, Hero, Section, SectionHead } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VistaXM" },
      { name: "description", content: "VistaXM is the company building and owning the category of Revenue Channel Intelligence. A fully managed service delivered on a Qualtrics-powered stack." },
      { property: "og:title", content: "About | VistaXM" },
      { property: "og:description", content: "Building the category of Revenue Channel Intelligence." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <Hero
        eyebrow="About"
        title="We are building the category of Revenue Channel Intelligence."
        subtitle="VistaXM is a fully managed service — delivered on a Qualtrics-powered stack — that turns partner and broker experience into the account-level signal of where revenue is about to grow or walk."
      />

      <Section>
        <SectionHead
          eyebrow="The story"
          title="A score was never the point."
          intro="We started inside the channel and saw the same pattern across OEMs, IT distributors, and insurance carriers: the relationship is the revenue, but no one could see it. So we built the model that does."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Neutral by design" kicker="Principle">We work for the truth on behalf of both sides. That is the only way the signal is honest.</Card>
          <Card title="Managed, not DIY" kicker="Principle">No survey tool to deploy. We deliver decisions, not infrastructure to operate.</Card>
          <Card title="Benchmark first" kicker="Principle">You're measured against the channel — so the number means something the day you see it.</Card>
        </div>
      </Section>

      <Section tint>
        <SectionHead eyebrow="The team" title="Operators from the channel — not survey vendors." />
        <p className="mt-4 max-w-2xl text-[color:var(--ink-soft)]">
          Built by leaders who have run revenue, channel, and experience programs at scale — and who got tired of presenting scores that didn't change a decision.
        </p>
      </Section>

      <CTABand />
    </>
  );
}
