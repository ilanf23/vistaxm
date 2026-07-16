import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/* ============================================================================
 * Hidden per-prospect microsite: /for/abacus-9f4k2q7x
 *
 * Discoverability: this route is noindex,nofollow (meta below), disallowed via
 * public/robots.txt (Disallow: /for/), and NOT listed in sitemap.xml or linked
 * from anywhere on the public site. It's reachable only by its direct URL.
 *
 * Styling isolation: the entire page is wrapped in `.vx-micro`. All styles
 * live in a single <style> block scoped under `.vx-micro` selectors — none of
 * this leaks to or is affected by the public site's design system.
 *
 * To spin up a new prospect, duplicate this file and edit the PROSPECT record.
 * ============================================================================ */

/* -------------------------- PROSPECT DATA RECORD -------------------------- */
const PROSPECT = {
  slug: "abacus-9f4k2q7x",
  company: "Abacus",
  logoInitial: "A",
  rep: {
    name: "Paul Barr",
    title: "Chief Revenue Officer, VistaXM",
    email: "paul@vistaxm.com",
    phone: "(801) 502-4841",
  },
  headline: "Turn your channel into an account-level revenue signal.",
  subhead:
    "A pitch built for Abacus. Where partner conviction is strongest, where it's slipping, and the accounts most likely to grow or walk in the next two quarters.",
  opportunity: {
    title: "The channel blind spot",
    body: "You already measure pipeline, bookings, and NPS at the top. What you don't yet see is the account-level truth from the partners and customers actually doing the work: which relationships are compounding, which are quietly eroding, and where a small move now protects seven-figure renewals later.",
  },
  trackEmphasis:
    "Track 1 stands up in 90 days on your top 50 named accounts. Track 2 extends coverage across the full partner base once the pilot proves out.",
  proof: [
    {
      kind: "case",
      tag: "Case study",
      title: "JF Petroleum: rebuilt partner conviction in two quarters",
      body: "A neutral partner program surfaced the accounts driving 68% of at-risk revenue. The joint plan closed the gap.",
    },
    {
      kind: "case",
      tag: "Case study",
      title: "Global OEM: +$34M pipeline lift from a Wave 1 brief",
      body: "Named-account moves ranked by dollars at stake, delivered 90 days after kickoff.",
    },
    {
      kind: "press",
      tag: "Press",
      title: "CRN: VistaXM is powering a customer experience partner revolution",
      body: "How a neutral third party turns partner CX into a revenue-planning input.",
    },
    {
      kind: "press",
      tag: "Press",
      title: "CX Current: from CX to revenue intelligence",
      body: "Erik Vogel on why the channel is the last unmodeled revenue signal.",
    },
  ],
} as const;

const TEAM = [
  {
    name: "Erik Vogel",
    role: "CEO",
    photo: "https://www.vistaxm.com/images/team/erik-vogel.avif",
  },
  {
    name: "Paul Barr",
    role: "CRO",
    photo: "https://www.vistaxm.com/images/team/paul.avif",
  },
  {
    name: "Alexey Gerasimov",
    role: "COO",
    photo: "https://www.vistaxm.com/images/team/alexey-gerasimov.avif",
  },
  {
    name: "Bruce Coughlin",
    role: "CGO",
    photo: "https://www.vistaxm.com/images/team/bruce-coughlin.jpg",
  },
  {
    name: "Alan Zall",
    role: "CTO",
    photo: "https://www.vistaxm.com/images/team/alan-zall.avif",
  },
] as const;

/* -------------------------- Route ------------------------------------------ */
export const Route = createFileRoute("/for/abacus-9f4k2q7x")({
  head: () => ({
    meta: [
      // ROUTE-LEVEL noindex only. The rest of vistaxm.com stays fully indexable.
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "googlebot", content: "noindex, nofollow" },
      { title: `${PROSPECT.company} × VistaXM: a pitch built for you` },
      {
        name: "description",
        content: `Private pitch for ${PROSPECT.company}. Turn your channel into an account-level revenue signal.`,
      },
    ],
  }),
  component: Microsite,
});

