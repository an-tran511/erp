import type { ParentProps, Accessor, Setter } from 'solid-js';
import { createContext, createMemo, createSignal, useContext, createEffect, onCleanup } from 'solid-js';
import type { VpbColor } from './types';

export type ColorScheme = 'light' | 'dark';

export interface Theme {
  primaryColor: VpbColor;
  radius: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const defaultTheme: Theme = {
  primaryColor: 'indigo',
  radius: 'md',
};

interface ThemeContextValue {
  theme: Theme;
  colorScheme: Accessor<ColorScheme>;
  setColorScheme: Setter<ColorScheme>;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>();

export interface ThemeProviderProps {
  theme?: Partial<Theme> | (() => Partial<Theme>);
  defaultColorScheme?: ColorScheme;
}

export const ThemeProvider = (props: ParentProps<ThemeProviderProps>) => {
  const [colorScheme, setColorScheme] = createSignal<ColorScheme>(
    props.defaultColorScheme ?? 'light'
  );

  // Create reactive theme that updates when props.theme changes
  const theme = createMemo(() => {
    const themeProps = typeof props.theme === 'function' ? props.theme() : props.theme;
    return {
      ...defaultTheme,
      ...themeProps,
    };
  });

  // Apply color scheme to html element for proper CSS variable resolution
  createEffect(() => {
    const scheme = colorScheme();
    const html = document.documentElement;
    
    if (scheme === 'dark') {
      html.classList.add('dark', 'dark-theme');
      html.setAttribute('data-vpb-color-scheme', 'dark');
    } else {
      html.classList.remove('dark', 'dark-theme');
      html.setAttribute('data-vpb-color-scheme', 'light');
    }

    // Cleanup on unmount
    onCleanup(() => {
      html.classList.remove('dark', 'dark-theme');
      html.removeAttribute('data-vpb-color-scheme');
    });
  });

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const contextValue: ThemeContextValue = {
    get theme() {
      return theme();
    },
    colorScheme,
    setColorScheme,
    toggleColorScheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        data-vpb-color-scheme={colorScheme()}
        class={`vpb-theme-provider ${colorScheme()}`}
      >
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
