import { Link } from "react-router-dom";
import analytics from "../../services/analytics";

// Full-bleed closing CTA band. The button is a real link (not a button
// element, per handoff) to /#review - Link performs a client-side route
// change to the homepage, and Home's existing mount effect picks up the
// #review hash and scrolls to the Website Review form there.
const InsightCTA = ({ cta }) => {
  const handleClick = () => {
    analytics.trackEvent("review_cta_click", {
      category: "engagement",
      label: "insight_article",
      location: "insight_article",
    });
  };

  return (
    <section className="bg-ink py-11 sm:py-14 lg:py-[4.75rem]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              {cta.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-[1.75rem] font-bold text-ivory lg:text-[2.875rem]">
              {cta.heading}
            </h2>
            <p className="mt-3 text-base text-ivory/[0.72] lg:text-[1.1875rem]">
              {cta.body}
            </p>
          </div>

          <Link
            to={cta.href}
            onClick={handleClick}
            className="mt-7 flex min-h-[52px] w-full items-center justify-center bg-violet-600 px-8 text-base font-semibold text-white transition-colors hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 lg:mt-0 lg:w-auto lg:flex-none lg:px-9 lg:py-5 lg:text-[1rem]"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightCTA;
