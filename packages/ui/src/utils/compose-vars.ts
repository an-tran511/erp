import { createMemo, createSignal } from 'solid-js';
import type { Accessor } from 'solid-js';

export type CssVars = Record<`--${string}`, string | undefined>;

export function composeVars(
  ...sources: Array<Accessor<CssVars> | undefined>
): Accessor<CssVars> {
  return createMemo(() => {
    const out: CssVars = {};
    for (const src of sources) {
      if (!src) continue;
      Object.assign(out, src());
    }
    return out;
  });
}
