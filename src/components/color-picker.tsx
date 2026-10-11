import { Check, Palette, Pipette } from "lucide-react";
import { type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

import { LabeledSeparator } from "@/components/labeled-separator";
import { Button } from "@/components/ui/button";
import {
  CONSOLE_COLORS,
  type ConsoleColorName,
  isColorDark,
  rgbToLibXenon,
} from "@/lib/theme-colors";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  setColor: (color: string) => void;
  isBackground: boolean;
}

export function ColorPicker({
  color,
  setColor,
  isBackground,
}: ColorPickerProps) {
  const { t } = useTranslation();

  const handlePresetColor = (colorName: ConsoleColorName) => {
    setColor(CONSOLE_COLORS[colorName]);
  };

  const handleColorWheelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value.substring(1));
  };

  const getButtonTextClass = (c: string) =>
    isColorDark(c) ? "text-slate-50" : "text-slate-800";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
        {Object.entries(CONSOLE_COLORS).map(([name, value]) => (
          <Button
            key={name}
            className={cn(
              "h-10 w-full cursor-pointer justify-start border transition-all hover:scale-105 hover:shadow-md",
              getButtonTextClass(value),
            )}
            style={{ backgroundColor: `#${value}` }}
            onClick={() => handlePresetColor(name as ConsoleColorName)}
          >
            <span className="truncate text-xs uppercase">
              {t(
                ($) =>
                  $.colors[
                    name.replace("CONSOLE_COLOR_", "").toLowerCase() as
                      | "red"
                      | "blue"
                      | "green"
                      | "black"
                      | "white"
                      | "grey"
                      | "brown"
                      | "purple"
                      | "yellow"
                      | "orange"
                      | "pink"
                  ],
              )}
            </span>
            {color === value && <Check className="ml-1 h-4 w-4" />}
          </Button>
        ))}
      </div>

      <LabeledSeparator>{t(($) => $.separator.choose_own)}</LabeledSeparator>

      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div
            className={cn(
              "group relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 shadow-sm transition-all hover:scale-105 hover:shadow-md",
              isColorDark(color) ? "border-slate-50" : "border-slate-800",
            )}
            style={{ backgroundColor: `#${color}` }}
          >
            <input
              type="color"
              value={`#${color}`}
              onChange={handleColorWheelChange}
              className="absolute h-full w-full cursor-pointer opacity-0"
              aria-label={t(($) =>
                isBackground ? $.aria.bg_color : $.aria.fg_color,
              )}
            />
            <Pipette
              className={cn(
                "h-8 w-8 opacity-80 transition-opacity group-hover:opacity-100",
                isColorDark(color) ? "text-slate-50" : "text-slate-800",
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 dark:bg-slate-800">
          <Palette className="h-4 w-4 text-blue-500" />
          <div className="font-mono text-sm">
            #{color} · {rgbToLibXenon(color)}
          </div>
        </div>
      </div>
    </div>
  );
}
