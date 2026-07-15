import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/insight-hub/")({
  beforeLoad: () => {
    throw redirect({ to: "/insights", statusCode: 301 });
  },
});
