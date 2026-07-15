import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/solutions/results-we-deliver")({
  beforeLoad: () => {
    throw redirect({ to: "/proof", statusCode: 301 });
  },
});
