'use client';

import { useState } from 'react';

export default function InquiryModal({ plant, type = 'purchase', isOpen, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          city,
          type,
          plantId: plant?.id || '',
          plantName: plant?.name || (type === 'decoration' ? 'Contract & Event Decoration' : 'Custom Botanical Inquiry'),
          quantity: parseInt(quantity) || 1,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setName('');
    setPhone('');
    setCity('');
    setNotes('');
    setQuantity(1);
    onClose();
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={handleReset}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          animation: 'fadeIn 0.25s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleReset}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#f3f3f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
            color: '#5f5e5e',
          }}
          aria-label="Close"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 8px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#c5eadf',
                color: '#1a3c34',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '32px',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>check_circle</span>
            </div>
            <h3 style={{ fontFamily: 'Montserrat', fontSize: '22px', fontWeight: 700, color: '#1a1c1c', marginBottom: '8px' }}>
              Inquiry Received!
            </h3>
            <p style={{ color: '#5f5e5e', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>
              Thank you, <strong>{name}</strong>. Our nursery specialist will contact you on <strong>{phone}</strong> via WhatsApp or phone within 2 hours.
            </p>
            <button
              onClick={handleReset}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1a3c34',
                  background: '#c5eadf',
                  padding: '4px 10px',
                  borderRadius: '50px',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                {type === 'decoration' ? 'Contract / Event Booking' : 'Plant Inquiry & Delivery'}
              </span>
              <h2 style={{ fontFamily: 'Montserrat', fontSize: '22px', fontWeight: 700, color: '#1a1c1c' }}>
                {plant?.name ? plant.name : 'Sakla Botanical Inquiry'}
              </h2>
              {plant?.price && (
                <p style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '16px', marginTop: '4px' }}>
                  ₹{plant.price.toLocaleString('en-IN')} / mature specimen
                </p>
              )}
            </div>

            {error && (
              <div
                style={{
                  background: '#ffdad6',
                  color: '#93000a',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  marginBottom: '16px',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="admin-form__label" htmlFor="inq-name">Your Name *</label>
                <input
                  id="inq-name"
                  type="text"
                  required
                  placeholder="e.g. Rajesh Patil"
                  className="input-text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="admin-form__label" htmlFor="inq-phone">WhatsApp / Phone Number *</label>
                <input
                  id="inq-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="input-text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="admin-form__label" htmlFor="inq-city">Delivery City *</label>
                  <input
                    id="inq-city"
                    type="text"
                    required
                    placeholder="e.g. Pune, Mumbai"
                    className="input-text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="admin-form__label" htmlFor="inq-qty">Quantity</label>
                  <input
                    id="inq-qty"
                    type="number"
                    min="1"
                    className="input-text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="admin-form__label" htmlFor="inq-notes">Specific Requests / Notes</label>
                <textarea
                  id="inq-notes"
                  placeholder="Tell us about your space, light conditions, or installation date..."
                  className="input-text"
                  style={{ minHeight: '80px' }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '6px' }}
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
