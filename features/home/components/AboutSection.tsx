import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { SiteContent } from '@/lib/types';

interface AboutSectionProps {
  content: SiteContent;
}

/**
 * About section organism.
 * Server Component delegating animations to MotionReveal.
 */
export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className="py-40 relative overflow-hidden bg-background">
      <div className="site-container">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <MotionReveal className="flex-1 relative group w-full" delay={0}>
            <div className="about-image-wrapper">
              <Image 
                 src="/inspiration.png" 
                 alt="Artistic Inspiration" 
                 fill 
                 className="object-cover image-hover-zoom rounded-sm"
                 sizes="(max-width: 768px) 100vw, 450px"
              />
              <div className="corner-border-top" />
              <div className="corner-border-bottom" />
            </div>
          </MotionReveal>
          
          <div className="flex-1 text-center lg:text-left">
            <SectionHeading 
              alignment="left"
              subtitle={content.home.about.subtitle}
              title={content.home.about.title}
              className="mb-8"
            />
            <MotionReveal delay={0.3}>
              <p className="about-text">
                {content.home.about.text}
              </p>
              
              <Link 
                href="/packages" 
                className="nav-button inline-block"
              >
                {content.home.about.cta}
              </Link>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
