import { createFileRoute } from "@tanstack/react-router";
import { CTABand, PageHero, Section, SectionHead } from "@/components/site";
import { FadeIn } from "@/components/motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | VistaXM" },
      {
        name: "description",
        content:
          "VistaXM was built by operators who ran customer experience at scale inside the companies you know, then brought that playbook, fully managed, to the channel.",
      },
      { property: "og:title", content: "About | VistaXM" },
      {
        property: "og:description",
        content:
          "Operators who built customer experience at scale. We became the team the mid-market and the channel never had.",
      },
    ],
  }),
  component: About,
});

/* ---------------- Leadership ---------------- */

// One-line taglines come from the client brief. Bruce's tagline and the full
// bios are placeholders to be pulled from vistaxm.com. "Read bio" links are
// placeholders until the bio content lands.
const LEADERS: { name: string; title: string; tagline: string; initials: string }[] = [
  {
    name: "Erik Vogel",
    title: "Chief Executive Officer",
    tagline:
      "We listen relentlessly, innovate boldly, and shape experiences that customers remember.",
    initials: "EV",
  },
  {
    name: "Bruce Coughlin",
    title: "Chief Growth Officer",
    tagline: "Tagline to come.",
    initials: "BC",
  },
  {
    name: "Paul Barr",
    title: "Chief Revenue Officer",
    tagline:
      "87% of companies say they provide excellent CX yet only 11% of customers agree. Which side is your company on?",
    initials: "PB",
  },
  {
    name: "Alexey Gerasimov",
    title: "Chief Operating Officer",
    tagline:
      "Behind every unforgettable customer experience is flawless execution and a united team.",
    initials: "AG",
  },
  {
    name: "Alan Zall",
    title: "Chief Technology Officer",
    tagline: "We build platforms that empower real connections between brands and people.",
    initials: "AZ",
  },
  {
    name: "Candice A. Vogel",
    title: "Chief Legal Officer",
    tagline:
      "Trust is earned through integrity; every promise and every policy matters to our customers.",
    initials: "CV",
  },
];

function LeaderProfileCard({
  name,
  title,
  tagline,
  initials,
  delay = 0,
}: {
  name: string;
  title: string;
  tagline: string;
  initials: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} className="h-full">
      <div className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-8 md:p-9 card-lift">
        <div className="flex items-center gap-5">
          {/* Photo placeholder: initials avatar until headshots are supplied */}
          <span
            aria-hidden
            className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--navy-deep)] to-[color:var(--blue-cta)] text-xl font-semibold tracking-wide text-white ring-2 ring-[color:var(--blue-cta)] ring-offset-2 ring-offset-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {initials}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">{name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
              {title}
            </p>
          </div>
        </div>

        <blockquote className="mt-6 text-[1.0625rem] italic leading-relaxed text-[color:var(--ink)]">
          <span aria-hidden className="mr-1 text-[color:var(--orange-pop)]">
            &ldquo;
          </span>
          {tagline}
        </blockquote>

        <div className="mt-auto pt-7">
          {/* Placeholder until full bios are pulled from vistaxm.com */}
          <button
            type="button"
            aria-label={`Read ${name}'s bio (coming soon)`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[color:var(--blue-link)] transition-colors hover:text-[color:var(--blue-cta)]"
          >
            Read bio
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path d="M5 12h13M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </FadeIn>
  );
}

/* ---------------- Advisor card (local, mirrors LeaderCard's visual language) ---------------- */

const ADVISORS: { name: string; title: string; bio: string; initials: string }[] = [
  {
    name: "Terry Richardson",
    title: "Advisor",
    bio: "Former Channel Chief at HPE and AMD.",
    initials: "TR",
  },
  { name: "Andy Youniss", title: "Advisor", bio: "Bio to come.", initials: "AY" },
  { name: "Abhi Ingle", title: "Advisor", bio: "Bio to come.", initials: "AI" },
  { name: "Kristina Bourke", title: "Advisor", bio: "Bio to come.", initials: "KB" },
  { name: "Eric Scollard", title: "Advisor", bio: "Bio to come.", initials: "ES" },
];

function AdvisorCard({
  name,
  title,
  bio,
  initials,
  delay = 0,
}: {
  name: string;
  title: string;
  bio: string;
  initials: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} className="h-full">
      <div className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-8 md:p-10 card-lift">
        <div className="flex items-center gap-5">
          <span
            aria-hidden
            className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--navy-deep)] to-[color:var(--blue-cta)] text-xl font-semibold tracking-wide text-white ring-2 ring-[color:var(--blue-cta)] ring-offset-2 ring-offset-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {initials}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-[color:var(--ink)]">{name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
              {title}
            </p>
          </div>
        </div>
        <p className="mt-6 leading-relaxed text-[color:var(--ink-soft)]">{bio}</p>
      </div>
    </FadeIn>
  );
}

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built by operators who lived this problem."
        subtitle="We ran customer experience inside the companies you know. We built VistaXM because the mid-market and the channel could not get the same results without the same team. So we became the team."
      />

      {/* The story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <SectionHead eyebrow="The story" title="From the inside of the companies you know." />
          <FadeIn delay={120}>
            <div className="relative rounded-2xl hairline bg-[color:var(--blue-tint)] p-8 md:p-10">
              <span
                aria-hidden
                className="absolute left-6 top-3 text-6xl leading-none text-[color:var(--orange-pop)]/30"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;
              </span>
              <p className="relative text-lg leading-relaxed text-[color:var(--ink-soft)]">
                Erik built the customer experience program for HPE GreenLake as it shifted to cloud
                services, then led high-tech and telecom at a leading experience-management
                platform, with a front-row seat to how Apple, ServiceNow, and AWS turn experience
                into revenue. The pattern was clear: the leaders tie every point of experience to
                dollars, and almost no one else can. VistaXM brings that playbook, fully managed, to
                the channel.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Leadership */}
      <Section tint id="team">
        <SectionHead
          center
          eyebrow="Leadership"
          title="The team behind the category."
          intro="Revenue Channel Intelligence was built by people who have run customer experience and the channel at scale."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:mt-14 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {LEADERS.map((leader, i) => (
            <LeaderProfileCard key={leader.name} {...leader} delay={i * 80} />
          ))}
        </div>
      </Section>

      {/* Advisors */}
      <Section>
        <SectionHead
          center
          eyebrow="Advisors"
          title="Guided by people who ran the channel."
          intro="Titles and full bios are being finalized."
        />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:mt-14 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {ADVISORS.map((advisor, i) => (
            <AdvisorCard key={advisor.name} {...advisor} delay={i * 80} />
          ))}
        </div>
      </Section>

      <CTABand />
    </>
  );
}
