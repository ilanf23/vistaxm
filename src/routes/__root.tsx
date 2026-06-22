import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logoAsset from "../assets/vistaxm-logo.svg.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { BookCallProvider, BookCallButton, useBookCall } from "../components/book-call";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-secondary-dark">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VistaXM: Revenue Channel Intelligence" },
      {
        name: "description",
        content:
          "VistaXM turns partner and broker experience into account-level revenue decisions. Revenue Channel Intelligence for OEMs, IT channel companies, and insurance carriers.",
      },
      { name: "author", content: "VistaXM" },
      { property: "og:site_name", content: "VistaXM" },
      { property: "og:title", content: "VistaXM: Revenue Channel Intelligence" },
      {
        property: "og:description",
        content:
          "Turn partner and broker experience into the account-level signal of where revenue is about to grow or walk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "VistaXM: Revenue Channel Intelligence" },
      {
        name: "twitter:description",
        content:
          "Turn partner and broker experience into the account-level signal of where revenue is about to grow or walk.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV = [
  { to: "/the-model", label: "The Model" },
  { to: "/partnerpulse", label: "PartnerPulse" },
  { to: "/brokerpulse", label: "BrokerPulse" },
  { to: "/proof", label: "Proof" },
  { to: "/insights", label: "Insights" },
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 text-white transition-all duration-300 ${
        condensed
          ? "bg-[color:var(--navy-deep)]/90 backdrop-blur-lg border-b border-white/10"
          : "bg-[color:var(--navy-deep)] border-b border-transparent"
      }`}
    >
      <div
        className={`container-x flex items-center justify-between transition-all duration-300 ${condensed ? "h-14" : "h-20"}`}
      >
        <Link
          to="/"
          className="flex items-center font-semibold tracking-tight text-white"
          aria-label="VistaXM home"
        >
          <img
            src={logoAsset.url}
            alt="VistaXM"
            className={`w-auto transition-all duration-300 ${condensed ? "h-6" : "h-7"}`}
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm" aria-label="Primary">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`tracking-tight transition-colors ${
                  active ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <BookCallButton variant="nav" source="header" />
        </div>
        <button
          className="lg:hidden p-2 -mr-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[color:var(--navy-deep)]">
          <div className="container-x py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="text-white/90 py-1">
                {n.label}
              </Link>
            ))}
            <div className="mt-2">
              <BookCallButton variant="nav" source="mobile-nav" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function FinalCTABand() {
  const { open } = useBookCall();
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative overflow-hidden bg-[color:var(--navy-deep)] text-white"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(720px 320px at 80% 20%, rgba(49,133,252,0.30), transparent 65%), radial-gradient(560px 280px at 10% 90%, rgba(0,86,167,0.35), transparent 65%)",
          animation: "aurora-drift 24s ease-in-out infinite",
        }}
      />
      <div className="container-x relative py-20 md:py-24 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
        <div>
          <div className="eyebrow !text-[color:var(--blue-light)] mb-4">Next step</div>
          <h2
            id="final-cta-heading"
            className="!text-white"
            style={{ fontSize: "clamp(2rem, 3.4vw, 2.75rem)" }}
          >
            See the signal beneath the score, in your accounts.
          </h2>
          <p className="mt-5 text-lg text-white/75 max-w-xl">
            30 minutes. No obligation. Walk away with a redacted Revenue Channel Intelligence view
            from a comparable company.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 items-center">
            <button className="btn-primary" onClick={() => open("footer-cta")}>
              Book a 30-minute call
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
            </button>
            <Link to="/offers" className="btn-secondary">
              Start the 3-week Diagnostic
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-2 text-xs text-white/55">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            One business day response · No marketing list
          </div>
        </div>
        <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm">
          <div className="eyebrow !text-[color:var(--blue-light)] mb-3">Proof beside the ask</div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-semibold text-white tabular-nums">+8</div>
              <div className="text-xs text-white/65 mt-1">NPS lift, Softchoice</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-white tabular-nums">$11M+</div>
              <div className="text-xs text-white/65 mt-1">Renewal revenue protected</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-white tabular-nums">27%</div>
              <div className="text-xs text-white/65 mt-1">YoY growth, Veeam</div>
            </div>
          </div>
          <blockquote className="mt-6 border-l-2 border-[color:var(--blue-cta)] pl-4 text-sm text-white/80 italic leading-relaxed">
            "Companies don't spend NPS points. They spend dollars."
            <footer className="not-italic mt-2 text-xs text-white/55">
              Erik Vogel · Founder & CEO, VistaXM
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-[color:var(--navy-deep)] text-white/75 overflow-hidden border-t border-white/10">
      <div className="container-x relative py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={logoAsset.url} alt="VistaXM" className="h-7 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
            Revenue Channel Intelligence. We turn partner and broker experience into the
            account-level signal of where revenue is about to grow or walk.
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4">Solutions</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/partnerpulse" className="hover:text-white text-white/75">PartnerPulse</Link></li>
            <li><Link to="/brokerpulse" className="hover:text-white text-white/75">BrokerPulse</Link></li>
            <li><Link to="/the-model" className="hover:text-white text-white/75">The Model</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4">Company</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-white text-white/75">About</Link></li>
            <li><Link to="/insights" className="hover:text-white text-white/75">Insights</Link></li>
            <li><Link to="/proof" className="hover:text-white text-white/75">Proof</Link></li>
            <li><Link to="/offers" className="hover:text-white text-white/75">Offers</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4">Contact</div>
          <ul className="space-y-2.5 text-sm">
            <li className="text-white/65">Salt Lake City, Utah</li>
            <li>
              <a href="mailto:sales@vistaxm.com" className="text-white hover:text-[color:var(--blue-light)]">
                sales@vistaxm.com
              </a>
            </li>
            <li>
              <a href="tel:+18015024841" className="text-white hover:text-[color:var(--blue-light)]">
                (801) 502-4841
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs text-white/55 flex flex-wrap justify-between gap-3">
          <span>© {new Date().getFullYear()} VistaXM. All rights reserved.</span>
          <span>PartnerPulse and BrokerPulse are products of VistaXM.</span>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <BookCallProvider>
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <FinalCTABand />
          <Footer />
        </div>
      </BookCallProvider>
    </QueryClientProvider>
  );
}
