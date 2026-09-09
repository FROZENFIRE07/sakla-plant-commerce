'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data.stats))
      .catch(() => {});
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Dashboard" />
        <div className="admin-content">

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--green">
                <span className="material-symbols-outlined">eco</span>
              </div>
              <div className="stat-card__value">{stats?.totalPlants ?? '—'}</div>
              <div className="stat-card__label">Total Plants</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--blue">
                <span className="material-symbols-outlined">inventory</span>
              </div>
              <div className="stat-card__value">{stats?.totalStock ?? '—'}</div>
              <div className="stat-card__label">Total Stock Units</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--amber">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div className="stat-card__value">{stats?.lowStock ?? '—'}</div>
              <div className="stat-card__label">Low Stock Items</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--purple">
                <span className="material-symbols-outlined">currency_rupee</span>
              </div>
              <div className="stat-card__value">₹{stats?.avgPrice ? Math.round(stats.avgPrice).toLocaleString('en-IN') : '—'}</div>
              <div className="stat-card__label">Avg. Price</div>
            </div>
          </div>

          {/* Quick Actions */}
          <h3 style={{ fontFamily: 'Montserrat', fontSize: '16px', fontWeight: 600, marginBottom: '4px', color: '#1a1c1c' }}>
            Quick Actions
          </h3>
          <div className="quick-actions">
            <Link href="/admin/inventory/new" className="quick-action">
              <div className="quick-action__icon">
                <span className="material-symbols-outlined">add_circle</span>
              </div>
              <span className="quick-action__text">Add New Plant</span>
            </Link>
            <Link href="/admin/inventory" className="quick-action">
              <div className="quick-action__icon">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <span className="quick-action__text">View Inventory</span>
            </Link>
            <Link href="/" className="quick-action" target="_blank">
              <div className="quick-action__icon">
                <span className="material-symbols-outlined">storefront</span>
              </div>
              <span className="quick-action__text">View Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
