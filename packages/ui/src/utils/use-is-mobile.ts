import { Accessor, createSignal, onCleanup, onMount } from 'solid-js';

// Breakpoint for mobile and tablets (screens smaller than 11")
// 11" tablets are typically ~1024px wide, so we use 1024px as the breakpoint
const MOBILE_BREAKPOINT = 1024;

function useIsMobile(fallback = false): Accessor<boolean> {
  const [isMobile, setIsMobile] = createSignal(fallback);

  onMount(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    setIsMobile(mql.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mql.addEventListener('change', handleChange);
    onCleanup(() => mql.removeEventListener('change', handleChange));
  });

  return isMobile;
}

export default useIsMobile;

