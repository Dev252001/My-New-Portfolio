import { motion } from 'framer-motion';
import type { ExperienceItem } from '../../data/experience';

interface Props {
  item: ExperienceItem;
  index: number;
}

export default function ExperienceRow({ item, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.1 }}
    >
      {/* Hairline above every row */}
      <div className="w-full h-px bg-line" aria-hidden="true" />

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 py-10">
        {/* Left: company + role + description */}
        <div className="flex flex-col gap-2 max-w-[30rem]">
          <p className="font-sans font-bold text-ink text-[clamp(1.4rem,2vw,2rem)] leading-tight">
            {item.company}
          </p>
          <p className="font-sans font-semibold text-ink text-[1.1rem] leading-snug">
            {item.role}
          </p>
          {/* Date shown under role on mobile */}
          <p className="font-mono font-bold text-ink text-[13px] uppercase tracking-[0.12em] sm:hidden">
            {item.date}
          </p>
          <p className="font-sans text-muted text-[16px] leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Right: date — hidden on mobile, shown on sm+ */}
        <p className="hidden sm:block font-mono font-bold text-ink text-[13px] uppercase tracking-[0.12em]
          whitespace-nowrap text-right flex-shrink-0 mt-1">
          {item.date}
        </p>
      </div>
    </motion.div>
  );
}
