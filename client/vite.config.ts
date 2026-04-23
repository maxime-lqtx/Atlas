import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig as defineVitestConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineVitestConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
