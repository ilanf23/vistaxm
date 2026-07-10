import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";

import appCss from "../styles.css?url";
import logoAsset from "../assets/vistaxm-logo.svg.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ORGANIZATION_JSONLD, WEBSITE_JSONLD } from "../lib/seo";

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
      { property: "og:title", content: "VistaXM: Revenue Channel Intelligence" },
      {
        property: "og:description",
        content:
          "VistaXM turns partner and broker experience into account-level revenue decisions. Revenue Channel Intelligence for OEMs, IT channel companies, and insurance carriers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "VistaXM: Revenue Channel Intelligence" },
      {
        name: "twitter:description",
        content:
          "VistaXM turns partner and broker experience into account-level revenue decisions. Revenue Channel Intelligence for OEMs, IT channel companies, and insurance carriers.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9670506a-3c5b-462b-a991-5526a63279c6/id-preview-d7cffc1a--c6219d6c-100f-4251-8283-e18943afdffa.lovable.app-1782062431036.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9670506a-3c5b-462b-a991-5526a63279c6/id-preview-d7cffc1a--c6219d6c-100f-4251-8283-e18943afdffa.lovable.app-1782062431036.png",
      },
    ],
    links: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap",
      },
    ],
    scripts: [
      {
        children:
          "(function(){try{var h=location.hostname;if(h!=='vistaxm.com'&&h!=='www.vistaxm.com')return;}catch(e){return;}(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NX6L38LZ');})();",
      },
      ORGANIZATION_JSONLD,
      WEBSITE_JSONLD,
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NX6L38LZ"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const solutions = [
  {
    to: "/solutions/partnerpulse",
    label: "PartnerPulse",
    desc: "Partner conviction intelligence",
  },
  { to: "/solutions/brokerpulse", label: "BrokerPulse", desc: "Broker experience for carriers" },
  {
    to: "/solutions/industrialpulse",
    label: "IndustrialPulse",
    desc: "Industrial OEMs, coming soon",
  },
] as const;

// "Markets We Serve" dropdown, rendered to the left of Solutions.
// Each market routes to the solution that serves it. The IT OEMs entry
// links to the dedicated /for-oems page.
const industries = [
  { to: "/for-oems", label: "IT OEMs" },
  { to: "/industries/it-solution-providers", label: "IT Solution Providers" },
  { to: "/industries/technology-providers", label: "Technology Providers" },
  { to: "/solutions/brokerpulse", label: "Insurance Carriers" },
  { to: "/solutions/brokerpulse", label: "Insurance Brokers" },
  { to: "/solutions/industrialpulse", label: "Industrial OEMs" },
  { to: "/solutions/industrialpulse", label: "Industrial Distributors" },
] as const;

