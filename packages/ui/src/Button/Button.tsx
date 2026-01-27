import {
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  Show,
  splitProps,
} from 'solid-js';
import type { Accessor, Component, JSX } from 'solid-js';
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
import { VpbColor } from '../types';
import { composeVars } from '../utils/compose-vars';
import { usePressState } from '../utils/use-press-state';
import { Loader } from '../Loader/Loader';
import type { CssVars } from '../types/css-vars';

type VariantColors = ReturnType<typeof defaultVariantColorsResolver>;

type ButtonContrastResult = {
  textColor: Accessor<string | null>;
  hoverTextColor: Accessor<string | null>;
};

const useButtonContrast = (params: {
  buttonEl: Accessor<HTMLButtonElement | undefined>;
  variant: Accessor<ButtonVariant>;
  variantColors: Accessor<VariantColors>;
}): ButtonContrastResult => {
  const [autoTextColor, setAutoTextColor] = createSignal<string | null>(null);
  const [autoHoverTextColor, setAutoHoverTextColor] = createSignal<
    string | null
  >(null);

  const filledBackground = createMemo(() => {
    if (params.variant() !== 'filled') return null;
    const bg = params.variantColors().background;
    if (!bg || bg === 'transparent') return null;
    return bg;
  });

  createEffect(() => {
    const el = params.buttonEl();
    const bg = filledBackground();

    if (!el || !bg) {
      setAutoTextColor(null);
      setAutoHoverTextColor(null);
      return;
    }

    const resolvedText = resolveContrastColor({
      background: bg,
      luminanceThreshold: 0.3,
      element: el,
    });
    setAutoTextColor(resolvedText);

    const hoverBg = params.variantColors().hover;
    if (hoverBg && hoverBg !== 'transparent' && hoverBg !== bg) {
      const resolvedHover = resolveContrastColor({
        background: hoverBg,
        luminanceThreshold: 0.3,
        element: el,
      });
      setAutoHoverTextColor(resolvedHover);
    } else {
      setAutoHoverTextColor(null);
    }
  });

  return {
    textColor: autoTextColor,
    hoverTextColor: autoHoverTextColor,
  };
};

const useButtonColorVars = (params: {
  variantColors: Accessor<VariantColors>;
  textColor: Accessor<string | null>;
  hoverTextColor: Accessor<string | null>;
}): Accessor<CssVars> =>
  createMemo(() => {
    const colors = params.variantColors();
    const textColor = params.textColor() ?? colors.color;
    const hoverColor =
      params.hoverTextColor() ??
      params.textColor() ??
      colors.hoverColor ??
      colors.color;

    return {
      '--button-bg': colors.background,
      '--button-hover': colors.hover,
      '--button-color': textColor,
      '--button-bd': colors.border,
      ...(hoverColor && { '--button-hover-color': hoverColor }),
      ...(colors.borderHover && { '--button-bd-hover': colors.borderHover }),
    };
  });

const useButtonLayoutVars = (params: {
  sizeVars: Accessor<ReturnType<typeof getSizeVars>>;
  radiusVar: Accessor<string | undefined | null>;
}): Accessor<CssVars> =>
  createMemo(() => {
    const size = params.sizeVars();
    const radius = params.radiusVar();

    return {
      '--button-height': size.height,
      '--button-padding-x': size.paddingX,
      '--button-fz': size.fontSize,
      ...(radius ? { '--button-radius': radius } : {}),
    };
  });

export const Button: Component<ButtonProps> = (props) => {
  const { theme } = useTheme();
  const [buttonEl, setButtonEl] = createSignal<HTMLButtonElement | undefined>();

  const [local, others] = splitProps(
    mergeProps(
      {
        variant: 'filled' as ButtonVariant,
        size: 'md' as ButtonSize,
        radius: 'default' as ButtonRadius,
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

  const variantValue: Accessor<ButtonVariant> = () => local.variant;
  const colorValue: Accessor<VpbColor> = () => local.color ?? theme.primaryColor;

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

  const isDisabled = () => local.disabled || local.loading;

  const contrast = useButtonContrast({
    buttonEl,
    variant: variantValue,
    variantColors,
  });

  const pressState = usePressState(() => !isDisabled());

  const colorVars = useButtonColorVars({
    variantColors,
    textColor: contrast.textColor,
    hoverTextColor: contrast.hoverTextColor,
  });

  const layoutVars = useButtonLayoutVars({
    sizeVars,
    radiusVar,
  });

  const vars = composeVars(colorVars, layoutVars);

  const hasLeftSection = Boolean(local.leftSection);
  const hasRightSection = Boolean(local.rightSection);

  const handleClick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (e) => {
    if (isDisabled()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    pressState.handleClickFallback();
    local.onClick?.(e);
  };

  const handlePointerDown: JSX.EventHandler<HTMLButtonElement, PointerEvent> = (
    e
  ) => {
    pressState.handlePointerDown(e);
    if (typeof local.onPointerDown === 'function') {
      local.onPointerDown(e);
    }
  };

  const handlePointerUp: JSX.EventHandler<HTMLButtonElement, PointerEvent> = (
    e
  ) => {
    pressState.handlePointerUp(e);
    if (typeof local.onPointerUp === 'function') {
      local.onPointerUp(e);
    }
  };

  const handlePointerCancel: JSX.EventHandler<
    HTMLButtonElement,
    PointerEvent
  > = (e) => {
    pressState.handlePointerCancel(e);
    if (typeof local.onPointerCancel === 'function') {
      local.onPointerCancel(e);
    }
  };

  const handlePointerLeave: JSX.EventHandler<
    HTMLButtonElement,
    PointerEvent
  > = () => {
    pressState.handlePointerLeave();
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
      data-pressed={pressState.isPressed() || undefined}
      aria-pressed={pressState.isPressed() || undefined}
      disabled={isDisabled()}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerLeave}
      style={{
        ...vars(),
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
