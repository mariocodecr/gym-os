import "server-only";
import { serverApi } from "@/lib/server-api";
import type { Payment } from "@/types";

export function getPayments() {
  return serverApi.get<Payment[]>("/payments");
}

export function getMemberPayments(memberId: string) {
  return serverApi.get<Payment[]>(`/payments/member/${memberId}`);
}
