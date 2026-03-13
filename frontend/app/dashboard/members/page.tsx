import type { Metadata } from "next";
import { getMembers } from "@/services/members";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { MemberLevel } from "@/types";

export const metadata: Metadata = { title: "Miembros" };

const LEVEL_COLOR: Record<MemberLevel, "green" | "yellow" | "blue"> = {
  beginner: "blue",
  intermediate: "yellow",
  advanced: "green",
};

const LEVEL_LABEL: Record<MemberLevel, string> = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <div>
      <PageHeader title="Miembros" />

      <Card>
        {members.length === 0 ? (
          <EmptyState message="No hay miembros registrados" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Email
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Nivel
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Desde
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {member.user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {member.user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {member.phone ?? "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Badge color={LEVEL_COLOR[member.level]}>
                        {LEVEL_LABEL[member.level]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(member.createdAt).toLocaleDateString("es-AR")}
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
