export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  cgpa: string;
  period: string;
  highlights: string[];
}

const education: EducationItem[] = [
  {
    id: 'galgotias-bca',
    institution: 'Galgotias University',
    degree: 'Bachelor of Computer Applications',
    field: 'BCA',
    cgpa: '8.59 / 10',
    period: '2024 – 2027',
    highlights: [
      'Data Structures & Algorithms',
      'Machine Learning & AI',
      'Web Technologies',
      'Database Management Systems',
    ],
  },
];

export default education;
