import type { StoryObj } from 'storybook-solidjs-vite';
import { createSignal } from 'solid-js';
import { Button } from '../Button';
import { Column, Row } from './layout';

const meta = {
  title: 'Components/Button/States',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const AllStates: Story = {
  render: () => {
    const [loading, setLoading] = createSignal(false);
    return (
      <Column>
        <Row>
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button loading={loading()} onClick={() => setLoading(!loading())}>
            {loading() ? 'Loading...' : 'Click for Loading'}
          </Button>
        </Row>
        <Row>
          <Button leftSection="←">Left Icon</Button>
          <Button rightSection="→">Right Icon</Button>
          <Button leftSection="←" rightSection="→">
            Both Icons
          </Button>
        </Row>
      </Column>
    );
  },
};
