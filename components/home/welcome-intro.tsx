'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const welcomeMessage = "Welcome to Al Haramain Tech Solutions - Let's Get Started";

export function WelcomeIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.sessionStorage.getItem('ahts-welcome-seen')) setVisible(false);
  }, []);

  function dismiss() {
    window.sessionStorage.setItem('ahts-welcome-seen', 'true');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="welcome-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <div className="welcome-backdrop" />
          <motion.div
            className="welcome-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
              <p className="eyebrow">Digital experiences, thoughtfully engineered</p>
              <h1 className="welcome-typewriter" aria-label={welcomeMessage}>
                <motion.span
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.2, ease: 'easeOut' }}
                >
                  {welcomeMessage}
                </motion.span>
              </h1>
              <p className="welcome-subtitle">Explore our digital solutions.</p>
            <motion.button
              type="button"
              onClick={dismiss}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="button-primary welcome-button"
            >
              Explore Platform <ArrowRight size={17} />
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
