import { motion } from 'framer-motion';
import ProjectScreenshot from '../shared/ProjectScreenshot';
import type { ProjectItem } from '../../data/projects';
import { SiGithub, SiFigma } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';

interface Props {
  project: ProjectItem;
  index: number;
}

/* ── Clean autoplay video — no controls ───────── */
function VideoPlayer({ src, label }: { src: string; label: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[12px] group">
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        aria-label={label}
      />
      {/* Subtle DEMO badge on hover */}
      <motion.div
        className="absolute top-3 right-3 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.14em]
          text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
          DEMO
        </span>
      </motion.div>
    </div>
  );
}

/* ── Project card ──────────────────────────────── */
export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
      className="flex flex-col"
    >
      {/* Media card */}
      <motion.div
        className="relative w-full rounded-[12px] overflow-hidden
          bg-[#F0EEE9] dark:bg-[#1a1a1a]
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        whileHover={{ boxShadow: '0 16px 40px rgba(0,0,0,0.13)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {project.videoUrl ? (
          <VideoPlayer src={project.videoUrl} label={`${project.title} demo`} />
        ) : (
          <div className="aspect-video flex items-center justify-center p-6">
            <motion.div
              className="w-[70%] rounded-lg overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ProjectScreenshot aspectRatio="16/9" label={`${project.title} screenshot`} />
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Below-card info */}
      <div className="mt-4 flex flex-col gap-1">
        {/* Row 1: title + tag */}
        <div className="flex items-start justify-between gap-4">
          <h3
            className="font-sans font-light uppercase tracking-[-0.01em] text-ink leading-tight
              text-[clamp(1rem,2vw,1.5rem)]"
          >
            {project.title}
          </h3>
          <span
            className="flex-shrink-0 font-mono font-bold text-[13px] uppercase tracking-[0.12em]
              bg-surface text-ink rounded-[6px] px-2 py-1 mt-0.5"
          >
            {project.tag}
          </span>
        </div>

        {/* Row 2: description */}
        <p className="font-sans text-[18px] text-muted leading-snug">
          {project.description}
        </p>

        {/* Row 3: icon links */}
        <div className="flex items-center gap-3 mt-1">
          {project.githubUrl && !project.githubUrl.startsWith('[') && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="text-ink opacity-60 hover:opacity-100 transition-opacity duration-150
                focus-visible:outline-ink"
            >
              <SiGithub size={18} />
            </a>
          )}
          {project.demoUrl && !project.demoUrl.startsWith('[') && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="text-ink opacity-60 hover:opacity-100 transition-opacity duration-150
                focus-visible:outline-ink"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {project.figmaUrl && !project.figmaUrl.startsWith('[') && (
            <a
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} Figma file`}
              className="text-ink opacity-60 hover:opacity-100 transition-opacity duration-150
                focus-visible:outline-ink"
            >
              <SiFigma size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
