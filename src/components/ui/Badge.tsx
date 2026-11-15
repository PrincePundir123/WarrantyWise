import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "supported"
    | "contradicted"
    | "insufficient"
    | "processing"
    | "neutral"
    | "outline";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "neutral",
  children,
  ...props
}) => {
  const variantStyles = {
    supported:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    contradicted:
      "bg-red-50 text-red-700 border-red-200",
    insufficient:
      "bg-amber-50 text-amber-700 border-amber-200",
    processing:
      "bg-blue-50 text-blue-700 border-blue-200 animate-pulse",
    neutral:
      "bg-slate-100 text-slate-700 border-slate-200",
    outline:
      "bg-transparent text-slate-600 border-slate-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

