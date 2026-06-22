import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useBookCall } from "@/components/book-call";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a 30-minute call | VistaXM" },
      {
        name: "description",
        content:
          "Book a 30-minute Revenue Channel Intelligence working session with the VistaXM team. No obligation, one business day response.",
      },
      { property: "og:url", content: "https://vistaxm.lovable.app/book" },
      { property: "og:title", content: "Book a 30-minute call with VistaXM" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://vistaxm.lovable.app/book" }],
  }),
  component: Book,
});

function Book() {
  const { open } = useBookCall();
  useEffect(() => {
    open("book-page");
  }, [open]);

  return (
    <div className="min-h-[60vh] bg-[color:var(--blue-tint)] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl text-center">
        <div className="eyebrow mb-3">Book a 30-minute call</div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          The booking window is open.
        </h1>
        <p className="mt-5 text-[color:var(--ink-soft)]">
          If it didn't open automatically, use the button below.
        </p>
        <button className="btn-primary mt-7" onClick={() => open("book-page-fallback")}>
          Open booking
        </button>
      </div>
    </div>
  );
}
