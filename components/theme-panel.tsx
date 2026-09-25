'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Moon, Palette, Settings2, Sun, Type } from 'lucide-react';
import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

type ThemeState = {
  mode: ThemeMode;
  accent: string;
  font: string;
  palette: string;
};

const accentPresets = [
  { name: 'Airy Cyan', value: '#06B6D4' },
  { name: 'Warm Sand', value: '#C084FC' },
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
  accent: '#06B6D4',
  font: 'Inter',
  palette: 'Airy Cyan',
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
  if (typeof window === 'undefined') {
    return defaultTheme;
  }

  try {
    const saved = window.localStorage.getItem('ahts-theme');
    if (!saved) {
      return defaultTheme;
    }

    const parsed = JSON.parse(saved) as Partial<ThemeState>;
    return {
      mode: parsed.mode === 'dark' ? 'dark' : 'light',
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
  root.style.setProperty('--accent-color', theme.accent);
  root.style.setProperty('--accent-soft', hexToRgba(theme.accent, 0.12));
  root.style.setProperty('--navy-color', theme.accent);
  root.style.setProperty('--navy-soft', hexToRgba(theme.accent, 0.14));
  root.style.setProperty('--font-body', `${theme.font}, sans-serif`);
  root.style.setProperty('--font-display', `${theme.font}, sans-serif`);
  root.style.setProperty('--page-bg', theme.mode === 'dark' ? '#020817' : '#f8fafc');
  root.style.setProperty('--page-surface', theme.mode === 'dark' ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255,255,255,0.7)');
  root.style.setProperty('--page-strong', theme.mode === 'dark' ? theme.accent : '#e0f2fe');
  root.style.setProperty('--text-primary', theme.mode === 'dark' ? '#e2e8f0' : '#0f172a');
  root.style.setProperty('--text-muted', theme.mode === 'dark' ? '#cbd5e1' : '#475569');
  root.style.setProperty('--heading-stack', theme.mode === 'dark' ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.65)');
  root.classList.toggle('dark', theme.mode === 'dark');
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

  return (
    <div className="fixed right-4 top-4 z-50 md:right-6 md:top-6">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg backdrop-blur-md transition hover:-translate-y-0.5"
      >
        {theme.mode === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
        <span>Settings</span>
        <Settings2 size={16} className="text-slate-500" />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mt-3 w-[300px] rounded-3xl border border-slate-200/70 bg-white/90 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Palette size={16} className="text-cyan-500" />
                Theme Studio
              </div>
              <button
                type="button"
                onClick={() => setTheme((prev) => ({ ...prev, mode: prev.mode === 'dark' ? 'light' : 'dark' }))}
                className="flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600"
              >
                {theme.mode === 'dark' ? <Sun size={12} /> : <Moon size={12} />}
                {theme.mode === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Palette</p>
                <div className="grid grid-cols-5 gap-2">
                  {accentPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      title={preset.name}
                      onClick={() => setTheme((prev) => ({ ...prev, accent: preset.value, palette: preset.name }))}
                      className="flex h-10 items-center justify-center rounded-xl border transition hover:scale-[1.02]"
                      style={{
                        background: preset.value,
                        borderColor: theme.accent === preset.value ? '#0f172a' : 'transparent',
                        boxShadow: theme.accent === preset.value ? '0 0 0 2px rgba(15,23,42,0.12)' : 'none',
                      }}
                    >
                      {theme.accent === preset.value ? <Check size={14} className="text-white" /> : null}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <Type size={12} />
                  Typography
                </div>
                <div className="space-y-2">
                  {fontPresets.map((font) => (
                    <button
                      key={font.label}
                      type="button"
                      onClick={() => setTheme((prev) => ({ ...prev, font: font.value }))}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition ${
                        theme.font === font.value
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span>{font.label}</span>
                      {theme.font === font.value ? <Check size={14} /> : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
