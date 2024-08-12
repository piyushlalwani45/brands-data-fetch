import { createFileRoute } from "@tanstack/react-router";
import Products from "../features/Products";

export const Route = createFileRoute("/")({
  component: Products,
});
