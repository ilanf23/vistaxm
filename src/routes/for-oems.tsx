import { createFileRoute, Link } from "@tanstack/react-router";
import { canonicalLink } from "@/lib/seo";
import {
  CTABand,
  InfluencerGapCard,
  PageHero,
  PartnerShadow,
  Reveal,
  Section,
  SectionHead,
  Stat,
} from "@/components/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/for-oems")({
  head: () => ({
    meta: [
      { title: "Partner Experience Management for OEMs | VistaXM" },
      {
        name: "description",
        content:
          "See how your partners deliver customer experience before it shows up in revenue. Neutral, benchmarked partner-experience measurement for OEMs and distributors.",
      },
      { property: "og:title", content: "Partner Experience Management for OEMs | VistaXM" },
      {
        property: "og:description",
        content:
          "You can see how your partners sell. You cannot see how they serve. VistaXM gives OEMs and distributors a neutral read on the whole channel.",
      },
    ],
    links: [canonicalLink("/for-oems")],
  }),
  component: ForOems,
});

/* ---------------- Local: check glyph for list rows ---------------- */

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
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
    </svg>
  );
}

/* ---------------- Local: "what you see" list (neutral read) ---------------- */

const NEUTRAL_READ: { title: string; note: string; why: string }[] = [
  {
    title: "Partner conviction by organization",
    note: "How strongly each partner believes in you, not just whether they are certified.",
    why: "Replaces uniform partner management with conviction-weighted investment, so every dollar of enablement, MDF, and field time goes where it produces the highest return.",
  },
  {
    title: "Active recommendation rate",
    note: "How often partners actually put you forward in a competitive moment.",
    why: "Surfaces the revenue you are losing before it is ever registered as a loss. A partner with strong deal registration but a low recommendation rate is generating visible revenue while causing invisible losses.",
  },
  {
    title: "The conviction gap by partner",
    note: "The distance between what leadership commits to and what the front line recommends.",
    why: "Directs field investment to the right level of the partner organization. A high-gap partner needs a different intervention than a uniformly low-conviction one.",
  },
  {
    title: "Where alternatives are gaining traction",
    note: "Which competitors are winning ground, and at which stage of the deal.",
    why: "Turns competitive intelligence from anecdotal to systematic, exactly which competitors are gaining traction, at what stage, and in which product categories.",
  },
  {
    title: "Investment confidence by program dimension",
    note: "Where partners trust your program to keep investing, and where confidence is thinning.",
    why: "Converts program design from opinion-driven to data-driven. The dimension with the lowest confidence score gets attention first, with evidence from the full partner base, not the loudest advisory-council voice.",
  },
];

