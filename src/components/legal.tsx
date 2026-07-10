import type { ReactNode } from "react";

/**
 * Shared clean reader layout for legal pages. Navy headings, generous prose,
 * comfortable max width. No marketing components.
 */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="bg-white">
      <header className="border-b border-[color:var(--hairline)] bg-[color:var(--navy-deep)] text-white">
        <div className="container-x py-16 md:py-20">
          <div className="eyebrow !text-[color:var(--blue-light)] !text-[0.7rem] mb-3">Legal</div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{title}</h1>
        </div>
      </header>
      <article className="container-x py-14 md:py-20">
        <div className="mx-auto max-w-3xl legal-prose">{children}</div>
      </article>
    </main>
  );
}
