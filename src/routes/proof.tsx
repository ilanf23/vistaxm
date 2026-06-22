import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site";
import { BookCallButton } from "@/components/book-call";
import { PageCTA, RealProof } from "@/components/sections";

export const Route = createFileRoute("/proof")({
  head: () => ({
    meta: [
      { title: "Proof — Revenue impact, in dollars | VistaXM" },
      {
        name: "description",
        content:
          "Real outcomes from Softchoice, Veeam, and a full-service industrial supplier. The certified NPS is the credential; the revenue impact is the point.",
      },
      { property: "og:url", content: "https://vistaxm.lovable.app/proof" },
      { property: "og:title", content: "Proof — Revenue impact, in dollars" },
    ],
    links: [{ rel: "canonical", href: "https://vistaxm.lovable.app/proof" }],
  }),
  component: Proof,
});

function Proof() {
  return (
    <>
      <Hero
        eyebrow="Proof"
        title={
          <>
            The results speak in{" "}
            <span className="text-[color:var(--blue-cta)]">dollars,</span> not survey points.
          </>
        }
        subtitle="The certified NPS is the credential. The revenue impact is the point. Real outcomes from teams that ran this playbook."
        ctas={<BookCallButton variant="primary" source="proof-hero" />}
      />
      <RealProof />
      <PageCTA
        title="See a redacted Revenue Channel Intelligence view from a comparable company."
        intro="30 minutes, no obligation. We bring the proof to the call."
        source="proof-cta"
      />
    </>
  );
}
