import { createFileRoute } from "@tanstack/react-router";
import { Hero, Section, SectionHead } from "@/components/site";
import { BookCallButton } from "@/components/book-call";
import { Leadership, PageCTA } from "@/components/sections";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Operators who've done this at scale | VistaXM" },
      {
        name: "description",
        content:
          "Built by operators who scaled customer experience inside HPE GreenLake, Qualtrics, and Cloud Technology Partners. Now turning channel sentiment into revenue decisions.",
      },
      { property: "og:url", content: "https://vistaxm.lovable.app/about" },
      { property: "og:title", content: "About — VistaXM Leadership" },
    ],
    links: [{ rel: "canonical", href: "https://vistaxm.lovable.app/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <Hero
        eyebrow="About"
        title={
          <>
            Operators who have{" "}
            <span className="text-[color:var(--blue-cta)]">done this</span> at scale.
          </>
        }
        subtitle="VistaXM was built by leaders from HPE GreenLake, Qualtrics, and Cloud Technology Partners. We saw the partner shadow up close, and we built the category to fix it."
        ctas={<BookCallButton variant="primary" source="about-hero" />}
      />

      <Leadership />

      <Section tint>
        <SectionHead
          eyebrow="Where we sit"
          title="Salt Lake City, Utah. Working with channels everywhere."
          intro="VistaXM is headquartered in Salt Lake City. The team is distributed across customer experience, channel strategy, and data engineering."
        />
      </Section>

      <PageCTA
        title="Talk with the team."
        intro="30 minutes. No obligation. We bring the proof to the call."
        source="about-cta"
      />
    </>
  );
}
