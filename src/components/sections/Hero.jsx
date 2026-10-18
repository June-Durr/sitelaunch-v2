import { motion } from "framer-motion";
import { scrollToSection } from "../../utils/scroll";
import { heroCta, heroLine } from "../../utils/motion";
import analytics from "../../services/analytics";

// Mobile-only headline split for the per-line reveal below. Three short
// lines, not two long ones: at the display size "Websites that turn" is
// wider than a 375px phone, so it wrapped and left "turn" alone on a line.
// Each of these fits down to 320px. Desktop keeps the original single
// flowing string with natural browser wrapping, untouched.
const HEADLINE_LINES = ["Websites that", "turn visitors", "into clients."];

const Hero = () => {
  const handlePrimaryCta = () => {
    analytics.trackEvent("review_cta_click", {
      category: "engagement",
      label: "hero",
      location: "hero",
    });
    scrollToSection("review");
  };

  return (
    <section className="bg-ivory pb-6 pt-6 sm:pb-8 sm:pt-12">
      <div className="container-page">
        <div className="max-w-5xl">
          {/* Single H1 for a11y/SEO; mobile and desktop render different
              children of it (per-line animated vs. plain flowing text),
              never both at once. */}
          <h1 className="type-display text-ink">
            <span className="sm:hidden">
              {HEADLINE_LINES.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={heroLine}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </span>
            <span className="hidden sm:inline">
              Websites that turn visitors into clients.
            </span>
          </h1>

          <motion.div
            className="mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4"
            initial="hidden"
            animate="visible"
            variants={heroCta}
          >
            <button
              type="button"
              onClick={handlePrimaryCta}
              className="btn btn-primary w-full sm:w-auto"
            >
              Get a Free Website Review
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
