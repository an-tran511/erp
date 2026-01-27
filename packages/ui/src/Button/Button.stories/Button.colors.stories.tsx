import type { StoryObj } from 'storybook-solidjs-vite';
import { Button } from '../Button';
import { BUTTON_COLORS, BUTTON_VARIANTS } from './constants';
import { Column, Row } from './layout';

const meta = {
  title: 'Components/Button/Colors',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AllColors: Story = {
  render: () => (
    <Column>
      <Row>
        {BUTTON_COLORS.map((color) => (
          <Button variant="filled" color={color}>
            {color}
          </Button>
        ))}
      </Row>
      <Row>
        {BUTTON_COLORS.map((color) => (
          <Button variant="light" color={color}>
            {color}
          </Button>
        ))}
      </Row>
      <Row>
        {BUTTON_COLORS.map((color) => (
          <Button variant="outline" color={color}>
            {color}
          </Button>
        ))}
      </Row>
      <Row>
        {BUTTON_VARIANTS.map((variant) => (
          <Button variant={variant} color="amber">
            {variant}
          </Button>
        ))}
      </Row>
    </Column>
  ),
};
