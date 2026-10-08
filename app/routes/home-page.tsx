import type { Route } from "./+types/home-page";
import { HomePage } from "../pages/home-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio | Tran Minh Tu" },
    { name: "description", content: "Portfolio of Tran Minh Tu, Software Engineer" },
  ];
}

export default function HomePageRoute() {
  return <HomePage />;
}
