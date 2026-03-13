import "server-only";
import { serverApi } from "@/lib/server-api";
import type { Expense } from "@/types";

export function getExpenses() {
  return serverApi.get<Expense[]>("/expenses");
}
