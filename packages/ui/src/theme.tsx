import type { JSX, Component } from 'solid-js';
import { createContext, createMemo, useContext } from 'solid-js';
import type { VpbColor } from './types';

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
}

const ThemeContext = createContext<ThemeContextValue>();

export interface ThemeProviderProps {
  theme?: Partial<Theme> | (() => Partial<Theme>);
}

export const ThemeProvider: Component<
  ThemeProviderProps & { children: JSX.Element }
> = (props) => {
  // Create reactive theme that updates when props.theme changes
  const theme = createMemo(() => {
    const themeProps =
      typeof props.theme === 'function' ? props.theme() : props.theme;
    return {
      ...defaultTheme,
      ...themeProps,
    };
  });

  const contextValue: ThemeContextValue = {
    get theme() {
      return theme();
    },
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        data-vpb-color-scheme="light"
        class="vpb-theme-provider"
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
