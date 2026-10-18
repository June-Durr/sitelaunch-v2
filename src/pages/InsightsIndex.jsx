import { Link } from "react-router-dom";
import SEOHead from "../components/common/SEOHead";
import Kicker from "../components/common/Kicker";
import { INSIGHTS } from "../data/insights";
import { readingTimeFor } from "../lib/readingTime";

const SITE_URL = "https://sitelaunchstudios.com";

const InsightsIndex = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "SiteLaunch Insights",
    description:
      "Practical field notes about contractor websites, mobile clarity, conversion, and search visibility.",
    url: `${SITE_URL}/insights`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: INSIGHTS.map((insight, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/insights/${insight.slug}/`,
        name: insight.title,
      })),
    },
  };

  return (
    <div className="bg-ivory">
      <SEOHead
        title="Contractor Website Insights | SiteLaunch Studios"
        description="Practical field notes about contractor websites, mobile clarity, conversion, and search visibility."
        keywords="contractor website tips, contractor website design, local business website, website conversion"
        url={`${SITE_URL}/insights`}
        canonicalUrl={`${SITE_URL}/insights`}
        structuredData={structuredData}
      />

      <header className="section-y border-b border-ink/10">
        <div className="container-page">
          <Kicker>SiteLaunch Insights</Kicker>
          <h1 className="type-title mt-3 max-w-3xl text-ink">
            Field notes for clearer contractor websites.
          </h1>
          <p className="type-lead mt-4 max-w-2xl text-ink/80 sm:mt-5">
            Direct tests, practical fixes, and plain-language guidance for the
            moment a homeowner reaches your website on a phone.
          </p>
        </div>
      </header>

      <div className="container-page section-y">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((insight) => (
            <article
              key={insight.slug}
              className="overflow-hidden border border-ink/20 bg-white"
            >
              <Link
                to={`/insights/${insight.slug}/`}
                className="flex h-72 items-center justify-center bg-paper p-5"
                aria-label={`Read Insight ${insight.number}: ${insight.title}`}
              >
                <img
                  src={insight.coverImage}
                  alt={insight.coverAlt}
                  className="h-full w-auto object-contain shadow-media"
                  width={insight.coverWidth}
                  height={insight.coverHeight}
                  loading="lazy"
                />
              </Link>
              <div className="p-6">
                <p className="type-label text-accent-600">
                  {`Insight ${insight.number} / ${insight.category}`}
                </p>
                <h2 className="type-subheading mt-3 text-ink">
                  <Link
                    to={`/insights/${insight.slug}/`}
                    className="hover:text-accent-700"
                  >
                    {insight.title}
                  </Link>
                </h2>
                <p className="type-body mt-3 text-ink/65">
                  {insight.homepageExcerpt}
                </p>
                <p className="type-label mt-5 text-ink/65">
                  {`${readingTimeFor(insight)} · ${insight.published}`}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsIndex;
