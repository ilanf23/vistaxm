import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type BookCallContextValue = {
  open: (source?: string) => void;
  close: () => void;
};

const BookCallContext = createContext<BookCallContextValue | null>(null);

// Drop in your real Calendly / Chili Piper link here.
const CALENDAR_URL =
  "https://calendly.com/d/cmtb-jwq-ngn/30-minute-meeting?hide_event_type_details=1&hide_gdpr_banner=1";

export function BookCallProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>(undefined);

  const open = useCallback((s?: string) => {
    setSource(s);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <BookCallContext.Provider value={value}>
      {children}
      {isOpen && <BookCallModal source={source} onClose={close} />}
    </BookCallContext.Provider>
  );
}

export function useBookCall() {
  const ctx = useContext(BookCallContext);
  if (!ctx) throw new Error("useBookCall must be used within BookCallProvider");
  return ctx;
}

export function BookCallButton({
  variant = "primary",
  source,
  className = "",
  children = "Book a 30-minute call",
}: {
  variant?: "primary" | "secondary" | "secondary-dark" | "ghost" | "nav";
  source?: string;
  className?: string;
  children?: ReactNode;
}) {
  const { open } = useBookCall();
  const cls =
    variant === "nav"
      ? `inline-flex items-center gap-2 rounded-lg bg-[color:var(--blue-cta)] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(49,133,252,0.6)] hover:bg-[color:var(--blue-link)] transition-all hover:-translate-y-px ${className}`
      : variant === "secondary"
        ? `btn-secondary ${className}`
        : variant === "secondary-dark"
          ? `btn-secondary-dark ${className}`
          : variant === "ghost"
            ? `btn-ghost ${className}`
            : `btn-primary ${className}`;
  return (
    <button type="button" className={cls} onClick={() => open(source)}>
      {children}
      {variant !== "ghost" && variant !== "nav" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
}

function BookCallModal({ source, onClose }: { source?: string; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book a 30-minute call with VistaXM"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-[fade-in_.18s_ease-out]"
    >
      <div
        className="absolute inset-0 bg-[color:var(--navy-deep)]/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl grid md:grid-cols-[1fr_1.4fr]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking dialog"
          className="absolute right-3 top-3 z-10 rounded-full p-2 text-[color:var(--ink-soft)] hover:bg-[color:var(--blue-tint)]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Left: context + proof */}
        <div className="hidden md:flex flex-col justify-between bg-[color:var(--navy-deep)] text-white p-8 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-24 -left-16 h-72 w-72 rounded-full opacity-50"
            style={{ background: "radial-gradient(circle, rgba(49,133,252,0.45), transparent 70%)" }}
          />
          <div className="relative">
            <div className="eyebrow !text-[color:var(--blue-light)] mb-3">30 minutes · no obligation</div>
            <h3 className="!text-white !text-2xl leading-tight">
              See where revenue is about to grow or walk in your channel.
            </h3>
            <p className="mt-4 text-sm text-white/75 leading-relaxed">
              A working session with the VistaXM team. We share a redacted Revenue Channel Intelligence
              view from a comparable company, then walk your specific accounts.
            </p>
          </div>
          <div className="relative mt-8 space-y-4 text-sm">
            <div className="rounded-xl border border-white/12 bg-white/5 p-4">
              <div className="text-white font-semibold">Softchoice</div>
              <div className="text-white/70 mt-1">
                +8 NPS over 2 years · $8.4M impact · 4% lower churn · 10% higher win rates.
              </div>
            </div>
            <div className="rounded-xl border border-white/12 bg-white/5 p-4">
              <div className="text-white font-semibold">Veeam</div>
              <div className="text-white/70 mt-1">NPS 30 to 73 alongside 27% YoY growth.</div>
            </div>
          </div>
        </div>

        {/* Right: calendar or fallback */}
        <div className="overflow-y-auto max-h-[92vh]">
          {submitted ? (
            <div className="p-10 text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-[color:var(--blue-tint)] flex items-center justify-center text-[color:var(--blue-cta)]">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </div>
              <h3 className="mt-5 !text-xl">Thanks. We'll be in touch.</h3>
              <p className="mt-3 text-[color:var(--ink-soft)] text-sm">
                A VistaXM team member will reach out within one business day to schedule.
              </p>
            </div>
          ) : (
            <>
              <iframe
                src={CALENDAR_URL}
                title="Book a 30-minute call"
                className="w-full h-[560px] border-0"
                loading="lazy"
              />
              <div className="border-t border-[color:var(--gray-line)] p-5 text-xs text-[color:var(--ink-soft)] bg-[color:var(--blue-tint)]/40">
                Can't find a time?{" "}
                <button
                  className="font-semibold text-[color:var(--blue-link)] underline"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("book-call-fallback-form");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Send us a note
                </button>
                {" "}and we'll reach out.
              </div>
              <FallbackForm source={source} onSubmitted={() => setSubmitted(true)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FallbackForm({
  source,
  onSubmitted,
}: {
  source?: string;
  onSubmitted: () => void;
}) {
  return (
    <form
      id="book-call-fallback-form"
      className="p-6 sm:p-8 space-y-4 bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        // No backend wired; persist intent in console for now.
        const data = new FormData(e.currentTarget);
        // eslint-disable-next-line no-console
        console.info("[VistaXM] Book-call request", {
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          role: data.get("role"),
          source,
        });
        onSubmitted();
      }}
    >
      <div className="eyebrow">Prefer to send a note?</div>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-xs font-semibold text-[color:var(--navy-deep)] mb-1.5">
            Name
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-[color:var(--gray-line)] px-3 py-2.5 text-sm focus:border-[color:var(--blue-cta)] focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-[color:var(--navy-deep)] mb-1.5">
            Work email
          </span>
          <input
            name="email"
            required
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border border-[color:var(--gray-line)] px-3 py-2.5 text-sm focus:border-[color:var(--blue-cta)] focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-[color:var(--navy-deep)] mb-1.5">
            Company
          </span>
          <input
            name="company"
            required
            autoComplete="organization"
            className="w-full rounded-lg border border-[color:var(--gray-line)] px-3 py-2.5 text-sm focus:border-[color:var(--blue-cta)] focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-[color:var(--navy-deep)] mb-1.5">
            Role
          </span>
          <input
            name="role"
            required
            autoComplete="organization-title"
            className="w-full rounded-lg border border-[color:var(--gray-line)] px-3 py-2.5 text-sm focus:border-[color:var(--blue-cta)] focus:outline-none"
          />
        </label>
      </div>
      <button type="submit" className="btn-primary w-full mt-2">
        Request a time
      </button>
      <p className="text-[11px] text-[color:var(--ink-soft)]/80 text-center">
        We respond within one business day. No marketing list.
      </p>
    </form>
  );
}
