# SiteLaunch Design System

The source of truth for every page on sitelaunchstudios.com. Derived from the
shipped site (October 2026), then tightened: one accent, one type scale, one
button, one spacing rhythm. If code and this file disagree, this file wins.

Stack: React 18, Vite, Tailwind CSS 3. Tokens live in `tailwind.config.js`;
the type, button, link and layout classes below live in `src/index.css`
(`@layer components`). Use those classes rather than re-typing their values.

## 1. Identity

Editorial, warm, quiet. Ivory paper, near-black ink, one violet accent.
Sections are separated by hairline rules and space, not cards and shadows.
Dark ink bands carry proof (reviews) and the conversion form.

## 2. Color

### Grounds

| Token | Value | Role |
|---|---|---|
| `ivory` | `#F5F1E9` | Page background. The default ground. |
| `white` | `#FFFFFF` | Raised surface on ivory: the FAQ band, Insight cards. |
| `paper` | `#FCF6EE` | Media well: the frame behind article covers and figures. |
| `ink` | `#171717` | Dark bands (trust strip, review, form, footer, article CTA). |

### Accent (violet)

| Token | Value | Use on | Role |
|---|---|---|---|
| `accent-600` | `#7C3AED` | light and dark | Primary button fill, kickers, numbers, markers, links on light, focus ring |
| `accent-700` | `#6D28D9` | light | Hover for primary button and links on light |
| `accent-400` | `#A78BFA` | dark | Kickers, links, stars on ink |
| `accent-300` | `#C4B5FD` | dark | Link hover on ink |

The accent is for kickers, numbered markers, link underlines and the one
primary button per screen. No accent ground except the selected option in the
review form and the primary button itself.

### Text

| On | Primary | Body | Muted (minimum) |
|---|---|---|---|
| Light grounds | `ink` (15.9:1) | `ink/80` (8.8:1) | `ink/65` (5.3:1) |
| Ink | `white` (17.9:1) | `white/80` (11.7:1) | `white/60` (7.0:1) |

Nothing lighter than `ink/65` or `white/60` may carry text. Placeholders on
ink use `white/50` (5.3:1). Text on ink is white, never ivory.

### Lines and overlays

| Token | Role |
|---|---|
| `ink/10` | Hairline divider on light |
| `ink/20` | Emphasis rule on light (table rows, list frames, the 1px Insight card frame) |
| `ink` 3px | Pull statement rules only |
| `white/15` | Hairline divider on ink |
| `white/25` | Emphasis rule on ink |
| `white/40` | Form field border on ink (3.8:1, meets the 3:1 control rule) |
| `ivory/95` + blur | Fixed header |
| `ink/75` + blur | Control floating on media (reel pause button) |

### Status

| Token | Value | Role |
|---|---|---|
| `error` | `#F87171` | Form error text on ink (6.5:1) |
| `signal` | `#D95D5D` | Non-text "problem" marker in articles only. Never text. |

## 3. Typography

Families: **Space Grotesk** (500, 600, 700) for display and headings,
**Inter** (400, 500, 600, 700) for everything else. Both from Google Fonts.

