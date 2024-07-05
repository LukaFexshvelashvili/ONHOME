import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  base: "/",
  plugins: [
    react(), // Plugin for React support
    compression({
      // Optional plugin for compression
      algorithm: "gzip",
      ext: ".gz",
      deleteOriginFile: false,
    }),
  ],
  server: {
    port: 1026,
  },
  build: {
    outDir: "dist",
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Split vendor code into separate chunk
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Pre-bundle dependencies for faster dev server start
  },
});
