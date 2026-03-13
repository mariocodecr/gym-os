import "server-only";
import { serverApi } from "@/lib/server-api";
import type { Attendance } from "@/types";

export function getAttendance() {
  return serverApi.get<Attendance[]>("/attendance");
}
