import { createFileRoute } from "@tanstack/react-router";
import { CTABand, Card, NPSGauge, PageHero, Section, SectionHead } from "@/components/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/solutions/partnerpulse")({
  head: () => ({
    meta: [
      { title: "PartnerPulse | VistaXM" },
      {
        name: "description",
        content:
          "A neutral, benchmarked read on partner conviction and delivery: how your partners actually perform, and whether they are convinced enough to recommend you when it counts.",
      },
      { property: "og:title", content: "PartnerPulse | VistaXM" },
      {
        property: "og:description",
        content:
          "See your channel the way your customers do. PartnerPulse measures partner conviction, active recommendation, and where alternatives are gaining traction.",
      },
    ],
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
        primary={{ label: "Book a 30-minute call", to: "/book-a-call" }}
      />

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

      {/* Two tracks */}
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

      {/* What it informs */}
      <Section>
        <SectionHead
          eyebrow="From signal to decision"
          title="What it informs."
          intro="The read is only useful if it changes what you do next. Each measure routes straight into the channel decisions that move revenue."
        />
        <InformsList />
      </Section>

      <CTABand />
    </>
  );
}
