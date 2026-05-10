"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={cn(
        "nav-link group",
        isActive && "nav-link-active"
      )}
    >
      {children}
      <span className={cn(
        "nav-link-underline",
        isActive ? "w-full" : "w-0 group-hover:w-full"
      )} />
    </Link>
  );
};

