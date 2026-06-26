import { createFileRoute } from "@tanstack/react-router";
import { CTABand, PageHero, Section, SectionHead, TeamSection } from "@/components/site";
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

/* ---------------- Advisor card (local, mirrors LeaderCard's visual language) ---------------- */

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
                services, then led high-tech and telecom at Qualtrics, with a front-row seat to how
                Apple, ServiceNow, and AWS turn experience into revenue. The pattern was clear: the
                leaders tie every point of experience to dollars, and almost no one else can.
                VistaXM brings that playbook, fully managed, to the channel.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Leadership: full bios for Erik Vogel and Bruce Coughlin */}
      <TeamSection />

      {/* Advisors */}
      <Section>
        <SectionHead eyebrow="Advisors" title="Guided by people who ran the channel." />
        <div className="mx-auto mt-12 grid max-w-3xl md:mt-14">
          <AdvisorCard
            name="Terry Richardson"
            title="Advisor"
            initials="TR"
            bio="Former Channel Chief at HPE and AMD."
          />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
