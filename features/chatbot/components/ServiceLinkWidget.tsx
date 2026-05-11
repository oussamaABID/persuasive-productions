'use client';

import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight } from 'lucide-react';

/**
 * ServiceLinkWidget — Molecule.
 * Branded CTA to navigate to /packages and close the chat.
 * Leverages .chatbot-shell scoped styles in globals.css for compact sizing and black text.
 */
export default function ServiceLinkWidget({ onClose }: { onClose?: () => void }) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/packages');
    if (onClose) onClose();
  };

  return (
    <div className="chatbot-widget-area mt-1 mb-1">
      <button
        onClick={handleNavigation}
        className="nav-button w-full group"
        aria-label="View our full service list"
      >
        <div className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-accent transition-all duration-300">
          <Sparkles size={12} />
        </div>
        <div className="flex-1 text-left">
          <p className="uppercase tracking-widest font-bold leading-none mb-0.5 opacity-60">
            Official Services
          </p>
          <p className="font-serif italic leading-tight">
            Explore Tiers & Availability
          </p>
        </div>
        <ArrowRight size={14} className="shrink-0 group-hover:translate-x-1 group-hover:text-accent transition-all duration-300" />
      </button>
    </div>
  );
}
