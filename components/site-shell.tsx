'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Github, Instagram, Linkedin, Mail, MessageCircle, Phone, X, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ContactForm } from '@/components/contact-form';
import { ThemePanel } from '@/components/theme-panel';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (!contactOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setContactOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [contactOpen]);

  return (
    <>
      <header className={`site-header${pathname === '/' ? ' site-header-home' : ''}`}>
        <nav className="site-nav" aria-label="Main navigation">
          <Link href="/" className="brand">
            <Image src="/ahtclogo.png" alt="" className="brand-logo" width={74} height={74} />
            <span className="brand-copy">
              <span>Al Haramain <span className="brand-light">Tech Solutions</span></span>
              <span className="brand-founder">Founded by Hunza Saleem</span>
            </span>
          </Link>
          <div className="nav-links">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? 'page' : undefined}
                className={`nav-link${pathname === item.href ? ' nav-link-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <div className="header-contact-details">
              <a href="tel:+971557162816">UAE <span>+971 55 716 2816</span></a>
              <a href="tel:+923074053281">Pakistan <span>+92 307 4053281</span></a>
            </div>
            <button type="button" onClick={() => setContactOpen(true)} className="button-primary nav-cta">
              Start a project
            </button>
            <ThemePanel />
          </div>
        </nav>
      </header>
      {children}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand-column">
            <Link href="/" className="brand">
              <Image src="/ahtclogo.png" alt="" className="brand-logo" width={74} height={74} />
              <span className="brand-copy">
                <span>Al Haramain <span className="brand-light">Tech Solutions</span></span>
                <span className="brand-founder">Founded by Hunza Saleem</span>
              </span>
            </Link>
            <p className="footer-description">Thoughtful digital products, built to move your business forward.</p>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-column">
            <h2>Contact</h2>
            <a href="tel:+971557162816"><Phone size={14} /> +971 55 716 2816</a>
            <a href="tel:+923074053281"><Phone size={14} /> +92 307 4053281</a>
            <a href="https://wa.me/971557162816" target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /> WhatsApp UAE</a>
            <a href="https://wa.me/923074053281" target="_blank" rel="noopener noreferrer"><MessageCircle size={14} /> WhatsApp Pakistan</a>
            <a href="mailto:alharamaintechsolution@gmail.com"><Mail size={14} /> Email us</a>
          </div>
          <div className="footer-column footer-social-column">
            <h2>Follow</h2>
            <div className="footer-social-links">
              <a href="https://www.tiktok.com/@al_haramain_techsolution?_r=1&_t=ZN-9AjdKqGy4ak" target="_blank" rel="noreferrer" aria-label="TikTok">
                <TikTokIcon />
              </a>
              <a href="https://wa.me/971557162816" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp UAE">
                <MessageCircle size={17} />
              </a>
              <a href="https://wa.me/923074053281" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Pakistan">
                <MessageCircle size={17} />
              </a>
              <a href="https://www.instagram.com/@_al_haramai_tech_solutions?srtk=M2ZmcWI5MjE3bTNq&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="https://www.youtube.com/@AlHaramainTechSolution" target="_blank" rel="noreferrer" aria-label="YouTube">
                <Youtube size={17} />
              </a>
              <a href="https://github.com/alharamaintechsolution85" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={17} />
              </a>
              <span className="social-placeholder" aria-label="LinkedIn profile coming soon" title="LinkedIn profile coming soon">
                <Linkedin size={17} />
              </span>
            </div>
            <span className="footer-social-note">LinkedIn profile coming soon</span>
          </div>
          <span className="copyright">© {new Date().getFullYear()} Al Haramain Tech Solutions. All rights reserved.</span>
        </div>
      </footer>
      <div className="quick-contact" aria-label="Quick contact">
        <a href="mailto:alharamaintechsolution@gmail.com" aria-label="Email Al Haramain Tech Solutions" title="Email us">
          <Mail size={19} />
        </a>
        <a href="https://wa.me/971557162816" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp UAE" title="WhatsApp UAE">
          <MessageCircle size={19} />
        </a>
        <a href="https://wa.me/923074053281" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp Pakistan" title="WhatsApp Pakistan">
          <MessageCircle size={19} />
        </a>
        <a href="tel:+971557162816" aria-label="Call Al Haramain Tech Solutions" title="Call us">
          <Phone size={18} />
        </a>
      </div>
      <AnimatePresence>
        {contactOpen ? (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setContactOpen(false);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="modal-card"
            >
              <button type="button" onClick={() => setContactOpen(false)} aria-label="Close form" className="modal-close">
                <X size={18} />
              </button>
              <p className="eyebrow">Let’s build something useful</p>
              <h2 id="contact-modal-title" className="section-title">Start a project</h2>
              <p className="mt-2 text-sm text-muted">Tell us a little about what you have in mind.</p>
              <div className="mt-6">
                <ContactForm onClose={() => setContactOpen(false)} compact />
              </div>
              <div className="modal-contact-links">
                <a href="mailto:alharamaintechsolution@gmail.com"><Mail size={15} /> Email us</a>
                <a href="https://wa.me/971557162816" target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> WhatsApp UAE</a>
                <a href="https://wa.me/923074053281" target="_blank" rel="noopener noreferrer"><MessageCircle size={15} /> WhatsApp Pakistan</a>
                <a href="tel:+971557162816"><Phone size={15} /> +971 55 716 2816</a>
                <a href="tel:+923074053281"><Phone size={15} /> +92 307 4053281</a>
              </div>
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#25F4EE" d="M15.5 3c.2 1.7 1.2 2.8 3 3.1v2.6c-1.2 0-2.2-.3-3-.8v6.2a5.4 5.4 0 1 1-4.7-5.3v2.8a2.6 2.6 0 1 0 1.9 2.5V3h2.8Z" transform="translate(1 .4)" />
      <path fill="#FE2C55" d="M15.5 3c.2 1.7 1.2 2.8 3 3.1v2.6c-1.2 0-2.2-.3-3-.8v6.2a5.4 5.4 0 1 1-4.7-5.3v2.8a2.6 2.6 0 1 0 1.9 2.5V3h2.8Z" transform="translate(-.5 -.2)" />
      <path fill="#fff" d="M15.5 3c.2 1.7 1.2 2.8 3 3.1v2.6c-1.2 0-2.2-.3-3-.8v6.2a5.4 5.4 0 1 1-4.7-5.3v2.8a2.6 2.6 0 1 0 1.9 2.5V3h2.8Z" />
    </svg>
  );
}
