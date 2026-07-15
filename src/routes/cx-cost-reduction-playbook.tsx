import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cx-cost-reduction-playbook")({
  beforeLoad: () => {
    throw redirect({ to: "/proof", statusCode: 301 });
  },
});
