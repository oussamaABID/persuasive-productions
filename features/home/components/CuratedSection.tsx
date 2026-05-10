"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GalleryCollection } from '@/lib/gallery';

import { SiteContent } from '@/lib/types';

interface CuratedSectionProps {
  content: SiteContent;
  collections: GalleryCollection[];
}

export function CuratedSection({ content, collections }: CuratedSectionProps) {
  const router = useRouter();

  return (
    <section className="py-40 bg-black">
      <div className="site-container">
        <SectionHeading 
          subtitle={content.home.curated.subtitle}
          title={content.home.curated.title}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {collections.map((collection) => (
            <motion.div 
              key={collection.id}
              whileHover={{ y: -10 }}
              className="gallery-card"
              onClick={() => router.push(`/portfolio#${collection.id}`)}
            >
              <div className="gallery-card-glow" />
              <Image 
                src={collection.coverImage}
                alt={collection.title}
                fill
                className="object-cover image-hover-zoom"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              />
              <div className="gallery-card-overlay" />
              <div className="gallery-card-content">
                <div className="curated-card-tag">
                  {content.common.buttons.explore}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3 italic">{collection.title}</h3>
                <p className="curated-card-description">
                  {collection.description}
                </p>
                <div className="curated-divider" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            variant="outline" 
            className="px-12 py-6 text-xs uppercase tracking-widest"
            onClick={() => router.push('/portfolio')}
          >
            {content.common.buttons.viewAll}
          </Button>
        </div>
      </div>
    </section>
  );
}
