import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/financial-services")({
  beforeLoad: () => {
    throw redirect({ to: "/solutions/brokerpulse", statusCode: 301 });
  },
});
