"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/app/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // Layout & Dasar: Menggunakan rounded yang sedikit lebih lembut
        "peer size-5 shrink-0 rounded-md border border-border bg-background shadow-sm transition-all outline-none",
        // States: Focus & Active (Efek kenyal khas Apple)
        "focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:border-primary active:scale-95",
        // Checked State: Warna primer yang solid dengan border yang sesuai
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
        // Disabled & Invalid States
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/10",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-all data-[state=checked]:animate-in data-[state=checked]:zoom-in-75"
      >
        <CheckIcon className="size-3.5 stroke-[3px]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };