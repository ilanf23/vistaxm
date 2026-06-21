import { createFileRoute } from "@tanstack/react-router";
import { CTABand, Hero, Section, SectionHead, Stat } from "@/components/site";

export const Route = createFileRoute("/proof")({
  head: () => ({
    meta: [
      { title: "Proof — Results from the channel | VistaXM" },
      { name: "description", content: "Softchoice, Veeam, and an industrial supplier: the receipts on what Revenue Channel Intelligence does to retention, expansion, and win rates." },
      { property: "og:title", content: "Proof | VistaXM" },
      { property: "og:description", content: "$8.4M business impact. NPS 30 → 73. $11M+ revenue protected. The receipts." },
    ],
  }),
  component: Proof,
});

const cases = [
  {
    name: "Softchoice",
    headline: "+8 NPS over two years",
    body: "$8.4M business impact, 4% lower churn, 10% higher win rates — driven by acting on journey × persona signal, not a single score.",
  },
  {
    name: "Veeam",
    headline: "NPS 30 → 73",
    body: "NPS rose from 30 to 73 alongside 27% year-over-year revenue growth — experience and revenue moving together, not apart.",
  },
  {
    name: "Industrial supplier",
    headline: "$26.8M opportunity & risk pool",
    body: "Full-service industrial supplier: $26.8M opportunity-and-risk pool surfaced and more than $11M in revenue protected.",
  },
];

function Proof() {
  return (
    <>
      <Hero
        eyebrow="Proof"
        title="Experience is revenue. Here's the receipts."
        subtitle="Three results, three different shapes of channel — same model underneath."
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Stat value="+8 NPS" label="Softchoice over two years — $8.4M business impact." />
          <Stat value="30 → 73" label="Veeam NPS lift alongside 27% YoY revenue growth." />
          <Stat value="$11M+" label="Revenue protected for an industrial supplier off a $26.8M pool." />
          <Stat value="33%" label="Only one-third of companies that measure NPS link it to revenue." />
        </div>
      </Section>

      <Section tint>
        <SectionHead eyebrow="Case studies" title="What the numbers actually mean." />
        <div className="mt-12 space-y-6">
          {cases.map(c => (
            <article key={c.name} className="rounded-2xl bg-white border border-[color:var(--gray-line)] p-8 md:p-10 grid md:grid-cols-[200px_1fr] gap-6">
              <div>
                <div className="eyebrow">{c.name}</div>
                <div className="mt-2 text-2xl font-bold text-[color:var(--navy-deep)]">{c.headline}</div>
              </div>
              <p className="text-[color:var(--ink-soft)] text-lg leading-relaxed">{c.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="The certified NPS"
          title="The J.D. Power of the channel."
          intro="A third-party certified NPS, usable in proposals, RFPs, and marketing. The only certified NPS a carrier or OEM cannot produce for itself."
        />
      </Section>

      <CTABand />
    </>
  );
}
