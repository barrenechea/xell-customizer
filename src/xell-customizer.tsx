import {
  Brush,
  Check,
  Download,
  Layout,
  Monitor,
  Palette,
  Pipette,
  Terminal,
} from "lucide-react";
import { ChangeEvent, useState } from "react";

import { GenerationDialog } from "@/components/generation-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ContributorsScroller from "@/components/xell-contributors";
import { asciiPresets, defaultASCII } from "@/lib/ascii-presets";
import { cn } from "@/lib/utils";

const today = new Date().toISOString().split("T")[0];
const gitData = "v0.993-git-7526b02";

const outputHeader = `
 * Xenos FB with 148x41 (1280x720) at 0x9e000000 initialized.

XeLL - Xenon linux loader second stage ${gitData} ${today} (LibXenon.org)

Built with GCC 13.3.0 and Binutils 2.44
`;

const outputFooter = `
             Free60.org XeLL - Xenon Linux Loader ${gitData}
    Special Corona & Winchester Compatible XeLL version

 * nand init
 * network init
 * initializing lwip 1.4.1...
Reinit PHY...
Waiting for link...link still down.
 * requesting dhcp.....................
`;

/** Check if a color is dark (to determine icon and border color) */
const isColorDark = (hexColor: string) => {
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 < 128;
};

/** Predefined console colors from LibXenon in BGR format */
const CONSOLE_COLORS = {
  CONSOLE_COLOR_RED: "0000FF",
  CONSOLE_COLOR_BLUE: "D8444E",
  CONSOLE_COLOR_GREEN: "008000",
  CONSOLE_COLOR_BLACK: "000000",
  CONSOLE_COLOR_WHITE: "FFFFFF",
  CONSOLE_COLOR_GREY: "C0C0C0",
  CONSOLE_COLOR_BROWN: "003399",
  CONSOLE_COLOR_PURPLE: "FF0099",
  CONSOLE_COLOR_YELLOW: "00FFFF",
  CONSOLE_COLOR_ORANGE: "0066FF",
  CONSOLE_COLOR_PINK: "FF66FF",
};

/** Convert BGR to RGB format */
const bgrToRgb = (bgrHex: string) => {
  const b = bgrHex.substring(0, 2);
  const g = bgrHex.substring(2, 4);
  const r = bgrHex.substring(4, 6);
  return r + g + b;
};

/** Convert RGB to BGR format */
const rgbToBgr = (rgbHex: string) => {
  const r = rgbHex.substring(0, 2);
  const g = rgbHex.substring(2, 4);
  const b = rgbHex.substring(4, 6);
  return b + g + r;
};

const THEME_PRESETS = [
  {
    id: "default",
    name: "Default Theme",
    description: "Classic XeLL blue background with white text",
    backgroundColor: CONSOLE_COLORS.CONSOLE_COLOR_BLUE,
    foregroundColor: CONSOLE_COLORS.CONSOLE_COLOR_WHITE,
  },
  {
    id: "swizzy",
    name: "Swizzy Theme",
    description: "Black background with orange text - Swizzy's favorite!",
    backgroundColor: CONSOLE_COLORS.CONSOLE_COLOR_BLACK,
    foregroundColor: CONSOLE_COLORS.CONSOLE_COLOR_ORANGE,
  },
  {
    id: "xtudo",
    name: "XTUDO Theme",
    description: "Black background with pink text - Niceshot's favorite!",
    backgroundColor: CONSOLE_COLORS.CONSOLE_COLOR_BLACK,
    foregroundColor: CONSOLE_COLORS.CONSOLE_COLOR_PINK,
  },
  {
    id: "classic",
    name: "Retro Theme",
    description:
      "Reminiscent of vintage green phosphor CRT terminals from the early computing era",
    backgroundColor: CONSOLE_COLORS.CONSOLE_COLOR_BLACK,
    foregroundColor: CONSOLE_COLORS.CONSOLE_COLOR_GREEN,
  },
];

