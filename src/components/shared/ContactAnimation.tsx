import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
};

type Connection = {
  a: number;
  b: number;
  weight: number; // visual thickness
};

export default function ContactAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // ── Build a layered neural-network topology ──────────────
    // 3 layers: 4 input, 5 hidden, 3 output nodes
    const LAYERS = [4, 5, 3];
    const nodes: Node[] = [];
    const connections: Connection[] = [];

    const buildNetwork = () => {
      nodes.length = 0;
      connections.length = 0;

      const totalLayers = LAYERS.length;
      LAYERS.forEach((count, li) => {
        for (let ni = 0; ni < count; ni++) {
          const xFrac = (li + 1) / (totalLayers + 1);
          const yFrac = (ni + 1) / (count + 1);
          // Add some organic jitter
          const jx = (Math.random() - 0.5) * 0.06;
          const jy = (Math.random() - 0.5) * 0.06;
          nodes.push({
            x: (xFrac + jx) * W(),
            y: (yFrac + jy) * H(),
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            radius: li === 0 ? 5 : li === totalLayers - 1 ? 6.5 : 4.5,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      });

      // Connect each layer to the next
      let offset = 0;
      for (let li = 0; li < LAYERS.length - 1; li++) {
        const aCount = LAYERS[li];
        const bCount = LAYERS[li + 1];
        for (let ai = 0; ai < aCount; ai++) {
          for (let bi = 0; bi < bCount; bi++) {
            connections.push({
              a: offset + ai,
              b: offset + aCount + bi,
              weight: Math.random() * 0.6 + 0.4,
            });
          }
        }
        offset += aCount;
      }
    };

    buildNetwork();

    // ── Floating signal particles travelling along connections ─
    type Signal = { conn: number; t: number; speed: number };
    const signals: Signal[] = [];
    const MAX_SIGNALS = 12;

    const spawnSignal = () => {
      if (signals.length >= MAX_SIGNALS) return;
      signals.push({
        conn: Math.floor(Math.random() * connections.length),
        t: 0,
        speed: 0.004 + Math.random() * 0.004,
      });
    };

    let frame = 0;
    let raf: number;
    let running = true;

    const draw = () => {
      if (!running) return;
      frame++;
      const isDark = themeRef.current === 'dark';
      const w = W();
      const h = H();

      const ink        = isDark ? '242,242,242' : '17,17,17';
      const bgColor    = isDark ? '#0C0C0C'     : '#E9E9E9';
      const accentGlow = isDark ? '110,231,183' : '4,120,87';  // emerald

      // Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 0.5;
      const gap = 32;
      for (let gx = 0; gx < w; gx += gap) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += gap) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }

      // Drift nodes gently
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        // soft boundary bounce
        if (n.x < 20 || n.x > w - 20) n.vx *= -1;
        if (n.y < 20 || n.y > h - 20) n.vy *= -1;
        n.pulsePhase += 0.018;
      });

      // Draw connections
      connections.forEach(({ a, b, weight }) => {
        const na = nodes[a], nb = nodes[b];
        const alpha = weight * 0.18;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${ink},${alpha})`;
        ctx.lineWidth = weight * 0.8;
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      });

      // Advance + draw signals
      if (frame % 28 === 0) spawnSignal();
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.t += s.speed;
        if (s.t >= 1) { signals.splice(i, 1); continue; }

        const { a, b } = connections[s.conn];
        const na = nodes[a], nb = nodes[b];
        const sx = na.x + (nb.x - na.x) * s.t;
        const sy = na.y + (nb.y - na.y) * s.t;

        // Glow
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 10);
        grad.addColorStop(0, `rgba(${accentGlow},0.9)`);
        grad.addColorStop(1, `rgba(${accentGlow},0)`);
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(sx, sy, 10, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = `rgba(${accentGlow},1)`;
        ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      nodes.forEach(n => {
        const pulse = Math.sin(n.pulsePhase) * 0.5 + 0.5; // 0–1

        // Outer glow ring
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 3);
        glow.addColorStop(0, `rgba(${ink},${0.08 + pulse * 0.06})`);
        glow.addColorStop(1, `rgba(${ink},0)`);
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.arc(n.x, n.y, n.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node fill
        ctx.beginPath();
        ctx.fillStyle = `rgba(${ink},${0.55 + pulse * 0.2})`;
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.fillStyle = `rgba(${ink},0.9)`;
        ctx.arc(n.x - n.radius * 0.25, n.y - n.radius * 0.25, n.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-[12px]"
      style={{ aspectRatio: '400 / 490' }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
