# Ambient Photography Rollout (non-home + non-about pages)

Date: 2026-07-01
Status: Approved
Parent spec: [Homepage Craft + Humanization](./2026-07-01-homepage-craft-humanization-design.md) (this is its step 3: "Roll the established system out to the other routes")

## Goal

Add at least one relevant, brand-graded stock photo to every page except the two About
pages. Photos are ATMOSPHERE only: navy-duotone graded, never standing in as fake proof of
customers, and never showing readable screens or logos.

## Reuse (no new system)

- `AmbientBand` (`src/components/media.tsx`): full-width navy-graded photo band with copy overlay.
  Used for full-width dividers between sections.
- `img-editorial-soft` / `img-editorial` utilities (`src/styles.css`): duotone framing for
  side-column images.
- Wrap insertions in the site container + `Reveal` to match surrounding spacing/motion.

## Sourcing

- License-free editorial photos from Unsplash, downscaled to ~1600px wide.
- Committed self-hosted under `public/images/ambient/`, referenced as `/images/ambient/<name>.jpg`.
- Fallback: if a download fails, that page uses a neutral tinted placeholder so layout never breaks.

## Per-page placement

| Page                        | Placement          | Location                                             | Photo subject                                  |
| --------------------------- | ------------------ | ---------------------------------------------------- | ---------------------------------------------- |
| `index`                     | AmbientBand        | between "Our advantage" and PartnerShadow            | colleagues reviewing a dashboard on a laptop   |
| `book-a-call`               | side image (left)  | "Reach us directly" section                          | person mid-call at a clean desk                |
| `the-model`                 | AmbientBand        | between "How it works" and "From signal to decision" | small team at a whiteboard mapping accounts    |
| `how-to-start`              | side image (right) | convert "Why managed" to 2-col                       | over-the-shoulder operator with charts         |
| `crn`                       | AmbientBand        | between "5 things" and "How it works"                | calm modern ops floor, muted dashboards        |
| `for-oems`                  | side image (right) | convert "Why a neutral third party" to 2-col         | two partners in candid conversation            |
| `insights`                  | AmbientBand        | between Articles and Resources                       | reading a report/charts on a laptop            |
| `proof`                     | AmbientBand        | between "Real results" and Testimonial               | distant, generic team reviewing printed charts |
| `solutions/brokerpulse`     | AmbientBand        | between "What it informs" and "In action"            | broker reviewing an account portfolio          |
| `solutions/industrialpulse` | AmbientBand        | above the "Early pilot" band                         | distribution warehouse / OEM floor             |
| `solutions/partnerpulse`    | AmbientBand        | between "Two tracks" and "What it informs"           | vendor + reseller teams collaborating          |

## Guardrails

- Atmosphere, never fake proof. No logos, no readable screens, no faces presented as named customers.
- Reuse existing design-system utilities; do not fork. Respect `prefers-reduced-motion`.
- Do not remove or alter the data-viz components.
- No em dashes anywhere (repo rule).
