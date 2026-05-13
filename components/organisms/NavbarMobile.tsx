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

const menuLinks = [
  { key: 'packages',  href: '/packages',  labelKey: 'book' as const },
];

export const NavbarMobile = ({ content }: NavbarMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger toggle */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 text-accent z-[1200] relative"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Menu size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — tap outside to close */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[1050] bg-black/60 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            {/* Slide-in drawer */}
            <motion.nav
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="navbar-mobile-drawer"
              aria-label="Mobile Navigation"
            >
              {/* Jasmine identity watermark */}
              <span
                className="absolute bottom-16 right-8 font-serif text-accent pointer-events-none select-none leading-none"
                style={{ fontSize: '8rem', opacity: 0.04 }}
                aria-hidden="true"
              >
                ❀
              </span>

              {/* Top brand line */}
              <div className="flex items-center gap-3 mb-16">
                <div className="w-8 h-px bg-accent/40" />
                <span className="text-xxs font-bold uppercase tracking-widest-plus text-accent/60">
                  {content.common.brand.shortName}
                </span>
              </div>

              {/* Nav links */}
              <ul className="flex flex-col gap-2 flex-1">
                {menuLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.key}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={close}
                        className={cn(
                          "navbar-mobile-link",
                          isActive && "navbar-mobile-link-active"
                        )}
                      >
                        <span className="navbar-mobile-link-index">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="navbar-mobile-link-label">
                          {content.common.nav[link.labelKey]}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active-line"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-accent rounded-full"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* Bottom signature */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-auto pt-8 border-t border-white/5"
              >
                <p className="text-xxs text-muted-foreground/30 uppercase tracking-widest text-center">
                  By appointment only
                </p>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
