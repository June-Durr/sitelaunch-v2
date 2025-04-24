// Check your tailwind.config.js file
// Make sure your secondary color is set to the orange gradient shade you want
// Here's a sample of what your colors section might look like:

/** @type {import('tailwindcss').Config} */
export default {
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
          // This is your orange color - verify this matches your gradient
          // If not, adjust these values to match your desired orange
          500: "#FF6B35", // Current orange value
          600: "#E85A20", // Slightly darker for hover states
        },
        purple: {
          50: "#f9f7ff",
          100: "#f3eeff",
          200: "#e9ddff",
          300: "#d6c0ff",
          400: "#b799ff",
          500: "#9d74ff",
          600: "#8851ff",
          700: "#7341d9",
          800: "#5e33b5",
          900: "#4a2490",
        },
      },
    },
  },
  plugins: [],
};
