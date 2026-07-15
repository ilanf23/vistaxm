import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/white-papers")({
  beforeLoad: () => {
    throw redirect({ to: "/insights", statusCode: 301 });
  },
});
