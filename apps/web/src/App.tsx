import { createSignal, For, type Component } from 'solid-js';
import {
  Button,
  useTheme,
  type ButtonVariant,
  type ButtonColor,
} from '@erp/ui';

const variants: ButtonVariant[] = [
  'filled',
  'light',
  'outline',
  'subtle',
  'transparent',
  'default',
];
const colors: ButtonColor[] = [
  'indigo',
  'blue',
  'green',
  'red',
  'amber',
  'slate',
];

const App: Component = () => {
  const { colorScheme, toggleColorScheme } = useTheme();
  const [loading, setLoading] = createSignal(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div
      style={{
        padding: '2rem',
        'min-height': '100vh',
        background: 'var(--vpb-color-slate-1)',
        color: 'var(--vpb-color-slate-12)',
      }}
    >
      {/* Header with Theme Toggle */}
      <div
        style={{
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
          'margin-bottom': '2rem',
        }}
      >
        <h1 style={{ margin: 0, 'font-size': '1.5rem' }}>
          Button Component Demo
        </h1>
        <Button variant='outline' onClick={toggleColorScheme}>
          {colorScheme() === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Button>
      </div>

      {/* Current Theme Indicator */}
      <div
        style={{
          padding: '0.75rem 1rem',
          background: 'var(--vpb-color-slate-3)',
          'border-radius': 'var(--vpb-radius-md)',
          'margin-bottom': '2rem',
          'font-size': 'var(--vpb-font-size-sm)',
        }}
      >
        Current theme: <strong>{colorScheme()}</strong>
      </div>

      {/* Variants Section */}
      <section style={{ 'margin-bottom': '2rem' }}>
        <h2 style={{ 'font-size': '1rem', 'margin-bottom': '0.75rem' }}>
          Variants
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
          <For each={variants}>
            {(variant) => <Button variant={variant}>{variant}</Button>}
          </For>
        </div>
      </section>

      {/* Colors Section - Testing auto-contrast */}
      <section style={{ 'margin-bottom': '2rem' }}>
        <h2 style={{ 'font-size': '1rem', 'margin-bottom': '0.75rem' }}>
          Colors (Filled) - Auto Contrast Test
        </h2>
        <p
          style={{
            'font-size': 'var(--vpb-font-size-xs)',
            color: 'var(--vpb-color-slate-11)',
            'margin-bottom': '0.5rem',
          }}
        >
          Amber should have dark text (high luminance background)
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
          <For each={colors}>
            {(color) => <Button color={color}>{color}</Button>}
          </For>
        </div>
      </section>

      {/* Light Variant Colors */}
      <section style={{ 'margin-bottom': '2rem' }}>
        <h2 style={{ 'font-size': '1rem', 'margin-bottom': '0.75rem' }}>
          Colors (Light Variant)
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
          <For each={colors}>
            {(color) => (
              <Button variant='light' color={color}>
                {color}
              </Button>
            )}
          </For>
        </div>
      </section>

      {/* Outline Variant Colors */}
      <section style={{ 'margin-bottom': '2rem' }}>
        <h2 style={{ 'font-size': '1rem', 'margin-bottom': '0.75rem' }}>
          Colors (Outline Variant)
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
          <For each={colors}>
            {(color) => (
              <Button variant='outline' color={color}>
                {color}
              </Button>
            )}
          </For>
        </div>
      </section>

      {/* Sizes Section */}
      <section style={{ 'margin-bottom': '2rem' }}>
        <h2 style={{ 'font-size': '1rem', 'margin-bottom': '0.75rem' }}>
          Sizes
        </h2>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            'align-items': 'center',
            'flex-wrap': 'wrap',
          }}
        >
          <Button size='sm'>Small</Button>
          <Button size='md'>Medium (default)</Button>
          <Button size='lg'>Large</Button>
          <Button size='xl'>Extra Large</Button>
        </div>
      </section>

      {/* States Section */}
      <section style={{ 'margin-bottom': '2rem' }}>
        <h2 style={{ 'font-size': '1rem', 'margin-bottom': '0.75rem' }}>
          States
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading={loading()} onClick={handleLoadingDemo}>
            {loading() ? 'Loading...' : 'Click for Loading'}
          </Button>
        </div>
      </section>

      {/* Sections (Icons) */}
      <section style={{ 'margin-bottom': '2rem' }}>
        <h2 style={{ 'font-size': '1rem', 'margin-bottom': '0.75rem' }}>
          With Sections
        </h2>
        <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
          <Button leftSection='←'>Left Icon</Button>
          <Button rightSection='→'>Right Icon</Button>
          <Button leftSection='←' rightSection='→'>
            Both Icons
          </Button>
        </div>
      </section>

      {/* Amber Deep Dive - Critical for contrast testing */}
      <section
        style={{
          'margin-bottom': '2rem',
          padding: '1rem',
          background: 'var(--vpb-color-slate-2)',
          'border-radius': 'var(--vpb-radius-md)',
        }}
      >
        <h2 style={{ 'font-size': '1rem', 'margin-bottom': '0.75rem' }}>
          Amber Contrast Test (All Variants)
        </h2>
        <p
          style={{
            'font-size': 'var(--vpb-font-size-xs)',
            color: 'var(--vpb-color-slate-11)',
            'margin-bottom': '0.5rem',
          }}
        >
          Filled amber should have dark text in both light and dark modes
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
          <For each={variants}>
            {(variant) => (
              <Button variant={variant} color='amber'>
                {variant}
              </Button>
            )}
          </For>
        </div>
      </section>

      {/* Style Override Demo */}
      <section
        style={{
          'margin-bottom': '2rem',
          padding: '1rem',
          background: 'var(--vpb-color-slate-2)',
          'border-radius': 'var(--vpb-radius-md)',
        }}
      >
        <style>
          {`
            /* Demo CSS classes for classes prop examples */
            .button-compact {
              --button-padding-x: 0 !important;
              --button-height: auto !important;
              min-height: 0 !important;
            }
            
            .button-rounded-full {
              --button-radius: 9999px !important;
              --button-padding-x: 2rem !important;
            }
            
            .button-sharp {
              --button-radius: 0 !important;
              --button-padding-x: 3rem !important;
            }
            
            .button-inner-spacing {
              gap: 0.5rem;
            }
            
            .button-label-uppercase {
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            
            .button-section-large {
              font-size: 1.2em;
            }
            
            .button-label-bold {
              font-weight: 700;
            }
          `}
        </style>
        <h2 style={{ 'font-size': '1rem', 'margin-bottom': '0.75rem' }}>
          Style Override Demo (classes prop)
        </h2>
        <p
          style={{
            'font-size': 'var(--vpb-font-size-xs)',
            color: 'var(--vpb-color-slate-11)',
            'margin-bottom': '1rem',
          }}
        >
          Use the <code>classes</code> prop to override default styles for any
          component part (root, inner, section, label, loader)
        </p>

        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            gap: '1rem',
          }}
        >
          {/* Example 1: Transparent button with no padding using classes prop */}
          <div>
            <p
              style={{
                'font-size': 'var(--vpb-font-size-xs)',
                color: 'var(--vpb-color-slate-11)',
                'margin-bottom': '0.5rem',
              }}
            >
              <strong>Example 1:</strong> Transparent button with no padding
              (fits content) - Using <code>classes</code> prop
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
              <Button variant='transparent' color='indigo'>
                Default (with padding)
              </Button>
              <Button
                variant='transparent'
                color='indigo'
                classes={{
                  root: 'button-compact',
                }}
              >
                Compact (no padding)
              </Button>
            </div>
            <pre
              style={{
                'font-size': 'var(--vpb-font-size-xs)',
                background: 'var(--vpb-color-slate-3)',
                padding: '0.5rem',
                'border-radius': 'var(--vpb-radius-sm)',
                'margin-top': '0.5rem',
                overflow: 'auto',
              }}
            >
              {`<Button
  variant='transparent'
  classes={{ root: 'button-compact' }}
>
  Compact Button
</Button>`}
            </pre>
          </div>

          {/* Example 2: Using classes prop with CSS class names */}
          <div>
            <p
              style={{
                'font-size': 'var(--vpb-font-size-xs)',
                color: 'var(--vpb-color-slate-11)',
                'margin-bottom': '0.5rem',
              }}
            >
              <strong>Example 2:</strong> Using <code>classes</code> prop with
              CSS class names (from your CSS file)
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
              <Button
                variant='filled'
                color='blue'
                classes={{
                  root: 'button-rounded-full',
                }}
              >
                Custom Rounded
              </Button>
              <Button
                variant='outline'
                color='green'
                classes={{
                  root: 'button-sharp',
                }}
              >
                Sharp Corners
              </Button>
            </div>
            <pre
              style={{
                'font-size': 'var(--vpb-font-size-xs)',
                background: 'var(--vpb-color-slate-3)',
                padding: '0.5rem',
                'border-radius': 'var(--vpb-radius-sm)',
                'margin-top': '0.5rem',
                overflow: 'auto',
              }}
            >
              {`/* In your CSS file: */
.button-rounded-full {
  --button-radius: 9999px;
  --button-padding-x: 2rem;
}

.button-sharp {
  --button-radius: 0;
  --button-padding-x: 3rem;
}

/* Usage: */
<Button classes={{ root: 'button-rounded-full' }}>
  Custom Rounded
</Button>`}
            </pre>
          </div>

          {/* Example 3: Overriding specific parts */}
          <div>
            <p
              style={{
                'font-size': 'var(--vpb-font-size-xs)',
                color: 'var(--vpb-color-slate-11)',
                'margin-bottom': '0.5rem',
              }}
            >
              <strong>Example 3:</strong> Override specific component parts
              (inner, label, section) using <code>classes</code> prop
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
              <Button
                variant='light'
                color='red'
                classes={{
                  inner: 'button-inner-spacing',
                  label: 'button-label-uppercase',
                }}
              >
                Custom Parts
              </Button>
              <Button
                variant='filled'
                color='amber'
                leftSection='←'
                classes={{
                  section: 'button-section-large',
                  label: 'button-label-bold',
                }}
              >
                Custom Sections
              </Button>
            </div>
            <pre
              style={{
                'font-size': 'var(--vpb-font-size-xs)',
                background: 'var(--vpb-color-slate-3)',
                padding: '0.5rem',
                'border-radius': 'var(--vpb-radius-sm)',
                'margin-top': '0.5rem',
                overflow: 'auto',
              }}
            >
              {`/* In your CSS file: */
.button-inner-spacing {
  gap: 0.5rem;
}

.button-label-uppercase {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.button-section-large {
  font-size: 1.2em;
}

.button-label-bold {
  font-weight: 700;
}

/* Usage: */
<Button
  classes={{
    inner: 'button-inner-spacing',
    label: 'button-label-uppercase',
  }}
>
  Custom Parts
</Button>`}
            </pre>
          </div>

          {/* Example 4: Using CSS variables via inline styles (alternative) */}
          <div>
            <p
              style={{
                'font-size': 'var(--vpb-font-size-xs)',
                color: 'var(--vpb-color-slate-11)',
                'margin-bottom': '0.5rem',
              }}
            >
              <strong>Example 4:</strong> Alternative - Override via inline
              styles (CSS variables)
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', 'flex-wrap': 'wrap' }}>
              <Button
                variant='transparent'
                color='slate'
                style={{
                  '--button-padding-x': '0',
                  '--button-height': 'auto',
                }}
              >
                Via style prop
              </Button>
              <Button
                variant='subtle'
                color='blue'
                style={{
                  '--button-padding-x': '2rem',
                  '--button-radius': '1rem',
                }}
              >
                Custom Padding
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width */}
      <section>
        <h2 style={{ 'font-size': '1rem', 'margin-bottom': '0.75rem' }}>
          Full Width
        </h2>
        <Button fullWidth>Full Width Button</Button>
      </section>
    </div>
  );
};

export default App;
