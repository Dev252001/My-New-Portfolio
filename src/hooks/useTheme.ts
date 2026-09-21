import { useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const applyTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    if (next === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', next);
    setTheme(next);
  }, []);

  const toggle = useCallback(
    (originX?: number, originY?: number) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark';

      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // View Transitions API — browser-native, zero flash
      const vt = (document as any).startViewTransition;

      if (
        !reduced &&
        typeof originX === 'number' &&
        typeof originY === 'number' &&
        typeof vt === 'function'
      ) {
        // Calculate max radius from click point to farthest corner
        const x = originX;
        const y = originY;
        const right = window.innerWidth - x;
        const bottom = window.innerHeight - y;
        const maxRadius = Math.ceil(
          Math.sqrt(Math.max(x, right) ** 2 + Math.max(y, bottom) ** 2)
        );

        // Set CSS custom props so the keyframe can read them
        const root = document.documentElement;
        root.style.setProperty('--vt-x', `${x}px`);
        root.style.setProperty('--vt-y', `${y}px`);
        root.style.setProperty('--vt-r', `${maxRadius}px`);
        root.setAttribute('data-theme-dir', next);

        const transition = (document as any).startViewTransition(() => {
          applyTheme(next);
        });

        transition.ready.catch(() => {
          // Fallback if transition fails
          applyTheme(next);
        });
      } else {
        applyTheme(next);
      }
    },
    [theme, applyTheme]
  );

  // ripple is no longer used — kept for API compatibility
  return { theme, toggle, ripple: null };
}
