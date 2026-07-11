import { createFileRoute } from "@tanstack/react-router";
import { BOOK_PATH, BRIEFS } from "@/lib/links";
import { canonicalLink, faqJsonLd, type Faq } from "@/lib/seo";
import {
  CTABand,
  Card,
  FAQSection,
  GetTheBrief,
  NPSGauge,
  PageHero,
  Reveal,
  RevenueSignalCard,
  ScoreVsDecision,
  Section,
  SectionHead,
} from "@/components/site";
import { ConvictionMap } from "@/components/solutions-viz";
import { AmbientBand } from "@/components/media";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

const FAQS: Faq[] = [
  {
    question: "What is PartnerPulse?",
    answer:
      "PartnerPulse is VistaXM's program for OEMs and distributors. It gives them a neutral, benchmarked view of how their partners deliver customer experience across the journey, so they can see where revenue is at risk before it shows up in the numbers.",
  },
];

export const Route = createFileRoute("/solutions/partnerpulse")({
  head: () => ({
    meta: [
      { title: "PartnerPulse: Partner Experience Management | VistaXM" },
      {
        name: "description",
        content:
          "PartnerPulse gives OEMs and distributors a neutral, benchmarked view of partner-delivered customer experience across the journey. See where revenue is hiding.",
      },
      { property: "og:title", content: "PartnerPulse: Partner Experience Management | VistaXM" },
      {
        property: "og:description",
        content:
          "See your channel the way your customers do. PartnerPulse measures partner conviction, active recommendation, and where alternatives are gaining traction.",
      },
    ],
    links: [canonicalLink("/solutions/partnerpulse")],
    scripts: [faqJsonLd(FAQS)],
  }),
  component: PartnerPulse,
});

/* ---------------- Local icons (inlined; site.tsx icons are not exported) ---------------- */

function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12.5l4 4 10-10" />
    </svg>
  );
}

function ArrowGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

/* ---------------- Local: measures list (what it measures) ---------------- */

const MEASURES: { title: string; note: string }[] = [
  {
    title: "Partner conviction by organization",
    note: "How strongly each partner believes in you, read at the level of the firm.",
  },
  {
    title: "Active recommendation rate",
    note: "How often partners put you forward when a customer is choosing.",
  },
  {
    title: "The conviction gap",
    note: "The distance between practice leaders and the front line who sit with the customer.",
  },
  {
    title: "Where alternatives are gaining traction",
    note: "Which competing options are winning attention, and at which stage of the deal.",
  },
  {
    title: "Investment confidence by program dimension",
    note: "Where partners trust your enablement, support, and funding to pay off.",
  },
  {
    title: "Net partner promoter score",
    note: "Benchmarked across your ecosystem, not scored in isolation.",
  },
];

