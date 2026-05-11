'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const PORTFOLIO_CHIPS = [
  { label: 'Noir Portraits', href: '/portfolio#noir-portraits' },
  { label: 'Artistic Vision', href: '/portfolio#artistic-vision' },
  { label: 'Cinematic Essence', href: '/portfolio#cinematic-essence' },
  { label: 'Luxury Fashion', href: '/portfolio#luxury-fashion' },
];

/**
 * PortfolioWidget — Atom.
 * Renders chip-style navigation shortcuts to portfolio collections.
 * Uses chatbot-chip design token — no ad-hoc utilities.
 */
export default function PortfolioWidget() {
  return (
    <div className="chatbot-widget-area mt-2 mb-1 flex flex-wrap gap-2">
      {PORTFOLIO_CHIPS.map((chip) => (
        <Link
          key={chip.href}
          href={chip.href}
          className="chatbot-chip"
          aria-label={`View ${chip.label} collection`}
        >
          <ExternalLink size={10} className="shrink-0" />
          {chip.label}
        </Link>
      ))}
    </div>
  );
}
