'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { MessageSquare, X, Sparkles, RotateCcw } from 'lucide-react';
import { SiteContent } from '@/lib/types';

// ─── Phase 1: Dynamic import — zero payload on initial page load ───────────────
// react-chatbot-kit and ChatbotInterface are loaded ONLY after user clicks trigger.
const ChatbotInterface = dynamic(
  () => import('@/features/chatbot/components/ChatbotInterface'),
  {
    ssr: false,
    loading: () => (
      <div className="chatbot-messages flex items-center justify-center">
        <div className="chatbot-bot-bubble flex items-center gap-2">
          <Sparkles size={12} className="text-accent animate-pulse" />
          <span className="text-muted-foreground/60 text-xs">Initialising concierge…</span>
        </div>
      </div>
    ),
  }
);

// ─── Framer Motion variants ────────────────────────────────────────────────────

const windowVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 12,
    transformOrigin: 'bottom right',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transformOrigin: 'bottom right',
    transition: {
      type: 'spring' as const,
      stiffness: 420,
      damping: 32,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 8,
    transformOrigin: 'bottom right',
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] },
  },
};

const iconVariants = {
  initial: { opacity: 0, scale: 0.5, rotate: -15 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    scale: 1.4,
    rotate: 15,
    transition: { duration: 0.15, ease: [0.4, 0, 1, 1] as [number, number, number, number] },
  },
};

// ─── Component ─────────────────────────────────────────────────────────────────

interface ChatbotPlaceholderProps {
  content: SiteContent;
}

export default function ChatbotPlaceholder({ content }: ChatbotPlaceholderProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Track whether the interface has ever been opened to preserve state after close
  const [hasOpened, setHasOpened] = useState(false);
  // Key to force remount of ChatbotInterface when clearing history
  const [chatKey, setChatKey] = useState(0);

  const clearHistory = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('studio_concierge_history');
      setChatKey((prev) => prev + 1);
    }
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setHasOpened(true);
      return !prev;
    });
  }, []);

  return (
    // Safe area: bottom + right offset respects device notches/rounded corners
    <div
      className="fixed z-chatbot"
      style={{
        bottom: 'max(2.5rem, env(safe-area-inset-bottom, 2.5rem))',
        right: 'max(2.5rem, env(safe-area-inset-right, 2.5rem))',
      }}
    >
      {/* ── Chat Window ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={windowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="chatbot-shell"
            role="dialog"
            aria-modal="true"
            aria-label="Studio Concierge chat"
          >
            {/* Header */}
            <header className="chatbot-header">
              <span className="chatbot-header-dot" aria-hidden="true" />
              <div className="flex-1">
                <h2 className="text-sm font-serif font-bold italic text-foreground leading-none">
                  {content.common.chatbot.title}
                </h2>
                <p className="text-xxs text-muted-foreground/50 mt-0.5 uppercase tracking-widest-plus">
                  Online · Persuasive Productions
                </p>
              </div>
              <div className="flex items-center gap-1 -mr-1">
                <button
                  onClick={clearHistory}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-accent/10 text-accent hover:bg-accent/20 transition-all border border-accent/20"
                  aria-label="Reset conversation"
                  title="Reset conversation"
                >
                  <RotateCcw size={12} />
                  <span className="text-[10px] font-bold uppercase tracking-tight">Reset</span>
                </button>
                <button
                  onClick={toggle}
                  className="text-muted-foreground/40 hover:text-foreground transition-colors p-1"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </header>

            {/* Interface — lazy-loaded, preserved in DOM once mounted */}
            {hasOpened && <ChatbotInterface key={chatKey} content={content} onClose={() => setIsOpen(false)} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Trigger ──────────────────────────────────────────────────────── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        className="chatbot-trigger"
        aria-label={isOpen ? 'Close Studio Concierge' : 'Open Studio Concierge'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" {...iconVariants}>
              <X size={26} />
            </motion.div>
          ) : (
            <motion.div key="open" {...iconVariants}>
              <MessageSquare size={26} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
