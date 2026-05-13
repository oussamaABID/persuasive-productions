import { SiteContent } from '@/lib/types';

interface QuoteSectionProps {
  content: SiteContent;
}

export function QuoteSection({ content }: QuoteSectionProps) {
  return (
    <section className="py-40 border-t border-white/5 relative overflow-hidden">
      <div className="quote-background-text">
        {content.home.quote.background}
      </div>
      <div className="site-container text-center max-w-4xl relative z-10">
        <span className="text-accent text-4xl mb-8 block">❀</span>
        <h2 className="quote-text">
          “{content.home.quote.text}”
        </h2>
      </div>
    </section>
  );
}
