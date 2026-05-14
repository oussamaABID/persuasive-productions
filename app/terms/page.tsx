import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";

import content from "@/content/site-content.json";

export default function Terms() {
  return (
    <main className="page-main">
      <Navbar content={content} />
      <article className="site-container max-w-4xl flex-grow pb-24">
        <h1 className="page-title">Terms of Service</h1>
        
        <div className="space-y-12 text-base leading-relaxed text-muted-foreground/80 font-light">
          <section>
            <h2 className="page-subtitle">Professional Engagement</h2>
            <p>
              By commissioning a session with Persuasive Productions, you enter into a professional agreement for high-end artistic services. All sessions are subject to our curated scheduling process and require a non-refundable retainer to confirm your reservation and cover preliminary production costs.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Scheduling & Commitment</h2>
            <p>
              We view time as a premium resource. To maintain the quality of our bespoke productions, rescheduling requests must be submitted at least 72 hours prior to the session. Cancellations or changes outside of this window may result in the forfeiture of the session retainer as compensation for held studio time and production resources.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Artistic Property & Licensing</h2>
            <p>
              All creative works produced during your session remain the intellectual property of Persuasive Productions. Clients are granted a non-exclusive, personal usage license upon final delivery. Any commercial use, publication, or significant alteration of the work requires a separate licensing agreement and written authorization from the studio.
            </p>
          </section>

          <section>
            <h2 className="page-subtitle">Bespoke Deliverables</h2>
            <p>
              The production of fine-art imagery requires meticulous attention to detail. Delivery timelines are bespoke and will be communicated based on the complexity of your session and selected collection. We prioritize the uncompromising quality of each edit over expedited delivery to ensure your final gallery meets our rigorous aesthetic standards.
            </p>
          </section>
        </div>
      </article>
      <Footer content={content} />
    </main>
  );
}
