import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PlantCard from './components/PlantCard';
import CategoryCard from './components/CategoryCard';
import { getFeaturedPlants, getCategories, getHeroImages } from '../lib/db';

export const metadata = {
  title: 'Verdant Grove — Wholesale & Retail Nursery',
  description: 'Access Verdant Grove\'s extensive nursery inventory. Browse curated, high-grade botanicals previously only available to landscaping professionals.',
};

export default function HomePage() {
  const featuredPlants = getFeaturedPlants();
  const categories = getCategories().filter(c => c.image);
  const heroImages = getHeroImages();

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, width: '100%', maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative' }}>
        <main style={{ flex: 1, width: '100%', paddingBottom: 'var(--space-section-gap)' }}>

          {/* Hero Section */}
          <section className="hero">
            <div className="hero__grid">
              <div>
                <h1 className="hero__title">Cultivating Quality, Now Online.</h1>
                <p className="hero__desc type-body-md">
                  Access Verdant Grove&apos;s extensive nursery inventory directly. Browse our curated selection of high-grade botanicals, previously only available to landscaping professionals.
                </p>
                <div className="hero__actions">
                  <Link href="/shop" className="btn-primary">Browse Inventory</Link>
                  <Link href="/services" className="btn-secondary">Learn More</Link>
                </div>
              </div>
              <div className="hero__image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={heroImages.greenhouse} alt="Nursery Greenhouse" />
              </div>
            </div>
          </section>

          {/* Explore Categories */}
          <section className="container section-gap">
            <h2 className="type-headline-lg" style={{ color: 'var(--color-primary)', marginBottom: 'var(--space-stack-lg)' }}>
              Explore Categories
            </h2>
            <div className="bento-grid">
              {categories.map(cat => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </section>

          {/* Recent Arrivals */}
          <section style={{
            padding: 'var(--space-section-gap) var(--space-margin-mobile)',
            background: 'var(--color-surface-container-low)',
            borderTop: '1px solid var(--color-outline-variant)',
            borderBottom: '1px solid var(--color-outline-variant)',
          }}>
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-stack-lg)' }}>
                <h2 className="type-headline-lg" style={{ color: 'var(--color-primary)' }}>
                  Recent Arrivals
                </h2>
                <Link
                  href="/shop"
                  className="type-label-md"
                  style={{ color: 'var(--color-primary-container)' }}
                >
                  View All
                </Link>
              </div>
              <div className="product-grid">
                {featuredPlants.slice(0, 4).map(plant => (
                  <PlantCard key={plant.id} plant={plant} variant="home" />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
