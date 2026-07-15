import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/customer-experience-management-strategies-for-small-businesses")({
  beforeLoad: () => {
    throw redirect({ to: "/insights", statusCode: 301 });
  },
});
