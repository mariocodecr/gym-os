import type { Metadata } from "next";
import { getWod, getLeaderboard } from "@/services/wod";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { ResultCategory } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const wod = await getWod(id);
  return { title: wod.title };
}

const CATEGORY_LABEL: Record<ResultCategory, string> = {
  rx: "RX",
  scaled: "Scaled",
  beginner: "Principiante",
};

const CATEGORY_COLOR: Record<ResultCategory, "green" | "yellow" | "blue"> = {
  rx: "green",
  scaled: "yellow",
  beginner: "blue",
};

export default async function WodDetailPage({ params }: Props) {
  const { id } = await params;
  const [wod, leaderboard] = await Promise.all([
    getWod(id),
    getLeaderboard(id),
  ]);

  const categories: ResultCategory[] = ["rx", "scaled", "beginner"];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Badge color={wod.type === "general" ? "blue" : "purple"}>
            {wod.type === "general" ? "General" : "Programación"}
          </Badge>
          <span className="text-sm text-slate-400">
            {new Date(wod.date).toLocaleDateString("es-AR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white">{wod.title}</h2>
        <p className="mt-2 whitespace-pre-line text-slate-300">
          {wod.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {categories.map((cat) => (
          <Card key={cat}>
            <CardHeader>
              <Badge color={CATEGORY_COLOR[cat]}>{CATEGORY_LABEL[cat]}</Badge>
            </CardHeader>
            <CardContent className="p-0">
              {leaderboard[cat].length === 0 ? (
                <EmptyState message="Sin resultados" />
              ) : (
                <ol className="divide-y divide-slate-800">
                  {leaderboard[cat].map((result, idx) => (
                    <li
                      key={result.id}
                      className="flex items-center justify-between px-6 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 text-sm font-bold text-slate-500">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-white">
                          {result.member.user.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-green-400">
                        {result.score}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
