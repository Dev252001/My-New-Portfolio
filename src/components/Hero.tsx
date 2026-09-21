import { useRef, useState } from 'react';
import type React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useFitText } from '../hooks/useFitText';
import type { SiteData } from '../data/site';

interface Props {
  hero: SiteData['hero'];
}

/* ── Wave hover letter ─────────────────────────── */
function WaveLetter({
  char,
  globalIndex,
  hoveredIndex,
  onHover,
  onLeave,
  entryDelay,
}: {
  char: string;
  globalIndex: number;
  hoveredIndex: number | null;
  onHover: (i: number) => void;
  onLeave: () => void;
  entryDelay: number;
}) {
  const distance = hoveredIndex !== null ? Math.abs(globalIndex - hoveredIndex) : null;
  const waveY =
    distance === null ? 0
    : distance === 0 ? -28
    : distance === 1 ? -14
    : distance === 2 ? -6
    : 0;

  return (
    <motion.span
      className="inline-block cursor-default"
      initial={{ y: '110%', opacity: 0 }}
      animate={{ y: waveY, opacity: 1 }}
      transition={
        distance === null
          ? { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: entryDelay }
          : { type: 'spring', stiffness: 400, damping: 22, mass: 0.6 }
      }
      onHoverStart={() => onHover(globalIndex)}
      onHoverEnd={onLeave}
    >
      {char}
    </motion.span>
  );
}

/* ── Staggered name reveal + wave hover ────────── */
function AnimatedName({ text }: { text: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const words = text.split(' ');

  // Build flat char list with global indices
  const allChars: { char: string; wi: number; ci: number; globalIndex: number }[] = [];
  let g = 0;
  for (let wi = 0; wi < words.length; wi++) {
    for (let ci = 0; ci < words[wi].length; ci++) {
      allChars.push({ char: words[wi][ci], wi, ci, globalIndex: g++ });
    }
  }

  return (
    <span className="inline-block whitespace-nowrap select-none">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-visible mr-[0.25em] last:mr-0">
          {allChars
            .filter((c) => c.wi === wi)
            .map(({ char, ci, globalIndex }) => (
              <WaveLetter
                key={ci}
                char={char}
                globalIndex={globalIndex}
                hoveredIndex={hoveredIndex}
                onHover={setHoveredIndex}
                onLeave={() => setHoveredIndex(null)}
                entryDelay={(wi * word.length + ci) * 0.03}
              />
            ))}
        </span>
      ))}
    </span>
  );
}

/* ── Drifting radial glow ──────────────────────── */
function Glow({ x, y, color, delay }: { x: string; y: string; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        opacity: 0.25,
      }}
      animate={{ x: [0, 20, -15, 0], y: [0, -15, 20, 0] }}
      transition={{ duration: 14 + delay * 3, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

export default function Hero({ hero }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useFitText(0.95);

  // Parallax for portrait
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Reduced motion check
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative pt-28 md:pt-32 px-[clamp(20px,4vw,50px)]"
    >
      {/* ── Drifting glows (clipped to hero section) ── */}
      {!reduced && (
        <div
          className="pointer-events-none"
          style={{
            position: 'absolute', inset: 0,
            overflow: 'hidden', zIndex: 0,
          }}
          aria-hidden="true"
        >
          <Glow x="10%" y="30%" color="rgba(180,200,255,0.6)" delay={0} />
          <Glow x="55%" y="20%" color="rgba(200,230,200,0.5)" delay={2} />
          <Glow x="75%" y="50%" color="rgba(220,200,240,0.5)" delay={4} />
        </div>
      )}

      {/* ── Giant name ───────────────────────────── */}
      <div className="relative z-10 w-full">
        <h1
          ref={nameRef as React.RefObject<HTMLHeadingElement>}
          className="font-sans font-extrabold uppercase leading-[0.9] text-ink
            whitespace-nowrap text-center select-none w-full block"
          style={{ letterSpacing: '-0.03em', fontSize: '10vw' }}
        >
          {reduced ? hero.name : <AnimatedName text={hero.name} />}
        </h1>
      </div>

      {/* ── 1px hairline ─────────────────────────── */}
      <motion.div
        className="w-full h-px bg-line mt-6 mb-6"
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* ── Meta row ─────────────────────────────── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[15px] font-medium pb-12 md:pb-16 text-center sm:text-left"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        {/* Left */}
        <div className="sm:text-left text-ink">
          <p>{hero.metaLeft.line1}</p>
          {hero.metaLeft.line2 && <p>{hero.metaLeft.line2}</p>}
        </div>
        {/* Centre */}
        <div className="sm:text-center text-ink">
          <p>{hero.metaCenter.line1}</p>
          <p>{hero.metaCenter.line2}</p>
        </div>
        {/* Right */}
        <div className="sm:text-right text-ink">
          <p>{hero.metaRight.line1}</p>
          <p>{hero.metaRight.line2}</p>
        </div>
      </motion.div>

      {/* ── Tagline ──────────────────────────────── */}
      <motion.p
        className="text-ink text-center mx-auto font-sans font-normal
          text-[clamp(1.75rem,2.6vw,3.25rem)] leading-[1.25] max-w-[1000px]
          px-[clamp(20px,4vw,50px)] mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        {hero.tagline.before}
        <a
          href={hero.tagline.linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted link-underline link-underline-thick inline-block"
        >
          {hero.tagline.linkText}
        </a>
        {hero.tagline.after}
      </motion.p>

      {/* ── CTA row ──────────────────────────────── */}
      <motion.div
        className="flex items-center justify-center gap-6 mb-16 flex-wrap"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.25 }}
      >
        {/* Status pill */}
        <div
          className="flex items-center gap-2 border border-line rounded-full
            px-4 py-2 text-[13px] font-bold uppercase tracking-[0.12em] text-ink"
        >
          <span className="relative flex h-2 w-2">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: 'var(--status-green)' }}
            />
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: 'var(--status-green)' }}
            />
          </span>
          {hero.status.label}
        </div>

        {/* Resume link */}
        <a
          href={hero.status.resumeHref}
          className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink
            border-b border-ink pb-px link-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          RESUME
        </a>

        {/* Contact link */}
        <a
          href={hero.status.contactHref}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink
            border-b border-ink pb-px link-underline"
        >
          CONTACT
        </a>
      </motion.div>

      {/* ── Portrait ─────────────────────────────── */}
      <div className="flex justify-center mb-0 overflow-hidden">
        <motion.div
          style={{ y: reduced ? 0 : portraitY }}
          className="w-[clamp(280px,30vw,430px)] overflow-hidden"
          initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/images/portrait.png"
            alt="Portrait of Devashish Pandey"
            className="w-full aspect-[4/5] object-cover"
            loading="eager"
            onError={(e) => {
              // Show SVG placeholder if image not found
              const t = e.currentTarget;
              t.style.display = 'none';
              const next = t.nextElementSibling as HTMLElement;
              if (next) next.style.display = 'block';
            }}
          />
          {/* Fallback placeholder shown via JS if portrait.jpg missing */}
          <div
            style={{ display: 'none' }}
            className="w-full aspect-[4/5] bg-surface flex items-center justify-center"
            aria-label="Portrait placeholder with initials DP"
          >
            <span
              className="font-sans font-bold text-[5rem] tracking-[-0.04em] text-muted"
            >
              DP
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
