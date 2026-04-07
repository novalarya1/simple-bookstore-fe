"use client";

import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

import { cn } from "@/app/lib/utils";

/**
 * AspectRatio digunakan untuk membungkus konten (seperti gambar) 
 * agar tetap menjaga rasio tertentu (misal 16/9, 4/3, atau 2/3 untuk cover buku).
 */
function AspectRatio({
  className,
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return (
    <AspectRatioPrimitive.Root 
      data-slot="aspect-ratio" 
      className={cn("overflow-hidden rounded-xl", className)} 
      {...props} 
    />
  );
}

export { AspectRatio };