"use client";

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PortfolioLightboxProps {
  selectedImage: { file: string; title: string; alt: string } | null;
  onClose: () => void;
  ui: {
    masterpieceView: string;
  };
}

/**
 * Full-screen lightbox portal for viewing images.
 */
export function PortfolioLightbox({ selectedImage, onClose, ui }: PortfolioLightboxProps) {
  return (
    <AnimatePresence>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lightbox-overlay"
          onClick={onClose}
        >
          <motion.button 
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close Lightbox"
          >
            <X size={32} />
          </motion.button>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lightbox-content-shell"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image 
                src={selectedImage.file} 
                alt={selectedImage.alt} 
                fill 
                className="object-contain"
                priority
              />
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-accent uppercase tracking-widest text-xxs font-bold">{ui.masterpieceView}</p>
              <h3 className="text-white text-3xl font-serif italic">{selectedImage.title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
