# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Contractors and small local businesses in South Florida. They usually find and judge the site on a phone, often between jobs, and decide quickly whether SiteLaunch is worth contacting. Contractors and other local businesses are served by the same approach; no single trade is singled out.

## Product Purpose

SiteLaunch Studios is a one-person web design studio in Miami that designs and builds websites for these businesses. The marketing site has one job: get the visitor to request a free website review or call. Success is a submitted review request or a phone call.

## Positioning

- **Direct with the builder.** The client talks to the person who designs and builds the site. No account manager, no handover halfway through.
- **Mobile decides the design.** The phone layout is designed first, because that is where visitors arrive and where most sites fall apart.

## Operating Context

- Every project starts with a free website review. The client then receives a written scope, schedule, and price before work begins. There are no fixed packages and no published prices.
- Three services: launch a new website, build one focused landing page, improve the site the client already has.
- Process: Review, Direction (structure and layout signed off before building), Build (mobile first, one revision round), Launch (deployment, metadata, real-device check), Improve.
- Consultations in English and Spanish.
- Insights articles (`/insights`) follow a fixed format documented in `docs/insights/INSIGHT-FORMAT.md`.

## Capabilities and Constraints

- Stack: React, Vite, Tailwind, Framer Motion, react-router; routes are prerendered to static HTML at build (`scripts/prerender.js`) and deployed on Netlify.
- Conversion paths: the free website review form (EmailJS) and the phone number `tel:+17865055791`.
- Search: crawlable text, real headings, metadata and structured data that match the visible page. No ranking or AI-citation guarantees are made.

## Brand Commitments

- Name: SiteLaunch Studios. Logo and icon SVGs in `public/images/`.
- Voice: studio "we". Plain and direct, short sentences, the way a sharp contractor talks.
- Copy bans: no agency jargon, no dev jargon, never mention AI as the builder, no em dashes, no en dashes, no curly quotes, never single out one trade.
- Visual direction is already set and binding: `docs/rebrand/Sitelaunch Design Aug 2026.pdf`. Ivory and ink, purple as the only accent, Space Grotesk headlines, Inter body.

## Evidence on Hand

- Case studies approved for public display: Moth to Flame (band and booking site) and Sweet Stax (Webflow refinement). Data in `src/data/projects.js`, images in `public/images/projects/`.
- Verified Google reviews: 5.0 rating, 5 reviews. Quotes from Carlos Flores Iselo (owner of Sweet Stax) and Tyson Harvey are transcribed verbatim in `src/data/reviews.js` from `public/images/reviews/`; never paraphrase them.
- Showreel video in `public/videos/`.
- Absent, never fabricate: further clients, testimonials, statistics, benchmarks, prices, awards, or team members.

## Product Principles

1. One job per page: every surface leads to the free review or a call.
2. The phone is the real site. Judge everything on a phone first.
3. Proof over claims: show real work and real reviews, never invented ones.
4. Talk like the person doing the work: plain, direct, no jargon.
5. Clear before clever: the visitor should know what SiteLaunch does, for whom, and what to do next within seconds.

## Accessibility & Inclusion

- English and Spanish speakers are both first-class audiences.
- Motion respects `prefers-reduced-motion` (already wired through `MotionConfig reducedMotion="user"`).
