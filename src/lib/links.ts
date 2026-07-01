import type { MouseEvent } from "react";

/**
 * Shared external links.
 *
 * Book a Call points to the VistaXM Microsoft Bookings page. Every
 * "Book a Call" / "Book a 30-minute call" CTA across the site uses this
 * constant.
 */
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

/**
 * Open the scheduling page in a centered pop-up window that floats over the
 * current page, so visitors keep their place on the site instead of being
 * pulled to a full new tab.
 *
 * Note: Microsoft Bookings cannot be embedded in an iframe (its MSAL auth
 * flow refuses framing), so a real browser pop-up window is the closest we
 * can get to an on-site experience. Falls back to a normal new tab if the
 * browser blocks the pop-up (or on mobile, where pop-ups open as tabs).
 */
export function openBookingPopup() {
  if (typeof window === "undefined") return;
  const w = Math.round(Math.min(600, window.innerWidth - 40));
  const h = Math.round(Math.min(760, window.innerHeight - 40));
  const dualLeft = window.screenLeft ?? window.screenX ?? 0;
  const dualTop = window.screenTop ?? window.screenY ?? 0;
  const left = Math.round(dualLeft + Math.max(0, (window.innerWidth - w) / 2));
  const top = Math.round(dualTop + Math.max(0, (window.innerHeight - h) / 2));
  const features = `popup=yes,width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`;
  const popup = window.open(BOOK_A_CALL_URL, "vistaxm-book-a-call", features);
  if (popup) {
    popup.focus();
  } else {
    // Pop-up blocked: fall back to a normal new tab.
    window.open(BOOK_A_CALL_URL, "_blank", "noopener,noreferrer");
  }
}

/**
 * Click handler for any "Book a Call" anchor. Opens the scheduling pop-up
 * while preserving the anchor's href, so modified clicks (cmd/ctrl/shift/alt
 * or middle click) and JS-disabled fallbacks still open the booking page in
 * a new tab as before.
 */
export function handleBookingClick(e: MouseEvent) {
  // Let the browser handle new-tab / new-window intents natively.
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }
  e.preventDefault();
  openBookingPopup();
}
