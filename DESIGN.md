---
name: SiteLaunch Studios
description: Ivory and ink, purple as the only accent. Rules and space instead of cards and shadows.
colors:
  ivory: "#F5F1E9"
  ink: "#171717"
  purple: "#7C3AED"
  purple-light: "#A855F7"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.55rem, 7vw, 5.5rem)" # DRIFT D1: desktop maximum unresolved
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "30px" # 36px from 640px; DRIFT D2: desktop size unresolved
    fontWeight: 700
    lineHeight: 1.1
  title-lg:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "24px" # 30px from 640px
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "20px" # DRIFT D3: desktop size unresolved
    fontWeight: 600
    lineHeight: 1.3
  quote:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "24px" # 30px from 640px; DRIFT D4: desktop size unresolved
    fontWeight: 400
    lineHeight: 1.35
  numeral:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "24px" # DRIFT D5: size unresolved
    fontWeight: 700
    lineHeight: 1
  price:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "20px" # 32px from 1024px; from the PDF only, not shipped
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.14em"
  button:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
rounded:
  control: "4px"
  none: "0"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "7": "28px"
  "8": "32px"
  "12": "48px"
  "18": "72px"
components:
  button-primary:
    backgroundColor: "{colors.purple}"
    textColor: "#FFFFFF"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: "52px"
    padding: "0 24px"
  button-header:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: "44px"
    padding: "0 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: "52px"
    padding: "0 24px"
  toggle-selected:
    backgroundColor: "{colors.purple-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "52px"
  field:
    textColor: "{colors.ivory}"
    rounded: "{rounded.control}"
    height: "52px"
    padding: "0 16px"
---

# Design System: SiteLaunch Studios

Source: `docs/rebrand/Sitelaunch Design Aug 2026.pdf`, reconciled with the shipped code. Where the PDF and the live site disagree on content, the live site wins. Where a measured PDF size or space is more than a few pixels from the code, nothing is picked: the frontmatter holds the shipped value as a placeholder and the item is listed under **Drift** at the end.

## Overview

**Creative North Star: "The Job Sheet"**

Plain, direct and ruled like a contractor's job sheet: a warm ivory page, dense ink type, and one purple accent that only ever points at the next step. Lists are separated by rules and space, not boxed into cards. Dark ink bands carry the work, the proof and the review form.

**Key Characteristics:**
- Ivory ground, ink type, purple as the only accent.
- Space Grotesk for headlines, numbers and prices; Inter for everything you read.
- Rules and changes of ground separate content. No shadows anywhere.
- Square corners, except 4px on buttons and form fields.
- The phone layout is designed first, at 390px.

## Colors

Two neutrals and one accent in two strengths.

### Primary
- **SiteLaunch Purple** (`colors.purple`): the primary button, link underlines, kickers, the numbered markers, prices, the reel progress line and the footer rule.
- **Purple Light** (`colors.purple-light`): the purple used on ink. The selected form toggle, kickers and numerals on dark bands, and the rating stars.

### Neutral
- **Ivory** (`colors.ivory`): the page ground everywhere, and the text colour on ink.
- **Ink** (`colors.ink`): all headlines and body text on ivory, the heavy 2px list rule, the header button, and the ground of the dark bands (reel, rating strip, featured review, review form).

### Tints
Tints are transparency on the two neutrals, not new colours.
- **Secondary text** (ink at 80%): supporting paragraphs on desktop.
- **Muted text** (ink at 65–70%): category labels, meta lines. 65% is the floor (5.3:1 on ivory); 60% sits exactly on 4.5:1 and lighter fails.
- **Hairline** (ink at 10%): the 1px divider between list items.
- **Muted on dark** (ivory at 60%): attributions, "5 verified Google reviews", the form reassurance line.
- **Raised on dark** (ivory at 6% over ink): form field grounds inside the review form. Placeholder text on it is ivory at 60% (6.5:1).

### Contrast pairs
Text must reach 4.5:1. These are the allowed text pairs:

| Text | Ground | Ratio |
|---|---|---|
| Ink | Ivory | 15.9 |
| Ink at 80% / 70% / 65% | Ivory | 8.8 / 6.3 / 5.3 |
| Purple | Ivory | 5.1 |
| White | Purple | 5.7 |
| Ivory | Ink | 15.9 |
| Ivory at 60% | Ink | 7.0 |
| Purple light | Ink | 4.5 |
| Ink | Purple light | 4.5 |

