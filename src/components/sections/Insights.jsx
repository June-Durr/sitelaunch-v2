import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Kicker from "../common/Kicker";
import { INSIGHTS } from "../../data/insights";
import { usePrefersReducedMotion } from "../../utils/motion";
import { readingTimeFor } from "../../lib/readingTime";
import analytics from "../../services/analytics";

// Slow enough to read the title before it moves. The previous 2 seconds was
// measured at 2005ms between changes, which is shorter than the time it takes
// to finish reading one of these headlines.
const AUTO_ADVANCE_MS = 6000;

/**
 * The published Insights, browsable without leaving the homepage.
 *
 * THREE THINGS THIS COMPONENT HAS TO GET RIGHT
 *
 * 1. The card does not change height. The covers are not all the same shape
 *    (001 is 1344x1800, the others are 1080x1350) and the excerpts do not all
 *    wrap to the same number of lines, so anything sized by its content moved
 *    by up to 60px between selections. The cover plate is therefore a fixed
 *    box that every cover is contained inside, and the excerpt row reserves
 *    the tallest case. Height is never animated.
 *
 * 2. The cover never blanks. Every cover is mounted at once and switching only
 *    changes which one is opaque. Keying a single <img> on the active cover
 *    destroyed and recreated the element on every switch, so each switch began
 *    with nothing decoded: on a cold cache over slow 3G that measured 59 of 75
 *    sampled frames with no painted cover. Mounted images stay decoded, so a
 *    switch is a crossfade rather than a fetch.
 *
 * 3. Rotation is a courtesy, not a demand. It starts only when the section is
 *    on screen, stops when the tab is hidden, when the pointer is over it, and
 *    while keyboard focus is inside, and once somebody chooses a story
 *    themselves it stops for the rest of the visit rather than yanking the
 *    card away from under them a few seconds later.
 */
