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
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";

  const variantClasses = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white border border-primary-500",
    secondary:
      "bg-secondary-500 hover:bg-secondary-600 text-white border border-secondary-500",
    outline:
      "bg-transparent hover:bg-primary-50 text-primary-500 border border-primary-500",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent",
    link: "bg-transparent underline text-primary-500 hover:text-primary-600 border-none",
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

  return (
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
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
