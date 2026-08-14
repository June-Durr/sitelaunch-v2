// Approved Version B (Test-First) hero. Desktop: two-column editorial grid,
// image plate on the right. Mobile: single column, cover plate sits right
// below the metadata row so its top edge lands inside the first 390x844
// viewport without cramping the type — see docs/insights/insight-001/
// INSIGHT-001-HANDOFF.md section 4/5 for the source spec this implements.
const InsightHero = ({ insight }) => (
  <header className="bg-ivory pb-10 pt-7 sm:pb-14 sm:pt-10 lg:pb-20 lg:pt-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_560px] lg:items-center lg:gap-16">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
            {`Insight ${insight.number} / ${insight.category}`}
          </span>

          <h1 className="mt-3 font-display text-[2.1875rem] font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[2.75rem] lg:text-[3.875rem] lg:leading-[1.0] lg:tracking-[-0.038em]">
            {insight.title}
          </h1>

          <p className="mt-3.5 max-w-xl text-[1.0625rem] leading-[1.45] text-ink/70 sm:mt-5 sm:text-[1.1875rem] sm:leading-[1.5] lg:text-[1.3125rem] lg:leading-[1.5]">
            {insight.deck}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink/[0.18] pt-3 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink/50 sm:mt-6 sm:pt-4">
            <span>SiteLaunch Studios</span>
            <span aria-hidden="true" className="h-1 w-1 flex-none bg-violet-600" />
            <span>{insight.readTime}</span>
            <span aria-hidden="true" className="h-1 w-1 flex-none bg-violet-600" />
            <span>{insight.published}</span>
          </div>
        </div>

        {/* Cover plate: image is contain-sized so the full phone always
            shows; plate background matches the artwork's own ivory tone
            so a contained image doesn't show a visible seam. */}
        <div className="mt-[18px] flex h-[340px] w-full items-center justify-center bg-[#FCF6EE] lg:mt-0 lg:h-[660px]">
          <img
            src={insight.coverImage}
            alt={insight.coverAlt}
            className="h-full w-auto object-contain"
            width={1344}
            height={1800}
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </div>
    </div>
  </header>
);

export default InsightHero;
