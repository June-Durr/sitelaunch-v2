import React from "react";
import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500";

  const variantClasses = {
    primary: "bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm",
    secondary: "bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm",
    outline: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent",
    link: "bg-transparent underline text-primary-500 hover:text-primary-600 border-none",
    action:
      "bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm group relative", // For arrow icon buttons
  };

  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2.5 px-5 text-base",
    lg: "py-3 px-6 text-lg",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";
  const widthClasses = fullWidth ? "w-full" : "";

  // Special handling for action buttons with arrows
  const isActionButton = variant === "action" && props.withArrow;

  return (
    // In Button.jsx, update the onClick handler
    <button
      type={type}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        widthClasses,
        className
      )}
      disabled={disabled}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      {...props}
    >
      <span className="flex items-center">
        {children}

        {/* Arrow for action buttons */}
        {isActionButton && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        )}
      </span>
    </button>
  );
};

// Create a special Arrow Button component
export const ArrowButton = ({ children, ...props }) => {
  return (
    <Button variant="action" withArrow {...props}>
      {children}
    </Button>
  );
};

export default Button;
