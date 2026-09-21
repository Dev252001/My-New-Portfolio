import { motion } from 'framer-motion';

interface Props {
  children: string;
  className?: string;
}

/**
 * Giant section title that slides in from the left.
 * Usage: <SectionTitle>PROJECTS</SectionTitle>
 */
export default function SectionTitle({ children, className = '' }: Props) {
  return (
    <div className="overflow-hidden">
      <motion.h2
        className={`font-sans font-light uppercase tracking-[-0.02em] leading-[0.85] text-ink
          text-[clamp(2.5rem,11.5vw,14rem)]
          ${className}`}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {children}
      </motion.h2>
    </div>
  );
}