const Insights = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [isFocusInside, setIsFocusInside] = useState(false);
  /** Set by the first deliberate choice, and never cleared. */
  const [manuallyBrowsed, setManuallyBrowsed] = useState(false);
  const sectionRef = useRef(null);
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

  // A background tab should not be quietly cycling through stories.
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const read = () => setIsPageVisible(document.visibilityState !== "hidden");
    read();
    document.addEventListener("visibilitychange", read);
    return () => document.removeEventListener("visibilitychange", read);
  }, []);

  const rotating =
    INSIGHTS.length > 1 &&
    isInView &&
    isPageVisible &&
    !isPointerInside &&
    !isFocusInside &&
    !manuallyBrowsed &&
    !prefersReducedMotion &&
    // The build drives a headless browser through this page and captures the
    // DOM. Rotating during that capture bakes whichever story it happened to
    // land on into the shipped HTML, which then disagrees with React's first
    // render and fails hydration. Same guard the analytics bootstrap uses.
    !(typeof navigator !== "undefined" && navigator.webdriver);

  useEffect(() => {
    if (!rotating) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % INSIGHTS.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [rotating]);

  if (!active) return null;

  /** A deliberate choice: show it, and stop rotating for this visit. */
  const selectInsight = (index) => {
    setActiveIndex(((index % INSIGHTS.length) + INSIGHTS.length) % INSIGHTS.length);
    setManuallyBrowsed(true);
  };

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
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
      onMouseEnter={() => setIsPointerInside(true)}
      onMouseLeave={() => setIsPointerInside(false)}
      onFocusCapture={() => setIsFocusInside(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocusInside(false);
      }}
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

            {/*
              * Below md only the selected tab is rendered, so that single row
              * IS the left column and its height is the card's height. The
              * titles run from two lines to four, which moved the card by 60px
              * between selections, so the row reserves the tallest case rather
              * than letting the title size the card.
              */}
            <ul aria-label="Published insights" className="list-none">
              {INSIGHTS.map((insight, index) => {
                const selected = index === activeIndex;
                const path = `/insights/${insight.slug}/`;
                return (
                  <li
                    key={insight.slug}
                    className={`${
                      selected ? "block" : "hidden md:block"
                    } relative border-b border-white/15`}
                  >
                    {/*
                      * Two separate controls, never nested. The row selects
                      * the preview, exactly as it did before. The link beside
                      * it opens the article, which is what makes all three
                      * URLs real links on the homepage rather than only
                      * whichever one happened to be showing.
                      *
                      * The link is positioned out of the button's flow rather
                      * than placed inside it, because an anchor inside a
                      * button is not valid and a screen reader cannot
                      * reliably reach it.
                      */}
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-controls="insight-preview"
                      onClick={() => selectInsight(index)}
                      className="flex min-h-[228px] w-full items-start gap-4 px-5 pb-16 pt-5 text-left transition-colors hover:bg-white/[0.06] md:min-h-[134px] md:px-7 md:pb-14 md:pt-6"
                    >
                      <span className="mt-1 shrink-0 text-xs font-semibold tracking-[0.14em] text-violet-400">
                        {insight.number}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                          {readingTimeFor(insight)}
                        </span>
                        <span className="mt-2 block font-display text-2xl font-bold leading-tight text-white md:text-xl lg:text-2xl">
                          {insight.title}
                        </span>
                      </span>
                    </button>

                    <Link
                      to={path}
                      onClick={() => trackOpen(insight, "homepage_list")}
                      aria-label={`Read Insight ${insight.number}: ${insight.title}`}
                      className="absolute bottom-3 left-5 inline-flex min-h-[44px] items-center text-xs font-semibold uppercase tracking-[0.1em] text-violet-400 underline decoration-violet-400/50 underline-offset-4 hover:text-violet-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 md:bottom-2 md:left-7"
                    >
                      Read insight <span aria-hidden="true" className="ml-1">↗</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/*
              * Visible on every width. This used to be md:block, which left a
              * phone with no route from the homepage to the Insights index at
              * all: the tabs are buttons, so the only article a crawler or a
              * visitor could reach from here was whichever one happened to be
              * selected.
              */}
            <div className="px-5 py-5 md:px-7 md:py-6">
              <Link
                to="/insights"
                className="inline-flex min-h-[44px] items-center text-sm font-semibold text-violet-400 underline decoration-violet-400/50 underline-offset-4 hover:text-violet-300"
              >
                View all published insights
              </Link>
            </div>
          </div>

          <div
            id="insight-preview"
            role="tabpanel"
            onTouchStart={handleTouchStart}
            onTouchEnd={(event) => {
              if (INSIGHTS.length < 2) return;
              const start = touchStartRef.current;
              touchStartRef.current = null;
              const endX = event.changedTouches[0]?.clientX;
              if (start === null || typeof endX !== "number") return;
              const distance = endX - start;
              if (Math.abs(distance) < 45) return;
              selectInsight(activeIndex + (distance < 0 ? 1 : -1));
            }}
            className="flex min-w-0 flex-col"
          >
            {/*
              * A fixed plate, not a content-sized one. Every cover is contained
              * inside the same box, so a portrait cover and a slightly squarer
              * one occupy identical space and the card cannot change height
              * between selections.
              */}
            <Link
              to={articlePath}
              onClick={() => trackOpen(active, "homepage_cover")}
              aria-label={`Read Insight ${active.number}: ${active.title}`}
              className="relative block h-[280px] w-full shrink-0 bg-[#FCF6EE] p-4 sm:h-[360px] md:h-[390px] md:flex-1 md:p-8"
            >
              {INSIGHTS.map((insight, index) => {
                const selected = index === activeIndex;
                return (
                  <img
                    key={insight.slug}
                    src={insight.coverImage}
                    alt={selected ? insight.coverAlt : ""}
                    aria-hidden={selected ? undefined : "true"}
                    width={insight.coverWidth}
                    height={insight.coverHeight}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-4 m-auto max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] object-contain shadow-[0_14px_24px_rgba(23,23,23,0.16)] md:inset-8 md:max-h-[calc(100%-4rem)] md:max-w-[calc(100%-4rem)] ${
                      prefersReducedMotion ? "" : "transition-opacity duration-300"
                    } ${selected ? "opacity-100" : "opacity-0"}`}
                  />
                );
              })}
            </Link>

            <div className="border-t border-ink/10 px-5 py-5 sm:px-7 md:flex md:min-h-[130px] md:items-center md:justify-between md:gap-8">
              {/*
                * Reserves the tallest excerpt. Without it a two line excerpt and
                * a three line one moved the card by 24px on a phone.
                */}
              <p className="min-h-[4.5rem] max-w-md text-sm leading-6 text-ink/65 md:min-h-0">
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
                  {/*
                    * One interpolation, not three. Written as separate
                    * expressions React emits three text nodes while the
                    * prerendered HTML serialises one, and hydration fails.
                    */}
                  <span className="text-xs font-semibold tracking-[0.12em] text-violet-600">
                    {`${String(activeIndex + 1).padStart(2, "0")} / ${String(
                      INSIGHTS.length
                    ).padStart(2, "0")}`}
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
