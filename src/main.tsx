import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import XeLLCustomizer from "@/xell-customizer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider delayDuration={50}>
      <XeLLCustomizer />
    </TooltipProvider>
  </StrictMode>,
);
