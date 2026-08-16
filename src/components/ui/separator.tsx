"use client";

import { Separator as SeparatorPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  children,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  if (!children) {
    return (
      <SeparatorPrimitive.Root
        data-slot="separator"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex w-full items-center",
        orientation === "vertical" && "h-full w-auto flex-col",
      )}
    >
      <SeparatorPrimitive.Root
        data-slot="separator"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
          orientation === "horizontal" ? "flex-1" : "h-full w-px flex-none",
          className,
        )}
        {...props}
      />
      <div
        className={cn(
          "text-muted-foreground px-2 text-sm",
          orientation === "vertical" && "px-0 py-2",
        )}
      >
        {children}
      </div>
      <SeparatorPrimitive.Root
        data-slot="separator"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
          orientation === "horizontal" ? "flex-1" : "h-full w-px flex-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Separator };
