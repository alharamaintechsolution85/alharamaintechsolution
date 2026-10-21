'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Bot, FileText, Github, Layers3, Play, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { projectCategories, projects, type Project } from '@/data/projects';

export function ProjectGallery() {
  const [category, setCategory] = useState<string>('All projects');
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);
  const visibleProjects = category === 'All projects'
    ? projects
    : projects.filter((project) => project.category === category);

  useEffect(() => {
    if (!caseStudy) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCaseStudy(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [caseStudy]);

  return (
    <>
      <div className="filter-list" role="tablist" aria-label="Filter projects by category">
        {['All projects', ...projectCategories].map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={category === item}
            onClick={() => setCategory(item)}
            className={`filter-chip${category === item ? ' filter-chip-active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <motion.article
            key={project.slug}
            className="project-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.2) }}
          >
            <div className="project-image-wrap">
              <Image src={project.image} alt={`${project.title} preview`} className="project-image" width={800} height={500} loading="lazy" />
              <span className="category-tag">{project.category}</span>
              {project.featured ? <span className="featured-tag">Featured</span> : null}
            </div>
            <div className="project-card-content">
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-actions">
                <a
                  href={project.githubUrl ?? 'https://github.com/alharamaintechsolution85'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={project.githubUrl ? `GitHub repository for ${project.title}` : `GitHub profile for ${project.title}`}
                >
                  <Github size={15} /> {project.githubUrl ? 'GitHub Repo' : 'GitHub Profile'}
                </a>
                <a
                  href={project.liveUrl ?? `/contact?project=${encodeURIComponent(project.title)}`}
                  target={project.liveUrl ? '_blank' : undefined}
                  rel={project.liveUrl ? 'noreferrer' : undefined}
                  aria-label={project.liveUrl ? `Live preview of ${project.title}` : `Request a preview of ${project.title}`}
                >
                  <Play size={14} /> {project.liveUrl ? 'Live Preview' : 'Request Preview'} {project.liveUrl ? <ArrowUpRight size={13} /> : null}
                </a>
                <button type="button" onClick={() => setCaseStudy(project)}>
                  <FileText size={15} /> Case Study
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <AnimatePresence>
        {caseStudy ? (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setCaseStudy(null);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-study-title"
              className="case-study-modal"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
            >
              <div className="case-study-heading">
                <div className="case-study-title-wrap">
                  <p className="eyebrow"><Sparkles size={13} /> Project case study</p>
                  <h2 id="case-study-title">{caseStudy.title}</h2>
                  <p>{caseStudy.description}</p>
                </div>
                <button type="button" onClick={() => setCaseStudy(null)} aria-label="Close case study" className="modal-close">
                  <X size={18} />
                </button>
              </div>
              <div className="case-study-content">
                <section className="case-study-overview">
                  <span className="case-study-icon"><Layers3 size={19} /></span>
                  <div><h3>Executive overview</h3><p>{caseStudy.caseStudy.overview}</p></div>
                </section>
                <div className="case-study-grid">
                  <section className="case-study-section">
                    <span className="case-study-icon"><FileText size={18} /></span>
                    <h3>Problem statement</h3>
                    <p>{caseStudy.caseStudy.problem}</p>
                  </section>
                  <section className="case-study-section">
                    <span className="case-study-icon"><Layers3 size={18} /></span>
                    <h3>Solution architecture</h3>
                    <p>{caseStudy.caseStudy.architecture}</p>
                  </section>
                  <section className="case-study-section">
                    <span className="case-study-icon"><Bot size={18} /></span>
                    <h3>Technical features & AI / hardware protocols</h3>
                    <ul>{caseStudy.caseStudy.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  </section>
                  <section className="case-study-section">
                    <span className="case-study-icon"><Sparkles size={18} /></span>
                    <h3>Tech stack used</h3>
                    <ul>{caseStudy.caseStudy.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                  </section>
                </div>
                <section className="case-study-impact">
                  <h3>Live impact & results</h3>
                  <p>{caseStudy.caseStudy.impact}</p>
                </section>
              </div>
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
