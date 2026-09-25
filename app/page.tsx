'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Cloud,
  Cpu,
  ExternalLink,
  Github,
  Globe,
  Instagram,
  Layers3,
  Lightbulb,
  Linkedin,
  Mail,
  MapPinned,
  MessageCircle,
  MessageSquareMore,
  MonitorSmartphone,
  Rocket,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { ThemePanel } from '@/components/theme-panel';
import { projects, type Project } from '@/data/projects';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Careers', href: '#contact' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  {
    title: 'Web Development',
    icon: MonitorSmartphone,
    description: 'Scalable product experiences for modern, conversion-focused digital growth.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    details: 'We build fast, accessible, and search-friendly websites and web applications with reusable components, server-side rendering, secure APIs, and performance monitoring. The result is a maintainable platform that can grow from an MVP into a production system.',
  },
  {
    title: 'Mobile Apps',
    icon: SmartphoneOutline,
    description: 'High-impact mobile experiences built for retention, speed, and usability.',
    technologies: ['React Native', 'TypeScript', 'Node.js', 'REST APIs', 'Expo'],
    details: 'We create consistent mobile experiences from a shared product foundation, connecting polished interfaces to secure APIs, notifications, analytics, and scalable backend services for iOS and Android users.',
  },
  {
    title: 'Custom Software',
    icon: Layers3,
    description: 'Business-critical systems tailored around your operations, workflows, and team structure.',
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Next.js'],
    details: 'We translate complex business processes into focused internal platforms, dashboards, and workflow tools. Domain-specific architecture, role-based access, and clean data models keep the software useful as the organization expands.',
  },
  {
    title: 'AI & Automation',
    icon: Cpu,
    description: 'Intelligent automation and decision support to reduce manual overhead and increase speed.',
    technologies: ['Python', 'OpenAI APIs', 'Node.js', 'PostgreSQL', 'Background Jobs'],
    details: 'We connect AI capabilities to real operational workflows instead of adding technology for its own sake. Automations handle repetitive work, retrieve useful knowledge, and provide human-review checkpoints for dependable results.',
  },
  {
    title: 'UI/UX Design',
    icon: Sparkles,
    description: 'Clean, approachable product design that turns friction into confident user journeys.',
    technologies: ['Figma', 'Design Systems', 'Tailwind CSS', 'Prototyping', 'Usability Testing'],
    details: 'We turn product goals and user needs into clear information architecture, responsive interfaces, and reusable design systems. Prototypes help validate the experience before engineering effort is committed.',
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    description: 'Reliable infrastructure, automation pipelines, and deployment systems built for scale.',
    technologies: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Observability'],
    details: 'We establish repeatable deployment workflows, sensible environments, and production monitoring so teams can release safely and recover quickly. Infrastructure choices stay proportional to the product and its growth path.',
  },
];

const processSteps = [
  { number: '01', title: 'Discover', description: 'We align on strategic goals, technical constraints, and impact opportunities.', details: ['Stakeholder interviews', 'Technical discovery', 'Scope and success metrics'] },
  { number: '02', title: 'Design', description: 'We shape the experience, product flow, and technical blueprint with clarity.', details: ['User flows and prototypes', 'Design system direction', 'Architecture planning'] },
  { number: '03', title: 'Develop', description: 'We engineer with discipline, speed, and a product-first mindset.', details: ['Agile implementation', 'Quality checks and testing', 'Progressive delivery'] },
  { number: '04', title: 'Deliver & Support', description: 'We launch with confidence and stay close for continuous improvement.', details: ['Production launch', 'Monitoring and iteration', 'Ongoing technical support'] },
];

const industryCards = [
  { title: 'E-Commerce & Retail', icon: BriefcaseBusiness, details: 'We create commerce experiences that connect product discovery, checkout, inventory, and reporting into a smoother retail operation.' },
  { title: 'Healthcare & E-Hospital Systems', icon: Building2, details: 'We build secure, accessible healthcare workflows for appointments, records, communication, and operational visibility.' },
  { title: 'Logistics & Autonomous Drone Operations', icon: MapPinned, details: 'We connect planning, monitoring, telemetry, and reporting to help logistics teams coordinate complex movement with confidence.' },
  { title: 'Corporate Enterprise Solutions', icon: Globe, details: 'We turn fragmented business processes into dependable internal platforms with permissions, dashboards, and automation.' },
  { title: 'Education Platforms', icon: Lightbulb, details: 'We design learning and administration platforms that make content, communication, and progress easier to manage.' },
  { title: 'Digital Transformation', icon: Workflow, details: 'We modernize legacy workflows with practical digital systems that improve speed, clarity, and measurable business performance.' },
  { title: 'Customer Experience', icon: MessageSquareMore, details: 'We create connected customer journeys across web, mobile, support, and communication touchpoints.' },
];

