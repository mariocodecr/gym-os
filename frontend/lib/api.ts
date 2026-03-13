const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

async function fetcher<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Error del servidor" }));
    throw new Error(error.message ?? "Error del servidor");
  }

  return res.json();
}

export const api = {
  get: <T>(endpoint: string, token?: string) =>
    fetcher<T>(endpoint, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),

  post: <T>(endpoint: string, body: unknown, token?: string) =>
    fetcher<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),

  patch: <T>(endpoint: string, body: unknown, token?: string) =>
    fetcher<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
};
