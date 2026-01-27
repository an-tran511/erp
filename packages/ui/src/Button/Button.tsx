import {
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  Show,
  splitProps,
} from 'solid-js';
import type { Component, JSX } from 'solid-js';
import classes from './Button.module.css';
import type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  ButtonRadius,
} from './Button.types';
import { defaultVariantColorsResolver } from './Button.vars';
import { getSizeVars, getRadiusVar } from './Button.utils';
import { resolveContrastColor } from '../utils/color';
import { useTheme } from '../theme';

/**
 * Simple loading spinner component
 * TODO: Replace with a proper Loader component when available
 */
const Loader: Component<{ size?: string; class?: string }> = (props) => {
  const size = props.size || '1rem';
  return (
    <div
      class={props.class}
      style={{
        width: size,
        height: size,
        display: 'inline-block',
      }}
    >
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        style={{
          width: '100%',
          height: '100%',
          animation: 'spin 1s linear infinite',
        }}
      >
        <path d='M21 12a9 9 0 1 1-6.219-8.56' />
      </svg>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export const Button: Component<ButtonProps> = (props) => {
  const { theme } = useTheme();
  const [autoTextColor, setAutoTextColor] = createSignal<string | null>(null);
  const [autoHoverTextColor, setAutoHoverTextColor] = createSignal<
    string | null
  >(null);
  const [buttonEl, setButtonEl] = createSignal<HTMLButtonElement | undefined>();
  const [isPressed, setIsPressed] = createSignal(false);

  const [local, others] = splitProps(
    mergeProps(
      {
        variant: 'filled' as ButtonVariant,
        size: 'md' as ButtonSize,
        radius: 'default' as ButtonRadius | 'default',
        justify: 'center' as JSX.CSSProperties['justify-content'],
        disabled: false,
        loading: false,
        fullWidth: false,
      },
      props
    ),
    [
      'variant',
      'color',
      'size',
      'radius',
      'justify',
      'disabled',
      'loading',
      'fullWidth',
      'classes',
      'leftSection',
      'rightSection',
      'children',
      'class',
      'onClick',
      'onPointerDown',
      'onPointerUp',
      'onPointerCancel',
    ]
  );

  const variantValue = createMemo(() => local.variant);
  // Use theme's primaryColor as default if no color prop is provided
  const colorValue = createMemo(() => local.color ?? theme.primaryColor);

  // Resolve variant colors using Mantine's pattern
  const variantColors = createMemo(() =>
    defaultVariantColorsResolver({
      variant: variantValue(),
      color: colorValue(),
    })
  );

  const sizeVars = createMemo(() => getSizeVars(local.size));
  const radiusVar = createMemo(() =>
    getRadiusVar(local.radius === 'default' ? theme.radius : local.radius)
  );

  // Guideline 1: Derive a memo for the filled background only
  // Contrast is only needed for 'filled' variant with a valid background
  const filledBackground = createMemo(() => {
    if (variantValue() !== 'filled') return null;
    const bg = variantColors().background;
    if (!bg || bg === 'transparent') return null;
    return bg;
  });

  // Guideline 1 & 2: Recalculate contrast only when filledBackground changes
  // Also compute hover contrast separately from hover background
  createEffect(() => {
    const el = buttonEl();
    const bg = filledBackground();

    // Reset when not filled or invalid background
    if (!el || !bg) {
      setAutoTextColor(null);
      setAutoHoverTextColor(null);
      return;
    }

    // Resolve normal text contrast from background
    const resolvedText = resolveContrastColor({
      background: bg,
      luminanceThreshold: 0.3,
      element: el,
    });
    setAutoTextColor(resolvedText);

    // Guideline 2: Resolve hover text contrast from hover background when present
    const hoverBg = variantColors().hover;
    if (hoverBg && hoverBg !== 'transparent' && hoverBg !== bg) {
      const resolvedHover = resolveContrastColor({
        background: hoverBg,
        luminanceThreshold: 0.3,
        element: el,
      });
      setAutoHoverTextColor(resolvedHover);
    } else {
      // Fall back to normal text color if no distinct hover background
      setAutoHoverTextColor(null);
    }
  });

  const buttonVars = createMemo(() => {
    const colors = variantColors();
    const textColor = autoTextColor() ?? colors.color;
    // Guideline 2: Use resolved hover contrast, fall back to normal text color only if no hover bg
    const hoverColor =
      autoHoverTextColor() ??
      autoTextColor() ??
      colors.hoverColor ??
      colors.color;
    const vars: Record<string, string> = {
      '--button-bg': colors.background,
      '--button-hover': colors.hover,
      '--button-color': textColor,
      '--button-bd': colors.border,
      ...(hoverColor && {
        '--button-hover-color': hoverColor,
      }),
      ...(colors.borderHover && {
        '--button-bd-hover': colors.borderHover,
      }),
    };

    const size = sizeVars();
    vars['--button-height'] = size.height;
    vars['--button-padding-x'] = size.paddingX;
    vars['--button-fz'] = size.fontSize;

    const radius = radiusVar();
    if (radius) {
      vars['--button-radius'] = radius;
    }

    return vars;
  });

  const hasLeftSection = Boolean(local.leftSection);
  const hasRightSection = Boolean(local.rightSection);

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (e) => {
    if (local.disabled || local.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Trigger press animation on click (fallback for soft taps that don't trigger pointerdown)
    if (!isPressed()) {
      setIsPressed(true);
      requestAnimationFrame(() => {
        setTimeout(() => setIsPressed(false), 100);
      });
    }
    if (typeof local.onClick === 'function') {
      local.onClick(e);
    }
  };

  const handlePointerDown: JSX.EventHandler<HTMLButtonElement, PointerEvent> = (
    e
  ) => {
    if (local.disabled || local.loading) return;
    setIsPressed(true);
    if (typeof local.onPointerDown === 'function') {
      local.onPointerDown(e);
    }
  };

  const handlePointerUp: JSX.EventHandler<HTMLButtonElement, PointerEvent> = (
    e
  ) => {
    setIsPressed(false);
    if (typeof local.onPointerUp === 'function') {
      local.onPointerUp(e);
    }
  };

  const handlePointerCancel: JSX.EventHandler<
    HTMLButtonElement,
    PointerEvent
  > = (e) => {
    setIsPressed(false);
    if (typeof local.onPointerCancel === 'function') {
      local.onPointerCancel(e);
    }
  };

  const handlePointerLeave: JSX.EventHandler<
    HTMLButtonElement,
    PointerEvent
  > = () => {
    setIsPressed(false);
  };

  return (
    <button
      ref={setButtonEl}
      {...others}
      class={`${classes.root} ${local.classes?.root || ''} ${local.class || ''}`}
      data-block={local.fullWidth || undefined}
      data-with-left-section={hasLeftSection || undefined}
      data-with-right-section={hasRightSection || undefined}
      data-loading={local.loading || undefined}
      data-disabled={local.disabled || undefined}
      data-pressed={isPressed() || undefined}
      // Guideline 4: Mirror data-pressed with aria-pressed for accessibility
      aria-pressed={isPressed() || undefined}
      disabled={local.disabled || local.loading}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerLeave}
      style={{
        ...buttonVars(),
        ...(others.style as JSX.CSSProperties),
      }}
    >
      {/* Guideline 3: Loader explicitly binds to --button-color for resolved contrast */}
      <Show when={local.loading}>
        <div
          class={`${classes.loader} ${local.classes?.loader || ''}`}
          style={{ color: 'var(--button-color)' }}
        >
          <Loader size='1rem' />
        </div>
      </Show>

      <div class={`${classes.inner} ${local.classes?.inner || ''}`}>
        <Show when={local.leftSection}>
          <div
            class={`${classes.section} ${local.classes?.section || ''}`}
            data-position='left'
          >
            {local.leftSection}
          </div>
        </Show>

        <Show when={local.children}>
          <div class={`${classes.label} ${local.classes?.label || ''}`}>
            {local.children}
          </div>
        </Show>

        <Show when={local.rightSection}>
          <div
            class={`${classes.section} ${local.classes?.section || ''}`}
            data-position='right'
          >
            {local.rightSection}
          </div>
        </Show>
      </div>
    </button>
  );
};
