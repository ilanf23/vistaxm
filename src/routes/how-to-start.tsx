import { createFileRoute } from "@tanstack/react-router";
import { BOOK_PATH } from "@/lib/links";
import { CTABand, Section, SectionHead, PageHero } from "@/components/site";
import { FadeIn } from "@/components/motion";
import {
  JourneyRail,
  RailNode,
  TierSteps,
  TimelineList,
  WaveMiniChart,
} from "@/components/journey";

export const Route = createFileRoute("/how-to-start")({
  head: () => ({
    meta: [
      { title: "How to Start | VistaXM" },
      {
        name: "description",
        content:
          "Two ways into Revenue Channel Intelligence, both fully managed. Start with Essentials, a fixed first wave, then expand into the Fully Managed Program sized Small, Medium, or Large.",
      },
      { property: "og:title", content: "How to Start | VistaXM" },
      {
        property: "og:description",
        content:
          "Start small. Scale when it works. Prove the signal exists and that it changes a decision, then expand into the ongoing program.",
      },
    ],
  }),
  component: HowToStart,
});

/* Local check glyph: internal icons in site.tsx are not exported, so we
   define one small tick here for the deliverable list below. */
function Check({ className }: { className?: string }) {
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

const DELIVERABLES = [
  "Named accounts and the dollars at stake",
  "The reason behind each one",
  "The recommended move and the window to act",
  "Benchmarks against your peer group",
  "The certified NPS you can put in proposals and RFPs",
];

function HowToStart() {
  return (
    <>
      <PageHero
        eyebrow="How to start"
        title="Start small. Scale when it works."
        subtitle="Two ways in, both fully managed. Prove the signal exists and that it changes a decision, then expand into the ongoing program."
        primary={{ label: "Book a 30-minute call", to: BOOK_PATH }}
        visual={<WaveMiniChart />}
      />

      <JourneyRail>
        {/* The two entry paths: Essentials first, then the program */}
        <Section>
          <div className="relative xl:pl-14">
            <RailNode />
            <SectionHead
              eyebrow="Two ways in"
              title="Pick the entry that fits where you are."
              intro="Both paths are fully managed by us. Start with a fixed first wave, or step straight into the ongoing program. Either way, you act on the signal, not the setup."
            />

            <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <FadeIn>
                <span className="pill-light w-fit">Start here</span>
                <h3 className="mt-4 !text-2xl">Essentials.</h3>
                <p className="mt-3 max-w-[48ch] leading-relaxed text-[color:var(--ink-soft)]">
                  A fixed, fast first wave. We stand up your program, deliver your certified NPS and
                  your first account-level revenue signals, and hand you a prioritized list of
                  moves. Sized to a director-level budget.
                </p>
                <div className="mt-8">
                  <a href={BOOK_PATH} className="btn-primary">
                    Start with Essentials
                  </a>
                </div>
              </FadeIn>
              <FadeIn delay={120}>
                <TimelineList eyebrow="What you get" items={ESSENTIALS_GETS} />
              </FadeIn>
            </div>
          </div>
        </Section>

        {/* Scale beat: the program on dark */}
        <Section dark>
          <div className="relative xl:pl-14">
            <RailNode className="border-[color:var(--blue-light)] bg-[color:var(--navy-deep)]" />
            <FadeIn>
              <span className="pill w-fit !text-[color:var(--blue-light)]">
                Scale when it works
              </span>
            </FadeIn>
            <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
              <FadeIn delay={80}>
                <h3 className="!text-2xl !text-white">The Fully Managed Program.</h3>
                <p className="mt-3 max-w-[48ch] leading-relaxed text-white/75">
                  The ongoing program that keeps finding and protecting revenue, wave after wave.
                  Choose the scope that fits your book. Continuous signal, benchmark tracking, and
                  quarterly reviews, all run by us.
                </p>
                <div className="mt-8">
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
        <Section tint>
          <div className="relative xl:pl-14">
            <RailNode />
            <SectionHead
              eyebrow="The deliverable"
              title="What lands on your desk."
              intro="Not a dashboard to interpret. A short, ranked brief you can act on the day it arrives."
            />

            <FadeIn delay={120} className="mt-12">
              <div className="rounded-2xl hairline bg-white p-7 md:p-10 shadow-[var(--shadow-elevation-2)]">
                <ul className="grid gap-x-10 gap-y-5 md:grid-cols-2">
                  {DELIVERABLES.map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-cta)]">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-[15px] font-medium leading-relaxed text-[color:var(--navy-deep)]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-[color:var(--hairline)] pt-6 text-sm italic text-[color:var(--ink-soft)]">
                  A sample deliverable, clearly labeled as a sample, is available on request.
                </p>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* Why managed */}
        <Section>
          <div className="relative xl:pl-14">
            <RailNode />
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <SectionHead
                eyebrow="Why managed"
                title="Managed, neutral, light lift."
                intro="We bring the playbooks, the data scientists, and the technology. Your team stays focused on the customer. Better, faster, and lighter than building it yourself."
              />
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
            </div>
          </div>
        </Section>
      </JourneyRail>

      <CTABand />
    </>
  );
}
