import { type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BOOK_A_CALL_URL, handleBookingClick } from "@/lib/links";
import { CTABand, Section, SectionHead, PageHero } from "@/components/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

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
   define one small tick here and reuse it across both lists below. */
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

/* Local item used inside the "What you get" list on the Essentials card. */
function GetItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-cta)]">
        <Check className="h-3.5 w-3.5" />
      </span>
      <span className="text-[15px] leading-relaxed text-[color:var(--ink-soft)]">{children}</span>
    </li>
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
        primary={{ label: "Book a 30-minute call", to: BOOK_A_CALL_URL }}
      />

      {/* The two entry paths */}
      <Section>
        <SectionHead
          eyebrow="Two ways in"
          title="Pick the entry that fits where you are."
          intro="Both paths are fully managed by us. Start with a fixed first wave, or step straight into the ongoing program. Either way, you act on the signal, not the setup."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* Essentials */}
          <FadeIn className="h-full">
            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl hairline bg-white p-8 md:p-9 card-lift">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="pill-light w-fit">Start here</span>
              <h3 className="mt-4 !text-2xl">Essentials.</h3>
              <p className="mt-3 leading-relaxed text-[color:var(--ink-soft)]">
                A fixed, fast first wave. We stand up your program, deliver your certified NPS and
                your first account-level revenue signals, and hand you a prioritized list of moves.
                Sized to a director-level budget.
              </p>

              <div className="mt-7 rounded-xl bg-[color:var(--blue-tint)] p-6">
                <div className="eyebrow mb-4">What you get</div>
                <ul className="space-y-3">
                  <GetItem>Certified NPS</GetItem>
                  <GetItem>Benchmarked indexes (when available)</GetItem>
                  <GetItem>The Decision Maker to Influencer gap</GetItem>
                  <GetItem>A named at-risk and expansion account list</GetItem>
                  <GetItem>First insight in about 90 days</GetItem>
                </ul>
              </div>

              <div className="mt-auto pt-7">
                <a
                  href={BOOK_A_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleBookingClick}
                  className="btn-primary"
                >
                  Start with Essentials
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Fully Managed Program */}
          <FadeIn delay={120} className="h-full">
            <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-[color:var(--navy-deep)] p-8 text-white grain card-lift md:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-80"
                style={{
                  backgroundImage:
                    "radial-gradient(520px 280px at 88% 6%, rgba(49,133,252,0.22), transparent 66%), radial-gradient(420px 260px at 8% 96%, rgba(0,86,167,0.30), transparent 68%)",
                }}
              />
              <div className="relative flex h-full flex-col">
                <span className="pill w-fit !text-[color:var(--blue-light)]">
                  Scale when it works
                </span>
                <h3 className="mt-4 !text-2xl !text-white">The Fully Managed Program.</h3>
                <p className="mt-3 leading-relaxed text-white/75">
                  The ongoing program that keeps finding and protecting revenue, wave after wave.
                  Choose the scope that fits your book. Continuous signal, benchmark tracking, and
                  quarterly reviews, all run by us.
                </p>

                <Stagger className="mt-7 grid gap-3" stagger={0.12}>
                  {TIERS.map((tier) => (
                    <StaggerItem key={tier.size}>
                      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07]">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">{tier.size}</span>
                          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-light)]">
                            {tier.headline}
                          </span>
                        </div>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">
                          {tier.desc}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>

                <div className="mt-auto pt-7">
                  <a
                    href={BOOK_A_CALL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleBookingClick}
                    className="btn-primary"
                  >
                    Scope the program
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* What lands on your desk */}
      <Section tint>
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
      </Section>

      {/* Why managed */}
      <Section>
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
      </Section>

      <CTABand />
    </>
  );
}
