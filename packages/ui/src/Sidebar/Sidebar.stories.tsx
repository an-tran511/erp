import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarSeparator,
} from './Sidebar';

const meta: Meta<typeof SidebarProvider> = {
  title: 'Components/Sidebar',
  component: SidebarProvider,
};

export default meta;

type Story = StoryObj<typeof SidebarProvider>;

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar side='left'>
        <SidebarHeader>
          <strong>Navigation</strong>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <button type='button'>Dashboard</button>
          <button type='button'>Projects</button>
          <button type='button'>Settings</button>
        </SidebarContent>
        <SidebarFooter>
          <small>v1.0.0</small>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div style={{ padding: '1rem', display: 'flex', 'flex-direction': 'column', gap: '0.75rem' }}>
          <SidebarTrigger />
          <h1>Sidebar layout</h1>
          <p>
            Resize the viewport to see the sidebar switch between a fixed panel on desktop
            and a drawer-style overlay on mobile.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
};

