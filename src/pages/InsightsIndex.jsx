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

      <header className="border-b border-ink/10 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Kicker>SiteLaunch Insights</Kicker>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight text-ink sm:text-6xl">
            Field notes for clearer contractor websites.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/65 sm:text-lg">
            Direct tests, practical fixes, and plain-language guidance for the
            moment a homeowner reaches your website on a phone.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {INSIGHTS.map((insight) => (
            <article
              key={insight.slug}
              className="overflow-hidden rounded-2xl border border-ink/15 bg-white"
            >
              <Link
                to={`/insights/${insight.slug}/`}
                className="flex h-72 items-center justify-center bg-[#FCF6EE] p-5"
                aria-label={`Read Insight ${insight.number}: ${insight.title}`}
              >
                <img
                  src={insight.coverImage}
                  alt={insight.coverAlt}
                  className="h-full w-auto object-contain shadow-[0_12px_22px_rgba(23,23,23,0.14)]"
                  width={insight.coverWidth}
                  height={insight.coverHeight}
                  loading="lazy"
                />
              </Link>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-600">
                  {`Insight ${insight.number} / ${insight.category}`}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-ink">
                  <Link
                    to={`/insights/${insight.slug}/`}
                    className="hover:text-violet-700"
                  >
                    {insight.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-6 text-ink/65">
                  {insight.homepageExcerpt}
                </p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-ink/45">
                  {`${readingTimeFor(insight)} · ${insight.published}`}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default InsightsIndex;
