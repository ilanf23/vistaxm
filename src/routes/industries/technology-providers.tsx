import { createFileRoute } from "@tanstack/react-router";
import { canonicalLink } from "@/lib/seo";
import {
  Card,
  CTABand,
  PageHero,
  Reveal,
  Section,
  SectionHead,
  Stat,
} from "@/components/site";
import { Stagger, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/industries/technology-providers")({
  head: () => ({
    meta: [
      { title: "Revenue Intelligence for Technology Providers | VistaXM" },
      {
        name: "description",
        content:
          "Turn customer experience into Net Revenue Retention, expansion, and churn prevention. A fully managed program for SaaS and technology providers.",
      },
      {
        property: "og:title",
        content: "Revenue Intelligence for Technology Providers | VistaXM",
      },
      {
        property: "og:description",
        content:
          "Turn customer experience into NRR, expansion, and churn prevention, run as a fully managed program.",
      },
    ],
    links: [canonicalLink("/industries/technology-providers")],
  }),
  component: TechnologyProviders,
});

const PROOF_METRICS: { value: string; label: string }[] = [
  { value: "62", label: "NPS, vs a 30 to 40 B2B SaaS median." },
  {
    value: "20 pts",
    label: "Champion gap: Decision Maker 76 vs Champion 56.",
  },
  {
    value: "$16.5M+",
    label: "Year 1 impact on a single program investment.",
  },
  { value: "65,900%", label: "Program ROI on the same engagement." },
];

const DECISIONS: { title: string; value: string; desc: string }[] = [
  {
    title: "Champion engagement plans",
    value: "$1.71M",
    desc: "Incremental ARR unlocked by protecting and activating the champions who actually renew you.",
  },
  {
    title: "Detractor intervention before renewal",
    value: "$5.70M",
    desc: "ARR retained by intervening 90 to 180 days ahead of the renewal, while there is still time to act.",
  },
  {
    title: "CSM performance consistency",
    value: "$3.90M",
    desc: "Compounding value from closing the gap between the top-quartile CSM and the rest of the team.",
  },
  {
    title: "Value-for-cost repositioning",
    value: "$2.10M",
    desc: "Expansion ARR from customers who see the price, understand the value, and buy more.",
  },
  {
    title: "Intelligence gap closure",
    value: "$3.10M",
    desc: "Revenue at risk identified early, before it surfaced in a QBR or a renewal forecast miss.",
  },
];

function TechnologyProviders() {
  return (
    <>
      <PageHero
        eyebrow="For technology providers"
        title="Revenue Intelligence for technology providers."
        subtitle="Turn customer experience into Net Revenue Retention, expansion, and churn prevention, run as a fully managed program."
      />

      <Section>
        <SectionHead
          eyebrow="What a program looks like"
          title="Illustrative results from a fully managed engagement."
          intro="Anonymized numbers from a real technology provider program. Not a real named client. Shown to make the shape of the outcome concrete."
        />
        <div className="mt-12">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl hairline bg-white p-7 md:p-9">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)]"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-link)]">
                  B2B SaaS provider
                </span>
                <span className="flex items-center gap-1.5 whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" aria-hidden />
                  Illustrative, not a real named client
                </span>
              </div>
              <dl className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {PROOF_METRICS.map((m) => (
                  <div key={m.label}>
                    <dt
                      className="text-4xl font-semibold tabular-nums tracking-tight text-[color:var(--navy-deep)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {m.value}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                      {m.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tint>
        <SectionHead
          eyebrow="Five decisions, five outcomes"
          title="Every read points to a decision that moves the number."
          intro="The program does not stop at a score. Each read routes to a specific move, and each move maps to a specific revenue outcome."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {DECISIONS.map((d) => (
            <StaggerItem key={d.title} className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-7 card-lift">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
                />
                <div
                  className="text-3xl font-semibold tabular-nums tracking-tight text-[color:var(--navy-deep)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {d.value}
                </div>
                <h3 className="mt-3 !text-lg">{d.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                  {d.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-8 text-xs uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
          Sample, not a real client. Anonymized illustrative program.
        </p>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Fully managed"
          title="You approve the plan. We run the program."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <Stat value="Managed" label="Designed, fielded, analyzed, and presented by us." delay={0} />
          <Stat value="Neutral" label="Customers tell a third party what they will not tell you." delay={120} />
          <Stat value="Certified" label="A third-party NPS you can use in proposals and RFPs." delay={240} />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Account-level signal" kicker="What you get" delay={0}>
            Named accounts with dollars in play and the next move, not a portfolio average.
          </Card>
          <Card title="Champion and detractor lists" kicker="What you get" delay={120}>
            Who to protect, who to intervene with, and which conversations to have first.
          </Card>
          <Card title="Quarterly executive readouts" kicker="What you get" delay={240}>
            The signal in front of the leaders who own the number, wave after wave.
          </Card>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
