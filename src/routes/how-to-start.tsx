import { createFileRoute } from "@tanstack/react-router";
import { BOOK_PATH } from "@/lib/links";
import { canonicalLink, faqJsonLd, type Faq } from "@/lib/seo";
import { CTABand, FAQSection, Section, SectionHead, PageHero } from "@/components/site";
import { FadeIn, Parallax } from "@/components/motion";
import {
  BriefDoc,
  JourneyRail,
  NinetyDayPlan,
  ProgramArcChart,
  RailNode,
  TierSteps,
} from "@/components/journey";

const FAQS: Faq[] = [
  {
    question: "How long until we see results, and do we need a CX team?",
    answer:
      "First insight typically comes in about 90 days, and you do not need to build a CX team. VistaXM designs, runs, and analyzes the program for you as a fully managed service.",
  },
];

export const Route = createFileRoute("/how-to-start")({
  head: () => ({
    meta: [
      { title: "How to Start | Managed Revenue Channel Intelligence | VistaXM" },
      {
        name: "description",
        content:
          "Start with Essentials or a fully managed program. NPS and voice-of-the-customer measurement, run for you, first insight in about 90 days. No CX team required.",
      },
      {
        property: "og:title",
        content: "How to Start | Managed Revenue Channel Intelligence | VistaXM",
      },
      {
        property: "og:description",
        content:
          "Start small. Scale when ready. Prove the signal exists and that it changes a decision, then expand into the ongoing program.",
      },
    ],
    links: [canonicalLink("/how-to-start")],
    scripts: [faqJsonLd(FAQS)],
  }),
  component: HowToStart,
});

/* Local check glyph for the compact "What you get" list. */
function Check({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12.5l4 4 10-10" />
    </svg>
  );
}

const TIERS = [
  {
    size: "Standard",
    headline: "A focused book.",
    desc: "Continuous signal across a defined set of priority accounts, with the core benchmark and quarterly review.",
  },
  {
    size: "Advanced",
    headline: "A growing portfolio.",
    desc: "Wider coverage across segments and personas, deeper benchmark tracking, and a faster cadence of waves.",
  },
  {
    size: "Strategic",
    headline: "The full channel.",
    desc: "Program-wide measurement across the channel, peer-group benchmarking, and executive reporting end to end.",
  },
];

const ESSENTIALS_GETS = [
  "Certified NPS",
  "Benchmarked indexes (when available)",
  "The Decision Maker to Influencer gap",
  "A named at-risk and expansion account list",
  "First insight in about 90 days",
];

const DELIVERABLE_ROWS = [
  {
    text: "Named accounts and the dollars at stake",
    note: "Your call list, ranked by revenue at risk.",
  },
  {
    text: "The reason behind each one",
    note: "The driver behind the score, not just a number.",
  },
  {
    text: "The recommended move and the window to act",
    note: "What to do, and by when.",
  },
  {
    text: "Benchmarks against your peer group",
    note: "Where you stand against the channel.",
  },
  {
    text: "The certified NPS you can put in proposals and RFPs",
    note: "The number you can publish in front of buyers.",
  },
];

const SECTION_Y = "!py-14 md:!py-24";

