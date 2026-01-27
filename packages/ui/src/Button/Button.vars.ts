import type { ButtonColor, ButtonVariant } from './Button.types';

/**
 * Variant colors resolver result - matches Mantine's pattern
 */
export interface VariantColorResolverResult {
  background: string;
  hover: string;
  color: string;
  border: string;
  hoverColor?: string;
  borderHover?: string;
}

export interface VariantColorsResolverInput {
  variant: ButtonVariant;
  color: ButtonColor;
}

/**
 * Default variant colors resolver - follows Mantine's defaultVariantColorsResolver pattern.
 * Returns semantic color properties instead of CSS variable names.
 */
export function defaultVariantColorsResolver({
  variant,
  color,
}: VariantColorsResolverInput): VariantColorResolverResult {
  // Get color-specific CSS variables
  const colorFilled = `var(--vpb-color-${color}-filled)`;
  const colorFilledHover = `var(--vpb-color-${color}-filled-hover)`;
  const colorLight = `var(--vpb-color-${color}-light)`;
  const colorLightHover = `var(--vpb-color-${color}-light-hover)`;
  const colorLightColor = `var(--vpb-color-${color}-light-color)`;
  const colorOutline = `var(--vpb-color-${color}-outline)`;
  const colorOutlineHover = `var(--vpb-color-${color}-outline-hover)`;
  const colorText = `var(--vpb-color-${color}-text)`;

  if (variant === 'filled') {
    return {
      background: colorFilled,
      hover: colorFilledHover,
      color: 'var(--vpb-primary-color-contrast)',
      border: 'transparent',
      hoverColor: 'var(--vpb-primary-color-contrast)',
    };
  }

  if (variant === 'light') {
    return {
      background: colorLight,
      hover: colorLightHover,
      color: colorLightColor,
      border: 'transparent',
      hoverColor: colorLightColor,
    };
  }

  if (variant === 'outline') {
    // Use step-11 (colorText) for text - much better contrast than step-9 (colorFilled)
    // This follows Radix design where step-11 is for high-contrast text
    return {
      background: 'transparent',
      hover: colorLight,
      color: colorText,
      border: colorOutline,
      hoverColor: colorLightColor,
      borderHover: colorOutlineHover,
    };
  }

  if (variant === 'transparent') {
    // Use step-11 (colorText) for text - better contrast
    return {
      background: 'transparent',
      hover: colorLight,
      color: colorText,
      border: 'transparent',
      hoverColor: colorLightColor,
    };
  }

  if (variant === 'subtle') {
    return {
      background: 'transparent',
      hover: colorLight,
      color: colorText,
      border: 'transparent',
      hoverColor: colorLightColor,
    };
  }

  if (variant === 'default') {
    return {
      background: 'var(--vpb-color-default)',
      hover: 'var(--vpb-color-default-hover)',
      color: 'var(--vpb-color-default-color)',
      border: 'var(--vpb-color-default-border)',
      hoverColor: 'var(--vpb-color-default-color)',
    };
  }

  // Fallback
  return {
    background: 'transparent',
    hover: 'transparent',
    color: 'inherit',
    border: 'transparent',
  };
}
