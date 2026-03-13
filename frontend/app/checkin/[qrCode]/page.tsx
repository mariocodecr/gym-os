"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];

interface CheckinResult {
  member: { user: { name: string } };
}

export default function CheckinPage() {
  const { qrCode } = useParams<{ qrCode: string }>();
  const [status, setStatus] = useState<Status>("loading");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function doCheckin() {
      try {
        const result = await api.post<CheckinResult>(
          `/attendance/checkin/qr/${qrCode}`,
          {},
        );
        setName(result.member.user.name);
        setStatus("success");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al registrar");
        setStatus("error");
      }
    }

    doCheckin();
  }, [qrCode]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h1 className="mb-6 text-2xl font-bold text-white">GymOS</h1>

        {status === "loading" && (
          <p className="text-slate-400">Registrando asistencia...</p>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-950">
              <span className="text-3xl">✓</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">¡Bienvenido!</p>
              <p className="text-slate-400">{name}</p>
            </div>
            <p className="text-sm text-green-400">Asistencia registrada</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-950">
              <span className="text-3xl">✗</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">No se pudo registrar</p>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
