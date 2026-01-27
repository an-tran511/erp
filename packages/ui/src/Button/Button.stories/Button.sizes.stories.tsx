import type { StoryObj } from 'storybook-solidjs-vite';
import { Button } from '../Button';
import { BUTTON_SIZES, SIZE_LABELS } from './constants';
import { Column, Row } from './layout';

const meta = {
  title: 'Components/Button/Sizes',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AllSizes: Story = {
  render: () => (
    <Column>
      <Row alignItems="center">
        {BUTTON_SIZES.map((size) => (
          <Button size={size}>{SIZE_LABELS[size]}</Button>
        ))}
      </Row>
      <Button fullWidth>Full Width Button</Button>
    </Column>
  ),
};
