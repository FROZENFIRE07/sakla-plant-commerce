'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  async function loadInquiries() {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  async function handleStatusChange(id, newStatus) {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries(prev =>
          prev.map(inq => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Delete inquiry from "${name}"?`)) return;

    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  const filtered = filter === 'all'
    ? inquiries
    : inquiries.filter(i => i.status === filter);

  function getStatusBadge(status) {
    switch (status) {
      case 'new':
        return <span className="stock-badge stock-badge--low">New Lead</span>;
      case 'contacted':
        return <span className="stock-badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>Contacted</span>;
      case 'completed':
        return <span className="stock-badge stock-badge--ok">Completed</span>;
      default:
        return <span className="stock-badge stock-badge--out">{status}</span>;
    }
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader title="Customer Inquiries & Leads" />
        <div className="admin-content">

          {/* Filter Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['all', 'new', 'contacted', 'completed'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className="admin-btn admin-btn--secondary"
                  style={{
                    height: '36px',
                    padding: '0 16px',
                    fontSize: '13px',
                    textTransform: 'capitalize',
                    background: filter === tab ? '#1a3c34' : '#ffffff',
                    color: filter === tab ? '#ffffff' : '#5f5e5e',
                    borderColor: filter === tab ? '#1a3c34' : '#e0e0e0',
                  }}
                >
                  {tab === 'all' ? `All (${inquiries.length})` : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="data-table-wrapper">
            <div className="data-table-header">
              <span className="data-table-header__title">Recent Customer Requests</span>
              <button
                onClick={loadInquiries}
                className="action-btn"
                title="Refresh"
              >
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>

            {loading ? (
              <div style={{ padding: '48px', textAlign: 'center', color: '#717976' }}>
                Loading inquiries...
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '48px', textAlign: 'center', color: '#717976' }}>
                No inquiries found for &quot;{filter}&quot;.
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Inquiry Details</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th style={{ width: '130px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(inq => {
                    const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
                    const waLink = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(`Hello ${inq.name}, thank you for contacting Sakla Botanicals regarding "${inq.plantName}". How can we assist you with your order?`)}`;

                    return (
                      <tr key={inq.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: '#1a1c1c' }}>{inq.name}</div>
                          <div style={{ fontSize: '12px', color: '#717976' }}>{inq.phone}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{inq.plantName}</div>
                          <div style={{ fontSize: '12px', color: '#717976' }}>
                            Qty: {inq.quantity} • {inq.type}
                          </div>
                          {inq.notes && (
                            <div style={{ fontSize: '12px', color: '#414846', fontStyle: 'italic', marginTop: '2px', maxWidth: '280px' }}>
                              &ldquo;{inq.notes}&rdquo;
                            </div>
                          )}
                        </td>
                        <td>
                          <span style={{ fontSize: '13px', fontWeight: 500 }}>{inq.city}</span>
                        </td>
                        <td>
                          <span style={{ fontSize: '12px', color: '#717976' }}>
                            {new Date(inq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>
                        <td>
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              border: '1px solid #e0e0e0',
                              background: inq.status === 'new' ? '#ffdad6' : inq.status === 'contacted' ? '#e0f2fe' : '#c5eadf',
                              color: inq.status === 'new' ? '#93000a' : inq.status === 'contacted' ? '#0369a1' : '#1a3c34',
                            }}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="action-btn"
                              style={{ color: '#16a34a', borderColor: '#bbf7d0', background: '#f0fdf4' }}
                              title="Chat on WhatsApp"
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
                            </a>
                            <a
                              href={`tel:${inq.phone}`}
                              className="action-btn"
                              title="Call Customer"
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>call</span>
                            </a>
                            <button
                              onClick={() => handleDelete(inq.id, inq.name)}
                              className="action-btn action-btn--danger"
                              title="Delete"
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
