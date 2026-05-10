"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavbarClientShellProps {
  children: React.ReactNode;
}

/**
 * Client-side shell for the Navbar that manages scroll-aware styling.
 */
export const NavbarClientShell = ({ children }: NavbarClientShellProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "navbar-shell",
      isScrolled ? "h-16 glass shadow-xl" : "h-24 bg-transparent"
    )}>
      {children}
    </nav>
  );
};
