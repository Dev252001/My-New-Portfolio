export type ProjectTag = 'AI/ML' | 'Web';

export interface ProjectItem {
  id: string;
  title: string;
  tag: ProjectTag;
  description: string;
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  figmaUrl?: string;
  /** Path to a demo video in /public/videos/ e.g. '/videos/driver-monitoring.mp4' */
  videoUrl?: string;
}

const projects: ProjectItem[] = [
  {
    id: 'driver-monitoring',
    title: 'DRIVER MONITORING SYSTEM',
    tag: 'AI/ML',
    description:
      'Real-time computer vision system detecting drowsiness and distraction via EAR blink analysis, gaze tracking, and head-pose estimation with per-user calibration.',
    featured: true,
    githubUrl: 'https://github.com/Dev252001/AI-Based-Smart-Driver-Monitoring-System',
  },
  {
    id: 'skin-lesion',
    title: 'SKIN LESION CLASSIFIER',
    tag: 'AI/ML',
    description:
      'EfficientNet-B0 and ResNet18 on HAM10000 — 10,015 dermoscopic images, 7 classes, macro-F1 0.77, melanoma recall 0.83.',
    githubUrl: 'https://github.com/Dev252001/HAM10000-Skin-Lesion-Classifier',
  },
  {
    id: 'study-buddy',
    title: 'STUDY BUDDY AI',
    tag: 'AI/ML',
    description:
      'RAG-powered study platform: upload PDFs, DOCX, PPTX and chat with your documents, auto-generate quizzes, flashcards and summaries.',
    githubUrl: 'https://github.com/Dev252001/Study-Buddy-AI',
    videoUrl: '/videos/study-buddy.mp4',
  },
];

export default projects;
