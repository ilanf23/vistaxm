import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/broker-pulse")({
  beforeLoad: () => {
    throw redirect({ to: "/solutions/brokerpulse", statusCode: 301 });
  },
});
