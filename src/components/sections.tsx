import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal, Section, SectionHead } from "@/components/site";
import { BookCallButton } from "@/components/book-call";

/* ---------------- Trust bar ---------------- */

export function TrustBar() {
  const logos = [
    "Softchoice",
    "Veeam",
    "HPE GreenLake",
    "Cloud Technology Partners",
    "Qualtrics",
  ];
  return (
    <section className="border-y border-[color:var(--hairline)] bg-white">
      <div className="container-x py-10 md:py-12 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
        <div>
          <div className="eyebrow mb-3">Built by operators who've done this at scale</div>
          <div className="flex flex-wrap items-center gap-x-9 gap-y-3 text-[color:var(--ink-soft)]/70">
            {logos.map((l) => (
              <span
                key={l}
                className="font-semibold tracking-tight text-[0.95rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[color:var(--blue-tint)] border border-[color:var(--blue-pale)] px-6 py-5 flex items-center gap-5">
          <div className="text-4xl font-semibold text-[color:var(--navy-deep)] tabular-nums leading-none">
            $11M+
          </div>
          <div className="text-sm text-[color:var(--ink-soft)] leading-snug">
            in renewal revenue protected for a full-service industrial supplier inside a $26.8M
            opportunity-and-risk pool.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "We stand up the program",
      body: "Managed end-to-end by VistaXM as a neutral third party. No internal team build, no survey platform to wrangle.",
    },
    {
      n: "02",
      title: "We instrument journey × persona",
      body: "Five stages across four personas, account-tagged. The Decision Maker to Influencer gap surfaces as a leading indicator of churn.",
    },
    {
      n: "03",
      title: "You get a first insight in ~90 days",
      body: "A working Revenue Channel Intelligence view: which accounts to defend, which to expand, which broker or partner agencies are quietly at risk.",
    },
    {
      n: "04",
      title: "We compound the benchmark, every quarter",
      body: "Your scores are measured against the channel, not against yourself last quarter. Certified NPS becomes usable in proposals, RFPs, and QBRs.",
    },
  ];
  return (
    <Section tint>
      <SectionHead
        eyebrow="How it works"
        title="A managed program. First insight in about 90 days."
        intro="Low-risk to start. No platform to deploy, no team to hire, no survey vendor to manage. We do it; you act on it."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <div className="relative rounded-2xl hairline bg-white p-6 h-full card-lift">
              <div
                className="text-[0.7rem] font-semibold tracking-[0.18em] uppercase"
                style={{ color: "var(--blue-cta)" }}
              >
                Step {s.n}
              </div>
              <div
                className="mt-3 text-lg font-semibold text-[color:var(--navy-deep)] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.title}
              </div>
              <p className="mt-3 text-[15px] text-[color:var(--ink-soft)] leading-relaxed">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Real proof ---------------- */

export function RealProof() {
  return (
    <Section>
      <SectionHead
        eyebrow="Proof"
        title="The results speak in dollars, not survey points."
        intro="Real outcomes from teams that ran this playbook. The certified NPS is the credential. The revenue impact is the point."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-12">
        {/* Softchoice — hero proof card */}
        <Reveal className="md:col-span-7">
          <article className="rounded-2xl overflow-hidden bg-[color:var(--navy-deep)] text-white p-8 md:p-10 relative h-full">
            <div
              aria-hidden
              className="absolute -top-24 -right-20 h-72 w-72 rounded-full opacity-40"
              style={{ background: "radial-gradient(circle, rgba(49,133,252,0.5), transparent 70%)" }}
            />
            <div className="relative">
              <div
                className="text-xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Softchoice
              </div>
              <div className="mt-1 text-xs text-white/55 uppercase tracking-[0.14em]">
                IT solutions & services
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { v: "+8", l: "NPS points over 2 years" },
                  { v: "$8.4M", l: "Revenue impact" },
                  { v: "-4%", l: "Churn reduction" },
                  { v: "+10%", l: "Higher win rates" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-3xl md:text-4xl font-semibold tabular-nums text-white leading-none">
                      {s.v}
                    </div>
                    <div className="mt-2 text-xs text-white/65 leading-snug">{s.l}</div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-white/75 max-w-xl leading-relaxed">
                Revenue Channel Intelligence let Softchoice see which accounts to defend, which to
                expand, and which partners were quietly turning into risk. The NPS lift was real.
                The revenue compounding was the point.
              </p>
            </div>
          </article>
        </Reveal>

        {/* Veeam */}
        <Reveal delay={100} className="md:col-span-5">
          <article className="rounded-2xl hairline bg-white p-8 h-full">
            <div
              className="text-xl font-semibold tracking-tight text-[color:var(--navy-deep)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Veeam
            </div>
            <div className="mt-1 text-xs text-[color:var(--ink-soft)]/60 uppercase tracking-[0.14em]">
              Data resilience platform
            </div>
            <div className="mt-7 flex items-baseline gap-3">
              <span className="text-5xl font-semibold tabular-nums text-[color:var(--navy-deep)] leading-none">
                30
              </span>
              <svg width="28" height="20" viewBox="0 0 28 20" aria-hidden>
                <path
                  d="M2 10h22M18 4l6 6-6 6"
                  fill="none"
                  stroke="var(--blue-cta)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-5xl font-semibold tabular-nums text-[color:var(--blue-cta)] leading-none">
                73
              </span>
            </div>
            <div className="mt-3 text-sm text-[color:var(--ink-soft)]">
              NPS trajectory · alongside <span className="font-semibold">27% YoY growth</span>
            </div>
            <p className="mt-6 text-[15px] text-[color:var(--ink-soft)] leading-relaxed">
              The certified score moved because the underlying decisions moved. Not a survey
              optimization, a revenue compounding loop.
            </p>
          </article>
        </Reveal>

        {/* Market reality stat */}
        <Reveal delay={140} className="md:col-span-4">
          <article className="rounded-2xl hairline bg-[color:var(--blue-tint)] p-8 h-full">
            <div className="eyebrow mb-3">Market reality</div>
            <div className="text-6xl font-semibold tabular-nums text-[color:var(--navy-deep)] leading-none">
              33%
            </div>
            <p className="mt-4 text-[15px] text-[color:var(--ink-soft)] leading-relaxed">
              Only one in three companies link NPS to revenue. The other two-thirds are running a
              vanity metric.
            </p>
          </article>
        </Reveal>

        {/* Industrial supplier */}
        <Reveal delay={180} className="md:col-span-4">
          <article className="rounded-2xl hairline bg-white p-8 h-full">
            <div
              className="text-sm font-semibold text-[color:var(--navy-deep)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Full-service industrial supplier
            </div>
            <div className="mt-1 text-xs text-[color:var(--ink-soft)]/60 uppercase tracking-[0.14em]">
              Distribution & services
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <div className="text-3xl font-semibold tabular-nums text-[color:var(--navy-deep)] leading-none">
                  $26.8M
                </div>
                <div className="mt-1 text-xs text-[color:var(--ink-soft)]">
                  Opportunity-and-risk pool identified
                </div>
              </div>
              <div>
                <div className="text-3xl font-semibold tabular-nums text-[color:var(--blue-cta)] leading-none">
                  $11M+
                </div>
                <div className="mt-1 text-xs text-[color:var(--ink-soft)]">
                  Renewal revenue protected
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Certified NPS credential */}
        <Reveal delay={220}>
          <article className="md:col-span-4 rounded-2xl hairline bg-white p-8 h-full relative overflow-hidden">
            <div
              aria-hidden
              className="absolute -top-12 -right-10 h-44 w-44 rounded-full opacity-50"
              style={{
                background: "radial-gradient(circle, rgba(246,130,65,0.25), transparent 70%)",
              }}
            />
            <div className="relative">
              <div
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--blue-tint)] border border-[color:var(--blue-pale)] px-3 py-1 text-xs font-semibold text-[color:var(--navy-deep)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--orange-pop)]" />
                Third-party certified
              </div>
              <div
                className="mt-4 text-xl font-semibold text-[color:var(--navy-deep)] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The J.D. Power of the channel.
              </div>
              <p className="mt-3 text-[15px] text-[color:var(--ink-soft)] leading-relaxed">
                A certified NPS you can put in proposals, RFPs, and marketing. The only certified
                channel score a carrier or OEM cannot produce for itself.
              </p>
            </div>
          </article>
        </Reveal>
      </div>

      {/* CTA with proof */}
      <Reveal delay={120}>
        <div className="mt-14 rounded-2xl bg-[color:var(--navy-deep)] text-white p-8 md:p-10 grid md:grid-cols-[1.4fr_auto] gap-6 items-center">
          <div>
            <div className="text-lg md:text-xl font-semibold leading-snug">
              See a redacted Revenue Channel Intelligence view from a comparable company.
            </div>
            <div className="mt-2 text-sm text-white/65">
              30 minutes · no obligation · one business day response.
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center md:justify-end">
            <BookCallButton variant="primary" source="proof-section" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- Persona tabs (For your role) ---------------- */

type PersonaKey = "revenue" | "channel" | "technical" | "operations";

const PERSONAS: Record<
  PersonaKey,
  {
    label: string;
    short: string;
    headline: string;
    outcome: string;
    bullets: string[];
    proofStat: string;
    proofLabel: string;
    proofSource: string;
  }
> = {
  revenue: {
    label: "Revenue / CRO",
    short: "CRO & GTM leaders",
    headline: "Account-level signal before the renewal arrives.",
    outcome:
      "Replace channel forecast hope with account-level revenue intelligence. Know which accounts to defend, which to expand, and which broker or partner agencies are quietly suppressing growth.",
    bullets: [
      "A revenue-tagged view of every customer in the channel",
      "Early warning on renewal risk, weeks ahead of pipeline",
      "Compounding benchmark you can take to the board",
    ],
    proofStat: "+$8.4M",
    proofLabel: "Revenue impact",
    proofSource: "Softchoice",
  },
  channel: {
    label: "Channel / Distribution",
    short: "Channel & distribution",
    headline: "See your partners and brokers the way customers do.",
    outcome:
      "Stop flying blind on the relationships your partners and brokers own. Know which agencies are quietly at risk before production declines, and which to lean into.",
    bullets: [
      "PartnerPulse and BrokerPulse: standardized, neutral, account-tagged",
      "The Decision Maker to Influencer gap, surfaced per account",
      "A certified score you can use in QBRs and partner negotiations",
    ],
    proofStat: "+10%",
    proofLabel: "Higher win rates",
    proofSource: "Softchoice",
  },
  technical: {
    label: "Technical",
    short: "CX & data teams",
    headline: "Standardized, apples-to-apples, no platform to deploy.",
    outcome:
      "Managed by VistaXM end-to-end. No survey vendor to wrangle, no Qualtrics build, no data engineering project. Outputs land where your team already works.",
    bullets: [
      "Neutral third-party collection: candid signal you cannot collect yourself",
      "Journey × persona model, account-tagged at the source",
      "Benchmarked against the channel, not against yourself last quarter",
    ],
    proofStat: "73",
    proofLabel: "Certified NPS",
    proofSource: "Veeam",
  },
  operations: {
    label: "Operations / Procurement",
    short: "Ops & procurement",
    headline: "Fixed scope. Fixed price. Guaranteed first insight.",
    outcome:
      "Start with a fixed-price 3-week Rapid Diagnostic with pre-agreed success criteria. If we don't surface a revenue-relevant signal you didn't have, you don't pay the full fee.",
    bullets: [
      "Fixed scope and timeline (3 weeks Diagnostic, 90 days Essentials)",
      "Risk-reversal guarantee on the Diagnostic",
      "No platform license, no internal team build required",
    ],
    proofStat: "$11M+",
    proofLabel: "Renewal revenue protected",
    proofSource: "Industrial supplier",
  },
};

export function PersonaTabs() {
  const [active, setActive] = useState<PersonaKey>("revenue");
  const p = PERSONAS[active];
  return (
    <Section dark>
      <SectionHead
        dark
        eyebrow="For your role"
        title="Built for committee consensus."
        intro="High-ACV deals get bought by committee. Each role on that committee gets a different answer; the answer is always Revenue Channel Intelligence."
      />
      <div className="mt-12">
        <div
          role="tablist"
          aria-label="Persona"
          className="flex flex-wrap gap-2 border-b border-white/10 pb-1"
        >
          {(Object.keys(PERSONAS) as PersonaKey[]).map((k) => {
            const isActive = k === active;
            return (
              <button
                key={k}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(k)}
                className={`px-4 py-2.5 rounded-t-lg text-sm font-semibold tracking-tight transition-colors ${
                  isActive
                    ? "bg-white text-[color:var(--navy-deep)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {PERSONAS[k].label}
              </button>
            );
          })}
        </div>

        <div className="rounded-b-2xl bg-white text-[color:var(--ink)] p-8 md:p-10 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <div>
            <div className="eyebrow mb-3">{p.short}</div>
            <h3 className="!text-[1.75rem] !text-[color:var(--navy-deep)] leading-tight">
              {p.headline}
            </h3>
            <p className="mt-4 text-[color:var(--ink-soft)] text-[1.0625rem] leading-relaxed">
              {p.outcome}
            </p>
            <ul className="mt-6 space-y-3">
              {p.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 text-[15px] text-[color:var(--ink)] leading-snug"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--blue-cta)"
                    strokeWidth="2.4"
                    className="mt-0.5 shrink-0"
                    aria-hidden
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-3">
              <BookCallButton variant="primary" source={`persona-${active}`} />
              <Link to="/offers" className="btn-ghost">
                Start the Diagnostic →
              </Link>
            </div>
          </div>
          <aside className="rounded-2xl bg-[color:var(--blue-tint)] border border-[color:var(--blue-pale)] p-6">
            <div className="eyebrow mb-3">Proof for this role</div>
            <div className="text-5xl font-semibold tabular-nums text-[color:var(--navy-deep)] leading-none">
              {p.proofStat}
            </div>
            <div className="mt-2 text-sm text-[color:var(--ink-soft)]">{p.proofLabel}</div>
            <div className="mt-4 text-xs text-[color:var(--ink-soft)]/75">
              Source: {p.proofSource}
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Offer ladder (with risk reversal) ---------------- */

export function OfferLadder() {
  const tiers = [
    {
      flag: "Start here",
      flagColor: "var(--orange-pop)",
      name: "Rapid Diagnostic",
      price: "$25k–$50k",
      window: "3 weeks · fixed scope",
      desc: "A targeted slice of your channel or book of business. Pre-agreed success criteria. Low-risk proof that the signal exists and that it changes a decision.",
      bullets: [
        "Account-level Revenue Channel Intelligence on a defined slice",
        "Pre-agreed success criteria, signed before kickoff",
        "Risk-reversal: if we don't surface a revenue-relevant signal, you don't pay the full fee",
      ],
      cta: <BookCallButton variant="primary" source="ladder-diagnostic">Book the Diagnostic call</BookCallButton>,
      featured: true,
    },
    {
      flag: "Scale to production",
      flagColor: "var(--blue-cta)",
      name: "RCI Essentials",
      price: "~$25k",
      window: "First wave in 90 days",
      desc: "First production wave of Revenue Channel Intelligence across journey × persona. Account-level scoring and your first channel benchmark.",
      bullets: [
        "Full journey × persona instrumentation across one segment",
        "Certified NPS, comparable across the channel",
        "Executive readout with revenue-tagged action list",
      ],
      cta: <BookCallButton variant="secondary-dark" source="ladder-essentials">Talk to us about Essentials</BookCallButton>,
      featured: false,
    },
    {
      flag: "Ongoing program",
      flagColor: "var(--navy-mid)",
      name: "Managed Program",
      price: "Annual",
      window: "Continuous · executive reviews",
      desc: "The full ongoing program. PartnerPulse and BrokerPulse, continuous signal, executive reviews, certified NPS, and benchmark compounding every quarter.",
      bullets: [
        "PartnerPulse (OEM & IT channel) or BrokerPulse (carriers)",
        "Quarterly executive reviews with the VistaXM team",
        "Compounding benchmark and certified-NPS use in proposals & RFPs",
      ],
      cta: <BookCallButton variant="secondary-dark" source="ladder-managed">Scope the Managed Program</BookCallButton>,
      featured: false,
    },
  ];

  return (
    <Section tint id="offers">
      <SectionHead
        eyebrow="The on-ramp"
        title="Lead with the Diagnostic. Scale on proof."
        intro="A 3-week Rapid Diagnostic with a risk-reversal guarantee is the easiest first step. Then Essentials. Then the full Managed Program. No long-cycle procurement to start."
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 110}>
            <article
              className={`relative rounded-2xl p-7 md:p-8 h-full flex flex-col ${
                t.featured
                  ? "bg-white border-2 border-[color:var(--blue-cta)] shadow-[0_30px_60px_-25px_rgba(49,133,252,0.35)]"
                  : "bg-white hairline"
              }`}
            >
              <div
                className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em]"
                style={{
                  background:
                    t.flagColor === "var(--orange-pop)"
                      ? "rgba(246,130,65,0.12)"
                      : t.flagColor === "var(--blue-cta)"
                        ? "rgba(49,133,252,0.10)"
                        : "rgba(0,86,167,0.10)",
                  color: t.flagColor,
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.flagColor }} />
                {t.flag}
              </div>
              <h3
                className="mt-4 !text-2xl !text-[color:var(--navy-deep)] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.name}
              </h3>
              <div className="mt-1 text-sm">
                <span className="font-semibold text-[color:var(--navy-deep)]">{t.price}</span>{" "}
                <span className="text-[color:var(--ink-soft)]/70">· {t.window}</span>
              </div>
              <p className="mt-4 text-[15px] text-[color:var(--ink-soft)] leading-relaxed">
                {t.desc}
              </p>
              <ul className="mt-5 space-y-2.5 text-[14px]">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[color:var(--ink)]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--blue-cta)"
                      strokeWidth="2.4"
                      className="mt-0.5 shrink-0"
                      aria-hidden
                    >
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                    <span className="leading-snug">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[color:var(--gray-line)]">{t.cta}</div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-10 rounded-2xl bg-white border border-[color:var(--blue-pale)] p-6 md:p-7 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-start gap-3 max-w-2xl">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--blue-cta)"
              strokeWidth="2"
              className="mt-0.5 shrink-0"
              aria-hidden
            >
              <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <div className="text-[15px] text-[color:var(--ink)] leading-relaxed">
              <span className="font-semibold text-[color:var(--navy-deep)]">
                Diagnostic guarantee:
              </span>{" "}
              if the Rapid Diagnostic does not surface a revenue-relevant signal you didn't already
              have, you don't pay the full fee. Documented in writing before kickoff.
            </div>
          </div>
          <BookCallButton variant="primary" source="ladder-guarantee" />
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- FAQ / Objections ---------------- */

export function FAQ() {
  const items: { q: string; a: ReactNode }[] = [
    {
      q: "What is the scope of the Rapid Diagnostic?",
      a: "A fixed 3-week engagement on a defined slice of your channel or book of business: typically one segment, one geo, or one partner tier. Pre-agreed success criteria and a written risk-reversal guarantee.",
    },
    {
      q: "How do you handle data security and confidentiality?",
      a: "VistaXM is the neutral third party. We collect candid signal under our own program, store under enterprise-grade controls, and share with you under NDA. We never expose your customer data to other clients, and benchmark outputs are de-identified.",
    },
    {
      q: "How is this different from running NPS ourselves?",
      a: "NPS is a single score. Revenue Channel Intelligence is journey × persona × account. As a neutral third party we get candid signal customers will not put in your survey, then tag it to the accounts and dollars that matter.",
    },
    {
      q: "How much time does my team need to commit?",
      a: "For the Diagnostic, roughly two working sessions and a final readout. The program is managed end-to-end by VistaXM. No internal build, no survey platform, no team to hire.",
    },
    {
      q: "Are we a fit?",
      a: "If most of your revenue moves through partners, brokers, or distribution, and a renewal decision is owned by a committee, you're a fit. Typical buyers are CROs, channel chiefs, and customer experience leaders at OEMs, IT channel companies, and insurance carriers.",
    },
    {
      q: "What does the certified NPS get us?",
      a: "A third-party verified score you can put in proposals, RFPs, board decks, and marketing. The only certified channel score a carrier or OEM cannot credibly produce for itself.",
    },
  ];
  return (
    <Section>
      <SectionHead
        eyebrow="Objections welcome"
        title="The questions every committee asks."
        intro="Scope, security, fit, time. Here's the short version."
      />
      <div className="mt-12 grid gap-3 max-w-3xl">
        {items.map((it, i) => (
          <FAQItem key={i} q={it.q} a={it.a} defaultOpen={i === 0} />
        ))}
      </div>
      <Reveal delay={120}>
        <div className="mt-10 flex flex-wrap gap-3 items-center">
          <BookCallButton variant="primary" source="faq" />
          <span className="text-sm text-[color:var(--ink-soft)]">
            Have a question we missed?{" "}
            <a className="text-[color:var(--blue-link)] font-semibold" href="mailto:sales@vistaxm.com">
              sales@vistaxm.com
            </a>
          </span>
        </div>
      </Reveal>
    </Section>
  );
}

function FAQItem({ q, a, defaultOpen = false }: { q: string; a: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-[color:var(--gray-line)] bg-white overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-[color:var(--navy-deep)] text-[1.0625rem]">{q}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          className={`shrink-0 text-[color:var(--blue-cta)] transition-transform ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-[15px] text-[color:var(--ink-soft)] leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

/* ---------------- Insights preview ---------------- */

export function InsightsPreview() {
  return (
    <Section tint>
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
        <SectionHead
          eyebrow="Insights"
          title="Self-educate before you talk to anyone."
          intro="Our point of view is public. Read the manifesto. Read the State of Revenue Channel Intelligence report. Bring questions, not budget."
        />
        <Reveal delay={120}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/insights"
              className="group rounded-2xl bg-white hairline p-6 card-lift block"
            >
              <div className="eyebrow mb-3">Manifesto</div>
              <div
                className="text-lg font-semibold text-[color:var(--navy-deep)] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Your NPS is a score. Your renewal is a decision.
              </div>
              <p className="mt-3 text-sm text-[color:var(--ink-soft)] leading-relaxed">
                Why the channel needs a new category, and what it looks like when you have one.
              </p>
              <div className="mt-5 text-sm font-semibold text-[color:var(--blue-link)] group-hover:underline">
                Read the manifesto →
              </div>
            </Link>
            <Link
              to="/insights"
              className="group rounded-2xl bg-[color:var(--navy-deep)] text-white p-6 card-lift block"
            >
              <div className="eyebrow !text-[color:var(--blue-light)] mb-3">Report · ungated</div>
              <div
                className="text-lg font-semibold leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                The State of Revenue Channel Intelligence
              </div>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Benchmarks, patterns, and the partner shadow that's hiding inside every channel
                forecast.
              </p>
              <div className="mt-5 text-sm font-semibold text-[color:var(--blue-light)] group-hover:underline">
                Read the report →
              </div>
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Leadership ---------------- */

export function Leadership() {
  const team = [
    {
      initials: "EV",
      name: "Erik Vogel",
      title: "Founder & CEO",
      bio: "Built HPE GreenLake customer experience. Led high-tech and telecom at Qualtrics. Now turning channel sentiment into revenue decisions.",
      quote: "Companies don't spend NPS points. They spend dollars.",
      linkedin: "https://www.linkedin.com/in/erikvogel/",
      ring: "var(--blue-cta)",
    },
    {
      initials: "BC",
      name: "Bruce Coughlin",
      title: "Chief Growth Officer",
      bio: "Former CEO of Cloud Technology Partners (acquired by HPE). Spent two decades scaling services businesses by separating signal from noise.",
      quote:
        "The companies that win on customer experience are the only ones that have a real moat.",
      linkedin: "https://www.linkedin.com/in/brucecoughlin/",
      ring: "var(--orange-pop)",
    },
  ];
  return (
    <Section>
      <SectionHead
        eyebrow="Leadership"
        title="Operators who've done this at scale."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 120}>
            <article className="rounded-2xl hairline bg-white p-8 h-full card-lift">
              <div className="flex items-start gap-5">
                <div
                  className="h-20 w-20 rounded-full flex items-center justify-center text-white font-semibold text-xl tracking-wide shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--navy-deep), var(--navy-mid))",
                    boxShadow: `0 0 0 3px ${m.ring}30, 0 0 0 4px ${m.ring}`,
                    fontFamily: "var(--font-display)",
                  }}
                  aria-hidden
                >
                  {m.initials}
                </div>
                <div>
                  <div
                    className="text-xl font-semibold text-[color:var(--navy-deep)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {m.name}
                  </div>
                  <div className="text-sm text-[color:var(--ink-soft)]/75">{m.title}</div>
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--blue-link)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6S0 4.88 0 3.5 1.12 1 2.49 1s2.49 1.12 2.49 2.5zM.22 8h4.54v14H.22V8zM8 8h4.36v1.93h.06c.6-1.13 2.07-2.33 4.26-2.33 4.56 0 5.4 3 5.4 6.92V22h-4.54v-6.18c0-1.47-.03-3.37-2.05-3.37-2.05 0-2.37 1.6-2.37 3.26V22H8V8z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
              <p className="mt-5 text-[15px] text-[color:var(--ink-soft)] leading-relaxed">
                {m.bio}
              </p>
              <blockquote
                className="mt-5 border-l-2 pl-4 italic text-[color:var(--navy-deep)] text-[15px] leading-relaxed"
                style={{ borderColor: m.ring }}
              >
                "{m.quote}"
              </blockquote>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Page-level CTA panel reused on subpages ---------------- */

export function PageCTA({
  title,
  intro,
  source,
}: {
  title: string;
  intro?: string;
  source: string;
}) {
  return (
    <Section>
      <Reveal>
        <div className="rounded-2xl bg-[color:var(--blue-tint)] border border-[color:var(--blue-pale)] p-8 md:p-10 grid lg:grid-cols-[1.5fr_auto] gap-6 items-center">
          <div>
            <div
              className="text-2xl font-semibold text-[color:var(--navy-deep)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </div>
            {intro && (
              <p className="mt-3 text-[color:var(--ink-soft)] max-w-xl leading-relaxed">
                {intro}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <BookCallButton variant="primary" source={source} />
            <Link to="/offers" className="btn-secondary-dark">
              See the Diagnostic
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
