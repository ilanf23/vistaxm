import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/industrial-products-and-services")({
  beforeLoad: () => {
    throw redirect({ to: "/solutions/industrialpulse", statusCode: 301 });
  },
});
