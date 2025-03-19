import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import XeLLCustomizer from "@/components/xell-customizer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>,
);
