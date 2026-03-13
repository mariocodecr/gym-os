import "server-only";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

async function serverFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    const error = await res
      .json()
      .catch(() => ({ message: "Error del servidor" }));
    throw new Error(error.message ?? "Error del servidor");
  }

  return res.json();
}

export const serverApi = {
  get: <T>(endpoint: string) => serverFetch<T>(endpoint),

  post: <T>(endpoint: string, body: unknown) =>
    serverFetch<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  patch: <T>(endpoint: string, body: unknown) =>
    serverFetch<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string) =>
    serverFetch<T>(endpoint, { method: "DELETE" }),
};
