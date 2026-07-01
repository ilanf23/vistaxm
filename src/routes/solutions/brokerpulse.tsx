import { createFileRoute } from "@tanstack/react-router";
import { BOOK_A_CALL_URL, BRIEFS } from "@/lib/links";
import {
  CTABand,
  GetTheBrief,
  InfluencerGapCard,
  PageHero,
  Reveal,
  Section,
  SectionHead,
} from "@/components/site";
import { AmbientBand } from "@/components/media";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/solutions/brokerpulse")({
  head: () => ({
    meta: [
      { title: "BrokerPulse | VistaXM" },
      {
        name: "description",
        content:
          "BrokerPulse is broker experience management for insurance carriers: customer experience analytics and customer intelligence on broker and agency experience, tied to premium retention and customer retention.",
      },
      { property: "og:title", content: "BrokerPulse | VistaXM" },
      {
        property: "og:description",
        content:
          "Know which agencies are quietly at risk, before production drops. BrokerPulse gives carriers a neutral read on broker and agency experience, tied to premium.",
      },
    ],
  }),
  component: BrokerPulse,
});

/* ---------------- Local: "What it informs" list ----------------
   Bespoke to this route. A compact, scannable set of the revenue decisions
   BrokerPulse informs. Intentionally qualitative: no figures on this page. */

function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const INFORMS: { title: string; desc: string }[] = [
  {
    title: "Where to invest",
    desc: "Direct attention and resources to the relationships that move premium, not the ones that simply ask the loudest.",
  },
  {
    title: "Which agencies to double down on",
    desc: "Spot the producers who are ready to grow with you and lean in before a competitor does.",
  },
  {
    title: "Which to develop",
    desc: "Find the agencies with upside that is sitting unused, and the specific friction holding them back.",
  },
  {
    title: "Which relationships are costing more than they return",
    desc: "Surface the accounts quietly draining service and support without the production to justify it.",
  },
];

function InformsList() {
  return (
    <Stagger className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2" stagger={0.09}>
      {INFORMS.map((item) => (
        <StaggerItem key={item.title}>
          <div className="group relative flex h-full gap-4 rounded-2xl hairline bg-white p-6 md:p-7 card-lift">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--orange-pop)] transition-transform duration-500 group-hover:scale-x-100"
            />
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
              <CheckGlyph className="h-5 w-5" />
            </span>
            <div>
              <h3 className="!text-lg !text-[color:var(--navy-deep)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                {item.desc}
              </p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function BrokerPulse() {
  return (
    <>
      <PageHero
        eyebrow="Solutions / BrokerPulse"
        title="Know which agencies are quietly at risk, before production drops."
        subtitle="Brokers drive most of your premium, yet you cannot see the experience behind it. BrokerPulse gives carriers a neutral, benchmarked read on broker and agency experience, tied to premium."
        primary={{ label: "Book a 30-minute call", to: BOOK_A_CALL_URL }}
      />

      {/* What it does */}
      <Section dark>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <SectionHead
            dark
            eyebrow="What it does"
            title="Broker experience management for carriers."
            intro="We measure the experience across your broker and agency network, flag which relationships are at risk and which are ready to grow, and tie each signal to premium retention and expansion. The agencies quietly turning passive show up here long before production declines."
          />
          <Reveal delay={120}>
            <InfluencerGapCard />
            <div className="mt-3 flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/55">
              <span aria-hidden className="h-1 w-1 rounded-full bg-white/55" />
              Illustrative example
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What it informs */}
      <Section tint>
        <SectionHead
          eyebrow="What it informs"
          title="What it informs."
          intro="Each signal points to a decision about your network: where the relationship is headed, and the move that changes it."
        />
        <InformsList />
      </Section>

      {/* Ambient divider: the broker relationship */}
      <Section>
        <Reveal>
          <AmbientBand
            image="/images/ambient/broker-portfolio.jpg"
            alt="An insurance broker reviewing an account portfolio at a desk"
            eyebrow="The broker relationship"
            title="See the book the way your agencies feel it."
          >
            The experience behind the premium, read across your whole network.
          </AmbientBand>
        </Reveal>
      </Section>

      {/* Custom graphic slot (placeholder, correct aspect ratio) */}
      <Section>
        <SectionHead
          center
          eyebrow="BrokerPulse in action"
          title="A look at the BrokerPulse read."
        />
        <FadeIn delay={120} className="mx-auto mt-12 max-w-4xl">
          <figure>
            <div className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl border-2 border-dashed border-[color:var(--gray-line)] bg-[color:var(--blue-tint)] text-center">
              <span className="px-6 text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
                Custom BrokerPulse graphic
              </span>
            </div>
            <figcaption className="mt-3 text-center text-sm italic text-[color:var(--ink-soft)]">
              Custom graphic to come.
            </figcaption>
          </figure>
        </FadeIn>
      </Section>

      {/* Get the brief */}
      <Section tint>
        <GetTheBrief brief={BRIEFS.brokerpulse} />
      </Section>

      <CTABand />
    </>
  );
}
