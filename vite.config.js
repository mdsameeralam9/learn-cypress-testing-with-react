/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: "jsdom", // Use JSDOM for DOM APIs in tests
    setupFiles: ["./setup.js"], // Optional: global test setup (e.g., jest-dom) 
    globals: true, // Optional: enable describe/it/expect as globals 
    css: true, // Optional: allow CSS imports in tests 
    coverage: {
      reporter: ["text", "html"], // Optional: coverage output formats 
    },
  },
});
