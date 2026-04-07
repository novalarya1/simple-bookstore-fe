"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Layout & Dasar
        "flex h-12 w-full min-w-0 rounded-xl border border-border bg-background px-4 py-2 text-base transition-all duration-200 outline-none md:text-sm",
        // Typography & Placeholder
        "text-foreground placeholder:text-muted-foreground/50 selection:bg-primary/20 selection:text-primary",
        // File Input Styling (Jika type="file")
        "file:border-0 file:bg-transparent file:text-sm file:font-bold file:text-foreground",
        // States: Focus, Hover, & Disabled
        "hover:border-border-strong focus:border-primary focus:ring-4 focus:ring-primary/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Validation States (Aria Invalid)
        "aria-invalid:border-destructive aria-invalid:ring-destructive/10",
        className
      )}
      {...props}
    />
  );
}

export { Input };