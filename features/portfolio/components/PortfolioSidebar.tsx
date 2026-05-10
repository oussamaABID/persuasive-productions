"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GalleryCollection } from '@/lib/gallery';

interface PortfolioSidebarProps {
  collections: GalleryCollection[];
  activeSection: string;
  onScrollTo: (id: string) => void;
  ui: {
    collections: string;
    scrollExplore: string;
  };
}

/**
 * Sidebar navigation for portfolio collections.
 */
export function PortfolioSidebar({ collections, activeSection, onScrollTo, ui }: PortfolioSidebarProps) {
  return (
    <aside className="portfolio-sidebar">
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-xxs font-bold uppercase tracking-widest text-accent/50 mb-6">
            {ui.collections}
          </h3>
          <nav className="space-y-4">
            {collections.map((collection, idx) => (
              <button
                key={collection.id}
                onClick={() => onScrollTo(collection.id)}
                className={cn(
                  "portfolio-sidebar-link",
                  activeSection === collection.id && "portfolio-sidebar-link-active"
                )}
              >
                <span className={cn(
                  "text-xxs font-mono transition-colors duration-500",
                  activeSection === collection.id ? "text-accent" : "text-muted-foreground"
                )}>
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <span className={cn(
                  "text-xs uppercase tracking-widest font-medium transition-all duration-500",
                  activeSection === collection.id ? "text-white" : "text-muted-foreground"
                )}>
                  {collection.title}
                </span>
                {activeSection === collection.id && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="h-px w-8 bg-accent"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="pt-8 border-t border-white/5">
          <p className="text-xxs text-muted-foreground italic leading-relaxed">
            {ui.scrollExplore}
          </p>
        </div>
      </div>
    </aside>
  );
}
