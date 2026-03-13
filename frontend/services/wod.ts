import "server-only";
import { serverApi } from "@/lib/server-api";
import type { Leaderboard, Wod, WodResult } from "@/types";

export function getWods() {
  return serverApi.get<Wod[]>("/wods");
}

export function getWod(id: string) {
  return serverApi.get<Wod>(`/wods/${id}`);
}

export function getTodayWod() {
  return serverApi.get<Wod | null>("/wods/today");
}

export function getWodResults(wodId: string) {
  return serverApi.get<WodResult[]>(`/results/wod/${wodId}`);
}

export function getLeaderboard(wodId: string) {
  return serverApi.get<Leaderboard>(`/results/wod/${wodId}/leaderboard`);
}