const XeLLCustomizer = () => {
  const [backgroundColor, setBackgroundColor] = useState("4E44D8");
  const [foregroundColor, setForegroundColor] = useState("FFFFFF");
  const [asciiArt, setAsciiArt] = useState(defaultASCII);
  const [isGenerationDialogOpen, setIsGenerationDialogOpen] = useState(false);

  const consoleText = `${outputHeader}${asciiArt}${outputFooter}`;

  /** Apply preset color */
  const handlePresetColor = (
    colorName: keyof typeof CONSOLE_COLORS,
    isBackground: boolean,
  ) => {
    const hexValue = CONSOLE_COLORS[colorName];
    const rgbHex = bgrToRgb(hexValue);

    if (isBackground) {
      setBackgroundColor(rgbHex);
    } else {
      setForegroundColor(rgbHex);
    }
  };

  /** Handle color wheel change */
  const handleColorWheelChange = (
    e: ChangeEvent<HTMLInputElement>,
    isBackground: boolean,
  ) => {
    // Remove the # from the hex color
    const hexColor = e.target.value.substring(1);

    if (isBackground) {
      setBackgroundColor(hexColor);
    } else {
      setForegroundColor(hexColor);
    }
  };

  /** Apply a theme preset */
  const applyThemePreset = (preset: (typeof THEME_PRESETS)[0]) => {
    setBackgroundColor(bgrToRgb(preset.backgroundColor));
    setForegroundColor(bgrToRgb(preset.foregroundColor));
  };

  /** Generate color button classes based on the color value */
  const getButtonTextClass = (bgrColor: string) => {
    const rgb = bgrToRgb(bgrColor);
    return isColorDark(rgb) ? "text-slate-50" : "text-slate-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
            <Terminal className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            XeLL Theme Customizer
          </h1>
          <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-400">
            Customize the appearance of your XeLL console with colors and ASCII
            art
          </p>

          {/* Contributors scroller */}
          <ContributorsScroller />
        </div>

        {/* Preview Panel - Full width */}
        <Card className="mb-6 overflow-hidden shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-purple-500" />
              Console Preview
            </CardTitle>
            <CardDescription>Live preview of your XeLL console</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {/* Monitor Display */}
            <div className="relative">
              <div className="px-6">
                {/* Monitor Frame */}
                <div className="rounded-lg border-8 border-slate-800 shadow-lg">
                  {/* Screen Content with 16:9 aspect ratio */}
                  <div className="relative aspect-video w-full overflow-hidden">
                    {/* Console Display */}
                    <div
                      className="inset-shadow-lg absolute inset-0 overflow-auto px-8 py-2 font-mono text-sm leading-none whitespace-pre"
                      style={{
                        backgroundColor: `#${backgroundColor}`,
                        color: `#${foregroundColor}`,
                      }}
                    >
                      {consoleText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Panel - Full width */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Layout className="h-5 w-5 text-purple-500" />
              Settings
            </CardTitle>
            <CardDescription>Customize your console appearance</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="presets" className="w-full">
              <TabsList className="mb-4 grid w-full grid-cols-4">
                <TabsTrigger value="presets">Presets</TabsTrigger>
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="foreground">Text</TabsTrigger>
                <TabsTrigger value="ascii">ASCII Art</TabsTrigger>
              </TabsList>

              {/* Presets Tab */}
              <TabsContent value="presets" className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {THEME_PRESETS.map((preset) => (
                    <Button
                      key={preset.id}
                      onClick={() => applyThemePreset(preset)}
                      className="group h-auto cursor-pointer flex-col items-start p-4 transition-all hover:shadow-md"
                      variant="outline"
                    >
                      <div className="flex w-full items-center justify-between">
                        <span className="font-semibold">{preset.name}</span>
                        <div className="flex items-center space-x-2">
                          <div
                            className="h-6 w-6 rounded-full border border-slate-300 shadow-sm"
                            style={{
                              backgroundColor: `#${bgrToRgb(preset.backgroundColor)}`,
                            }}
                          ></div>
                          <div
                            className="h-6 w-6 rounded-full border border-slate-300 shadow-sm"
                            style={{
                              backgroundColor: `#${bgrToRgb(preset.foregroundColor)}`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <p className="mt-1 text-left text-xs text-wrap text-slate-500 dark:text-slate-400">
                        {preset.description}
                      </p>
                    </Button>
                  ))}
                </div>
              </TabsContent>

              {/* Background Color Tab */}
              <TabsContent value="background" className="space-y-6">
                <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                  {Object.entries(CONSOLE_COLORS).map(([name, value]) => (
                    <Tooltip key={name}>
                      <TooltipTrigger asChild>
                        <Button
                          className={cn(
                            "h-10 w-full cursor-pointer justify-start border transition-all hover:scale-105 hover:shadow-md",
                            getButtonTextClass(value),
                          )}
                          style={{ backgroundColor: `#${bgrToRgb(value)}` }}
                          onClick={() =>
                            handlePresetColor(
                              name as keyof typeof CONSOLE_COLORS,
                              true,
                            )
                          }
                        >
                          <span className="truncate text-xs">
                            {name.replace("CONSOLE_COLOR_", "")}
                          </span>
                          {backgroundColor === bgrToRgb(value) && (
                            <Check className="ml-1 h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>0x{value}00</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                <Separator>Or choose your own</Separator>

                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div
                      className={cn(
                        "group relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 shadow-sm transition-all hover:scale-105 hover:shadow-md",
                        isColorDark(backgroundColor)
                          ? "border-slate-50"
                          : "border-slate-800",
                      )}
                      style={{ backgroundColor: `#${backgroundColor}` }}
                    >
                      <input
                        type="color"
                        value={`#${backgroundColor}`}
                        onChange={(e) => handleColorWheelChange(e, true)}
                        className="absolute h-full w-full cursor-pointer opacity-0"
                        aria-label="Select background color"
                      />
                      <Pipette
                        className={cn(
                          "h-8 w-8 opacity-80 transition-opacity group-hover:opacity-100",
                          isColorDark(backgroundColor)
                            ? "text-slate-50"
                            : "text-slate-800",
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 dark:bg-slate-800">
                    <Palette className="h-4 w-4 text-blue-500" />
                    <div className="font-mono text-sm">
                      #{backgroundColor} · 0x{rgbToBgr(backgroundColor)}00
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Foreground Color Tab */}
              <TabsContent value="foreground" className="space-y-6">
                <div className="grid grid-cols-4 gap-2 md:grid-cols-6">
                  {Object.entries(CONSOLE_COLORS).map(([name, value]) => (
                    <Tooltip key={name}>
                      <TooltipTrigger asChild>
                        <Button
                          className={cn(
                            "h-10 w-full cursor-pointer justify-start border transition-all hover:scale-105 hover:shadow-md",
                            getButtonTextClass(value),
                          )}
                          style={{ backgroundColor: `#${bgrToRgb(value)}` }}
                          onClick={() =>
                            handlePresetColor(
                              name as keyof typeof CONSOLE_COLORS,
                              false,
                            )
                          }
                        >
                          <span className="truncate text-xs">
                            {name.replace("CONSOLE_COLOR_", "")}
                          </span>
                          {foregroundColor === bgrToRgb(value) && (
                            <Check className="ml-1 h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>0x{value}00</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>

                <Separator>Or choose your own</Separator>

                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div
                      className={cn(
                        "group relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-2 shadow-sm transition-all hover:scale-105 hover:shadow-md",
                        isColorDark(foregroundColor)
                          ? "border-slate-100"
                          : "border-slate-800",
                      )}
                      style={{ backgroundColor: `#${foregroundColor}` }}
                    >
                      <input
                        type="color"
                        value={`#${foregroundColor}`}
                        onChange={(e) => handleColorWheelChange(e, false)}
                        className="absolute h-full w-full cursor-pointer opacity-0"
                        aria-label="Select foreground color"
                      />
                      <Pipette
                        className={cn(
                          "h-8 w-8 transition-opacity group-hover:opacity-100",
                          isColorDark(foregroundColor)
                            ? "text-slate-50 opacity-80"
                            : "text-slate-800 opacity-80",
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 dark:bg-slate-800">
                    <Palette className="h-4 w-4 text-blue-500" />
                    <div className="font-mono text-sm">
                      #{foregroundColor} · 0x{rgbToBgr(foregroundColor)}00
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* ASCII Art Tab */}
              <TabsContent value="ascii" className="space-y-6">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {asciiPresets.map((preset) => (
                    <Button
                      key={preset.id}
                      onClick={() => setAsciiArt(preset.value)}
                      variant="outline"
                      className="flex h-auto cursor-pointer items-center gap-2 py-2 transition-all hover:shadow-md"
                      disabled={asciiArt === preset.value}
                    >
                      <Brush className="h-4 w-4 text-blue-500" />
                      {preset.name}
                    </Button>
                  ))}
                </div>

                <Separator>Or create your own</Separator>

                <Textarea
                  value={asciiArt}
                  onChange={(e) => setAsciiArt(e.target.value)}
                  className="min-h-[200px] resize-none overflow-x-auto font-mono text-xs leading-none whitespace-pre"
                  placeholder="Enter your ASCII art here..."
                />
              </TabsContent>
            </Tabs>
            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => setIsGenerationDialogOpen(true)}
                className="gap-2"
                size="lg"
              >
                <Download className="h-4 w-4" />
                Generate Custom XeLL Build
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="flex flex-col space-y-2">
            <Separator>
              <span className="text-slate-500 dark:text-slate-400">
                Created by{" "}
                <a
                  href="https://github.com/barrenechea"
                  className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
                >
                  barrenechea
                </a>
              </span>
            </Separator>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {new Date().getFullYear()} · XeLL Theme Customizer
            </p>
          </div>
        </footer>
      </div>
      <GenerationDialog
        isOpen={isGenerationDialogOpen}
        onOpenChange={setIsGenerationDialogOpen}
        params={{
          background_color: `0x${rgbToBgr(backgroundColor)}00`,
          foreground_color: `0x${rgbToBgr(foregroundColor)}00`,
          ascii_art: asciiArt !== defaultASCII ? asciiArt : undefined,
        }}
      />
    </div>
  );
};

export default XeLLCustomizer;
