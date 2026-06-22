import { createFileRoute } from "@tanstack/react-router";
import { Hero, Section, SectionHead, Card } from "@/components/site";
import { BookCallButton } from "@/components/book-call";
import { PageCTA } from "@/components/sections";

export const Route = createFileRoute("/brokerpulse")({
  head: () => ({
    meta: [
      { title: "BrokerPulse — Revenue Channel Intelligence for carriers | VistaXM" },
      {
        name: "description",
        content:
          "BrokerPulse: account-level Revenue Channel Intelligence for insurance carriers. Reveal which agencies are quietly at risk before production declines.",
      },
      { property: "og:url", content: "https://vistaxm.lovable.app/brokerpulse" },
      { property: "og:title", content: "BrokerPulse — for insurance carriers" },
    ],
    links: [{ rel: "canonical", href: "https://vistaxm.lovable.app/brokerpulse" }],
  }),
  component: BrokerPulse,
});

function BrokerPulse() {
  return (
    <>
      <Hero
        eyebrow="BrokerPulse · Insurance carriers"
        title={
          <>
            Which agencies are quietly{" "}
            <span className="text-[color:var(--blue-cta)]">at risk?</span>
          </>
        }
        subtitle="BrokerPulse is Revenue Channel Intelligence for carriers. Brokers drive most premium; reveal which agencies are quietly at risk before production declines, and which to lean into."
        ctas={
          <>
            <BookCallButton variant="primary" source="brokerpulse-hero" />
            <a href="#how" className="btn-secondary">How BrokerPulse works</a>
          </>
        }
      />

      <Section id="how">
        <SectionHead
          eyebrow="What you get"
          title="See agency relationships the way the broker's customer does."
          intro="Brokers own the end-customer relationship. BrokerPulse instruments that relationship as a neutral third party and tags signal to the agency, the line of business, and the dollars at risk."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Card title="Agency-level risk map" kicker="01">
            Which agencies are quietly suppressing renewal? Which book-of-business segments are at
            risk? Where is production about to decline?
          </Card>
          <Card title="Carrier-side decisions" kicker="02">
            Revenue-tagged signals translated into the decisions carriers actually make: appointment
            strategy, agency reviews, product positioning, support investment.
          </Card>
          <Card title="Certified score" kicker="03">
            A third-party certified score you can use in agency QBRs, broker recruitment, and board
            decks. The credential a carrier cannot credibly produce for itself.
          </Card>
        </div>
      </Section>

      <PageCTA
        title="See BrokerPulse on your book."
        intro="A 30-minute working session with the VistaXM team. Redacted BrokerPulse view from a comparable carrier, then your specific agencies."
        source="brokerpulse-cta"
      />
    </>
  );
}
