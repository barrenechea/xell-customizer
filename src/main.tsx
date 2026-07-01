import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { I18nProvider } from "@/components/I18nProvider";
import XeLLCustomizer from "@/components/xell-customizer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <XeLLCustomizer />
    </I18nProvider>
  </StrictMode>,
);
