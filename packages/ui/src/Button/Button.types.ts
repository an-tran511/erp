import type { ComponentProps, JSX } from 'solid-js';
import type { VpbColor } from '../types';

export type ButtonVariant =
  | 'filled'
  | 'light'
  | 'outline'
  | 'transparent'
  | 'subtle'
  | 'default';

export type ButtonColor = VpbColor;

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonRadius = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'onClick'> {
  /** Button variant @default 'filled' */
  variant?: ButtonVariant;

  /** Button color @default 'indigo' */
  color?: ButtonColor;

  /** Button size @default 'md' */
  size?: ButtonSize;

  /** Border radius @default 'default' */
  radius?: ButtonRadius | 'default';

  /** If set, button takes 100% width */
  fullWidth?: boolean;

  /** Styles API: classes for component parts */
  classes?: {
    root?: string;
    inner?: string;
    section?: string;
    label?: string;
    loader?: string;
  };

  /** Button content */
  children?: JSX.Element;

  /** Content displayed on the left side */
  leftSection?: JSX.Element;

  /** Content displayed on the right side */
  rightSection?: JSX.Element;

  /** Sets disabled state */
  disabled?: boolean;

  /** If set, shows loading state */
  loading?: boolean;

  /** Sets justify-content of inner element @default 'center' */
  justify?: JSX.CSSProperties['justify-content'];

  /** Additional class names */
  class?: string;

  /** Click handler */
  onClick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
}
