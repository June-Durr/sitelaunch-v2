import React, { useState, useEffect } from "react";
import Popover from "./Popover";

const ColorPicker = ({
  initialColor = "#0fccce",
  onChange,
  label = "Color",
  className = "",
}) => {
  const [color, setColor] = useState(initialColor);
  const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0 });

  // Convert hex to RGB on initial load
  useEffect(() => {
    const hexToRgb = (hex) => {
      // Remove # if present
      hex = hex.replace("#", "");

      // Convert 3-digit hex to 6-digit
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((char) => char + char)
          .join("");
      }

      // Parse RGB values
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      return { r, g, b };
    };

    setRgb(hexToRgb(initialColor));
  }, [initialColor]);

  // Convert RGB to Hex
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  // Update RGB values
  const handleRgbChange = (component, value) => {
    const newRgb = { ...rgb, [component]: parseInt(value, 10) };
    setRgb(newRgb);

    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setColor(newHex);

    if (onChange) {
      onChange(newHex);
    }
  };

  // Handle direct hex input
  const handleHexChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);

    try {
      // Only update RGB if a valid hex color
      if (/^#[0-9A-F]{6}$/i.test(newColor)) {
        const newRgb = {
          r: parseInt(newColor.slice(1, 3), 16),
          g: parseInt(newColor.slice(3, 5), 16),
          b: parseInt(newColor.slice(5, 7), 16),
        };
        setRgb(newRgb);

        if (onChange) {
          onChange(newColor);
        }
      }
    } catch (error) {
      console.error("Invalid hex color", error);
    }
  };

  const colorPickerContent = (
    <div className="lf-color-picker w-60 p-3">
      <div className="lf-color-selectors">
        <div className="lf-color-component">
          <strong>R:</strong>
          <input
            type="range"
            min="0"
            max="255"
            value={rgb.r}
            onChange={(e) => handleRgbChange("r", e.target.value)}
            className="lf-progress w-24"
          />
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.r}
            onChange={(e) => handleRgbChange("r", e.target.value)}
            className="lf-text-input ml-2 w-14"
          />
        </div>

        <div className="lf-color-component mt-2">
          <strong>G:</strong>
          <input
            type="range"
            min="0"
            max="255"
            value={rgb.g}
            onChange={(e) => handleRgbChange("g", e.target.value)}
            className="lf-progress w-24"
          />
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.g}
            onChange={(e) => handleRgbChange("g", e.target.value)}
            className="lf-text-input ml-2 w-14"
          />
        </div>

        <div className="lf-color-component mt-2">
          <strong>B:</strong>
          <input
            type="range"
            min="0"
            max="255"
            value={rgb.b}
            onChange={(e) => handleRgbChange("b", e.target.value)}
            className="lf-progress w-24"
          />
          <input
            type="number"
            min="0"
            max="255"
            value={rgb.b}
            onChange={(e) => handleRgbChange("b", e.target.value)}
            className="lf-text-input ml-2 w-14"
          />
        </div>
      </div>

      <div className="lf-color-preview mt-4">
        <div
          className="lf-preview rounded-md shadow-sm"
          style={{ backgroundColor: color, height: "40px", width: "100%" }}
        ></div>
        <input
          type="text"
          value={color}
          onChange={handleHexChange}
          className="lf-text-input mt-2 w-full"
        />
      </div>
    </div>
  );

  return (
    <div className={`color-picker-container ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <Popover
        trigger={
          <div className="flex items-center cursor-pointer">
            <div
              className="w-8 h-8 rounded-md mr-2 border border-gray-300"
              style={{ backgroundColor: color }}
            ></div>
            <span className="text-sm text-gray-600">{color}</span>
          </div>
        }
        content={colorPickerContent}
        position="bottom"
        align="start"
      />
    </div>
  );
};

export default ColorPicker;
