import { motion } from 'framer-motion';
import type { SkillItem } from '../../data/skills';

// Simple Icons
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiPytorch,
  SiOpencv,
  SiPostgresql,
  SiDocker,
  SiGithub,
  SiCplusplus,
} from 'react-icons/si';

// Lucide icons for concept skills
import { BrainCircuit, Layers, Eye, GitBranch } from 'lucide-react';

const SI_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiFastapi,
  SiPytorch,
  SiOpencv,
  SiPostgresql,
  SiDocker,
  SiGithub,
  SiCplusplus,
};

const LUCIDE_MAP: Record<string, React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>> = {
  BrainCircuit,
  Layers,
  Eye,
  GitBranch,
};

interface Props {
  skill: SkillItem;
  index: number;
}

export default function SkillTile({ skill, index }: Props) {
  const IconComponent =
    skill.iconType === 'simple-icons'
      ? SI_MAP[skill.iconName]
      : LUCIDE_MAP[skill.iconName];

  // Always show white icon — it sits on the brand-colour background
  // Exception: very light brand colours (React cyan, Python yellow-ish) need a dark icon
  const lightBrands = ['#61DAFB', '#F7DF1E'];
  const iconColor = lightBrands.includes(skill.brandColor) ? '#111111' : '#ffffff';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.04 }}
      whileHover={{ y: -2 }}
      className="flex items-center gap-3 px-[14px] py-[14px] rounded-[6px]
        bg-surface hover:bg-surface-hover
        shadow-[0_2px_8px_rgba(0,0,0,0.05)]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
        transition-colors duration-150 cursor-default"
    >
      {/* Icon square */}
      <div
        className="flex-shrink-0 w-11 h-11 rounded-[8px] flex items-center justify-center"
        style={{ backgroundColor: skill.brandColor }}
        aria-hidden="true"
      >
        {IconComponent ? (
          <IconComponent size={22} color={iconColor} />
        ) : (
          <span className="text-white font-bold text-xs">
            {skill.name.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="font-sans font-bold text-[16px] text-ink leading-tight truncate">
          {skill.name}
        </p>
        <p className="font-sans text-[14px] text-muted leading-tight mt-0.5 truncate">
          {skill.descriptor}
        </p>
      </div>
    </motion.div>
  );
}
