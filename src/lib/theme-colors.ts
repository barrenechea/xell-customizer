/**
 * Colors used in LibXenon, in RGB format
 */
export const CONSOLE_COLORS = {
  CONSOLE_COLOR_RED: "FF0000",
  CONSOLE_COLOR_BLUE: "4E44D8",
  CONSOLE_COLOR_GREEN: "008000",
  CONSOLE_COLOR_BLACK: "000000",
  CONSOLE_COLOR_WHITE: "FFFFFF",
  CONSOLE_COLOR_GREY: "C0C0C0",
  CONSOLE_COLOR_BROWN: "993300",
  CONSOLE_COLOR_PURPLE: "9900FF",
  CONSOLE_COLOR_YELLOW: "FFFF00",
  CONSOLE_COLOR_ORANGE: "FF6600",
  CONSOLE_COLOR_PINK: "FF66FF",
} as const;

export type ConsoleColorName = keyof typeof CONSOLE_COLORS;

/**
 * Predefined theme presets for XeLL
 */
export const THEME_PRESETS = [
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
] as const;

export type ThemePreset = (typeof THEME_PRESETS)[number];

/**
 * Convert RGB format to LibXenon BGR format
 */
export const rgbToLibXenon = (rgbHex: string): string => {
  const r = rgbHex.substring(0, 2);
  const g = rgbHex.substring(2, 4);
  const b = rgbHex.substring(4, 6);
  return `0x${b}${g}${r}00`;
};

/**
 * Check if a color is dark (to determine icon and border color)
 * @returns true if the color is dark, false if it's light
 */
export const isColorDark = (hexColor: string): boolean => {
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);
  // Formula to determine perceived brightness
  return r * 0.299 + g * 0.587 + b * 0.114 < 128;
};

/**
 * Default theme preset
 */
export const defaultTheme = THEME_PRESETS[0];
