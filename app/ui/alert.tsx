"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/app/lib/utils";

const alertVariants = cva(
  // Layout Grid: Otomatis menyesuaikan jika ada icon (svg)
  "relative w-full rounded-2xl border px-5 py-4 text-sm grid has-[>svg]:grid-cols-[20px_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-4 gap-y-1 items-start transition-all",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border shadow-sm",
        destructive:
          "bg-destructive/5 border-destructive/20 text-destructive [&>svg]:text-destructive *:data-[slot=alert-description]:text-destructive/80",
        info: 
          "bg-primary/5 border-primary/20 text-primary [&>svg]:text-primary *:data-[slot=alert-description]:text-primary/80",
        success:
          "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400 *:data-[slot=alert-description]:text-emerald-600/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 font-bold tracking-tight text-base",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm leading-relaxed opacity-90",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };