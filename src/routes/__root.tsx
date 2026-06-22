import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logoAsset from "../assets/vistaxm-logo.svg.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";

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
          <Link to="/" className="btn-primary">Go home</Link>
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
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-secondary-dark">Go home</a>
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
      { title: "VistaXM — Revenue Channel Intelligence" },
      { name: "description", content: "VistaXM turns partner and broker experience into account-level revenue decisions. Revenue Channel Intelligence for OEMs, IT channel companies, and insurance carriers." },
      { name: "author", content: "VistaXM" },
      { property: "og:title", content: "VistaXM — Revenue Channel Intelligence" },
      { property: "og:description", content: "VistaXM turns partner and broker experience into account-level revenue decisions. Revenue Channel Intelligence for OEMs, IT channel companies, and insurance carriers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "VistaXM — Revenue Channel Intelligence" },
      { name: "twitter:description", content: "VistaXM turns partner and broker experience into account-level revenue decisions. Revenue Channel Intelligence for OEMs, IT channel companies, and insurance carriers." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9670506a-3c5b-462b-a991-5526a63279c6/id-preview-d7cffc1a--c6219d6c-100f-4251-8283-e18943afdffa.lovable.app-1782062431036.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9670506a-3c5b-462b-a991-5526a63279c6/id-preview-d7cffc1a--c6219d6c-100f-4251-8283-e18943afdffa.lovable.app-1782062431036.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" },
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

const nav = [
  { to: "/the-model", label: "The Model" },
  { to: "/partnerpulse", label: "PartnerPulse" },
  { to: "/brokerpulse", label: "BrokerPulse" },
  { to: "/offers", label: "Offers" },
  { to: "/proof", label: "Proof" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About" },
] as const;

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
      <div className={`container-x flex items-center justify-between transition-all duration-300 ${condensed ? "h-14" : "h-20"}`}>
        <Link to="/" className="flex items-center font-semibold tracking-tight text-white" aria-label="VistaXM home">
          <img src={logoAsset.url} alt="VistaXM" className={`w-auto transition-all duration-300 ${condensed ? "h-6" : "h-7"}`} />
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {nav.map(n => (
            <a
              key={n.label}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="text-white/70 hover:text-white transition-colors cursor-default tracking-tight"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <a href="mailto:sales@vistaxm.com" className="btn-primary !py-3 !px-6 text-base">Book a call</a>
        </div>
        <button
          className="lg:hidden p-2 -mr-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6"/> : <path d="M3 6h18M3 12h18M3 18h18"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[color:var(--navy-deep)]">
          <div className="container-x py-4 flex flex-col gap-3">
            {nav.map(n => (
              <a key={n.label} href="#" onClick={(e) => { e.preventDefault(); setOpen(false); }} className="text-white/90 py-1">{n.label}</a>
            ))}
            <a href="mailto:sales@vistaxm.com" onClick={() => setOpen(false)} className="btn-primary mt-2 self-start">Book a call</a>
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
          <img src={logoAsset.url} alt="VistaXM" className="h-7 w-auto" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
            Revenue Channel Intelligence. We turn partner and broker experience into the account-level signal of where revenue is about to grow or walk.
          </p>
          <a href="mailto:sales@vistaxm.com" className="btn-primary mt-7 text-sm">Book a 30-minute conversation</a>
        </div>
        <div className="md:col-span-2">
          <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4">Products</div>
          <ul className="space-y-2.5 text-sm">
            <li>PartnerPulse</li>
            <li>BrokerPulse</li>
            <li>Certified NPS</li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4">Company</div>
          <ul className="space-y-2.5 text-sm">
            <li>About</li>
            <li>Insights</li>
            <li>Proof</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-4">Contact</div>
          <ul className="space-y-2.5 text-sm">
            <li className="text-white/65">Salt Lake City, Utah</li>
            <li><a href="mailto:sales@vistaxm.com" className="text-white hover:text-[color:var(--blue-light)] transition-colors">sales@vistaxm.com</a></li>
            <li><a href="tel:+18015024841" className="text-white hover:text-[color:var(--blue-light)] transition-colors">(801) 502-4841</a></li>
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
      <div className="flex min-h-dvh flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
