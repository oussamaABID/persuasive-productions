import Link from 'next/link';
import { Camera } from 'lucide-react';
import { NavbarClientShell } from './NavbarClientShell';
import { NavLink } from './NavLink';
import { NavbarMobile } from './NavbarMobile';
import { SiteContent } from '@/lib/types';

interface NavbarProps {
  content: SiteContent;
}

/**
 * Global navigation organism.
 * Server Component by default, delegating interactivity to client molecules.
 */
const Navbar = ({ content }: NavbarProps) => {
  return (
    <NavbarClientShell>
      <div className="site-container h-full flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="navbar-logo-wrapper">
            <Camera size={20} />
          </div>
          <span className="navbar-brand-text">
            {content.common.brand.shortName} <span className="hidden sm:inline">{content.common.brand.name.split(' ')[1]}</span>
          </span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          <NavLink href="/portfolio">{content.common.nav.portfolio}</NavLink>
          <Link 
            href="/packages" 
            className="nav-button"
          >
            {content.common.nav.book}
          </Link>
        </div>

        {/* Mobile Interaction */}
        <NavbarMobile content={content} />
      </div>
    </NavbarClientShell>
  );
};

export default Navbar;
