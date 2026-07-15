import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/customer-experience-a-core-business-strategy-but-not-the-only-path-to-success",
)({
  beforeLoad: () => {
    throw redirect({ to: "/insights", statusCode: 301 });
  },
});
