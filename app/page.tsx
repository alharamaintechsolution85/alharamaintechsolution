'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Bot, Code2, Layers3 } from 'lucide-react';
import { WelcomeIntro } from '@/components/home/welcome-intro';
import { projects } from '@/data/projects';

const highlights = [
  { icon: Code2, title: 'Web & mobile products', text: 'Fast, accessible interfaces built around how your customers work.' },
  { icon: Layers3, title: 'Enterprise software', text: 'Purpose-built workflows and tools that simplify complex operations.' },
  { icon: Bot, title: 'AI & automation', text: 'Practical intelligent systems that help teams work with greater focus.' },
];

export default function HomePage() {
  const [entered, setEntered] = useState(false);

  return (
    <main>
      <WelcomeIntro entered={entered} onEnterHome={() => setEntered(true)} />
      {entered ? (
        <>
          <section className="content-section" id="home-content">
            <motion.div
              className="section-heading"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <div>
                <p className="eyebrow">What we do</p>
                <h2 className="section-title">Build with confidence.</h2>
              </div>
              <Link href="/services" className="text-link">Explore all services <ArrowRight size={15} /></Link>
            </motion.div>
            <div className="service-teaser-grid">
              {highlights.map(({ icon: Icon, title, text }) => (
                <motion.article
                  className="teaser-card"
                  key={title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="icon-tile"><Icon size={20} /></span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="content-section compact-section">
            <motion.div
              className="section-heading"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 className="section-title">Ideas made real.</h2>
              </div>
              <Link href="/projects" className="text-link">View all projects <ArrowRight size={15} /></Link>
            </motion.div>
            <div className="featured-row">
              {projects.filter((project) => project.featured).slice(0, 4).map((project) => (
                <motion.div
                  className="featured-project-motion"
                  key={project.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.28 }}
                >
                  <Link className="featured-project" href="/projects">
                    <span className="featured-project-image">
                      <Image src={project.image} alt={`${project.title} preview`} width={900} height={600} loading="lazy" />
                    </span>
                    <span className="featured-project-content">
                      <span>{project.category}</span>
                      <h3>{project.title}</h3>
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <Link href="/projects" className="button-primary featured-projects-cta">
              View All Projects <ArrowRight size={16} />
            </Link>
          </section>

          <motion.section
            className="home-about"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div>
              <p className="eyebrow">About the team</p>
              <h2 className="section-title">A thoughtful partner from first idea to launch.</h2>
              <p className="text-muted mt-4 max-w-2xl">
                We bring together product understanding and dependable engineering to help businesses turn important ideas into useful digital experiences.
              </p>
            </div>
            <div className="home-about-actions">
              <p className="founder-note">Founded by Hunza Saleem</p>
              <Link href="/about" className="button-secondary">Meet Al Haramain <ArrowRight size={16} /></Link>
            </div>
          </motion.section>
        </>
      ) : null}
    </main>
  );
}
