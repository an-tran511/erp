import type { StoryObj } from 'storybook-solidjs-vite';
import { Button } from '../Button';
import { BUTTON_VARIANTS } from './constants';
import { Row } from './layout';

const meta = {
  title: 'Components/Button/Variants',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AllVariants: Story = {
  render: () => (
    <Row>
      {BUTTON_VARIANTS.map((variant) => (
        <Button variant={variant} color="indigo">
          {variant}
        </Button>
      ))}
    </Row>
  ),
};
