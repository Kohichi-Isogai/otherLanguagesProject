import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/src/main/resources/static",
  },
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
