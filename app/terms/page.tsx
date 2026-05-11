import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

import content from "@/content/site-content.json";

export default function Terms() {
  return (
    <main className="page-main">
      <Navbar content={content} />
      <article className="site-container max-w-4xl">
        <h1 className="page-title">Terms of Service</h1>
        
        <div className="space-y-12 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="page-subtitle">Service Agreement</h2>
            <p>
              By booking a session with Persuasive Productions, you agree to our specialized approach to high-end photography. All sessions are by appointment only and require a deposit to secure your place in our curated schedule.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Cancellations & Rescheduling</h2>
            <p>
              We value time as the ultimate luxury. Cancellations made within 48 hours of the session may forfeit the deposit. Rescheduling is permitted based on availability and should be requested at least 72 hours in advance.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Intellectual Property</h2>
            <p>
              All artistic works created by Persuasive Productions remain the intellectual property of the studio. Clients are granted a usage license based on their selected package (Personal or Commercial). Unauthorized reproduction or alteration of our work is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Deliverables</h2>
            <p>
              We pride ourselves on speed and quality. Standard delivery for digital edits is 48 hours. Print products and custom vision books follow a separate production timeline communicated at the time of session.
            </p>
          </section>
        </div>
      </article>
      <Footer content={content} />
    </main>
  );
}
