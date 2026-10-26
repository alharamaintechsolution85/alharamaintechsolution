'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Layers2, Moon, Palette, Settings2, Sun, Type, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'blend';

type ThemeState = {
  mode: ThemeMode;
  accent: string;
  font: string;
  palette: string;
};

const accentPresets = [
  { name: 'Terracotta', value: '#C25E00' },
  { name: 'Warm Gold', value: '#B45309' },
  { name: 'Sage Mint', value: '#10B981' },
  { name: 'Soft Rose', value: '#F43F5E' },
  { name: 'Slate', value: '#64748B' },
];

const fontPresets = [
  { label: 'Inter', value: 'Inter' },
  { label: 'Poppins', value: 'Poppins' },
  { label: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans' },
  { label: 'Outfit', value: 'Outfit' },
  { label: 'Playfair Display', value: 'Playfair Display' },
  { label: 'Roboto', value: 'Roboto' },
];

const defaultTheme: ThemeState = {
  mode: 'light',
  accent: '#C25E00',
  font: 'Inter',
  palette: 'Terracotta',
};

const hexToRgba = (hex: string, alpha: number) => {
  const clean = hex.replace('#', '');
  const value = clean.length === 3 ? clean.split('').map((char) => char + char).join('') : clean;
  const parsed = Number.parseInt(value, 16);
  const r = (parsed >> 16) & 255;
  const g = (parsed >> 8) & 255;
  const b = parsed & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function readStoredTheme(): ThemeState {
  if (typeof window === 'undefined') return defaultTheme;

  try {
    const saved = window.localStorage.getItem('ahts-theme');
    if (!saved) return defaultTheme;

    const parsed = JSON.parse(saved) as Partial<ThemeState>;
    return {
      mode: parsed.mode === 'dark' || parsed.mode === 'blend' ? parsed.mode : 'light',
      accent: parsed.accent ?? defaultTheme.accent,
      font: parsed.font ?? defaultTheme.font,
      palette: parsed.palette ?? defaultTheme.palette,
    };
  } catch {
    return defaultTheme;
  }
}

function applyTheme(theme: ThemeState) {
  const root = document.documentElement;
  const isLight = theme.mode === 'light';
  const isBlend = theme.mode === 'blend';

  root.style.setProperty('--accent-color', theme.accent);
  root.style.setProperty('--accent-soft', hexToRgba(theme.accent, isLight ? 0.12 : 0.18));
  root.style.setProperty('--navy-color', theme.accent);
  root.style.setProperty('--navy-soft', hexToRgba(theme.accent, 0.14));
  root.style.setProperty('--font-body', `${theme.font}, sans-serif`);
  root.style.setProperty('--font-display', `${theme.font}, sans-serif`);
  root.style.setProperty('--page-bg', isLight ? '#F7F7F8' : isBlend ? `color-mix(in srgb, ${theme.accent} 14%, #111827)` : '#111827');
  root.style.setProperty('--page-surface', isLight ? 'rgba(255, 255, 255, 0.88)' : isBlend ? `color-mix(in srgb, ${theme.accent} 15%, #1f2937)` : 'rgba(17, 24, 39, 0.92)');
  root.style.setProperty('--page-strong', isLight ? '#fef3c7' : theme.accent);
  root.style.setProperty('--text-primary', isLight ? '#111827' : '#f1f5f9');
  root.style.setProperty('--text-muted', isLight ? '#64748b' : '#a1aabd');
  root.style.setProperty('--border-color', isLight ? 'rgba(148, 163, 184, 0.24)' : hexToRgba(theme.accent, 0.2));
  root.style.setProperty('--heading-stack', isLight ? 'rgba(255, 255, 255, 0.76)' : 'rgba(18, 22, 35, 0.96)');
  root.style.setProperty('--shadow-soft', isLight ? '0 20px 60px rgba(15, 23, 42, 0.1)' : '0 20px 60px rgba(0, 0, 0, 0.28)');
  root.style.colorScheme = isLight ? 'light' : 'dark';
  root.classList.toggle('dark', theme.mode === 'dark');
  root.classList.toggle('blend', isBlend);
  document.body.style.color = 'var(--text-primary)';
  window.localStorage.setItem('ahts-theme', JSON.stringify(theme));
}

export function ThemePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeState>(defaultTheme);

  useEffect(() => {
    const storedTheme = readStoredTheme();
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <div className="theme-settings">
      <button
        type="button"
        onClick={() => setTheme((prev) => ({ ...prev, mode: prev.mode === 'light' ? 'dark' : 'light' }))}
        aria-label={`Switch to ${theme.mode === 'dark' ? 'light' : 'dark'} theme`}
        aria-pressed={theme.mode === 'dark'}
        className="theme-toggle"
      >
        {theme.mode === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
        <span>{theme.mode === 'dark' ? 'Dark' : 'Light'}</span>
        <span className="theme-toggle-track" aria-hidden="true"><span /></span>
      </button>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="theme-settings-panel"
        className="theme-settings-button"
      >
        {theme.mode === 'light' ? <Sun size={15} /> : theme.mode === 'dark' ? <Moon size={15} /> : <Layers2 size={15} />}
        <span>Settings</span>
        <Settings2 size={14} />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            id="theme-settings-panel"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="theme-settings-panel"
            aria-label="Theme settings"
          >
            <div className="theme-settings-heading">
              <div className="theme-settings-title"><Palette size={16} /> Theme settings</div>
              <button type="button" className="theme-settings-close" onClick={() => setIsOpen(false)} aria-label="Close settings">
                <X size={17} />
              </button>
            </div>

            <div className="theme-settings-modes" aria-label="Color theme">
              {([
                { mode: 'light', label: 'Light', Icon: Sun },
                { mode: 'dark', label: 'Dark', Icon: Moon },
                { mode: 'blend', label: 'Blend', Icon: Layers2 },
              ] as const).map(({ mode, label, Icon }) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setTheme((prev) => ({ ...prev, mode }))}
                  aria-pressed={theme.mode === mode}
                  className={`theme-mode-option${theme.mode === mode ? ' theme-mode-active' : ''}`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            <div className="theme-settings-section">
              <p className="theme-settings-label">Accent color</p>
              <div className="theme-settings-palettes">
                {accentPresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    title={preset.name}
                    aria-label={preset.name}
                    aria-pressed={theme.accent === preset.value}
                    onClick={() => setTheme((prev) => ({ ...prev, accent: preset.value, palette: preset.name }))}
                    className="theme-palette-option"
                    style={{ background: preset.value }}
                  >
                    {theme.accent === preset.value ? <Check size={14} className="text-white" /> : null}
                  </button>
                ))}
              </div>
              <p className="theme-settings-selected">{theme.palette}</p>
            </div>

            <div className="theme-settings-section">
              <div className="theme-settings-label theme-settings-type"><Type size={13} /> Typography</div>
              <div className="theme-font-options">
                {fontPresets.map((font) => (
                  <button
                    key={font.value}
                    type="button"
                    onClick={() => setTheme((prev) => ({ ...prev, font: font.value }))}
                    aria-pressed={theme.font === font.value}
                    className={`theme-font-option${theme.font === font.value ? ' theme-font-active' : ''}`}
                  >
                    <span>{font.label}</span>
                    {theme.font === font.value ? <Check size={14} /> : null}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
