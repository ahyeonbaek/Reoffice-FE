import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), removeConsole()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@apis": path.resolve(__dirname, "src/apis"),
      "@components": path.resolve(__dirname, "src/components"),
      "@consts": path.resolve(__dirname, "src/consts"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@route": path.resolve(__dirname, "src/route"),
      "@types": path.resolve(__dirname, "src/types"),
      "@zustand": path.resolve(__dirname, "src/zustand"),
    },
  },
});
