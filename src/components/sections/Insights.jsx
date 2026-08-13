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
            Insight 001 / Contractors
          </Kicker>

          <Link
            to={ARTICLE_PATH}
            aria-label={`Read Insight 001: ${featured.title}`}
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
          <Link
            to={ARTICLE_PATH}
            className="mt-3 inline-block text-sm font-semibold text-violet-400 underline underline-offset-4 hover:text-violet-300"
          >
            Read Insight 001
          </Link>
        </Reveal>
      </div>

      {/* Desktop: unchanged layout/treatment from the previous pass - only
          the copy and link targets are corrected to match the approved
          card content. No image added here; that would be a desktop visual
          change beyond this task's scope. */}
      <div className="hidden bg-ivory py-24 sm:block">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Kicker as="h2">Insight 001 / Contractors</Kicker>

          <div className="mt-8 max-w-2xl border-t border-ink/10 pt-8">
            <h3 className="font-display text-3xl font-bold text-ink">
              <Link to={ARTICLE_PATH} className="hover:text-violet-600">
                {featured.title}
              </Link>
            </h3>
            <p className="mt-3 text-base text-ink/70">{featured.homepageExcerpt}</p>
            <Link
              to={ARTICLE_PATH}
              className="mt-5 inline-block text-base font-semibold text-violet-600 underline underline-offset-4 hover:text-violet-700"
            >
              Read Insight 001
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
