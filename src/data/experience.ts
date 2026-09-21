export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  description: string;
  date: string;
}

const experience: ExperienceItem[] = [
  {
    id: 'edunet',
    company: 'Edunet Foundation × AICTE',
    role: 'Artificial Intelligence Intern',
    description:
      'Selected for the AICTE-backed IBM SkillsBuild AI internship. Built an AI-based project under mentor guidance, working with machine learning workflows from data prep through model evaluation over a structured 6-week programme.',
    date: 'Jul 2026 – Aug 2026',
  },
  {
    id: 'eduzent',
    company: 'Eduzent',
    role: 'Full Stack Web Development Intern',
    description:
      'Developed responsive full-stack web applications, gaining hands-on experience with frontend and backend workflows, project structure, and deployment.',
    date: '2025',
  },
  {
    id: 'sih',
    company: 'Smart India Hackathon',
    role: 'Participant — Pre-Qualifier',
    description:
      'Qualified for the pre-qualifier round with EcoGround, a gamified environmental-education platform built with Next.js, Prisma, and PostgreSQL.',
    date: '2025',
  },
];

export default experience;
