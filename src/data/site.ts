export interface SiteData {
  title: string;
  description: string;
  ogImage: string;
  nav: {
    name: string;
    links: { label: string; href: string }[];
  };
  hero: {
    name: string;
    metaLeft: { line1: string; line2: string };
    metaCenter: { line1: string; line2: string };
    metaRight: { line1: string; line2: string };
    tagline: {
      before: string;
      linkText: string;
      linkHref: string;
      after: string;
    };
    status: {
      label: string;
      resumeHref: string;
      contactHref: string;
    };
  };
  about: {
    statement: string;
    details: { label: string; value: string }[];
  };
  contact: {
    city: string;
    email: string;
    linkedin: string;
    github: string;
    x?: string;
  };
  footer: { name: string };
  githubUsername: string;
}

const site: SiteData = {
  title: 'Devashish Pandey | AI/ML & Full-Stack Developer',
  description:
    'BCA student at Galgotias University building practical AI systems — from computer vision pipelines to RAG-powered study tools and full-stack web apps.',
  ogImage: '/og-image.png',

  nav: {
    name: 'Devashish Pandey',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Experience', href: '#experience' },
      { label: 'Education', href: '#education' },
      { label: 'Skills', href: '#skills' },
      { label: 'GitHub', href: '#github' },
      { label: 'Contact', href: '#contact' },
    ],
  },

  hero: {
    name: 'DEVASHISH PANDEY',
    metaLeft: {
      line1: 'AI/ML & Full-Stack Developer',
      line2: '',
    },
    metaCenter: {
      line1: 'Based in',
      line2: 'Greater Noida, India',
    },
    metaRight: {
      line1: 'Open to',
      line2: 'Internships & Research',
    },
    tagline: {
      before: '[An AI/ML & full-stack ',
      linkText: 'developer',
      linkHref: 'https://github.com/Dev252001',
      after:
        ' ↗ from India, building intelligent products where machine learning meets clean design and scalable web engineering.]',
    },
    status: {
      label: 'OPEN TO OPPORTUNITIES',
      resumeHref: '/resume.pdf',
      contactHref: '#contact',
    },
  },

  about: {
    statement:
      "I'm a BCA student at Galgotias University (CGPA 8.59), graduating in 2027. I build machine-learning systems and full-stack products — from a CNN skin-lesion classifier on HAM10000 to a real-time driver-monitoring pipeline and a RAG-powered study platform. I work across the full stack: data preprocessing, model training, backend APIs, and user-facing web apps.",
    details: [
      { label: 'Education', value: 'BCA, Galgotias University — CGPA 8.59 (2027)' },
      { label: 'Focus', value: 'Machine learning, computer vision, NLP, full-stack web' },
      { label: 'Goal', value: 'MS in AI/ML · Applied ML Engineer' },
      { label: 'Currently', value: 'Exploring RAG systems & applying for AI/ML internships' },
    ],
  },

  contact: {
    city: 'Greater Noida',
    email: 'devpandey252001@gmail.com',
    linkedin: 'https://linkedin.com/in/devashish-pandey-806062230',
    github: 'https://github.com/Dev252001',
  },

  footer: {
    name: 'Devashish Pandey',
  },

  githubUsername: 'Dev252001',
};

export default site;
