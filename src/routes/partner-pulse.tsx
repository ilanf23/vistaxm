import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/partner-pulse")({
  beforeLoad: () => {
    throw redirect({ to: "/solutions/partnerpulse", statusCode: 301 });
  },
});
