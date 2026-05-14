import Image from 'next/image';
import { MotionReveal } from '@/components/ui/MotionReveal';
import { SiteContent } from '@/lib/types';
import { cn } from '@/lib/utils';

interface VisionSectionProps {
  content: SiteContent;
}

/**
 * VisionSection combines the About and Quote sections into a unified, 
 * high-impact brand narrative block.
 */
export function VisionSection({ content }: VisionSectionProps) {
  return (
    <section className="py-40 relative overflow-hidden bg-background">
      {/* Subtle background text watermark for the whole section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0 italic uppercase tracking-tighter">
        {content.home.quote.background}
      </div>

      <div className="site-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          
          {/* Text Content Area */}
          <div className="flex-1 text-center lg:text-left flex flex-col justify-center order-2 lg:order-1">
            <MotionReveal delay={0.1}>
              <span className="section-heading-subtitle mb-4">
                {content.home.about.subtitle}
              </span>
            </MotionReveal>
            
            <MotionReveal delay={0.2}>
              <h2 className="display-title mb-12">
                {content.home.about.title}
              </h2>
            </MotionReveal>

            {/* Merged Quote Block */}
            <div className="relative mt-12 py-10 lg:pl-10 border-l border-accent/20">
              <MotionReveal delay={0.4}>
                <span className="text-accent text-3xl mb-8 block lg:text-left">❀</span>
                <blockquote className="relative">
                  <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-serif font-normal leading-tight italic text-white max-w-xl">
                    “{content.home.quote.text}”
                  </p>
                </blockquote>
                <div className="mt-8 flex items-center gap-4 justify-center lg:justify-start">
                  <div className="h-px w-8 bg-accent/30" />
                  <span className="text-xxs uppercase tracking-ultra text-accent/60 font-bold">
                    {content.home.quote.author || "Visionary Perspective"}
                  </span>
                </div>
              </MotionReveal>
            </div>
          </div>

          {/* Image Area */}
          <MotionReveal className="flex-1 relative group w-full order-1 lg:order-2" delay={0.3}>
            <div className="about-image-wrapper shadow-2xl shadow-black/50">
              <Image 
                 src="/inspiration.png" 
                 alt="Artistic Inspiration" 
                 fill 
                 className="object-cover image-hover-zoom rounded-sm"
                 sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="corner-border-top" />
              <div className="corner-border-bottom" />
            </div>
            
            {/* Subtle decorative elements around image */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[120px] rounded-full" />
          </MotionReveal>
          
        </div>
      </div>
    </section>
  );
}
