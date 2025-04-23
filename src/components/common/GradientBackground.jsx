import React from "react";

// This component can be used as a wrapper for sections that need the gradient background
const GradientBackground = ({
  children,
  variant = "dark", // options: "dark", "light", "primary"
  waveEffect = false,
  className = "",
}) => {
  const getBackgroundClasses = () => {
    switch (variant) {
      case "dark":
        return "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900";
      case "light":
        return "bg-gradient-to-br from-white to-gray-50";
      case "primary":
        return "bg-gradient-to-br from-primary-500 to-primary-700";
      default:
        return "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900";
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${getBackgroundClasses()} ${className}`}
    >
      {/* Purple/blue glow effects */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>

      {/* Wave effect overlay (optional) */}
      {waveEffect && (
        <div className="absolute inset-0 z-0 opacity-10">
          <svg
            viewBox="0 0 1440 320"
            className="absolute bottom-0 w-full h-64"
            preserveAspectRatio="none"
          >
            <path
              fill="url(#purple-gradient)"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,176C960,181,1056,235,1152,229.3C1248,224,1344,160,1392,128L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            <defs>
              <linearGradient
                id="purple-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#6b46c1" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            viewBox="0 0 1440 320"
            className="absolute top-0 w-full h-64 transform rotate-180"
            preserveAspectRatio="none"
          >
            <path
              fill="url(#blue-gradient)"
              fillOpacity="1"
              d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,128C672,139,768,213,864,213.3C960,213,1056,139,1152,122.7C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            <defs>
              <linearGradient
                id="blue-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#0fccce" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GradientBackground;