const industryIcons = [Building2, BriefcaseBusiness, Globe, Lightbulb, MapPinned, Workflow, MessageSquareMore];

function SmartphoneOutline(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="7" y="2.75" width="10" height="18.5" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

function TikTokMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M15.5 3c.2 1.7 1.2 2.8 3 3.1v2.6c-1.2 0-2.2-.3-3-.8v6.2a5.4 5.4 0 1 1-4.7-5.3v2.8a2.6 2.6 0 1 0 1.9 2.5V3h2.8Z" />
    </svg>
  );
}

function HomePage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<(typeof services)[number] | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<{ title: string; description: string; details: string[] } | null>(null);

  const visibleProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }

    return projects.filter((project) =>
      project.tags.some(
        (tag) => tag.toLowerCase() === activeFilter.toLowerCase() || tag.toLowerCase().includes(activeFilter.toLowerCase()),
      ),
    );
  }, [activeFilter]);

  const openWhatsApp = 'https://wa.me/971557162816';

  return (
    <main style={{ background: 'var(--page-bg)', color: 'var(--text-primary)' }} className="min-h-screen overflow-x-hidden">
      <ThemePanel />

      <header className="relative z-10 mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-[28px] border border-white/60 bg-white/70 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img src="/ahtclogo.png" alt="Al Haramain Tech Solutions logo" className="h-14 w-14 scale-125 object-contain" />
            </div>
            <div>
              <div className="text-base font-black leading-tight tracking-tight text-slate-900 sm:text-lg">Al Haramain Tech Solutions</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Founded by Hunza Saleem</div>
            </div>
          </div>

          <div className="hidden items-center gap-7 text-sm font-medium text-slate-700 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-[var(--accent-color)]">
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, var(--accent-color) 0%, #0ea5e9 100%)' }}
          >
            Start a Project
          </a>
        </nav>
      </header>

      <section id="home" className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-white/50 bg-[rgba(255,255,255,0.38)] p-4 shadow-[0_20px_60px_rgba(14,116,144,0.08)] backdrop-blur-2xl sm:p-8 lg:p-12">
          <div className="absolute left-8 top-10 h-60 w-60 rounded-full bg-cyan-300/40 blur-3xl" />
          <div className="absolute right-10 top-14 h-72 w-72 rounded-full bg-blue-300/40 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-700 backdrop-blur-xl">
                <Rocket size={12} className="text-cyan-500" />
                Remote-first tech partner
              </div>
              <h1 className="max-w-xl text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl lg:text-6xl">
                Technology that moves your business forward.
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
                Custom software, websites, mobile apps, AI & automation that help ambitious teams build momentum and scale smarter.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, var(--accent-color) 0%, #0ea5e9 100%)' }}
                >
                  Start a Project
                  <ArrowRight size={16} />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300"
                >
                  Explore Services
                </a>
              </div>

              <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-3">
                {['Remote-first Team', 'Global Delivery', 'End-to-End Solutions'].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/70 px-3 py-3 shadow-sm backdrop-blur-xl">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-6 rounded-[32px] bg-gradient-to-br from-cyan-200/60 via-sky-200/40 to-indigo-200/60 blur-2xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/60 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.1)] backdrop-blur-xl">
                <img src="/ahtchero.png" alt="Tech workspace illustration" className="w-full rounded-[26px] object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">What we do</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900 md:text-4xl">Built for teams ready to scale.</h2>
          </div>
          <a href="#contact" className="hidden text-sm font-semibold text-slate-600 transition hover:text-[var(--accent-color)] sm:inline-flex">
            View all services
          </a>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedService(service)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedService(service);
                  }
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="group cursor-pointer rounded-xl border border-slate-200/80 bg-[rgba(255,255,255,0.74)] p-3 shadow-[0_8px_18px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-[var(--accent-color)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] md:p-4"
              >
                <div
                  className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg shadow-sm"
                  style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.12), rgba(14,165,233,0.18))', color: 'var(--accent-color)' }}
                >
                  <Icon size={18} />
                </div>
                <h3 className="text-base font-bold text-slate-900">{service.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-slate-600">{service.description}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-700">
                  Explore solution <ArrowRight size={13} />
                </span>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="projects" className="py-20 text-white" style={{ background: 'linear-gradient(135deg, var(--navy-color) 0%, rgba(15,23,42,0.96) 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Our recent work</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] md:text-4xl">Featured projects that move ideas forward.</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Web App', 'AI/Automation', 'E-Commerce', 'Cloud'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                    activeFilter === filter
                      ? 'border-cyan-400 bg-cyan-500/15 text-cyan-200'
                      : 'border-slate-700 bg-slate-800/70 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <article key={project.id} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(15,23,42,0.14)] transition hover:-translate-y-1">
                <div className="relative overflow-hidden border-b border-white/10">
                  <img src={project.image} alt={project.title} className="h-56 w-full object-cover transition duration-500 hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur-md">
                    {project.tags[0]}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">Featured</p>
                  <h3 className="mt-2 text-2xl font-bold">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-700 bg-slate-700/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-white"
                    >
                      View case study <ArrowRight size={14} />
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-white"
                      style={{ background: 'var(--accent-color)' }}
                    >
                      <ExternalLink size={14} />
                      Live Preview
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/20"
                    >
                      <Github size={14} />
                      GitHub Repository
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Our process</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900 md:text-4xl">A clear path from ambition to delivery.</h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedDetail({ title: step.title, description: step.description, details: step.details })}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedDetail({ title: step.title, description: step.description, details: step.details });
                }
              }}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_9px_22px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-[var(--accent-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] md:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black tracking-[-0.06em] text-cyan-600">{step.number}</span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{step.description}</p>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-700">View details <ArrowRight size={12} /></span>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="industries" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Industries we serve</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900 md:text-4xl">Built to support the sectors shaping tomorrow.</h2>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {industryCards.map((industry, idx) => {
            const Icon = industryIcons[idx % industryIcons.length];
            return (
              <div
                key={industry.title}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedDetail({ title: industry.title, description: industry.details, details: ['Industry-focused product strategy', 'Responsive web and mobile experiences', 'Scalable engineering and ongoing support'] })}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setSelectedDetail({ title: industry.title, description: industry.details, details: ['Industry-focused product strategy', 'Responsive web and mobile experiences', 'Scalable engineering and ongoing support'] });
                  }
                }}
                className="cursor-pointer rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm transition hover:-translate-y-1 hover:border-[var(--accent-color)] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
              >
                <div
                  className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-cyan-600"
                  style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(14,165,233,0.16))' }}
                >
                  <Icon size={18} />
                </div>
                <p className="mt-2 text-xs font-semibold leading-4 text-slate-700">{industry.title}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:p-8 xl:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 p-4">
              <div className="rounded-[24px] p-4 text-white shadow-2xl" style={{ background: 'linear-gradient(135deg, var(--navy-color) 0%, rgba(15,23,42,0.94) 100%)' }}>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-3 rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-slate-300">Weekly sync</p>
                      <p className="mt-1 text-lg font-semibold">Talented. Remote. United.</p>
                    </div>
                    <div className="rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white" style={{ background: 'var(--accent-soft)' }}>
                      Live
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {['Design', 'Code', 'QA'].map((tag) => (
                      <div key={tag} className="rounded-xl border border-white/10 bg-white/5 p-2 text-center text-[10px] uppercase tracking-[0.14em] text-slate-200">
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="flex -space-x-2">
                      {['A', 'H', 'R'].map((letter, idx) => (
                        <div
                          key={letter}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-xs font-semibold"
                          style={{
                            background: idx === 0 ? 'var(--accent-color)' : idx === 1 ? '#4f46e5' : '#10b981',
                          }}
                        >
                          {letter}
                        </div>
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Delivery</div>
                      <div className="text-xl font-bold text-white">94%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">About us</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900 md:text-4xl">Built by problem-solvers with real product experience.</h2>
              <div className="mt-4 inline-flex items-center rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-700">
                Hunza Saleem · Founder & Lead Developer
              </div>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                Al Haramain Tech Solutions is founded and led by Hunza Saleem, a skilled software developer holding a Bachelor&apos;s Degree in Computer Science from the University of Gujrat, backed by 2-3 years of hands-on industrial experience in modern web and software development. Under Hunza&apos;s technical leadership, our team combines product thinking, engineering discipline, and end-to-end execution to deliver digital systems organizations can trust.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 text-cyan-600" size={18} />
                  <p className="text-sm leading-7 text-slate-700">Strong foundation in web engineering, cloud-enabled product delivery, and reliable software architecture.</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <CheckCircle2 className="mt-0.5 text-cyan-600" size={18} />
                  <p className="text-sm leading-7 text-slate-700">Practical experience building systems for businesses that need careful execution, performance, and maintainability.</p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  'E-Commerce & Retail',
                  'Healthcare & E-Hospital Systems',
                  'Logistics & Autonomous Drone Operations',
                  'Corporate Enterprise Solutions',
                ].map((label) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-slate-200 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.18)] md:p-10" style={{ background: 'linear-gradient(135deg, var(--navy-color) 0%, rgba(15,23,42,0.94) 100%)' }}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Let’s build</p>
              <h2 className="mt-3 max-w-lg text-3xl font-black tracking-[-0.05em] text-white md:text-4xl">Tell us what you want to create next.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:+971557162816"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #f8fafc 0%, var(--accent-color) 100%)' }}
              >
                Call Now
              </a>
              <a
                href={openWhatsApp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200/80 bg-white/60 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img src="/ahtclogo.png" alt="Al Haramain Tech Solutions logo" className="h-14 w-14 scale-125 object-contain" />
              </div>
              <div>
                <div className="text-base font-black leading-tight tracking-tight text-slate-900 sm:text-lg">Al Haramain Tech Solutions</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              A remote-first technology partner founded and led by Hunza Saleem, helping businesses design, build, and grow digital experiences that actually perform.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Hunza Saleem · Founder & Lead Developer</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Explore</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          <div id="contact-details">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li><a href="tel:+971557162816">+971 55716 2816</a></li>
              <li><a href="mailto:alharamaintechsolution@gmail.com">alharamaintechsolution@gmail.com</a></li>
              <li>UAE · Remote</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Follow</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={openWhatsApp} target="_blank" rel="noreferrer" aria-label="Chat with Al Haramain Tech Solutions on WhatsApp" title="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <MessageCircle size={18} />
              </a>
              <a href="https://github.com/alharamaintechsolution85" target="_blank" rel="noreferrer" aria-label="Open Al Haramain Tech Solutions on GitHub" title="GitHub" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181717] text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Github size={18} />
              </a>
              <a href="https://www.instagram.com/al_haramai_tech_solutions?stkn=M2ZmcWI5MjE3bTNq&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Open Al Haramain Tech Solutions on Instagram" title="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Instagram size={18} />
              </a>
              <a href="https://www.tiktok.com/@al_haramain_techsolution?_r=1&_t=ZN-9A1tVMq8yuM" target="_blank" rel="noreferrer" aria-label="Open Al Haramain Tech Solutions on TikTok" title="TikTok" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#010101] text-white shadow-[2px_2px_0_#25F4EE,-2px_-2px_0_#FE2C55] transition hover:-translate-y-0.5 hover:shadow-md">
                <TikTokMark className="h-[18px] w-[18px]" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="Open LinkedIn" title="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Linkedin size={18} />
              </a>
              <a href="mailto:alharamaintechsolution@gmail.com" aria-label="Email Al Haramain Tech Solutions" title="Email" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EA4335] text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedService ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.28)] md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    style={{ background: 'var(--accent-soft)', color: 'var(--accent-color)' }}
                  >
                    <selectedService.icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">Service specification</p>
                    <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-900">{selectedService.title}</h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  aria-label="Close service details"
                  className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mt-6 text-base leading-8 text-slate-600">{selectedService.details}</p>
              <div className="mt-7">
                <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Advanced technologies</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedService.technologies.map((technology) => (
                    <span key={technology} className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-700">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm leading-7 text-slate-700">
                  Al Haramain Tech Solutions combines these tools with clear architecture, disciplined delivery, responsive design, and ongoing support to produce scalable solutions that remain reliable as your users and operations grow.
                </p>
              </div>
              <a
                href="#contact"
                onClick={() => setSelectedService(null)}
                className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                style={{ background: 'var(--accent-color)' }}
              >
                Discuss this service <ArrowRight size={15} />
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedDetail ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedDetail(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.28)] md:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">AHTS solution detail</p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-900">{selectedDetail.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDetail(null)}
                  aria-label="Close details"
                  className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">{selectedDetail.description}</p>
              <ul className="mt-5 space-y-2">
                {selectedDetail.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan-600" />
                    {detail}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={() => setSelectedDetail(null)}
                className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                style={{ background: 'var(--accent-color)' }}
              >
                Discuss your needs <ArrowRight size={14} />
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.28)]"
            >
              <div className="relative">
                <img src={selectedProject.image} alt={selectedProject.title} className="h-60 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 rounded-full bg-slate-900/80 px-3 py-1.5 text-sm font-medium text-white"
                >
                  Close
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">Case study</p>
                    <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-slate-900">{selectedProject.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                      Live Preview
                    </a>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                      <Github size={14} />
                      GitHub Repository
                    </a>
                  </div>
                </div>
                <p className="mt-5 text-base leading-8 text-slate-600">{selectedProject.fullGuide}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-cyan-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

export default HomePage;
