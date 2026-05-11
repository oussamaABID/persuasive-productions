'use client';

import { useRouter } from 'next/navigation';
import { CalendarDays, ArrowRight } from 'lucide-react';

/**
 * BookingWidget — Atom.
 * Renders a branded CTA that navigates to /book.
 * Uses nav-button design token — no ad-hoc utilities.
 */
export default function BookingWidget() {
  const router = useRouter();

  return (
    <div className="chatbot-widget-area mt-2 mb-1">
      <button
        onClick={() => router.push('/packages')}
        className="nav-button w-full gap-3 text-left"
        aria-label="Navigate to our services page"
      >
        <CalendarDays size={14} className="shrink-0" />
        <span>View Our Services</span>
        <ArrowRight size={12} className="ml-auto shrink-0" />
      </button>
    </div>
  );
}
