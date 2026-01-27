// @ts-nocheck
/** @jsxImportSource solid-js */
import type { Preview } from 'storybook-solidjs-vite';
import { ThemeProvider } from '../src/theme';
import '../src/theme.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', 'min-height': '100vh' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
