import ProjectScreenshot from '../shared/ProjectScreenshot';
import type { ProjectItem } from '../../data/projects';
import { SiGithub } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';

interface Props {
  project: ProjectItem;
}

export default function FeaturedProjectCard({ project }: Props) {
  return (
    <div
      className="mx-auto w-full md:max-w-[60%] rounded-[24px] overflow-hidden
        bg-[#CBCBCB] dark:bg-[#1E1E1E]
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        transition-shadow duration-300 hover:shadow-[0_16px_50px_rgba(0,0,0,0.14)]"
    >
      {/* Laptop frame area */}
      <div className="p-6 pb-4">
        <div className="rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          <ProjectScreenshot aspectRatio="16/9" label={`${project.title} screenshot`} />
        </div>
      </div>

      {/* Card footer: title, description, tag + links */}
      <div className="px-6 pb-7 flex flex-col gap-3">
        {/* Title */}
        <h3 className="font-sans font-light uppercase tracking-[-0.01em] text-ink
          text-[clamp(1rem,1.8vw,1.5rem)] leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-[15px] leading-relaxed text-muted max-w-[520px]">
          {project.description}
        </p>

        {/* Tag pill + icon links */}
        <div className="flex items-center gap-3 mt-1">
          <span
            className="font-mono font-bold text-[12px] uppercase tracking-[0.12em]
              bg-[rgba(0,0,0,0.12)] dark:bg-[rgba(255,255,255,0.1)]
              text-ink rounded-full px-3 py-1"
          >
            {project.tag}
          </span>

          {project.githubUrl && !project.githubUrl.startsWith('[') && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="text-ink opacity-70 hover:opacity-100 transition-opacity duration-150"
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
              className="text-ink opacity-70 hover:opacity-100 transition-opacity duration-150"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
