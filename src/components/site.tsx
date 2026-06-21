import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Hero({ eyebrow, title, subtitle, primary, secondary, children }: {
  eyebrow?: string; title: ReactNode; subtitle?: ReactNode;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--navy-deep)] text-white">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(800px 400px at 85% -10%, #3185fc 0%, transparent 60%), radial-gradient(600px 300px at 0% 100%, #0056a7 0%, transparent 60%)",
        }}
      />
      <div className="container-x relative py-20 md:py-28">
        <div className="max-w-3xl">
          {eyebrow && <div className="eyebrow !text-[color:var(--blue-light)] mb-5">{eyebrow}</div>}
          <h1 className="!text-white">{title}</h1>
          {subtitle && <p className="mt-5 text-lg md:text-xl text-white/80 max-w-2xl">{subtitle}</p>}
          {(primary || secondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primary && <Link to={primary.to} className="btn-primary">{primary.label}</Link>}
              {secondary && <Link to={secondary.to} className="btn-secondary">{secondary.label}</Link>}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

export function Section({ children, className = "", tint = false, dark = false }: {
  children: ReactNode; className?: string; tint?: boolean; dark?: boolean;
}) {
  const bg = dark ? "bg-[color:var(--navy-deep)] text-white" : tint ? "bg-[color:var(--blue-tint)]" : "bg-white";
  return (
    <section className={`${bg} py-20 md:py-24 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, center = false, dark = false }: {
  eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean; dark?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className={dark ? "!text-white" : ""}>{title}</h2>
      {intro && <p className={`mt-5 text-lg ${dark ? "text-white/80" : "text-[color:var(--ink-soft)]"}`}>{intro}</p>}
    </div>
  );
}

export function CTABand() {
  return (
    <section className="bg-[color:var(--navy)] text-white">
      <div className="container-x py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="!text-white !text-3xl md:!text-4xl">See where your revenue is hiding.</h2>
          <p className="mt-2 text-white/80">Book a 30-minute conversation.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="btn-primary">Book a 30-minute conversation</Link>
          <Link to="/offers" className="btn-secondary">Start with a Rapid Diagnostic</Link>
        </div>
      </div>
    </section>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--gray-line)] bg-white p-6 shadow-[0_1px_0_rgba(2,37,80,0.04)]">
      <div className="text-3xl md:text-4xl font-bold text-[color:var(--navy-deep)]">{value}</div>
      <div className="mt-2 text-sm text-[color:var(--ink-soft)] leading-relaxed">{label}</div>
    </div>
  );
}

export function Card({ title, children, kicker }: { title: string; children: ReactNode; kicker?: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--gray-line)] bg-white p-7 h-full">
      {kicker && <div className="eyebrow mb-3">{kicker}</div>}
      <h3 className="!text-xl">{title}</h3>
      <div className="mt-3 text-[color:var(--ink-soft)]">{children}</div>
    </div>
  );
}

export function JourneyMatrix() {
  const stages = ["Sales", "Procurement & Onboarding", "Implementation", "Support & Operations", "Renewal & Expansion"];
  const personas = ["Executive / Decision Maker", "Technical", "Procurement / Commercial", "Operations / Day-to-Day User"];
  return (
    <div className="overflow-x-auto rounded-xl border border-[color:var(--gray-line)] bg-white">
      <table className="w-full text-sm min-w-[720px]">
        <thead>
          <tr>
            <th className="p-4 text-left text-[color:var(--navy-deep)] bg-[color:var(--blue-tint)] sticky left-0 z-10">Persona ↓ / Journey →</th>
            {stages.map(s => (
              <th key={s} className="p-4 text-left font-semibold text-[color:var(--navy-deep)] bg-[color:var(--blue-tint)]">{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {personas.map((p, i) => (
            <tr key={p} className="border-t border-[color:var(--gray-line)]">
              <td className="p-4 font-semibold text-[color:var(--navy-deep)] bg-white sticky left-0 z-10">{p}</td>
              {stages.map((s, j) => {
                const highlight = i === 3 && j === 4;
                return (
                  <td key={s} className="p-3">
                    <div
                      className={`h-10 rounded-md flex items-center justify-center text-xs font-medium ${
                        highlight
                          ? "bg-[color:var(--orange-pop)] text-white"
                          : "bg-[color:var(--blue-pale)]/60 text-[color:var(--navy-deep)]"
                      }`}
                      title={`${p} × ${s}`}
                    >
                      {highlight ? "Early warning" : "Signal"}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
