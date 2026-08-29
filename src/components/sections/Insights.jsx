import { Link } from "react-router-dom";
import Reveal from "../common/Reveal";
import Kicker from "../common/Kicker";
import { getFeaturedInsight } from "../../data/insights";

// Homepage teaser for the featured Insight (currently Insight 001). Card
// copy matches the approved handoff exactly ("No other text on the card")
// - title and "Read Insight 001" are the two clickable elements; the image
// stays decorative so the card doesn't turn into one large ambiguous click
// target. Pulls from the insights registry rather than importing a specific
// entry by name, so promoting a future Insight to the homepage doesn't
// require touching this file.
const featured = getFeaturedInsight();
const ARTICLE_PATH = featured ? `/insights/${featured.slug}/` : null;

const Insights = () => {
  if (!featured) return null;

  return (
    <section
      id="insights"
      className="scroll-mt-[calc(var(--header-height,68px)+8px)] border-t border-ink/10"
    >
      {/* Mobile: dark editorial card, image-led. */}
      <div className="bg-ink py-10 sm:hidden">
        <Reveal className="mx-auto max-w-6xl px-4">
          <Kicker as="h2" tone="inverted">
            {`Insight ${featured.number} / ${featured.category}`}
          </Kicker>

          <Link
            to={ARTICLE_PATH}
            aria-label={`Read Insight ${featured.number}: ${featured.title}`}
            className="mt-4 block h-[230px] w-full overflow-hidden bg-[#FCF6EE]"
          >
            <img
              src={featured.coverImage}
              alt={featured.coverAlt}
              className="h-full w-full scale-125 object-cover object-[58%_42%]"
              width={1344}
              height={1800}
              loading="lazy"
            />
          </Link>

          <h3 className="mt-4 font-display text-xl font-bold text-white">
            <Link to={ARTICLE_PATH} className="hover:text-violet-300">
              {featured.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-white/70">{featured.homepageExcerpt}</p>
          <div className="mt-3 flex items-center gap-4">
            <Link
              to={ARTICLE_PATH}
              className="inline-block text-sm font-semibold text-violet-400 underline underline-offset-4 hover:text-violet-300"
            >
              {`Read Insight ${featured.number}`}
            </Link>
            <Link
              to="/insights/"
              className="inline-block text-sm font-semibold text-white/50 underline underline-offset-4 hover:text-white/80"
            >
              View all insights
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Desktop: image-led two-column editorial treatment using the real
          cover artwork, so this is a visual beat in the lower half of the
          page rather than another block of text. */}
      <div className="hidden bg-ivory py-24 sm:block">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Kicker as="h2">{`Insight ${featured.number} / ${featured.category}`}</Kicker>
              <h3 className="mt-4 font-display text-3xl font-bold text-ink lg:text-4xl">
                <Link to={ARTICLE_PATH} className="hover:text-violet-600">
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-4 max-w-md text-base text-ink/70 lg:text-lg">
                {featured.homepageExcerpt}
              </p>
              <div className="mt-6 flex items-center gap-6">
                <Link
                  to={ARTICLE_PATH}
                  className="inline-block text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700"
                >
                  {`Read Insight ${featured.number}`}
                </Link>
                <Link
                  to="/insights/"
                  className="inline-block text-base font-semibold text-ink/50 underline underline-offset-4 hover:text-ink/80"
                >
                  View all insights
                </Link>
              </div>
            </div>

            <Link
              to={ARTICLE_PATH}
              aria-label={`Read Insight ${featured.number}: ${featured.title}`}
              className="flex h-[320px] items-center justify-center bg-[#FCF6EE] lg:h-[420px]"
            >
              <img
                src={featured.coverImage}
                alt={featured.coverAlt}
                className="h-full w-auto object-contain"
                width={1344}
                height={1800}
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
