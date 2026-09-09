'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import AdminSidebar from '../../components/AdminSidebar';
import AdminHeader from '../../components/AdminHeader';

export default function AdminEditPlantPage() {
  const router = useRouter();
  const params = useParams();
  const plantId = params.id;

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/plants/${plantId}`)
      .then(res => res.json())
      .then(data => {
        if (data.plant) setPlant(data.plant);
        else setError('Plant not found');
      })
      .catch(() => setError('Failed to load plant'))
      .finally(() => setLoading(false));
  }, [plantId]);

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
      const res = await fetch(`/api/plants/${plantId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Failed to update');
        return;
      }

      router.push('/admin/inventory');
    } catch (err) {
      setError('Network error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete "${plant.name}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/plants/${plantId}`, { method: 'DELETE' });
      if (res.ok) router.push('/admin/inventory');
    } catch (err) {
      setError('Failed to delete');
    }
  }

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminHeader title="Edit Plant" />
          <div className="admin-content" style={{ textAlign: 'center', padding: '80px', color: '#717976' }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminHeader title="Edit Plant" />
          <div className="admin-content" style={{ textAlign: 'center', padding: '80px' }}>
            <p style={{ color: '#ba1a1a', marginBottom: '16px' }}>Plant not found</p>
            <Link href="/admin/inventory" className="admin-btn admin-btn--secondary">Back to Inventory</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title={`Edit: ${plant.name}`} />
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
                <input id="name" name="name" className="input-text" required defaultValue={plant.name} />
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="scientificName">Scientific Name</label>
                <input id="scientificName" name="scientificName" className="input-text" defaultValue={plant.scientificName} />
              </div>
            </div>

            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="category">Category</label>
                <select id="category" name="category" className="input-select" defaultValue={plant.category}>
                  <option value="show-plants">Show Plants</option>
                  <option value="herbs">Herbs</option>
                  <option value="fruiting">Fruiting</option>
                  <option value="containers">Containers</option>
                </select>
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="shortDesc">Short Description</label>
                <input id="shortDesc" name="shortDesc" className="input-text" defaultValue={plant.shortDesc} />
              </div>
            </div>

            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="price">Price (₹) *</label>
                <input id="price" name="price" type="number" step="any" min="0" className="input-text" required defaultValue={plant.price} />
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="stock">Stock Quantity *</label>
                <input id="stock" name="stock" type="number" min="0" className="input-text" required defaultValue={plant.stock} />
              </div>
            </div>

            <div className="admin-form__group">
              <label className="admin-form__label" htmlFor="description">Full Description</label>
              <textarea id="description" name="description" className="input-text" defaultValue={plant.description} />
            </div>

            <div className="admin-form__group">
              <label className="admin-form__label" htmlFor="image">Image URL</label>
              <input id="image" name="image" type="url" className="input-text" defaultValue={plant.image} />
            </div>

            {plant.image && (
              <div style={{ marginBottom: '20px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={plant.image} alt="Current" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e0e0e0' }} />
              </div>
            )}

            <div className="admin-form__group">
              <label className="admin-form__label" htmlFor="tags">Tags (comma-separated)</label>
              <input id="tags" name="tags" className="input-text" defaultValue={plant.tags?.join(', ')} />
            </div>

            <h3 style={{ fontFamily: 'Montserrat', fontSize: '16px', fontWeight: 600, margin: '24px 0 12px', color: '#1a1c1c' }}>
              Care Requirements
            </h3>
            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="careLight">Light</label>
                <input id="careLight" name="careLight" className="input-text" defaultValue={plant.care?.light} />
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="careWater">Water</label>
                <input id="careWater" name="careWater" className="input-text" defaultValue={plant.care?.water} />
              </div>
            </div>
            <div className="admin-form__row">
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="careSoil">Soil</label>
                <input id="careSoil" name="careSoil" className="input-text" defaultValue={plant.care?.soil} />
              </div>
              <div className="admin-form__group">
                <label className="admin-form__label" htmlFor="careTemp">Temperature</label>
                <input id="careTemp" name="careTemp" className="input-text" defaultValue={plant.care?.temp} />
              </div>
            </div>

            <div className="admin-form__group" style={{ marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" name="featured" defaultChecked={plant.featured} style={{ width: '16px', height: '16px' }} />
                <span className="admin-form__label" style={{ margin: 0 }}>Featured on home page</span>
              </label>
            </div>

            <div className="admin-form__actions">
              <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link href="/admin/inventory" className="admin-btn admin-btn--secondary">
                Cancel
              </Link>
              <button
                type="button"
                className="admin-btn admin-btn--danger"
                onClick={handleDelete}
                style={{ marginLeft: 'auto' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
