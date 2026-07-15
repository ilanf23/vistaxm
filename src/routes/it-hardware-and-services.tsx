import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/it-hardware-and-services")({
  beforeLoad: () => {
    throw redirect({ to: "/solutions/partnerpulse", statusCode: 301 });
  },
});
