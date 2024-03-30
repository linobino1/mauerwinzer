import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*", "**/*.css"],
      // appDirectory: "app",
      // assetsBuildDirectory: "public/build",
      // publicPath: "/build/",
      // serverBuildPath: "build/index.js",
    }),
    tsconfigPaths(),
  ],
  logLevel: "warn",
  ssr: {
    noExternal: ["remix-i18next"],
  },
  optimizeDeps: {
    include: ["@faceless-ui/modal"],
  },
});
