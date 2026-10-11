import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  test: {
    // jsdom rather than a real browser: these tests assert what the components
    // render and what the router resolves, neither of which needs a GPU.
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    include: ["src/**/*.test.{js,jsx}", "scripts/**/*.test.js"],
    // The prerender script spawns a headless browser; the test only imports
    // its route table, so nothing here should go near the network.
    restoreMocks: true,
  },
});
