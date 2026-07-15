import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/brochures/$")({
  beforeLoad: () => {
    throw redirect({ to: "/insights", statusCode: 301 });
  },
});
