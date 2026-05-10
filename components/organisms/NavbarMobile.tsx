"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SiteContent } from '@/lib/types';

interface NavbarMobileProps {
  content: SiteContent;
}

export const NavbarMobile = ({ content }: NavbarMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: content.common.nav.portfolio, href: '/portfolio' },
    { name: content.common.nav.packages, href: '/packages' },
    { name: content.common.nav.book, href: '/book' },
  ];

  return (
    <>
      <button 
        className="md:hidden text-accent p-2 z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="navbar-mobile-menu"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-2xl font-serif transition-colors",
                  isActive(link.href) ? "text-accent" : "text-foreground hover:text-accent"
                )}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
