import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlantCard from '../components/PlantCard';
import { getPlants } from '../../lib/db';

export const metadata = {
  title: 'Show Plants — Sakla',
  description: 'Browse our curated selection of show plants, rare specimens, and high-grade botanicals.',
};

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || 'all';
  const sort = params?.sort || 'featured';
  const size = params?.size || 'any';

  const plants = getPlants({ category: category !== 'all' ? category : undefined, sort, size });

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <main style={{ flex: 1, width: '100%', minHeight: '100vh' }}>
          <div className="container" style={{ paddingTop: 'var(--space-stack-lg)', paddingBottom: 'var(--space-section-gap)' }}>

            {/* Page Header & Filters */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-stack-lg)', gap: 'var(--space-stack-md)' }}>
              <div>
                <h1 className="type-headline-lg" style={{ color: 'var(--color-on-background)', marginBottom: 'var(--space-unit)' }}>
                  Show Plants
                </h1>
                <p style={{ color: 'var(--color-secondary)', maxWidth: '640px' }}>
                  Curated specimens ready for immediate exhibition. From social media highlights to your living space, explore our current stock of rare and mature plants.
                </p>
              </div>
              <div className="shop-filters-row">
                <div className="shop-filter-group">
                  <form>
                    <select
                      name="size"
                      className="input-select"
                      defaultValue={size}
                      onChange="this.form.submit()"
                    >
                      <option value="any">Any Size</option>
                      <option value="small">Small (4&quot;-6&quot;)</option>
                      <option value="medium">Medium (8&quot;-10&quot;)</option>
                      <option value="large">Large (12&quot;+)</option>
                    </select>
                    <span className="material-symbols-outlined" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-outline)' }}>
                      expand_more
                    </span>
                  </form>
                </div>
                <div className="shop-filter-group">
                  <form>
                    <select
                      name="sort"
                      className="input-select"
                      defaultValue={sort}
                      onChange="this.form.submit()"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                    <span className="material-symbols-outlined" style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--color-outline)' }}>
                      expand_more
                    </span>
                  </form>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="product-grid--shop">
              {plants.map(plant => (
                <PlantCard key={plant.id} plant={plant} variant="shop" />
              ))}
            </div>

            {plants.length === 0 && (
              <div style={{ textAlign: 'center', padding: 'var(--space-section-gap) 0', color: 'var(--color-secondary)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '16px', display: 'block' }}>search_off</span>
                <p className="type-headline-md">No plants found</p>
                <p style={{ marginTop: '8px' }}>Try adjusting your filters or <Link href="/shop" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>view all plants</Link>.</p>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
