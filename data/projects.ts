export type Project = {
  id: number;
  title: string;
  description: string;
  fullGuide: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  isFeatured: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    title: 'Faran Traders Management',
    description: 'A modern trade management system for inventory, sales, procurement, and operational visibility.',
    fullGuide:
      'Faran Traders Management is a retail and supply-chain platform designed to streamline stock control, sales tracking, supplier coordination, and business reporting. It helps trading operations run more efficiently with a clear, data-driven workflow that supports daily decision-making.',
    tags: ['Web App', 'E-Commerce'],
    image:
      'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://faran-traders-management.vercel.app/',
    githubUrl: 'https://github.com/alharamaintechsolution85/Faran-Traders-Management',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Al Haramain Drone Delivery System',
    description: 'Autonomous logistics coordination platform for intelligent drone-based delivery operations.',
    fullGuide:
      'The Al Haramain Drone Delivery System combines route planning, live monitoring, and operational intelligence to support modern logistics and autonomous delivery workflows. It is tailored for fast, reliable, and scalable distribution systems that require precise movement and control.',
    tags: ['AI/Automation', 'Logistics'],
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://alharamain-drone-peik.vercel.app/',
    githubUrl: 'https://github.com/alharamaintechsolution85/alharamain-drone',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'CodeFix Platform',
    description: 'A developer-focused platform for project collaboration, debugging workflows, and digital code delivery.',
    fullGuide:
      'CodeFix Platform is built to support software teams with collaborative workflows, technical issue handling, and project visibility. The solution brings structure to delivery pipelines while helping teams move faster with greater confidence and coordination.',
    tags: ['Cloud', 'Developer Tools'],
    image:
      'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://codefix-plum.vercel.app/',
    githubUrl: 'https://github.com/alharamaintechsolution85/codefix',
    isFeatured: true,
  },
];