Never as text: purple light on ivory (3.5), purple on ink (3.2), white on purple light (4.0), purple light on the raised field ground (4.0).

### Named Rules
**The One Purple Button Rule.** One purple button per screen. Every other action is a text link with a purple underline, or the ink header button.

**The No Purple Ground Rule.** Purple is never a background, except inside the review form (the submit button and the selected toggle).

## Typography

**Display Font:** Space Grotesk (with system-ui)
**Body Font:** Inter (with system-ui)

**Character:** A slightly mechanical grotesk for the loud parts, and a plain workhorse for everything you read.

### Hierarchy
- **Display** (700, `typography.display`, 0.98): the hero headline only. Tracking -0.025em.
- **Headline** (700, 30px, 36px from 640px, 1.1): section headings.
- **Title large** (700, 24px, 30px from 640px, 1.2): audience pair headings and case study names.
- **Title** (600, 20px, 1.3): list item titles in services, why-us and process.
- **Quote** (400, 24px, 30px from 640px, 1.35): verified Google review text. Quoted verbatim, never shortened except by a verbatim excerpt.
- **Numeral** (700, 24px, 1): the 01–03 markers, process numbers and the 5.0 rating, in purple.
- **Price** (700, 20px, 32px on desktop, 1.1): see the Price component. Not shipped.
- **Body** (400, 16px, 1.5): all running text. Measure 45–75 characters.
- **Small** (400, 14px, 1.5): meta lines, category labels, footnotes.
- **Label** (600, 12px, 0.14em, uppercase): kickers only.
- **Button** (600, 16px): buttons and the toggle.

### Named Rules
**The 16px Floor Rule.** Body copy never drops below 16px on mobile.

**The Clear Step Rule.** Adjacent heading levels differ by at least 1.25× at every width: headline to title large, title large to title, title to body. Small (14px) is not a step below body; it is only used for meta, in muted ink.

## Layout

- Phone layout is designed at 390px and holds to 430px; desktop at 1440px.
- Side gutters: 16px below 640px, 24px from 640px, 32px from 1024px. Content container: 1152px maximum.
- Section padding: 48px on mobile, 72px from 1024px.
- Every space is a multiple of 4px, and of 8px wherever possible.
- List rows: 16–20px of padding between rules.
- Kicker to heading: 8px. Heading to body: 8–12px.
- Header height: 68px.
- The headline, supporting line, primary button and the top of the reel all fit inside the first 844px screen on a phone. "See our work" is a text link under the button, not a second button, so the reel comes up about 90px.
- Project screenshots are cropped to 300px from the top.
- Nothing depends on hover. No section scrolls sideways.

## Elevation & Depth

Flat. There are no shadows. Depth comes from a change of ground (ivory to ink) and from rules.

**The No Shadow Rule.** No box shadows or glows on anything, at rest or on hover.

## Shapes

Square by default: sections, bands, images, the reel and panels have no radius. Buttons, the toggle and form fields have a 4px radius (`rounded.control`).

**The Three Cards Rule.** Only three card surfaces exist: the review form's two panels and the pricing surface on mobile. Everything else is separated by rules and space.

## Components

### Buttons
- **Primary:** purple fill, white text, 52px tall, full width on mobile. One per screen.
- **Header:** ink fill, ivory text, 44px tall. Keeps the header from spending the purple.
- **Secondary (desktop hero only):** transparent with a 1px ink outline, ink text, 52px tall.
- **Focus:** a visible 2px outline offset from the control, in purple on ivory and purple light on ink.

### Text link
Ink text with a 2px purple underline, offset from the baseline. The row is at least 44px tall where it stands alone.

### Kicker
Label style, uppercase, purple on ivory and purple light on ink. Sits 8px above its heading.

### Header
Mobile: logo and a menu button. Desktop: logo, five links (Work, Services, Contractors, Insights, About) and the ink header button.

### Selected work reel
An ink band with a "Selected work / Reel" kicker, a 01 / 02 counter, the project name, a muted category and a purple progress line.

### Numbered list
A 2px ink rule on top, purple numerals, a title and one line of body. Hairline rules between items.

### Google rating strip
An ink band: purple-light stars, "5.0 ON GOOGLE", "5 verified Google reviews" and a "Read reviews" link.

### Case study
Name and category, then three labelled rows (The ask, What we did, Key decision), two phone screenshots and a "See the project" link.

