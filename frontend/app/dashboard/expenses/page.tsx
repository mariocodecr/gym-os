import type { Metadata } from "next";
import { getExpenses } from "@/services/expenses";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { ExpenseCategory } from "@/types";

export const metadata: Metadata = { title: "Gastos" };

const CATEGORY_LABEL: Record<ExpenseCategory, string> = {
  rent: "Alquiler",
  utilities: "Servicios",
  equipment: "Equipamiento",
  salaries: "Sueldos",
  marketing: "Marketing",
  maintenance: "Mantenimiento",
  other: "Otro",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <PageHeader title="Gastos" />

      {expenses.length > 0 && (
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-sm text-slate-400">Total registrado</p>
          <p className="mt-1 text-2xl font-bold text-red-400">
            {formatCurrency(total)}
          </p>
        </div>
      )}

      <Card>
        {expenses.length === 0 ? (
          <EmptyState message="No hay gastos registrados" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Descripción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <Badge color="slate">
                        {CATEGORY_LABEL[expense.category]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-red-400">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(expense.date).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {expense.description ?? "—"}
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
