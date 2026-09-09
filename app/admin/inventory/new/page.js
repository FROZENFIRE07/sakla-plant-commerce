'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

export default function AdminNewPlantPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const form = new FormData(e.target);
    const data = {
      name: form.get('name'),
      scientificName: form.get('scientificName'),
      category: form.get('category'),
      price: parseFloat(form.get('price')),
      stock: parseInt(form.get('stock')),
      description: form.get('description'),
      shortDesc: form.get('shortDesc'),
      image: form.get('image'),
      tags: form.get('tags') ? form.get('tags').split(',').map(t => t.trim()).filter(Boolean) : [],
      care: {
        light: form.get('careLight'),
        water: form.get('careWater'),
        soil: form.get('careSoil'),
        temp: form.get('careTemp'),
      },
      featured: form.get('featured') === 'on',
    };

    try {
      const res = await fetch('/api/plants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Failed to create plant');
        return;
      }

      router.push('/admin/inventory');
    } catch (err) {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Add New Plant" />
        <div className="admin-content">

          {error && (
            <div className="login-card__error" style={{ maxWidth: '720px', marginBottom: '20px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="name">Plant Name *</label>
                <input id="name" name="name" className="input-text" required placeholder="e.g. Monstera Deliciosa" />
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="scientificName">Scientific Name</label>
                <input id="scientificName" name="scientificName" className="input-text" placeholder="e.g. Monstera deliciosa" />
              </div>
            </div>

            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="category">Category</label>
                <select id="category" name="category" className="input-select">
                  <option value="show-plants">Show Plants</option>
                  <option value="herbs">Herbs</option>
                  <option value="fruiting">Fruiting</option>
                  <option value="containers">Containers</option>
                </select>
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="shortDesc">Short Description</label>
                <input id="shortDesc" name="shortDesc" className="input-text" placeholder="e.g. Large specimen, 10&quot; pot" />
              </div>
            </div>

            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="price">Price (₹) *</label>
                <input id="price" name="price" type="number" step="any" min="0" className="input-text" required placeholder="e.g. 1499" />
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="stock">Stock Quantity *</label>
                <input id="stock" name="stock" type="number" min="0" className="input-text" required placeholder="0" />
              </div>
            </div>

            <div className="admin-form__group">
              <label className="admin-form__label" htmlFor="description">Full Description</label>
              <textarea id="description" name="description" className="input-text" placeholder="Detailed plant description..." />
            </div>

            <div className="admin-form__group">
              <label className="admin-form__label" htmlFor="image">Image URL</label>
              <input id="image" name="image" type="url" className="input-text" placeholder="https://..." />
            </div>

            <div className="admin-form__group">
              <label className="admin-form__label" htmlFor="tags">Tags (comma-separated)</label>
              <input id="tags" name="tags" className="input-text" placeholder="e.g. Low Light, Pet Friendly, Trending" />
            </div>

            <h3 style={{ fontFamily: 'Montserrat', fontSize: '16px', fontWeight: 600, margin: '24px 0 12px', color: '#1a1c1c' }}>
              Care Requirements
            </h3>
            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="careLight">Light</label>
                <input id="careLight" name="careLight" className="input-text" placeholder="e.g. Bright, indirect sunlight" />
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="careWater">Water</label>
                <input id="careWater" name="careWater" className="input-text" placeholder="e.g. Water when top inch is dry" />
              </div>
            </div>
            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="careSoil">Soil</label>
                <input id="careSoil" name="careSoil" className="input-text" placeholder="e.g. Well-draining mix" />
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="careTemp">Temperature</label>
                <input id="careTemp" name="careTemp" className="input-text" placeholder="e.g. 65°F - 85°F" />
              </div>
            </div>

            <div className="admin-form__group" style={{ marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" name="featured" style={{ width: '16px', height: '16px' }} />
                <span className="admin-form__label" style={{ margin: 0 }}>Featured on home page</span>
              </label>
            </div>

            <div className="admin-form__actions">
              <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>
                {saving ? 'Saving...' : 'Add Plant'}
              </button>
              <Link href="/admin/inventory" className="admin-btn admin-btn--secondary">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
