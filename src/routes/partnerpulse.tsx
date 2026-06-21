import { createFileRoute } from "@tanstack/react-router";
import { CTABand, Card, Hero, Section, SectionHead, Stat } from "@/components/site";

export const Route = createFileRoute("/partnerpulse")({
  head: () => ({
    meta: [
      { title: "PartnerPulse — Neutral channel scorecard | VistaXM" },
      { name: "description", content: "PartnerPulse is the neutral, benchmarked scorecard of partner-delivered experience and partner conviction. Built for OEMs and the IT channel." },
      { property: "og:title", content: "PartnerPulse — for OEMs and the channel" },
      { property: "og:description", content: "Solve the channel blind spot. Inform MDF allocation, field support, and tier decisions with neutral, benchmarked signal." },
    ],
  }),
  component: PartnerPulse,
});

function PartnerPulse() {
  return (
    <>
      <Hero
        eyebrow="PartnerPulse — for OEMs and the channel"
        title="The neutral scorecard of partner-delivered experience."
        subtitle="Solve the channel blind spot. Inform MDF allocation, field support, and tier decisions with signal a vendor can't collect from inside its own walls."
        primary={{ label: "Book a 30-minute conversation", to: "/contact" }}
        secondary={{ label: "Start with a Rapid Diagnostic", to: "/offers" }}
      />

      <Section>
        <SectionHead eyebrow="What you get" title="A revenue lens on every partner relationship." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Partner-delivered experience" kicker="Measured">End-customer experience attributed to the partner who actually delivered it.</Card>
          <Card title="Partner conviction" kicker="Measured">How much the partner is actually selling, supporting, and expanding your product on the ground.</Card>
          <Card title="Channel benchmark" kicker="Compared">Your partner ecosystem benchmarked against the channel — not against your own last quarter.</Card>
        </div>
      </Section>

      <Section tint>
        <SectionHead eyebrow="What it changes" title="Decisions, not dashboards." />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 text-[color:var(--ink-soft)]">
          {[
            "MDF allocation tied to partners who actually grow accounts.",
            "Field support routed to the accounts and journey stages that predict churn.",
            "Tier and certification decisions backed by neutral end-customer evidence.",
            "Partner business reviews with a scorecard both sides trust.",
          ].map(l => (
            <li key={l} className="bg-white rounded-xl p-5 border border-[color:var(--gray-line)]">{l}</li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead eyebrow="Proof points" title="Numbers from the channel." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Stat value="+8 NPS" label="Softchoice over two years — $8.4M business impact, 4% lower churn, 10% higher win rates." />
          <Stat value="30 → 73" label="Veeam NPS lift alongside 27% year-over-year revenue growth." />
          <Stat value="33%" label="Of companies that measure NPS, only one-third tie it to revenue." />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
