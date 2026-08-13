import { motion } from "framer-motion";
import Kicker from "../common/Kicker";
import { EASE, usePrefersReducedMotion, viewportOnce } from "../../utils/motion";

// A small set of wireframe-style blocks that start scattered and settle
// into one aligned, full-width mobile layout, guided by a purple rule.
// Concept: SiteLaunch turns unclear websites into structured, responsive
// experiences. Kept to plain rects (no literal browser chrome, no fake UI
// text) so it reads as brand motion design rather than a mockup.
//
// Runs once on scroll-in rather than looping - a continuously repeating
// animation this size would need a pause control under WCAG 2.2.2, and a
// single confident "settle" reads as more intentional than a repeating
// loop would anyway.
const BLOCKS = [
  { key: "header", scattered: { x: 210, y: 6, rotate: 13 }, aligned: { x: 25, y: 16 }, w: 70, h: 12 },
  { key: "hero", scattered: { x: 40, y: 55, rotate: -9 }, aligned: { x: 25, y: 38 }, w: 130, h: 56, alignedW: 270 },
  { key: "text1", scattered: { x: 150, y: 150, rotate: 7 }, aligned: { x: 25, y: 108 }, w: 190, h: 8, alignedW: 270 },
  { key: "text2", scattered: { x: 6, y: 188, rotate: -12 }, aligned: { x: 25, y: 122 }, w: 150, h: 8, alignedW: 210 },
  { key: "image", scattered: { x: 188, y: 96, rotate: 10 }, aligned: { x: 25, y: 142 }, w: 100, h: 46, alignedW: 270 },
  { key: "button", scattered: { x: 58, y: 205, rotate: -8 }, aligned: { x: 25, y: 200 }, w: 64, h: 18 },
];

// Content-only: no <section>/max-w wrapper of its own. It's meant to be
// embedded as a mobile-only middle child of the #services grid in Home.jsx
// (between ServicesPricing and WhySiteLaunch) so it inherits that section's
// background/padding rather than doubling it up, and disappears at lg+
// without disturbing the existing two-column desktop layout.
const StructureInterlude = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="border-t border-ink/10 py-10">
      <div className="grid grid-cols-1 items-center gap-8">
        <div>
          <Kicker as="h2">How We Work</Kicker>
          <p className="mt-3 max-w-sm font-display text-2xl font-bold text-ink">
            Unclear becomes structured. Structured becomes responsive.
          </p>
        </div>

        <div className="mx-auto w-full max-w-xs">
            <svg
              viewBox="0 0 320 240"
              className="h-auto w-full"
              aria-hidden="true"
            >
              {!prefersReducedMotion && (
                <motion.line
                  x1="14"
                  y1="10"
                  x2="14"
                  y2="222"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, ease: EASE }}
                />
              )}
              {prefersReducedMotion && (
                <line
                  x1="14"
                  y1="10"
                  x2="14"
                  y2="222"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}

              {BLOCKS.map((block, index) =>
                prefersReducedMotion ? (
                  <rect
                    key={block.key}
                    x={block.aligned.x}
                    y={block.aligned.y}
                    width={block.alignedW ?? block.w}
                    height={block.h}
                    rx="2"
                    fill="#171717"
                    fillOpacity="0.85"
                  />
                ) : (
                  <motion.rect
                    key={block.key}
                    width={block.w}
                    height={block.h}
                    rx="2"
                    fill="#171717"
                    fillOpacity="0.85"
                    initial={{
                      x: block.scattered.x,
                      y: block.scattered.y,
                      rotate: block.scattered.rotate,
                      width: block.w,
                    }}
                    whileInView={{
                      x: block.aligned.x,
                      y: block.aligned.y,
                      rotate: 0,
                      width: block.alignedW ?? block.w,
                    }}
                    viewport={viewportOnce}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    transition={{
                      duration: 0.6,
                      ease: EASE,
                      delay: 0.3 + index * 0.08,
                    }}
                  />
                )
              )}
            </svg>
        </div>
      </div>
    </div>
  );
};

export default StructureInterlude;
