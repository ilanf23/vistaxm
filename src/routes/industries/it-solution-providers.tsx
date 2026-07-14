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
          title="Five insights that shape your next decision."
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
          intro="A look at the shape of a VistaXM executive readout, drawn from an illustrative IT solution provider engagement. Fictional client, illustrative figures, shown to make the outcome concrete."
        />

        <div className="mt-12 space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <div className="relative h-full overflow-hidden rounded-2xl hairline bg-white p-7 md:p-9">
                <span aria-hidden className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--orange-pop)]" />
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-link)]">The headline</span>
                <div className="mt-5 flex items-end gap-4">
                  <span className="text-[5rem] font-semibold leading-[0.85] tracking-tight tabular-nums text-[color:var(--navy-deep)]" style={{ fontFamily: "var(--font-display)" }}>62</span>
                  <span className="mb-2 text-sm font-medium leading-snug text-[color:var(--ink-soft)]">Certified NPS<br />Industry average 40 to 55</span>
                </div>
                <div className="mt-8">
                  <div className="flex h-3 w-full overflow-hidden rounded-full">
                    <span className="h-full" style={{ width: "74%", background: "linear-gradient(90deg, var(--blue-cta), var(--blue-light))" }} />
                    <span className="h-full" style={{ width: "14%", background: "var(--blue-pale)" }} />
                    <span className="h-full" style={{ width: "12%", background: "var(--orange-pop)" }} />
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div><div className="text-lg font-semibold tabular-nums text-[color:var(--navy-deep)]">74%</div><div className="text-xs text-[color:var(--ink-soft)]">Promoters</div></div>
                    <div><div className="text-lg font-semibold tabular-nums text-[color:var(--navy-deep)]">14%</div><div className="text-xs text-[color:var(--ink-soft)]">Passives</div></div>
                    <div><div className="text-lg font-semibold tabular-nums text-[color:var(--navy-deep)]">12%</div><div className="text-xs text-[color:var(--ink-soft)]">Detractors</div></div>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-[color:var(--ink-soft)]">Promoters spend 6.8x more than passives on average. The gap between the two is the primary growth lever in the data.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-[color:var(--navy-deep)] p-7 text-white md:p-9">
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-light)]">The Influencer gap</span>
                <div className="mt-6 flex items-center justify-between">
                  <div><div className="text-4xl font-semibold tabular-nums" style={{ fontFamily: "var(--font-display)" }}>76</div><div className="mt-1 text-xs text-white/60">Decision Makers</div></div>
                  <div className="text-2xl text-white/40">&rarr;</div>
                  <div><div className="text-4xl font-semibold tabular-nums" style={{ fontFamily: "var(--font-display)" }}>56</div><div className="mt-1 text-xs text-white/60">Influencers</div></div>
                </div>
                <div className="mt-auto rounded-xl bg-white/[0.06] p-4 text-center">
                  <div className="text-3xl font-semibold tabular-nums text-[color:var(--orange-pop)]" style={{ fontFamily: "var(--font-display)" }}>20 pts</div>
                  <div className="mt-1 text-xs leading-relaxed text-white/70">The gap that predicts renewal risk, invisible to an account-level score.</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="relative overflow-hidden rounded-2xl hairline bg-[color:var(--blue-tint)] p-7 md:p-9">
              <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-link)]">The revenue story</span>
              <p className="mt-2 text-sm text-[color:var(--ink-soft)]">Average annual spend by NPS tier. The tiers map directly to revenue.</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <div className="rounded-xl hairline bg-white p-5"><div className="text-3xl font-semibold tabular-nums text-[color:var(--navy-deep)]" style={{ fontFamily: "var(--font-display)" }}>$4.1M</div><div className="mt-1.5 text-sm font-semibold text-[color:var(--navy-deep)]">Promoters</div><div className="text-xs text-[color:var(--ink-soft)]">6.8x passives</div></div>
                <div className="rounded-xl hairline bg-white p-5"><div className="text-3xl font-semibold tabular-nums text-[color:var(--navy-deep)]" style={{ fontFamily: "var(--font-display)" }}>$600K</div><div className="mt-1.5 text-sm font-semibold text-[color:var(--navy-deep)]">Passives</div><div className="text-xs text-[color:var(--ink-soft)]">2.7x detractors</div></div>
                <div className="rounded-xl hairline bg-white p-5"><div className="text-3xl font-semibold tabular-nums text-[color:var(--navy-deep)]" style={{ fontFamily: "var(--font-display)" }}>$225K</div><div className="mt-1.5 text-sm font-semibold text-[color:var(--navy-deep)]">Detractors</div><div className="text-xs text-[color:var(--ink-soft)]">baseline</div></div>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-xl bg-[color:var(--navy-deep)] px-5 py-4 text-white">
                <span className="flex-none text-2xl font-semibold tabular-nums text-[color:var(--orange-pop)]" style={{ fontFamily: "var(--font-display)" }}>$3.5M</span>
                <span className="text-sm leading-snug">Additional average annual spend from converting one passive account to a promoter.</span>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl hairline bg-white p-6"><div className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--blue-link)]">Growth opportunity</div><div className="mt-3 text-4xl font-semibold tabular-nums text-[color:var(--navy-deep)]" style={{ fontFamily: "var(--font-display)" }}>$54.2M</div><div className="mt-1.5 text-sm leading-relaxed text-[color:var(--ink-soft)]">Top 10 passive accounts, annual revenue.</div></div>
              <div className="rounded-2xl hairline bg-white p-6"><div className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--orange-pop)]">Revenue protection</div><div className="mt-3 text-4xl font-semibold tabular-nums text-[color:var(--navy-deep)]" style={{ fontFamily: "var(--font-display)" }}>$10.0M</div><div className="mt-1.5 text-sm leading-relaxed text-[color:var(--ink-soft)]">Top 10 detractor accounts, renewal risk.</div></div>
              <div className="rounded-2xl hairline bg-white p-6"><div className="text-xs font-bold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">Intelligence gap</div><div className="mt-3 text-4xl font-semibold tabular-nums text-[color:var(--navy-deep)]" style={{ fontFamily: "var(--font-display)" }}>$551M</div><div className="mt-1.5 text-sm leading-relaxed text-[color:var(--ink-soft)]">Uncharacterized base, next-cycle priority.</div></div>
            </div>
          </Reveal>

          <div className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" aria-hidden />
            Illustrative sample, based on a VistaXM executive readout. Fictional client, illustrative figures.
          </div>
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
