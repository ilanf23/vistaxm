import { createFileRoute } from "@tanstack/react-router";
import { BOOK_PATH, BRIEFS } from "@/lib/links";
import { canonicalLink, faqJsonLd, type Faq } from "@/lib/seo";
import {
  CTABand,
  FAQSection,
  GetTheBrief,
  InfluencerGapCard,
  PageHero,
  ProvenResults,
  Reveal,
  RevenueSignalCard,
  Section,
  SectionHead,
} from "@/components/site";
import { BrokerBookMap } from "@/components/solutions-viz";
import { AmbientBand } from "@/components/media";
import { Stagger, StaggerItem } from "@/components/motion";

const FAQS: Faq[] = [
  {
    question: "What is BrokerPulse?",
    answer:
      "BrokerPulse is VistaXM's program for insurance carriers. It measures broker experience, quantifies the premium at risk, and produces a Broker Advocacy Index, so carriers can see why some brokers sell more, stay longer, and advocate.",
  },
];

export const Route = createFileRoute("/solutions/brokerpulse")({
  head: () => ({
    meta: [
      { title: "BrokerPulse: Broker Experience Management | VistaXM" },
      {
        name: "description",
        content:
          "BrokerPulse quantifies broker experience and the premium at risk for insurance carriers, with the Broker Advocacy Index and journey-stage measurement.",
      },
      { property: "og:title", content: "BrokerPulse: Broker Experience Management | VistaXM" },
      {
        property: "og:description",
        content:
          "Know which agencies are quietly at risk, before production drops. BrokerPulse gives carriers a neutral read on broker and agency experience, tied to premium.",
      },
    ],
    links: [canonicalLink("/solutions/brokerpulse")],
    scripts: [faqJsonLd(FAQS)],
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
        primary={{ label: "Book a 30-minute call", to: BOOK_PATH }}
        visual={
          <RevenueSignalCard
            account="Ridgeline Brokers"
            amountLabel="$3.4M"
            reason="The day-to-day servicing team has cooled while the principal stays happy. That gap shows up when the book renews."
            action="Re-engage the servicing team before Q3 renewals"
            daysToRenewal={74}
            index={1}
            total={4}
          />
        }
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

      {/* BrokerPulse in action: the agency book read */}
      <Section>
        <SectionHead
          center
          eyebrow="BrokerPulse in action"
          title="A look at the BrokerPulse read."
          intro="Every agency in your book, plotted by the premium it carries against where its experience is heading. The ones to catch sit high on premium and low on trend."
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <BrokerBookMap />
        </div>
      </Section>

      {/* Proof */}
      <ProvenResults />

      {/* Get the brief */}
      <Section tint>
        <GetTheBrief brief={BRIEFS.brokerpulse} />
      </Section>

      <FAQSection items={FAQS} tint={false} />

      <CTABand />
    </>
  );
}
