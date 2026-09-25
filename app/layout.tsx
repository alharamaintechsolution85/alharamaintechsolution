import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Al Haramain Tech Solutions',
  description: 'Remote-first software agency and portfolio platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
