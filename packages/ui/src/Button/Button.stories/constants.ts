import type { ButtonVariant, ButtonColor, ButtonSize, ButtonRadius } from '../Button.types';

export const BUTTON_VARIANTS: ButtonVariant[] = [
  'filled',
  'light',
  'outline',
  'subtle',
  'transparent',
  'default',
];

export const BUTTON_COLORS: ButtonColor[] = [
  'indigo',
  'blue',
  'green',
  'red',
  'amber',
  'slate',
];

export const BUTTON_SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export const BUTTON_RADIUS: (ButtonRadius | 'default')[] = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'default',
];

export const SIZE_LABELS: Record<ButtonSize, string> = {
  xs: 'Extra Small',
  sm: 'Small',
  md: 'Medium (default)',
  lg: 'Large',
  xl: 'Extra Large',
};
