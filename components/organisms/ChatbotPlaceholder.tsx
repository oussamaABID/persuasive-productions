"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Sparkles } from 'lucide-react';
import { SiteContent } from '@/lib/types';

interface ChatbotPlaceholderProps {
  content: SiteContent;
}

const ChatbotPlaceholder = ({ content }: ChatbotPlaceholderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-10 right-10 z-chatbot">
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gold-gradient shadow-gold-heavy flex items-center justify-center text-black relative z-10"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
            >
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-24 right-0 w-80 glass rounded-sm p-8 shadow-glass border border-accent/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Sparkles size={16} />
              </div>
              <h3 className="text-accent font-serif font-bold text-lg tracking-wide">{content.common.chatbot.title}</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-light">
              {content.common.chatbot.description}
            </p>
            
            <div className="h-px bg-gradient-to-r from-accent/20 to-transparent w-full mb-6"></div>
            
            <div className="flex items-center justify-between">
              <span className="form-label text-accent/60">{content.common.chatbot.phase}</span>
              <span className="text-tiny text-muted-foreground/40 uppercase tracking-widest italic text-right">{content.common.chatbot.status}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatbotPlaceholder;
