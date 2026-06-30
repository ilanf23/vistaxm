import { createFileRoute } from "@tanstack/react-router";
import { BOOK_A_CALL_URL } from "@/lib/links";
import { CTABand, PageHero, Section, SectionHead } from "@/components/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { type ReactNode } from "react";

export const Route = createFileRoute("/crn")({
  head: () => ({
    meta: [
      { title: "VistaXM for IT Solution Providers and MSPs" },
      {
        name: "description",
        content:
          "Your customers are telling you which accounts are about to grow, stall, or churn. VistaXM turns that signal into the revenue moves you make every week.",
      },
      { property: "og:title", content: "VistaXM for IT Solution Providers and MSPs" },
      {
        property: "og:description",
        content:
          "Turn customer signal into revenue moves. See where IT solution providers and MSPs are leaving money on the table.",
      },
    ],
  }),
  component: CRNLanding,
});

/* ---------------- Local glyphs (icons are not exported) ---------------- */

function ResourceIcon({ name }: { name: "report" | "brief" | "soon" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true,
  };
  if (name === "report") {
    return (
      <svg {...common}>
        <path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6M9 9h2" />
      </svg>
    );
  }
  if (name === "brief") {
    return (
      <svg {...common}>
        <path d="M7 4h7l4 4v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* ---------------- Local resource card ---------------- */

function ResourceCard({
  index,
  icon,
  title,
  kind,
  description,
  comingSoon = false,
}: {
  index: string;
  icon: "report" | "brief" | "soon";
  title: ReactNode;
  kind: string;
  description: ReactNode;
  comingSoon?: boolean;
}) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl hairline bg-white p-7 card-lift">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
          <ResourceIcon name={icon} />
        </span>
        {comingSoon ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--blue-pale)] bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--ink-soft)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" />
            Coming soon
          </span>
        ) : (
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]/60">
            {index}
          </span>
        )}
      </div>

      <div className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-link)]">
        {kind}
      </div>
      <h3 className="mt-2 !text-xl">{title}</h3>
      <p className="mt-3 leading-relaxed text-[color:var(--ink-soft)]">{description}</p>
    </div>
  );
}

function CRNLanding() {
  return (
    <>
      <PageHero
        eyebrow="For IT solution providers and MSPs"
        title="You are leaving money on the table. We will show you where."
        subtitle="Your customers are telling you which accounts are about to grow, stall, or churn. VistaXM turns that signal into the revenue moves you make every week."
        primary={{ label: "Book a 30-minute call", to: BOOK_A_CALL_URL }}
      />

      {/* The three assets */}
      <Section>
        <SectionHead
          eyebrow="From the CRN program"
          title="Three resources, free to read."
          intro="A short library to help IT solution providers and MSPs find the revenue their customers are already pointing them toward."
        />
        <Stagger className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3" stagger={0.12}>
          <StaggerItem className="h-full">
            <ResourceCard
              index="01"
              icon="report"
              kind="Report · 10 to 12 pages"
              title="State of Revenue Intelligence for the Channel"
              description="A 10 to 12 page report on how the channel is turning customer experience into retention, expansion, and revenue."
            />
          </StaggerItem>
          <StaggerItem className="h-full">
            <ResourceCard
              index="02"
              icon="brief"
              kind="Short brief"
              title="5 Ways IT Solution Providers and MSPs Are Leaving Money on the Table"
              description="A short brief on the revenue most partners miss, and the signals that point to it before a renewal is at risk."
            />
          </StaggerItem>
          <StaggerItem className="h-full">
            <ResourceCard
              index="03"
              icon="soon"
              kind="Resource"
              title="Coming soon (finalizing with CRN)"
              description="A third resource is on the way. We are finalizing it with CRN and will publish it here shortly."
              comingSoon
            />
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Why it matters */}
      <Section tint>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHead
            title="Why it matters."
            intro="Most churn never announces itself, and most expansion never asks. The partners who see the signal first win the renewal and the upsell. The ones who do not, lose both quietly."
          />
          <FadeIn delay={120}>
            <figure className="relative rounded-2xl hairline bg-white p-8 md:p-10">
              <span
                aria-hidden
                className="absolute left-6 top-4 text-6xl leading-none text-[color:var(--orange-pop)]/30"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;
              </span>
              <blockquote
                className="relative text-2xl font-semibold leading-snug text-[color:var(--navy-deep)] md:text-[1.75rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Companies do not spend NPS points. They spend dollars. We tell you which accounts
                are about to spend more, and which are about to walk.
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
                VistaXM · Revenue Channel Intelligence
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
