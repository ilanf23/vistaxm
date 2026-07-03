/**
 * SEO and GEO foundations: single source of truth for the canonical domain,
 * canonical URLs, and JSON-LD structured data (Organization, WebSite, FAQPage).
 *
 * The site currently runs on a Lovable preview domain; BASE_URL points at the
 * production domain so canonicals, sitemap, and llms.txt are correct when the
 * site moves to vistaxm.com. Keep public/robots.txt, public/sitemap.xml, and
 * public/llms.txt in sync with this value.
 */

export const BASE_URL = "https://www.vistaxm.com";

/** One consistent entity description, used verbatim in schema and llms.txt. */
export const ENTITY_DESCRIPTION =
  "VistaXM is a Revenue Channel Intelligence company. It runs fully managed, neutral third-party programs that turn partner and broker customer experience into account-level revenue signals for OEMs, IT solution providers, and insurance carriers.";

export type Faq = { question: string; answer: string };

/** Canonical URL for a route path ("/", "/proof", "/solutions/partnerpulse"). */
export function canonicalUrl(path: string): string {
  return path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`;
}

/** Canonical link entry for a route's head() `links` array. */
export function canonicalLink(path: string) {
  return { rel: "canonical", href: canonicalUrl(path) };
}

/** JSON-LD head script entry for a route's head() `scripts` array. */
function jsonLdScript(data: Record<string, unknown>) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export const ORGANIZATION_JSONLD = jsonLdScript({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VistaXM",
  legalName: "VistaXM, Inc.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: ENTITY_DESCRIPTION,
  founder: { "@type": "Person", name: "Erik Vogel" },
  sameAs: [
    "https://www.crn.com/news/software/2026/vistaxm-is-powering-a-customer-experience-partner-revolution",
    "https://www.cxcurrent.com/news/erik-vogel-vistaxm-cx-revenue-growth-strategy",
  ],
});

export const WEBSITE_JSONLD = jsonLdScript({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VistaXM",
  url: BASE_URL,
});

/** FAQPage JSON-LD for a route's head() `scripts` array. */
export function faqJsonLd(faqs: Faq[]) {
  return jsonLdScript({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  });
}
