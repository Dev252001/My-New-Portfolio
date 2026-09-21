import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

/**
 * A slim full-width achievement strip — sits between About and Projects.
 * Highlights the Smart India Hackathon Pre-Qualifier win.
 */
export default function AchievementBadge() {
  return (
    <motion.div
      className="w-full border-t border-b border-line px-[clamp(20px,4vw,50px)] py-5
        flex items-center gap-4 bg-surface"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-9 h-9 rounded-[6px] bg-ink flex items-center justify-center">
        <Trophy size={16} className="text-bg" />
      </div>

      {/* Text */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
        <span className="font-mono font-bold text-[12px] uppercase tracking-[0.14em] text-ink whitespace-nowrap">
          Smart India Hackathon 2025
        </span>
        <span className="hidden sm:block text-line font-thin">|</span>
        <span className="font-sans text-[14px] text-muted">
          Pre-Qualifier Round Qualified · EcoGround project
        </span>
      </div>

      {/* Year chip */}
      <span className="ml-auto flex-shrink-0 font-mono font-bold text-[11px] uppercase
        tracking-[0.12em] text-muted">
        2025
      </span>
    </motion.div>
  );
}