| Class | Mobile | sm (640) | lg (1024) | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|---|---|
| `type-display` | clamp 28px to 40px (9.4vw) | clamp 40px to 88px (7vw) | | 700 | 0.98 | -0.03em | Homepage hero only. Below `sm` the size follows the viewport so each of the two set lines holds on one line |
| `type-title` | 40px | 48px | 60px | 700 | 1.04, lg 1.0 | -0.03em | Page h1 only (articles, Insights, Privacy, 404). Nothing else on a page may match the h1 size |
| `type-heading` | 30px | 36px | | 700 | 1.1 | -0.025em | Section h2, CTA headlines, footer close, article pull statement (a `<p>` between 3px ink rules) |
| `type-heading-fit` | clamp 24px to 30px (6.4vw) | 36px | | 700 | 1.1 | -0.025em | `type-heading` for a fixed two-line statement (footer close), with `text-balance`. Below `sm` it scales so each line holds on one line from 375px |
| `type-subheading` | 24px | 28px | | 700 | 1.15 | -0.02em | Card and case study titles, interlude line |
| `type-quote` | 24px | 28px | | 500 | 1.375 | 0 | Short review quotes, about 40 words or fewer (Space Grotesk). Longer quotes use `type-lead` in `white/80` |
| `type-card` | 20px | | | 600 | 1.3 | 0 | List item titles, FAQ questions, form and modal titles |
| `type-lead` | 18px | 19px | 21px | 400 | 1.5 | 0 | Standfirst under a page title |
| `type-prose` | 17px | | 19px | 400 | 1.7 | 0 | Article and policy body copy |
| `type-body` | 16px | | | 400 | 1.625 | 0 | All other paragraph copy |
| `type-small` | 14px | | | 400 | 1.5 | 0 | Meta only: attributions, counts, captions, helper text, legal, footer utility links |
| `type-label` | 12px | | | 600 | 1.5 | 0.14em, uppercase | Kickers, field labels, column labels |

Numbered markers (`01`, `02`) take the size of the item they number, in
`accent-600` (light) or `accent-400` (dark). The wordmark keeps its own
uppercase `tracking-wide`.

Rules:
- Paragraph copy is never below 16px on any screen. 14px is meta only.
- One letter-spacing for uppercase labels: 0.14em.
- Adjacent levels differ by at least 1.25x. Three pairs are closer and are
  allowed only because their roles never compete; family, weight and color
  carry the difference:
  - `type-card` (20px Space Grotesk 600) beside desktop `type-prose` (19px
    Inter 400) in article lists.
  - `type-card` (20px Space Grotesk 600) and desktop `type-lead` (21px Inter
    400) on article pages. The lead only ever sits under the page title; card
    titles sit in lists further down.
  - `type-quote` and `type-subheading` share 28px at `sm`. Quotes are weight
    500 in their own ink band; subheadings are 700 titles. Never set both in
    the same block.
- Copy that ships: no em dashes, no en dashes, no curly quotes, no mention of
  AI as the builder, no dev jargon.

## 4. Spacing

