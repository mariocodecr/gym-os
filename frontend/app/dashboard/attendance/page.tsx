import type { Metadata } from "next";
import { getAttendance } from "@/services/attendance";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Asistencia" };

export default async function AttendancePage() {
  const records = await getAttendance();

  const today = new Date().toDateString();
  const todayRecords = records.filter(
    (r) => new Date(r.checkinTime).toDateString() === today,
  );

  return (
    <div>
      <PageHeader title="Asistencia" />

      <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-sm text-slate-400">Check-ins hoy</p>
        <p className="mt-1 text-3xl font-bold text-white">
          {todayRecords.length}
        </p>
      </div>

      <Card>
        {records.length === 0 ? (
          <EmptyState message="No hay registros de asistencia" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Miembro
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Hora
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {record.member.user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(record.checkinDate).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(record.checkinTime).toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
