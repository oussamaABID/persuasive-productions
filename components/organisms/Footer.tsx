import { Camera, Aperture, X, Mail } from 'lucide-react';
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
                <Camera size={16} />
              </div>
              <span className="navbar-brand-text">{content.common.brand.name}</span>
            </Link>
            <p className="text-muted-foreground text-lg font-light leading-relaxed max-w-sm mb-10">
              {content.common.footer.description}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="footer-social-link" aria-label="Aperture">
                <Aperture size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Social">
                <X size={18} />
              </a>
              <a href="#" className="footer-social-link" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="form-label mb-8">{content.common.footer.navigation}</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-white transition-colors font-light">{content.common.nav.home}</Link></li>
              <li><Link href="/portfolio" className="text-sm text-muted-foreground hover:text-white transition-colors font-light">{content.common.nav.portfolio}</Link></li>
              <li><Link href="/packages" className="text-sm text-muted-foreground hover:text-white transition-colors font-light">{content.common.nav.packages}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="form-label mb-8">{content.common.footer.studio}</h4>
            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-4 whitespace-pre-line">
              {content.common.footer.studioInfo}
            </p>
            <span className="text-xxs text-accent/40 uppercase tracking-widest block mt-8">❀ {content.common.brand.essence}</span>
          </div>
        </div>
        
        <div className="footer-bottom-bar">
          <div className="text-xxs text-muted-foreground/50 uppercase tracking-widest">
            © {currentYear} {content.common.brand.name}. {content.common.footer.rights}
          </div>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-xxs text-muted-foreground/40 hover:text-accent transition-colors uppercase tracking-widest">{content.common.footer.privacy}</Link>
            <Link href="/terms" className="text-xxs text-muted-foreground/40 hover:text-accent transition-colors uppercase tracking-widest">{content.common.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
