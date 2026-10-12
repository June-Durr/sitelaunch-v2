import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Kicker from "../common/Kicker";
import { INSIGHTS } from "../../data/insights";
import { usePrefersReducedMotion } from "../../utils/motion";
import analytics from "../../services/analytics";

const AUTO_ADVANCE_MS = 2000;
const RESUME_AFTER_MS = 8000;

const Insights = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const touchStartRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const active = INSIGHTS[activeIndex];

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      INSIGHTS.length < 2 ||
      !isInView ||
      isPaused ||
      prefersReducedMotion
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % INSIGHTS.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [isInView, isPaused, prefersReducedMotion]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    },
    []
  );

  if (!active) return null;

  const selectInsight = (index) => {
    setActiveIndex(index);
    setIsPaused(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(
      () => setIsPaused(false),
      RESUME_AFTER_MS
    );
  };

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (INSIGHTS.length < 2 || touchStartRef.current === null) return;
    const endX = event.changedTouches[0]?.clientX;
    if (typeof endX !== "number") return;
    const distance = endX - touchStartRef.current;
    touchStartRef.current = null;
    if (Math.abs(distance) < 45) return;
    const direction = distance < 0 ? 1 : -1;
    selectInsight(
      (activeIndex + direction + INSIGHTS.length) % INSIGHTS.length
    );
  };

  const trackOpen = (insight, location) => {
    analytics.trackEvent("insight_open", {
      category: "engagement",
      label: insight.slug,
      location,
    });
  };

  const articlePath = `/insights/${active.slug}/`;
  const storyLabel = `${String(INSIGHTS.length).padStart(2, "0")} ${
    INSIGHTS.length === 1 ? "story" : "stories"
  }`;

  return (
    <section
      ref={sectionRef}
      id="insights"
      aria-labelledby="insights-heading"
      className="scroll-mt-[calc(var(--header-height,68px)+8px)] border-t border-ink/10 bg-ivory py-12 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Kicker>{`Insights / ${storyLabel}`}</Kicker>
          <h2
            id="insights-heading"
            className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
          >
            Practical insights for better contractor websites.
          </h2>
          <p className="mt-3 text-sm leading-6 text-ink/65 sm:text-base">
            Browse the field notes. Open a cover to read the full article.
          </p>
        </div>

        <div className="mt-7 overflow-hidden rounded-2xl border border-ink/15 bg-white md:grid md:grid-cols-[0.76fr_1.24fr] md:rounded-none">
          <div className="bg-ink md:min-h-[520px]">
            <div className="hidden border-b border-white/15 px-7 py-6 md:block">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-400">
                Select a field note
              </p>
            </div>

            <div role="tablist" aria-label="Published insights">
              {INSIGHTS.map((insight, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={insight.slug}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="insight-preview"
                    onClick={() => selectInsight(index)}
                    className={`${
                      selected ? "flex" : "hidden md:flex"
                    } w-full items-start gap-4 border-b border-white/15 px-5 py-5 text-left transition-colors hover:bg-white/[0.06] md:min-h-[134px] md:px-7 md:py-6`}
                  >
                    <span className="mt-1 shrink-0 text-xs font-semibold tracking-[0.14em] text-violet-400">
                      {insight.number}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                        {insight.readTime}
                      </span>
                      <span className="mt-2 block font-display text-2xl font-bold leading-tight text-white md:text-xl lg:text-2xl">
                        {insight.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="hidden px-7 py-6 md:block">
              <Link
                to="/insights"
                className="text-sm font-semibold text-violet-400 underline decoration-violet-400/50 underline-offset-4 hover:text-violet-300"
              >
                View all published insights
              </Link>
            </div>
          </div>

          <div
            id="insight-preview"
            role="tabpanel"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex min-w-0 flex-col"
          >
            <Link
              to={articlePath}
              onClick={() => trackOpen(active, "homepage_cover")}
              aria-label={`Read Insight ${active.number}: ${active.title}`}
              className="flex h-[280px] items-center justify-center bg-[#FCF6EE] p-4 sm:h-[360px] md:min-h-[390px] md:flex-1 md:p-8"
            >
              <img
                key={active.coverImage}
                src={active.coverImage}
                alt={active.coverAlt}
                className="h-full w-auto max-w-full object-contain shadow-[0_14px_24px_rgba(23,23,23,0.16)]"
                width={1344}
                height={1800}
                loading="lazy"
              />
            </Link>

            <div className="border-t border-ink/10 px-5 py-5 sm:px-7 md:flex md:min-h-[130px] md:items-center md:justify-between md:gap-8">
              <p className="max-w-md text-sm leading-6 text-ink/65">
                {active.homepageExcerpt}
              </p>
              <Link
                to={articlePath}
                onClick={() => trackOpen(active, "homepage_read")}
                className="mt-3 inline-block shrink-0 text-sm font-semibold uppercase tracking-[0.08em] text-violet-600 hover:text-violet-700 md:mt-0"
              >
                Read insight <span aria-hidden="true">↗</span>
              </Link>

              {INSIGHTS.length > 1 && (
                <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 md:hidden">
                  <span className="text-xs font-semibold tracking-[0.12em] text-violet-600">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(INSIGHTS.length).padStart(2, "0")}
                  </span>
                  <div className="flex gap-2" aria-hidden="true">
                    {INSIGHTS.map((insight, index) => (
                      <span
                        key={insight.slug}
                        className={`h-[3px] w-5 rounded-full ${
                          index === activeIndex ? "bg-violet-600" : "bg-ink/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-ink/55">
                    Swipe ↔
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
