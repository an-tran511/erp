import {
  Accessor,
  Component,
  JSX,
  createContext,
  createSignal,
  mergeProps,
  splitProps,
  useContext,
} from 'solid-js';
import { Show } from 'solid-js';
import classes from './Sidebar.module.css';
import useIsMobile from '../utils/use-is-mobile';
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTrigger,
} from '../Drawer/Drawer';

type SidebarContextValue = {
  isMobile: Accessor<boolean>;
  openMobile: Accessor<boolean>;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return ctx;
}

type SidebarProviderProps = {
  width?: string;
  class?: string;
  style?: JSX.CSSProperties;
  children?: JSX.Element;
};

export const SidebarProvider: Component<SidebarProviderProps> = (rawProps) => {
  const props = mergeProps({ width: '14rem' } as const, rawProps);
  const [local, others] = splitProps(props, [
    'width',
    'class',
    'style',
    'children',
  ]);

  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = createSignal(false);

  const toggleSidebar = () => {
    if (isMobile()) {
      setOpenMobile((open) => !open);
    }
  };

  const contextValue: SidebarContextValue = {
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        class={`${classes.provider} ${local.class || ''}`}
        style={{
          '--sidebar-width': local.width,
          ...local.style,
        }}
        {...others}
      >
        {local.children}
      </div>
    </SidebarContext.Provider>
  );
};

type SidebarProps = {
  side?: 'left' | 'right';
  class?: string;
  children?: JSX.Element;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const Sidebar: Component<SidebarProps> = (rawProps) => {
  const props = mergeProps({ side: 'left' } as const, rawProps);
  const [local, others] = splitProps(props, ['side', 'class', 'children']);

  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  return (
    <>
      <Show when={isMobile()}>
        <Drawer
          open={openMobile()}
          onOpenChange={setOpenMobile}
          side={local.side === 'right' ? 'right' : 'left'}
          breakPoints={[0.75]}
        >
          {(drawerProps) => (
            <>
              <DrawerPortal>
                <Show when={drawerProps.open}>
                  <DrawerOverlay
                    style={{
                      '--overlay-opacity': `${0.5 * drawerProps.openPercentage}`,
                    }}
                  />
                  <DrawerContent
                    class={`${classes.sidebar} ${classes.sidebarMobile} ${local.class || ''}`}
                    data-sidebar='sidebar'
                    data-mobile='true'
                  >
                    <div class={classes.sidebarInner}>{local.children}</div>
                  </DrawerContent>
                </Show>
              </DrawerPortal>
            </>
          )}
        </Drawer>
      </Show>

      <Show when={!isMobile()}>
        <div
          class={`${classes.sidebar} ${classes.sidebarDesktop} ${local.side === 'right' ? classes.sidebarRight : classes.sidebarLeft
            } ${local.class || ''}`}
          data-sidebar='sidebar'
          data-desktop='true'
          {...others}
        >
          <div class={classes.sidebarInner}>{local.children}</div>
        </div>
        <div
          class={classes.sidebarSpacer}
          aria-hidden='true'
        />
      </Show>
    </>
  );
};

type SidebarTriggerProps = {
  class?: string;
  children?: JSX.Element;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const SidebarTrigger: Component<SidebarTriggerProps> = (rawProps) => {
  const [local, others] = splitProps(rawProps, ['class', 'children']);
  const { isMobile, toggleSidebar } = useSidebar();

  const triggerContent = (
    <>
      <svg
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        class={classes.triggerIcon}
      >
        <rect width='18' height='18' x='3' y='3' rx='2' />
        <path d='M9 3v18' />
      </svg>
      <span class={classes.srOnly}>Toggle sidebar</span>
    </>
  );

  return (
    <Show
      when={isMobile()}
      fallback={
        <button
          type='button'
          data-sidebar='trigger'
          class={`${classes.trigger} ${local.class || ''}`}
          {...others}
        >
          {local.children ?? triggerContent}
        </button>
      }
    >
      <button
        type='button'
        data-sidebar='trigger'
        class={`${classes.trigger} ${local.class || ''}`}
        onClick={toggleSidebar}
        {...others}
      >
        {local.children ?? triggerContent}
      </button>
    </Show>
  );
};

type SidebarInsetProps = {
  class?: string;
} & JSX.HTMLAttributes<HTMLElement>;

export const SidebarInset: Component<SidebarInsetProps> = (props) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <main
      class={`${classes.inset} ${local.class || ''}`}
      {...rest}
    />
  );
};

type SidebarHeaderProps = {
  class?: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const SidebarHeader: Component<SidebarHeaderProps> = (props) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <div
      data-sidebar='header'
      class={`${classes.header} ${local.class || ''}`}
      {...rest}
    />
  );
};

type SidebarFooterProps = {
  class?: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const SidebarFooter: Component<SidebarFooterProps> = (props) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <div
      data-sidebar='footer'
      class={`${classes.footer} ${local.class || ''}`}
      {...rest}
    />
  );
};

type SidebarContentProps = {
  class?: string;
} & JSX.HTMLAttributes<HTMLDivElement>;

export const SidebarContent: Component<SidebarContentProps> = (props) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <div
      data-sidebar='content'
      class={`${classes.content} ${local.class || ''}`}
      {...rest}
    />
  );
};

type SidebarSeparatorProps = {
  class?: string;
} & JSX.HTMLAttributes<HTMLHRElement>;

export const SidebarSeparator: Component<SidebarSeparatorProps> = (props) => {
  const [local, rest] = splitProps(props, ['class']);

  return (
    <hr
      data-sidebar='separator'
      class={`${classes.separator} ${local.class || ''}`}
      {...rest}
    />
  );
};

