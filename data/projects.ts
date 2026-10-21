export type ProjectCategory =
  | 'Custom & Enterprise'
  | 'Medical & Healthcare'
  | 'Airspace & Aviation'
  | 'Education & Utility'
  | 'Gaming'
  | 'Others';

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  caseStudy: ProjectCaseStudy;
};

export type ProjectCaseStudy = {
  overview: string;
  problem: string;
  architecture: string;
  features: string[];
  stack: string[];
  impact: string;
};

type ProjectDraft = Partial<Omit<Project, 'slug' | 'title' | 'image' | 'category'>> & {
  slug?: string;
  title?: string;
  image?: string;
  category?: ProjectCategory;
};

export const projectCategories: ProjectCategory[] = [
  'Custom & Enterprise',
  'Medical & Healthcare',
  'Airspace & Aviation',
  'Education & Utility',
  'Gaming',
  'Others',
];

const fallbackImages: Record<ProjectCategory, string> = {
  'Custom & Enterprise': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  'Medical & Healthcare': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  'Airspace & Aviation': 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80',
  'Education & Utility': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  Gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  Others: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
};

function titleFromLink(draft: ProjectDraft) {
  const link = draft.githubUrl ?? draft.liveUrl;
  if (!link) return 'New Project';
  const url = new URL(link);
  const pathName = url.hostname === 'github.com'
    ? url.pathname.split('/').filter(Boolean).at(-1)
    : url.hostname.split('.')[0];
  const cleaned = (pathName ?? 'New Project')
    .replace(/\.git$/i, '')
    .replace(/^alharamain[-_]?/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
  return cleaned || 'New Project';
}

function categoryFromDraft(draft: ProjectDraft, title: string): ProjectCategory {
  if (draft.category) return draft.category;
  const value = `${title} ${draft.liveUrl ?? ''} ${draft.githubUrl ?? ''}`.toLowerCase();
  if (/medical|health|carewell|hospital|microscope/.test(value)) return 'Medical & Healthcare';
  if (/drone|aviation|airspace|satellite|aerospace/.test(value)) return 'Airspace & Aviation';
  if (/resume|education|extension|ingredient|utility/.test(value)) return 'Education & Utility';
  if (/game|gaming/.test(value)) return 'Gaming';
  if (/enterprise|trader|business|fleet|studio/.test(value)) return 'Custom & Enterprise';
  return 'Others';
}

const caseStudyOverrides: Record<string, Partial<ProjectCaseStudy>> = {
  'autonomous-drone-operations': {
    problem: 'Coordinating autonomous deliveries means keeping missions, routes, vehicle status, and operator decisions visible in one workflow.',
    architecture: 'Proposed architecture (to validate): a mission-planning interface communicates with a separately secured telemetry and fleet service. Hardware control, flight safety, and any protocol such as MAVLink must be confirmed against the actual deployed system; no aircraft integration is claimed.',
    features: ['Mission and delivery-route planning', 'Operator-facing fleet status and mission views', 'Hardware links and flight protocols remain subject to field and safety validation'],
  },
  'al-haramain-luxury-fleet': {
    problem: 'Premium transport services need a polished digital presence that makes the fleet, service offering, and next contact step easy to understand.',
    architecture: 'Proposed architecture (to validate): a visual service and vehicle catalogue guides visitors from discovery to a direct enquiry. Booking, availability, and payment integrations should only be described after confirming the live product.',
    features: ['Premium fleet and service presentation', 'Mobile-first service discovery', 'Direct enquiry journey without unverified booking claims'],
  },
  'al-haramain-cad-studio': {
    problem: 'CAD and engineering services need a clear way to communicate capabilities and help prospective clients scope a project.',
    architecture: 'Proposed architecture (to validate): service pages and a visual project portfolio lead into a structured project inquiry. File upload, quoting, or CAD rendering features require confirmation against the published application.',
    features: ['CAD and engineering service discovery', 'Project-focused portfolio presentation', 'Clear inquiry path for prospective work'],
  },
  'halal-vision': {
    problem: 'Consumers can find it difficult to interpret product information and identify which details need reliable verification.',
    architecture: 'Proposed architecture (to validate): a product-information workflow presents source context and separates extracted details from verified guidance. Certification, ingredient data sources, and any automated classification require independent validation.',
    features: ['Product-information review flow', 'Source and confidence context for displayed information', 'Human verification for certification or dietary decisions'],
  },
  'ai-resume-builder': {
    problem: 'Applicants spend time reshaping the same experience for different roles and formats.',
    architecture: 'Proposed architecture (to validate): a guided content flow gathers user-approved career details, applies role-specific drafting assistance, and presents an editable resume. Any AI provider and data-retention behavior need verification.',
    features: ['Guided resume content workflow', 'AI-assisted drafting with user review before reuse', 'Readable, export-oriented document presentation'],
  },
  'al-haramain-carewell': {
    problem: 'People seeking care need an accessible way to understand available services and decide how to reach the provider.',
    architecture: 'Proposed architecture (to validate): a patient-facing information experience connects care discovery to a clear contact or appointment inquiry. No patient records, clinical advice, or certified healthcare integration is asserted.',
    features: ['Accessible care and service discovery', 'Clear patient inquiry pathways', 'Privacy and accessibility requirements identified for implementation review'],
  },
  'codefix-platform': {
    problem: 'Developers need a more structured way to coordinate debugging, collaboration, and project delivery.',
    architecture: 'Proposed architecture (to validate): a developer workspace organizes project context and issue workflows, with repository or CI integrations isolated behind explicit permissions. Specific integrations should be checked against the live product.',
    features: ['Project and debugging workflow organization', 'Collaboration-oriented project context', 'Repository and CI integrations require verification'],
  },
  'faran-traders-management': {
    problem: 'Trading operations depend on inventory, sales, procurement, and reporting, which can become difficult to reconcile across disconnected processes.',
    architecture: 'Proposed architecture (to validate): a central operations workspace connects product and stock records to sales and procurement workflows, with role-aware reporting. Actual data models, permissions, and accounting integrations require source verification.',
    features: ['Inventory and stock visibility', 'Sales and procurement workflow support', 'Operational reporting for day-to-day decisions'],
  },
  'worknex-website': {
    problem: 'People looking for work and organizations seeking talent need a clear digital path to discover relevant opportunities.',
    architecture: 'Proposed architecture (to validate): an opportunity-focused web experience connects discovery pages to application or contact actions. Accounts, matching, and hiring workflows should be documented only after checking the live implementation.',
    features: ['Work opportunity discovery', 'Clear pathways between candidates and organizations', 'Responsive web experience for job exploration'],
  },
};

function createProject(draft: ProjectDraft): Project {
  const title = draft.title ?? titleFromLink(draft);
  const slug = draft.slug ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const category = categoryFromDraft(draft, title);
  const caseStudy = createCaseStudy(title, draft.description, category, slug);
  return {
    slug,
    title,
    description: draft.description ?? 'Project details will be published soon.',
    category,
    image: draft.image ?? fallbackImages[category],
    liveUrl: draft.liveUrl,
    githubUrl: draft.githubUrl,
    featured: draft.featured,
    caseStudy,
  };
}

function createCaseStudy(
  title: string,
  description: string | undefined,
  category: ProjectCategory,
  slug: string,
): ProjectCaseStudy {
  const summary = description ?? `${title} is a digital product currently being prepared for portfolio publication.`;
  const categoryDetails: Record<ProjectCategory, Pick<ProjectCaseStudy, 'problem' | 'architecture' | 'features'>> = {
    'Custom & Enterprise': {
      problem: 'Business teams often coordinate work across disconnected tools, leaving core processes difficult to track and repeat.',
      architecture: 'Proposed architecture (to validate): a product interface organizes the primary workflow around clear user roles and structured records. Integrations, persistence, and access controls should be aligned to operating requirements before deployment.',
      features: ['Role-focused workflow surfaces', 'Structured records and searchable views', 'Responsive experience for daily operations'],
    },
    'Medical & Healthcare': {
      problem: 'Healthcare and laboratory services need clear, accessible digital journeys that help people find information and coordinate next steps.',
      architecture: 'Proposed architecture (to validate): a patient- or service-facing interface can connect to validated operational systems through privacy-conscious APIs. No clinical system, regulatory certification, or patient-data workflow is asserted here.',
      features: ['Accessible service discovery', 'Clear appointment or inquiry pathways', 'Privacy and accessibility requirements identified for implementation review'],
    },
    'Airspace & Aviation': {
      problem: 'Aviation concepts require teams to coordinate planning, status, and operational information across multiple components.',
      architecture: 'Proposed architecture (to validate): the system separates the operator interface from telemetry and device integrations. Flight-control hardware, safety controls, and protocols require project-specific verification; no live aircraft integration is claimed.',
      features: ['Mission and route planning concepts', 'Operator-facing status and monitoring views', 'Hardware and safety integration boundaries documented for validation'],
    },
    'Education & Utility': {
      problem: 'People need lightweight, understandable tools that turn a focused task into a short and useful digital workflow.',
      architecture: 'Proposed architecture (to validate): a focused client workflow guides users from input to a clear result, with external services isolated behind explicit integrations where applicable.',
      features: ['Task-focused user journey', 'Responsive controls and readable results', 'External-service integrations isolated for maintainability'],
    },
    Gaming: {
      problem: 'Interactive products need a coherent experience that makes controls, objectives, and feedback easy to understand.',
      architecture: 'Proposed architecture (to validate): the product centers on a responsive interaction layer with clear state changes and feedback. Platform, engine, and online services depend on the final game scope.',
      features: ['Interaction-first screen design', 'Immediate feedback for user actions', 'Platform and gameplay scope ready for definition'],
    },
    Others: {
      problem: 'New digital ideas benefit from a clear experience that makes the core task understandable and approachable.',
      architecture: 'Proposed architecture (to validate): a modular interface organizes the main user journey and leaves service integrations configurable as product requirements become clearer.',
      features: ['Focused primary workflow', 'Modular interface structure', 'Responsive presentation across screen sizes'],
    },
  };
  const categoryCaseStudy = categoryDetails[category];
  const projectCaseStudy = caseStudyOverrides[slug];

  if (slug === 'amanah-ingredient-check') {
    categoryCaseStudy.features = [
      'Ingredient or product information review workflow',
      'Clear presentation of source and confidence context',
      'Explicit user verification for decisions that need trusted sources',
    ];
  } else if (slug === 'haram-blur-extension') {
    categoryCaseStudy.features = [
      'Browser utility controls surfaced in a settings dashboard',
      'User-adjustable preferences',
      'Extension permissions and browser APIs require verification against the published build',
    ];
  } else if (slug === 'autonomous-drone-operations') {
    categoryCaseStudy.features = [
      'Flight and delivery mission planning concept',
      'Operator-facing fleet status and mission views',
      'Hardware links and flight protocols remain subject to field and safety validation',
    ];
  }

  return {
    overview: `${title} — ${summary}`,
    problem: projectCaseStudy?.problem ?? categoryCaseStudy.problem,
    architecture: projectCaseStudy?.architecture ?? categoryCaseStudy.architecture,
    features: projectCaseStudy?.features ?? categoryCaseStudy.features,
    stack: [
      'Verification status: the project-specific implementation stack has not been supplied',
      'Potential tools to confirm against the source repository: Next.js, React, TypeScript, Tailwind CSS',
      'Production integrations and infrastructure require confirmation from the project repository',
    ],
    impact: 'Designed to improve clarity and reduce friction in the stated workflow. Verified usage, performance, and business outcome metrics were not provided, so no quantitative results are claimed.',
  };
}

const projectDrafts: ProjectDraft[] = [
  {
    slug: 'autonomous-drone-operations',
    title: 'Autonomous Drone Operations System',
    description: 'A coordination platform for autonomous flights, delivery routes, and live operations.',
    category: 'Airspace & Aviation',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://alharamain-drone-peik.vercel.app/',
    githubUrl: 'https://github.com/alharamaintechsolution85/alharamain-drone',
    featured: true,
  },
  {
    slug: 'al-haramain-luxury-fleet',
    title: 'Al Haramain Luxury Fleet',
    description: 'A polished digital experience for premium transport and chauffeur services.',
    category: 'Custom & Enterprise',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://alharamainluxuryfleet.vercel.app',
    featured: true,
  },
  {
    slug: 'al-haramain-cad-studio',
    title: 'Al Haramain CAD Studio',
    description: 'A focused online home for computer-aided design and engineering services.',
    category: 'Custom & Enterprise',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://alharamaincadstudio.vercel.app',
    featured: true,
  },
  {
    slug: 'faran-traders-management',
    title: 'Faran Traders Management System',
    description: 'Inventory, sales, procurement, and operational visibility in one platform.',
    category: 'Custom & Enterprise',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://faran-traders-management.vercel.app/',
    githubUrl: 'https://github.com/alharamaintechsolution85/Faran-Traders-Management',
    featured: true,
  },
  {
    slug: 'codefix-platform',
    title: 'CodeFix Platform',
    description: 'A developer-focused platform for collaboration, debugging, and project delivery.',
    category: 'Custom & Enterprise',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://codefix-plum.vercel.app/',
    githubUrl: 'https://github.com/alharamaintechsolution85/codefix',
  },
  {
    slug: 'worknex-website',
    title: 'Worknex Website',
    description: 'A modern web experience for connecting people with work opportunities.',
    category: 'Custom & Enterprise',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://worknex-website.vercel.app',
  },
  {
    slug: 'al-haramain-carewell',
    title: 'Al Haramain CareWell',
    description: 'A patient-centered healthcare experience for accessible care services.',
    category: 'Medical & Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://alharamaincarewell.vercel.app',
  },
  {
    slug: 'halal-vision',
    title: 'Halal Vision',
    description: 'A concept for helping people review halal product information with clarity and confidence.',
    category: 'Education & Utility',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'e-hospital-systems',
    title: 'E-Hospital Systems',
    description: 'Digital workflows that support day-to-day hospital operations.',
    category: 'Medical & Healthcare',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'haramain-microscope',
    title: 'Haramain Microscope',
    description: 'A digital platform for laboratory and microscopy-focused services.',
    category: 'Medical & Healthcare',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'satellite-aerospace-tech',
    title: 'Satellite & Aerospace Tech',
    description: 'A portfolio concept exploring satellite systems and aerospace technology.',
    category: 'Airspace & Aviation',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'ai-resume-builder',
    title: 'AI Resume Builder',
    description: 'An AI-assisted tool for creating clear, tailored professional resumes.',
    category: 'Education & Utility',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://alharamainairesumebuilder.vercel.app',
  },
  {
    slug: 'haram-blur-extension',
    title: 'Haram Blur Extension',
    description: 'A practical browser utility with a streamlined settings dashboard.',
    category: 'Education & Utility',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://haram-blur-extension.vercel.app/dashboard',
  },
  {
    slug: 'amanah-ingredient-check',
    title: 'Amanah Ingredient Check',
    description: 'A utility to help people review product ingredients with confidence.',
    category: 'Education & Utility',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://amanah-ingredient-check-w49m.vercel.app',
  },
  {
    slug: 'gaming-projects',
    title: 'Games & Interactive Systems',
    description: 'A space for upcoming game development and interactive projects.',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  },
];

export const projects: Project[] = projectDrafts.map(createProject);
