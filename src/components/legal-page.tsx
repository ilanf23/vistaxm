import type { ReactNode } from "react";

/**
 * LegalPage: clean, readable legal document layout.
 * Simple title header + prose body with navy headings, comfortable line
 * height, and a readable max width. Matches VistaXM design tokens.
 */
export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-[color:var(--hairline)] bg-[color:var(--surface-0)]">
        <div className="container-x py-14 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow !text-[color:var(--blue-cta)]">Legal</div>
            <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-[color:var(--navy-deep)] md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-[color:var(--ink-2)]">
              <span className="font-semibold">Last updated {lastUpdated}</span>
            </p>
          </div>
        </div>
      </header>
      <section className="bg-white">
        <div className="container-x py-14 md:py-20">
          <article className="legal-prose mx-auto max-w-3xl text-[1rem] leading-[1.75] text-[color:var(--ink-1)]">
            {children}
          </article>
        </div>
      </section>
    </>
  );
}
