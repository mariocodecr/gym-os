"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    document.cookie = "token=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-2 w-full rounded-lg px-3 py-1.5 text-xs text-slate-500 transition-colors hover:bg-slate-800 hover:text-red-400"
    >
      Cerrar sesión
    </button>
  );
}
