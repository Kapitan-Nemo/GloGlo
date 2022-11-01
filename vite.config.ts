import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgo: false,
    }),
  ],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: ` @import "./src/scss/variables.scss";
        @import "./src/scss/global/mixins.scss";`,
      },
    },
  },
});
