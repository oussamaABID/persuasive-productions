import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import ChatbotPlaceholder from '@/components/organisms/ChatbotPlaceholder';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PortfolioGrid } from '@/features/portfolio/components/PortfolioGrid';
import { GalleryCollection } from '@/lib/gallery';

interface PortfolioViewProps {
  collections: GalleryCollection[];
  content: typeof import('@/content/site-content.json');
}

export default function PortfolioView({ collections, content }: PortfolioViewProps) {
  return (
    <main className="relative min-h-screen flex flex-col bg-background pt-40">
      <Navbar content={content} />
      
      <section className="site-container flex-grow">
        <SectionHeading 
          alignment="left"
          subtitle="Portfolio"
          title={content.portfolio.title}
          className="mb-24"
        />

        {collections.length === 0 ? (
          <div className="py-40 text-center glass rounded-sm border-dashed border-accent/20 max-w-4xl mx-auto">
            <span className="text-4xl mb-6 block">❀</span>
            <p className="text-muted-foreground italic text-lg">
              Our curated collection is currently being prepared.<br />
              Please check back soon for the full experience.
            </p>
          </div>
        ) : (
          <PortfolioGrid collections={collections} content={content} />
        )}
      </section>

      <Footer content={content} />
      <ChatbotPlaceholder content={content} />
    </main>
  );
}
