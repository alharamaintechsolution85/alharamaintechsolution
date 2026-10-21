'use client';

import { motion } from 'framer-motion';
import {
  AppWindow, Blocks, Bot, Cloud, Code2, Gamepad2, Megaphone, Palette, Plug, Smartphone,
} from 'lucide-react';

const services = [
  { title: 'Web Development', icon: AppWindow, graphic: '🌐', image: 'photo-1498050108023-c5249f4df085', text: 'Responsive websites and web applications built for speed, accessibility, and growth.' },
  { title: 'Mobile Applications', icon: Smartphone, graphic: '📱', image: 'photo-1512941937669-90a1b58e7e9c', text: 'Intuitive mobile experiences that connect customers to your products and services.' },
  { title: 'Custom Enterprise Software', icon: Blocks, graphic: '🏢', image: 'photo-1486406146926-c627a92ad1ab', text: 'Operational platforms, dashboards, and workflow tools shaped around your business.' },
  { title: 'AI & Intelligent Automation', icon: Bot, graphic: '✨', image: 'photo-1677442136019-21780ecad995', text: 'Practical AI and automation that removes repetitive effort and supports better decisions.' },
  { title: 'Cloud & DevOps Infrastructure', icon: Cloud, graphic: '☁️', image: 'photo-1451187580459-43490279c0fa', text: 'Reliable cloud foundations, deployment pipelines, and operational observability.' },
  { title: 'UI/UX Product Design', icon: Palette, graphic: '🎨', image: 'photo-1558655146-d09347e92766', text: 'Clear user journeys and refined design systems that make products easier to use.' },
  { title: 'Social Media & Meta Ads', icon: Megaphone, graphic: '📣', image: 'photo-1533750349088-cd871a92f312', text: 'Social media strategy and Meta campaign management focused on measurable outcomes.' },
  { title: 'Custom API Integrations', icon: Plug, graphic: '🔗', image: 'photo-1558494949-ef010cbdcc31', text: 'Secure integrations that connect your tools, data, and customer experiences.' },
  { title: 'Game Development & Interactive Systems', icon: Gamepad2, graphic: '🎮', image: 'photo-1542751371-adc38448a05e', text: 'Interactive concepts and engaging digital experiences for play and learning.' },
];

export default function ServicesPage() {
  return (
    <main className="page-main">
      <section className="page-intro">
        <p className="eyebrow">Services & capabilities</p>
        <h1 className="page-title">The right expertise to move your product forward.</h1>
        <p className="page-lead">Bring us a challenge, an idea, or a product that needs its next step. We’ll shape a practical way forward.</p>
      </section>
      <section className="service-grid" aria-label="Our services">
        {services.map(({ title, icon: Icon, graphic, image, text }, index) => (
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
            <div className="service-card-image" style={{ backgroundImage: `url(https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=80)` }} aria-hidden="true" />
            <div className="service-card-content">
              <div className="service-card-top"><span className="icon-tile"><Icon size={20} /></span><span className="service-graphic" aria-hidden="true">{graphic}</span></div>
              <h2>{title}</h2><p>{text}</p>
            </div>
          </motion.article>
        ))}
      </section>
      <section className="page-cta">
        <div><p className="eyebrow">Have a challenge in mind?</p><h2 className="section-title">Let’s find the right solution.</h2></div>
        <a href="/contact" className="button-primary">Talk to our team <Code2 size={16} /></a>
      </section>
    </main>
  );
}
