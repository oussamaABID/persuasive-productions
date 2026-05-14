import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

import content from "@/content/site-content.json";

export default function Privacy() {
  return (
    <main className="page-main">
      <Navbar content={content} />
      <article className="site-container max-w-4xl flex-grow pb-24">
        <h1 className="page-title">Privacy Policy</h1>
        
        <div className="space-y-12 text-base leading-relaxed text-muted-foreground/80 font-light">
          <section>
            <h2 className="page-subtitle">Discretion & Integrity</h2>
            <p>
              At Persuasive Productions, discretion is the cornerstone of our elite service. We recognize the intimate nature of boudoir photography and are committed to safeguarding your personal data and visual assets with the highest standards of security and professional integrity.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Information Stewardship</h2>
            <p>
              We collect only the essential data required to facilitate your bespoke experience: your name, contact information, and specific creative requirements. This data is used exclusively for project coordination and is never disclosed, sold, or shared with third parties for promotional purposes.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Visual Rights & Consent</h2>
            <p>
              Your likeness is your absolute property. Persuasive Productions strictly adheres to a consent-based publication policy. No images from your session will be used for promotional, social, or portfolio purposes without your explicit, written authorization. All visual assets are stored on encrypted, offline archives to ensure maximum privacy.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Digital Environment</h2>
            <p>
              Our platform utilizes industry-standard security protocols to protect your interactions. We employ minimal, essential cookies designed solely to optimize your browsing experience and ensure the functional integrity of our booking systems.
            </p>
          </section>
        </div>
      </article>
      <Footer content={content} />
    </main>
  );
}
