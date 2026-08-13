import {
  GOOGLE_REVIEW_URL,
  GOOGLE_RATING,
  GOOGLE_REVIEW_COUNT,
} from "../../data/reviews";

const Star = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77-4.19-4.08 5.79-.84L10 1.5z" />
  </svg>
);

const GoogleTrustStrip = () => (
  <div className="bg-ink">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-2.5 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6 sm:gap-y-3 sm:px-6 sm:py-5 sm:text-left lg:px-8">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-start sm:gap-x-3 sm:gap-y-2">
        <span className="flex items-center gap-0.5 text-violet-400" aria-hidden="true">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </span>
        <span className="text-base font-semibold text-white">
          {`${GOOGLE_RATING} `}
          <span className="text-sm font-medium text-white/60">on Google</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-white/50">
          {`${GOOGLE_REVIEW_COUNT} verified reviews`}
        </span>
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-violet-400 underline underline-offset-4 hover:text-violet-300"
        >
          Read reviews ↗
        </a>
      </div>
    </div>
  </div>
);

export default GoogleTrustStrip;
