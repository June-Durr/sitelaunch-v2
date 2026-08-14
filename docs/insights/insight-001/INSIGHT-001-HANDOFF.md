# Insight 001 implementation handoff

Approved direction: **B, Test-First**
Route: `/insights/seven-second-contractor-website-test/`
Reference design: `Insight 001 Editorial Routes.dc.html`, option 2b
Content object: `insight-001.js`

---

## 1. Final article copy

**Kicker:** INSIGHT 001 / CONTRACTORS

**H1:** Can a homeowner understand your website in seven seconds?

**Deck:** It is the first thing I do in a website review, and it takes less time than reading this sentence. Open the site on a phone and answer three questions.

**Metadata:** SiteLaunch Studios · 4 min read · August 2026

### Opening prose

A contractor website does not have to look bad to lose the call. It can look polished and still be unclear on the first screen.

You already know how your website works, which makes you the worst possible person to judge it. A homeowner arrives with no context, no patience, and a phone in one hand.

So do not judge it. Test it. Look at the first screen without scrolling, then look away and answer from memory. Whatever you cannot recall is what a stranger never received.

### Diagnostic module

Heading: **The 7-second check**
Eyebrow: Phone. First screen. No scrolling.

| #   | Question               | Support line                                            |
| --- | ---------------------- | ------------------------------------------------------- |
| 01  | What do you do?        | A service stated in words, not implied by a photograph. |
| 02  | Where do you work?     | The service area, visible without scrolling.            |
| 03  | What should I do next? | One obvious action: call, or request an estimate.       |

### 01 What do you do?

A homeowner should not have to deduce the trade from a photograph of a truck and a line about quality workmanship. The service belongs in the headline, in the words a customer would use out loud.

Pass: the service is legible in the headline itself.

### 02 Where do you work?

Service area is a qualifying question and it gets asked early. If a visitor cannot confirm that the business covers their street, they may return to the search results and try the next name on the list.

Pass: the area is visible without scrolling.

### 03 What should I do next?

There should be one action, and it should be calling or requesting an estimate. When that action competes with a menu, a social row and three secondary links, nothing reads as primary and the visitor is left to choose for themselves.

Pass: the next step is the loudest thing on the screen.

### Reading the answers

There is no score to calculate. Either a visitor can answer, or they cannot.

- All three obvious. The first screen is doing its job.
- One or more unclear. That is where a website review begins.

### Pull statement

> Paid traffic cannot fix a confusing website.

More clicks do not change the first screen. Every extra step between arriving and calling is another opportunity to leave, and a larger budget simply buys more of those opportunities. Fix the answers before raising the spend.

### Fix it in this order

| #   | Label          | Support line                            |
| --- | -------------- | --------------------------------------- |
| 01  | Clear service  | In the words a homeowner would use.     |
| 02  | Clear location | Confirm the business covers their area. |
| 03  | Clear action   | The single loudest thing on the screen. |

### CTA

Eyebrow: Failed one of the three?
Heading: Get a Free Website Review
Body: Not sure what a visitor sees first? Send me the site. I will show you three things I would fix first.
Button label: Get a Free Website Review
Target: `/#review` (existing Website Review form)

---

## 2. Homepage Insight card copy

- Eyebrow: INSIGHT 001 / CONTRACTORS
- Title: Can a homeowner understand your website in seven seconds?
- Excerpt: Three questions to answer on your own first mobile screen.
- Link label: Read Insight 001

No other text on the card.

---

## 3. Tokens

| Token                        | Value                           |
| ---------------------------- | ------------------------------- |
| Page background              | `#F5F1E9`                       |
| Ink                          | `#171717`                       |
| Body text                    | `#2A2926`                       |
| Secondary text               | `#5C5952`                       |
| Muted / captions             | `#74706A`                       |
| Accent                       | `#A855F7`                       |
| Marker red (fail state only) | `#D95D5D`                       |
| Image plate background       | `#FCF6EE`                       |
| Hairline rule                | `1px solid rgba(23,23,23,0.18)` |
| Heavy rule                   | `3px solid #171717`             |
| Display face                 | Space Grotesk 600/700           |
| Text face                    | Inter 400/500/600               |

