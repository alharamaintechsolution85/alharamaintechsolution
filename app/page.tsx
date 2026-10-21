'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Bot, Code2, Layers3, Sparkles } from 'lucide-react';
import { WelcomeIntro } from '@/components/home/welcome-intro';
import { projects } from '@/data/projects';

const highlights = [
  { icon: Code2, title: 'Web & mobile products', text: 'Fast, accessible interfaces built around how your customers work.' },
  { icon: Layers3, title: 'Enterprise software', text: 'Purpose-built workflows and tools that simplify complex operations.' },
  { icon: Bot, title: 'AI & automation', text: 'Practical intelligent systems that help teams work with greater focus.' },
];

export default function HomePage() {
  return (
    <main>
      <WelcomeIntro />
      <section className="hero-section">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="eyebrow"><Sparkles size={14} /> Your technology partner</p>
          <h1 className="hero-title">Technology that moves your business forward.</h1>
          <p className="hero-description">
            We design and build digital products, custom software, and intelligent workflows for ambitious teams.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="button-primary">Let’s talk <ArrowRight size={16} /></Link>
            <Link href="/projects" className="button-secondary">Explore our work</Link>
          </div>
          <div className="hero-proof">
            <span>Product thinking</span><span>Engineering discipline</span><span>End-to-end delivery</span>
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
        >
          <Image src="/ahtchero.png" alt="Digital technology and software solutions" width={1000} height={980} priority />
          <div className="hero-image-caption"><span className="status-dot" /> Ideas into dependable products</div>
        </motion.div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div><p className="eyebrow">What we do</p><h2 className="section-title">Build with confidence.</h2></div>
          <Link href="/services" className="text-link">Explore all services <ArrowRight size={15} /></Link>
        </div>
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
              <h3>{title}</h3><p>{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section compact-section">
        <div className="section-heading">
          <div><p className="eyebrow">Selected work</p><h2 className="section-title">Ideas made real.</h2></div>
          <Link href="/projects" className="text-link">View all projects <ArrowRight size={15} /></Link>
        </div>
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

      <section className="home-about">
        <div>
          <p className="eyebrow">About the team</p>
          <h2 className="section-title">A thoughtful partner from first idea to launch.</h2>
          <p className="text-muted mt-4 max-w-2xl">We bring together product understanding and dependable engineering to help businesses turn important ideas into useful digital experiences.</p>
        </div>
        <div className="home-about-actions">
          <p className="founder-note">Founded by Hunza Saleem</p>
          <Link href="/about" className="button-secondary">Meet Al Haramain <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
