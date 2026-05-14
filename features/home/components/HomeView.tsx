import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';

import { HeroSection } from './HeroSection';
import { VisionSection } from './VisionSection';

import { SiteContent } from '@/lib/types';

interface HomeViewProps {
  content: SiteContent;
}

/**
 * Main landing page view for Persuasive Productions.
 * Orchestrates sections and global layout.
 */
export default function HomeView({ content }: HomeViewProps) {
  return (
    <main className="relative min-h-screen bg-background pt-0">
      <Navbar content={content} />
      
      <HeroSection content={content} />

      <VisionSection content={content} />

      <Footer content={content} />

    </main>
  );
}
