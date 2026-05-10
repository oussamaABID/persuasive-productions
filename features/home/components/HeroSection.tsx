import Image from 'next/image';
import Link from 'next/link';
import { HeroParallax, MotionReveal } from '@/components/ui/MotionReveal';
import { SiteContent } from '@/lib/types';

interface HeroSectionProps {
  content: SiteContent;
}

/**
 * Hero section organism.
 * Server Component that delegates animations to client molecules.
 */
export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="hero-container">
      <HeroParallax>
        <Image 
          src="/hero.png" 
          alt="Photography Hero" 
          fill 
          className="object-cover image-hover-zoom opacity-60 scale-105"
          priority
          sizes="100vw"
        />
        <div className="hero-gradient-overlay" />
      </HeroParallax>
      
      <header className="hero-content-shell">
        <MotionReveal delay={0.2} animate>
          <div className="hero-tag-wrapper">
            <div className="hero-tag-line" />
            <span className="section-tag">
              {content.home.hero.tag}
            </span>
            <div className="hero-tag-line" />
          </div>
          
          <h1 className="display-title mb-10">
            {content.home.hero.titlePart1} <br /> 
            <span className="gold-text-gradient italic relative inline-block">
              {content.home.hero.titlePart2}
            </span> 
            <br />
            {content.home.hero.titlePart3}
          </h1>
          
          <p className="display-subtitle mb-14">
            {content.home.hero.subtitle}
          </p>
          
          <div className="hero-cta-group">
            <Link href="/portfolio" className="nav-button">
              {content.home.hero.cta}
            </Link>
            <Link href="/packages" className="nav-button-outline">
              {content.home.hero.services}
            </Link>
          </div>
        </MotionReveal>
      </header>

      <div className="hero-scroll-indicator opacity-50">
        <span className="text-xxs uppercase tracking-widest">{content.common.ui.scroll}</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
