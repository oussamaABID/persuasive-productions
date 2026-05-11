import Link from 'next/link';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { MotionSection } from '@/components/ui/MotionSection';
import content from '@/content/site-content.json';
import { cn } from '@/lib/utils';

export default function PackagesView() {
  return (
    <main className="relative min-h-screen flex flex-col bg-background pt-40">
      <Navbar content={content} />
      
      <section className="site-container flex-grow pb-40">
        <SectionHeading 
          subtitle={content.packages.subtitle}
          title={content.packages.title}
          description={content.packages.description}
          className="mb-24"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {content.packages.items.map((pkg: { name: string; price: string; features: string[] }, idx: number) => {
            const isHighlighted = idx === 1;
            return (
              <MotionSection 
                key={idx} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "package-card",
                  isHighlighted && "package-card-highlighted"
                )}
              >
                {/* Jasmine watermark — Erika's signature identity */}
                <span className="package-jasmine-watermark" aria-hidden="true">❀</span>

                {/* Elegant angled ribbon for featured card */}
                {isHighlighted && (
                  <div className="package-ribbon" aria-label={content.packages.ui.mostPreferred}>
                    <span>{content.packages.ui.mostPreferred}</span>
                  </div>
                )}

                {/* Card header */}
                <header className="mb-8 relative z-10">
                  <p className="section-tag mb-3">
                    {(idx + 1).toString().padStart(2, '0')}
                  </p>
                  <h3 className="text-2xl font-serif font-bold italic text-white mb-6 leading-tight">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-serif gold-text-gradient font-bold leading-none">
                      {pkg.price}
                    </span>
                    <span className="section-tag opacity-60">
                      {content.packages.ui.perSession}
                    </span>
                  </div>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-accent/40 to-transparent" />
                </header>

                {/* Features */}
                <ul className="package-card-features relative z-10">
                  {pkg.features.map((feature: string, fIdx: number) => (
                    <li key={fIdx} className="flex items-start gap-3 text-muted-foreground text-xs">
                      <span className="text-accent mt-0.5 shrink-0 text-xxs leading-none">❀</span>
                      <span className="tracking-wide leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="package-card-cta relative z-10">
                  <Link 
                    href={`/book?package=${encodeURIComponent(pkg.name)}`}
                    className="w-full block"
                  >
                    <Button 
                      variant={isHighlighted ? "primary" : "outline"}
                      className="w-full text-xxs uppercase tracking-widest h-14"
                    >
                      {content.common.buttons.choose} {pkg.name.split(' ')[0]}
                    </Button>
                  </Link>
                </div>
              </MotionSection>
            );
          })}
        </div>

        {/* Bespoke / Custom Inquiry */}
        <MotionSection 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 relative"
        >
          <div className="bespoke-card-shell">
            {/* Corner jasmine accents */}
            <span className="absolute top-8 left-10 text-accent/10 font-serif text-4xl pointer-events-none select-none" aria-hidden="true">❀</span>
            <span className="absolute bottom-8 right-10 text-accent/10 font-serif text-4xl pointer-events-none select-none" aria-hidden="true">❀</span>

            <div className="absolute -right-16 -bottom-16 text-watermark opacity-ghost pointer-events-none rotate-12 font-serif italic select-none">
              {content.packages.ui.bespokeBackground}
            </div>
            
            <div className="max-w-2xl text-center md:text-left relative z-10">
              <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                <div className="w-8 h-px bg-accent" />
                <span className="bespoke-badge">{content.packages.bespoke.tag}</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6 italic tracking-tight">
                {content.packages.bespoke.title}
              </h3>
              <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
                {content.packages.bespoke.description}
              </p>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                {content.packages.bespoke.features.map((feat: string, i: number) => (
                  <span key={i} className="accent-label">
                    <span className="text-accent/40">❀</span> {feat}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative z-10 shrink-0">
              <Link href="/book?package=Bespoke%20Vision">
                <Button 
                  variant="primary" 
                  className="bespoke-cta-button" 
                >
                  {content.common.buttons.inquire}
                </Button>
              </Link>
            </div>
          </div>
        </MotionSection>
      </section>

      <Footer content={content} />

    </main>
  );
}