### Review quote
Dark version (ink band, used inside the Sweet Stax case study) and light version (on ivory, Tyson Harvey). Kicker, verbatim quote, name, and a "Read all 5 reviews on Google" link.

### Audience pair
Businesses and Contractors side by side, each with a label, a title, one line of body and a text link.

### Services list
Rule-separated items, each with a title and a description. Live content is three services with no prices.

### Price (not shipped)
For later use only. A Space Grotesk bold figure in purple, right-aligned to the item title: "$199", "From $699", or "Free". Timing notes ("About 10 business days") sit in muted small text. Prices stay unpublished until decided otherwise.

### Why work with us
A two-column list of reasons on desktop, one column on mobile, separated by hairlines.

### Process
Five steps (Review, Direction, Build, Launch, Improve). A list on mobile, five columns on desktop.

### Insight list item
Number and category, title, summary, a "Read insight" link and a cover card.

### Review form
An ink panel. A two-way toggle ("I already have a website" / "I need a website"), labelled fields on the raised tint (4px radius, 52px tall), a full-width purple submit button, and a reassurance line in muted-on-dark. Desktop adds the phone and location rows.

### Footer
Logo and a tagline, the SITE / CONTACT / LEGAL columns, a purple rule and a closing line.

## Do's and Don'ts

### Do:
- **Do** keep one purple button per screen.
- **Do** use the ink header button.
- **Do** separate content with rules, space and a change of ground.
- **Do** quote reviews verbatim.

### Don't:
- **Don't** add shadows.
- **Don't** round anything except buttons and fields (4px).
- **Don't** add a fourth card surface.
- **Don't** put purple behind anything except inside the review form.
- **Don't** publish prices.

## Drift

Each item below is unresolved. The frontmatter holds the shipped value as a placeholder until you choose.

| # | Item | PDF | Shipped code |
|---|---|---|---|
| D1 | Display, desktop maximum | ≈96px | 88px |
| D2 | Headline, desktop | ≈48px | 36px. Fails the Clear Step Rule against title large (30px, 1.2×); 48px passes |
| D3 | Title, desktop | ≈24px | 18px |
| D4 | Quote, desktop | ≈40px | 30px |
| D5 | Numerals (01–03 markers, 5.0 rating) | ≈32–36px | 24px markers, 16px rating |
| D6 | Mobile side gutter at 390px | ≈24px | 16px |
| D7 | Desktop layout | ≈64px gutters, near full width | 1152px container, 32px gutters |
| D8 | Body size in service, why-us and process descriptions | 16px minimum (stated) | 14px |

### Shipped values outside this system

These are in the code but not in the four colour tokens or the rules above. None has been adopted. Each is either added to the system by you or removed in stage 5.

| # | In the code | Uses | Note |
|---|---|---|---|
| C1 | `violet-400` (#C084FC) as purple on ink | 15 | The system's purple on ink is `purple-light` (#A855F7) |
| C2 | `#FCF6EE` paper panel | 4 | Insight covers and figures. The PDF's lighter panel (sampled #FBF8F3) |
| C3 | `#2A2926` text, `#5C5952` text | 11 | Insight article body and comparison tables |
| C4 | `#0FCCCE` | 3 | `index.css`, old scrollbar/legacy styles |
| C5 | `#D95D5D` | 1 | Insight prose marker |
| C6 | `bg-white` grounds | 9 | |
| C7 | Shadows: `shadow-sm` ×4, `shadow-md`, `shadow-2xl`, `.shadow-custom` | 7 | Breaks the No Shadow Rule |
| C8 | Radius: `rounded-md` (6px) on buttons and fields, plus `rounded-lg`, `rounded-2xl`, `rounded-full` | many | The system says 4px on controls, square elsewhere |
| C9 | `text-white` on ink bands | part of 59 | The system's text on ink is ivory. White stays correct on purple buttons |
| C11 | Muted text below the contrast floor: `text-ink/40`, `/45`, `/50`, `/55` on ivory (2.5–3.9:1); `text-white/40` on ink (3.8:1) | 19 | Raise to ink at 65% and ivory at 60% |
| C12 | Off-grid spacing: 2px, 6px, 10px, 14px gaps and a 7px padding | ~20 | Snap to 4, 8, 12, 16px |
| C10 | Unused `primary` (sky blue) and `navy` scales in `tailwind.config.js` | 0 | Not part of the brand |
