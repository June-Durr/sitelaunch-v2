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
    <section className="section-y bg-ink">
      <div className="container-page">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-xl">
            <span className="type-label text-accent-400">
              {cta.eyebrow}
            </span>
            <h2 className="type-heading mt-3 text-white">
              {cta.heading}
            </h2>
            <p className="type-body mt-3 text-white/80">
              {cta.body}
            </p>
          </div>

          <Link
            to={cta.href}
            onClick={handleClick}
            className="btn btn-primary mt-8 w-full lg:mt-0 lg:w-auto lg:flex-none"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InsightCTA;
