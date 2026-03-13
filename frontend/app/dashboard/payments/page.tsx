import type { Metadata } from "next";
import { getPayments } from "@/services/payments";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import type { PaymentStatus, PaymentMethod } from "@/types";

export const metadata: Metadata = { title: "Pagos" };

const STATUS_COLOR: Record<PaymentStatus, "green" | "red" | "yellow"> = {
  paid: "green",
  pending: "yellow",
  overdue: "red",
};

const STATUS_LABEL: Record<PaymentStatus, string> = {
  paid: "Pagado",
  pending: "Pendiente",
  overdue: "Vencido",
};

const METHOD_LABEL: Record<PaymentMethod, string> = {
  cash: "Efectivo",
  card: "Tarjeta",
  transfer: "Transferencia",
  mercadopago: "MercadoPago",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <div>
      <PageHeader title="Pagos" />

      <Card>
        {payments.length === 0 ? (
          <EmptyState message="No hay pagos registrados" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Miembro
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Membresía
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Método
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Vencimiento
                  </th>
                  <th className="px-6 py-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-800/50">
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {payment.member.user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {payment.membership.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-400">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {METHOD_LABEL[payment.method]}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(payment.dueDate).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-6 py-4">
                      <Badge color={STATUS_COLOR[payment.status]}>
                        {STATUS_LABEL[payment.status]}
                      </Badge>
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
