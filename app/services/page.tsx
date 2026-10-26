'use client';

import { motion } from 'framer-motion';
import {
  AppWindow, Blocks, Bot, Cloud, Code2, Gamepad2, Megaphone, Palette, Plug, Smartphone,
} from 'lucide-react';

const services = [
  { title: 'Web Development', icon: AppWindow, graphic: '🌐', text: 'Responsive websites and web applications built for speed, accessibility, and growth.' },
  { title: 'Mobile Applications', icon: Smartphone, graphic: '📱', text: 'Intuitive mobile experiences that connect customers to your products and services.' },
  { title: 'Custom Enterprise Software', icon: Blocks, graphic: '🏢', text: 'Operational platforms, dashboards, and workflow tools shaped around your business.' },
  { title: 'AI & Intelligent Automation', icon: Bot, graphic: '✨', text: 'Practical AI and automation that removes repetitive effort and supports better decisions.' },
  { title: 'Cloud & DevOps Infrastructure', icon: Cloud, graphic: '☁️', text: 'Reliable cloud foundations, deployment pipelines, and operational observability.' },
  { title: 'UI/UX Product Design', icon: Palette, graphic: '🎨', text: 'Clear user journeys and refined design systems that make products easier to use.' },
  { title: 'Social Media & Meta Ads', icon: Megaphone, graphic: '📣', text: 'Social media strategy and Meta campaign management focused on measurable outcomes.' },
  { title: 'Custom API Integrations', icon: Plug, graphic: '🔗', text: 'Secure integrations that connect your tools, data, and customer experiences.' },
  { title: 'Game Development & Interactive Systems', icon: Gamepad2, graphic: '🎮', text: 'Interactive concepts and engaging digital experiences for play and learning.' },
];

export default function ServicesPage() {
  return (
    <main className="page-main">
      <motion.section
        className="page-intro"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <p className="eyebrow">Services & capabilities</p>
        <h1 className="page-title">The right expertise to move your product forward.</h1>
        <p className="page-lead">Bring us a challenge, an idea, or a product that needs its next step. We’ll shape a practical way forward.</p>
      </motion.section>
      <section className="service-grid" aria-label="Our services">
        {services.map(({ title, icon: Icon, graphic, text }, index) => (
          <motion.article
            key={title}
            className="service-card"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ rotateX: 2, rotateY: -2, y: -4 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.2) }}
            style={{ transformPerspective: 900 }}
          >
            <div className="service-card-content">
              <div className="service-card-top"><span className="icon-tile"><Icon size={20} /></span><span className="service-graphic" aria-hidden="true">{graphic}</span></div>
              <h2>{title}</h2><p>{text}</p>
            </div>
          </motion.article>
        ))}
      </section>
      <motion.section
        className="page-cta"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <div><p className="eyebrow">Have a challenge in mind?</p><h2 className="section-title">Let’s find the right solution.</h2></div>
        <a href="/contact" className="button-primary">Talk to our team <Code2 size={16} /></a>
      </motion.section>
    </main>
  );
}