function MeasureList() {
  return (
    <Stagger className="mt-10 grid gap-3" stagger={0.08}>
      {MEASURES.map((m) => (
        <StaggerItem key={m.title}>
          <div className="group flex items-start gap-4 rounded-2xl hairline bg-white p-5 card-lift">
            <span
              aria-hidden
              className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]"
            >
              <CheckGlyph className="h-4 w-4" />
            </span>
            <div>
              <div className="font-semibold leading-snug text-[color:var(--navy-deep)]">
                {m.title}
              </div>
              <div className="mt-1 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                {m.note}
              </div>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------------- Local: what it informs ---------------- */

const INFORMS: string[] = [
  "MDF allocation",
  "Field and pre-sales deployment",
  "Tier advancement",
  "Program design",
  "Retention conversations six to twelve months before attrition shows up in deal data",
];

function InformsList() {
  return (
    <Stagger className="mt-12 grid gap-4 md:grid-cols-2" stagger={0.08}>
      {INFORMS.map((item, i) => (
        <StaggerItem key={item} className={i === INFORMS.length - 1 ? "md:col-span-2" : ""}>
          <div className="group flex items-center gap-4 rounded-2xl hairline bg-[color:var(--blue-tint)] p-5 transition-colors hover:bg-white card-lift">
            <span
              aria-hidden
              className="flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-white text-[color:var(--blue-link)] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <ArrowGlyph className="h-4 w-4" />
            </span>
            <span className="font-semibold leading-snug text-[color:var(--navy-deep)]">{item}</span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------------- Local: dark glass gauge card ---------------- */

function ConvictionGauge() {
  return (
    <FadeIn delay={120}>
      <div className="glass rounded-[1.75rem] p-7 md:p-9">
        <div className="flex items-center justify-between gap-3">
          <div className="eyebrow !text-[color:var(--blue-light)]">Benchmarked read</div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/70">
            <span aria-hidden className="h-1 w-1 rounded-full bg-[color:var(--orange-pop)]" />
            Illustrative
          </span>
        </div>
        <div className="mt-6">
          <NPSGauge value={68} />
        </div>
        <div className="mt-6 border-t border-white/10 pt-5 text-center">
          <div className="text-sm font-semibold text-white">
            Net partner promoter score (illustrative)
          </div>
          <p className="mx-auto mt-2 max-w-[34ch] text-sm leading-relaxed text-white/65">
            Read against your ecosystem, not in a vacuum, so a number becomes a position.
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ---------------- Page ---------------- */

function PartnerPulse() {
  return (
    <>
      <PageHero
        eyebrow="Solutions / PartnerPulse"
        title="See your channel the way your customers do."
        subtitle="A neutral, benchmarked read on how your partners actually deliver, and whether they are convinced enough to recommend you when it counts."
        primary={{ label: "Book a 30-minute call", to: BOOK_PATH }}
        visual={
          <RevenueSignalCard
            account="Belmont IT"
            amountLabel="$2.1M"
            reason="Belmont still believes in you, but they have stopped putting you forward in new deals. The conviction is high; the recommendation has gone quiet."
            action="Re-engage Belmont's front line before the next cycle"
            daysToRenewal={63}
            index={1}
            total={3}
          />
        }
      />

      {/* What it is */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <SectionHead
            eyebrow="What it is"
            title="A new category, built for how the channel sells."
            intro="Traditional revenue intelligence reads only your own pipeline. It cannot see the indirect channel, where a partner or broker sits between you and the end customer. Revenue Channel Intelligence is the neutral way to measure end-customer and partner experience across the channel and tie it to retention, expansion, and churn. Customer experience is the method. Revenue is the point."
          />
          <FadeIn delay={120}>
            <figure className="relative rounded-2xl hairline bg-[color:var(--blue-tint)] p-8 md:p-10">
              <blockquote
                className="relative text-2xl font-semibold leading-snug text-[color:var(--navy-deep)] md:text-[1.75rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;A score is not a decision. We provide true intelligence to drive revenue
                decisions.&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
                Erik Vogel, Chief Executive Officer
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </Section>

      {/* Two tracks (sits between the hero and What it measures) */}
      <Section tint>
        <SectionHead
          eyebrow="Two tracks"
          title="Built for both sides of the channel."
          intro="PartnerPulse runs the same neutral, benchmarked method whether you sell through partners or you are the partner. Pick the track that matches where you sit."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Card title="OEMs and distributors" kicker="Track 01" delay={0}>
            Measure your whole partner network and direct enablement, field support, and MDF where
            they produce the highest return.
          </Card>
          <Card title="Partners themselves" kicker="Track 02" delay={120}>
            Run a world-class experience program on your own customers, fully managed, and turn the
            signal into revenue moves.
          </Card>
        </div>
      </Section>

      {/* What it measures */}
      <Section dark>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <SectionHead
              dark
              eyebrow="What it measures"
              title="Conviction, not just certification."
              intro="Certification proves a partner can sell you. Conviction tells you whether they will. PartnerPulse measures the belief behind the badge, organization by organization, and benchmarks it across your channel."
            />
            <MeasureList />
          </div>
          <ConvictionGauge />
        </div>
      </Section>

      {/* Ambient divider: the partner relationship */}
      <Section>
        <Reveal>
          <AmbientBand
            image="/images/ambient/partner-collaboration.jpg"
            alt="A modern boardroom set for a channel partner meeting"
            eyebrow="The partner relationship"
            title="From partner conviction to your next move."
          >
            The belief behind the badge, read across your channel and turned into a decision.
          </AmbientBand>
        </Reveal>
      </Section>

      {/* What it informs */}
      <Section>
        <SectionHead
          eyebrow="From signal to decision"
          title="What it informs."
          intro="The read is only useful if it changes what you do next. Each measure routes straight into the channel decisions that move revenue."
        />
        <InformsList />
      </Section>

      {/* PartnerPulse in action: the conviction map */}
      <Section tint>
        <SectionHead
          center
          eyebrow="PartnerPulse in action"
          title="A look at the PartnerPulse read."
          intro="Every partner org, plotted by how strongly they believe in you against how often they actually recommend you. The gap to close sits top-left: conviction without recommendation."
        />
        <div className="mx-auto mt-12 max-w-4xl">
          <ConvictionMap />
        </div>
      </Section>

      {/* From score to decision: proof of the shift PartnerPulse creates */}
      <Section tint>
        <SectionHead
          center
          eyebrow="From score to decision"
          title="A number becomes a move."
          intro="A benchmarked read is only worth the decision it changes. Here is the shift: from a score with nowhere to go, to a channel decision with the next move attached."
        />
        <div className="mt-12">
          <ScoreVsDecision />
        </div>
      </Section>

      {/* Get the brief */}
      <Section>
        <GetTheBrief brief={BRIEFS.partnerpulse} />
      </Section>

      <FAQSection items={FAQS} />

      <CTABand />
    </>
  );
}
