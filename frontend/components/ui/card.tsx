import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-800 bg-slate-900",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className,
}: CardProps) {
  return (
    <div className={cn("border-b border-slate-800 px-6 py-4", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}
