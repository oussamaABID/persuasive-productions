'use client';

import { useRouter } from 'next/navigation';
import { CalendarDays, ArrowRight } from 'lucide-react';

/**
 * BookingWidget — Atom.
 * Renders a branded CTA that navigates to /packages.
 * Uses nav-button design token — compact via .chatbot-shell scoped styles.
 */
export default function BookingWidget({ onClose }: { onClose?: () => void }) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/packages');
    onClose?.();
  };

  return (
    <div className="chatbot-widget-area mt-1 mb-1">
      <button
        onClick={handleNavigation}
        className="nav-button w-full group"
        aria-label="Navigate to our services page"
      >
        <CalendarDays size={14} className="shrink-0" />
        <span className="flex-1 text-left font-bold uppercase tracking-widest text-[10px]">
          View Our Services
        </span>
        <ArrowRight size={12} className="shrink-0 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
