export const SITE_URL = "https://sitelaunchstudios.com";

export const canonicalFor = (insight) =>
  `${SITE_URL}/insights/${insight.slug}/`;

/**
 * The FAQ section this article will actually render, or null.
 *
 * `renderableTypes` is the set of section types InsightArticle knows how to
 * render, passed in rather than assumed: a faq section that no component
 * renders must not produce FAQPage schema, because the answers would then
 * exist only for crawlers.
 */
export const findRenderedFaq = (insight, renderableTypes) =>
  insight.sections.find(
    (section) =>
      section.type === "faq" &&
      renderableTypes.has(section.type) &&
      Array.isArray(section.items) &&
      section.items.length > 0
  ) || null;

/**
 * BlogPosting + BreadcrumbList for every article, plus FAQPage only when a
 * visible FAQ was found. Pure, so a test can compare its output against the
 * copy the page actually renders.
 */
export const buildInsightSchema = (insight, faqSection = null) => {
  const canonicalUrl = canonicalFor(insight);
  const coverUrl = `${SITE_URL}${insight.coverImage}`;

  const graph = [
    {
      "@type": "BlogPosting",
      "@id": `${canonicalUrl}#article`,
      headline: insight.title,
      description: insight.seoDescription || insight.deck,
      image: [coverUrl],
      url: canonicalUrl,
      mainEntityOfPage: canonicalUrl,
      datePublished: insight.publishedDate,
      dateModified: insight.modifiedDate,
      articleSection: insight.category,
      author: {
        "@type": "Organization",
        name: "SiteLaunch Studios",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "SiteLaunch Studios",
        url: SITE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Insights",
          item: `${SITE_URL}/insights`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: insight.title,
          item: canonicalUrl,
        },
      ],
    },
  ];

  if (faqSection) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: faqSection.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
};
