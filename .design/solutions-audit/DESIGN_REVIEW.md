# Design Audit: Solutions Pages (BrokerPulse, PartnerPulse, IndustrialPulse)

Reviewed against: the live rendered pages (production `preview` build) + source in `src/routes/solutions/*` and `src/components/{site,media}.tsx`.
Date: 2026-07-01

## The one-sentence diagnosis

All three solutions pages are built from the **same thin skeleton** (hero with an
empty right half → heading + text-card grid → grayscale stock photo band → more
text cards → a literal "Custom graphic to come" placeholder box → brief → CTA),
while the rich data-viz library that makes the homepage feel alive
(`RevenueDecisionNetwork`, `PartnerShadow`, `JourneyMatrix`, `SpendByCohort`,
`ScoreVsDecision`, `RevenueIntelligenceFlow`, `RevenueSignalCard`,
`ProvenResults`) **never appears on any of them.** That single gap produces all
three symptoms at once: dead space, no real graphics, boring.

## How each complaint maps to what actually renders

- **Dead space:** `PageHero` renders a completely empty right column (the
  homepage `Hero` fills the same space with a live network graphic). `section-y`
  is 128px top + 128px bottom on desktop = **256px between every section**, and
  several sections carry only 2-4 text cards, so voids open up. The
  `"Custom graphic to come"` box is a full 16:9 slot of literal emptiness.
- **Not enough real-life graphics:** exactly **one** real visual per page
  (BrokerPulse: `InfluencerGapCard`; PartnerPulse: `NPSGauge`; IndustrialPulse:
  **zero**). Everything else is text cards + one grayscale stock photo.
- **Boring:** all three pages run the identical cadence and palette. A buyer who
  visits two of them sees effectively the same page twice.

---

## Must Fix

1. **Delete the "Custom graphic to come" placeholder boxes** (BrokerPulse
   line ~163, PartnerPulse line ~266). They ship a dashed box reading
   "CUSTOM BROKERPULSE GRAPHIC / Custom graphic to come" on a public page. This
   isn't boring, it's unfinished. _Kills: dead-space + graphics. Effort: REUSE._
   Drop an existing viz into the slot: `ScoreVsDecision` or `SpendByCohort` on
   BrokerPulse, `JourneyMatrix` on PartnerPulse.

2. **Fill the empty hero right-half.** `PageHero` leaves the entire right column
   blank on every solutions page. Give each hero a right-side visual: reuse
   `RevenueSignalCard`, a `DeviceFrame` product mockup, or a product-specific
   mini-graphic. _Kills: dead-space + graphics + boring. Effort: REUSE/BUILD. All pages._

3. **IndustrialPulse is a stub.** Two text cards, one stock band, zero data-viz.
   It reads as a placeholder page. Add at least one channel visual (reuse
   `PartnerShadow` or a distributor-tuned variant) and one mechanism graphic.
   _Kills: graphics + dead-space. Effort: BUILD/REUSE. IndustrialPulse._

## Should Fix

4. **Break the identical section cadence.** Every page is
   Hero → SectionHead+cards → AmbientBand → cards → placeholder. Vary the rhythm:
   alternate media left/right, insert one full-bleed data section, use a
   split-screen. _Kills: boring. Effort: BUILD. All pages._

5. **Hero the signature viz instead of side-columning it.** `InfluencerGapCard`
   and `NPSGauge` are the strongest things on their pages but sit in a cramped
   side column. Promote each to a full-width "in action" moment (which is
   precisely where the placeholder box currently sits). _Kills: graphics. Effort: REUSE._

6. **Replace check-icon text-card lists** (`InformsList`, `MeasureList`) with
   something visual: a signal-to-decision flow, mini-charts per row, or a
   before/after. Right now they're 4-6 near-identical rows of tiny circle-check +
   text. _Kills: boring + graphics. Effort: BUILD. BrokerPulse, PartnerPulse._

7. **Add a proof moment.** None of the three pages carry a stat block, a
   `Quote`, or `ProvenResults`. A solutions page with zero numbers or
   testimonials reads as a brochure. Pull in `ProvenResults` or an attributed
   `Quote`. _Kills: boring + graphics. Effort: REUSE. All pages._

8. **Fix reveal-on-scroll timing.** During normal scrolling, whole viewports
   render blank before the `Reveal`/`Stagger` animations fire (observed
   repeatedly). Widen the IntersectionObserver `rootMargin` so content is present
   as it enters view. _Kills: dead-space / polish. Effort: BUILD. All pages._

9. **Upgrade or reduce the AmbientBand.** It's the only "image" on each page and
   it's a generic grayscale stock photo carrying an emotional line. Nice once,
   but it's doing too much load-bearing work. Swap for a real product screenshot
   in a `DeviceFrame`, or a data-driven band. _Kills: graphics + boring. Effort: REUSE._

## Could Improve

10. **Differentiate the three pages.** Same structure, same navy palette, same
    orange accent. Give each product a signature motif or hero visual so they
    don't blur together. _Kills: boring. Effort: BUILD._

11. **Turn sibling references into a visual family selector.** IndustrialPulse
    talks about PartnerPulse/BrokerPulse in prose; a small 3-up product switcher
    would orient buyers and add visual interest. _Kills: boring. Effort: BUILD._

12. **Add micro-interactions** to data cards: hover-reveal a detail, animated
    count-up on any numbers (the `useCountUp` hook already exists).
    _Kills: boring / polish. Effort: REUSE._

13. **Make each page-closer distinct.** IndustrialPulse's aurora "early pilot"
    band is the only page-unique flourish and it's good. Give BrokerPulse and
    PartnerPulse their own closing treatment rather than the shared `CTABand`.
    _Kills: boring. Effort: REUSE._

14. **Put the hero space to work.** Under each hero CTA, add a trust line, a
    logo strip, or a one-line stat so the left column earns its height instead
    of trailing off into the empty right column. _Kills: dead-space. Effort: BUILD._

15. **Tighten spacing on low-content sections.** Where a section carries only
    2 cards, reduce `section-y` or add a connective visual so 256px of padding
    doesn't frame near-empty space. _Kills: dead-space. Effort: REUSE tokens._

## What works well (keep these)

- `InfluencerGapCard` (BrokerPulse) and `NPSGauge` (PartnerPulse) are genuinely
  strong, on-brand data visuals. The problem is scarcity, not quality.
- The navy + orange brand system, `card-lift`, gradient top-borders, and the
  aurora-drift dark sections are cohesive and premium.
- Copy is sharp and specific. The pages read well; they just don't _show_ well.

## Suggested sequencing

Ship the REUSE wins first (they're nearly free and remove the worst offenders):
**1, 2, 5, 7** land the biggest visible jump for the least work. Then the BUILD
items (**3, 4, 6**) to make each page feel authored rather than templated.
