import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const Popover = ({
  trigger,
  content,
  position = "bottom",
  align = "center",
  className = "",
  contentClassName = "",
  closeOnOutsideClick = true,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  // Support both controlled and uncontrolled modes
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const containerRef = useRef(null);

  const handleToggle = () => {
    if (isControlled) {
      onOpenChange?.(!isOpen);
    } else {
      setUncontrolledIsOpen(!isOpen);
    }
  };

  // Handle outside clicks
  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) return;

    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (isControlled) {
          onOpenChange?.(false);
        } else {
          setUncontrolledIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, closeOnOutsideClick, isControlled, onOpenChange]);

  // Position classes
  const getPositionClasses = () => {
    const positions = {
      top: "bottom-full mb-2",
      bottom: "top-full mt-2",
      left: "right-full mr-2",
      right: "left-full ml-2",
    };

    const alignments = {
      start: position === "top" || position === "bottom" ? "left-0" : "top-0",
      center:
        position === "top" || position === "bottom"
          ? "left-1/2 -translate-x-1/2"
          : "top-1/2 -translate-y-1/2",
      end: position === "top" || position === "bottom" ? "right-0" : "bottom-0",
    };

    return `${positions[position]} ${alignments[align]}`;
  };

  // Arrow positioning
  const getArrowClasses = () => {
    const positions = {
      top: "bottom-[-8px] border-t-white border-l-transparent border-r-transparent border-b-transparent",
      bottom:
        "top-[-8px] border-b-white border-l-transparent border-r-transparent border-t-transparent",
      left: "right-[-8px] border-l-white border-t-transparent border-b-transparent border-r-transparent",
      right:
        "left-[-8px] border-r-white border-t-transparent border-b-transparent border-l-transparent",
    };

    const alignments = {
      start: position === "top" || position === "bottom" ? "left-3" : "top-3",
      center:
        position === "top" || position === "bottom"
          ? "left-1/2 -translate-x-1/2"
          : "top-1/2 -translate-y-1/2",
      end: position === "top" || position === "bottom" ? "right-3" : "bottom-3",
    };

    return `${positions[position]} ${alignments[align]}`;
  };

  return (
    <div
      className={clsx("lf-popover relative inline-block", className)}
      ref={containerRef}
    >
      {/* Trigger element */}
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>

      {/* Popover content */}
      <div
        className={clsx(
          "lf-popover-content",
          isOpen ? "opacity-100 visible" : "hidden",
          getPositionClasses(),
          "absolute bg-white rounded shadow-custom z-50",
          contentClassName
        )}
      >
        <div className={clsx("lf-arrow absolute", getArrowClasses())}></div>
        <div className="relative z-10">{content}</div>
      </div>
    </div>
  );
};

export default Popover;
