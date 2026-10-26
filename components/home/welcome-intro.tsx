'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';

const slides = [
  '/1home.png.jpeg',
  '/2home.png.png',
];

const techStack = ['Next.js', 'Python', 'PHP', 'C#', 'Frontend', 'Backend', 'TypeScript'];

type WelcomeIntroProps = {
  entered: boolean;
  onEnterHome: () => void;
};

export function WelcomeIntro({ entered, onEnterHome }: WelcomeIntroProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const slideIndex = useRef(0);

  useEffect(() => {
    if (!entered) return;

    let fadeTimeout = 0;
    const preloadSlide = (index: number) => {
      const image = new window.Image();
      image.src = slides[index];
    };
    preloadSlide((slideIndex.current + 1) % slides.length);

    const interval = window.setInterval(() => {
      const previous = slideIndex.current;
      const next = (previous + 1) % slides.length;
      slideIndex.current = next;
      setPreviousSlide(previous);
      setActiveSlide(next);
      preloadSlide((next + 1) % slides.length);
      window.clearTimeout(fadeTimeout);
      fadeTimeout = window.setTimeout(() => setPreviousSlide(null), 1400);
    }, 5000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(fadeTimeout);
    };
  }, [entered]);

  return (
    <div className="welcome-transition">
      <AnimatePresence mode="wait" initial={false}>
        {!entered ? (
          <motion.section
            key="welcome"
            className="landing-welcome"
            aria-labelledby="landing-welcome-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
          >
            <div className="landing-welcome-shade" />
            <div className="landing-welcome-layout">
              <motion.div
                className="landing-welcome-content"
                initial={{ opacity: 0, y: 26, filter: 'blur(9px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.95, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src="/ahtclogo.png" alt="Al Haramain Tech Solutions" width={128} height={128} priority unoptimized className="landing-welcome-logo" />
                <p className="eyebrow">Thoughtful technology, built around people</p>
                <h1 id="landing-welcome-title">Welcome to Al Haramain Tech Solutions</h1>
                <p className="landing-welcome-description">Digital products and software, designed with care and engineered for what comes next.</p>
                <div className="landing-welcome-actions">
                  <motion.button
                    type="button"
                    onClick={onEnterHome}
                    whileHover={{ y: -3, scale: 1.025 }}
                    whileTap={{ scale: 0.98 }}
                    className="button-primary landing-welcome-button"
                  >
                    Let&apos;s Get Started <ArrowRight size={17} />
                  </motion.button>
                  <Link href="/services" className="button-secondary landing-welcome-secondary">
                    Explore services <ArrowDown size={16} />
                  </Link>
                </div>
              </motion.div>
              <div className="landing-robot-scene">
                <div className="robot-aura" />
                <div className="tech-orbit-ring" aria-hidden="true">
                  {techStack.map((technology) => (
                    <span className="tech-orbit-badge" key={technology}>
                      <span>{technology}</span>
                    </span>
                  ))}
                </div>
                <svg className="hologram-robot" viewBox="0 0 420 420" role="img" aria-label="A glowing blue AI robot waving hello">
                  <defs>
                    <linearGradient id="robot-shell" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#e0f7ff" />
                      <stop offset="0.46" stopColor="#67d8ff" />
                      <stop offset="1" stopColor="#2586ec" />
                    </linearGradient>
                    <linearGradient id="robot-face" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#071426" />
                      <stop offset="1" stopColor="#123c68" />
                    </linearGradient>
                    <filter id="robot-glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <ellipse cx="210" cy="363" rx="91" ry="13" fill="#38bdf8" opacity=".18" />
                  <path d="M144 232 Q210 205 276 232 L290 321 Q210 351 130 321 Z" fill="url(#robot-shell)" stroke="#b9f0ff" strokeWidth="4" />
                  <path d="M169 253 Q210 237 251 253 L258 303 Q210 319 162 303 Z" fill="url(#robot-face)" opacity=".94" />
                  <path d="M188 276h44M199 289h22" stroke="#58d9ff" strokeWidth="5" strokeLinecap="round" opacity=".85" />
                  <path d="M151 247 126 267 118 310" fill="none" stroke="url(#robot-shell)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="118" cy="311" r="14" fill="#5bcfff" stroke="#d8f8ff" strokeWidth="4" />
                  <g className="robot-wave-arm">
                    <path d="M270 244 300 222 320 188 333 162" fill="none" stroke="url(#robot-shell)" strokeWidth="23" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="300" cy="222" r="14" fill="#49bfff" stroke="#d8f8ff" strokeWidth="4" />
                    <path d="M324 164 322 143M334 159 339 137M344 158 354 139M351 165 367 151M326 168Q338 150 353 158L364 168Q366 175 359 180L345 190Q337 195 331 189Z" fill="url(#robot-shell)" stroke="#d8f8ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <path d="M175 319 169 346M245 319 251 346" stroke="#63d6ff" strokeWidth="20" strokeLinecap="round" />
                  <path d="M145 348h48M227 348h48" stroke="#d7f7ff" strokeWidth="12" strokeLinecap="round" />
                  <path d="M149 134Q149 96 184 91H236Q271 96 271 134V166Q271 194 244 201H176Q149 194 149 166Z" fill="url(#robot-shell)" stroke="#dcf8ff" strokeWidth="4" />
                  <rect x="164" y="112" width="92" height="67" rx="24" fill="url(#robot-face)" />
                  <g filter="url(#robot-glow)" fill="#75e5ff">
                    <ellipse cx="190" cy="144" rx="7" ry="10" />
                    <ellipse cx="230" cy="144" rx="7" ry="10" />
                  </g>
                  <path d="M195 162q15 11 30 0" fill="none" stroke="#75e5ff" strokeWidth="4" strokeLinecap="round" />
                  <path d="M210 91V73" stroke="#83e6ff" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="210" cy="66" r="9" fill="#8cecff" filter="url(#robot-glow)" />
                  <path d="M143 135h-12v36h13M277 135h12v36h-13" fill="#42aeea" stroke="#b9f0ff" strokeWidth="4" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="home-hero"
            className="welcome-hero"
            aria-labelledby="welcome-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55 }}
          >
            <div className="welcome-slides" aria-hidden="true">
              {previousSlide !== null ? (
                <motion.div
                  className="welcome-slide welcome-slide-previous"
                  key={`previous-${slides[previousSlide]}`}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.35, ease: 'easeInOut' }}
                >
                  <Image className="welcome-slide-bleed" src={slides[previousSlide]} alt="" fill unoptimized sizes="100vw" />
                  <Image className="welcome-slide-main" src={slides[previousSlide]} alt="" fill unoptimized sizes="100vw" />
                </motion.div>
              ) : null}
              <motion.div
                className="welcome-slide"
                key={slides[activeSlide]}
                initial={{ opacity: previousSlide === null ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.35, ease: 'easeInOut' }}
              >
                <Image className="welcome-slide-bleed" src={slides[activeSlide]} alt="" fill priority unoptimized sizes="100vw" />
                <Image className="welcome-slide-main" src={slides[activeSlide]} alt="" fill priority unoptimized sizes="100vw" />
              </motion.div>
            </div>
            <div className="welcome-overlay-tint" />
            <div className="home-hero-copy">
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles size={14} /> Digital experiences, thoughtfully engineered
              </motion.p>
              <motion.h1
                id="welcome-title"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.08, ease: 'easeOut' }}
              >
                Technical precision.<br />
                <em>Human collaboration.</em>
              </motion.h1>
              <motion.p
                className="welcome-subtitle"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.18 }}
              >
                We build considered software, digital products, and intelligent workflows for businesses ready to move forward.
              </motion.p>
              <motion.div
                className="welcome-actions"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <a href="#home-content" className="button-primary welcome-button">
                  Let’s Get Started <ArrowRight size={17} />
                </a>
                <a href="#home-content" className="button-secondary welcome-explore">
                  Explore <ArrowDown size={16} />
                </a>
              </motion.div>
              <div className="welcome-proof"><span>Thoughtful design</span><span>Reliable engineering</span><span>End-to-end delivery</span></div>
            </div>
            <a href="#home-content" className="welcome-scroll" aria-label="Scroll to explore">
              <span>Scroll to explore</span><ArrowDown size={15} />
            </a>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
