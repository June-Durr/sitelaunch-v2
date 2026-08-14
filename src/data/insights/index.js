// Registry of published Insights. Add future entries (insight-002, ...) as
// their own file in this folder, then list them here — InsightArticle.jsx
// looks articles up by slug through this file, so nothing else needs to
// change to publish a new one.
import { insight001 } from "./insight-001";

export const INSIGHTS = [insight001];

export const getInsightBySlug = (slug) =>
  INSIGHTS.find((insight) => insight.slug === slug) || null;

// The homepage teaser reads from this instead of importing a specific
// insight by name, so promoting a future entry to the homepage is a
// one-line change here rather than an edit to the homepage component.
export const getFeaturedInsight = () =>
  INSIGHTS.find((insight) => insight.featured) || INSIGHTS[0] || null;
