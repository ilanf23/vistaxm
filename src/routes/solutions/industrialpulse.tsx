import { createFileRoute, Link } from "@tanstack/react-router";
import { BOOK_PATH, BRIEFS } from "@/lib/links";
import { canonicalLink } from "@/lib/seo";
import { type ReactNode } from "react";
import {
  GetTheBrief,
  PageHero,
  Reveal,
  RevenueSignalCard,
  Section,
  SectionHead,
  Stat,
} from "@/components/site";
import { ChannelSignalMap } from "@/components/solutions-viz";
import { AmbientBand } from "@/components/media";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/solutions/industrialpulse")({
  head: () => ({
    meta: [
      { title: "IndustrialPulse: Coming Soon | VistaXM" },
      {
        name: "description",
        content:
          "Revenue Channel Intelligence for industrial OEMs and distributors. Coming soon. Register your interest.",
      },
      { property: "og:title", content: "IndustrialPulse: Coming Soon | VistaXM" },
      {
        property: "og:description",
        content:
          "A neutral, benchmarked read on the channel, built for industrial OEMs and distributors who sell through partners. Now in early pilot.",
      },
    ],
    links: [canonicalLink("/solutions/industrialpulse")],
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
  const newTab = to.startsWith("http");
  return (
    <a
      href={to}
      className={className}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
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
        primary={{ label: "Talk to us about an early pilot", to: BOOK_PATH }}
        visual={
          <RevenueSignalCard
            account="Atlas Industrial Supply"
            amountLabel="$1.9M"
            reason="Your distributor reports a healthy account, but the plant running your equipment has logged repeat install issues. You are two steps from the signal."
            action="Get ahead of the reorder before a rival is specced in"
            daysToRenewal={90}
            index={1}
            total={3}
          />
        }
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

      {/* IndustrialPulse in action: the channel signal path */}
      <Section tint>
        <SectionHead
          center
          eyebrow="IndustrialPulse in action"
          title="The signal fades the further it travels."
          intro="Revenue runs from you to the distributor to the plant floor, and the experience that decides your next order lives at the far end. Here is where the visibility drops off, and what IndustrialPulse puts back."
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <ChannelSignalMap />
        </div>
      </Section>

      {/* Ambient divider: built for the industrial channel */}
      <Section>
        <Reveal>
          <AmbientBand
            image="/images/ambient/warehouse-floor.jpg"
            alt="An industrial distribution warehouse with pallet racking"
            eyebrow="Built for the channel"
            title="The same read, tuned for industrial distribution."
          >
            Where revenue runs through distributors, the end-customer experience lives with them.
          </AmbientBand>
        </Reveal>
      </Section>

      {/* Get the brief (coming soon; capture-interest CTA) */}
      <Section>
        <GetTheBrief brief={BRIEFS.industrialpulse} />
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
            <CTALink to={BOOK_PATH} className="btn-primary">
              Talk to us
            </CTALink>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
