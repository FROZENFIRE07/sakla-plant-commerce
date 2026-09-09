import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConsultationButton from './ConsultationButton';
import { getServices } from '../../lib/db';

export const metadata = {
  title: 'Contract Services — Sakla',
  description: 'High-end botanical design, event styling, and professional maintenance for commercial and civic spaces.',
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <main style={{ flex: 1, width: '100%' }}>

          {/* Hero */}
          <section className="container section-gap" style={{ textAlign: 'center' }}>
            <h1 className="type-display" style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-stack-md)', fontSize: 'clamp(24px, 5vw, 48px)' }}>
              Expert Contract Services
            </h1>
            <p className="type-body-lg" style={{ color: 'var(--color-on-surface-variant)', maxWidth: '640px', margin: '0 auto' }}>
              Delivering high-end botanical design, event styling, and professional maintenance for commercial and civic spaces. We cultivate environments that inspire tranquility and structural beauty.
            </p>
          </section>

          {/* Service Sections */}
          <section className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-section-gap)', paddingBottom: 'var(--space-section-gap)' }}>
            {services.map((service, index) => {
              const isReversed = service.layout === 'image-right';
              return (
                <article
                  key={service.id}
                  className={`service-section ${isReversed ? 'service-section--reversed' : ''}`}
                >
                  <div className="service-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={service.image} alt={service.name} />
                  </div>
                  <div className="service-content">
                    <span className="tag-pill" style={{ width: 'fit-content', background: 'rgba(21,36,24,0.1)', fontSize: '12px' }}>
                      {service.tag}
                    </span>
                    <h2 className="type-headline-lg" style={{ color: 'var(--color-primary)' }}>
                      {service.name}
                    </h2>
                    <p className="type-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
                      {service.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </section>

          {/* CTA */}
          <section className="service-cta">
            <div style={{ maxWidth: '768px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-stack-lg)' }}>
              <h2 className="type-headline-lg" style={{ color: 'var(--color-primary)' }}>
                Ready to elevate your space?
              </h2>
              <p className="type-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
                Consult with our lead botanists and project managers to discuss custom solutions for your specific environment and requirements.
              </p>
              <ConsultationButton />
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