/* -------------------------- Hooks ------------------------------------------ */
function useReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".vx-reveal").forEach((el) => el.classList.add("vx-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("vx-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll(".vx-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setN(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const t0 = performance.now();
            const dur = 1400;
            const tick = (now: number) => {
              const p = Math.min(1, (now - t0) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(value * eased);
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  const display = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* -------------------------- Small components -------------------------------- */
function TeamCard({ name, role, photo }: { name: string; role: string; photo: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="vx-team-card vx-reveal">
      <div className="vx-team-photo">
        {failed ? (
          <div className="vx-team-initials">{initials}</div>
        ) : (
          <img src={photo} alt={name} onError={() => setFailed(true)} loading="lazy" />
        )}
      </div>
      <div className="vx-team-name">{name}</div>
      <div className="vx-team-role">{role}</div>
    </div>
  );
}

function Dot({ tone }: { tone: "green" | "amber" | "red" }) {
  return <span className={`vx-dot vx-dot-${tone}`} aria-hidden />;
}

function SectionHead({ eyebrow, title, kicker }: { eyebrow: string; title: string; kicker?: string }) {
  return (
    <div className="vx-sechead vx-reveal">
      <div className="vx-eyebrow">{eyebrow}</div>
      <h2 className="vx-h2">{title}</h2>
      {kicker && <p className="vx-kicker">{kicker}</p>}
    </div>
  );
}

/* -------------------------- Main --------------------------------------------- */
function Microsite() {
  useReveal();
  const [filter, setFilter] = useState<"all" | "case" | "press">("all");
  const filtered = useMemo(
    () => PROSPECT.proof.filter((p) => (filter === "all" ? true : p.kind === filter)),
    [filter],
  );

  return (
    <div className="vx-micro">
      <style dangerouslySetInnerHTML={{ __html: MICROSITE_CSS }} />

      {/* Co-branded sticky header */}
      <MicroHeader />

      {/* Hero */}
      <section id="top" className="vx-hero">
        <div aria-hidden className="vx-hero-dots" />
        <div aria-hidden className="vx-hero-glow" />
        <div className="vx-container vx-hero-grid">
          <div className="vx-hero-copy vx-reveal">
            <div className="vx-eyebrow vx-eyebrow-light">
              A private pitch for {PROSPECT.company}
            </div>
            <h1 className="vx-h1">{PROSPECT.headline}</h1>
            <p className="vx-lede">{PROSPECT.subhead}</p>
            <div className="vx-whatis">
              <div className="vx-whatis-label">What VistaXM is</div>
              <p>
                VistaXM is a Revenue Channel Intelligence company. We run neutral, fully managed
                third-party programs that turn partner and customer experience into account-level
                revenue signals: who's growing, who's walking, and the moves that shift the number.
              </p>
            </div>
          </div>
          {/* Illustrative account signal card */}
          <AccountSignalCard />
        </div>
      </section>

      {/* The opportunity */}
      <section id="opportunity" className="vx-section vx-section-light">
        <div className="vx-container">
          <SectionHead
            eyebrow="The opportunity"
            title={PROSPECT.opportunity.title}
            kicker={PROSPECT.opportunity.body}
          />
          <div className="vx-signal-card vx-reveal">
            <div className="vx-signal-head">
              <span className="vx-eyebrow">Where the signal hides</span>
              <span className="vx-signal-tag">Account-level, not aggregate</span>
            </div>
            <ul className="vx-signal-list">
              {[
                {
                  tone: "green" as const,
                  label: "Partner conviction on top-50 accounts",
                  status: "Rising",
                  note: "Field reports enrichment revenue up 12% QoQ.",
                },
                {
                  tone: "amber" as const,
                  label: "Delivered CX vs. promised CX",
                  status: "Divergence",
                  note: "Two segments trending down, one flat.",
                },
                {
                  tone: "red" as const,
                  label: "Renewal risk in mid-market cohort",
                  status: "At risk",
                  note: "Three named accounts flagged for a joint save motion.",
                },
                {
                  tone: "green" as const,
                  label: "Recommend rate among certified partners",
                  status: "Healthy",
                  note: "Above benchmark, converting to net-new.",
                },
                {
                  tone: "amber" as const,
                  label: "Influencer coverage in target verticals",
                  status: "Gap",
                  note: "Two priority verticals underweighted.",
                },
              ].map((r) => (
                <li key={r.label}>
                  <Dot tone={r.tone} />
                  <div className="vx-signal-body">
                    <div className="vx-signal-line">
                      <span className="vx-signal-label">{r.label}</span>
                      <span className={`vx-status vx-status-${r.tone}`}>{r.status}</span>
                    </div>
                    <div className="vx-signal-note">{r.note}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who's behind this */}
      <section id="who" className="vx-section">
        <div className="vx-container">
          <SectionHead
            eyebrow="Who's behind this"
            title="A neutral third party, run by operators who've done it."
            kicker="VistaXM combines certified measurement, managed operations, and revenue-planning outputs. Not a survey tool: a program."
          />
          <div className="vx-model-grid">
            {[
              {
                t: "Neutral by design",
                b: "We're the third party. Partners and customers tell us the truth they won't tell you.",
              },
              {
                t: "Fully managed",
                b: "We stand up, run, and analyze the program. Your team consumes the brief, not the busywork.",
              },
              {
                t: "Certified NPS + indexes",
                b: "Benchmarked scores, not vanity metrics. You can defend every number.",
              },
              {
                t: "Account-level outputs",
                b: "Named accounts, ranked moves, dollars at stake. Built for RevOps and channel leadership.",
              },
            ].map((c) => (
              <div key={c.t} className="vx-model-card vx-reveal">
                <div className="vx-model-title">{c.t}</div>
                <p>{c.b}</p>
              </div>
            ))}
          </div>

          <div className="vx-team-head vx-reveal">
            <span className="vx-eyebrow">Leadership team</span>
            <h3 className="vx-h3">The people running your program</h3>
          </div>
          <div className="vx-team-grid">
            {TEAM.map((m) => (
              <TeamCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* How we'll do it */}
      <section id="how" className="vx-section vx-section-navy">
        <div className="vx-container">
          <SectionHead
            eyebrow={`How we'll do it for ${PROSPECT.company}`}
            title="Two tracks. One pilot. Ninety days to first insight."
            kicker={PROSPECT.trackEmphasis}
          />
          <div className="vx-track-grid">
            <div className="vx-track-card vx-track-emphasis vx-reveal">
              <div className="vx-track-tag">Track 1 · Pilot</div>
              <h3 className="vx-track-title">Top 50 named accounts</h3>
              <p>
                Neutral field program across your priority accounts and the partners who serve
                them. First brief in 90 days, named accounts ranked by dollars at stake.
              </p>
              <ul className="vx-check-list">
                <li>Certified NPS + conviction index</li>
                <li>Account-level risk and expansion signals</li>
                <li>Ranked moves for your RevOps and channel teams</li>
              </ul>
            </div>
            <div className="vx-track-card vx-reveal">
              <div className="vx-track-tag">Track 2 · Scale</div>
              <h3 className="vx-track-title">Full partner base</h3>
              <p>
                Extends coverage across every partner tier and geo once the pilot proves out.
                Quarterly cadence, program-managed end to end.
              </p>
              <ul className="vx-check-list">
                <li>Segment and persona-level indexes</li>
                <li>Vertical benchmarks and gap analysis</li>
                <li>Board-ready channel-health readout</li>
              </ul>
            </div>
          </div>

          <div className="vx-stats-strip vx-reveal">
            {[
              { v: 90, s: "days to first brief", suffix: "" },
              { v: 50, s: "named accounts in Track 1", suffix: "" },
              { v: 4, s: "waves per year at scale", suffix: "" },
              { v: 100, s: "managed by us, end to end", suffix: "%" },
            ].map((s) => (
              <div key={s.s} className="vx-stat vx-reveal">
                <div className="vx-stat-num">
                  <CountUp value={s.v} suffix={s.suffix} />
                </div>
                <div className="vx-stat-lbl">{s.s}</div>
              </div>
            ))}
          </div>

          <div className="vx-plan">
            {[
              { n: 1, t: "Kickoff", b: "Personas, accounts, questionnaire. Program stood up." },
              { n: 2, t: "Wave in field", b: "We run every touch. You stay off the tools." },
              { n: 3, t: "Analysis + benchmark", b: "Certified scoring, gap identification." },
              { n: 4, t: "Brief lands", b: "Named accounts, ranked moves, dollars at stake." },
            ].map((p) => (
              <div key={p.n} className="vx-plan-step vx-reveal">
                <div className="vx-plan-n">{String(p.n).padStart(2, "0")}</div>
                <div className="vx-plan-t">{p.t}</div>
                <div className="vx-plan-b">{p.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof */}
      <section id="proof" className="vx-section vx-section-light">
        <div className="vx-container">
          <SectionHead
            eyebrow="Proof"
            title="What this looks like in the wild."
            kicker="Named work and independent coverage. Nothing anonymous, nothing hand-waved."
          />
          <div className="vx-filter vx-reveal" role="tablist">
            {(["all", "case", "press"] as const).map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                className={`vx-filter-btn ${filter === f ? "vx-filter-active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f === "case" ? "Case studies" : "Press"}
              </button>
            ))}
          </div>
          <div className="vx-proof-grid">
            {filtered.map((p) => (
              <article key={p.title} className="vx-proof-card vx-reveal">
                <span className={`vx-proof-tag vx-proof-tag-${p.kind}`}>{p.tag}</span>
                <h3 className="vx-proof-title">{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>

          <div className="vx-validate">
            {[
              { v: 74, suffix: "", lbl: "certified NPS across managed programs" },
              { v: 53, prefix: "+", suffix: "%", lbl: "renewal-value protected in Wave 1 pilots" },
              { v: 30, prefix: "+", suffix: "", lbl: "OEM and carrier programs run to date" },
              { v: 2, suffix: "x", lbl: "faster time-to-signal vs. in-house surveying" },
            ].map((s) => (
              <div key={s.lbl} className="vx-validate-item vx-reveal">
                <div className="vx-validate-num">
                  <CountUp value={s.v} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="vx-validate-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you receive */}
      <section id="deliverables" className="vx-section">
        <div className="vx-container">
          <SectionHead
            eyebrow="What you receive"
            title="Deliverables, not dashboards."
            kicker="Every wave produces artifacts your leadership team can act on the same day."
          />
          <div className="vx-deliver-grid">
            {[
              {
                t: "Executive revenue brief",
                b: "Named accounts, ranked moves, dollars at stake. Board-ready.",
              },
              {
                t: "Certified NPS + conviction index",
                b: "Benchmarked, defensible, longitudinal.",
              },
              {
                t: "Account-level risk register",
                b: "Renewal exposure and expansion openings, per account.",
              },
              {
                t: "Partner-facing readout",
                b: "Optional co-branded findings you can share with your top partners.",
              },
              {
                t: "Playbooks for the top three moves",
                b: "Concrete next-step motions for RevOps and channel teams.",
              },
              {
                t: "Quarterly refresh",
                b: "Continuous signal, not a one-time snapshot.",
              },
            ].map((d) => (
              <div key={d.t} className="vx-deliver-card vx-reveal">
                <div className="vx-deliver-check" aria-hidden>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="vx-deliver-title">{d.t}</div>
                <p>{d.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's next */}
      <section id="next" className="vx-section vx-section-navy">
        <div className="vx-container">
          <SectionHead
            eyebrow="What's next"
            title="From this pitch to a Wave 1 pilot."
            kicker="Three steps. Ninety days. Then you have the signal."
          />
          <div className="vx-next-grid">
            <div className="vx-path vx-reveal">
              {[
                { t: "Alignment call", b: "Confirm top-50 accounts and Wave 1 scope. 45 minutes." },
                { t: "Program design", b: "Personas, questionnaire, cadence. Signed SOW." },
                { t: "Kickoff → first brief", b: "90 days to your first named-account readout." },
              ].map((s, i) => (
                <div key={s.t} className="vx-path-step">
                  <div className="vx-path-num">{i + 1}</div>
                  <div>
                    <div className="vx-path-t">{s.t}</div>
                    <div className="vx-path-b">{s.b}</div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="vx-contact vx-reveal">
              <div className="vx-contact-head">
                <div className="vx-contact-avatar" aria-hidden>
                  {PROSPECT.rep.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div>
                  <div className="vx-contact-name">{PROSPECT.rep.name}</div>
                  <div className="vx-contact-title">{PROSPECT.rep.title}</div>
                </div>
              </div>
              <ul className="vx-contact-list">
                <li>{PROSPECT.rep.email}</li>
                <li>{PROSPECT.rep.phone}</li>
              </ul>
              <button type="button" className="vx-btn vx-btn-primary" disabled>
                Book the alignment call
              </button>

              <div className="vx-request">
                <label className="vx-request-label" htmlFor="vx-req">
                  Or leave a note for {PROSPECT.rep.name.split(" ")[0]}
                </label>
                <textarea
                  id="vx-req"
                  className="vx-request-input"
                  rows={3}
                  placeholder="Question, timing, who else should be on the call…"
                />
                <button type="button" className="vx-btn vx-btn-ghost" disabled>
                  Send note
                </button>
              </div>

              <p className="vx-keepshare">
                This page is yours to keep and share with your team.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="vx-foot">
        <div className="vx-container vx-foot-inner">
          <div className="vx-foot-brand">
            <span className="vx-vx">
              VISTA<span className="vx-vx-accent">XM</span>
            </span>
            <span className="vx-foot-sep">×</span>
            <span className="vx-foot-co">{PROSPECT.company}</span>
          </div>
          <div className="vx-foot-meta">
            Private pitch · Not for distribution · © {new Date().getFullYear()} VistaXM
          </div>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------- Header (co-branded) ------------------------------- */
function MicroHeader() {
  const [condensed, setCondensed] = useState(false);
  useEffect(() => {
    const on = () => setCondensed(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const nav: { href: string; label: string }[] = [
    { href: "#opportunity", label: "Opportunity" },
    { href: "#who", label: "Who" },
    { href: "#how", label: "How" },
    { href: "#proof", label: "Proof" },
    { href: "#deliverables", label: "Deliverables" },
    { href: "#next", label: "Next" },
  ];
  return (
    <header className={`vx-header ${condensed ? "vx-header-condensed" : ""}`}>
      <div className="vx-container vx-header-inner">
        <a href="#top" className="vx-brand" aria-label="Top">
          <span className="vx-vx">
            VISTA<span className="vx-vx-accent">XM</span>
          </span>
          <span className="vx-brand-sep" aria-hidden />
          <span className="vx-brand-co">
            <span className="vx-brand-co-mark">{PROSPECT.logoInitial}</span>
            {PROSPECT.company}
          </span>
        </a>
        <nav className="vx-nav">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="vx-nav-link">
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* -------------------------- Account signal card ------------------------------- */
function AccountSignalCard() {
  return (
    <div className="vx-signal-glass vx-reveal">
      <div className="vx-glass-top">
        <span className="vx-glass-tag">Illustrative</span>
        <span className="vx-glass-title">Account signal</span>
      </div>
      <div className="vx-glass-account">
        <div className="vx-glass-acct-mark">N</div>
        <div>
          <div className="vx-glass-acct-name">Northwind Regional</div>
          <div className="vx-glass-acct-meta">Tier-1 partner · West region</div>
        </div>
        <div className="vx-glass-health">
          <div className="vx-glass-score">82</div>
          <div className="vx-glass-score-lbl">Health</div>
        </div>
      </div>
      <div className="vx-glass-risk">
        <span className="vx-glass-risk-lbl">Churn-risk delta</span>
        <span className="vx-glass-risk-val">−14%</span>
        <span className="vx-glass-risk-note">vs. last wave</span>
      </div>
      <div className="vx-glass-bars">
        {[
          { l: "Partner conviction", v: 78 },
          { l: "Delivered CX", v: 64 },
          { l: "Recommend rate", v: 71 },
        ].map((b) => (
          <div key={b.l} className="vx-glass-bar">
            <div className="vx-glass-bar-head">
              <span>{b.l}</span>
              <span className="vx-glass-bar-val">{b.v}</span>
            </div>
            <div className="vx-glass-bar-track">
              <div className="vx-glass-bar-fill" style={{ width: `${b.v}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="vx-glass-next">
        <span className="vx-glass-next-lbl">Next move</span>
        <span className="vx-glass-next-txt">
          Joint QBR on delivery gap; protect $1.2M renewal.
        </span>
      </div>
    </div>
  );
}

/* -------------------------- Scoped stylesheet -------------------------------- */
const MICROSITE_CSS = `
.vx-micro {
  --navy: #022550;
  --navy-2: #032f66;
  --blue: #3185fc;
  --blue-light: #67a6ff;
  --orange: #f68241;
  --ink: #0e1a2b;
  --ink-soft: #4a586b;
  --paper: #ffffff;
  --bg: #f5f8fd;
  --hair: rgba(15, 30, 60, 0.08);
  --hair-dark: rgba(255, 255, 255, 0.12);
  --grad: linear-gradient(90deg, var(--orange), var(--blue));
  --radius: 16px;
  --shadow-1: 0 1px 2px rgba(2, 37, 80, 0.06), 0 4px 12px rgba(2, 37, 80, 0.06);
  --shadow-2: 0 10px 30px rgba(2, 37, 80, 0.12);
  --shadow-3: 0 24px 60px rgba(2, 37, 80, 0.22);
  font-family: 'Roboto', system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif;
  color: var(--ink);
  background: var(--paper);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.vx-micro *, .vx-micro *::before, .vx-micro *::after { box-sizing: border-box; }
.vx-micro img { max-width: 100%; display: block; }
.vx-micro button { font: inherit; cursor: pointer; }
.vx-micro button:disabled { cursor: not-allowed; opacity: 0.75; }

.vx-container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
@media (min-width: 768px) { .vx-container { padding: 0 40px; } }

.vx-reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
.vx-reveal.vx-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .vx-reveal, .vx-reveal.vx-in { opacity: 1; transform: none; transition: none; }
}

/* Header */
.vx-header {
  position: sticky; top: 0; z-index: 50;
  background: var(--navy);
  color: #fff;
  border-bottom: 1px solid transparent;
  transition: background .3s ease, border-color .3s ease, backdrop-filter .3s ease;
}
.vx-header-condensed {
  background: rgba(2, 37, 80, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--hair-dark);
}
.vx-header-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 16px; }
.vx-brand { display: inline-flex; align-items: center; gap: 12px; color: #fff; text-decoration: none; }
.vx-vx { font-weight: 900; letter-spacing: 0.08em; font-size: 0.92rem; }
.vx-vx-accent { color: var(--blue-light); }
.vx-brand-sep { width: 1px; height: 18px; background: var(--hair-dark); display: inline-block; }
.vx-brand-co { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.92rem; color: rgba(255,255,255,0.9); }
.vx-brand-co-mark {
  width: 22px; height: 22px; border-radius: 6px;
  background: linear-gradient(135deg, var(--orange), var(--blue));
  color: #fff; font-weight: 900; font-size: 0.72rem;
  display: inline-flex; align-items: center; justify-content: center;
}
.vx-nav { display: none; gap: 22px; }
@media (min-width: 900px) { .vx-nav { display: flex; } }
.vx-nav-link {
  position: relative; color: rgba(255,255,255,0.72); text-decoration: none;
  font-size: 0.88rem; padding: 4px 0; transition: color .2s ease;
}
.vx-nav-link::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -2px; height: 2px;
  background: var(--blue-light); border-radius: 2px;
  transform: scaleX(0); transform-origin: left; transition: transform .3s cubic-bezier(.22,1,.36,1);
}
.vx-nav-link:hover { color: #fff; }
.vx-nav-link:hover::after { transform: scaleX(1); }

/* Typography */
.vx-eyebrow {
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--orange); display: inline-block;
}
.vx-eyebrow-light { color: var(--blue-light); }
.vx-h1 {
  font-size: clamp(2rem, 4.2vw, 3.2rem); font-weight: 900; line-height: 1.08;
  letter-spacing: -0.02em; margin: 14px 0 20px; color: #fff;
}
.vx-h2 {
  font-size: clamp(1.5rem, 2.8vw, 2.15rem); font-weight: 900; line-height: 1.15;
  letter-spacing: -0.015em; margin: 10px 0 12px; color: inherit;
}
.vx-h3 { font-size: 1.15rem; font-weight: 700; margin: 4px 0 0; letter-spacing: -0.01em; }
.vx-lede { font-size: 1.08rem; color: rgba(255,255,255,0.82); max-width: 640px; }
.vx-kicker { color: var(--ink-soft); max-width: 720px; margin: 0; font-size: 1.02rem; }

/* Hero */
.vx-hero {
  position: relative; overflow: hidden;
  background:
    radial-gradient(circle at 20% 30%, rgba(103,166,255,0.18), transparent 55%),
    linear-gradient(180deg, var(--navy) 0%, #011a3b 100%);
  color: #fff;
  padding: 72px 0 88px;
}
.vx-hero-dots {
  position: absolute; inset: -20% -10% -10% -10%;
  background-image: radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px);
  background-size: 22px 22px;
  opacity: 0.35; pointer-events: none;
  animation: vx-drift 40s linear infinite;
}
@media (prefers-reduced-motion: reduce) { .vx-hero-dots { animation: none; } }
@keyframes vx-drift { from { transform: translate3d(0,0,0); } to { transform: translate3d(-22px,-22px,0); } }
.vx-hero-glow {
  position: absolute; right: -160px; top: -120px; width: 560px; height: 560px;
  background: radial-gradient(circle, rgba(246,130,65,0.18), transparent 65%);
  pointer-events: none;
}
.vx-hero-grid { position: relative; display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
@media (min-width: 960px) { .vx-hero-grid { grid-template-columns: 1.15fr 1fr; gap: 60px; } }
.vx-whatis {
  margin-top: 28px; border-left: 3px solid var(--orange);
  background: rgba(255,255,255,0.04); border-radius: 0 12px 12px 0;
  padding: 14px 18px;
}
.vx-whatis-label {
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--blue-light); margin-bottom: 6px;
}
.vx-whatis p { margin: 0; color: rgba(255,255,255,0.85); font-size: 0.98rem; }

/* Account signal glass card */
.vx-signal-glass {
  position: relative;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
  border: 1px solid rgba(255,255,255,0.14);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  padding: 22px;
  box-shadow: var(--shadow-3);
  color: #fff;
  overflow: hidden;
}
.vx-signal-glass::before {
  content: ''; position: absolute; inset: 0 0 auto 0; height: 3px;
  background: var(--grad);
}
.vx-glass-top { display: flex; justify-content: space-between; align-items: center; }
.vx-glass-tag {
  font-size: 0.65rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
  padding: 3px 8px; border-radius: 999px;
  background: rgba(246,130,65,0.15); color: var(--orange);
  border: 1px solid rgba(246,130,65,0.35);
}
.vx-glass-title { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.6); }
.vx-glass-account { display: grid; grid-template-columns: auto 1fr auto; gap: 12px; align-items: center; margin-top: 18px; padding-bottom: 18px; border-bottom: 1px solid var(--hair-dark); }
.vx-glass-acct-mark {
  width: 42px; height: 42px; border-radius: 12px;
  background: linear-gradient(135deg, var(--blue), var(--blue-light));
  color: #fff; display: inline-flex; align-items: center; justify-content: center;
  font-weight: 900;
}
.vx-glass-acct-name { font-weight: 700; font-size: 1rem; }
.vx-glass-acct-meta { font-size: 0.8rem; color: rgba(255,255,255,0.6); }
.vx-glass-health { text-align: right; }
.vx-glass-score { font-size: 1.8rem; font-weight: 900; color: var(--blue-light); line-height: 1; }
.vx-glass-score-lbl { font-size: 0.7rem; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.08em; }
.vx-glass-risk {
  display: flex; align-items: baseline; gap: 8px; margin: 14px 0 4px;
  font-size: 0.82rem;
}
.vx-glass-risk-lbl { color: rgba(255,255,255,0.6); }
.vx-glass-risk-val { color: #7ee29a; font-weight: 800; font-size: 1rem; }
.vx-glass-risk-note { color: rgba(255,255,255,0.5); }
.vx-glass-bars { margin-top: 14px; display: grid; gap: 12px; }
.vx-glass-bar-head { display: flex; justify-content: space-between; font-size: 0.82rem; color: rgba(255,255,255,0.8); margin-bottom: 6px; }
.vx-glass-bar-val { color: #fff; font-weight: 700; }
.vx-glass-bar-track { height: 6px; border-radius: 999px; background: rgba(255,255,255,0.1); overflow: hidden; }
.vx-glass-bar-fill { height: 100%; background: linear-gradient(90deg, var(--blue), var(--blue-light)); border-radius: 999px; }
.vx-glass-next {
  margin-top: 18px; padding: 12px 14px; border-radius: 12px;
  background: rgba(49,133,252,0.14); border: 1px solid rgba(49,133,252,0.28);
  display: flex; flex-direction: column; gap: 2px;
}
.vx-glass-next-lbl { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue-light); }
.vx-glass-next-txt { font-size: 0.92rem; }

/* Generic sections */
.vx-section { padding: 88px 0; background: var(--paper); }
.vx-section-light { background: var(--bg); }
.vx-section-navy {
  background: linear-gradient(180deg, #022550 0%, #011a3b 100%);
  color: #fff;
}
.vx-section-navy .vx-kicker { color: rgba(255,255,255,0.72); }
.vx-section-navy .vx-eyebrow { color: var(--orange); }
.vx-sechead { max-width: 780px; margin-bottom: 44px; }

/* Signal card (opportunity) */
.vx-signal-card {
  background: #fff; border-radius: 20px; border: 1px solid var(--hair);
  box-shadow: var(--shadow-2); padding: 28px; position: relative; overflow: hidden;
}
.vx-signal-card::before {
  content: ''; position: absolute; inset: 0 0 auto 0; height: 3px; background: var(--grad);
}
.vx-signal-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; }
.vx-signal-tag {
  font-size: 0.72rem; padding: 4px 10px; border-radius: 999px;
  background: rgba(49,133,252,0.1); color: var(--blue); font-weight: 600;
}
.vx-signal-list { list-style: none; padding: 0; margin: 8px 0 0; }
.vx-signal-list li { display: grid; grid-template-columns: 14px 1fr; gap: 14px; align-items: start; padding: 14px 0; border-top: 1px solid var(--hair); }
.vx-signal-list li:first-child { border-top: 0; }
.vx-dot { width: 10px; height: 10px; border-radius: 999px; margin-top: 8px; display: inline-block; }
.vx-dot-green { background: #21b26f; box-shadow: 0 0 0 4px rgba(33,178,111,0.15); }
.vx-dot-amber { background: #f5a524; box-shadow: 0 0 0 4px rgba(245,165,36,0.15); }
.vx-dot-red { background: #e5484d; box-shadow: 0 0 0 4px rgba(229,72,77,0.15); }
.vx-signal-line { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.vx-signal-label { font-weight: 600; color: var(--ink); }
.vx-status { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
.vx-status-green { color: #16794a; }
.vx-status-amber { color: #a35a00; }
.vx-status-red { color: #a41d21; }
.vx-signal-note { font-size: 0.9rem; color: var(--ink-soft); margin-top: 2px; }

/* Model cards */
.vx-model-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 56px; }
@media (min-width: 640px) { .vx-model-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .vx-model-grid { grid-template-columns: repeat(4, 1fr); } }
.vx-model-card {
  background: #fff; border: 1px solid var(--hair); border-radius: 16px;
  padding: 22px; box-shadow: var(--shadow-1);
  transition: transform .3s ease, box-shadow .3s ease;
  position: relative; overflow: hidden;
}
.vx-model-card::before {
  content: ''; position: absolute; inset: 0 0 auto 0; height: 2px;
  background: var(--grad); opacity: 0.7;
}
.vx-model-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-2); }
.vx-model-title { font-weight: 700; color: var(--navy); margin-bottom: 8px; }
.vx-model-card p { margin: 0; color: var(--ink-soft); font-size: 0.94rem; }

/* Team */
.vx-team-head { margin-bottom: 24px; }
.vx-team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
@media (min-width: 640px) { .vx-team-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 900px) { .vx-team-grid { grid-template-columns: repeat(5, 1fr); } }
.vx-team-card {
  background: #fff; border: 1px solid var(--hair); border-radius: 16px;
  padding: 18px; text-align: center; transition: transform .3s ease, box-shadow .3s ease;
}
.vx-team-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-2); }
.vx-team-photo {
  width: 88px; height: 88px; border-radius: 50%; margin: 0 auto 12px;
  overflow: hidden; background: linear-gradient(135deg, var(--blue), var(--blue-light));
  display: flex; align-items: center; justify-content: center;
}
.vx-team-photo img { width: 100%; height: 100%; object-fit: cover; }
.vx-team-initials { color: #fff; font-weight: 900; font-size: 1.5rem; }
.vx-team-name { font-weight: 700; color: var(--navy); font-size: 0.98rem; }
.vx-team-role { font-size: 0.82rem; color: var(--ink-soft); margin-top: 2px; }

/* Tracks */
.vx-track-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media (min-width: 900px) { .vx-track-grid { grid-template-columns: 1.15fr 1fr; } }
.vx-track-card {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px; padding: 28px; color: #fff; position: relative; overflow: hidden;
}
.vx-track-emphasis {
  background: linear-gradient(180deg, rgba(49,133,252,0.14), rgba(49,133,252,0.05));
  border-color: rgba(103,166,255,0.35);
}
.vx-track-emphasis::before {
  content: ''; position: absolute; inset: 0 0 auto 0; height: 3px; background: var(--grad);
}
.vx-track-tag {
  display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--blue-light); margin-bottom: 8px;
}
.vx-track-title { font-size: 1.4rem; font-weight: 800; margin: 0 0 10px; }
.vx-track-card p { color: rgba(255,255,255,0.78); margin: 0 0 16px; }
.vx-check-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
.vx-check-list li {
  padding-left: 22px; position: relative; color: rgba(255,255,255,0.9); font-size: 0.94rem;
}
.vx-check-list li::before {
  content: ''; position: absolute; left: 0; top: 8px;
  width: 12px; height: 8px; border-left: 2px solid var(--orange); border-bottom: 2px solid var(--orange);
  transform: rotate(-45deg);
}

/* Stats strip */
.vx-stats-strip {
  margin-top: 40px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
  padding: 24px; border-radius: 20px;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
}
@media (min-width: 720px) { .vx-stats-strip { grid-template-columns: repeat(4, 1fr); } }
.vx-stat { text-align: center; }
.vx-stat-num { font-size: 1.8rem; font-weight: 900; color: var(--blue-light); }
.vx-stat-lbl { font-size: 0.85rem; color: rgba(255,255,255,0.72); margin-top: 4px; }

/* Plan */
.vx-plan { margin-top: 40px; display: grid; grid-template-columns: 1fr; gap: 14px; }
@media (min-width: 720px) { .vx-plan { grid-template-columns: repeat(4, 1fr); } }
.vx-plan-step {
  padding: 20px; border-radius: 14px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
}
.vx-plan-n { font-size: 0.85rem; font-weight: 900; color: var(--orange); letter-spacing: 0.08em; }
.vx-plan-t { font-weight: 700; margin-top: 6px; color: #fff; }
.vx-plan-b { font-size: 0.9rem; color: rgba(255,255,255,0.7); margin-top: 4px; }

/* Proof filters + cards */
.vx-filter { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
.vx-filter-btn {
  border: 1px solid var(--hair); background: #fff; color: var(--ink-soft);
  padding: 8px 14px; border-radius: 999px; font-size: 0.85rem; font-weight: 600;
  transition: all .2s ease;
}
.vx-filter-btn:hover { border-color: var(--blue); color: var(--blue); }
.vx-filter-active { background: var(--navy); color: #fff; border-color: var(--navy); }
.vx-filter-active:hover { background: var(--navy); color: #fff; }
.vx-proof-grid { display: grid; grid-template-columns: 1fr; gap: 18px; }
@media (min-width: 720px) { .vx-proof-grid { grid-template-columns: 1fr 1fr; } }
.vx-proof-card {
  background: #fff; border: 1px solid var(--hair); border-radius: 16px;
  padding: 22px; box-shadow: var(--shadow-1);
  transition: transform .3s ease, box-shadow .3s ease;
}
.vx-proof-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-2); }
.vx-proof-tag {
  display: inline-block; font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
  text-transform: uppercase; padding: 3px 9px; border-radius: 999px; margin-bottom: 10px;
}
.vx-proof-tag-case { background: rgba(49,133,252,0.12); color: var(--blue); }
.vx-proof-tag-press { background: rgba(246,130,65,0.14); color: var(--orange); }
.vx-proof-title { font-size: 1.05rem; font-weight: 700; margin: 0 0 8px; color: var(--navy); }
.vx-proof-card p { margin: 0; color: var(--ink-soft); font-size: 0.94rem; }

/* Validation strip */
.vx-validate {
  margin-top: 40px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
  padding: 28px; border-radius: 20px; background: #fff; border: 1px solid var(--hair);
  box-shadow: var(--shadow-1);
}
@media (min-width: 720px) { .vx-validate { grid-template-columns: repeat(4, 1fr); } }
.vx-validate-item { text-align: center; }
.vx-validate-num { font-size: 2rem; font-weight: 900; color: var(--navy); }
.vx-validate-lbl { font-size: 0.85rem; color: var(--ink-soft); margin-top: 4px; }

/* Deliverables */
.vx-deliver-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 640px) { .vx-deliver-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .vx-deliver-grid { grid-template-columns: repeat(3, 1fr); } }
.vx-deliver-card {
  background: #fff; border: 1px solid var(--hair); border-radius: 16px;
  padding: 22px; box-shadow: var(--shadow-1);
  transition: transform .3s ease, box-shadow .3s ease;
}
.vx-deliver-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-2); }
.vx-deliver-check {
  width: 32px; height: 32px; border-radius: 10px;
  background: linear-gradient(135deg, var(--blue), var(--blue-light));
  color: #fff; display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 12px;
}
.vx-deliver-title { font-weight: 700; color: var(--navy); margin-bottom: 6px; }
.vx-deliver-card p { margin: 0; color: var(--ink-soft); font-size: 0.94rem; }

/* Next section */
.vx-next-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 900px) { .vx-next-grid { grid-template-columns: 1.15fr 1fr; align-items: start; } }
.vx-path {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px; padding: 28px; display: grid; gap: 20px;
}
.vx-path-step { display: grid; grid-template-columns: 44px 1fr; gap: 14px; align-items: start; }
.vx-path-num {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, var(--orange), var(--blue));
  color: #fff; font-weight: 900; display: inline-flex; align-items: center; justify-content: center;
}
.vx-path-t { font-weight: 700; color: #fff; }
.vx-path-b { color: rgba(255,255,255,0.75); font-size: 0.94rem; margin-top: 2px; }

.vx-contact {
  background: #fff; color: var(--ink); border-radius: 20px; padding: 24px;
  box-shadow: var(--shadow-3); border: 1px solid var(--hair); position: relative; overflow: hidden;
}
.vx-contact::before {
  content: ''; position: absolute; inset: 0 0 auto 0; height: 3px; background: var(--grad);
}
.vx-contact-head { display: flex; align-items: center; gap: 12px; }
.vx-contact-avatar {
  width: 46px; height: 46px; border-radius: 50%;
  background: linear-gradient(135deg, var(--blue), var(--navy));
  color: #fff; font-weight: 900; display: inline-flex; align-items: center; justify-content: center;
}
.vx-contact-name { font-weight: 700; color: var(--navy); }
.vx-contact-title { font-size: 0.85rem; color: var(--ink-soft); }
.vx-contact-list { list-style: none; padding: 0; margin: 14px 0 18px; display: grid; gap: 4px; font-size: 0.92rem; color: var(--ink-soft); }

.vx-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 18px; border-radius: 999px; font-weight: 700; font-size: 0.9rem;
  border: 1px solid transparent; transition: transform .2s ease, box-shadow .2s ease;
  width: 100%;
}
.vx-btn-primary { background: var(--orange); color: #fff; box-shadow: 0 6px 16px rgba(246,130,65,0.35); }
.vx-btn-primary:hover:not(:disabled) { transform: translateY(-1px); }
.vx-btn-ghost { background: transparent; color: var(--navy); border-color: var(--hair); margin-top: 8px; }
.vx-btn-ghost:hover:not(:disabled) { border-color: var(--navy); }

.vx-request { margin-top: 18px; padding-top: 18px; border-top: 1px solid var(--hair); }
.vx-request-label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--navy); margin-bottom: 6px; }
.vx-request-input {
  width: 100%; border: 1px solid var(--hair); border-radius: 12px; padding: 10px 12px;
  font-family: inherit; font-size: 0.92rem; color: var(--ink); background: #fafcff;
  resize: vertical;
}
.vx-request-input:focus { outline: none; border-color: var(--blue); box-shadow: 0 0 0 3px rgba(49,133,252,0.15); }
.vx-keepshare {
  margin: 18px 0 0; font-size: 0.82rem; color: var(--ink-soft); font-style: italic;
  text-align: center; padding-top: 14px; border-top: 1px dashed var(--hair);
}

/* Footer */
.vx-foot { background: #011a3b; color: rgba(255,255,255,0.7); padding: 32px 0; }
.vx-foot-inner { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; }
.vx-foot-brand { display: inline-flex; align-items: center; gap: 12px; color: #fff; }
.vx-foot-sep { color: rgba(255,255,255,0.4); }
.vx-foot-co { font-weight: 600; }
.vx-foot-meta { font-size: 0.82rem; color: rgba(255,255,255,0.55); }
`;
