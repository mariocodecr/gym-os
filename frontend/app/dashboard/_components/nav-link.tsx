"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}

export function NavLink({ href, children, exact = false }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-slate-800 font-medium text-white"
          : "text-slate-400 hover:bg-slate-800 hover:text-white",
      )}
    >
      {children}
    </Link>
  );
}
