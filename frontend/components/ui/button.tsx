"use client";

import { cn } from "@/lib/cn";

const VARIANT = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DANGER: "danger",
  GHOST: "ghost",
} as const;

type Variant = (typeof VARIANT)[keyof typeof VARIANT];

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled ?? loading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" &&
          "border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        variant === "ghost" && "text-slate-400 hover:bg-slate-800 hover:text-white",
        className,
      )}
      {...props}
    >
      {loading ? "Cargando..." : children}
    </button>
  );
}
