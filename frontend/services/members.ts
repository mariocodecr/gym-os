import "server-only";
import { serverApi } from "@/lib/server-api";
import type { Member } from "@/types";

export function getMembers() {
  return serverApi.get<Member[]>("/members");
}

export function getMember(id: string) {
  return serverApi.get<Member>(`/members/${id}`);
}

export function getMemberQr(id: string) {
  return serverApi.get<{ qrCode: string }>(`/members/${id}/qr`);
}
