import type { Metadata } from 'next';
import { site } from '@/data/site';
import EntryHero from '@/components/home/entry-hero';

export const metadata: Metadata = {
  title: `${site.name} — ${site.identity}`,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${site.name} — ${site.identity}`,
    description: site.description,
    type: 'website',
  },
};


/**
 * Cinematic entry gateway — single-screen experience for route /.
 * 
 * Transforms the website into two connected experiences:
 * 
 * EXPERIENCE A — THE CINEMATIC ENTRY PAGE (route /)
 *   A premium dark computational entrance with 3D portal and human figure.
 *   Fits the viewport with no required scrolling.
 *   Primary CTA: ENTER CN2.DEV → navigates to /hub, the digital headquarters.
 *
 * EXPERIENCE B — THE PROFESSIONAL PLATFORM (/hub and its destinations)
 *   Contains the full professional website: personal background, education,
 *   skills, projects, research, capabilities, certifications, contact.
 * 
 * The entry page introduces the identity. The headquarters routes to the
 * substance. Do not place every project, research article, capability, and
 * professional detail on the entry page.
 */
export default function HomePage() {
  // Entry page: / — cinematic gateway only
  // Other routes are rendered by their respective page components
  // (/about, /builds, /research, etc.) via Next.js file-based routing
  // @entry-hero-v2 — cinematic gateway rendering
  return <EntryHero />;
}