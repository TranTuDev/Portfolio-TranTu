import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home-page.tsx"),
  route("home", "routes/home-page.tsx", { id: "home-path" }),
] satisfies RouteConfig;