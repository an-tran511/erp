import { Accessor, createSignal } from 'solid-js';

export type PressStateResult = {
  isPressed: Accessor<boolean>;
  handleClickFallback: () => void;
  handlePointerDown: (event: PointerEvent) => void;
  handlePointerUp: (event: PointerEvent) => void;
  handlePointerCancel: (event: PointerEvent) => void;
  handlePointerLeave: () => void;
};

export const usePressState = (
  isInteractive: () => boolean
): PressStateResult => {
  const [pressed, setPressed] = createSignal(false);

  const reset = () => setPressed(false);

  const handleClickFallback = () => {
    if (!isInteractive() || pressed()) return;
    setPressed(true);
    requestAnimationFrame(() => {
      setTimeout(reset, 100);
    });
  };

  const handlePointerDown = () => {
    if (!isInteractive()) return;
    setPressed(true);
  };

  const handlePointerUp = () => {
    reset();
  };

  const handlePointerCancel = () => {
    reset();
  };

  const handlePointerLeave = () => {
    reset();
  };

  return {
    isPressed: pressed,
    handleClickFallback,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handlePointerLeave,
  };
};
