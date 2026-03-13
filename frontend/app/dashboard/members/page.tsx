import type { Metadata } from "next";

export const metadata: Metadata = { title: "Miembros" };

export default function MembersPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Miembros</h2>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
          + Nuevo miembro
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 px-6 py-4">
          <input
            placeholder="Buscar miembro..."
            className="w-full max-w-xs rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-500">
            Conectá el backend para ver los miembros.
          </p>
        </div>
      </div>
    </div>
  );
}
