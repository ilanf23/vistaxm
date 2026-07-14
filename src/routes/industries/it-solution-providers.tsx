import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL, canonicalLink, canonicalUrl } from "@/lib/seo";
import {
  Card,
  CTABand,
  PageHero,
  Reveal,
  RevenueSignalCard,
  Section,
  SectionHead,
  Stat,
} from "@/components/site";

import { Stagger, StaggerItem } from "@/components/motion";

const PAGE_PATH = "/industries/it-solution-providers";
const PAGE_NAME = "Revenue Intelligence for IT Solution Providers and MSPs";
const PAGE_DESC =
  "Know which accounts will grow, which will renew, and which are quietly at risk, before the renewal conversation. A managed program for IT solution providers and MSPs.";

export const Route = createFileRoute("/industries/it-solution-providers")({
  head: () => ({
    meta: [
      { title: `${PAGE_NAME} | VistaXM` },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: `${PAGE_NAME} | VistaXM` },
      {
        property: "og:description",
        content:
          "Named accounts, ranked by revenue gap. The Decision Maker to Influencer gap. Certified NPS you can put in proposals.",
      },
    ],
    links: [canonicalLink(PAGE_PATH)],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Markets We Serve" },
            { "@type": "ListItem", position: 3, name: PAGE_NAME, item: canonicalUrl(PAGE_PATH) },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: PAGE_NAME,
          description: PAGE_DESC,
          url: canonicalUrl(PAGE_PATH),
          provider: { "@type": "Organization", name: "VistaXM", url: BASE_URL },
          audience: {
            "@type": "Audience",
            audienceType: "IT solution providers and MSPs",
          },
          areaServed: "Global",
        }),
      },
    ],
  }),
  component: ITSolutionProviders,
});


const WHAT_IT_TELLS: { title: string; desc: string }[] = [
  {
    title: "Passive and detractor accounts, named and ranked",
    desc: "Named accounts, ranked by revenue gap, so the team knows who to call first and why.",
  },
  {
    title: "The Decision Maker to Influencer gap",
    desc: "The most reliable leading indicator of renewal risk, invisible to an account-level score.",
  },
  {
    title: "Certified NPS you can use in proposals and RFPs",
    desc: "A third-party credential a self-reported number cannot match, usable in the sales cycle.",
  },
  {
    title: "Four-bucket account action segmentation",
    desc: "Protect and deepen, convert and grow, stabilize and retain, honest assessment. Every account has a next move.",
  },
  {
    title: "Expansion-readiness ranking",
    desc: "Expansion effort goes where it is most likely to land, not where it is easiest to ask.",
  },
];

const PROOF_METRICS: { value: string; label: string }[] = [
  { value: "62", label: "NPS vs a 40 to 55 industry average." },
  { value: "20 pts", label: "Decision Maker to Influencer gap surfaced." },
  { value: "$54M+", label: "Year 1 business value on a single program investment." },
  { value: "Named", label: "Passive accounts, ranked by revenue gap." },
];

function ITSolutionProviders() {
  return (
    <>
      <PageHero
        eyebrow="For IT solution providers and MSPs"
        title="Revenue Intelligence for IT solution providers and MSPs."
        subtitle="Know which accounts will grow, which will renew, and which are quietly at risk, before the renewal conversation."
        visual={
          <RevenueSignalCard
            account="Illustrative account"
            contextLabel="Accounts, illustrative"
            headline="An account is quietly at risk."
            reason="The executive is satisfied; the day-to-day influencers are not, and the gap is widening."
            action="Get in front of the influencers this quarter"
            metaLabel="3 accounts flagged"
            index={1}
            total={3}
          />
        }
      />


      <Section>
        <SectionHead
          eyebrow="What it tells you"
          title="Five reads that change the next decision."
          intro="Not a satisfaction study. A managed program that hands the account team the names, the gaps, and the moves."
        />
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2" stagger={0.08}>
          {WHAT_IT_TELLS.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl hairline bg-white p-7 card-lift">
                <h3 className="!text-lg text-[color:var(--navy-deep)]">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                  {item.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tint>
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-2xl bg-[color:var(--navy-deep)] p-8 text-white md:p-12">
            <div className="flex items-start gap-4">
              <span
                className="mt-2 h-2 w-2 flex-none rounded-full bg-[color:var(--orange-pop)]"
                aria-hidden
              />
              <p
                className="text-xl font-semibold leading-snug md:text-[1.6rem] md:leading-[1.3]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                68% of B2B customers who churn never voice dissatisfaction directly. We surface the
                signal 90 to 180 days before renewal, while there is still time to act.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Illustrative results"
          title="What a fully managed program can produce."
          intro="Anonymized numbers from a real IT solution provider engagement. Not a real named client. Shown to make the shape of the outcome concrete."
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
                  IT solution provider
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
          eyebrow="How the program runs"
          title="Managed end to end. Signal that lands with the account team."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <Stat value="Managed" label="Designed, fielded, analyzed, and presented by us." delay={0} />
          <Stat value="Neutral" label="Customers tell a third party what they will not tell you." delay={120} />
          <Stat value="Certified" label="A third-party NPS you can use in proposals and RFPs." delay={240} />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Named account lists" kicker="What you get" delay={0}>
            Passives and detractors ranked by revenue gap, with the next move for each.
          </Card>
          <Card title="Renewal early warning" kicker="What you get" delay={120}>
            The Decision Maker to Influencer gap, surfaced 90 to 180 days ahead of the renewal.
          </Card>
          <Card title="Expansion-readiness ranking" kicker="What you get" delay={240}>
            Where expansion effort is most likely to land, so the team stops guessing.
          </Card>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
