import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

import content from "@/content/site-content.json";

export default function Privacy() {
  return (
    <main className="page-main">
      <Navbar content={content} />
      <article className="site-container max-w-4xl">
        <h1 className="page-title">Privacy Policy</h1>
        
        <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="page-subtitle">Introduction</h2>
            <p>
              At Persuasive Productions, your privacy is a cornerstone of our elite service. We are committed to protecting the personal data of our clients with the same level of care and precision as we apply to our photography.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Data Collection</h2>
            <p>
              We collect minimal information necessary for booking and service delivery: your name, email address, and creative vision. This information is used exclusively to facilitate your session and is never shared with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Image Rights</h2>
            <p>
              As a client, your likeness is your own. We only display images in our portfolio with explicit written consent. Our archives are stored securely and with redundant backups to ensure the longevity of your artistic legacy.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Cookies</h2>
            <p>
              Our website uses essential cookies to enhance your navigation experience and maintain session integrity. We do not use invasive tracking or third-party advertising cookies.
            </p>
          </section>
        </div>
      </article>
      <Footer content={content} />
    </main>
  );
}
