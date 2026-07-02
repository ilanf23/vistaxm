import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable media components for the craft + humanization pass.
 *
 * These are pure presentational components with no dependency on the
 * actively-edited site.tsx, so they can be built and reviewed in isolation
 * and wrapped in <Reveal> at integration time.
 *
 * Photography discipline (see styles.css "Editorial photography treatment"):
 *   - img-editorial / img-editorial-soft brand-grade every photo into the
 *     navy system so it never reads as generic stock.
 *   - Ambient imagery is ATMOSPHERE only. Never use it as fake proof.
 *     Real proof (team, quotes) uses real, attributed photos.
 */

// ---------------------------------------------------------------------------
// AmbientBand: a full-width, brand-graded photographic band with copy on top.
// Use for section transitions / emotional beats, never for literal claims.
// ---------------------------------------------------------------------------

export function AmbientBand({
  image,
  alt,
  eyebrow,
  title,
  children,
  className,
  minHeight = 380,
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  minHeight?: number;
}) {
  return (
    <div
      className={cn("relative isolate overflow-hidden rounded-3xl grain", className)}
      style={{ minHeight }}
    >
      {/* graded photo layer */}
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ filter: "grayscale(1) contrast(1.06) brightness(1.02)" }}
      />
      {/* navy directional wash so copy stays legible on the left */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,37,80,0.92) 0%, rgba(2,37,80,0.72) 42%, rgba(6,45,87,0.42) 100%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-end p-8 md:p-12">
        <div className="max-w-xl text-white">
          <span
            aria-hidden
            className="mb-5 block h-[3px] w-11 rounded-full bg-[color:var(--orange-pop)]"
          />
          {eyebrow ? (
            <div className="eyebrow !text-[color:var(--blue-light)]">{eyebrow}</div>
          ) : null}
          <h2 className="mt-3 !text-white">{title}</h2>
          {children ? (
            <div className="mt-3 text-[0.975rem] leading-relaxed text-white/80">{children}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quote: an attributed testimonial. Real proof, so it takes a real headshot
// (falls back to initials until the photo lands). Never a stock face.
// ---------------------------------------------------------------------------

export function Quote({
  quote,
  name,
  title,
  photo,
  initials,
  className,
}: {
  quote: ReactNode;
  name: string;
  title: string;
  photo?: string;
  initials?: string;
  className?: string;
}) {
  const fallback =
    initials ??
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);
  return (
    <figure
      className={cn(
        "relative rounded-2xl border border-[color:var(--hairline)] bg-white p-7 md:p-9 shadow-[var(--shadow-elevation-2)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute right-7 top-6 text-5xl leading-none text-[color:var(--blue-pale)]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        &rdquo;
      </span>
      <blockquote
        className="text-[1.15rem] md:text-[1.28rem] leading-snug text-[color:var(--navy-deep)]"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}
      >
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3.5">
        {photo ? (
          <span className="img-editorial-soft h-11 w-11 shrink-0 rounded-full">
            <img src={photo} alt={name} loading="lazy" className="h-full w-full object-cover" />
          </span>
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--blue-tint)] text-sm font-semibold text-[color:var(--navy-mid)]">
            {fallback}
          </span>
        )}
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-[color:var(--navy-deep)]">{name}</span>
          <span className="block text-xs text-[color:var(--muted-foreground)]">{title}</span>
        </span>
      </figcaption>
    </figure>
  );
}

// ---------------------------------------------------------------------------
// DeviceFrame: a realistic browser window around a product mockup image.
// Reuses the app-window / window-chrome utilities already in styles.css.
// ---------------------------------------------------------------------------

export function DeviceFrame({
  image,
  alt,
  url = "app.vistaxm.com",
  children,
  className,
}: {
  image?: string;
  alt?: string;
  url?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("app-window", className)}>
      <div className="window-chrome">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </span>
        <span className="ml-2 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-center text-[0.7rem] text-white/50">
          {url}
        </span>
      </div>
      <div className="relative">
        {image ? (
          <img
            src={image}
            alt={alt ?? "VistaXM product view"}
            loading="lazy"
            className="block w-full"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
