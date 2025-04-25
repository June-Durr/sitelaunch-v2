import React from "react";

const CurvedSectionDivider = ({
  fillColor = "#f9f7ff",
  position = "bottom",
  height = "60px",
  className = "",
}) => {
  if (position === "bottom") {
    return (
      <div className={`relative ${className}`} style={{ height }}>
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill={fillColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L1440 0L1440 30C1440 30 1252.94 60 720 60C187.06 60 0 30 0 30L0 0Z"
            fill={fillColor}
          />
        </svg>
      </div>
    );
  } else {
    // Top curve
    return (
      <div className={`relative ${className}`} style={{ height }}>
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          fill={fillColor}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60L1440 60L1440 30C1440 30 1252.94 0 720 0C187.06 0 0 30 0 30L0 60Z"
            fill={fillColor}
          />
        </svg>
      </div>
    );
  }
};

export default CurvedSectionDivider;
