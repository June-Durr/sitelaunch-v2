import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import { mediaReveal, viewportOnce } from "../../utils/motion";

const DESKTOP_REEL = "/videos/sitelaunch-showreel-2026.mp4";
const MOBILE_REEL = "/videos/sitelaunch-showreel-mobile-final.mp4";
const REEL_POSTER = "/images/sitelaunch-showreel-poster.webp";

const MOBILE_BREAKPOINT_QUERY = "(max-width: 639px)";

const SelectedWorkReel = () => {
  const videoRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches
  );
  const [shouldPlay, setShouldPlay] = useState(true);
  const reelSrc = isMobile ? MOBILE_REEL : DESKTOP_REEL;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);

    const handleChange = (event) => setPrefersReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_BREAKPOINT_QUERY);
    setIsMobile(query.matches);

    const handleChange = (event) => setIsMobile(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  // Deciding the source in JS (rather than <source media="…">) sidesteps
  // browsers that don't reliably honor conditional <source> selection and
  // silently fall back to the wrong clip. The prerendered markup ships a
  // desktop-viewport <video src> baked in by the puppeteer prerender pass,
  // and production hydration adopts that DOM node without patching mismatched
  // attributes — so the src prop alone never reaches the element. Set it on
  // the node directly before load() instead of trusting React's JSX prop.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const absoluteReelSrc = new URL(reelSrc, window.location.href).href;
    if (video.currentSrc === absoluteReelSrc) return;

    video.src = reelSrc;
    video.load();
    if (shouldPlay && !prefersReducedMotion) {
      video.play().catch(() => setShouldPlay(false));
    }
  }, [reelSrc, shouldPlay, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !videoRef.current) return undefined;

    const video = videoRef.current;
    if (shouldPlay) {
      video.play().catch(() => setShouldPlay(false));
    } else {
      video.pause();
    }

    return undefined;
  }, [prefersReducedMotion, shouldPlay]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setShouldPlay(true)).catch(() => setShouldPlay(false));
    } else {
      video.pause();
      setShouldPlay(false);
    }
  };

  return (
    <section
      id="reel"
      aria-label="SiteLaunch Studios showreel"
      className="scroll-mt-[calc(var(--header-height,68px)+8px)] bg-ivory pb-8 pt-1 sm:pb-20 sm:pt-2"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 hidden items-center justify-between sm:flex">
          <Kicker>Selected Work / 2026 Reel</Kicker>
          <span className="font-display text-sm font-semibold text-ink/50">
            00:22
          </span>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-lg bg-ink sm:rounded-none"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={mediaReveal}
        >
          <div className="aspect-[3/4] w-full sm:aspect-video">
            {prefersReducedMotion ? (
              <img
                src={REEL_POSTER}
                alt="Selected SiteLaunch website projects"
                className="h-full w-full object-cover object-center"
                width={1920}
                height={1080}
                loading="eager"
                fetchPriority="high"
              />
            ) : (
              <video
                ref={videoRef}
                src={reelSrc}
                className="h-full w-full object-cover object-center"
                poster={REEL_POSTER}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                aria-hidden="true"
              />
            )}
          </div>

          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={shouldPlay ? "Pause showreel" : "Play showreel"}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-ink/75 text-white backdrop-blur-sm transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:top-4"
            >
              {shouldPlay ? (
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                  <path d="M1 1v12M11 1v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
                  <path d="m1 1 10 6-10 6V1Z" fill="currentColor" />
                </svg>
              )}
            </button>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default SelectedWorkReel;
