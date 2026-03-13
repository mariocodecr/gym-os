import { cn } from "@/lib/cn";

const COLOR = {
  GREEN: "green",
  RED: "red",
  YELLOW: "yellow",
  BLUE: "blue",
  SLATE: "slate",
  PURPLE: "purple",
} as const;

type Color = (typeof COLOR)[keyof typeof COLOR];

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
}

export function Badge({ children, color = "slate" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        color === "green" && "bg-green-950 text-green-400",
        color === "red" && "bg-red-950 text-red-400",
        color === "yellow" && "bg-yellow-950 text-yellow-400",
        color === "blue" && "bg-blue-950 text-blue-400",
        color === "slate" && "bg-slate-800 text-slate-300",
        color === "purple" && "bg-purple-950 text-purple-400",
      )}
    >
      {children}
    </span>
  );
}
