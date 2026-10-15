# The Insight format

Every published Insight has the same two parts, in this order. This is the
contract, not a suggestion: Insight 001 shipped without the second part while
002 and 003 had it, and nothing caught it. The checks listed at the bottom now
do.

## A. The article

Written for a person who found the page and wants the answer.

- Title, author line, honest publication date, and a reading time.
- The main takeaway stated early, in a sentence, not buried.
- The argument itself, supported by whatever actually helps: imagery from the
  source material, a comparison table, a worked example, a checklist.
- Observations from real SiteLaunch work. Not invented experience, not
  borrowed statistics, not a number nobody measured.
- Comfortable reading width and real headings.

## B. Common questions

A restrained section near the bottom, headed exactly `Common questions`.

- Four to six questions, chosen editorially. That range is a judgement about
  what a reader actually asks, not a formula, and it is not a claim about
  search volume.
- Each question is specific to that article and to something a potential
  customer needs to understand before hiring anyone.
- Each answer makes sense on its own, lifted out of the page. Name the
  subject in the answer. Do not open with "This", "That" or "It", because an
  answer read somewhere else has no antecedent.
- Add an example or a short explanation where it genuinely helps.
- No keyword stuffing, no repeated sales pitch, no unsupported statistics, no
  invented experience.

Then related Insights, then the website review action. `InsightArticle.jsx`
renders those two after the sections, so an article file does not add them.

The section exists so the answers are available to search engines and answer
engines as plain text, while still being worth reading on the page. It is not
a 50/50 split of the page, and nothing should be padded to reach a length.

## What this format requires mechanically

- The answers are real text in the delivered HTML. No client fetch, no
  expand-to-load, no image of text. A compact accordion is fine **only** if
  the full answer text is already in the HTML and can be expanded
  accessibly.
- `FAQPage` schema, where present, is generated from the same object that
  renders the visible section. `src/pages/insightSchema.js` does this, and it
  emits no `FAQPage` at all when the article renders no FAQ. Keeping it is a
  description of the page, not a claim about rich results or AI citations.
- No hidden crawler-only copy, no alternate page for bots, no cloaking.
- Reading time is computed by `src/lib/readingTime.js`, never typed into the
  article file. Two articles had drifted before it was derived.

## Adding an article

1. Create `src/data/insights/insight-00N.js`. Copy the shape of 002 or 003:
   both have the full set of section types.
2. Register it in `src/data/insights/index.js`. Routes, the sitemap entry,
   prerendering, the homepage browser and the Insights index all follow from
   the registry, so there is nothing else to wire up.
3. Give it a `faq` section. It is the last section in the array.
4. Add its cover under `public/images/insights/insight-00N/`, and record the
   cover's real `coverWidth` and `coverHeight`. The homepage card reserves a
   fixed plate, and a wrong intrinsic size used to move the card by up to
   60px between selections.
5. Run `npm test`, then `npm run build && npm run check:built`.

## What enforces this

| Check | Where |
|---|---|
| Every Insight has a `Common questions` section of 4 to 6 topic-specific questions | `src/data/insights/insights.test.js` |
| Answers stand alone, no em dashes, no invented statistics | `src/data/insights/insights.test.js` |
| FAQ schema matches the rendered answers exactly | `src/pages/InsightArticle.test.jsx` |
| Reading time is computed, and no `readTime` field survives | `src/data/insights/insights.test.js` |
| Article and every FAQ answer appear in the built HTML | `npm run check:built` |
| Each article is routed, prerendered and in the sitemap | `scripts/prerender.test.js` |
| The homepage card cannot change height between selections | `src/components/sections/HomeContent.test.jsx` |

## One standing constraint, unrelated to the format

Nothing inside the `lg:hidden` wrapper in `src/pages/Home.jsx` may use
framer-motion's `whileInView`. The build prerenders at 1366px, where that
wrapper is `display: none`, so a scroll-triggered animation inside it never
runs during the capture and its hidden starting state is serialised into the
page every visitor downloads. That is what made the How We Work illustration
ship at `opacity: 0`.
