import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import XeLLCustomizer from "@/xell-customizer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider delayDuration={50}>
      <a
        className="github-fork-ribbon hidden md:block"
        href="https://github.com/barrenechea/xell-customizer"
        data-ribbon="Contribute on GitHub"
        title="Contribute on GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contribute on GitHub
      </a>
      <XeLLCustomizer />
    </TooltipProvider>
  </StrictMode>,
);
