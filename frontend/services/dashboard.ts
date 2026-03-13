import "server-only";
import { serverApi } from "@/lib/server-api";
import type { DashboardStats } from "@/types";

export function getDashboardStats() {
  return serverApi.get<DashboardStats>("/dashboard");
}
