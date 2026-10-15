/**
 * Reading time, computed from the article rather than typed in.
 *
 * WHY THIS IS NOT A FIELD ON THE ARTICLE
 *
 * It was, and it drifted twice. Insight 001 claimed four minutes while its
 * body was a two minute read, and Insight 003 claimed five while its own copy
 * had grown past six. Both were correct the day they were written. A number
 * maintained by hand next to copy that keeps changing is a number that is
 * wrong most of the time, and a stated reading time that does not match the
 * article is a small lie on a page whose whole argument is about evidence.
 *
 * So it is derived. Add a paragraph, add an FAQ answer, and the figure moves
 * on its own.
 *
 * WHAT COUNTS
 *
 * Every string a reader actually sees: the title, the deck, each section's
 * headings and body, the FAQ questions and answers, and the closing call to
 * action. Not slugs, not image paths, not SEO metadata, not alt text, because
 * none of those are read.
 */

const WORDS_PER_MINUTE = 225;

/**
 * Keys whose values are machinery rather than prose.
 *
 * Deliberately a deny list rather than an allow list: a new section type that
 * adds a `caption` or a `note` should be counted automatically, and a new
 * metadata field is the rarer case and fails loudly in the test if missed.
 */
const NON_VISIBLE_KEYS = new Set([
  "slug", "type", "id", "src", "coverImage", "coverWidth", "coverHeight",
  "href", "seoTitle", "seoDescription", "keywords", "publishedDate",
  "modifiedDate", "readTime", "alt", "coverAlt", "homepageExcerpt",
  "featured", "number", "width", "height",
]);

function collect(node, out) {
  if (node == null) return out;
  if (typeof node === "string") {
    out.push(node);
    return out;
  }
  if (Array.isArray(node)) {
    for (const child of node) collect(child, out);
    return out;
  }
  if (typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (NON_VISIBLE_KEYS.has(key)) continue;
      collect(value, out);
    }
  }
  return out;
}

/** Every visible string on the article page, joined. */
export function visibleTextOf(insight) {
  return collect(
    {
      title: insight.title,
      deck: insight.deck,
      sections: insight.sections,
      cta: insight.cta,
    },
    []
  ).join(" ");
}

export function wordCountOf(insight) {
  return visibleTextOf(insight).trim().split(/\s+/).filter(Boolean).length;
}

/** "4 min read". Never below one minute, because "0 min read" is nonsense. */
export function readingTimeFor(insight) {
  const minutes = Math.max(1, Math.round(wordCountOf(insight) / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

export { WORDS_PER_MINUTE };
