import DrawerPrimitive from '@corvu/drawer';
import { splitProps, type Component, type JSX } from 'solid-js';
import classes from './Drawer.module.css';

type DrawerProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
  breakPoints?: number[];
  snapPoints?: Array<number | `${number}px`>;
  children?: JSX.Element | ((props: {
    open: boolean;
    openPercentage: number;
    isDragging: boolean;
    isTransitioning: boolean;
  }) => JSX.Element);
};

export const Drawer: Component<DrawerProps> = (props) => {
  return (
    <DrawerPrimitive
      open={props.open}
      onOpenChange={props.onOpenChange}
      breakPoints={props.breakPoints ?? [0.75]}
      side={props.side ?? 'left'}
      snapPoints={props.snapPoints ?? [0, 1]}
    >
      {typeof props.children === 'function'
        ? props.children
        : () => props.children as JSX.Element}
    </DrawerPrimitive>
  );
};

type DrawerTriggerProps = {
  class?: string;
  children?: JSX.Element;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const DrawerTrigger: Component<DrawerTriggerProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children']);

  return (
    <DrawerPrimitive.Trigger
      class={local.class || ''}
      {...others}
    >
      {local.children}
    </DrawerPrimitive.Trigger>
  );
};

type DrawerPortalProps = {
  children?: JSX.Element;
};

export const DrawerPortal: Component<DrawerPortalProps> = (props) => {
  return <DrawerPrimitive.Portal>{props.children}</DrawerPrimitive.Portal>;
};

type DrawerOverlayProps = {
  class?: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const DrawerOverlay: Component<DrawerOverlayProps> = (props) => {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Overlay
      class={`${classes.overlay} ${local.class || ''}`}
      {...others}
    />
  );
};

type DrawerContentProps = {
  class?: string;
  children?: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const DrawerContent: Component<DrawerContentProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children']);

  return (
    <DrawerPrimitive.Content
      class={`${classes.content} ${local.class || ''}`}
      {...others}
    >
      {local.children}
    </DrawerPrimitive.Content>
  );
};

type DrawerCloseProps = {
  class?: string;
  children?: JSX.Element;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const DrawerClose: Component<DrawerCloseProps> = (props) => {
  const [local, others] = splitProps(props, ['class', 'children']);

  return (
    <DrawerPrimitive.Close
      class={local.class || ''}
      {...others}
    >
      {local.children}
    </DrawerPrimitive.Close>
  );
};
