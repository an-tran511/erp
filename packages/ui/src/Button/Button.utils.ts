import type { ButtonSize, ButtonRadius } from './Button.types';

/**
 * Size configuration mapping
 */
const SIZE_CONFIG: Record<
  ButtonSize,
  { height: string; paddingX: string; fontSize: string }
> = {
  xs: {
    height: 'var(--button-height-xs)',
    paddingX: 'var(--button-padding-x-xs)',
    fontSize: 'var(--vpb-font-size-xs)',
  },
  sm: {
    height: 'var(--button-height-sm)',
    paddingX: 'var(--button-padding-x-sm)',
    fontSize: 'var(--vpb-font-size-sm)',
  },
  md: {
    height: 'var(--button-height-md)',
    paddingX: 'var(--button-padding-x-md)',
    fontSize: 'var(--vpb-font-size-md)',
  },
  lg: {
    height: 'var(--button-height-lg)',
    paddingX: 'var(--button-padding-x-lg)',
    fontSize: 'var(--vpb-font-size-lg)',
  },
  xl: {
    height: 'var(--button-height-xl)',
    paddingX: 'var(--button-padding-x-xl)',
    fontSize: 'var(--vpb-font-size-xl)',
  },
};

/**
 * Radius configuration mapping
 */
const RADIUS_CONFIG: Record<ButtonRadius, string> = {
  xs: 'var(--vpb-radius-xs)',
  sm: 'var(--vpb-radius-sm)',
  md: 'var(--vpb-radius-md)',
  lg: 'var(--vpb-radius-lg)',
  xl: 'var(--vpb-radius-xl)',
};

/**
 * Gets size CSS variables based on size prop
 */
export function getSizeVars(size?: ButtonSize): Record<string, string> {
  if (!size) {
    return SIZE_CONFIG.md;
  }

  return SIZE_CONFIG[size];
}

/**
 * Gets radius CSS variable
 */
export function getRadiusVar(
  radius?: ButtonRadius | 'default'
): string | undefined {
  if (!radius || radius === 'default') {
    return undefined; // Use CSS default
  }
  return RADIUS_CONFIG[radius];
}
