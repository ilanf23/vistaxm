import { type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BOOK_A_CALL_URL } from "@/lib/links";
import { CTABand, Card, PageHero, Reveal, Section, SectionHead } from "@/components/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights and Resources | VistaXM" },
      {
        name: "description",
        content:
          "The public point of view on Revenue Channel Intelligence: long-form articles, the flagship report, briefs, and sample deliverables. Ungated, optimized for search and AI answers.",
      },
      { property: "og:title", content: "Insights and Resources | VistaXM" },
      {
        property: "og:description",
        content:
          "Our thinking is public. Read it, use it, bring questions, not budget. Articles, reports, and resources on Revenue Channel Intelligence.",
      },
    ],
  }),
  component: Insights,
});

/* ---------------- Local primitives (not exported from site.tsx) ---------------- */

/** Lightweight link/button mirroring the site CTAButton API. */
function LinkButton({
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

/** Small inline arrow used in CTAs and links. */
function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Small planned/status tag for upcoming content. */
function StatusTag({ children }: { children: ReactNode }) {
  return (
    <span className="pill-light">
      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" />
      {children}
    </span>
  );
}

/* ---------------- Featured report ---------------- */

function FeaturedReport() {
  return (
    <FadeIn>
      <article className="group relative overflow-hidden rounded-3xl hairline bg-[color:var(--navy-deep)] text-white grain card-lift">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            animation: "aurora-drift 24s ease-in-out infinite",
            backgroundImage:
              "radial-gradient(640px 320px at 88% 4%, rgba(49,133,252,0.26), transparent 64%), radial-gradient(480px 300px at 4% 96%, rgba(0,86,167,0.32), transparent 66%), radial-gradient(320px 200px at 72% 92%, rgba(246,130,65,0.14), transparent 70%)",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--orange-pop)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
        />
        <div className="relative z-10 grid gap-10 p-8 md:p-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-14">
          <div>
            <div className="eyebrow mb-4 !text-[color:var(--blue-light)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" />
              Featured report
            </div>
            <h3
              className="!text-white !text-3xl md:!text-4xl !leading-[1.08]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              State of Revenue Intelligence for the Channel.
            </h3>
            <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-white/78">
              Our flagship report on where revenue is won and lost in the indirect channel, and what
              the leaders do differently. From the CRN program.
            </p>
            <div className="mt-8">
              <LinkButton to="/crn" className="btn-primary inline-flex items-center gap-2">
                Read the report
                <ArrowIcon />
              </LinkButton>
            </div>
          </div>

          {/* Decorative report "cover" */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-sm rounded-2xl glass p-7 lg:ml-auto">
              <div className="eyebrow mb-5 !text-[color:var(--blue-light)]">CRN program</div>
              <div className="space-y-3">
                <div className="h-2.5 w-3/4 rounded-full bg-white/22" />
                <div className="h-2.5 w-full rounded-full bg-white/12" />
                <div className="h-2.5 w-2/3 rounded-full bg-white/12" />
              </div>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--hairline-dark)] bg-white/5 p-4">
                  <div
                    className="text-2xl font-semibold tabular-nums text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    5x4
                  </div>
                  <div className="mt-1 text-xs leading-snug text-white/60">
                    Journey stages by persona
                  </div>
                </div>
                <div className="rounded-xl border border-[var(--hairline-dark)] bg-white/5 p-4">
                  <div
                    className="text-2xl font-semibold tabular-nums text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Neutral
                  </div>
                  <div className="mt-1 text-xs leading-snug text-white/60">Third-party signal</div>
                </div>
              </div>
              <div className="mt-5 h-2 w-1/2 rounded-full bg-[color:var(--orange-pop)]/55" />
            </div>
          </div>
        </div>
      </article>
    </FadeIn>
  );
}

/* ---------------- Resource item ---------------- */

function ResourceCard({
  title,
  children,
  tag,
  delay = 0,
}: {
  title: string;
  children: ReactNode;
  tag?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group relative h-full overflow-hidden rounded-2xl hairline bg-white p-7 card-lift md:p-8">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
        />
        <div className="flex items-start justify-between gap-4">
          <h3 className="!text-xl">{title}</h3>
          {tag && <StatusTag>{tag}</StatusTag>}
        </div>
        <p className="mt-3 leading-relaxed text-[color:var(--ink-soft)]">{children}</p>
      </div>
    </Reveal>
  );
}

/* ---------------- Page ---------------- */

const ARTICLE_THEMES: { theme: string; blurb: string }[] = [
  {
    theme: "Channel revenue",
    blurb:
      "Why indirect revenue behaves differently, and how to read the signals a partner sits between you and.",
  },
  {
    theme: "The partner shadow",
    blurb:
      "The part of the journey vendors never see, and what it quietly costs in retention and expansion.",
  },
  {
    theme: "The Decision Maker to Influencer gap",
    blurb:
      "When the executive is happy and the daily users are not. The most reliable early warning of churn.",
  },
  {
    theme: "Why experience is revenue",
    blurb:
      "Experience is the method, revenue is the point. Tying every signal to retention, expansion, and churn.",
  },
];

function Insights() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="The point of view on Revenue Channel Intelligence."
        subtitle="Our thinking is public. Read it, use it, bring questions, not budget."
        primary={{ label: "Book a 30-minute call", to: BOOK_A_CALL_URL }}
      />

      {/* Featured report */}
      <Section>
        <FeaturedReport />
      </Section>

      {/* Articles */}
      <Section tint>
        <SectionHead
          eyebrow="Articles"
          title="Long-form and short-form, optimized for search and AI answers."
        />
        <Stagger className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2" stagger={0.08}>
          {ARTICLE_THEMES.map((a) => (
            <StaggerItem key={a.theme}>
              <Card title={a.theme} kicker="Theme">
                {a.blurb}
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={120}>
          <p className="mt-8 text-sm italic text-[color:var(--ink-soft)]">
            Selected articles migrated from the current site; new pieces added on a regular cadence.
          </p>
        </Reveal>
      </Section>

      {/* Resources and artifacts */}
      <Section>
        <SectionHead eyebrow="Resources" title="Downloads, briefs, and sample deliverables." />
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
          <ResourceCard title="Sample deliverables" delay={0}>
            See a readout before you commit. Sample deliverables, clearly labeled as samples, are
            available on request.
          </ResourceCard>
          <ResourceCard title="Platform demo" tag="Video coming soon" delay={120}>
            A 2 to 4 minute walkthrough.
          </ResourceCard>
        </div>
      </Section>

      {/* Podcast */}
      <Section tint>
        <div className="flex flex-col gap-4">
          <Reveal>
            <StatusTag>Planned</StatusTag>
          </Reveal>
          <SectionHead eyebrow="Podcast" title="The Revenue Channel Intelligence conversation." />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
