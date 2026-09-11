# CONTENT_STATUS

Last updated: 2026-09-10 (pricing-positioning pass)
Scope of this entry: the homepage "After launch" section and the two dedicated
service pages at `/services/sitelaunch-care/` and
`/services/digital-brand-polish/`. Sections that pre-date this change are not
re-audited here.

The homepage now carries only the short form of each offer (name, engagement
label, one sentence, three highlights, link). The complete inclusions, exclusions,
pricing detail and PDFs live on the dedicated pages. All approved copy lives
in `src/data/services.js` and is read by both, so the two cannot drift apart.

Status: this is a live production site for SiteLaunch Studios' own brand, not a
prospect concept. See "Workflow conflicts" at the end.

## Pricing visibility

The homepage displays no numeric pricing. Each service shows an engagement
label instead, and the real figures live only on the dedicated pages and in
the PDFs. This is a positioning decision, not a change to any price.

| Service | Homepage label | Where the figure lives |
| --- | --- | --- |
| Starter Launch Page | Fixed-scope website | Quoted in the review |
| Conversion Landing Page | Project-based | Quoted per project |
| Business Website | Custom scope | Quoted per project |
| Website Review | Free | Free — the label is the price |
| SiteLaunch Care | Monthly website support | `/services/sitelaunch-care/` — $199/month |
| Digital Brand Polish | Scoped brand refinement | `/services/digital-brand-polish/` — From $750, pilots $750–$1,500 |

"Free" is the one label kept visually prominent, because the Website Review is
the primary lead-generation offer and the word is the offer.

Rules that must hold if this section is edited later:

- `$199`, `$699`, `$1,200`, `$199/month`, `$750` and `$1,500` must not appear
  anywhere on the homepage — visible text or JSON-LD.
- Homepage schema declares no `price`, `priceCurrency`, `minPrice`,
  `maxPrice` or `priceRange`. It keeps `makesOffer` names, descriptions, and
  (for the two post-launch services) canonical URLs. `priceRange: "$$"` was
  removed on 2026-09-10 so the homepage asserts no pricing signal of any
  kind.
- All six homepage labels are distinct, so no two rows read identically.
- Service-page Offer schema keeps real figures, because those figures are
  visible on those pages. Schema and visible copy must stay in step — if a
  price is ever hidden on a page, its schema price goes with it.
- No hidden or off-screen pricing text exists for crawlers. Verified: the only
  currency figures in the homepage DOM are none at all.
- Prices in the two PDFs are unchanged.

## APPROVED

Supplied by Alberto with the build request and matched verbatim against the two
client-facing PDFs in `public/downloads/`:

- Section eyebrow, heading, and supporting copy.
- SiteLaunch Care: name, price ($199/month), headline, description, all seven
  included items, scope note, link label, PDF URL.
- Digital Brand Polish: name, displayed price (From $750), price note
  ($750–$1,500 pilot range), headline, description, all six included items,
  scope note, link label, PDF URL.
- Both PDFs: `SiteLaunch-Care-199-Monthly.pdf` and
  `SiteLaunch-Digital-Brand-Polish.pdf`, supplied as-is and not modified.
- Homepage short-form copy for both offers (summary sentence and three
  highlights each), and both "Explore ..." link labels.
- The six homepage engagement labels (Fixed-scope website / Project-based /
  Custom scope / Free / Monthly website support / Scoped brand refinement).

## OBSERVED

- Both PDFs return HTTP 200 with `Content-Type: application/pdf` from the
  production build (70,371 B and 70,654 B, both valid 1-page PDF v1.4).
- Existing services and prices in `ServicesPricing.jsx` are unchanged:
  Starter Launch Page $199, Conversion Landing Page from $699, Business
  Website from $1,200, Website Review free.

## PROPOSED

Wording written for this build, not lifted from the PDFs, and not a claim
about how the services operate:

- The label "Included" above each list. Neutral framing for the supplied
  bullet lists; change it if the PDFs use different wording.
- Page headings on the service pages: "What is included", "What is not
  included", "Pricing", "Get in touch", "Also after launch". Neutral
  structural labels, not claims.
- Meta titles and descriptions for both service pages. Written for search
  results; every fact in them (price, inclusions) restates approved copy.
