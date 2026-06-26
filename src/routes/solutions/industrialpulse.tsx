import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { PageHero, Section, SectionHead } from "@/components/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/solutions/industrialpulse")({
  head: () => ({
    meta: [
      { title: "IndustrialPulse (Coming soon) | VistaXM" },
      {
        name: "description",
        content:
          "Revenue Channel Intelligence for industrial OEMs and distributors: the same neutral, benchmarked read on the channel, built for industrial manufacturers who sell through partners.",
      },
      { property: "og:title", content: "IndustrialPulse (Coming soon) | VistaXM" },
      {
        property: "og:description",
        content:
          "A neutral, benchmarked read on the channel, built for industrial OEMs and distributors who sell through partners. Now in early pilot.",
      },
    ],
  }),
  component: IndustrialPulse,
});

/* ---------------- Local CTA link (CTAButton is not exported) ---------------- */

function CTALink({
  to,
  className,
  children,
}: {
  to: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  );
}

/* ---------------- Local glyphs (internal icons are not exported) ---------------- */

function SiblingIcon({ name }: { name: "partner" | "broker" }) {
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
  if (name === "partner") {
    return (
      <svg {...common}>
        <path d="M8.5 12.5 11 15a2 2 0 0 0 2.8 0l4.7-4.7M14 7l-1-1a2.8 2.8 0 0 0-4 0L4.5 10.5M2 8l4 4M22 8l-4 4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01" />
    </svg>
  );
}

function IndustrialPulse() {
  return (
    <>
      <PageHero
        eyebrow="Solutions / IndustrialPulse"
        badge="Coming soon"
        title="Revenue Channel Intelligence for industrial OEMs and distributors."
        subtitle="The same neutral, benchmarked read on the channel, built for industrial manufacturers and distributors who sell through partners."
        primary={{ label: "Talk to us about an early pilot", to: "/book-a-call" }}
      />

      {/* The opportunity */}
      <Section>
        <SectionHead
          eyebrow="The opportunity"
          title="Bring the partner shadow into the light for industrials."
          intro="For the big industrials, the bulk of revenue runs through the channel, and the end-customer experience lives with the distributor. IndustrialPulse brings the partner shadow into the light for industrial OEMs, with the same managed, neutral model behind PartnerPulse and BrokerPulse."
        />
        <Stagger className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2" stagger={0.12}>
          <StaggerItem>
            <div className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-7 card-lift">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
                <SiblingIcon name="partner" />
              </span>
              <h3 className="!text-xl mt-5">Built on PartnerPulse</h3>
              <p className="mt-3 leading-relaxed text-[color:var(--ink-soft)]">
                The neutral read on partner-led relationships, tuned for the industrial channel:
                where distributors are growing accounts, where they are quietly putting revenue at
                risk.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-7 card-lift">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
                <SiblingIcon name="broker" />
              </span>
              <h3 className="!text-xl mt-5">Shares the BrokerPulse engine</h3>
              <p className="mt-3 leading-relaxed text-[color:var(--ink-soft)]">
                The same managed, benchmarked engine behind BrokerPulse: end-customer and partner
                experience measured across the journey, then tied to retention and expansion.
              </p>
            </div>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Early-pilot closing band */}
      <section className="relative overflow-hidden bg-[color:var(--navy-deep)] text-white grain">
        <div
          aria-hidden
          className="absolute inset-0 opacity-80"
          style={{
            animation: "aurora-drift 24s ease-in-out infinite",
            backgroundImage:
              "radial-gradient(600px 300px at 85% 50%, rgba(49,133,252,0.25), transparent 70%), radial-gradient(500px 260px at 10% 50%, rgba(0,86,167,0.35), transparent 70%), radial-gradient(320px 200px at 60% 90%, rgba(246,130,65,0.12), transparent 70%)",
          }}
        />
        <div className="container-x relative flex flex-col gap-8 py-20 md:flex-row md:items-center md:justify-between md:py-24">
          <FadeIn>
            <div>
              <div className="eyebrow !text-[color:var(--blue-light)] mb-3">Early pilot</div>
              <h2 className="!text-white !text-3xl md:!text-[2.5rem] max-w-[20ch]">
                Want to shape the first industrial cohort?
              </h2>
              <p className="mt-3 max-w-[44ch] text-white/70">
                We are selecting a small group of industrial OEMs and distributors to build the
                benchmark with. Early pilots help define what gets measured first.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <CTALink to="/book-a-call" className="btn-primary">
              Talk to us
            </CTALink>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
