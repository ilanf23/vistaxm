# VistaXM Homepage: Craft + Humanization Pass

Date: 2026-07-01
Status: Approved (Approach A), homepage as proving ground

## Problem

The site reads **generic/flat**, **cold/inhuman**, and **not-quite-credible**. Structure and
navigation are fine; the gap is visual craft, human warmth, and signals of realness. The client
also wants ambient "business" photography, which carries a stock-photo risk that can worsen the
"generic/not-credible" problem if used literally.

## Asset reality (drives the plan)

- Real team photos: in progress (real).
- Named quotes + headshots: attainable, easy.
- Product screenshots: none; AI-generated mockups viable.
- Customer logos: NOT available. No logo-wall credibility crutch.
- Ambient business imagery: wanted; must be brand-treated, never literal corporate stock.

Credibility therefore rests on: real team + named quotes + product-that-looks-real + neutral/
certified positioning. Not borrowed logos.

## Approach A: Editorial proof layer

Keep the data-viz spine (the real differentiator). Layer on:

1. **Visual-craft upgrade** (kills "generic/flat")
   - Distinctive display typeface for headings (body stays Roboto). Roboto-for-everything is a
     top driver of the generic feel.
   - Tighter type hierarchy + spacing rhythm; larger, more confident section headers.
   - More deliberate use of the orange accent as the warmth lever.
   - Depth + motion polish; fix the empty/ghosted hero.

2. **Human proof** (kills "cold/inhuman", builds credibility)
   - Team strip on homepage + real team photos (slots now, real photos when ready).
   - Named quote component with real headshot slots, woven into relevant sections.

3. **Product realness**
   - AI product mockups shown in a browser/device frame ("the signal, made real"). Frame +
     placeholder now; real AI mockup swapped in later.

4. **Ambient photography as a treated editorial layer** (honors the request, disciplines it)
   - Brand-graded duotone (navy), editorial crops, texture/grain, used as section dividers and
     backgrounds. NEVER as fake proof (no smiling-corporate-stock standing in for customers).

## Scope / sequencing

1. Homepage proving ground: craft upgrade + build the image-treatment system + human/product/
   ambient slots with placeholders. (This pass.)
2. Feed real assets into the slots as they land (team photos, quotes, AI product shots, sourced +
   treated ambient imagery).
3. Roll the established system out to the other 8 routes.

## Reusable pieces to build

- Image treatment: duotone/navy-grade utility (CSS) for ambient photography.
- `DeviceFrame` / browser-chrome wrapper for product mockups.
- `AmbientBand` / photo divider component (treated, with overlay + copy slot).
- `Quote` component (headshot + name + title + attribution).
- `TeamStrip` (homepage teaser linking to About).
- Placeholder asset convention so real files drop in without layout changes.

## Guardrails

- Do not remove the data-viz components; they are the differentiator.
- Follow existing design-system utilities in `styles.css` (`container-x`, `section-y`, `btn-*`,
  `glass`, `reveal`, `card-lift`, brand color vars). Extend, don't fork.
- Respect `prefers-reduced-motion`.
- No em dashes anywhere (repo rule).
- Photography treatment + role is the anti-stock guardrail: treatment (duotone/editorial) + role
  (ambient, never fake proof).
