import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/lib/utils";

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  children?: React.ReactNode;
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  children,
  ...props
}: SeparatorProps) {
  if (!children) {
    return (
      <SeparatorPrimitive.Root
        data-slot="separator-root"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
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
        data-slot="separator-root"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
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
        data-slot="separator-root"
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
          orientation === "horizontal" ? "flex-1" : "h-full w-px flex-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { Separator };
