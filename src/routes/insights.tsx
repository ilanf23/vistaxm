import { type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BOOK_A_CALL_URL } from "@/lib/links";
import { CTABand, PageHero, Reveal, Section, SectionHead } from "@/components/site";
import { AmbientBand } from "@/components/media";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights and Resources: Customer Experience Management | VistaXM" },
      {
        name: "description",
        content:
          "The public point of view on Revenue Channel Intelligence: articles, press, and whitepapers on customer experience management, customer retention, and the voice of the customer across the channel. Ungated, optimized for search and AI answers.",
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

/** Lightweight link/button mirroring the site CTAButton API. External
 *  (http) links open in a new tab, matching CTAButton's behavior. */
function LinkButton({
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

/** Download/read icon for resource cards. */
function DownloadIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
    </svg>
  );
}

/** Play icon for the video gallery. */
function PlayIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

/* ---------------- Content config (single source of truth per section) ----------------
   Every array below drives one section so new items are trivial to add. All
   external links open in a new tab; any not-yet-available item sets
   `comingSoon` and renders as a non-linking placeholder with a status tag. */

type LinkItem = {
  title: string;
  type: string;
  href: string;
  comingSoon?: boolean;
  summary?: string;
  source?: string;
  date?: string;
};

// a) Newsroom / Press
// Branded summary-and-link index: each item is on-brand summary copy written for
// us plus an outbound link to the canonical source. We do not reproduce any
// third-party article or press-release body text. Ordered newest first.
const NEWSROOM: LinkItem[] = [
  {
    type: "In the news",
    title: "VistaXM Is Powering a Customer Experience Partner Revolution",
    summary:
      "CRN covers how VistaXM is bringing Revenue Channel Intelligence to the IT channel: turning partner-delivered customer experience into an account-level signal of where revenue is headed.",
    source: "CRN",
    date: "2026",
    href: "https://www.crn.com/news/software/2026/vistaxm-is-powering-a-customer-experience-partner-revolution",
  },
  {
    type: "Interview",
    title: "Erik Vogel on Turning Customer Experience Into Revenue Growth",
    summary:
      "VistaXM founder and CEO Erik Vogel on why a score is not a decision, and how channel experience becomes the intelligence that drives revenue decisions.",
    source: "CXCurrent",
    date: "2026",
    href: "https://www.cxcurrent.com/news/erik-vogel-vistaxm-cx-revenue-growth-strategy",
  },
  {
    type: "Article",
    title: "8 Ways Data-Driven Decisions Are Better Than Gut Feel",
    summary:
      "Why the strongest channel operators replace gut feel with structured measurement: eight ways data-driven decisions beat intuition when revenue is on the line.",
    source: "CustomerThink",
    date: "2026",
    href: "https://customerthink.com/8-ways-data-driven-decisions-are-better-than-gut-feel-because-you-are-not-steve-jobs/",
  },
  {
    type: "Press release",
    title: "VistaXM Launches PartnerPulse",
    summary:
      "VistaXM introduces PartnerPulse, giving OEMs and distributors a neutral, benchmarked view of partner-delivered customer experience across the full journey.",
    source: "EIN Presswire",
    date: "Dec 2025",
    href: "https://www.einpresswire.com/article/874930219/vistaxm-launches-partnerpulse-redefining-how-oems-measure-and-improve-partner-delivered-customer-experience",
  },
  {
    type: "Press release",
    title: "VistaXM Launches Broker Experience Management (BXM)",
    summary:
      "VistaXM introduces BrokerPulse and the Broker Experience Management discipline: quantifying the premium at risk in carrier-broker relationships and how to protect it.",
    source: "EIN Presswire",
    date: "Nov 2025",
    href: "https://www.einpresswire.com/article/866359864/vistaxm-launches-broker-experience-management-bxm-the-missing-link-between-broker-loyalty-and-retention",
  },
  {
    type: "Press release",
    title: "ePlus press release",
    href: "#",
    comingSoon: true,
  },
];

// c) Whitepapers & Resources
const RESOURCES: LinkItem[] = [
  {
    title: "PartnerPulse / The Future of Partner Experience",
    type: "Whitepaper",
    href: "https://www.vistaxm.com/white-paper/partnerpulse-the-future-of-partner-experience/",
  },
  {
    title: "The PartnerPulse Business Case",
    type: "Whitepaper",
    href: "https://www.vistaxm.com/white-paper/the-partnerpulse-business-case/",
  },
  {
    title: "The State of Broker Experience 2025",
    type: "Whitepaper",
    href: "https://www.vistaxm.com/white-paper/the-state-of-broker-experience-2025/",
  },
  {
    title: "The BrokerPulse Business Case",
    type: "Whitepaper",
    href: "https://www.vistaxm.com/white-paper/the-brokerpulse-business-case/",
  },
];

// d) Case Studies (placeholders until published)
const CASE_STUDIES: { title: string; note: string }[] = [
  { title: "ePlus case study", note: "Our certified-NPS proof story, written up in full." },
  {
    title: "Additional customer stories",
    note: "More channel and carrier outcomes, added as they clear approval.",
  },
];

// e) Video / Media
// BUILD NOTE: retire the existing/outdated videos and replace them with
// on-message clips. The Erik Vogel x Terry Richardson webinar can be split into
// several short, placed assets, so keep this array able to hold multiple clips
// cut from a single source. Featured slot leads; the rest are supporting clips.
const VIDEOS: { title: string; featured?: boolean; comingSoon?: boolean }[] = [
  { title: "Erik Vogel × Terry Richardson webinar", featured: true, comingSoon: true },
  { title: "Webinar highlight: the partner shadow", comingSoon: true },
  { title: "Webinar highlight: closing the influencer gap", comingSoon: true },
  { title: "On-message product clip", comingSoon: true },
];

/* ---------------- Cards ---------------- */

/** Outbound content card (newsroom, articles, whitepapers). Renders as a link
 *  when available (new tab) or a non-linking placeholder when coming soon. */
function LinkCard({
  item,
  icon = "arrow",
  delay = 0,
}: {
  item: LinkItem;
  icon?: "arrow" | "download";
  delay?: number;
}) {
  const isLive = !item.comingSoon && item.href !== "#";
  const Icon = icon === "download" ? DownloadIcon : ArrowIcon;
  const actionLabel = icon === "download" ? "Download" : item.summary ? "Read more" : "Read";
  const meta = [item.source, item.date].filter(Boolean).join(" · ");
  const body = (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl hairline bg-white p-6 card-lift md:p-7">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="flex items-center justify-between gap-3">
        <span className="pill-light">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--blue-cta)]" />
          {item.type}
        </span>
        {!isLive && <StatusTag>Coming soon</StatusTag>}
      </div>
      <h3 className="mt-4 !text-lg !leading-snug !text-[color:var(--navy-deep)]">{item.title}</h3>
      {item.summary && (
        <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">{item.summary}</p>
      )}
      {meta && (
        <p className="mt-3 text-xs font-medium tracking-wide text-[color:var(--ink-soft)]">
          {meta}
        </p>
      )}
      <div className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-[color:var(--blue-link)]">
        {isLive ? (
          <>
            {actionLabel}
            <Icon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </>
        ) : (
          <span className="text-[color:var(--ink-soft)]">Available soon</span>
        )}
      </div>
    </div>
  );
  if (!isLive) {
    return <Reveal delay={delay}>{body}</Reveal>;
  }
  return (
    <Reveal delay={delay}>
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {body}
      </a>
    </Reveal>
  );
}

