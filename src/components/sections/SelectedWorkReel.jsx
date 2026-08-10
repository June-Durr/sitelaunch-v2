import { useEffect, useRef, useState } from "react";
import Kicker from "../common/Kicker";
import { projects } from "../../data/projects";
import analytics from "../../services/analytics";

const AUTO_ADVANCE_MS = 6000;

// Preview reel for the two public case studies. No showreel video exists yet,
// so every project renders its poster frame (the approved opening frame for
// Moth to Flame). The <video> path below is fully wired so dropping real
// clips into data/projects.js (video.desktop / video.mobile) activates
// motion without any other changes.
const SelectedWorkReel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);
    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // The build's prerender pass is a real browser driven by Puppeteer: it
    // scrolls the full page and waits for animations to settle before
    // capturing static HTML, which can take longer than one auto-advance
    // interval. If it were allowed to advance, the frozen snapshot could
    // ship with project 2 active while a real visitor's client always
    // mounts fresh at project 1, causing a hydration mismatch. Freezing
    // auto-advance for the crawler keeps the snapshot deterministic.
    if (navigator.webdriver || prefersReducedMotion || isPaused) return undefined;

    timeoutRef.current = setTimeout(() => {
      setActiveIndex((index) => (index + 1) % projects.length);
    }, AUTO_ADVANCE_MS);

    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex, isPaused, prefersReducedMotion]);

  const goTo = (index) => {
    setActiveIndex((index + projects.length) % projects.length);
  };

  const activeProject = projects[activeIndex];
  const hasVideo = Boolean(
    activeProject.video.desktop || activeProject.video.mobile
  );
  const showVideo = hasVideo && !prefersReducedMotion;

  const handleProjectLinkClick = () => {
    analytics.trackEvent("portfolio_open", {
      category: "engagement",
      label: activeProject.id,
      project: activeProject.id,
      source: "reel",
    });
  };

  return (
    <section
      id="reel"
      aria-label="Selected work reel"
      className="bg-ivory pb-14 pt-2 sm:pb-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <Kicker>Selected Work / Reel</Kicker>
          <span className="font-display text-sm font-semibold text-ink/50">
            {`${String(activeIndex + 1).padStart(2, "0")} / ${String(
              projects.length
            ).padStart(2, "0")}`}
          </span>
        </div>

        <div className="relative overflow-hidden rounded-none bg-ink">
          <div aria-hidden="true" className="absolute left-4 top-4 z-10 text-white/70">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path
                d="M0 1h20M0 7h20M0 13h20"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <div className="aspect-[3/4] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
            {showVideo ? (
              <video
                key={activeProject.id}
                className="h-full w-full object-cover object-top"
                poster={activeProject.poster}
                muted
                loop
                playsInline
                autoPlay
                preload="none"
              >
                {activeProject.video.desktop && (
                  <source
                    src={activeProject.video.desktop}
                    media="(min-width: 768px)"
                    type="video/mp4"
                  />
                )}
                {activeProject.video.mobile && (
                  <source src={activeProject.video.mobile} type="video/mp4" />
                )}
              </video>
            ) : (
              <img
                src={activeProject.poster}
                alt={`${activeProject.name} website, opening screen`}
                className="h-full w-full object-cover object-top"
                width={720}
                height={1558}
                loading="eager"
                fetchpriority="high"
              />
            )}
          </div>

          <div className="h-[3px] w-full bg-violet-600" />

          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
            <div>
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleProjectLinkClick}
                className="font-display text-lg font-semibold text-white hover:underline sm:text-xl"
              >
                {activeProject.name}
              </a>
              <p className="text-sm text-white/50">{activeProject.category}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous project"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                  <path
                    d="M7 1 1 7l6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next project"
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 1l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorkReel;
