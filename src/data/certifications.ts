export interface CertItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  /** Optional: path to certificate image in /public/certificates/ */
  image?: string;
  /** Optional: link to verify the certificate online */
  verifyUrl?: string;
}

const certifications: CertItem[] = [
  {
    id: 'ibm-ai-fundamentals',
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    year: '2026',
    image: '/certificates/ibm-ai-fundamentals.jpg',
  },
  {
    id: 'edunet-ai',
    title: 'Artificial Intelligence',
    issuer: 'Edunet Foundation × IBM SkillsBuild',
    year: '2026',
    image: '/certificates/edunet-ai.jpg',
  },
  {
    id: 'oracle-sql',
    title: 'Database Programming with SQL',
    issuer: 'Oracle Academy × Galgotias University',
    year: '2024',
    image: '/certificates/oracle-sql.jpg',
  },
  {
    id: 'dsa-cert',
    title: 'Data Structures and Algorithms',
    issuer: 'TheCodingAdda / Rohit Negi',
    year: '2024',
    image: '/certificates/dsa-cert.jpg',
  },
  {
    id: 'fullstack-udemy',
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy / Angela Yu',
    year: '2024',
    image: '/certificates/fullstack-udemy.jpg',
  },
  {
    id: 'nptel-ebusiness',
    title: 'E-Business',
    issuer: 'NPTEL',
    year: '2024',
    image: '/certificates/nptel-ebusiness.jpg',
  },
];

export default certifications;