Base unit 4px: every spacing value is a multiple of 4px, using Tailwind's
whole-number scale (`1` = 4px). Spacing between blocks and sections prefers the
8px steps (`2`, `4`, `6`, `8`, `10`, `12`, `16`, `20`, `24`); the 4px steps
(`1`, `3`, `5`, `7`) are for tight internal offsets, list rows and card
padding. Half steps (`1.5`, `2.5`, `3.5`) are not allowed; `0.5` (2px) is
allowed only for icon-to-icon gaps. Arbitrary values are allowed only for
optical alignment of small markers (the process timeline dot and line, the
checklist square's `mt-[0.4em]`), the reading column's `lg:ml-[8.333%]`, and
anchor targets' `scroll-mt-[calc(var(--header-height,68px)+8px)]`, which clears
the fixed header.

| Token | Value | Use |
|---|---|---|
| Gutter | `px-4` / `sm:px-6` / `lg:px-8` (16 / 24 / 32px) | Every full-width container |
| Container | `max-w-6xl` (1152px) | Every section |
| Reading column | `max-w-[43.75rem]` (700px), `lg:ml-[8.333%]` | Article and policy body |
| `section-y` | `py-12` / `sm:py-20` (48 / 80px) | Every standard section and the footer |
| `section-y-lg` | `py-16` / `sm:py-24` (64 / 96px) | Dark proof and conversion bands (review, form) |
| Article block | `py-8` / `sm:py-10` / `lg:py-14` | Each block inside an article |
| Article sub-block | prose `py-4`/`5`/`6`, figure `py-6`/`8`/`10` | Prose runs and figures between blocks |
| Heading to content | `mt-6` / `sm:mt-8` | First content after a section heading |
| Kicker to heading | `mt-3` | |
| List rows | `py-4` / `sm:py-5` | Rows in ruled lists |

Measure: paragraph widths cap at `max-w-md` (448px) in two-column layouts and
`max-w-2xl` (672px) elsewhere.

## 5. Shape and depth

| Token | Value | Use |
|---|---|---|
| `rounded-md` | 6px | Every control: buttons, inputs, the segmented choice |
| `rounded-full` | | Dots, progress pills, circular icon buttons |
| none | 0 | Media, cards, panels, the modal. Square at every breakpoint. |
| `shadow-media` | `0 12px 24px rgb(23 23 23 / 0.15)` | Document screenshots sitting on `paper` only |

No other shadows. Depth comes from ground changes (ivory, white, ink) and rules.

## 6. Components

### Buttons
| Class | Look | Use |
|---|---|---|
| `btn btn-primary` | `accent-600` fill, white 16px semibold, 52px tall, `rounded-md`, hover `accent-700` | The one primary action per screen |
| `btn btn-dark` | `ink` fill, white | Header action on ivory |
| `btn-compact` (modifier) | 44px tall, 14px text, `px-5` | Header actions only |

All buttons: `active` press scale 0.97 (160ms ease-out), background color
transition 160ms, 2px `accent-600` focus ring offset 2px, disabled at 60%
opacity. Full width on mobile when they are the section's main action.

### Links
| Class | Use |
|---|---|
| `link` | Standalone text action on light: `accent-600`, semibold, underline offset 4px, hover `accent-700` |
| `link-on-dark` | Same on ink: `accent-400`, hover `accent-300` |
| Inline prose links | `accent-600` underline, hover `accent-700`, regular weight |

### Kicker
`type-label` in `accent-600` (light), `accent-400` (dark) or `ink/65` (muted).
Sits `mt-3` above its heading.

### Forms (on ink)
Field: `rounded-md`, `white/5` fill, `white/40` border, 16px white text,
`white/50` placeholder, focus border and ring `accent-400`. Label: `type-label`
in `white/60`. Errors: `error` text, announced with `role="alert"`, the field
gets `aria-invalid` and `aria-describedby`, and focus moves to it.
Segmented choice: one bordered `rounded-md` control, selected half `accent-600`.

### Modal
Square `ivory` panel, `max-w-2xl`, ink header rule. Title `type-card`,
body `type-body` in `ink/80`. `role="dialog"`, `aria-modal`, labelled by its
title, focus moves into it and returns to the trigger, Escape and backdrop
close it. Backdrop `ink/60`.

### Structure
Header (fixed, `ivory/95` with blur, hides on scroll down on mobile and slides
back on scroll up or as soon as anything inside it takes keyboard focus; it is
never `aria-hidden`), footer (ink, `white/15` top rule, closing CTA, three
utility columns, accent rule), ruled lists, ruled FAQ (`details`; at `lg` the
heading column is `1fr` beside a `1.25fr` list so the heading holds to three
lines), case study rows, Insight card (white fill, 1px `ink/20` frame, square,
`paper` media well).

## 7. Motion

- One easing for UI: `[0.16, 1, 0.3, 1]` (`EASE` in `src/utils/motion.js`).
- Entrances: fade and rise once on scroll (`Reveal`), never replayed.
- Hover and color changes: 160ms. Presses: scale 0.97, 160ms ease-out.
- Modal: opacity and scale 0.96 to 1 in 200ms ease-out, exit 150ms. No bounce.
- Mobile menu: 220ms fade and 8px drop, items staggered 60ms.
- UI motion stays under 300ms. Only transform and opacity animate.
- Hover effects apply only on devices that hover (`hoverOnlyWhenSupported`).
- `prefers-reduced-motion` is respected everywhere (`MotionConfig reducedMotion="user"`).
- Nothing inside the mobile-only `lg:hidden` services interlude may use
  `whileInView` (the build prerenders at 1366px).

## 8. Accessibility floor

- Text contrast 4.5:1 minimum, controls and focus rings 3:1.
- Every interactive element shows a visible focus ring.
- Tap targets 44px minimum, primary actions 52px.
- One `h1` per page; one `main` landmark per page.
