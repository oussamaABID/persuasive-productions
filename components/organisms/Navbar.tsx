import Link from 'next/link';
import { NavbarClientShell } from './NavbarClientShell';
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
        <a 
          href="https://www.instagram.com/persuasiveproductions/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group flex items-center gap-3"
        >
          <div className="navbar-logo-wrapper">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </div>
          <span className="navbar-brand-text">
            {content.common.brand.shortName} <span className="hidden sm:inline">{content.common.brand.name.split(' ')[1]}</span>
          </span>
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
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
