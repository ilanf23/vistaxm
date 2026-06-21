import { createFileRoute } from "@tanstack/react-router";
import { CTABand, Card, Hero, Section, SectionHead, Stat } from "@/components/site";

export const Route = createFileRoute("/brokerpulse")({
  head: () => ({
    meta: [
      { title: "BrokerPulse — Broker experience management | VistaXM" },
      { name: "description", content: "BrokerPulse reveals which broker agencies are quietly at risk before premium production declines. Built for insurance carriers." },
      { property: "og:title", content: "BrokerPulse — for insurance carriers" },
      { property: "og:description", content: "Brokers drive most premium. See which agencies are at risk before production declines." },
    ],
  }),
  component: BrokerPulse,
});

function BrokerPulse() {
  return (
    <>
      <Hero
        eyebrow="BrokerPulse — for insurance carriers"
        title="Brokers drive most of your premium. Know which ones are quietly at risk."
        subtitle="A neutral, benchmarked view of broker experience and conviction — surfaced before premium production declines."
        primary={{ label: "Book a 30-minute conversation", to: "/contact" }}
        secondary={{ label: "Start with a Rapid Diagnostic", to: "/offers" }}
      />

      <Section>
        <SectionHead eyebrow="What you get" title="A revenue lens on every broker relationship." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Broker experience" kicker="Measured">Quote, bind, service, and renewal experience captured across the broker's journey with you.</Card>
          <Card title="Agency conviction" kicker="Measured">How likely the agency is to lead with your appetite versus place elsewhere.</Card>
          <Card title="Carrier benchmark" kicker="Compared">Your book benchmarked against the carrier set, not against yourself last year.</Card>
        </div>
      </Section>

      <Section tint>
        <SectionHead eyebrow="What it changes" title="Production decisions, not satisfaction reports." />
        <ul className="mt-10 grid gap-4 md:grid-cols-2 text-[color:var(--ink-soft)]">
          {[
            "Identify agencies whose production is about to drop — 2 to 3 quarters early.",
            "Route underwriting and field support to the relationships that move premium.",
            "Defend appetite changes with neutral, agency-level evidence.",
            "Quarterly broker reviews backed by a scorecard the agency trusts.",
          ].map(l => (
            <li key={l} className="bg-white rounded-xl p-5 border border-[color:var(--gray-line)]">{l}</li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead eyebrow="Proof point" title="A signal worth $11M+." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Stat value="$26.8M" label="Opportunity-and-risk pool surfaced for a full-service industrial supplier." />
          <Stat value="$11M+" label="Revenue protected directly off the signal." />
          <Stat value="33%" label="Of companies that measure NPS, only one-third tie it to revenue." />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