Radius: 0 everywhere. No shadows, no gradients, no glow. Left alignment throughout.

---

## 4. Desktop layout (≥1200px)

Page max width 1440, outer padding 64.

**Header:** 84px tall, hairline bottom border. Left: SiteLaunch mark 28px + wordmark, 13px/600, letter-spacing 0.16em, uppercase. Centre: Work, Services, Insights, About at 15px/500; active item gets a 2px `#A855F7` underline. Right: solid `#A855F7` button, 14px/600, padding 13px 22px, label "Free Website Review".

**Hero:** two columns, `1fr 560px`, 72px gap, vertically centred, top padding 80.

- Left: kicker 12px/600, 0.2em, `#A855F7`; H1 Space Grotesk 700 at 62px, line-height 1.0, letter-spacing -0.038em; deck 21px/1.5 `#5C5952` capped at 600px; metadata row above a hairline, 13px/500 uppercase 0.1em with 4px purple square separators.
- Right: cover image plate, background `#FCF6EE`, height 660, image `height:100%; width:auto`, centred.

**Body grid:** `1fr 700px 240px`, 72px gap. Article measure is the fixed 700px centre column, roughly 70 characters. Left column stays empty (negative space). Right column carries the question index in the first body block only: eyebrow "The three" over a 2px charcoal rule, then the three questions at 14px/500 on hairlines. Optional `position: sticky; top: 112px` on the index.

**Vertical rhythm:** 80px between major sections, 56px between an H2 and the preceding paragraph block, 18 to 24px between paragraphs. H2 34px/1.1, letter-spacing -0.025em. Body 19px/1.75; the first paragraph of the article runs 21px/1.6.

**Diagnostic module:** inset 64px from each side, background `#171717`, padding 56. Title row: "The 7-second check" Space Grotesk 700 at 40px in `#F5F1E9`, eyebrow right-aligned in `#A855F7` at 12px/600 uppercase 0.2em. Three rows split `38px / 400px / 1fr`: numeral in purple 20px/700, question in ivory Space Grotesk 600 at 30px, support line 17px/1.6 at `rgba(245,241,233,0.66)`. Rows divided by `1px solid rgba(245,241,233,0.28)`, including a closing rule.

**Question sections:** H2 carries the numeral inline in `#A855F7` 700 followed by a non-breaking gap. Pass line is a `3px solid #A855F7` left border, 18px inset, 17px/500 in `#171717`. No card, no fill.

**Reading the answers:** two hairline rows. Pass marker is a 14px solid `#A855F7` square; fail marker is a 14px square with a `3px solid #D95D5D` border and no fill. Text 19px.

**Pull statement:** full content width inside the 64px padding, `3px solid #171717` top and bottom, 56px vertical padding, Space Grotesk 700 at 58px, line-height 1.04, letter-spacing -0.035em, capped at 1000px. No background, no quote marks, no attribution.

**Fix it in this order:** three hairline rows, baseline aligned, columns `30px / 180px / 1fr`: purple numeral 18px/700, label Space Grotesk 600 at 21px, support line 17px `#5C5952`.

**CTA:** full-bleed `#171717` band, 76px vertical padding, content and button on one row. Eyebrow "Failed one of the three?" in `#A855F7`; heading Space Grotesk 700 at 46px in `#F5F1E9`; body 19px at `rgba(245,241,233,0.72)`. Button is solid `#A855F7`, 16px/600, padding 22px 34px. Button is an `<a>`, not a `<button>`.

**Footer:** `#171717`, grid `1fr 180px 180px 180px`, light logo 34px, line "Websites for contractors and small businesses in South Florida.", three link columns (Studio, Insights, Start) with purple 11px uppercase headings, bottom row 13px at 50 percent ivory. Match the live site footer if it differs.