- The exclusion bullet lists. These are the nouns lifted from the approved
  scope sentences, which are also shown verbatim above each list, so nothing
  is added — only reformatted for scanning.
- Condensed `makesOffer` descriptions in `Home.jsx`, and the two CTA
  paragraphs on the service pages ("Send your website and mention Care...").
  The CTA copy says only that a reply comes by email; it states no response
  window, since none is approved.
- PDF link labels "Download the Care plan" / "Download the Brand Polish
  offer".
- Revised Services footnote: "Every project is quoted before it begins. Logo
  design and full branding are not part of the starter page. Pricing is
  confirmed in the review." The previous wording said "Prices shown are
  starting points", which stopped being true once the figures came off the
  homepage.

## MISSING

Client decisions still open. None of these are stated anywhere on the page,
and none should be added without a real answer:

- Turnaround, response-time, or SLA language for SiteLaunch Care.
  Deliberately absent — nothing on the page promises a response window.
- Cancellation terms, minimum commitment, or notice period for the monthly
  retainer.
- Payment method, billing date, proration, and whether unused monthly minutes
  roll over.
- Revision counts for Digital Brand Polish.
- What "priority placement ahead of non-retainer small tasks" means in
  practice if two retainer clients ask at once.
- Whether Care requires SiteLaunch to have built the site, or is open to
  sites built elsewhere.
- Whether either service should appear in the header/footer navigation. Not
  added — nav was left untouched, so both pages are reachable only from the
  homepage "After launch" section and from each other.
- Whether the service pages should have their own contact form. They
  currently point at the existing `/#review` form, which is framed as a free
  website review rather than a service enquiry.
- Whether either service page should have an OG image of its own. Both
  currently inherit the site-wide `og-image.png`.

## Mobile section breaks

While the layout is stacked (below `lg`, where the Services and "Why work with
SiteLaunch" columns sit on one scroll), two section boundaries carry a hairline
with a short violet lead-in: above "Why work with SiteLaunch", and on the
existing top rule of "After launch". Both are `aria-hidden` decoration.

- Removed from layout entirely at `lg` (`display:none`), so the desktop
  two-column grid is unchanged.
- The stacked grid gap was tightened from `gap-10` to `gap-5` to absorb the
  first break's height. Net page cost of both breaks: about 2px.
- Total mobile page height at 390px went 8,977px to 9,011px (+34px, +0.38%).
  The larger part of that is the two "Details" toggles that returned to the
  Conversion Landing Page and Business Website rows once their labels stopped
  matching their timeframes — original behaviour, not new UI.

## Services rows

The mobile "Details" accordion was removed from all four rows. The only thing
behind it was the timeframe, and for two packages that timeframe just restated
the label. Every row is now fully visible at every breakpoint.

- `timing` is set only where a real duration exists: "About 10 business days"
  (Starter Launch Page) and "Two business days" (Website Review). Both render
  inline at every breakpoint.
- "Scoped per project" is no longer rendered anywhere. "Project-based" and
  "Custom scope" already say it, and it was never a duration.
- Mobile Services section: 1,375px to 1,311px. Total mobile page: 9,011px to
  8,947px.
- `accordionVariants` is left in `src/utils/motion.js`. No component uses it
  now; it stays as a shared utility for future disclosures.

## Screenshot capture (not a site issue)

The header is `position: fixed`, which makes two kinds of screenshot
misleading even when the site is correct:

- A viewport screenshot taken after scrolling to a mid-page section shows the
  header correctly pinned over that content, which reads as "the header is
  halfway down the page".
- Chrome's `fullPage` capture can paint a fixed element at whatever scroll
  offset it was left at.

Verified on a fresh load at 390x844 with no scrolling: header `position:
fixed`, `top: 0`, `aria-hidden="false"`, no transform, logo 125x28 at y=20,
menu button 44x44, `--header-height` published as 69px, and the h1 clears it
(top 93 >= 69). Scrolling down past 120px hides it
(`translateY(-69px)`, `aria-hidden="true"`, fully off-screen); scrolling up
returns it; returning to the top leaves it flush. No site change was needed.

`.qa/final-shot.mjs` is the corrected capture method: load fresh, screenshot
the top of the page before any scrolling, then settle lazy imagery, return to
scroll 0, and neutralise `position: fixed` in an injected style tag for the
duration of the fullPage capture only. The tag is removed afterwards and the
header is asserted back to `fixed` / `top: 0`.

## Asset limitations

- The two PDFs are the only assets for this section. No photography,
  diagrams, or brand-system imagery was supplied, so the section is
  typographic and uses the site's existing divider language rather than
  images.
- Both PDFs are single-page. They are linked, not embedded, and open in a
  new tab from the service pages only.
- Neither service page has photography or diagrams; no imagery was supplied
  for either offer, so both pages are typographic.

## Deployment readiness

`dist/` audited after a clean build: 48 files, six prerendered routes, both
PDFs present, `robots.txt` at `Allow: /`, no source screenshots, reference
boards, debug grids, markdown, scripts, logs, env files, or `.qa`/`docs`
leakage. The only `password` strings in the bundle are React DOM's internal
input-type maps, not credentials.

Both previously-flagged items are now closed.

**Sitemap.** `public/sitemap.xml` lists all six public canonical routes, in
site order, with no duplicates. Every entry was checked against the
`<link rel="canonical">` its page actually emits. `lastmod` values are either
preserved from the existing file or taken from the git commit that last
touched the page's source (`5996fb0`, 2026-08-29, for the Insights index and
Insight 002) - none were invented.

