// Registry of published Insights. Add future entries (insight-004, ...) as
// their own file in this folder, then list them here — InsightArticle.jsx
// looks articles up by slug through this file, so nothing else needs to
// change to publish a new one.
//
// BEFORE ADDING ONE, READ docs/insights/INSIGHT-FORMAT.md.
//
// Every published Insight is a reader-facing article followed by a
// "Common questions" section of four to six topic-specific questions and
// answers. Insight 001 shipped without that section while 002 and 003 had it,
// and nothing caught the difference. The format doc is the contract and lists
// the checks that now enforce it.
//
// Order is by Insight number, which is also the order the homepage browser
// rotates through and the order the Insights index lists.
//
// Imports carry explicit .js extensions because scripts/prerender.js imports
// this file directly in Node, which does not do extensionless resolution.
// Vite is happy either way.
import { insight001 } from "./insight-001.js";
import { insight002 } from "./insight-002.js";
import { insight003 } from "./insight-003.js";

export const INSIGHTS = [insight001, insight002, insight003];

export const getInsightBySlug = (slug) =>
  INSIGHTS.find((insight) => insight.slug === slug) || null;

// The homepage teaser reads from this instead of importing a specific
// insight by name, so promoting a future entry to the homepage is a
// one-line change here rather than an edit to the homepage component.
export const getFeaturedInsight = () =>
  INSIGHTS.find((insight) => insight.featured) || INSIGHTS[0] || null;

// Previous / next by Insight number, plus whatever is left over, so each
// article links to every other published one rather than only its
// neighbours. Returns nulls rather than throwing for an unknown slug.
export const getAdjacentInsights = (slug) => {
  const index = INSIGHTS.findIndex((insight) => insight.slug === slug);
  if (index === -1) return { previous: null, next: null, others: [] };

  const previous = INSIGHTS[index - 1] || null;
  const next = INSIGHTS[index + 1] || null;
  const others = INSIGHTS.filter(
    (insight, i) => i !== index && insight !== previous && insight !== next
  );

  return { previous, next, others };
};
