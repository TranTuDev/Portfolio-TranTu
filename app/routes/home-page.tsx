import type { Route } from "./+types/home-page";
import { HomePage } from "../pages/home-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | VAECO" },
    { name: "description", content: "VAECO Home Page" },
  ];
}

export default function HomePageRoute() {
  return <HomePage />;
}
