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
      { property: "og:description", content: "Revenue intelligence for the indirect go-to-market channel. Neutral, certified, managed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
  return (
    <header className="sticky top-0 z-40 bg-[color:var(--navy-deep)] text-white">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center font-semibold tracking-tight text-white" aria-label="VistaXM home">
          <img src={logoAsset.url} alt="VistaXM" className="h-7 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {nav.map(n => (
            <Link key={n.to} to={n.to} className="text-white/80 hover:text-white transition-colors" activeProps={{ className: "text-white font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary !py-2 !px-4 text-sm">Book a call</Link>
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
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-white/90 py-1">{n.label}</Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2 self-start">Book a call</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[color:var(--navy-deep)] text-white/80 mt-24">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center">
            <img src={logoAsset.url} alt="VistaXM" className="h-7 w-auto" />
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed">
            Revenue Channel Intelligence. Turning partner and broker experience into the account-level signal of where revenue is about to grow or walk.
          </p>
        </div>
        <div>
          <div className="text-white font-semibold text-sm mb-3">Products</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/partnerpulse" className="text-white/80 hover:text-white">PartnerPulse</Link></li>
            <li><Link to="/brokerpulse" className="text-white/80 hover:text-white">BrokerPulse</Link></li>
            <li><Link to="/offers" className="text-white/80 hover:text-white">Offers</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold text-sm mb-3">Contact</div>
          <ul className="space-y-2 text-sm">
            <li>Salt Lake City, Utah</li>
            <li><a href="mailto:sales@vistaxm.com" className="text-white/80 hover:text-white">sales@vistaxm.com</a></li>
            <li><a href="tel:+18015024841" className="text-white/80 hover:text-white">(801) 502-4841</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 text-xs text-white/60 flex flex-wrap justify-between gap-2">
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
