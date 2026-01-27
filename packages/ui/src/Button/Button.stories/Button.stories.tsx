import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '../Button';
import { BUTTON_VARIANTS, BUTTON_COLORS, BUTTON_SIZES, BUTTON_RADIUS } from './constants';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: BUTTON_VARIANTS,
      description: 'Button variant style',
    },
    color: {
      control: 'select',
      options: BUTTON_COLORS,
      description: 'Button color theme',
    },
    size: {
      control: 'select',
      options: BUTTON_SIZES,
      description: 'Button size',
    },
    radius: {
      control: 'select',
      options: BUTTON_RADIUS,
      description: 'Border radius',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};
