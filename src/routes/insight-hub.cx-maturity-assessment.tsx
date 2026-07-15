import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/insight-hub/cx-maturity-assessment")({
  beforeLoad: () => {
    throw redirect({ to: "/proof", statusCode: 301 });
  },
});
