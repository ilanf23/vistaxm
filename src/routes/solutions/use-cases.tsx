import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/solutions/use-cases")({
  beforeLoad: () => {
    throw redirect({ to: "/how-to-start", statusCode: 301 });
  },
});
