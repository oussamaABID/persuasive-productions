'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const PORTFOLIO_CHIPS = [
  { label: 'Sophia', href: '/portfolio#sophia' },
  { label: 'Elena', href: '/portfolio#elena' },
  { label: 'Maya', href: '/portfolio#maya' },
  { label: 'Isabella', href: '/portfolio#isabella' },
  { label: 'Clara', href: '/portfolio#clara' },
  { label: 'Lucia', href: '/portfolio#lucia' },
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
