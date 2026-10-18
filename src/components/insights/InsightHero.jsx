import { readingTimeFor } from "../../lib/readingTime";

// Approved Version B (Test-First) hero. Desktop: two-column editorial grid,
// image plate on the right. Mobile: single column, cover plate sits right
// below the metadata row so its top edge lands inside the first 390x844
// viewport without cramping the type — see docs/insights/insight-001/
// INSIGHT-001-HANDOFF.md section 4/5 for the source spec this implements.
const InsightHero = ({ insight }) => (
  <header className="bg-ivory pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-20 lg:pt-20">
    <div className="container-page">
      <div className="lg:grid lg:grid-cols-[1fr_560px] lg:items-center lg:gap-16">
        <div className="max-w-2xl">
          <span className="type-label text-accent-600">
            {`Insight ${insight.number} / ${insight.category}`}
          </span>

          <h1 className="type-title mt-3 text-ink">
            {insight.title}
          </h1>

          <p className="type-lead mt-4 max-w-xl text-ink/80 sm:mt-5">
            {insight.deck}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink/20 pt-3 type-label text-ink/65 sm:mt-6 sm:pt-4">
            <span>SiteLaunch Studios</span>
            <span aria-hidden="true" className="h-1 w-1 flex-none bg-accent-600" />
            <span>{readingTimeFor(insight)}</span>
            <span aria-hidden="true" className="h-1 w-1 flex-none bg-accent-600" />
            <span>{insight.published}</span>
          </div>
        </div>

        {/* Cover plate: image is contain-sized so the full phone always
            shows; plate background matches the artwork's own ivory tone
            so a contained image doesn't show a visible seam. */}
        <div className="mt-5 flex h-[340px] w-full items-center justify-center bg-paper lg:mt-0 lg:h-[660px]">
          <img
            src={insight.coverImage}
            alt={insight.coverAlt}
            className="h-full w-auto object-contain"
            width={insight.coverWidth}
            height={insight.coverHeight}
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
  </header>
);

export default InsightHero;
