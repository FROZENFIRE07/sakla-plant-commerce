'use client';

import { useState } from 'react';
import InquiryModal from '../../components/InquiryModal';

export default function PlantDetailActions({ plant }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState('purchase');

  function openInquiry(type) {
    setInquiryType(type);
    setModalOpen(true);
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-stack-sm)' }}>
        <button
          className="btn-primary btn-full"
          onClick={() => openInquiry('purchase')}
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          Inquiry for Purchase
        </button>
        <button
          className="btn-secondary btn-full"
          onClick={() => openInquiry('decoration')}
        >
          <span className="material-symbols-outlined">event_available</span>
          Book for Decoration
        </button>
      </div>

      <InquiryModal
        plant={plant}
        type={inquiryType}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
