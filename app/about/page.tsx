import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Compass, GraduationCap, HeartHandshake, Lightbulb } from 'lucide-react';

const values = [
  { icon: Compass, title: 'Clear direction', text: 'We align delivery to the outcomes that matter, keeping the work focused and practical.' },
  { icon: Lightbulb, title: 'Thoughtful solutions', text: 'We choose technology to solve a real problem, not just to add complexity.' },
  { icon: HeartHandshake, title: 'Close collaboration', text: 'We work as an extension of your team, communicating openly from discovery through launch.' },
];

export default function AboutPage() {
  return (
    <main className="page-main">
      <section className="page-intro">
        <p className="eyebrow">About Al Haramain</p>
        <h1 className="page-title">A product-minded technology team with a practical approach.</h1>
        <p className="page-lead">We help organizations make meaningful ideas useful through reliable software and thoughtful digital experiences.</p>
      </section>
      <section className="about-feature">
        <div className="about-image"><Image src="/ahtchero.png" alt="Al Haramain Tech Solutions digital workspace" width={840} height={720} /></div>
        <div className="about-copy">
          <p className="eyebrow">Our approach</p>
          <h2 className="section-title">Build the right thing, then build it well.</h2>
          <p className="text-muted mt-4 leading-7">Founded and led by Hunza Saleem, Al Haramain Tech Solutions brings product thinking, modern engineering, and end-to-end delivery together. We partner with teams to understand their goals, make informed decisions, and deliver software that can evolve with their business.</p>
          <div className="about-checks">
            <p><CheckCircle2 size={18} /> User-centered product experiences</p>
            <p><CheckCircle2 size={18} /> Maintainable, scalable engineering</p>
            <p><CheckCircle2 size={18} /> Clear collaboration from start to launch</p>
          </div>
        </div>
      </section>
      <section className="content-section">
        <div className="section-heading"><div><p className="eyebrow">What guides us</p><h2 className="section-title">Good work starts with good partnership.</h2></div></div>
        <div className="service-teaser-grid">
          {values.map(({ icon: Icon, title, text }) => (
            <article className="teaser-card" key={title}><span className="icon-tile"><Icon size={20} /></span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>
      <section className="credentials-section">
        <div className="section-heading">
          <div><p className="eyebrow">Education & experience</p><h2 className="section-title">A strong foundation in engineering.</h2></div>
        </div>
        <div className="credentials-grid">
          <article className="credential-card">
            <span className="credential-icon"><GraduationCap size={20} /></span>
            <div><p className="credential-label">Education</p><h3>BS Computer Science (BSCS)</h3><p>University of Gujrat (UOG)</p></div>
          </article>
          <article className="credential-card">
            <span className="credential-icon"><GraduationCap size={20} /></span>
            <div><p className="credential-label">Education</p><h3>Intermediate — FSc Pre-Engineering / ICS</h3><p>Punjab Group of Colleges (PGC)</p></div>
          </article>
          <article className="credential-card">
            <span className="credential-icon"><BriefcaseBusiness size={20} /></span>
            <div><p className="credential-label">Professional experience</p><h3>3+ years</h3><p>Software engineering and full-stack AI web development experience.</p></div>
          </article>
        </div>
      </section>
      <section className="page-cta">
        <div><p className="eyebrow">Let’s work together</p><h2 className="section-title">Have a product idea to explore?</h2></div>
        <Link href="/contact" className="button-primary">Start a conversation <ArrowRight size={16} /></Link>
      </section>
    </main>
  );
}
