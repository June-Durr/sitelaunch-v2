import React from "react";

const CurvedSectionDivider = ({
  fillColor = "#f9f7ff",
  position = "bottom",
  height = "60px",
  className = "",
  backgroundColor = "transparent",
}) => {
  if (position === "bottom") {
    return (
      <div
        className={`relative ${className}`}
        style={{ height, backgroundColor }}
      >
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill={fillColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L1440 0L1440 40C1440 40 1200 60 720 60C240 60 0 40 0 40L0 0Z"
            fill={fillColor}
          />
        </svg>
      </div>
    );
  } else {
    // Top curve - making it very flat like in the image
    return (
      <div
        className={`relative ${className}`}
        style={{ height, backgroundColor }}
      >
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill={fillColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60L1440 60L1440 10C1440 10 1200 0 720 0C240 0 0 10 0 10L0 60Z"
            fill={fillColor}
          />
        </svg>
      </div>
    );
  }
};

export default CurvedSectionDivider;
