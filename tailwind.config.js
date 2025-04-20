/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0fdfd",
          100: "#ccfafa",
          200: "#99f5f5",
          300: "#66f0f0",
          400: "#33ebeb",
          500: "#0fccce",
          600: "#0ca3a5",
          700: "#09797b",
          800: "#065052",
          900: "#032829",
        },
        secondary: {
          500: "#FF6B35",
        },
      },
    },
  },
  plugins: [],
};
