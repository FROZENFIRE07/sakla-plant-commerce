'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

export default function AdminInventoryPage() {
  const router = useRouter();
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlants();
  }, []);

  async function fetchPlants() {
    setLoading(true);
    try {
      const res = await fetch('/api/plants');
      const data = await res.json();
      setPlants(data.plants || []);
    } catch (err) {
      console.error('Failed to fetch plants:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/plants/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPlants(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  }

  const filtered = search
    ? plants.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.scientificName.toLowerCase().includes(search.toLowerCase())
      )
    : plants;

  function getStockBadge(stock) {
    if (stock === 0) return <span className="stock-badge stock-badge--out">Out of Stock</span>;
    if (stock <= 5) return <span className="stock-badge stock-badge--low">Low: {stock}</span>;
    return <span className="stock-badge stock-badge--ok">{stock} units</span>;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Inventory" />
        <div className="admin-content">

          <div className="data-table-wrapper">
            <div className="data-table-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <h2 className="data-table-header__title">All Plants ({filtered.length})</h2>
                <input
                  type="text"
                  className="input-text"
                  placeholder="Search plants..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ maxWidth: '280px', height: '36px', fontSize: '13px' }}
                />
              </div>
              <Link href="/admin/inventory/new" className="admin-btn admin-btn--primary" style={{ height: '36px', fontSize: '13px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                Add Plant
              </Link>
            </div>

            {loading ? (
              <div style={{ padding: '48px', textAlign: 'center', color: '#717976' }}>Loading...</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Plant</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th style={{ width: '100px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(plant => (
                    <tr key={plant.id}>
                      <td>
                        <div className="data-table__plant-cell">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={plant.image} alt="" className="data-table__plant-img" />
                          <div>
                            <div className="data-table__plant-name">{plant.name}</div>
                            <div className="data-table__plant-sci">{plant.scientificName}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ textTransform: 'capitalize' }}>{plant.category.replace(/-/g, ' ')}</td>
                      <td style={{ fontWeight: 600 }}>${plant.price.toFixed(2)}</td>
                      <td>{getStockBadge(plant.stock)}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <Link href={`/admin/inventory/${plant.id}`} className="action-btn" title="Edit">
                            <span className="material-symbols-outlined">edit</span>
                          </Link>
                          <button
                            className="action-btn action-btn--danger"
                            title="Delete"
                            onClick={() => handleDelete(plant.id, plant.name)}
                          >
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: 'center', padding: '48px', color: '#717976' }}>
                        No plants found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
