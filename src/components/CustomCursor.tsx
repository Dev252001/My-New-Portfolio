import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'click';

/**
 * Custom cursor — minimal dot + spring-lagged ring.
 * States:
 *   default → small dot + thin ring
 *   hover   → dot shrinks, ring expands + soft fill glow
 *   click   → ring snaps inward + dot pulses
 *
 * Only rendered on devices that have a fine pointer (mouse/trackpad).
 * Falls back to native cursor on touch devices.
 */
export default function CustomCursor() {
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const [hasFinePointer] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Raw position — dot follows instantly
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  // Lagging spring — ring trails behind
  const springConfig = { stiffness: 200, damping: 25, mass: 0.5 };
  const ringX = useSpring(rawX, springConfig);
  const ringY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (!hasFinePointer) return;

    // Kill native cursor site-wide
    document.documentElement.style.cursor = 'none';
    // Kill it on all interactive elements too
    const styleTag = document.createElement('style');
    styleTag.id = 'custom-cursor-style';
    styleTag.textContent = '*, *::before, *::after { cursor: none !important; }';
    document.head.appendChild(styleTag);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const isInteractive = (el: EventTarget | null) =>
      !!(el as HTMLElement)?.closest('a, button, [role="button"], [role="tab"], input, textarea, select, label');

    const onOver = (e: MouseEvent) => {
      if (state !== 'click') {
        setState(isInteractive(e.target) ? 'hover' : 'default');
      }
    };

    const onDown = () => setState('click');
    const onUp = (e: MouseEvent) => {
      setState(isInteractive(e.target) ? 'hover' : 'default');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      document.documentElement.style.cursor = '';
      document.getElementById('custom-cursor-style')?.remove();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [hasFinePointer, rawX, rawY, state]);

  // Don't render on touch devices
  if (!hasFinePointer) return null;

  // Hide entirely when cursor leaves the window — use display:none to avoid
  // spring-lagged ring lingering at old position while fading to opacity:0
  if (!visible) return null;

  return (
    <>
      {/* ── Inner dot — follows instantly ─────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          borderRadius: '50%',
          backgroundColor: 'var(--ink)',
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={
          state === 'default' ? { width: 6,  height: 6,  opacity: 1   } :
          state === 'hover'   ? { width: 4,  height: 4,  opacity: 0.6 } :
                                { width: 10, height: 10, opacity: 1   }
        }
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />

      {/* ── Outer ring — spring-lagged ────────────── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9998,
          pointerEvents: 'none',
          borderRadius: '50%',
          border: '1.5px solid var(--ink)',
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={
          state === 'default' ? { width: 34, height: 34, opacity: 0.5, scale: 1   } :
          state === 'hover'   ? { width: 50, height: 50, opacity: 0.9, scale: 1   } :
                                { width: 26, height: 26, opacity: 1,   scale: 0.9 }
        }
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── Soft radial glow on hover ─────────────── */}
      <AnimatePresence>
        {state === 'hover' && visible && (
          <motion.div
            key="glow"
            aria-hidden="true"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 9997,
              pointerEvents: 'none',
              borderRadius: '50%',
              width: 90,
              height: 90,
              background: 'radial-gradient(circle, var(--ink) 0%, transparent 65%)',
              x: ringX,
              y: ringY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.07, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
