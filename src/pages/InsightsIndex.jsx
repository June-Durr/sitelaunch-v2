import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEOHead from "../components/common/SEOHead";
import Kicker from "../components/common/Kicker";
import { INSIGHTS } from "../data/insights";
import { fadeRise, mediaReveal, viewportOnce } from "../utils/motion";

const SITE_URL = "https://sitelaunchstudios.com";

// Newest first - higher Insight number was published more recently.
const sortedInsights = [...INSIGHTS].sort(
  (a, b) => Number(b.number) - Number(a.number)
);

const InsightRow = ({ insight }) => {
  const articlePath = `/insights/${insight.slug}/`;

  return (
    <motion.article
      className="grid grid-cols-1 gap-6 border-t border-ink/10 py-10 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-14"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeRise}
    >
      <motion.div className="lg:col-span-5" variants={mediaReveal}>
        <Link
          to={articlePath}
          aria-label={`Read Insight ${insight.number}: ${insight.title}`}
          className="flex h-[260px] w-full items-center justify-center bg-[#FCF6EE] lg:h-[300px]"
        >
          <img
            src={insight.coverImage}
            alt={insight.coverAlt}
            className="h-full w-auto object-contain"
            width={1344}
            height={1800}
            loading="lazy"
          />
        </Link>
      </motion.div>

      <div className="lg:col-span-7">
        <Kicker>{`Insight ${insight.number} / ${insight.category}`}</Kicker>
        <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
          <Link to={articlePath} className="hover:text-violet-600">
            {insight.title}
          </Link>
        </h2>
        <p className="mt-3 max-w-lg text-base text-ink/70">
          {insight.homepageExcerpt}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-ink/40">
          <span>{insight.readTime}</span>
          <span aria-hidden="true" className="h-1 w-1 flex-none bg-violet-600" />
          <span>{insight.published}</span>
        </div>
        <Link
          to={articlePath}
          className="mt-5 inline-block text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700"
        >
          {`Read Insight ${insight.number}`}
        </Link>
      </div>
    </motion.article>
  );
};

const InsightsIndex = () => (
  <div className="bg-ivory">
    <SEOHead
      title="Insights | SiteLaunch Studios"
      description="Notes on what actually makes a website work — mobile usability, trust signals, and the specific things visitors check before they call."
      url={`${SITE_URL}/insights/`}
      canonicalUrl={`${SITE_URL}/insights/`}
    />

    <header className="border-b border-ink/10 pb-8 pt-10 sm:pb-10 sm:pt-14 lg:pb-12 lg:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Kicker as="h1">Insights</Kicker>
        <p className="mt-3 max-w-xl font-display text-2xl font-bold text-ink sm:text-3xl">
          Notes on what actually makes a website work.
        </p>
      </div>
    </header>

    <section className="py-2 sm:py-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {sortedInsights.map((insight) => (
          <InsightRow key={insight.slug} insight={insight} />
        ))}
      </div>
    </section>
  </div>
);

export default InsightsIndex;
