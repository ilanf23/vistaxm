import { createFileRoute } from "@tanstack/react-router";
import { BASE_URL, canonicalLink, canonicalUrl } from "@/lib/seo";
import {
  Card,
  CTABand,
  PageHero,
  Reveal,
  Section,
  SectionHead,
  Stat,
} from "@/components/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

const PAGE_PATH = "/case-studies/jf-petroleum";
const PAGE_NAME = "JF Petroleum Case Study, Field Service Experience Intelligence";
const PAGE_DESC =
  "How JF Petroleum, with PTC ServiceMax and VistaXM, moved from volume to value: technician eNPS +30, transactional NPS +53%, and a 15% improvement in ease of communication.";

export const Route = createFileRoute("/case-studies/jf-petroleum")({
  head: () => ({
    meta: [
      { title: `${PAGE_NAME} | VistaXM` },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: `${PAGE_NAME} | VistaXM` },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: canonicalUrl(PAGE_PATH) },
    ],
    links: [canonicalLink(PAGE_PATH)],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Case Studies" },
            { "@type": "ListItem", position: 3, name: "JF Petroleum", item: canonicalUrl(PAGE_PATH) },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "From Volume to Value: JF Petroleum's blueprint for modern field service excellence.",
          description: PAGE_DESC,
          url: canonicalUrl(PAGE_PATH),
          about: [
            { "@type": "Organization", name: "JF Petroleum Group", url: "https://jfpetrogroup.com" },
            { "@type": "Organization", name: "PTC" },
          ],
          author: { "@type": "Organization", name: "VistaXM", url: BASE_URL },
          publisher: { "@type": "Organization", name: "VistaXM", url: BASE_URL },
          mainEntityOfPage: canonicalUrl(PAGE_PATH),
        }),
      },
    ],
  }),
  component: JFPetroleumCaseStudy,
});

const HEADLINE_METRICS: { value: string; label: string }[] = [
  { value: "+30", label: "Technician eNPS within a year, at 55% engagement." },
  { value: "+53%", label: "Transactional NPS improvement." },
  { value: "15%", label: "Improvement in ease of communication with technicians." },
  { value: "2×", label: "Detractors are twice as likely to leave, an early-warning retention signal." },
];

const COMPANY_FACTS: { label: string; value: string }[] = [
  { label: "Industry", value: "Petroleum infrastructure installation and maintenance" },
  { label: "Headquarters", value: "Morrisville, North Carolina" },
  { label: "Employees", value: "1,700" },
  { label: "Revenue", value: "$1B+" },
  { label: "PTC Product", value: "ServiceMax" },
  { label: "Website", value: "jfpetrogroup.com" },
];

