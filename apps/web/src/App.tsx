import type { Component } from 'solid-js';
import { Button } from '@erp/ui';

const App: Component = () => {
  return (
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
        }}
      >
        <h1 style={{ margin: 0, 'font-size': '1.5rem' }}>ERP Application</h1>
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
  );
};

export default App;
