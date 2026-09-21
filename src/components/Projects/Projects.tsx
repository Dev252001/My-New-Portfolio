import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../shared/SectionTitle';
import FadeUp from '../shared/FadeUp';
import FeaturedProjectCard from './FeaturedProjectCard';
import ProjectCard from './ProjectCard';
import projects from '../../data/projects';
import type { ProjectTag } from '../../data/projects';
import site from '../../data/site';

type FilterTab = 'ALL' | ProjectTag;

const TABS: { label: string; value: FilterTab }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: '[AI/ML]', value: 'AI/ML' },
  { label: '[Web]', value: 'Web' },
];

// Note: projects data now has 4 AI/ML + 1 Web entries

export default function Projects() {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL');

  const featured = projects.find((p) => p.featured)!;

  const gridProjects = projects
    .filter((p) => !p.featured)
    .filter((p) => activeTab === 'ALL' || p.tag === activeTab);

  // Also filter featured out if tab doesn't match
  const showFeatured = activeTab === 'ALL' || featured.tag === activeTab;

  return (
    <section
      id="projects"
      className="px-[clamp(20px,4vw,50px)] pt-[clamp(80px,12vw,160px)] pb-[clamp(80px,12vw,160px)]"
    >
      {/* Giant title */}
      <SectionTitle>PROJECTS</SectionTitle>

      {/* Filter tabs */}
      <FadeUp delay={0.1}>
        <div
          className="flex items-center gap-6 mt-6"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {TABS.map(({ label, value }) => (
            <button
              key={value}
              role="tab"
              aria-selected={activeTab === value}
              onClick={() => setActiveTab(value)}
              className={`font-mono font-bold text-[13px] uppercase tracking-[0.12em]
                transition-colors duration-150 relative pb-1
                ${activeTab === value
                  ? 'text-ink after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-ink'
                  : 'text-muted hover:text-ink'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </FadeUp>

      {/* Hairline below tabs */}
      <div className="w-full h-px bg-line mt-6 mb-12" aria-hidden="true" />

      {/* ── Featured project ─────────────────────── */}
      <AnimatePresence mode="wait">
        {showFeatured && (
          <motion.div
            key="featured"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <FeaturedProjectCard project={featured} />
          </motion.div>
        )}
      </AnimatePresence>


      {/* ── 2-column grid ───────────────────────── */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(32px,4vw,60px)]"
      >
        <AnimatePresence>
          {gridProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {!showFeatured && gridProjects.length === 0 && (
        <FadeUp>
          <p className="text-muted text-center py-16 font-sans text-[18px]">
            No projects in this category yet.
          </p>
        </FadeUp>
      )}

      {/* VIEW MORE PROJECTS */}
      <FadeUp delay={0.15}>
        <div className="flex justify-center mt-16">
          <a
            href={`https://github.com/${site.githubUsername}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-bold text-[13px] uppercase tracking-[0.12em] text-ink
              border-b border-ink pb-px link-underline
              hover:text-muted transition-colors duration-150"
          >
            VIEW MORE PROJECTS
          </a>
        </div>
      </FadeUp>
    </section>
  );
}
