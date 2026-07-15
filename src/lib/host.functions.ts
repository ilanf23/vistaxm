import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";

const PRODUCTION_HOSTS = new Set(["vistaxm.com", "www.vistaxm.com"]);

export const getIsProductionHost = createServerFn({ method: "GET" }).handler(() => {
  try {
    const host = getRequestHost().toLowerCase().split(":")[0];
    return { isProductionHost: PRODUCTION_HOSTS.has(host) };
  } catch {
    return { isProductionHost: false };
  }
});