One inconsistency worth knowing: the homepage emits
`<link rel="canonical" href="https://sitelaunchstudios.com">` with no trailing
slash, while the sitemap keeps the pre-existing
`https://sitelaunchstudios.com/`. The two are the same resource (RFC 3986
normalises an empty path to `/`) and search engines treat them identically, so
the existing entry was preserved. Every other page on the site uses a trailing
slash, so aligning `url` in `src/pages/Home.jsx` would make the set uniform.
Not changed here - it was not in scope and carries no functional cost.

**Unused originals.** `logo1-6` in both `.png` and `.webp` (12 files) were
confirmed unreferenced across the whole project - literal strings, absolute
URLs, dynamically constructed paths, template literals, `import.meta.glob`,
CSS `url()`, `index.html`, every non-image file under `public/`, and the built
bundle. They were **moved, not deleted**, to
`source-assets/archive/unused-logo-originals/`.

- Build size: 29 MB to 16.9 MB (48 files to 36).
- `source-assets/` is in `.gitignore`, so the archive is not committed. The
  files were tracked before the move, so git will show 12 deletions and the
  originals stay recoverable from history.
- `logo.png` and `og-image.png` are still referenced (via absolute URLs in
  `SEOHead.jsx` and `Home.jsx` structured data) and were left in place.
- Other unreferenced files exist under `public/images/` -
  `insights/insight-002/06-get-a-free-website-review.png`,
  `reviews/carlos-review.png`, `reviews/tyson-review.png`, and four
  `sitelaunch-logo-*.svg` variants. These were **left in place**: they were
  outside the requested scope, and the SVG logo variants in particular look
  like intentional brand assets held for future use.

## Before public launch

- Confirm the PDFs in `public/downloads/` are the final client-facing
  versions. They ship publicly at fixed, guessable URLs and are not
  access-controlled.
- Decide the open items under MISSING before any sales conversation relies on
  the page as a complete description of either service.

## Workflow conflicts (reported, not acted on)

`../CLAUDE.md` describes a prospect-concept workflow that does not match this
repository, which is SiteLaunch Studios' own production site. Per the
instruction-priority rule these were reported rather than changed:

- `BRAND_GUIDELINES.md`, `references/01-initial-website-brand-direction.png`,
  `references/02-brand-system-board.png`, and `source-assets/` do not exist.
  The visual identity was read from the existing components instead.
- `netlify.toml` does not exist; the site appears to deploy through Netlify's
  UI configuration (`.netlify/` is present). Not created — inventing build
  settings could break the existing deploy.
- The prospect rules (`noindex`, `nofollow`, `noarchive`, and
  `robots.txt` with `Disallow: /`) directly conflict with this being a live,
  indexed site with a published `sitemap.xml`. `public/robots.txt` was left
  as-is (`Allow: /`).
