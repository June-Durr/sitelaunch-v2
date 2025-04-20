import React, { useState } from "react";
import clsx from "clsx";

const Progress = ({
  min = 0,
  max = 100,
  value = 50,
  onChange,
  className = "",
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setCurrentValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  // Calculate progress percentage
  const progressPercentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div className="relative w-full">
      {/* Custom track background */}
      <div
        className="absolute inset-0 h-1 bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2"
        style={{ zIndex: 1 }}
      ></div>

      {/* Progress fill */}
      <div
        className="absolute h-1 bg-primary-500 rounded-full top-1/2 transform -translate-y-1/2"
        style={{ width: `${progressPercentage}%`, zIndex: 2 }}
      ></div>

      {/* Actual range input - using the lf-progress class from your CSS */}
      <input
        type="range"
        min={min}
        max={max}
        value={currentValue}
        onChange={handleChange}
        className={clsx("lf-progress relative z-10", className)}
        style={{ background: "transparent" }}
        {...props}
      />
    </div>
  );
};

export default Progress;
