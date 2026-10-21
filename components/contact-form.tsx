'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';

type ContactFormProps = {
  onClose?: () => void;
  compact?: boolean;
};

export function ContactForm({ onClose, compact = false }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const details = formData.get('details');
    const subject = encodeURIComponent(`Project enquiry: ${name}`);
    const message = `Name: ${name}\nEmail: ${email}\nProject details: ${details}`;
    const body = encodeURIComponent(message);

    if (formData.get('channel') === 'whatsapp') {
      window.open(`https://wa.me/971557162816?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = `mailto:alharamaintechsolution@gmail.com?subject=${subject}&body=${body}`;
    }
    setSubmitted(true);
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="submitted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center"
          role="status"
        >
          <CheckCircle2 className="mx-auto text-emerald-500" size={30} />
          <h3 className="mt-3 text-lg font-bold">Your email draft is ready</h3>
          <p className="mt-2 text-sm text-muted">Continue in your selected app to send your enquiry.</p>
          {onClose ? (
            <button type="button" onClick={onClose} className="mt-5 text-sm font-semibold text-[var(--accent-color)]">
              Close
            </button>
          ) : null}
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="grid gap-4"
        >
          <label className="grid gap-1.5 text-sm font-medium">
            Name
            <input name="name" autoComplete="name" required className="form-control" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Email
            <input name="email" type="email" autoComplete="email" required className="form-control" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Project details
            <textarea name="details" required rows={4} className="form-control resize-y" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Send via
            <select name="channel" className="form-control" defaultValue="email">
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </label>
          <button type="submit" className="button-primary mt-1">
            Send enquiry <ArrowRight size={16} />
          </button>
          {!compact ? (
            <div className="form-direct-links">
              <a href="mailto:alharamaintechsolution@gmail.com"><Mail size={15} /> Email</a>
              <a href="https://wa.me/971557162816" target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp</a>
              <a href="tel:+971557162816">Call UAE</a>
              <a href="tel:03245836382">Call Pakistan</a>
            </div>
          ) : null}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
