import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';

import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { AboutSection } from './AboutSection';
import { CuratedSection } from './CuratedSection';
import { QuoteSection } from './QuoteSection';

import { GalleryCollection } from '@/lib/gallery';
import { SiteContent } from '@/lib/types';

interface HomeViewProps {
  content: SiteContent;
  collections: GalleryCollection[];
}

/**
 * Main landing page view for Persuasive Productions.
 * Orchestrates sections and global layout.
 */
export default function HomeView({ content, collections }: HomeViewProps) {
  // Safety check for collections
  const homeCollections = collections?.filter(c => c.showOnHome).slice(0, 3) || [];

  return (
    <main className="relative min-h-screen bg-background pt-0">
      <Navbar content={content} />
      
      <HeroSection content={content} />

      <StatsSection stats={content.home.stats} />

      <AboutSection content={content} />

      <CuratedSection content={content} collections={homeCollections} />

      <QuoteSection content={content} />

      <Footer content={content} />

    </main>
  );
}
