import { createFileRoute } from "@tanstack/react-router";
import { Hero, Section, SectionHead, Card, Reveal } from "@/components/site";
import { BookCallButton } from "@/components/book-call";
import { PageCTA } from "@/components/sections";

export const Route = createFileRoute("/partnerpulse")({
  head: () => ({
    meta: [
      { title: "PartnerPulse — Revenue Channel Intelligence for OEMs & IT channel | VistaXM" },
      {
        name: "description",
        content:
          "PartnerPulse: account-level Revenue Channel Intelligence for OEMs and IT channel companies. See your partners the way customers do, before the renewal.",
      },
      { property: "og:url", content: "https://vistaxm.lovable.app/partnerpulse" },
      { property: "og:title", content: "PartnerPulse — for OEMs & IT channel" },
    ],
    links: [{ rel: "canonical", href: "https://vistaxm.lovable.app/partnerpulse" }],
  }),
  component: PartnerPulse,
});

function PartnerPulse() {
  return (
    <>
      <Hero
        eyebrow="PartnerPulse · OEMs & IT channel"
        title={
          <>
            See your partners the way{" "}
            <span className="text-[color:var(--blue-cta)]">customers do.</span>
          </>
        }
        subtitle="PartnerPulse is Revenue Channel Intelligence for OEMs and IT channel companies. Account-tagged journey × persona signal, surfaced before the renewal, before the production decline."
        ctas={
          <>
            <BookCallButton variant="primary" source="partnerpulse-hero" />
            <a href="#how" className="btn-secondary">How PartnerPulse works</a>
          </>
        }
      />

      <Section id="how">
        <SectionHead
          eyebrow="What you get"
          title="An account-level view of the channel you can't get yourself."
          intro="VistaXM collects candid signal as a neutral third party, standardizes it across the channel, and tags every data point to the account and the partner that owns it."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Card title="Account-level signal" kicker="01">
            Every signal tagged to an account and the partner that owns the relationship. No more
            channel-level averages that hide the dollars.
          </Card>
          <Card title="Partner heat map" kicker="02">
            See which partners are quietly suppressing growth and which are compounding it. Use it
            in partner reviews and contract negotiations.
          </Card>
          <Card title="Certified channel NPS" kicker="03">
            The certified channel score that becomes the credential in proposals, RFPs, and QBRs.
            The only channel NPS an OEM cannot credibly produce for itself.
          </Card>
        </div>
      </Section>

      <Section tint>
        <SectionHead
          eyebrow="Proof"
          title="Softchoice: +$8.4M revenue impact."
          intro="A managed Revenue Channel Intelligence program over two years. +8 NPS, 4% lower churn, 10% higher win rates. The certified score moved because the underlying decisions moved."
        />
        <Reveal delay={120}>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              { v: "+8", l: "NPS points over 2 years" },
              { v: "$8.4M", l: "Revenue impact" },
              { v: "-4%", l: "Churn reduction" },
              { v: "+10%", l: "Higher win rates" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-white hairline p-6">
                <div className="text-4xl font-semibold tabular-nums text-[color:var(--navy-deep)] leading-none">
                  {s.v}
                </div>
                <div className="mt-3 text-sm text-[color:var(--ink-soft)]">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <PageCTA
        title="See PartnerPulse running on your channel."
        intro="A 30-minute working session. We share a redacted PartnerPulse view from a comparable OEM, then walk your specific partners."
        source="partnerpulse-cta"
      />
    </>
  );
}
