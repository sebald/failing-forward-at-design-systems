import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "/failing-forward-at-design-systems"
      : "/",
  server: {
    port: 3000,
  },
  plugins: [
    injectHTML({
      tagName: "include",
      sourceAttr: "file",
    }),
  ],
});
