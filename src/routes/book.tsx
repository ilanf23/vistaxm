import { type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BOOK_A_CALL_URL } from "@/lib/links";
import { canonicalLink } from "@/lib/seo";
import { PageHero, Section, SectionHead, Reveal } from "@/components/site";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Call | VistaXM" },
      {
        name: "description",
        content:
          "Thirty minutes to see what the signal looks like in your accounts, and whether there is a fit. No obligation.",
      },
      { property: "og:title", content: "Book a Call | VistaXM" },
      {
        property: "og:description",
        content:
          "A thirty-minute conversation: how Revenue Channel Intelligence applies to your book of business, a sample readout, and a clear next step.",
      },
    ],
    links: [canonicalLink("/book")],
  }),
  component: BookACall,
});

/* ---------------- Local elements (route-scoped) ---------------- */

function CheckGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

function ClockGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const EXPECTATIONS: { title: string; body: string }[] = [
  {
    title: "How the model applies to you",
    body: "A look at how Revenue Channel Intelligence applies to your channel or book of business.",
  },
  {
    title: "A sample readout",
    body: "A walk through a sample readout.",
  },
  {
    title: "An honest next step",
    body: "A clear next step if it makes sense, and an honest no if it does not.",
  },
];

function ExpectationList() {
  return (
    <Stagger className="mt-8 grid gap-4">
      {EXPECTATIONS.map((item, i) => (
        <StaggerItem key={item.title}>
          <div className="flex gap-4 rounded-2xl hairline bg-white p-5 md:p-6">
            <span
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]"
              aria-hidden="true"
            >
              <span
                className="text-sm font-semibold tabular-nums"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {i + 1}
              </span>
            </span>
            <div>
              <h3 className="!text-base !font-semibold text-[color:var(--navy-deep)]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-[color:var(--ink-soft)]">
                {item.body}
              </p>
            </div>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/* The live scheduler (Microsoft Bookings) blocks third-party iframe embedding
   via a frame-ancestors CSP, so we hand off to it in a new tab rather than
   showing a blank inline calendar. */
function BookingLaunch() {
  return (
    <div className="overflow-hidden rounded-2xl hairline bg-white shadow-[var(--shadow-elevation-2)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--hairline)] px-5 py-4 md:px-7">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-[color:var(--navy-deep)]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]">
            <ClockGlyph className="h-4 w-4" />
          </span>
          Pick a time
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]/60">
          <span className="h-2 w-2 rounded-full bg-[color:var(--blue-cta)]" />
          30 minutes
        </span>
      </div>

      <div className="bg-white">
        <iframe
          src={BOOK_A_CALL_URL}
          title="VistaXM booking calendar"
          className="block h-[900px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--hairline)] bg-[color:var(--blue-tint)] px-5 py-3 text-sm font-medium text-[color:var(--navy-deep)] md:px-7">
        <span className="inline-flex items-center gap-2">
          <CheckGlyph className="h-4 w-4 flex-none text-[color:var(--blue-cta)]" />
          Calendar not loading?{" "}
          <a
            href={BOOK_A_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[color:var(--blue-link)] transition-colors hover:text-[color:var(--blue-cta)]"
          >
            Open it in a new tab
          </a>
        </span>
        <a
          href="mailto:sales@vistaxm.com"
          className="font-semibold text-[color:var(--blue-link)] transition-colors hover:text-[color:var(--blue-cta)]"
        >
          sales@vistaxm.com
        </a>
      </div>
    </div>
  );
}

function EmailGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

function PhoneGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5V20a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function PinGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4 py-5">
      <span
        className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-[color:var(--blue-link)]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="eyebrow mb-1">{label}</div>
        {href ? (
          <a
            href={href}
            className="text-lg font-semibold text-[color:var(--navy-deep)] transition-colors hover:text-[color:var(--blue-link)]"
          >
            {value}
          </a>
        ) : (
          <span className="text-lg font-semibold text-[color:var(--navy-deep)]">{value}</span>
        )}
      </div>
    </div>
  );
}

function BookACall() {
  return (
    <>
      <PageHero
        eyebrow="Book a call"
        title="See where your revenue is hiding."
        subtitle="Thirty minutes. We will show you what the signal looks like in your accounts, and whether there is a fit. No obligation."
        primary={null}
      />

      {/* What to expect + scheduling */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHead
              eyebrow="The conversation"
              title="What to expect."
              intro="A working session, not a pitch. We come prepared, we are direct, and we respect your time."
            />
            <ExpectationList />
          </div>

          <FadeIn delay={120}>
            <BookingLaunch />
          </FadeIn>
        </div>
      </Section>

      {/* Contact band */}
      <Section tint>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHead
              eyebrow="Reach us directly"
              title="Prefer to start a conversation another way?"
              intro="Email or call. A real person on our team will pick it up."
            />
            <Reveal delay={80}>
              <div className="img-editorial-soft img-frame mt-8 aspect-[4/3] w-full">
                <img
                  src="/images/ambient/on-a-call.jpg"
                  alt="A member of the team taking a call at their desk"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="rounded-2xl hairline bg-white p-7 shadow-[var(--shadow-elevation-2)] md:p-9">
              <div className="divide-y divide-[color:var(--hairline)]">
                <ContactRow
                  icon={<EmailGlyph className="h-5 w-5" />}
                  label="Email"
                  value="sales@vistaxm.com"
                  href="mailto:sales@vistaxm.com"
                />
                <ContactRow
                  icon={<PhoneGlyph className="h-5 w-5" />}
                  label="Phone"
                  value="(801) 502-4841"
                  href="tel:+18015024841"
                />
                <ContactRow
                  icon={<PinGlyph className="h-5 w-5" />}
                  label="Location"
                  value="Salt Lake City, Utah"
                />
              </div>

              <div className="mt-6 flex items-center gap-2.5 rounded-xl bg-[color:var(--blue-tint)] px-4 py-3 text-sm font-medium text-[color:var(--navy-deep)]">
                <CheckGlyph className="h-4 w-4 flex-none text-[color:var(--blue-cta)]" />
                One business day response. No marketing list.
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
