import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import SectionTitle from './shared/SectionTitle';
import FadeUp from './shared/FadeUp';
import certifications from '../data/certifications';
import type { CertItem } from '../data/certifications';

/* ── Lightbox ───────────────────────────────────── */
function Lightbox({ cert, onClose }: { cert: CertItem; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9980] flex items-center justify-center p-4 md:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />

        {/* Image */}
        <motion.div
          className="relative z-10 max-w-3xl w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            className="w-full rounded-[12px] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
          />

          {/* Info bar below image */}
          <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-sans font-bold text-[15px] text-bg">{cert.title}</p>
              <p className="font-sans text-[13px] text-bg/60">{cert.issuer} · {cert.year}</p>
            </div>
            <div className="flex items-center gap-3">
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-[12px] uppercase tracking-[0.12em]
                    text-bg border border-bg/30 rounded-full px-3 py-1.5
                    hover:bg-bg/10 transition-colors duration-150 flex items-center gap-1.5"
                >
                  Verify <ExternalLink size={12} />
                </a>
              )}
              <button
                onClick={onClose}
                aria-label="Close certificate"
                className="w-8 h-8 rounded-full border border-bg/30 flex items-center
                  justify-center text-bg hover:bg-bg/10 transition-colors duration-150"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Main section ───────────────────────────────── */
export default function Certifications() {
  const [selected, setSelected] = useState<CertItem | null>(null);

  return (
    <>
      <section
        id="certifications"
        className="px-[clamp(20px,4vw,50px)] pt-[clamp(60px,8vw,120px)] pb-[clamp(60px,8vw,120px)]"
      >
        <SectionTitle>CERTIFICATIONS</SectionTitle>

        <FadeUp delay={0.05} className="mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <FadeUp key={cert.id} delay={i * 0.06}>
                <div
                  onClick={() => cert.image && setSelected(cert)}
                  className={`group flex flex-col gap-0 rounded-[12px] bg-surface
                    border border-line overflow-hidden
                    hover:bg-surface-hover transition-colors duration-150
                    shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                    ${cert.image ? 'cursor-pointer' : ''}`}
                >
                  {/* Certificate image preview */}
                  {cert.image && (
                    <div className="w-full aspect-[4/3] overflow-hidden bg-[#e0e0e0] dark:bg-[#222]">
                      <img
                        src={cert.image}
                        alt={`${cert.title} certificate preview`}
                        className="w-full h-full object-cover
                          group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Text info */}
                  <div className="p-5 flex flex-col gap-2">
                    <span className="font-mono font-bold text-[11px] uppercase tracking-[0.14em] text-muted">
                      {cert.year}
                    </span>
                    <p className="font-sans font-bold text-[15px] text-ink leading-snug">
                      {cert.title}
                    </p>
                    <p className="font-sans text-[13px] text-muted leading-snug">
                      {cert.issuer}
                    </p>
                    {cert.image && (
                      <p className="font-mono text-[11px] text-muted uppercase tracking-[0.1em] mt-1">
                        Click to view →
                      </p>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Lightbox */}
      {selected && (
        <Lightbox cert={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
