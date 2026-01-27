import type { Component, JSX } from 'solid-js';

interface RowProps {
  children: JSX.Element;
  gap?: string;
  alignItems?: string;
  class?: string;
}

export const Row: Component<RowProps> = (props) => {
  return (
    <div
      class={props.class}
      style={{
        display: 'flex',
        gap: props.gap || '0.5rem',
        'flex-wrap': 'wrap',
        ...(props.alignItems && { 'align-items': props.alignItems }),
      }}
    >
      {props.children}
    </div>
  );
};

interface ColumnProps {
  children: JSX.Element;
  gap?: string;
  class?: string;
}

export const Column: Component<ColumnProps> = (props) => {
  return (
    <div
      class={props.class}
      style={{
        display: 'flex',
        'flex-direction': 'column',
        gap: props.gap || '1rem',
      }}
    >
      {props.children}
    </div>
  );
};
