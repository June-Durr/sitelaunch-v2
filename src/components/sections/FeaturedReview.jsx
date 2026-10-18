import Reveal from "../common/Reveal";
import Kicker from "../common/Kicker";
import { tysonReview, GOOGLE_REVIEW_URL } from "../../data/reviews";

const FeaturedReview = () => (
  <section className="section-y-lg bg-ink">
    <Reveal className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <Kicker tone="inverted">Verified Google Review</Kicker>

      {/* Mobile: a large verbatim excerpt, not the full review. */}
      <blockquote className="type-quote mt-6 text-white sm:hidden">
        {`"${tysonReview.excerpt}"`}
      </blockquote>
      {/* Desktop: unchanged, full quote. */}
      <blockquote className="type-quote mt-6 hidden text-white sm:block">
        {`"${tysonReview.quote}"`}
      </blockquote>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <p className="type-small text-white/60">{tysonReview.author}</p>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-on-dark text-sm sm:hidden"
        >
          Read reviews ↗
        </a>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-on-dark hidden text-sm sm:inline"
        >
          Read all 5 reviews on Google
        </a>
      </div>
    </Reveal>
  </section>
);

export default FeaturedReview;