/** Coming-soon placeholder card (case studies, brochures). */
function ComingSoonCard({
  title,
  note,
  delay = 0,
}: {
  title: string;
  note?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col rounded-2xl border-2 border-dashed border-[color:var(--gray-line)] bg-[color:var(--blue-tint)] p-6 md:p-7">
        <StatusTag>Coming soon</StatusTag>
        <h3 className="mt-4 !text-lg !text-[color:var(--navy-deep)]">{title}</h3>
        {note && (
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--ink-soft)]">{note}</p>
        )}
      </div>
    </Reveal>
  );
}

/** Video gallery card with a play affordance and thumbnail placeholder. */
function VideoCard({
  title,
  featured = false,
  comingSoon = false,
  delay = 0,
}: {
  title: string;
  featured?: boolean;
  comingSoon?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group relative h-full overflow-hidden rounded-2xl hairline bg-white card-lift">
        <div
          className={`relative flex items-center justify-center overflow-hidden bg-[color:var(--navy-deep)] grain ${
            featured ? "aspect-[16/9]" : "aspect-video"
          }`}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage:
                "radial-gradient(520px 260px at 80% 10%, rgba(49,133,252,0.28), transparent 66%), radial-gradient(420px 240px at 10% 100%, rgba(0,86,167,0.34), transparent 68%)",
            }}
          />
          <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur transition-transform duration-300 group-hover:scale-105">
            <PlayIcon className="ml-0.5 h-6 w-6" />
          </span>
          {comingSoon && (
            <span className="absolute right-3 top-3">
              <StatusTag>Coming soon</StatusTag>
            </span>
          )}
        </div>
        <div className="p-5">
          {featured && (
            <div className="eyebrow mb-2 !text-[color:var(--blue-link)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" />
              Featured
            </div>
          )}
          <h3 className="!text-base !leading-snug !text-[color:var(--navy-deep)]">{title}</h3>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- Page ---------------- */

