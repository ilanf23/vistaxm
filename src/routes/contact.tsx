import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Hero, Section } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Book a 30-minute conversation | VistaXM" },
      { name: "description", content: "Talk to VistaXM about Revenue Channel Intelligence, PartnerPulse, or BrokerPulse. Salt Lake City, Utah. sales@vistaxm.com. (801) 502-4841." },
      { property: "og:title", content: "Contact VistaXM" },
      { property: "og:description", content: "Book a 30-minute conversation." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`VistaXM inquiry — ${fd.get("company") || fd.get("name") || ""}`);
    const body = encodeURIComponent(
      `Name: ${fd.get("name")}\nCompany: ${fd.get("company")}\nRole: ${fd.get("role")}\nEmail: ${fd.get("email")}\nPhone: ${fd.get("phone") || ""}\nInterest: ${fd.get("interest")}\n\nMessage:\n${fd.get("message")}`
    );
    window.location.href = `mailto:sales@vistaxm.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <>
      <Hero
        eyebrow="Contact"
        title="See where your revenue is hiding."
        subtitle="Tell us about your channel or book of business. We'll come back with a 30-minute conversation — and a candid view of whether a Rapid Diagnostic makes sense for you."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={onSubmit} className="rounded-2xl border border-[color:var(--gray-line)] p-8 bg-white grid gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field name="name" label="Name" required />
              <Field name="company" label="Company" required />
              <Field name="role" label="Role / Title" />
              <Field name="email" label="Work email" type="email" required />
              <Field name="phone" label="Phone (optional)" type="tel" />
              <div>
                <label className="block text-sm font-semibold text-[color:var(--navy-deep)] mb-1.5">Primary interest</label>
                <select name="interest" required defaultValue="" className="w-full rounded-lg border border-[color:var(--gray-line)] bg-white px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]">
                  <option value="" disabled>Choose one</option>
                  <option>PartnerPulse (OEM / channel)</option>
                  <option>BrokerPulse (insurance carrier)</option>
                  <option>Rapid Diagnostic</option>
                  <option>RCI Essentials</option>
                  <option>Managed Program</option>
                  <option>Something else</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[color:var(--navy-deep)] mb-1.5">Message</label>
              <textarea name="message" rows={5} required maxLength={2000} className="w-full rounded-lg border border-[color:var(--gray-line)] bg-white px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]" placeholder="What's the channel or book look like? What's the revenue question?" />
            </div>
            <button type="submit" className="btn-primary justify-self-start">Send to sales@vistaxm.com</button>
            {submitted && <p className="text-sm text-[color:var(--blue-link)]">Opening your email client… If nothing happens, email us directly at sales@vistaxm.com.</p>}
          </form>

          <aside className="rounded-2xl bg-[color:var(--navy-deep)] text-white p-8">
            <h3 className="!text-white !text-2xl">Direct lines</h3>
            <ul className="mt-6 space-y-4 text-white/90">
              <li>
                <div className="text-xs uppercase tracking-widest text-[color:var(--blue-light)]">Email</div>
                <a className="text-white text-lg" href="mailto:sales@vistaxm.com">sales@vistaxm.com</a>
              </li>
              <li>
                <div className="text-xs uppercase tracking-widest text-[color:var(--blue-light)]">Phone</div>
                <a className="text-white text-lg" href="tel:+18015024841">(801) 502-4841</a>
              </li>
              <li>
                <div className="text-xs uppercase tracking-widest text-[color:var(--blue-light)]">HQ</div>
                <div className="text-white text-lg">Salt Lake City, Utah</div>
              </li>
            </ul>
            <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/70">
              For investors and press, please email and we'll route you.
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-[color:var(--navy-deep)] mb-1.5">{label}{required && <span className="text-[color:var(--orange-pop)]"> *</span>}</label>
      <input id={name} name={name} type={type} required={required} maxLength={200} className="w-full rounded-lg border border-[color:var(--gray-line)] bg-white px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)]" />
    </div>
  );
}
