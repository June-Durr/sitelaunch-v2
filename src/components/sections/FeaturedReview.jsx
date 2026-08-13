import Reveal from "../common/Reveal";
import Kicker from "../common/Kicker";
import { tysonReview, GOOGLE_REVIEW_URL } from "../../data/reviews";

const FeaturedReview = () => (
  <section className="bg-ink py-16 sm:py-24">
    <Reveal className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <Kicker tone="inverted">Verified Google Review</Kicker>

      {/* Mobile: a large verbatim excerpt, not the full review. */}
      <blockquote className="mt-6 font-display text-2xl font-medium leading-snug text-white sm:hidden">
        {`“${tysonReview.excerpt}”`}
      </blockquote>
      {/* Desktop: unchanged, full quote. */}
      <blockquote className="mt-6 hidden font-display text-2xl font-medium leading-snug text-white sm:block sm:text-3xl">
        {`“${tysonReview.quote}”`}
      </blockquote>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <p className="text-base text-white/60">{tysonReview.author}</p>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-violet-400 underline underline-offset-4 hover:text-violet-300 sm:hidden"
        >
          Read reviews ↗
        </a>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-sm font-semibold text-violet-400 underline underline-offset-4 hover:text-violet-300 sm:inline"
        >
          Read all 5 reviews on Google
        </a>
      </div>
    </Reveal>
  </section>
);

export default FeaturedReview;
