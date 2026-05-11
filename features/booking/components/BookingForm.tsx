"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useState, useRef, useEffect } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { TURNSTILE_SITE_KEY } from '@/lib/config';
import { sendBookingEmail } from '@/features/booking/api/actions';
import { CheckCircle2, ArrowRight, Home, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { SiteContent } from '@/lib/types';

interface BookingFormProps {
  content: SiteContent;
}

export function BookingForm({ content }: BookingFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPackage = searchParams.get('package');
  const [visionText, setVisionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Robust scroll-to-feedback logic for mobile UX.
  // Ensures user sees success/error messages immediately after submission.
  useEffect(() => {
    if ((isSuccess || error) && containerRef.current) {
      const scrollTarget = isSuccess ? (successRef.current || containerRef.current) : containerRef.current;
      
      // Small delay to allow DOM/AnimatePresence transitions to complete
      const timer = setTimeout(() => {
        scrollTarget.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isSuccess, error]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await sendBookingEmail(formData);

    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "An unexpected error occurred.");
    }
  }

  // Guard: /book requires a package selection — no bare access allowed
  if (!selectedPackage) {

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="booking-form-shell text-center relative"
      >
        {/* Jasmine watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-ghost-plus pointer-events-none translate-x-1/2 -translate-y-1/2">
          <span className="text-watermark">❀</span>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl mb-8 text-accent/30"
          aria-hidden="true"
        >
          ❀
        </motion.div>

        <p className="section-tag mb-6">Required Step</p>
        <h3 className="booking-success-title">
          Choose Your Package First
        </h3>
        <p className="display-subtitle mb-12">
          Each session begins with a vision. Please select a package from our services page before making your booking inquiry.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/packages">
            <Button variant="primary" className="px-12 h-14 text-xxs uppercase tracking-widest">
              <ArrowRight size={14} className="rotate-180 mr-2" />
              Explore Packages
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="px-12 h-14 text-xxs uppercase tracking-widest">
              <Home size={14} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="form-footer-disclaimer mt-12">
          {content.book.form.note}
        </p>
      </motion.div>
    );
  }


  return (

    <div ref={containerRef} className="relative min-h-spacing-booking-min">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
            transition={{ duration: 1 }}
            className="booking-form-shell"
          >
            {/* Subtle floral background element */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-ghost-plus pointer-events-none translate-x-1/2 -translate-y-1/2">
              <span className="text-watermark">❀</span>
            </div>
            
            <form className="space-y-10 relative z-10" onSubmit={handleSubmit}>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="error-notice"
                >
                  {error}
                </motion.div>
              )}
              {selectedPackage && (
                <div className="booking-notice-box">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <div>
                      <p className="form-label">{content.book.form.selected}</p>
                      <h4 className="text-xl font-serif italic text-white">{selectedPackage}</h4>
                      <input type="hidden" name="package" value={selectedPackage} />
                    </div>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => router.push('/packages')} className="text-tiny h-8">{content.common.buttons.change}</Button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="form-label">{content.book.form.name}</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="form-input" 
                    placeholder={content.book.form.namePlaceholder} 
                  />
                </div>
                <div className="space-y-3">
                  <label className="form-label">{content.book.form.email}</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="form-input" 
                    placeholder={content.book.form.emailPlaceholder} 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="form-label">{content.book.form.phone}</label>
                <input 
                  name="phone"
                  type="tel" 
                  className="form-input" 
                  placeholder={content.book.form.phonePlaceholder} 
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="form-label">{content.book.form.vision}</label>
                  <span className={cn("text-xxs font-mono", visionText.length >= 450 ? "text-accent" : "text-muted-foreground/40")}>
                    {visionText.length} / 500
                  </span>
                </div>
                <textarea 
                  name="vision"
                  rows={4} 
                  maxLength={500}
                  required
                  onChange={(e) => setVisionText(e.target.value)}
                  className="form-input resize-none" 
                  placeholder={content.book.form.visionPlaceholder}
                ></textarea>
              </div>

              <div className="flex flex-col gap-10 pt-10">
                <div className="flex justify-center md:justify-start">
                  <Turnstile siteKey={TURNSTILE_SITE_KEY} />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full h-20 text-base"
                >
                  {isSubmitting ? content.common.ui.loading : content.common.buttons.submit}
                  {!isSubmitting && <ArrowRight size={20} />}
                </Button>
              </div>
              
              <p className="form-footer-disclaimer">
                {content.book.form.note}
              </p>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            ref={successRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="booking-form-success-shell"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="booking-form-success-icon"
            >
              <CheckCircle2 size={48} strokeWidth={1.5} />
            </motion.div>

            <h3 className="booking-success-title">
              {content.book.form.successTitle}
            </h3>
            
            <p className="display-subtitle mb-16">
              {content.book.form.successMessage}
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href="/" className="w-full md:w-auto">
                <Button variant="outline" className="booking-success-button">
                  <Home size={14} />
                  {content.book.form.returnHome}
                </Button>
              </Link>
              <Link href="/portfolio" className="w-full md:w-auto">
                <Button variant="primary" className="booking-success-button">
                  <LayoutGrid size={14} />
                  {content.book.form.viewCollections}
                </Button>
              </Link>
            </div>

            {/* Decorative element */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
