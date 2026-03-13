import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { serverApi } from "@/lib/server-api";
import type { User } from "@/types";
import { NavLink } from "./_components/nav-link";
import { LogoutButton } from "./_components/logout-button";

export const metadata: Metadata = {
  title: { template: "%s | GymOS", default: "Dashboard | GymOS" },
};

const NAV_ITEMS = [
  { href: "/dashboard", label: "Inicio", exact: true },
  { href: "/dashboard/members", label: "Miembros" },
  { href: "/dashboard/payments", label: "Pagos" },
  { href: "/dashboard/expenses", label: "Gastos" },
  { href: "/dashboard/attendance", label: "Asistencia" },
  { href: "/dashboard/wod", label: "WOD" },
  { href: "/dashboard/blog", label: "Blog" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/login");

  let user: User | null = null;
  try {
    user = await serverApi.get<User>("/auth/profile");
  } catch {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-6">
          <Link href="/dashboard">
            <h1 className="text-xl font-bold text-white">GymOS</h1>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} href={item.href} exact={item.exact}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <p className="text-sm font-medium text-white">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.role}</p>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