function Insights() {
  const featuredVideo = VIDEOS.find((v) => v.featured);
  const clipVideos = VIDEOS.filter((v) => !v.featured);
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="The point of view on Revenue Channel Intelligence."
        subtitle="Our thinking is public: articles, press, whitepapers, and video on customer experience management, customer retention, and the voice of the customer across the channel. Read it, use it, bring questions, not budget."
        primary={{ label: "Book a 30-minute call", to: BOOK_A_CALL_URL }}
      />

      {/* Featured report */}
      <Section>
        <FeaturedReport />
      </Section>

      {/* a) Newsroom / Press */}
      <Section tint>
        <SectionHead eyebrow="Newsroom" title="Press and announcements." />
        <Stagger className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {NEWSROOM.map((item, i) => (
            <StaggerItem key={item.title}>
              <LinkCard item={item} delay={i * 40} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Ambient divider: take the thinking with you */}
      <Section>
        <Reveal>
          <AmbientBand
            image="/images/ambient/reading-report.jpg"
            alt="Reading a long-form analytical report on a laptop"
            eyebrow="Take it with you"
            title="Thinking you can actually use."
          >
            Written to be read, cited, and put to work, not gated behind a form.
          </AmbientBand>
        </Reveal>
      </Section>

      {/* c) Whitepapers & Resources */}
      <Section>
        <SectionHead
          eyebrow="Whitepapers and resources"
          title="Whitepapers and business cases."
          intro="The research and business cases behind PartnerPulse and BrokerPulse. Read the customer experience analytics and customer intelligence that inform each program."
        />
        <Stagger className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2" stagger={0.08}>
          {RESOURCES.map((item, i) => (
            <StaggerItem key={item.title}>
              <LinkCard item={item} icon="download" delay={i * 40} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* d) Case Studies */}
      <Section tint>
        <SectionHead
          eyebrow="Case studies"
          title="Customer stories and outcomes."
          intro="Proof of customer retention and customer success in the channel, told through named accounts."
        />
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
          {CASE_STUDIES.map((cs, i) => (
            <ComingSoonCard key={cs.title} title={cs.title} note={cs.note} delay={i * 80} />
          ))}
        </div>
      </Section>

      {/* e) Video / Media */}
      <Section>
        <SectionHead eyebrow="Video and media" title="Watch the thinking, not just read it." />
        {featuredVideo && (
          <div className="mt-12 md:mt-14">
            <VideoCard title={featuredVideo.title} featured comingSoon={featuredVideo.comingSoon} />
          </div>
        )}
        <Stagger className="mt-6 grid gap-6 md:grid-cols-3" stagger={0.08}>
          {clipVideos.map((v, i) => (
            <StaggerItem key={v.title}>
              <VideoCard title={v.title} comingSoon={v.comingSoon} delay={i * 40} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* f) Brochures */}
      <Section tint>
        <SectionHead eyebrow="Brochures" title="Overview brochures." />
        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
          <ComingSoonCard
            title="Brochures"
            note="Printable overviews of VistaXM and the Pulse programs."
          />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
