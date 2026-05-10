"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { PortfolioSidebar } from './PortfolioSidebar';
import { PortfolioCollectionSection } from './PortfolioCollectionSection';
import { PortfolioLightbox } from './PortfolioLightbox';
import { GalleryCollection } from '@/lib/gallery';

interface PortfolioGridProps {
  collections: GalleryCollection[];
  content: {
    portfolio: {
      ui: {
        collections: string;
        scrollExplore: string;
        scrollToDiscover: string;
        selection: string;
        signature: string;
        continue: string;
        untitled: string;
        masterpieceView: string;
      };
    };
  };
}

/**
 * Interactive grid for displaying photography collections with category filtering and lightbox view.
 * Orchestrates domain components for sidebar, sections, and lightbox.
 */
export function PortfolioGrid({ collections, content }: PortfolioGridProps) {
  const [activeSection, setActiveSection] = useState<string>(collections[0]?.id || "");
  const [selectedImage, setSelectedImage] = useState<{ file: string; title: string; alt: string } | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Stable ref callback — registers each section into sectionRefs and re-observes it
  const registerSection = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
    if (observerRef.current && el) {
      observerRef.current.observe(el);
    }
  }, []);

  useEffect(() => {
    // rootMargin: top=-15% keeps sidebar from jumping too early;
    // bottom=-40% means a section must occupy the upper 60% of the viewport to be "active"
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio that is intersecting
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        // Prefer the one that entered from the top (i.e. closest to viewport top)
        const top = intersecting.reduce((best, e) =>
          e.boundingClientRect.top < best.boundingClientRect.top ? e : best
        );
        setActiveSection(top.target.id);
      },
      {
        root: null,
        rootMargin: '-15% 0px -40% 0px',
        threshold: 0,
      }
    );

    observerRef.current = observer;

    // Observe all already-registered refs
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [collections]);

  /**
   * Smoothly scrolls to a specific collection section.
   */
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="portfolio-layout">
      {/* Quick Jump Sidebar */}
      <PortfolioSidebar 
        collections={collections}
        activeSection={activeSection}
        onScrollTo={scrollToSection}
        ui={{
          collections: content.portfolio.ui.collections,
          scrollExplore: content.portfolio.ui.scrollExplore
        }}
      />

      {/* Main Content */}
      <article className="flex-1 space-y-section-gap md:space-y-section-gap-large">
        {collections.map((collection, collectionIdx) => (
          <PortfolioCollectionSection 
            key={collection.id}
            collection={collection}
            index={collectionIdx}
            isLast={collectionIdx === collections.length - 1}
            nextTitle={collections[collectionIdx + 1]?.title}
            onImageClick={setSelectedImage}
            onNextClick={() => scrollToSection(collections[collectionIdx + 1].id)}
            sectionRef={registerSection(collection.id)}
            ui={{
              scrollToDiscover: content.portfolio.ui.scrollToDiscover,
              selection: content.portfolio.ui.selection,
              untitled: content.portfolio.ui.untitled,
              signature: content.portfolio.ui.signature,
              continue: content.portfolio.ui.continue
            }}
          />
        ))}
      </article>

      {/* Lightbox Portal */}
      <PortfolioLightbox 
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
        ui={{
          masterpieceView: content.portfolio.ui.masterpieceView
        }}
      />
    </section>
  );
}