---

## 5. Mobile layout (390px reference)

Single column, 22px side padding.

- Header 62px: mark 22px + "SiteLaunch" 11px uppercase, two-bar menu icon.
- Hero padding-top 26. H1 35px, line-height 1.0, margin-top 12. Deck 17px/1.45, margin-top 14. Metadata row 11px uppercase between hairlines. Cover plate margin-top 18, height 340. This keeps the top of the cover image inside a 390 × 844 first viewport without tightening the type.
- Body 17px/1.7; opening paragraph 18px/1.6. H2 24px/1.1.
- Diagnostic module goes full-bleed charcoal, 32px vertical padding. Rows collapse to numeral + question only; the support lines are dropped on mobile because each question is repeated as its own section below.
- Question sections keep the inline numeral and the purple-bordered pass line.
- Pull statement is inset 22px with 3px rules top and bottom, 30px display type.
- Fix rows: `22px / 120px / 1fr`, support lines shortened.
- CTA and footer full-bleed charcoal, button full width, 18px vertical padding.
- Section spacing 30 to 34px. No section exceeds one screen of uninterrupted prose.

Breakpoints: single column below 900px, two-column hero and the question index return at 1200px. The 240px index column drops first.

---

## 6. Cover image and thumbnail

One asset for both placements: the existing text-free JPEG (phone outline, black and white hand, purple button, ivory field). No new artwork, no text baked into the image.

- **Article cover:** container background `#FCF6EE`, image contained (`height:100%; width:auto`) so the full phone is always visible. Desktop 660px tall in the hero's right column; mobile a 340px tall band below the metadata.
- **Homepage thumbnail:** same file, cropped in CSS. Use `object-fit: cover` with `object-position: 62% 38%` and a card image height around 230px at 390px wide. The intent: the whole phone outline reads, the phone occupies roughly 40 to 50 percent of the frame and sits slightly right of centre, the purple button stays visible, the hand enters from the lower right without dominating, and the top of the phone frame is never clipped. Verify at small sizes; adjust `object-position` rather than re-exporting the asset.
- Plate background must match the artwork's own ivory (`#FCF6EE`), otherwise contained images show visible side seams.

---

## 7. Motion

Keep it minimal.

- Diagnostic module rows: 200ms fade and 8px rise, 60ms stagger, once on enter.
- Pull statement: 240ms fade only.
- Nothing else animates. No parallax, no counters, no scroll-jacking.
- All of it gated behind `prefers-reduced-motion: reduce`, which disables the transforms and shows final state immediately.

---

## 8. Accessibility

- One `<h1>`. Question sections and Reading the answers are `<h2>`. The diagnostic module heading is an `<h2>`; the three questions inside it are list items, not headings.
- Diagnostic items, Reading the answers, and Fix it in this order are `<ol>` / `<ul>`. The numerals are list content, not decorative pseudo-elements, so screen readers announce them.
- The pass and fail markers in Reading the answers are decorative; the meaning is carried by the sentence. Mark the squares `aria-hidden="true"`.
- Ivory on charcoal and ivory on `#A855F7` both clear 4.5:1 at the sizes used. `#5C5952` on `#F5F1E9` clears 4.5:1; do not lighten it further for body text.
- The pull statement is a `<p>`, not a `<blockquote>`, since it is authored copy rather than a quotation.
- CTA is a link with a visible focus ring: 2px `#171717` outline with a 2px offset on the purple button, 2px `#A855F7` on charcoal surfaces.
- Cover alt text: "Outlined phone with a purple button, hand entering from the lower right." Decorative repeats of the same asset take `alt=""`.
- Target sizes at least 44px on mobile. The header menu control needs an accessible name.
- Article body honours user font scaling; do not lock font sizes in `px` inside the reading column if the site supports `rem` scaling.