// Rendered after "The Model" and the Solutions dropdown.
const navAfterSolutions = [
  { to: "/how-to-start", label: "How to Start" },
  { to: "/proof", label: "Proof" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
] as const;

const navLinkClass =
  "relative text-white/70 hover:text-white transition-colors tracking-tight whitespace-nowrap " +
  "after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] " +
  "after:origin-left after:scale-x-0 after:rounded-full after:bg-[color:var(--blue-light)] " +
  "after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100";

const footerLinkClass = "text-white/65 hover:text-[color:var(--blue-light)] transition-colors";

function Logo({ className = "h-7" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`inline-flex items-center text-white ${className}`}>
        <span className="font-heading text-[1.05rem] font-extrabold leading-none tracking-tight">
          Vista<span className="text-[color:var(--blue-light)]">XM</span>
        </span>
      </span>
    );
  }

  return (
    <img
      src={logoAsset.url}
      alt="VistaXM"
      className={`w-auto transition-all duration-300 ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

function NavDropdown({
  label,
  panelWidthClass,
  children,
}: {
  label: string;
  panelWidthClass: string;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = () => setOpen(false);
  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => () => clearClose(), []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        clearClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={`flex items-center gap-1 ${navLinkClass} ${open ? "text-white" : ""}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden
          className={`mt-px transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        className={`absolute left-1/2 top-full z-50 ${panelWidthClass} -translate-x-1/2 pt-3 transition-all duration-200 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--navy-deep)] p-2 shadow-[var(--shadow-elevation-3)]">
          {children(close)}
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 text-white transition-all duration-300 ${
        condensed
          ? "bg-[color:var(--navy-deep)]/85 backdrop-blur-lg border-b border-white/10"
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
          <Logo className={condensed ? "h-6" : "h-7"} />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          <Link to="/the-model" className={navLinkClass} activeProps={{ className: "text-white" }}>
            The Model
          </Link>

          {/* Markets We Serve dropdown */}
          <NavDropdown label="Markets We Serve" panelWidthClass="w-64">
            {(close) => (
              <>
                {industries.map((ind) => (
                  <Link
                    key={ind.label}
                    to={ind.to}
                    onClick={close}
                    className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {ind.label}
                  </Link>
                ))}
              </>
            )}
          </NavDropdown>

          {/* Solutions dropdown */}
          <NavDropdown label="Solutions" panelWidthClass="w-72">
            {(close) => (
              <>
                {solutions.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    onClick={close}
                    className="block rounded-xl px-3.5 py-3 transition-colors hover:bg-white/[0.06]"
                    activeProps={{ className: "block rounded-xl px-3.5 py-3 bg-white/[0.06]" }}
                  >
                    <span className="block text-sm font-semibold text-white">{s.label}</span>
                    <span className="mt-0.5 block text-xs text-white/55">{s.desc}</span>
                  </Link>
                ))}
              </>
            )}
          </NavDropdown>


          {navAfterSolutions.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={navLinkClass}
              activeProps={{ className: "text-white" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link to="/book" className="btn-primary text-sm">
            Book a call
          </Link>
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
          >
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[color:var(--navy-deep)]">
          <div className="container-x py-4 flex flex-col gap-3">
            <Link to="/the-model" onClick={() => setOpen(false)} className="text-white/90 py-1">
              The Model
            </Link>
            <div className="py-1">
              <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-2">
                Markets We Serve
              </div>
              <div className="flex flex-col gap-2 pl-3">
                {industries.map((ind) => (
                  <Link
                    key={ind.label}
                    to={ind.to}
                    onClick={() => setOpen(false)}
                    className="text-white/80 text-sm"
                  >
                    {ind.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="py-1">
              <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-2">
                Solutions
              </div>
              <div className="flex flex-col gap-2 pl-3">
                {solutions.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    onClick={() => setOpen(false)}
                    className="text-white/80 text-sm"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
            {navAfterSolutions.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-white/90 py-1"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/book" onClick={() => setOpen(false)} className="btn-primary mt-2 self-start">
              Book a call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative bg-[color:var(--navy-deep)] text-white/75 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(49,133,252,0.35), transparent 70%)" }}
      />
      <div className="container-x relative py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="h-7" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
            Revenue Channel Intelligence. We turn customer, partner and broker experience into the
            account-level signal of where revenue is about to grow or walk.
          </p>
          <Link to="/book" className="btn-primary mt-7 text-sm">
            Book a 30-minute conversation
          </Link>
        </div>
        <div className="md:col-span-2">
          <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4">
            Solutions
          </div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/solutions/partnerpulse" className={footerLinkClass}>
                PartnerPulse
              </Link>
            </li>
            <li>
              <Link to="/solutions/brokerpulse" className={footerLinkClass}>
                BrokerPulse
              </Link>
            </li>
            <li>
              <Link to="/solutions/industrialpulse" className={footerLinkClass}>
                IndustrialPulse
              </Link>
            </li>
            <li>
              <Link to="/proof" className={footerLinkClass}>
                Certified NPS
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4">Company</div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/the-model" className={footerLinkClass}>
                The Model
              </Link>
            </li>
            <li>
              <Link to="/how-to-start" className={footerLinkClass}>
                How to Start
              </Link>
            </li>
            <li>
              <Link to="/for-oems" className={footerLinkClass}>
                For OEMs
              </Link>
            </li>
            <li>
              <Link to="/insights" className={footerLinkClass}>
                Insights
              </Link>
            </li>
            <li>
              <Link to="/about" className={footerLinkClass}>
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4">Contact</div>
          <ul className="space-y-2.5 text-sm">
            <li className="text-white/65">Salt Lake City, Utah</li>
            <li>
              <a
                href="mailto:sales@vistaxm.com"
                className="text-white hover:text-[color:var(--blue-light)] transition-colors"
              >
                sales@vistaxm.com
              </a>
            </li>
            <li>
              <a
                href="tel:+18015024841"
                className="text-white hover:text-[color:var(--blue-light)] transition-colors"
              >
                (801) 502-4841
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs text-white/55 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} VistaXM. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/legal/privacy-policy" className={footerLinkClass}>
              Privacy Policy
            </Link>
            <Link to="/legal/terms-of-service" className={footerLinkClass}>
              Terms of Service
            </Link>
            <Link to="/legal/cookie-policy" className={footerLinkClass}>
              Cookie Policy
            </Link>
          </div>
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
      <MotionConfig reducedMotion="user">
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </QueryClientProvider>
  );
}
