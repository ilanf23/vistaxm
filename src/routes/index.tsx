import { createFileRoute } from "@tanstack/react-router";
import { CTABand, Card, Hero, Section, SectionHead, Stat } from "@/components/site";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VistaXM — Revenue Channel Intelligence" },
      { name: "description", content: "Your NPS is a score. Your renewal is a decision. VistaXM turns partner and broker experience into account-level revenue signals for OEMs, IT channel companies, and insurance carriers." },
      { property: "og:title", content: "VistaXM — Revenue Channel Intelligence" },
      { property: "og:description", content: "Turn partner and broker experience into the account-level signal of where revenue is about to grow or walk." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero
        eyebrow="Revenue Channel Intelligence"
        title={<>Your NPS is a score. <br className="hidden md:block" /><span className="text-[color:var(--blue-light)]">Your renewal is a decision.</span></>}
        subtitle="We turn partner and broker experience into the account-level signal of where revenue is about to grow or walk — before it shows up in a renewal."
        primary={{ label: "Book a 30-minute conversation", to: "mailto:sales@vistaxm.com" }}

      />

      {/* The partner shadow */}
      <Section>
        <SectionHead
          eyebrow="The partner shadow"
          title="The channel runs on recurring revenue. The relationship is the revenue."
          intro="When there is a partner or broker in the middle, the vendor cannot see or trust how the end customer is being served. That blind spot is where churn forms — months before it shows up in the numbers."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Vendor" kicker="What they see">A pipeline number and a partner-reported forecast. No window into the end-customer relationship.</Card>
          <Card title="Partner / Broker" kicker="What they share">What helps the deal. The candid signal that predicts retention is rarely written down.</Card>
          <Card title="End Customer" kicker="What's invisible">Frustration with onboarding, support, or operations — voiced to no one until renewal arrives.</Card>
        </div>
      </Section>

      {/* Why a single score fails */}
      <Section tint>
        <SectionHead
          eyebrow="Why a single score fails"
          title="A traditional NPS or CSAT can't tell you which account, which stage, or which person."
          intro="In the channel it can't even tell you whose problem it is to fix. The score is a vanity metric. The decision is a revenue act."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 border border-[color:var(--gray-line)]">
            <div className="eyebrow !text-[color:var(--ink-soft)]">Before</div>
            <div className="mt-3 text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">A score. Not a decision.</div>
            <div className="mt-6 flex items-end gap-4">
              <div className="text-7xl font-bold text-[color:var(--ink)]">42</div>
              <div className="text-sm text-[color:var(--ink-soft)] pb-3">NPS, account-level<br/>No persona. No journey. No action.</div>
            </div>
          </div>
          <div className="rounded-2xl bg-[color:var(--navy-deep)] text-white p-8">
            <div className="eyebrow !text-[color:var(--blue-light)]">After</div>
            <div className="mt-3 text-3xl md:text-4xl font-bold !text-white">A revenue decision. Not a score.</div>
            <ul className="mt-6 space-y-3 text-white/90 text-sm">
              <li>• 7 accounts at risk in Implementation × Operations</li>
              <li>• $4.2M expansion latent in Renewal × Executive</li>
              <li>• Decision Maker → Influencer gap widening in 3 named accounts</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* The model */}
      <Section>
        <SectionHead
          eyebrow="The model"
          title="Journey × Persona. Every intersection is a revenue signal."
          intro="Five journey stages across four personas. Where they cross is where retention, expansion, and churn risk actually live."
        />
        <div className="mt-12"><JourneyMatrix /></div>
        <div className="mt-6 text-sm text-[color:var(--ink-soft)]">
          Highlighted: <span className="inline-block w-3 h-3 align-middle bg-[color:var(--orange-pop)] rounded-sm mx-1" /> the early-warning cell — Operations × Renewal — where churn forms first.
        </div>
      </Section>

      {/* Signature insight */}
      <Section tint>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead
              eyebrow="The signature insight"
              title="The Decision Maker → Influencer gap."
              intro="The executive is satisfied. The day-to-day influencers who actually shape the renewal are not. That gap is the most reliable early warning of churn — and it is invisible to an account-level score."
            />
          </div>
          <div className="rounded-2xl bg-white border border-[color:var(--gray-line)] p-8">
            <div className="text-sm font-semibold text-[color:var(--navy-deep)] mb-6">Account: Acme Logistics</div>
            <div className="space-y-5">
              {[
                { label: "Executive / Decision Maker", value: 72, color: "var(--blue-cta)" },
                { label: "Technical", value: 58, color: "var(--blue-light)" },
                { label: "Procurement / Commercial", value: 49, color: "var(--blue-light)" },
                { label: "Operations / Day-to-Day", value: 21, color: "var(--orange-pop)" },
              ].map(r => (
                <div key={r.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[color:var(--ink-soft)]">{r.label}</span>
                    <span className="font-semibold text-[color:var(--navy-deep)]">NPS {r.value}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[color:var(--gray-soft)] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(r.value + 100) / 2}%`, background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-sm text-[color:var(--ink-soft)]">
              Gap of <span className="font-semibold text-[color:var(--orange-pop)]">51 points</span> between executive and operations — flagged 7 months before renewal.
            </div>
          </div>
        </div>
      </Section>

      {/* Two moats */}
      <Section>
        <SectionHead
          eyebrow="The two moats"
          title="Why no one else can produce this."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card title="Neutrality" kicker="Moat 01">
            As a neutral third party, VistaXM gets candid signal neither the vendor nor the partner can collect for themselves. Customers tell us what they would never put in a vendor survey.
          </Card>
          <Card title="The data moat" kicker="Moat 02">
            The channel's largest standardized, apples-to-apples benchmark set — compounding with every customer added. You are measured against the channel, not against yourself last quarter.
          </Card>
        </div>
      </Section>

      {/* Certified NPS */}
      <Section tint>
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <SectionHead
              eyebrow="The certified NPS"
              title="The J.D. Power of the channel."
              intro="A third-party certified NPS, usable in proposals, RFPs, and marketing. The only certified NPS a carrier or OEM cannot produce for itself."
            />
          </div>
          <div className="rounded-2xl bg-[color:var(--navy-deep)] text-white p-8 text-center">
            <div className="text-sm uppercase tracking-widest text-[color:var(--blue-light)]">Certified NPS</div>
            <div className="mt-4 text-7xl font-bold !text-white">68</div>
            <div className="mt-2 text-white/80 text-sm">Top quartile · Channel benchmark</div>
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-white/70 border border-white/20 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-[color:var(--orange-pop)]" /> Independently verified
            </div>
          </div>
        </div>
      </Section>

      {/* Proof band */}
      <Section>
        <SectionHead eyebrow="Proof" title="Experience is revenue. Here's the receipts." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Stat value="+8 NPS" label="Softchoice over two years — $8.4M business impact, 4% lower churn, 10% higher win rates." />
          <Stat value="30 → 73" label="Veeam NPS lift alongside 27% year-over-year revenue growth." />
          <Stat value="$26.8M" label="Opportunity-and-risk pool surfaced for a full-service industrial supplier; $11M+ revenue protected." />
          <Stat value="33%" label="Only one-third of companies that measure NPS link it to revenue. The rest are flying blind." />
        </div>
      </Section>


      {/* Offer ladder */}
      <Section tint>
        <SectionHead eyebrow="The offer ladder" title="Three ways to start." intro="Low-risk proof to fully managed program." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card title="Rapid Diagnostic" kicker="$25k–$50k · 3 weeks">
            Targeted slice of your channel or book of business. Low-risk proof that the signal exists and that it changes a decision.
          </Card>
          <Card title="RCI Essentials" kicker="~$25k · first wave in 90 days">
            First production wave of Revenue Channel Intelligence across journey × persona. Account-level scoring and your first benchmark.
          </Card>
          <Card title="Managed Program" kicker="Ongoing">
            The full ongoing program. PartnerPulse and BrokerPulse, continuous signal, executive reviews, certified NPS, benchmark compounding.
          </Card>
        </div>
      </Section>


      {/* Pillars strip */}
      <section className="bg-[color:var(--navy)] text-white">
        <div className="container-x py-14 grid gap-6 md:grid-cols-5 text-center">
          {[
            "Experience is revenue.",
            "Persona and journey, not a single score.",
            "Neutral and certified.",
            "Managed, fast, proven.",
            "The data moat.",
          ].map(p => (
            <div key={p} className="text-sm md:text-base font-semibold text-white">{p}</div>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
