import Kicker from "../common/Kicker";
import { scrollToSection } from "../../utils/scroll";
import analytics from "../../services/analytics";

const Hero = () => {
  const handlePrimaryCta = () => {
    analytics.trackEvent("review_cta_click", {
      category: "engagement",
      label: "hero",
      location: "hero",
    });
    scrollToSection("review");
  };

  const handleSecondaryCta = () => {
    scrollToSection("case-studies");
  };

  return (
    <section className="bg-ivory pb-6 pt-8 sm:pb-10 sm:pt-14 lg:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Kicker>Miami / Clients Anywhere</Kicker>

          <h1 className="mt-3 font-display text-[clamp(2rem,6vw+0.5rem,4.5rem)] font-bold leading-[1.05] tracking-tight text-ink">
            Websites built to earn trust and make the next step obvious.
          </h1>

          <p className="mt-4 max-w-xl text-base text-ink/70 sm:text-lg">
            We design and build websites for businesses and contractors.
            <span className="hidden sm:inline">
              {" One person on your project, from the first review to the day it launches."}
            </span>
          </p>

          <div className="mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={handlePrimaryCta}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-md bg-violet-600 px-6 text-base font-semibold text-white transition-colors hover:bg-violet-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:w-auto"
            >
              Get a Free Website Review
            </button>

            <button
              type="button"
              onClick={handleSecondaryCta}
              className="inline-flex min-h-[44px] w-full items-center justify-center border-b border-ink/40 text-base font-medium text-ink underline decoration-ink/40 underline-offset-4 transition-colors hover:border-ink hover:decoration-ink sm:w-auto sm:min-h-[44px] sm:rounded-md sm:border sm:border-ink/30 sm:px-6 sm:no-underline sm:hover:border-ink sm:hover:bg-ink/5"
            >
              See Our Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