function NeutralReadList() {
  return (
    <div className="mt-12">
      <Stagger className="grid gap-4 md:grid-cols-2" stagger={0.08}>
        {NEUTRAL_READ.map((item) => (
          <StaggerItem key={item.title}>
            <Link
              to="/solutions/partnerpulse"
              className="group flex h-full items-start gap-4 rounded-2xl hairline bg-white p-6 card-lift transition-colors hover:border-[color:var(--blue-cta)]"
            >
              <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
                <CheckGlyph className="h-5 w-5" />
              </span>
              <div>
                <div className="text-base font-semibold text-[color:var(--navy-deep)] group-hover:text-[color:var(--blue-link)]">
                  {item.title}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                  {item.note}
                </p>
                <div className="mt-3 border-t border-[color:var(--hairline)] pt-3">
                  <div className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[color:var(--blue-link)]">
                    Why it matters
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--ink)]">
                    {item.why}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-[color:var(--blue-link)]">
                  See PartnerPulse
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal delay={120} className="mt-6">
        <div className="flex items-center gap-3 rounded-2xl bg-[color:var(--navy-deep)] px-6 py-5 text-white">
          <span
            className="h-2 w-2 flex-none rounded-full bg-[color:var(--orange-pop)]"
            aria-hidden
          />
          <p className="text-sm font-semibold md:text-[0.95rem]">
            All benchmarked across your ecosystem.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------- Local: partner conviction sample readout ---------------- */

function ConvictionReadout() {
  return (
    <div className="mx-auto max-w-md rounded-2xl hairline bg-[color:var(--blue-tint)] p-5 md:p-[22px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-[7px] hairline bg-white text-[color:var(--blue-link)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[13px] w-[13px]" aria-hidden>
              <path d="M4 5h16v14H4z" />
              <path d="M4 9h16" />
            </svg>
          </span>
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-[color:var(--ink-soft)] opacity-70">
            Partner conviction readout
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(246,130,65,0.16)] px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-[#b64a13]">
          <span className="h-1 w-1 rounded-full bg-[color:var(--orange-pop)]" aria-hidden />
          Sample, not a real client
        </span>
      </div>

      {/* Partner name */}
      <div className="mt-4 text-[17px] font-bold leading-snug text-[color:var(--navy-deep)]">
        Northgate Integration
      </div>
      <div className="text-[12.5px] text-[color:var(--ink-soft)]">
        Tier 1 partner, North America
      </div>

      {/* Three metrics */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { value: "58", label: "Conviction score", sig: "var(--orange-pop)" },
          { value: "41%", label: "Active recommendation", sig: "var(--navy-deep)" },
          { value: "22 pts", label: "Conviction gap", sig: "var(--orange-pop)" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl bg-white p-3 hairline">
            <div
              className="text-[1.5rem] font-bold leading-none tracking-tight tabular-nums"
              style={{ fontFamily: "var(--font-display)", color: m.sig }}
            >
              {m.value}
            </div>
            <div className="mt-1.5 text-[10.5px] leading-tight text-[color:var(--ink-soft)]">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Conviction bar */}
      <div className="mt-5 flex flex-col gap-2">
        <div className="flex items-baseline justify-between">
          <span className="text-[12.5px] text-[color:var(--ink-soft)]">Conviction vs. benchmark</span>
          <span className="text-[12.5px] font-bold tabular-nums text-[color:var(--navy-deep)]">
            58 / 74 avg
          </span>
        </div>
        <div className="h-[5px] overflow-hidden rounded-full bg-[rgba(2,37,80,0.08)]">
          <span
            className="block h-full rounded-full"
            style={{ width: "58%", background: "var(--orange-pop)" }}
          />
        </div>
      </div>

      {/* Recommended move */}
      <div className="mt-5 flex flex-col gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[color:var(--ink-soft)] opacity-60">
          Recommended move
        </span>
        <div className="flex items-center gap-2.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[17px] w-[17px] shrink-0 text-[color:var(--orange-pop)]"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="text-[15px] font-bold text-[color:var(--navy-deep)]">
            Deploy SA-level enablement at the selling floor.
          </span>
        </div>
      </div>

      {/* Footer tag */}
      <div className="mt-5 flex items-center gap-1.5 border-t border-[color:var(--gray-line)] pt-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[color:var(--ink-soft)] opacity-55">
        <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
        Sample, not a real client
      </div>
    </div>
  );
}

/* ---------------- Local: light-touch pilot steps ---------------- */

const PILOT_STEPS: { n: string; title: string; desc: string }[] = [
  {
    n: "01",
    title: "You provide a partner contact list",
    desc: "One input. That is the whole ask of your team.",
  },
  {
    n: "02",
    title: "We design, field, and analyze",
    desc: "No survey to write, no outreach to manage, no internal project team to stand up.",
  },
  {
    n: "03",
    title: "We present an executive readout",
    desc: "A baseline across 60 to 80 partners, delivered and walked through at day ninety.",
  },
];

function PilotSteps() {
  return (
    <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
      {PILOT_STEPS.map((step) => (
        <StaggerItem key={step.n} className="h-full">
          <div className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-7 card-lift">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
            />
            <div
              className="text-sm font-semibold tabular-nums text-[color:var(--blue-link)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {step.n}
            </div>
            <h3 className="mt-3 !text-lg">{step.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--ink-soft)]">
              {step.desc}
            </p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* ---------------- Local: sell vs. serve hero visual ----------------
   Two columns per partner: sell-through you already track, and the serve
   side you cannot see until VistaXM reads it. The right column resolves
   from unknown to a benchmarked score on reveal. */

const SELL_SERVE_ROWS = [
  { name: "Apex Data Systems", sell: 92, serve: 71, risk: false },
  { name: "Northgate Integration", sell: 84, serve: 24, risk: true },
  { name: "Cobalt Networks", sell: 63, serve: 66, risk: false },
];

function SellServeCard() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="glass relative overflow-hidden p-6 md:p-7">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--orange-pop)]"
      />

      {/* Column headers */}
      <div className="grid grid-cols-[1.2fr_1fr_1fr] items-end gap-3">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#7fa3cf]">
          Partner
        </span>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#67a6ff]">
          How they sell
        </span>
        <span className="text-right text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--orange-pop)]">
          How they serve
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {SELL_SERVE_ROWS.map((row, i) => (
          <div
            key={row.name}
            className="grid grid-cols-[1.2fr_1fr_1fr] items-center gap-3 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0"
          >
            <span className="truncate text-[0.85rem] font-medium text-white">{row.name}</span>

            {/* Sell-through: the bar you already have */}
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[color:var(--blue-cta)] to-[#67a6ff]"
                  style={{
                    width: shown ? `${row.sell}%` : "0%",
                    transition: `width 900ms cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
                  }}
                />
              </div>
              <span className="w-7 text-right text-[0.8rem] font-semibold tabular-nums text-[#bcd6f5]">
                {row.sell}
              </span>
            </div>

            {/* Serve: unknown until the read comes in */}
            <div className="flex items-center justify-end">
              <span className="relative inline-flex h-7 min-w-[54px] items-center justify-center overflow-hidden rounded-full">
                <span
                  className="absolute inset-0 rounded-full border border-dashed border-white/25 text-center"
                  style={{
                    opacity: shown ? 0 : 1,
                    transition: `opacity 500ms ease ${500 + i * 160}ms`,
                  }}
                />
                <span
                  className="absolute inset-0 flex items-center justify-center text-[0.85rem] font-semibold text-white/35"
                  style={{
                    opacity: shown ? 0 : 1,
                    transition: `opacity 500ms ease ${500 + i * 160}ms`,
                  }}
                >
                  ?
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.8rem] font-semibold tabular-nums ${
                    row.risk
                      ? "bg-[rgba(246,130,65,0.16)] text-[#ffd2b5]"
                      : "bg-[rgba(103,166,255,0.14)] text-[#cfe3ff]"
                  }`}
                  style={{
                    opacity: shown ? 1 : 0,
                    transform: shown ? "scale(1)" : "scale(0.85)",
                    transition: `opacity 500ms ease ${560 + i * 160}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${560 + i * 160}ms`,
                  }}
                >
                  {row.risk && (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]"
                      aria-hidden
                    />
                  )}
                  {row.serve}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <p className="text-[0.8rem] leading-snug text-[#9fc0e8]">
          VistaXM fills in the column your dashboards cannot.
        </p>
        <span className="flex items-center gap-1.5 whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#7fa3cf]">
          <span className="h-1 w-1 rounded-full bg-[#7fa3cf]" aria-hidden />
          Illustrative
        </span>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */

function ForOems() {
  return (
    <>
      {/* 1. Hero */}
      <PageHero
        eyebrow="For OEMs and distributors"
        title={
          <>
            You can see how your partners sell.
            <br className="hidden md:block" /> You cannot see how they serve.
          </>
        }
        subtitle="Your brand is on the box, but the end-customer experience lives with the partner. VistaXM gives you a neutral, benchmarked view of how your channel is really performing, before it shows up in revenue."
        trust="Already live with a major OEM."
        visual={<SellServeCard />}
      />

      {/* 2. The partner shadow */}
      <Section tint className="overflow-hidden">
        <PartnerShadow />
      </Section>

      {/* 3. The conviction gap */}
      <Section dark>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <SectionHead
            dark
            eyebrow="The conviction gap"
            title="Certified is not the same as convinced."
            intro="Your partners are enrolled, certified, and tier-qualified. That tells you they can sell you. It does not tell you whether they will, in a competitive moment. The conviction gap, the distance between what a practice leader commits to and what the front line actually recommends, is where revenue is won or lost."
          />
          <Reveal delay={120}>
            <InfluencerGapCard />
          </Reveal>
        </div>
      </Section>

      {/* 4. A neutral read on your whole channel */}
      <Section>
        <SectionHead
          eyebrow="What you finally see"
          title="A neutral read on your whole channel."
          intro="One benchmarked view of how the channel really feels about selling you, drawn from the partners who decide whether you make the shortlist."
        />
        <NeutralReadList />
      </Section>

      {/* 4b. See a sample deliverable */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHead
            eyebrow="See a sample deliverable"
            title="A partner conviction readout, at a glance."
            intro="This is the format you receive: a named partner, the conviction and recommendation scores that matter, the gap that predicts the next move, and the intervention that closes it. Illustrative only, not a real client."
          />
          <Reveal delay={120}>
            <ConvictionReadout />
          </Reveal>
        </div>
      </Section>


      {/* 5. Why a neutral third party */}
      <Section tint>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <SectionHead
            eyebrow="Why a neutral third party"
            title="Why your partners will tell us what they will not tell you."
            intro="Partners hear your surveys as performance reviews. They tell a confidential neutral third party what they will never put in writing to you. Independence is structural, and it is not something the program being evaluated can replicate."
          />
          <Reveal delay={120}>
            <div className="img-editorial-soft img-frame aspect-[4/3] w-full">
              <img
                src="/images/ambient/partner-conversation.jpg"
                alt="Two partners in a candid, confidential conversation"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 6. The light-touch pilot */}
      <Section>
        <SectionHead
          eyebrow="The light-touch pilot"
          title="One input from you. An executive readout in 90 days."
          intro="You provide a partner contact list. We design, field, analyze, and present. No survey to write, no outreach to manage, no internal project team. A baseline across 60 to 80 partners, with an executive readout at day ninety."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <Stat
            value="1 input"
            label="A partner contact list is the only thing you provide."
            delay={0}
          />
          <Stat
            value="60 to 80"
            label="Partners covered in the baseline across your ecosystem."
            delay={120}
          />
          <Stat
            value="90 days"
            label="From kickoff to a presented executive readout."
            delay={240}
          />
        </div>
        <PilotSteps />
      </Section>

      {/* 7. Proof quote */}
      <Section dark>
        <FadeIn>
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote
              className="text-2xl font-semibold leading-snug !text-white md:text-[2rem] md:leading-[1.25]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              &ldquo;They bring an agnostic viewpoint into the data, and having that unbiased filter
              is critical to our mission.&rdquo;
            </blockquote>
            <figcaption className="mt-7 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--blue-light)]">
              Deanna Davenport, VP of Customer Experience, ePlus
              <span className="ml-2 font-normal normal-case tracking-normal text-white/55">
                (CRN, April 2026)
              </span>
            </figcaption>
          </figure>
        </FadeIn>
      </Section>

      {/* 8. CTA */}
      <CTABand />
    </>
  );
}
