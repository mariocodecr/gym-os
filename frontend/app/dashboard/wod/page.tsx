import type { Metadata } from "next";
import Link from "next/link";
import { getWods } from "@/services/wod";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { WodType } from "@/types";

export const metadata: Metadata = { title: "WOD" };

const TYPE_COLOR: Record<WodType, "blue" | "purple"> = {
  general: "blue",
  programming: "purple",
};

const TYPE_LABEL: Record<WodType, string> = {
  general: "General",
  programming: "Programación",
};

export default async function WodPage() {
  const wods = await getWods();

  return (
    <div>
      <PageHeader title="WOD" />

      <Card>
        {wods.length === 0 ? (
          <EmptyState message="No hay WODs publicados" />
        ) : (
          <div className="divide-y divide-slate-800">
            {wods.map((wod) => (
              <Link
                key={wod.id}
                href={`/dashboard/wod/${wod.id}`}
                className="flex items-start justify-between p-6 hover:bg-slate-800/50"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{wod.title}</span>
                    <Badge color={TYPE_COLOR[wod.type]}>
                      {TYPE_LABEL[wod.type]}
                    </Badge>
                  </div>
                  <p className="line-clamp-2 text-sm text-slate-400">
                    {wod.description}
                  </p>
                </div>
                <div className="ml-4 flex shrink-0 flex-col items-end gap-1">
                  <span className="text-sm text-slate-400">
                    {new Date(wod.date).toLocaleDateString("es-AR")}
                  </span>
                  <span className="text-xs text-slate-500">
                    {wod._count.results} resultados
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
