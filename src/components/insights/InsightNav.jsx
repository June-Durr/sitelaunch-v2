import { Link } from "react-router-dom";

// Previous / next navigation between published Insights, plus any remaining
// article so every piece links to every other one rather than only to its
// immediate neighbours. Ordered by Insight number, not publish date, because
// the numbers are what readers see.
const NavCard = ({ label, insight }) => (
  <Link
    to={`/insights/${insight.slug}/`}
    className="group flex min-h-[44px] flex-col gap-2 border-t-2 border-ink/[0.18] py-5 transition-colors hover:border-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
  >
    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-600">
      {label}
    </span>
    <span className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-violet-700 sm:text-xl">
      {`Insight ${insight.number}: ${insight.title}`}
    </span>
  </Link>
);

const InsightNav = ({ previous, next, others = [] }) => {
  if (!previous && !next && others.length === 0) return null;

  return (
    <nav
      aria-label="More insights"
      className="bg-ivory py-8 sm:py-10 lg:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[43.75rem] lg:ml-[8.333%]">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/45">
            Keep reading
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {previous && <NavCard label="Previous insight" insight={previous} />}
            {next && <NavCard label="Next insight" insight={next} />}
            {others.map((insight) => (
              <NavCard key={insight.slug} label="Also published" insight={insight} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default InsightNav;
