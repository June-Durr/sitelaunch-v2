import Kicker from "../common/Kicker";

// A small set of wireframe-style blocks in one aligned, full-width mobile
// layout, against a purple guide. Concept: SiteLaunch turns unclear websites
// into structured, responsive experiences. Kept to plain rects (no literal
// browser chrome, no fake UI text) so it reads as brand motion design rather
// than a mockup.
//
// WHY THE BLOCKS NO LONGER FLY IN
//
// They used to start scattered and settle into place, with every block's
// resting position living only inside framer-motion's whileInView. That made
// the drawn illustration entirely dependent on JavaScript having run AND on
// the element having been seen by an IntersectionObserver. This component is
// rendered inside a `lg:hidden` wrapper, and the build prerenders at 1366px
// wide, where that wrapper is display:none. An element inside display:none
// never intersects anything, so the animation never ran during the capture and
// the shipped HTML froze the entrance state: blocks at their scattered widths
// and a guide line at opacity 0. On a phone that is what loaded, and it stayed
// that way until hydration finished, or forever if the bundle never arrived.
//
// Reserving space and animating "harder" would not fix that, because the
// failure is that the resting layout was never in the markup. So the layout is
// now plain SVG attributes that need nothing to run, and the only motion is a
// single fade and rise of the whole figure. The worst case is now a correct,
// fully drawn illustration that did not fade in, rather than a broken one.
const BLOCKS = [
  { key: "header", x: 25, y: 16, w: 70, h: 12 },
  { key: "hero", x: 25, y: 38, w: 270, h: 56 },
  { key: "text1", x: 25, y: 108, w: 270, h: 8 },
  { key: "text2", x: 25, y: 122, w: 210, h: 8 },
  { key: "image", x: 25, y: 142, w: 270, h: 46 },
  { key: "button", x: 25, y: 200, w: 64, h: 18 },
];

// Content-only: no <section>/max-w wrapper of its own. It is embedded as a
// mobile-only middle child of the #services grid in Home.jsx (between
// ServicesPricing and WhySiteLaunch) so it inherits that section's background
// and padding rather than doubling it up, and disappears at lg+ without
// disturbing the two-column desktop layout.
//
// WHY THERE IS NO ENTRANCE ANIMATION HERE AT ALL
//
// A whileInView fade was tried on the figure instead of on the blocks, and the
// capture shipped `style="opacity: 0"` on the wrapper: the illustration was
// invisible in the delivered HTML for exactly the same reason as before. The
// rule this element lives under, and the reason it is written down here:
//
//   Nothing inside the lg:hidden wrapper in Home.jsx may use whileInView.
//
// The build prerenders at 1366px, where that wrapper is display:none, so any
// scroll-triggered animation inside it serialises its hidden starting state
// into the page every visitor downloads. Motion that cannot run is not a
// degraded experience here, it is a blank panel.
const StructureInterlude = () => (
  <div className="border-t border-ink/10 py-10">
    <div className="grid grid-cols-1 items-center gap-8">
      <div>
        <Kicker as="h2">How We Work</Kicker>
        <p className="mt-3 max-w-sm font-display text-2xl font-bold text-ink">
          Unclear becomes structured. Structured becomes responsive.
        </p>
      </div>

      <div className="mx-auto w-full max-w-xs">
        {/*
          * Described rather than hidden. The blocks carry the same idea as the
          * sentence above them, and a screen reader told only "image" learns
          * nothing, so the figure names what it shows.
          */}
        <svg
          viewBox="0 0 320 240"
          className="h-auto w-full"
          role="img"
          aria-label="Page blocks aligned into one structured mobile layout against a vertical guide."
        >
          <line
            x1="14"
            y1="10"
            x2="14"
            y2="222"
            stroke="#7C3AED"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {BLOCKS.map((block) => (
            <rect
              key={block.key}
              x={block.x}
              y={block.y}
              width={block.w}
              height={block.h}
              rx="2"
              fill="#171717"
              fillOpacity="0.85"
            />
          ))}
        </svg>
      </div>
    </div>
  </div>
);

export default StructureInterlude;
