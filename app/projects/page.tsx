import { ProjectGallery } from '@/components/projects/project-gallery';

export default function ProjectsPage() {
  return (
    <main className="page-main">
      <section className="page-intro">
        <p className="eyebrow">Selected work</p>
        <h1 className="page-title">Products and platforms built for real-world needs.</h1>
        <p className="page-lead">Explore projects across enterprise software, healthcare, aviation, and digital utilities.</p>
      </section>
      <ProjectGallery />
    </main>
  );
}
