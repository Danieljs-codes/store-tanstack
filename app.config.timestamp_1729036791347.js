// app.config.ts
import { defineConfig } from "@tanstack/start/config";
import { index, layout, rootRoute, route } from "@tanstack/virtual-file-routes";
import svgr from "vite-plugin-svgr";
import viteTsConfigPaths from "vite-tsconfig-paths";
var routes = rootRoute("__root.tsx", [
  index("index.tsx"),
  layout("auth-layout-id", "auth/layout.tsx", [
    route("/sign-up", "auth/sign-up.tsx"),
    route("/sign-in", "auth/sign-in.tsx")
  ]),
  route("/create-store", "store/create.tsx")
]);
var app_config_default = defineConfig({
  tsr: {
    appDirectory: "./app",
    virtualRouteConfig: routes
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      svgr(),
      viteTsConfigPaths({
        projects: ["./tsconfig.json"]
      })
    ]
  }
});
export {
  app_config_default as default
};
