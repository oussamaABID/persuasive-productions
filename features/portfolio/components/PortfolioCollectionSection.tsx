"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GalleryCollection } from '@/lib/gallery';

interface PortfolioCollectionSectionProps {
  collection: GalleryCollection;
  index: number;
  isLast: boolean;
  nextTitle?: string;
  onImageClick: (img: { file: string; title: string; alt: string }) => void;
  onNextClick: () => void;
  sectionRef: (el: HTMLElement | null) => void;
  ui: {
    scrollToDiscover: string;
    selection: string;
    untitled: string;
    signature: string;
    continue: string;
  };
}

/**
 * Individual collection section with header and responsive grid.
 */
export function PortfolioCollectionSection({ 
  collection, 
  index, 
  isLast, 
  nextTitle, 
  onImageClick, 
  onNextClick,
  sectionRef,
  ui 
}: PortfolioCollectionSectionProps) {
  return (
    <section 
      id={collection.id}
      ref={sectionRef}
      className="scroll-mt-40"
    >
      <header className="portfolio-collection-header">
        <div className="flex items-center gap-4">
          <span className="text-accent font-mono text-sm">{(index + 1).toString().padStart(2, '0')}</span>
          <div className="h-px w-12 bg-accent/30" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="portfolio-accent-line" />
          <h2 className="display-title text-white mb-8 italic">
            {collection.title}
          </h2>
          <div className="flex flex-col md:flex-row items-baseline gap-12">
            <p className="max-w-2xl text-muted-foreground leading-relaxed text-xl italic font-light">
              {collection.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="h-px w-24 bg-accent/30" />
              <span className="section-tag">{ui.scrollToDiscover}</span>
            </div>
          </div>
        </motion.div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        {collection.images.map((img, imgIdx) => {
          // Bento-style grid logic: full-width → medium halves → small thirds
          const isFullWidth = imgIdx % 6 === 0;
          const isMedium = imgIdx % 6 === 1 || imgIdx % 6 === 2;
          
          return (
            <motion.div 
              key={imgIdx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: (imgIdx % 3) * 0.1 }}
              className={cn(
                "portfolio-item group",
                isFullWidth ? "md:col-span-12 aspect-cinematic" : 
                isMedium ? "md:col-span-6 aspect-video" :
                "md:col-span-4 aspect-square"
              )}
              onClick={() => onImageClick(img)}
            >
              <Image 
                src={img.file} 
                alt={img.alt} 
                fill 
                sizes={isFullWidth ? "(max-width: 1280px) 100vw, 1200px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"}
                priority={index === 0 && imgIdx === 0}
                className="image-hover-zoom"
              />
              <div className="portfolio-item-overlay">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-accent uppercase tracking-widest text-xxs font-bold mb-3">{ui.selection}</p>
                    <h3 className="text-white text-2xl font-serif italic mb-2">{img.title || ui.untitled}</h3>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Maximize2 className="text-white/40" size={20} />
                  </div>
                </div>
                <div className="portfolio-item-divider" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <footer className="portfolio-section-footer">
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="portfolio-footer-line" 
        />
        <div className="text-center space-y-6">
          <span className="text-accent text-3xl opacity-40 block">❀</span>
          <p className="text-xxs uppercase tracking-widest text-accent/30 font-bold">{ui.signature}</p>
          {!isLast && nextTitle && (
            <button 
              onClick={onNextClick}
              className="portfolio-continue-btn"
            >
              <span className="text-tiny uppercase tracking-widest">{ui.continue} {nextTitle}</span>
              <div className="h-12 w-px bg-accent/20 group-hover:bg-accent/60 group-hover:h-20 transition-all duration-premium" />
            </button>
          )}
        </div>
      </footer>
    </section>
  );
}
