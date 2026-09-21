export type SkillIconType = 'simple-icons' | 'lucide';

export interface SkillItem {
  id: string;
  name: string;
  descriptor: string;
  iconType: SkillIconType;
  /** SimpleIcons component name (e.g. 'SiReact') or Lucide component name */
  iconName: string;
  /** Brand hex colour; use '#000000' for concept skills */
  brandColor: string;
}

const skills: SkillItem[] = [
  {
    id: 'python',
    name: 'Python',
    descriptor: 'ML & Scripting',
    iconType: 'simple-icons',
    iconName: 'SiPython',
    brandColor: '#3776AB',
  },
  {
    id: 'react',
    name: 'React',
    descriptor: 'Frontend Development',
    iconType: 'simple-icons',
    iconName: 'SiReact',
    brandColor: '#61DAFB',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    descriptor: 'Full-Stack Framework',
    iconType: 'simple-icons',
    iconName: 'SiNextdotjs',
    brandColor: '#000000',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    descriptor: 'Web Development',
    iconType: 'simple-icons',
    iconName: 'SiTypescript',
    brandColor: '#3178C6',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    descriptor: 'Backend Engineering',
    iconType: 'simple-icons',
    iconName: 'SiFastapi',
    brandColor: '#009688',
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    descriptor: 'ML Frameworks',
    iconType: 'simple-icons',
    iconName: 'SiPytorch',
    brandColor: '#EE4C2C',
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    descriptor: 'Computer Vision',
    iconType: 'simple-icons',
    iconName: 'SiOpencv',
    brandColor: '#5C3EE8',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    descriptor: 'Databases',
    iconType: 'simple-icons',
    iconName: 'SiPostgresql',
    brandColor: '#4169E1',
  },
  {
    id: 'docker',
    name: 'Docker',
    descriptor: 'Containers & DevOps',
    iconType: 'simple-icons',
    iconName: 'SiDocker',
    brandColor: '#2496ED',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    descriptor: 'Version Control',
    iconType: 'simple-icons',
    iconName: 'SiGithub',
    brandColor: '#181717',
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    descriptor: 'Models & Evaluation',
    iconType: 'lucide',
    iconName: 'BrainCircuit',
    brandColor: '#000000',
  },
  {
    id: 'cv',
    name: 'Computer Vision',
    descriptor: 'Detection & Tracking',
    iconType: 'lucide',
    iconName: 'Eye',
    brandColor: '#000000',
  },
  {
    id: 'rag',
    name: 'RAG / LangChain',
    descriptor: 'AI Pipelines',
    iconType: 'lucide',
    iconName: 'Layers',
    brandColor: '#000000',
  },
  {
    id: 'cpp',
    name: 'C++',
    descriptor: 'Object-Oriented Programming',
    iconType: 'simple-icons',
    iconName: 'SiCplusplus',
    brandColor: '#00599C',
  },
  {
    id: 'dsa',
    name: 'Data Structures',
    descriptor: 'Problem Solving',
    iconType: 'lucide',
    iconName: 'GitBranch',
    brandColor: '#000000',
  },
];

export default skills;
