import { createFileRoute, Link } from "@tanstack/react-router";
import { CTABand, Hero, Section, SectionHead } from "@/components/site";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers — Rapid Diagnostic, Essentials, Managed Program | VistaXM" },
      { name: "description", content: "Three ways to start with Revenue Channel Intelligence: a 3-week Rapid Diagnostic, RCI Essentials, or the full Managed Program with PartnerPulse and BrokerPulse." },
      { property: "og:title", content: "Offers | VistaXM" },
      { property: "og:description", content: "Low-risk proof to fully managed program — pick the entry that fits." },
    ],
  }),
  component: Offers,
});

const tiers = [
  {
    name: "Rapid Diagnostic",
    price: "$25k – $50k",
    cadence: "3 weeks",
    pitch: "Low-risk proof on a targeted slice of your channel or book.",
    features: [
      "Targeted account or partner slice",
      "Journey × persona instrumentation",
      "First account-level scoring",
      "Executive readout & next-step plan",
    ],
    cta: "Start a diagnostic",
  },
  {
    name: "RCI Essentials",
    price: "~$25k",
    cadence: "First wave in 90 days",
    pitch: "Production wave of Revenue Channel Intelligence with your first benchmark.",
    features: [
      "Full journey × persona coverage",
      "Account-level scoring at scale",
      "First channel benchmark",
      "Quarterly executive review",
    ],
    cta: "Start with Essentials",
    featured: true,
  },
  {
    name: "Managed Program",
    price: "Ongoing",
    cadence: "Full program",
    pitch: "The full ongoing program — PartnerPulse and BrokerPulse, continuous signal, certified NPS.",
    features: [
      "Continuous signal capture",
      "PartnerPulse + BrokerPulse",
      "Certified NPS",
      "Compounding benchmark moat",
    ],
    cta: "Talk to us",
  },
];

function Offers() {
  return (
    <>
      <Hero
        eyebrow="Offers"
        title="Three ways to start."
        subtitle="Low-risk proof to fully managed program. Same model, same neutrality, same benchmark."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map(t => (
            <div
              key={t.name}
              className={`rounded-2xl border p-8 flex flex-col ${
                t.featured
                  ? "border-[color:var(--blue-cta)] bg-[color:var(--blue-tint)] shadow-[0_20px_60px_-30px_rgba(49,133,252,0.55)]"
                  : "border-[color:var(--gray-line)] bg-white"
              }`}
            >
              {t.featured && (
                <div className="self-start mb-3 text-xs font-semibold uppercase tracking-widest text-[color:var(--blue-cta)]">
                  Most chosen
                </div>
              )}
              <h3 className="!text-2xl">{t.name}</h3>
              <div className="mt-2 text-3xl font-bold text-[color:var(--navy-deep)]">{t.price}</div>
              <div className="text-sm text-[color:var(--ink-soft)]">{t.cadence}</div>
              <p className="mt-4 text-[color:var(--ink-soft)]">{t.pitch}</p>
              <ul className="mt-6 space-y-2 text-sm text-[color:var(--ink-soft)] flex-1">
                {t.features.map(f => (
                  <li key={f} className="flex gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
                      <path d="M5 12l4 4 10-10" stroke="#3185fc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className={`mt-8 ${t.featured ? "btn-primary" : "btn-secondary-dark"}`}>{t.cta}</Link>
            </div>
          ))}
        </div>
      </Section>

      <Section tint>
        <SectionHead
          eyebrow="The ladder"
          title="Start where the risk feels right."
          intro="Most teams start with a Rapid Diagnostic, move to Essentials inside a quarter, and graduate into the Managed Program once the signal has changed a decision."
        />
      </Section>

      <CTABand />
    </>
  );
}
