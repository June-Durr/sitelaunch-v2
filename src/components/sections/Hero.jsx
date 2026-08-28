import { motion } from "framer-motion";
import { scrollToSection } from "../../utils/scroll";
import { heroCta, heroLine } from "../../utils/motion";
import analytics from "../../services/analytics";

// Mobile-only headline split for the per-line reveal below. Chosen short
// enough to read as one line each at 320-430px; desktop keeps the original
// single flowing string with natural browser wrapping, untouched.
const HEADLINE_LINES = [
  "Websites that turn",
  "visitors into clients.",
];

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
    <section className="bg-ivory pb-6 pt-6 sm:pb-8 sm:pt-12 lg:pb-7 lg:pt-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl">
          {/* Single H1 for a11y/SEO; mobile and desktop render different
              children of it (per-line animated vs. plain flowing text),
              never both at once. */}
          <h1 className="font-display text-[clamp(2.55rem,7vw,5.5rem)] font-bold leading-[0.98] tracking-tight text-ink">
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
            className="mt-5 flex flex-col items-start gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-4 lg:mt-6"
            initial="hidden"
            animate="visible"
            variants={heroCta}
          >
            <button
              type="button"
              onClick={handlePrimaryCta}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-md bg-violet-600 px-6 text-base font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:w-auto"
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
