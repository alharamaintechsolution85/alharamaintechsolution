import './globals.css';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';

export const metadata: Metadata = {
  title: {
    default: 'Al Haramain Tech Solutions',
    template: '%s | Al Haramain Tech Solutions',
  },
  description: 'Digital products, custom software, and intelligent workflows for ambitious teams.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
