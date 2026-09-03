import type { ReactNode } from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function LabeledSeparator({
  children,
  className,
  orientation = "horizontal",
}: {
  children: ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center",
        orientation === "vertical" && "h-full w-auto flex-col",
        className,
      )}
    >
      <Separator
        orientation={orientation}
        className={
          orientation === "horizontal" ? "flex-1" : "h-full w-px flex-none"
        }
      />
      <div
        className={cn(
          "text-muted-foreground px-2 text-sm",
          orientation === "vertical" && "px-0 py-2",
        )}
      >
        {children}
      </div>
      <Separator
        orientation={orientation}
        className={
          orientation === "horizontal" ? "flex-1" : "h-full w-px flex-none"
        }
      />
    </div>
  );
}

export { LabeledSeparator };
