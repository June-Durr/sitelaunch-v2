/** @type {import('tailwindcss').Config} */
// Tokens mirror DESIGN.md. Change a value here only together with DESIGN.md.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  future: {
    // Hover styles only on devices that can hover, so taps on phones
    // don't leave links and buttons stuck in their hover state.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        ivory: "#F5F1E9",
        paper: "#FCF6EE",
        ink: "#171717",
        accent: {
          300: "#C4B5FD",
          400: "#A78BFA",
          600: "#7C3AED",
          700: "#6D28D9",
        },
        error: "#F87171",
        signal: "#D95D5D",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      boxShadow: {
        media: "0 12px 24px rgb(23 23 23 / 0.15)",
      },
    },
  },
  plugins: [],
};
