import { Brush, Download, Layout, Monitor, Terminal } from "lucide-react";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { ColorPicker } from "@/components/color-picker";
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
import ContributorsScroller from "@/components/xell-contributors";
import { asciiPresets, defaultASCII } from "@/lib/ascii-presets";
import {
  defaultTheme,
  rgbToLibXenon,
  THEME_PRESETS,
  type ThemePreset,
} from "@/lib/theme-colors";

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

const XeLLCustomizer = () => {
  const { t } = useTranslation();

  const [backgroundColor, setBackgroundColor] = useState<string>(
    defaultTheme.backgroundColor,
  );
  const [foregroundColor, setForegroundColor] = useState<string>(
    defaultTheme.foregroundColor,
  );
  const [asciiArt, setAsciiArt] = useState(defaultASCII);
  const [isGenerationDialogOpen, setIsGenerationDialogOpen] = useState(false);

  const consoleText = `${outputHeader}${asciiArt}${outputFooter}`;

  const applyThemePreset = (preset: ThemePreset) => {
    setBackgroundColor(preset.backgroundColor);
    setForegroundColor(preset.foregroundColor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900">
      <a
        className="github-fork-ribbon hidden md:block"
        href="https://github.com/barrenechea/xell-customizer"
        data-ribbon={t("github.ribbon")}
        title={t("github.ribbon")}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("github.ribbon")}
      </a>
      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
            <Terminal className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            {t("app.title")}
          </h1>
          <p className="mx-auto max-w-xl text-slate-600 dark:text-slate-400">
            {t("app.subtitle")}
          </p>

          {/* Contributors scroller */}
          <ContributorsScroller />
        </div>

        {/* Preview Panel - Full width */}
        <Card className="mb-6 overflow-hidden shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-purple-500" />
              {t("preview.title")}
            </CardTitle>
            <CardDescription>{t("preview.description")}</CardDescription>
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
              {t("settings.title")}
            </CardTitle>
            <CardDescription>{t("settings.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="presets" className="w-full">
              <TabsList className="mb-4 grid w-full grid-cols-4">
                <TabsTrigger value="presets">{t("tabs.presets")}</TabsTrigger>
                <TabsTrigger value="background">
                  {t("tabs.background")}
                </TabsTrigger>
                <TabsTrigger value="foreground">{t("tabs.text")}</TabsTrigger>
                <TabsTrigger value="ascii">{t("tabs.ascii")}</TabsTrigger>
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
                        <span className="font-semibold">
                          {t(`themeColors.${preset.id}.name`)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div
                            className="h-6 w-6 rounded-full border border-slate-300 shadow-sm"
                            style={{
                              backgroundColor: `#${preset.backgroundColor}`,
                            }}
                          ></div>
                          <div
                            className="h-6 w-6 rounded-full border border-slate-300 shadow-sm"
                            style={{
                              backgroundColor: `#${preset.foregroundColor}`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <p className="mt-1 text-left text-xs text-wrap text-slate-500 dark:text-slate-400">
                        {t(`themeColors.${preset.id}.description`)}
                      </p>
                    </Button>
                  ))}
                </div>
              </TabsContent>

              {/* Background Color Tab */}
              <TabsContent value="background">
                <ColorPicker
                  color={backgroundColor}
                  setColor={setBackgroundColor}
                  isBackground
                />
              </TabsContent>

              {/* Foreground Color Tab */}
              <TabsContent value="foreground">
                <ColorPicker
                  color={foregroundColor}
                  setColor={setForegroundColor}
                  isBackground={false}
                />
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
                      {t(`asciiPresets.${preset.id}.name`)}
                    </Button>
                  ))}
                </div>

                <Separator>{t("separator.create_own")}</Separator>

                <Textarea
                  value={asciiArt}
                  onChange={(e) => setAsciiArt(e.target.value)}
                  className="min-h-[200px] resize-none overflow-x-auto font-mono text-xs leading-none whitespace-pre"
                  placeholder={t("ascii.placeholder")}
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
                {t("generate.button")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <div className="flex flex-col space-y-2">
            <Separator>
              <span className="text-slate-500 dark:text-slate-400">
                <Trans i18nKey="footer.created_by">
                  <a
                    href="https://www.barrenechea.cl"
                    className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    barrenechea
                  </a>
                </Trans>
              </span>
            </Separator>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              2025-{new Date().getFullYear()} · {t("footer.title")}
            </p>
          </div>
        </footer>
      </div>
      <GenerationDialog
        key={isGenerationDialogOpen ? "open" : "closed"}
        isOpen={isGenerationDialogOpen}
        onOpenChange={setIsGenerationDialogOpen}
        params={{
          background_color: rgbToLibXenon(backgroundColor),
          foreground_color: rgbToLibXenon(foregroundColor),
          ascii_art: asciiArt !== defaultASCII ? asciiArt : undefined,
        }}
      />
    </div>
  );
};

export default XeLLCustomizer;
