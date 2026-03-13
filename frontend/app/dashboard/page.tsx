import type { Metadata } from "next";
import { getDashboardStats } from "@/services/dashboard";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Inicio" };

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-white">Resumen</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Miembros totales" value={stats.totalMembers} />
        <StatCard
          label="Membresías activas"
          value={stats.activeMembers}
          sub={`de ${stats.totalMembers} miembros`}
        />
        <StatCard
          label="Ingresos del mes"
          value={formatCurrency(stats.monthlyRevenue)}
        />
        <StatCard
          label="Asistencias hoy"
          value={stats.attendanceToday}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatCard
          label="Gastos del mes"
          value={formatCurrency(stats.monthlyExpenses)}
        />
        <StatCard
          label="Ganancia neta"
          value={formatCurrency(stats.monthlyProfit)}
        />
        <StatCard
          label="WODs este mes"
          value={stats.wodsThisMonth}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-white">Últimas asistencias</h3>
          </CardHeader>
          <CardContent className="p-0">
            {stats.recentAttendance.length === 0 ? (
              <p className="px-6 py-4 text-sm text-slate-500">
                Sin registros hoy
              </p>
            ) : (
              <ul className="divide-y divide-slate-800">
                {stats.recentAttendance.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <span className="text-sm text-white">
                      {a.member.user.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(a.checkinTime).toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold text-white">Últimos pagos</h3>
          </CardHeader>
          <CardContent className="p-0">
            {stats.recentPayments.length === 0 ? (
              <p className="px-6 py-4 text-sm text-slate-500">
                Sin pagos recientes
              </p>
            ) : (
              <ul className="divide-y divide-slate-800">
                {stats.recentPayments.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <div>
                      <p className="text-sm text-white">
                        {p.member.user.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {p.membership.name}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-green-400">
                      {formatCurrency(p.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
