import React from "react";

// Small tracked-out label used above section headings across the homepage.
// Renders as a <span> by default; pass as="h2" when a section has no other
// heading of its own, so sub-items below it (h3s) still nest under a real
// heading instead of skipping a level.
const Kicker = ({ children, tone = "default", as = "span", className = "" }) => {
  const Tag = as;
  const toneClasses =
    tone === "inverted"
      ? "text-accent-400"
      : tone === "muted"
        ? "text-ink/65"
        : "text-accent-600";

  return (
    <Tag
      className={`block type-label ${toneClasses} ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Kicker;
