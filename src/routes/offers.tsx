import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site";
import { BookCallButton } from "@/components/book-call";
import { FAQ, OfferLadder, PageCTA } from "@/components/sections";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers — Diagnostic, Essentials, Managed | VistaXM" },
      {
        name: "description",
        content:
          "Three ways to start with Revenue Channel Intelligence. A 3-week Rapid Diagnostic with a risk-reversal guarantee, RCI Essentials in 90 days, or the full Managed Program.",
      },
      { property: "og:url", content: "https://vistaxm.lovable.app/offers" },
      { property: "og:title", content: "Offers — Diagnostic, Essentials, Managed" },
    ],
    links: [{ rel: "canonical", href: "https://vistaxm.lovable.app/offers" }],
  }),
  component: Offers,
});

function Offers() {
  return (
    <>
      <Hero
        eyebrow="The on-ramp"
        title={
          <>
            Start with a{" "}
            <span className="text-[color:var(--blue-cta)]">guaranteed</span> 3-week Diagnostic.
          </>
        }
        subtitle="Fixed scope, pre-agreed success criteria, and a written risk-reversal guarantee. The fastest, lowest-risk way to prove Revenue Channel Intelligence in your channel."
        ctas={
          <>
            <BookCallButton variant="primary" source="offers-hero">
              Book the Diagnostic call
            </BookCallButton>
            <a href="#offers" className="btn-secondary">See all three offers</a>
          </>
        }
      />
      <OfferLadder />
      <FAQ />
      <PageCTA
        title="Ready to scope your Diagnostic?"
        intro="30 minutes. We'll talk slice, success criteria, and timing."
        source="offers-cta"
      />
    </>
  );
}
