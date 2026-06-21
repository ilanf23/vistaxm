import { createFileRoute, Link } from "@tanstack/react-router";
import { CTABand, Hero, Section, SectionHead } from "@/components/site";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Revenue Channel Intelligence library | VistaXM" },
      { name: "description", content: "Essays, frameworks, and benchmarks on Revenue Channel Intelligence for OEMs, IT channel leaders, and insurance carriers." },
      { property: "og:title", content: "Insights | VistaXM" },
      { property: "og:description", content: "Essays and frameworks on the channel revenue blind spot, the Decision Maker gap, and the certified NPS." },
    ],
  }),
  component: Insights,
});

const posts = [
  {
    title: "Companies don't spend NPS points. They spend dollars.",
    excerpt: "Why a single satisfaction score has never closed a renewal — and what to measure instead.",
    tag: "Thesis",
  },
  {
    title: "The Decision Maker → Influencer gap, explained.",
    excerpt: "The most reliable early warning of churn in the channel — and why account-level NPS is blind to it.",
    tag: "Framework",
  },
  {
    title: "The channel runs on recurring revenue. The relationship is the revenue.",
    excerpt: "What changes when a partner or broker sits between the vendor and the end customer.",
    tag: "Channel",
  },
  {
    title: "Why a certified NPS belongs in your next RFP.",
    excerpt: "Neutral, third-party certification turns a satisfaction number into a commercial weapon.",
    tag: "Carriers & OEMs",
  },
  {
    title: "MDF, but for the partners who actually grow accounts.",
    excerpt: "Allocating funds against partner conviction and end-customer experience, not just pipeline.",
    tag: "PartnerPulse",
  },
  {
    title: "Two quarters early: the broker production signal.",
    excerpt: "How agency experience predicts written premium long before the production report changes.",
    tag: "BrokerPulse",
  },
];

function Insights() {
  return (
    <>
      <Hero
        eyebrow="Insights"
        title="The library for Revenue Channel Intelligence."
        subtitle="Essays, frameworks, and benchmarks for CROs, channel chiefs, CX leaders, and carrier execs."
      />

      <Section>
        <SectionHead eyebrow="Latest" title="Selected writing." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(p => (
            <article key={p.title} className="rounded-2xl border border-[color:var(--gray-line)] bg-white p-7 flex flex-col">
              <div className="eyebrow">{p.tag}</div>
              <h3 className="!text-xl mt-3">{p.title}</h3>
              <p className="mt-3 text-[color:var(--ink-soft)] flex-1">{p.excerpt}</p>
              <Link to="/contact" className="mt-5 text-[color:var(--blue-link)] font-semibold">Request the full piece →</Link>
            </article>
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  );
}
