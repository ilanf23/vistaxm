import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/solutions/methodology")({
  beforeLoad: () => {
    throw redirect({ to: "/the-model", statusCode: 301 });
  },
});
