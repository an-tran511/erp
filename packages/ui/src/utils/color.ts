/**
 * Color utility functions for calculating luminance and contrast.
 * These functions are generic and can be used by any component.
 */

/**
 * Gamma correction for sRGB color space
 */
function gammaCorrect(c: number): number {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/**
 * Converts hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculates relative luminance of a color (WCAG 2.1)
 * Returns a value between 0 (black) and 1 (white)
 *
 * @param color - Hex color string (e.g., "#ff0000") or CSS variable
 * @returns Luminance value between 0 and 1, or null if color cannot be parsed
 */
function parseRgbFunction(value: string): { r: number; g: number; b: number } | null {
  const match = value.match(/rgba?\((.+)\)/i);
  if (!match) return null;

  const parts = match[1].match(/[\d.]+%?/g);
  if (!parts || parts.length < 3) return null;

  const toChannel = (v: string) =>
    v.endsWith('%') ? Math.round((parseFloat(v) / 100) * 255) : Math.round(parseFloat(v));

  return {
    r: toChannel(parts[0]),
    g: toChannel(parts[1]),
    b: toChannel(parts[2]),
  };
}

function parseColorToRgb(color: string): { r: number; g: number; b: number } | null {
  const normalized = color.trim().toLowerCase();
  if (normalized === 'transparent') return null;

  if (normalized.startsWith('rgb')) {
    return parseRgbFunction(normalized);
  }

  if (normalized.startsWith('#')) {
    if (normalized.length === 4) {
      const r = normalized[1];
      const g = normalized[2];
      const b = normalized[3];
      return hexToRgb(`#${r}${r}${g}${g}${b}${b}`);
    }
    return hexToRgb(normalized);
  }

  return null;
}

function resolveCssVar(
  color: string,
  element: HTMLElement | undefined,
  depth = 0
): string | null {
  // Increase depth limit to handle deeply nested Radix variables
  // e.g., --vpb-color-amber-filled -> --vpb-color-amber-9 -> --amber-9 -> actual color
  if (!element || depth > 5) return null;
  const varName = color.match(/var\((--[^),]+)/)?.[1];
  if (!varName) return null;

  const value = getComputedStyle(element).getPropertyValue(varName).trim();
  if (!value) return null;
  if (value.startsWith('var(')) {
    return resolveCssVar(value, element, depth + 1);
  }
  return value;
}

/**
 * List of colors that are inherently bright and always need dark text.
 * These colors have high luminance at step-9 in both light and dark Radix themes.
 */
const BRIGHT_COLORS = ['amber', 'yellow', 'lime', 'mint', 'sky'];

/**
 * Extracts color name from a CSS variable like var(--vpb-color-amber-filled)
 */
function extractColorName(cssVar: string): string | null {
  const match = cssVar.match(/--vpb-color-(\w+)-/);
  return match ? match[1] : null;
}

/**
 * Checks if a CSS variable represents a known bright color that needs dark text.
 */
function isBrightColorVar(cssVar: string): boolean {
  const colorName = extractColorName(cssVar);
  return colorName ? BRIGHT_COLORS.includes(colorName) : false;
}

function relativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const sR = rgb.r / 255;
  const sG = rgb.g / 255;
  const sB = rgb.b / 255;

  const rLinear = gammaCorrect(sR);
  const gLinear = gammaCorrect(sG);
  const bLinear = gammaCorrect(sB);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

export function luminance(color: string, element?: HTMLElement): number | null {
  const resolved =
    color.startsWith('var(') && element ? resolveCssVar(color, element) : color;
  if (!resolved) return null;

  const rgb = parseColorToRgb(resolved);
  if (!rgb) return null;

  return relativeLuminance(rgb);
}

/**
 * Determines if a color is light (needs dark text) based on luminance.
 * Similar to Mantine's autoContrast feature (see getContrastColor).
 *
 * For CSS variables, we use a lookup table based on Radix Colors design:
 * - Radix step-9 colors are designed for solid backgrounds
 * - For most colors (indigo, blue, red, etc.), step-9 is dark → needs white text
 * - For bright colors (amber, yellow, lime, mint, sky), step-9 is light → needs dark text
 *
 * IMPORTANT: Amber, yellow, lime, mint, sky ALWAYS need dark text in BOTH light and dark modes.
 * This is by design in Radix Colors - the step-9 for these colors remains bright/vibrant
 * even in dark mode to maintain their characteristic appearance.
 *
 * Note: In Radix Colors, the scale flips between light/dark modes:
 * - Light mode: step-12 is darkest (high-contrast text for light backgrounds)
 * - Dark mode: step-12 is lightest (high-contrast text for dark backgrounds)
 * 
 * Therefore, we use a constant black (#000000) for contrast text on bright colors
 * in dark mode, rather than the color's step-12 which would be light.
 *
 * @param color - Color string (hex or CSS variable)
 * @param threshold - Luminance threshold (default 0.179, Mantine's default)
 * @returns true if color is light and needs dark text
 */
export function isLightColor(color: string, threshold = 0.179): boolean {
  if (color.startsWith('var(')) {
    // For CSS variables, use lookup table based on Radix Colors step-9 luminance.
    // These colors have bright/light step-9 values in BOTH light and dark modes,
    // so they always need dark text for proper contrast (WCAG compliance).
    const colorName = color.match(/--vpb-color-(\w+)-/)?.[1];
    const colorsAlwaysNeedingDarkText = ['amber', 'yellow', 'lime', 'mint', 'sky'];
    return colorName ? colorsAlwaysNeedingDarkText.includes(colorName) : false;
  }

  // For hex colors, calculate actual luminance
  const lum = luminance(color);
  return lum !== null && lum > threshold;
}

export interface ContrastColorOptions {
  background: string;
  colorScheme?: 'light' | 'dark';
  luminanceThreshold?: number;
  darkText?: string;
  lightText?: string;
  element?: HTMLElement;
  semanticPairs?: Record<string, string>;
}

/**
 * Resolves contrast-safe foreground color at runtime using WCAG luminance.
 * - If semanticPairs are provided, they take precedence for curated palettes.
 * - If background is a CSS variable, pass element to resolve computed styles.
 * - Falls back to known bright color detection for CSS variables when luminance can't be calculated.
 */
export function resolveContrastColor({
  background,
  colorScheme,
  luminanceThreshold = 0.3,
  darkText = '#000000',
  lightText = '#ffffff',
  element,
  semanticPairs,
}: ContrastColorOptions): string {
  // 1. Check semantic pairs first (curated color mappings)
  if (semanticPairs && semanticPairs[background]) {
    return semanticPairs[background];
  }

  // 2. Try to calculate actual luminance
  const lum = luminance(background, element);
  
  if (lum !== null) {
    // We got a valid luminance - use threshold comparison
    return lum > luminanceThreshold ? darkText : lightText;
  }

  // 3. Fallback: For CSS variables we couldn't resolve, check if it's a known bright color
  if (background.startsWith('var(') && isBrightColorVar(background)) {
    // Bright colors (amber, yellow, lime, mint, sky) always need dark text
    return darkText;
  }

  // 4. Last resort: default to white text
  // Most filled buttons have dark backgrounds (step-9), so white text is the safer default
  return lightText;
}
