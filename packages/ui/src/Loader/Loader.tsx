import type { Component } from 'solid-js';
import classes from './Loader.module.css';

export type LoaderProps = {
  size?: string;
  class?: string;
};

export const Loader: Component<LoaderProps> = (props) => {
  const size = props.size || '1rem';

  return (
    <div
      class={props.class}
      style={{
        width: size,
        height: size,
        display: 'inline-block',
      }}
    >
      <svg
        class={classes.icon}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
      >
        <path d='M21 12a9 9 0 1 1-6.219-8.56' />
      </svg>
    </div>
  );
};

