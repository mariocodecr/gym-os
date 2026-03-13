import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | GymOS",
    default: "Dashboard | GymOS",
  },
};

const NAV_ITEMS = [
  { href: "/dashboard", label: "Inicio" },
  { href: "/dashboard/members", label: "Miembros" },
  { href: "/dashboard/payments", label: "Pagos" },
  { href: "/dashboard/expenses", label: "Gastos" },
  { href: "/dashboard/attendance", label: "Asistencia" },
  { href: "/dashboard/wod", label: "WOD" },
  { href: "/dashboard/blog", label: "Blog" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-white">GymOS</h1>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
