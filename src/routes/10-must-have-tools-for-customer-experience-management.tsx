import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/10-must-have-tools-for-customer-experience-management")({
  beforeLoad: () => {
    throw redirect({ to: "/insights", statusCode: 301 });
  },
});
