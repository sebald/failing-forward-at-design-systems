import { defineConfig } from "vite";
import injectFolder from "./plugins/vite-plugin-inject-folder";

export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "/failing-forward-at-design-systems"
      : "",
  publicDir: "assets",
  plugins: [injectFolder()],
});
