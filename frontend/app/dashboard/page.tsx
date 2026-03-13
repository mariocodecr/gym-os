import type { Metadata } from "next";

export const metadata: Metadata = { title: "Inicio" };

const STATS = [
  { label: "Miembros activos", value: "—" },
  { label: "Ingresos del mes", value: "—" },
  { label: "Asistencias hoy", value: "—" },
  { label: "WODs publicados", value: "—" },
];

export default function DashboardPage() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-white">Resumen</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