function CompanyFactsCard() {
  return (
    <FadeIn>
      <aside className="relative overflow-hidden rounded-2xl hairline bg-white p-7 md:p-8">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)]"
        />
        <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--blue-link)]">
          Company at a glance
        </div>
        <div className="mt-2 text-[1.05rem] font-semibold text-[color:var(--navy-deep)]">
          JF Petroleum Group
        </div>
        <dl className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {COMPANY_FACTS.map((f) => (
            <div key={f.label}>
              <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-[color:var(--ink-soft)] opacity-70">
                {f.label}
              </dt>
              <dd className="mt-1 text-sm font-medium text-[color:var(--navy-deep)]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </FadeIn>
  );
}

function PullQuote({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <FadeIn>
      <figure className="relative rounded-2xl hairline bg-[color:var(--blue-tint)] p-7 md:p-9">
        <blockquote
          className="relative text-xl font-semibold leading-snug text-[color:var(--navy-deep)] md:text-[1.5rem] md:leading-[1.3]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="mt-5 text-sm font-semibold uppercase tracking-wide text-[color:var(--blue-link)]">
          {name}
          <span className="ml-2 font-normal normal-case tracking-normal text-[color:var(--ink-soft)]">
            {role}
          </span>
        </figcaption>
      </figure>
    </FadeIn>
  );
}

/** Small download icon for the case-study PDF link. */
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

function JFPetroleumCaseStudy() {
  return (
    <>
      <PageHero
        eyebrow="Case Study, JF Petroleum with PTC ServiceMax"
        title="From Volume to Value: JF Petroleum's blueprint for modern field service excellence."
        subtitle="How one of the largest service-centric industrial distributors unified operations, assets, and experience to turn service complexity into scalable advantage."
        visual={<CompanyFactsCard />}
      />

      {/* Headline results */}
      <Section>
        <SectionHead
          eyebrow="Headline results"
          title="Real numbers from a named, approved program."
          intro="The combined ServiceMax and VistaXM program produced measurable gains across technician engagement, customer experience, and operations."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HEADLINE_METRICS.map((m, i) => (
            <Stat key={m.label} value={m.value} label={m.label} delay={i * 100} />
          ))}
        </div>
      </Section>

      {/* The challenge */}
      <Section tint>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHead
            eyebrow="The challenge"
            title="Acquisition growth, rising asset complexity, fragmented visibility."
          />
          <FadeIn delay={120}>
            <div className="space-y-5 text-base leading-relaxed text-[color:var(--ink-soft)] md:text-lg">
              <p>
                Acquisition-driven expansion, rising asset complexity, and a large distributed
                workforce fragmented visibility across the service lifecycle. The shift from
                break/fix to complex, higher-value services raised the stakes on every stakeholder's
                experience.
              </p>
              <p>
                Integrating acquired businesses introduced variability in systems, processes, and
                data, making installed-base data, asset history, and service performance hard to
                track consistently. Technician engagement and customer communication both varied by
                region, and early signals suggested those experience gaps were affecting day-to-day
                performance.
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* The solution */}
      <Section>
        <SectionHead
          eyebrow="The solution"
          title="ServiceMax as the operational backbone. VistaXM as the experience intelligence layer."
          intro="JF Petroleum selected ServiceMax as its asset-centric field service management platform: a single system of record for work orders, scheduling, dispatch, and asset lifecycle. VistaXM added the experience-intelligence layer on top."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card title="Automated, multi-stakeholder feedback" kicker="How it runs" delay={0}>
            Using ServiceMax closed-ticket events as the trigger, VistaXM launches feedback across
            technician, customer, dispatch, and customer care, cycle after cycle.
          </Card>
          <Card title="Aligned to the operational record" kicker="Closed loop" delay={120}>
            Experience data is joined to work-order and asset data, revealing how job-description
            accuracy, communication quality, parts availability, and technician sentiment influence
            first-time-fix rate, project quality, billing efficiency, and voluntary attrition.
          </Card>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <PullQuote
            quote="With ServiceMax as our operational backbone, and VistaXM delivering the experience intelligence layer, we had the perfect fit for our transformation."
            name="Gary Riemer"
            role="Executive Vice President, Power, JF Petroleum Group"
          />
          <PullQuote
            quote="If we perform the installation perfectly and the customer experience is an A+, we secure customer loyalty, favorable word of mouth, and future sales."
            name="Rob Uppena"
            role="SVP of Sales"
          />
        </div>
      </Section>

      {/* The results */}
      <Section tint>
        <SectionHead
          eyebrow="The results"
          title="From volume to value, backed by numbers."
          intro="Technician eNPS rose to +30 within a year at 55% engagement, giving leadership a statistically reliable read on sentiment and retention risk. Detractors and non-respondents were twice as likely to leave. Transactional NPS rose 53% and customers reported a 15% improvement in ease of communication. Previously hidden project-quality gaps became visible and actionable, and leadership gained macro visibility into regional performance and where dispatch communication or parts planning was breaking down before it became a costly pattern."
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {HEADLINE_METRICS.map((m) => (
            <StaggerItem key={m.label} className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl hairline bg-white p-7 card-lift">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[color:var(--blue-cta)] to-[color:var(--blue-light)] transition-transform duration-500 group-hover:scale-x-100"
                />
                <div
                  className="text-4xl font-semibold tabular-nums tracking-tight text-[color:var(--navy-deep)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {m.value}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink-soft)]">
                  {m.label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 max-w-3xl">
          <PullQuote
            quote="We saw a huge shift from volume to value."
            name="John Garrison"
            role="VP, Service Operations"
          />
        </div>
      </Section>

      {/* Looking ahead */}
      <Section>
        <SectionHead
          eyebrow="Looking ahead"
          title="From a program to a service intelligence layer for the ecosystem."
          intro="With a unified operational and experience data foundation, JF Petroleum is positioned to connect asset and service data with manufacturers for more proactive maintenance and stronger ecosystem collaboration, evolving toward a broader service intelligence layer across the industrial ecosystem."
        />
      </Section>

      {/* Partner line */}
      <Section tint>
        <Reveal>
          <div className="mx-auto max-w-4xl rounded-2xl hairline bg-white p-7 md:p-9">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--blue-link)]">
              In partnership with PTC
            </div>
            <p className="mt-3 text-base leading-relaxed text-[color:var(--ink-soft)] md:text-lg">
              PTC is a leading provider of digital transformation solutions for manufacturers and
              service organizations; its ServiceMax platform provides asset-centric field service
              management.
            </p>
          </div>
        </Reveal>
      </Section>

      <CTABand />
    </>
  );
}