function HowToStart() {
  return (
    <>
      <PageHero
        eyebrow="How to start"
        title="Start small. Scale when it works."
        subtitle="Two ways in, both fully managed. Prove the signal exists and that it changes a decision, then expand into the ongoing program."
        primary={{ label: "Book a 30-minute call", to: BOOK_PATH }}
        visual={<ProgramArcChart />}
      />

      <JourneyRail>
        {/* The two entry paths: Essentials first, then the program */}
        <Section className={SECTION_Y}>
          <div className="relative xl:pl-14">
            <RailNode step={1} />
            <SectionHead
              eyebrow="Two ways in"
              title="Pick the entry that fits where you are."
              intro={
                <>
                  Both paths are fully managed by us. Start with a fixed first wave, or step
                  straight into the ongoing program. Either way,{" "}
                  <span className="font-semibold text-[color:var(--navy-deep)]">
                    you act on the signal, not the setup.
                  </span>
                </>
              }
            />

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
              <FadeIn>
                <span className="pill-light w-fit">Start here</span>
                <h3 className="mt-4 !text-2xl">Essentials.</h3>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-[color:var(--ink-soft)]">
                  A fixed, fast first wave. We stand up your program, deliver your certified NPS and
                  your first account-level revenue signals, and hand you a prioritized list of
                  moves. Sized to a director-level budget.
                </p>
                <div className="mt-6">
                  <div className="eyebrow mb-3">What you get</div>
                  <ul className="space-y-2">
                    {ESSENTIALS_GETS.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-[3px] flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-cta)]">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="text-[14.5px] leading-relaxed text-[color:var(--ink-soft)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-7">
                  <a href={BOOK_PATH} className="btn-primary">
                    Start with Essentials
                  </a>
                </div>
              </FadeIn>
              <FadeIn delay={120}>
                <NinetyDayPlan />
              </FadeIn>
            </div>
          </div>
        </Section>

        {/* Scale beat: the program on dark */}
        <Section dark className={SECTION_Y}>
          <div className="relative xl:pl-14">
            <RailNode
              step={2}
              className="border-[color:var(--blue-light)]/60 bg-[color:var(--navy-deep)] !text-[color:var(--blue-light)]"
            />
            <FadeIn>
              <span className="pill w-fit !text-[color:var(--blue-light)]">
                Scale when it works
              </span>
            </FadeIn>
            <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
              <FadeIn delay={80}>
                <h3 className="!text-2xl !text-white">The Fully Managed Program.</h3>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-white/75">
                  The ongoing program that keeps finding and protecting revenue, wave after wave.{" "}
                  <span className="font-semibold text-white">
                    Choose the scope that fits your book.
                  </span>{" "}
                  Continuous signal, benchmark tracking, and quarterly reviews, all run by us.
                </p>
                <div className="mt-7">
                  <a href={BOOK_PATH} className="btn-primary">
                    Scope the program
                  </a>
                </div>
              </FadeIn>
              <TierSteps tiers={TIERS} />
            </div>
          </div>
        </Section>

        {/* What lands on your desk */}
        <Section tint className={SECTION_Y}>
          <div className="relative xl:pl-14">
            <RailNode step={3} />
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
              <SectionHead
                eyebrow="The deliverable"
                title="What lands on your desk."
                intro={
                  <>
                    Not a dashboard to interpret.{" "}
                    <span className="font-semibold text-[color:var(--navy-deep)]">
                      A short, ranked brief
                    </span>{" "}
                    you can act on the day it arrives.
                  </>
                }
              />
              <BriefDoc
                items={DELIVERABLE_ROWS}
                footer="A sample deliverable is available upon request."
              />
            </div>
          </div>
        </Section>

        {/* Why managed */}
        <Section className={SECTION_Y}>
          <div className="relative xl:pl-14">
            <RailNode step={4} />
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <SectionHead
                  eyebrow="Why managed"
                  title="Managed, neutral, light lift."
                  intro="We bring the playbooks, the data scientists, and the technology. Your team stays focused on the customer. Better, faster, and lighter than building it yourself."
                />
                <FadeIn delay={100}>
                  <div className="mt-7 flex flex-wrap gap-2.5">
                    {["The playbooks", "The data scientists", "The technology"].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-[color:var(--hairline)] bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[color:var(--navy-deep)] shadow-[var(--shadow-elevation-1)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              </div>
              <Parallax distance={28}>
                <FadeIn delay={120}>
                  <div className="img-editorial-soft img-frame aspect-[4/3] w-full">
                    <img
                      src="/images/ambient/operator-charts.jpg"
                      alt="An analyst working through charts at a workstation"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </FadeIn>
              </Parallax>
            </div>
          </div>
        </Section>
      </JourneyRail>

      <FAQSection items={FAQS} />

      <CTABand />
    </>
  );
}
