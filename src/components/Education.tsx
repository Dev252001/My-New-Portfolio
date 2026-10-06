import { motion } from 'framer-motion';

import SectionTitle from './shared/SectionTitle';
import education from '../data/education';

export default function Education() {
  return (
    <section
      id="education"
      className="px-[clamp(20px,4vw,50px)] pt-[clamp(80px,12vw,160px)] pb-[clamp(80px,12vw,160px)]"
    >
      {/* Giant title */}
      <SectionTitle>EDUCATION</SectionTitle>

      {/* Education rows */}
      <div>
        {education.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.1 }}
          >
            {/* Hairline above row */}
            <div className="w-full h-px bg-line" aria-hidden="true" />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 py-10">

              {/* Left: institution + degree + highlights */}
              <div className="flex flex-col gap-3 max-w-[36rem]">
                <p className="font-sans font-bold text-ink text-[clamp(1.4rem,2vw,2rem)] leading-tight">
                  {item.institution}
                </p>
                <p className="font-sans font-semibold text-ink text-[1.1rem] leading-snug">
                  {item.degree} <span className="text-muted font-normal">({item.field})</span>
                </p>

                {/* CGPA pill + period on mobile */}
                <div className="flex items-center gap-3 sm:hidden flex-wrap">
                  <span className="font-mono font-bold text-[13px] uppercase tracking-[0.12em] text-ink">
                    {item.period}
                  </span>
                  <span
                    className="font-mono font-bold text-[13px] uppercase tracking-[0.1em]
                      border border-line rounded-full px-3 py-1 text-ink"
                  >
                    CGPA {item.cgpa}
                  </span>
                </div>

                {/* Course highlights */}
                <ul className="flex flex-wrap gap-2 mt-1">
                  {item.highlights.map((h) => (
                    <li
                      key={h}
                      className="font-mono text-[11px] uppercase tracking-[0.1em]
                        text-muted border border-line rounded-[4px] px-2 py-1"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: period + CGPA — sm+ only */}
              <div className="hidden sm:flex flex-col items-end gap-2 flex-shrink-0 mt-1">
                <p className="font-mono font-bold text-ink text-[13px] uppercase tracking-[0.12em] whitespace-nowrap">
                  {item.period}
                </p>
                <span
                  className="font-mono font-bold text-[13px] uppercase tracking-[0.1em]
                    border border-line rounded-full px-3 py-1 text-ink whitespace-nowrap"
                >
                  CGPA {item.cgpa}
                </span>
              </div>

            </div>
          </motion.div>
        ))}

        {/* Closing hairline */}
        <div className="w-full h-px bg-line" aria-hidden="true" />
      </div>
    </section>
  );
}
