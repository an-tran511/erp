import type { Component } from 'solid-js';
import {
  Button,
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarSeparator,
} from '@erp/ui';

const App: Component = () => {
  return (
    <SidebarProvider>
      <Sidebar side="left">
        <SidebarHeader>
          <strong>ERP Navigation</strong>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <button type="button">Dashboard</button>
          <button type="button">Orders</button>
          <button type="button">Inventory</button>
          <button type="button">Settings</button>
        </SidebarContent>
        <SidebarFooter>
          <small>v1.0.0</small>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <div
          style={{
            padding: '2rem',
            'min-height': '100vh',
            background: 'var(--vpb-color-slate-1)',
            color: 'var(--vpb-color-slate-12)',
          }}
        >
          <div
            style={{
              display: 'flex',
              'justify-content': 'space-between',
              'align-items': 'center',
              'margin-bottom': '2rem',
              gap: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', 'align-items': 'center', gap: '0.75rem' }}>
              <SidebarTrigger />
              <h1 style={{ margin: 0, 'font-size': '1.5rem' }}>ERP Application</h1>
            </div>
            <Button>Primary action</Button>
          </div>

          <p style={{ color: 'var(--vpb-color-slate-11)' }}>
            Welcome to your ERP application. Component demos are available in{' '}
            <a
              href="http://localhost:6006"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--vpb-color-indigo-9)' }}
            >
              Storybook
            </a>
            .
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default App;
