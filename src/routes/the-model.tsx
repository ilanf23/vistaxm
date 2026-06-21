import { createFileRoute } from "@tanstack/react-router";
import { CTABand, Card, Hero, JourneyMatrix, Section, SectionHead } from "@/components/site";

export const Route = createFileRoute("/the-model")({
  head: () => ({
    meta: [
      { title: "The Model — Revenue Channel Intelligence | VistaXM" },
      { name: "description", content: "Revenue Channel Intelligence: journey × persona signal that ties partner and broker experience to retention, expansion, and churn risk. Live in ~90 days." },
      { property: "og:title", content: "The Model — Revenue Channel Intelligence" },
      { property: "og:description", content: "Five journey stages. Four personas. Every intersection is a revenue signal." },
    ],
  }),
  component: TheModel,
});

function TheModel() {
  return (
    <>
      <Hero
        eyebrow="The Model"
        title="Revenue Channel Intelligence."
        subtitle="Revenue intelligence for the indirect go-to-market channel — where there's always an intermediary between the vendor and the end customer. We measure experience across five journey stages and four personas, then tie every signal to revenue."
      />

      <Section>
        <SectionHead
          eyebrow="What it is"
          title="A category, not a feature."
          intro="A single score can't tell a CRO where revenue is about to grow or walk. Revenue Channel Intelligence does, account by account, persona by persona, stage by stage."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Measured" kicker="01">Five journey stages × four personas. Every intersection captured as a structured signal.</Card>
          <Card title="Benchmarked" kicker="02">The channel's largest apples-to-apples benchmark set. You're measured against the channel.</Card>
          <Card title="Tied to revenue" kicker="03">Every signal mapped to retention, expansion, and churn risk at the account level.</Card>
        </div>
      </Section>

      <Section tint>
        <SectionHead eyebrow="The matrix" title="Five stages. Four personas. Twenty revenue cells." />
        <div className="mt-12"><JourneyMatrix /></div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="How it works"
          title="Live in about 90 days."
          intro="A managed service end-to-end. You don't build a survey program; you get a revenue decision engine."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Design (weeks 1–3)", d: "Account universe, persona map, journey instrumentation, RFP-grade methodology." },
            { n: "02", t: "First wave (weeks 4–10)", d: "Neutral outreach, structured capture, account-level scoring, benchmark calibration." },
            { n: "03", t: "Decisions (weeks 10–13)", d: "Executive review, prioritized account plays, certified NPS, baseline locked." },
          ].map(s => (
            <li key={s.n} className="rounded-xl border border-[color:var(--gray-line)] p-7 bg-white">
              <div className="eyebrow">{s.n}</div>
              <h3 className="!text-xl mt-2">{s.t}</h3>
              <p className="mt-2 text-[color:var(--ink-soft)]">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CTABand />
    </>
  );
}
