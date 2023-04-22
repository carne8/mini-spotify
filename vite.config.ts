import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import solidSvg from "vite-plugin-solid-svg"

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [solidPlugin(), solidSvg()],

  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },
}))
