/**
 * Shared links.
 *
 * BOOK_PATH is the on-site booking page (`/book`). Every "Book a Call" /
 * "Book a 30-minute call" CTA across the site points here, so visitors land
 * on our own page instead of being pulled to a separate window.
 *
 * BOOK_A_CALL_URL is the underlying VistaXM Microsoft Bookings scheduler. It
 * is used only by the "Open the booking calendar" button on `/book`, which
 * opens it in a new tab. Microsoft Bookings sends a `frame-ancestors` CSP
 * that blocks third-party iframe embedding, so the live calendar cannot be
 * shown inline; the dedicated page hands off to it in a new tab instead.
 */
export const BOOK_PATH = "/book";

export const BOOK_A_CALL_URL =
  "https://bookings.cloud.microsoft/book/VistaXM@vistaxm.com/?ismsaljsauthenabled=true";

/**
 * Per-page "Get the brief" assets for the Pulse pages. Lives here (not in
 * site.tsx) so the component module stays component-only and keeps fast
 * refresh working. PDF hrefs are placeholders until the real briefs are
 * produced; "Learn more" reuses the published whitepaper URLs.
 */
export type Brief = {
  /** 1 to 2 sentence catch phrase describing the brief. */
  catchphrase: string;
  /** Placeholder PDF path; the real file drops in here later. */
  pdfHref?: string;
  /** Secondary "Learn more" link, reusing the matching whitepaper URL. */
  learnMore?: { label: string; href: string };
  /** When true, the download button is a disabled "Brief coming soon" state. */
  comingSoon?: boolean;
};

export const BRIEFS: Record<"partnerpulse" | "brokerpulse" | "industrialpulse", Brief> = {
  partnerpulse: {
    catchphrase:
      "A neutral, benchmarked read on partner conviction and delivery, in one short brief: what PartnerPulse measures, and the revenue decisions it informs.",
    pdfHref: "/assets/briefs/partnerpulse.pdf",
    learnMore: {
      label: "Read the PartnerPulse whitepaper",
      href: "https://www.vistaxm.com/white-paper/partnerpulse-the-future-of-partner-experience/",
    },
  },
  brokerpulse: {
    catchphrase:
      "Broker experience management for carriers, distilled into one brief: how BrokerPulse reads agency experience and ties it to premium retention and expansion.",
    pdfHref: "/assets/briefs/brokerpulse.pdf",
    learnMore: {
      label: "Read the State of Broker Experience 2025",
      href: "https://www.vistaxm.com/white-paper/the-state-of-broker-experience-2025/",
    },
  },
  industrialpulse: {
    catchphrase:
      "Revenue Channel Intelligence for industrial OEMs and distributors. The IndustrialPulse brief is in production; register your interest to get it first.",
    comingSoon: true,
  },
};
