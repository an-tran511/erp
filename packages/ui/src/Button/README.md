# Button Component

A flexible, accessible Button component built with SolidJS, inspired by Mantine's Button design system.

## Features

- ✅ Multiple variants: `filled`, `light`, `outline`, `transparent`, `subtle`, `default`
- ✅ Multiple colors: `indigo` (primary), `red`, `green`, `amber`, `blue`, `slate`
- ✅ Multiple sizes: `sm`, `md`, `lg`, `xl` (compact web app sizing)
- ✅ Loading state with spinner
- ✅ Left/right sections (icons, badges, etc.)
- ✅ Full width support
- ✅ Disabled state
- ✅ Customizable border radius
- ✅ Uses Radix Colors for consistent theming
- ✅ Fully accessible with keyboard navigation

## Installation

The Button component is part of the `@erp/ui` package.

## Basic Usage

```tsx
import { Button } from '@erp/ui';

// Basic button
<Button>Click me</Button>

// With variant
<Button variant="filled">Filled Button</Button>
<Button variant="outline">Outline Button</Button>

// With color
<Button color="red">Red Button</Button>
<Button color="green" variant="light">Green Light Button</Button>

// With size (md is default)
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>

// With icons
<Button leftSection={<Icon />}>With Icon</Button>
<Button rightSection={<Icon />}>With Right Icon</Button>

// Loading state
<Button loading>Loading...</Button>

// Disabled
<Button disabled>Disabled</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

## Props

| Prop           | Type                                                                         | Default     | Description                      |
| -------------- | ---------------------------------------------------------------------------- | ----------- | -------------------------------- |
| `variant`      | `'filled' \| 'light' \| 'outline' \| 'transparent' \| 'subtle' \| 'default'` | `'filled'`  | Button variant style             |
| `color`        | `'indigo' \| 'red' \| 'green' \| 'amber' \| 'blue' \| 'slate'`               | `'indigo'`  | Button color theme               |
| `size`         | `'sm' \| 'md' \| 'lg' \| 'xl'`                                               | `'md'`      | Button size                      |
| `radius`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'default'`                          | `'default'` | Border radius                    |
| `fullWidth`    | `boolean`                                                                    | `false`     | Makes button take 100% width     |
| `disabled`     | `boolean`                                                                    | `false`     | Disables the button              |
| `loading`      | `boolean`                                                                    | `false`     | Shows loading spinner            |
| `leftSection`  | `JSX.Element`                                                                | -           | Content on the left side         |
| `rightSection` | `JSX.Element`                                                                | -           | Content on the right side        |
| `justify`      | `CSSProperties['justify-content']`                                           | `'center'`  | Justify content of inner element |
| `children`     | `JSX.Element`                                                                | -           | Button content                   |
| `onClick`      | `(e: MouseEvent) => void`                                                    | -           | Click handler                    |

## Variants

### Filled

Solid background with white text. Best for primary actions.

```tsx
<Button variant='filled'>Primary Action</Button>
```

### Light

Light background with colored text. Good for secondary actions.

```tsx
<Button variant='light'>Secondary Action</Button>
```

### Outline

Transparent background with border. Great for less prominent actions.

```tsx
<Button variant='outline'>Outline Button</Button>
```

### Transparent

Fully transparent, shows background on hover.

```tsx
<Button variant='transparent'>Transparent</Button>
```

### Subtle

Minimal styling, good for text-like buttons.

```tsx
<Button variant='subtle'>Subtle</Button>
```

### Default

Uses default color scheme (slate).

```tsx
<Button variant='default'>Default</Button>
```

## Colors

All colors use Radix Colors scales for consistency:

- `indigo` - Primary brand color
- `red` - Error/destructive actions
- `green` - Success/positive actions
- `amber` - Warning actions
- `blue` - Informational actions
- `slate` - Neutral actions

```tsx
<Button color="red" variant="filled">Delete</Button>
<Button color="green" variant="filled">Save</Button>
<Button color="amber" variant="light">Warning</Button>
```

## Sizes

Compact web app sizes optimized for dense layouts:

- `sm` - 28px height, smallest option
- `md` - 32px height, default
- `lg` - 36px height
- `xl` - 40px height

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium (Default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

## Examples

### Icon Buttons

```tsx
<Button leftSection={<Icon />}>With Icon</Button>
<Button rightSection={<Icon />}>With Right Icon</Button>
<Button leftSection={<Icon />} rightSection={<Icon />}>
  Both Icons
</Button>
```

### Loading State

```tsx
<Button loading>Processing...</Button>
<Button loading disabled>Cannot Cancel</Button>
```

### Full Width

```tsx
<Button fullWidth>Full Width Button</Button>
```

### Custom Radius

```tsx
<Button radius="xl">Rounded Button</Button>
<Button radius="xs">Sharp Button</Button>
```

### Event Handling

```tsx
<Button onClick={(e) => console.log('Clicked!')}>Click Me</Button>
```

## Styling

The Button component uses CSS modules and CSS variables from `default-css-variables.css`. All colors, spacing, and sizing are controlled through CSS variables, making it easy to theme.

### Custom Styling

You can override styles using the `class` prop:

```tsx
<Button class='my-custom-button'>Custom Styled</Button>
```

```css
.my-custom-button {
  /* Your custom styles */
}
```

## Accessibility

- ✅ Keyboard navigation support
- ✅ Focus states with visible outline
- ✅ Disabled state properly handled
- ✅ ARIA attributes for loading state
- ✅ Proper button semantics

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS custom properties support required
- CSS modules support required

## Related

- [Radix Colors](https://www.radix-ui.com/colors)
- [Mantine Button](https://mantine.dev/core/button/)
