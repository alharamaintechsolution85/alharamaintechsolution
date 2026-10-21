import { Mail, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
  return (
    <main className="page-main">
      <section className="page-intro">
        <p className="eyebrow">Contact</p>
        <h1 className="page-title">Tell us what you’re ready to build.</h1>
        <p className="page-lead">Share a few details and we’ll help you explore the next step for your project.</p>
      </section>
      <section className="contact-layout">
        <div className="contact-panel">
          <p className="eyebrow">Get in touch directly</p>
          <h2 className="section-title">We’d love to hear from you.</h2>
          <p className="text-muted mt-3 leading-7">A quick note is enough to start. We’ll follow up to learn more about your goals and timeline.</p>
          <a className="contact-method" href="mailto:alharamaintechsolution@gmail.com"><Mail size={19} /> alharamaintechsolution@gmail.com</a>
          <a className="contact-method" href="https://wa.me/971557162816" target="_blank" rel="noreferrer"><MessageCircle size={19} /> Chat on WhatsApp</a>
          <a className="contact-method" href="tel:+971557162816"><Phone size={19} /> +971 55 716 2816</a>
          <a className="contact-method" href="tel:03245836382"><Phone size={19} /> 03245836382</a>
        </div>
        <div className="contact-form-card"><ContactForm /></div>
      </section>
    </main>
  );
}
