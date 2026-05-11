'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const PORTFOLIO_CHIPS = [
  { label: 'Noir Portraits', href: '/portfolio#noir-portraits' },
  { label: 'Artistic Vision', href: '/portfolio#artistic-vision' },
  { label: 'Cinematic Essence', href: '/portfolio#cinematic-essence' },
  { label: 'Luxury Fashion', href: '/portfolio#luxury-fashion' },
  { label: 'Signature Collection', href: '/portfolio#signature-collection' },
  { label: 'Studio Elegance', href: '/portfolio#studio-elegance' },
  { label: 'Timeless Noir', href: '/portfolio#timeless-noir' },
];

/**
 * PortfolioWidget — Atom.
 * Renders chip-style navigation shortcuts to portfolio collections.
 */
export default function PortfolioWidget({ onClose }: { onClose?: () => void }) {
  return (
    <div className="chatbot-widget-area mt-2 mb-1 flex flex-wrap gap-2">
      {PORTFOLIO_CHIPS.map((chip) => (
        <Link
          key={chip.href}
          href={chip.href}
          onClick={onClose}
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
