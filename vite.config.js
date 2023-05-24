import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import sharp from "sharp";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": "/src/assets",
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 8000,
  },
  plugins: [react(), ViteImageOptimizer()],
  mode: "production",
});
