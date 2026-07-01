# Pulse briefs

Static PDF briefs served at `/assets/briefs/*.pdf`. The Pulse pages link here
from the "Download the brief (PDF)" button (see `BRIEFS` in `src/lib/links.ts`
and `GetTheBrief` in `src/components/site.tsx`).

Expected files (uploaded separately, e.g. in Lovable):

- `partnerpulse.pdf` -> PartnerPulse brief
- `brokerpulse.pdf` -> BrokerPulse brief

Until a file is present the button stays enabled and will 404 gracefully.
IndustrialPulse intentionally has no file: it renders a disabled
"Brief coming soon" state instead.

This README keeps the folder tracked in git so the `/assets/briefs/` path
resolves before the real PDFs land.
