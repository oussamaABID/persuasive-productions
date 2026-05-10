import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import ChatbotPlaceholder from '@/components/organisms/ChatbotPlaceholder';
import { SectionHeading } from '@/components/ui/SectionHeading';
import content from '@/content/site-content.json';
import { Suspense } from 'react';
import { BookingForm } from './BookingForm';

export default function BookView() {
  return (
    <main className="relative min-h-screen flex flex-col bg-background pt-40">
      <Navbar content={content} />
      
      <section className="site-container max-w-4xl flex-grow pb-20">
        <SectionHeading 
          subtitle={content.book.subtitle}
          title={content.book.title}
          description={content.book.description}
          className="mb-16"
        />

        <Suspense fallback={<div className="h-96 flex items-center justify-center text-accent uppercase tracking-widest text-xs animate-pulse">{content.book.ui.loadingForm}</div>}>
          <BookingForm content={content} />
        </Suspense>
      </section>

      <Footer content={content} />
      <ChatbotPlaceholder content={content} />
    </main>
  );
}
