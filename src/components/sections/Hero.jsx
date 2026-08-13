import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import { scrollToSection } from "../../utils/scroll";
import { heroCopy, heroCta, heroKicker, heroLine } from "../../utils/motion";
import analytics from "../../services/analytics";

// Mobile-only headline split for the per-line reveal below. Chosen short
// enough to read as one line each at 320-430px; desktop keeps the original
// single flowing string with natural browser wrapping, untouched.
const HEADLINE_LINES = [
  "Websites built to earn trust",
  "and make the next step",
  "obvious.",
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
    <section className="bg-ivory pb-8 pt-6 sm:pb-10 sm:pt-14 lg:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={heroKicker}>
            <Kicker>Miami / Clients Anywhere</Kicker>
          </motion.div>

          {/* Single H1 for a11y/SEO; mobile and desktop render different
              children of it (per-line animated vs. plain flowing text),
              never both at once. */}
          <h1 className="mt-3 font-display text-[clamp(2rem,6vw+0.5rem,4.5rem)] font-bold leading-[1.05] tracking-tight text-ink">
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
              Websites built to earn trust and make the next step obvious.
            </span>
          </h1>

          <motion.p
            className="mt-4 max-w-xl text-base text-ink/70 sm:text-lg"
            initial="hidden"
            animate="visible"
            variants={heroCopy}
          >
            We design and build websites for businesses and contractors.
            <span className="hidden sm:inline">
              {" One person on your project, from the first review to the day it launches."}
            </span>
          </motion.p>

          <motion.div
            className="mt-5 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4"
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

            {/* "See Our Work" removed on mobile: the reel sits immediately
                below and is already substantially visible in the first
                viewport, so the scroll it triggered was redundant there.
                Desktop keeps it - the reel isn't nearly as dominant in a
                wider, shorter-aspect first viewport. */}
            <button
              type="button"
              onClick={() => scrollToSection("reel")}
              className="hidden min-h-[44px] items-center justify-center rounded-md border border-ink/30 px-6 text-base font-medium text-ink transition-colors hover:border-ink hover:bg-ink/5 sm:inline-flex"
            >
              See Our Work
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
