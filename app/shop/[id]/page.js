import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getPlant, getPlants } from '../../../lib/db';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const plant = getPlant(id);
  if (!plant) return { title: 'Plant Not Found — Verdant Grove' };
  return {
    title: `${plant.name} — Verdant Grove`,
    description: plant.description,
  };
}

export default async function PlantDetailPage({ params }) {
  const { id } = await params;
  const plant = getPlant(id);
  if (!plant) notFound();

  const allImages = [plant.image, ...(plant.gallery || [])];

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flex: 1 }}>
        <main style={{ flex: 1, flexGrow: 1 }}>

          {/* Back navigation */}
          <div className="container" style={{ paddingTop: 'var(--space-stack-md)', paddingBottom: 'var(--space-stack-md)' }}>
            <Link
              href="/shop"
              className="type-label-md"
              style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-secondary)', transition: 'color 0.2s' }}
            >
              <span className="material-symbols-outlined" style={{ marginRight: 'var(--space-unit)' }}>arrow_back</span>
              Back to Plants
            </Link>
          </div>

          {/* Detail Layout */}
          <div className="container detail-grid" style={{ marginBottom: 'var(--space-section-gap)' }}>

            {/* Left: Image Gallery */}
            <div>
              <div className="detail-gallery__main">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={plant.image} alt={plant.name} />
              </div>
              {allImages.length > 1 && (
                <div className="detail-thumbs">
                  {allImages.slice(0, 4).map((img, i) => (
                    <div key={i} className={`detail-thumb ${i === 0 ? 'detail-thumb--active' : ''}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`${plant.name} view ${i + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="detail-info">
              {/* Tags */}
              {plant.tags?.length > 0 && (
                <div style={{ display: 'flex', gap: 'var(--space-unit)', marginBottom: 'var(--space-stack-sm)', flexWrap: 'wrap' }}>
                  {plant.tags.map(tag => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              )}

              <h1 className="type-headline-lg" style={{ color: 'var(--color-primary)', fontWeight: 700, marginBottom: 'var(--space-stack-sm)' }}>
                {plant.name}
              </h1>
              <p className="type-body-md" style={{ color: 'var(--color-secondary)', fontStyle: 'italic', marginBottom: 'var(--space-stack-md)' }}>
                {plant.scientificName}
              </p>

              {/* Stock indicator */}
              <div className="detail-stock" style={{ marginBottom: 'var(--space-stack-lg)' }}>
                <span className="material-symbols-outlined fill" style={{ color: plant.stock > 0 ? 'var(--color-primary)' : 'var(--color-error)' }}>
                  {plant.stock > 0 ? 'check_circle' : 'cancel'}
                </span>
                <span className="type-label-md">
                  {plant.stock > 0 ? `In Stock (${plant.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <p className="type-body-lg" style={{ color: 'var(--color-on-surface-variant)', marginBottom: 'var(--space-stack-lg)', lineHeight: 1.7 }}>
                {plant.description}
              </p>

              {/* Care Requirements */}
              {plant.care && (
                <div className="care-grid" style={{ marginBottom: 'var(--space-stack-lg)' }}>
                  {plant.care.light && (
                    <div className="care-card">
                      <span className="material-symbols-outlined">light_mode</span>
                      <h3 className="care-card__title">Light</h3>
                      <p className="care-card__desc">{plant.care.light}</p>
                    </div>
                  )}
                  {plant.care.water && (
                    <div className="care-card">
                      <span className="material-symbols-outlined">water_drop</span>
                      <h3 className="care-card__title">Water</h3>
                      <p className="care-card__desc">{plant.care.water}</p>
                    </div>
                  )}
                  {plant.care.soil && (
                    <div className="care-card">
                      <span className="material-symbols-outlined">potted_plant</span>
                      <h3 className="care-card__title">Soil</h3>
                      <p className="care-card__desc">{plant.care.soil}</p>
                    </div>
                  )}
                  {plant.care.temp && (
                    <div className="care-card">
                      <span className="material-symbols-outlined">thermostat</span>
                      <h3 className="care-card__title">Temp</h3>
                      <p className="care-card__desc">{plant.care.temp}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Price & CTA */}
              <div className="detail-price-box">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-unit)', marginBottom: 'var(--space-stack-md)' }}>
                  <span className="detail-price">${plant.price.toFixed(2)}</span>
                  <span className="detail-price-unit">/ mature plant</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-stack-sm)' }}>
                  <button className="btn-primary btn-full">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    Inquiry for Purchase
                  </button>
                  <button className="btn-secondary btn-full">
                    <span className="material-symbols-outlined">event_available</span>
                    Book for Decoration
                  </button>
                </div>
                <p className="type-caption" style={{ color: 'var(--color-secondary)', textAlign: 'center', marginTop: 'var(--space-stack-sm)' }}>
                  *Delivery and professional installation available.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
