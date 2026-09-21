import { useEffect, useRef, useCallback } from 'react';

/**
 * Fits text to a fraction of the viewport width using a hidden clone.
 * Cloning avoids measuring Framer Motion animated spans before they settle.
 */
export function useFitText(targetRatio = 0.98) {
  const ref = useRef<HTMLElement>(null);

  const fit = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Use viewport width as the basis so it's independent of parent layout
    const maxWidth = window.innerWidth * targetRatio;

    // Create a hidden clone with the same font styling to measure raw text width
    const clone = el.cloneNode(true) as HTMLElement;
    clone.style.position = 'fixed';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    clone.style.visibility = 'hidden';
    clone.style.whiteSpace = 'nowrap';
    clone.style.fontSize = '100px';
    clone.style.width = 'auto';
    clone.style.maxWidth = 'none';
    // Strip framer-motion transforms from child spans
    clone.style.transform = 'none';
    clone.querySelectorAll('span').forEach((s) => {
      s.style.transform = 'none';
      s.style.opacity = '1';
    });
    document.body.appendChild(clone);

    const baseWidth = clone.scrollWidth; // width at 100px
    document.body.removeChild(clone);

    if (baseWidth === 0) return;

    // Scale: if 100px font-size gives baseWidth px, we want maxWidth px
    const fontSize = Math.floor((100 * maxWidth) / baseWidth);
    el.style.fontSize = `${Math.min(fontSize, 800)}px`;
  }, [targetRatio]);

  useEffect(() => {
    // Run immediately and after a short delay (after first paint)
    fit();
    const t = setTimeout(fit, 50);
    const t2 = setTimeout(fit, 200);

    const ro = new ResizeObserver(fit);
    ro.observe(document.documentElement);

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      ro.disconnect();
    };
  }, [fit]);

  return ref;
}
