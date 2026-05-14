import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface FooterProps {
  content: SiteContent;
}

/**
 * Global footer component with brand info, navigation, and studio details.
 */
const Footer = ({ content }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-shell">
      <div className="footer-glow" />
      
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="footer-logo-wrapper">
                <svg 
                  width="16" 
                  height="16" 
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
              <span className="navbar-brand-text">{content.common.brand.name}</span>
            </Link>
            <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-sm mb-10">
              {content.common.footer.description}
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://www.instagram.com/persuasiveproductions/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-link" 
                aria-label="Instagram"
              >
                <svg 
                  width="18" 
                  height="18" 
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
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="form-label mb-8">{content.common.footer.navigation}</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-white transition-colors font-light">{content.common.nav.home}</Link></li>
              <li><Link href="/packages" className="text-sm text-muted-foreground hover:text-white transition-colors font-light">{content.common.nav.packages}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="form-label mb-8">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-white transition-colors font-light">{content.common.footer.privacy}</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-white transition-colors font-light">{content.common.footer.terms}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom-bar flex justify-center">
          <div className="text-xxs text-muted-foreground/50 uppercase tracking-widest text-center">
            © {currentYear} {content.common.brand.name}. {content.common.footer.rights}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
