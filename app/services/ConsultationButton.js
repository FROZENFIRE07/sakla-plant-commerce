'use client';

import { useState } from 'react';
import InquiryModal from '../components/InquiryModal';

export default function ConsultationButton({ serviceName }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="btn-primary"
        style={{
          paddingLeft: 'var(--space-margin-desktop)',
          paddingRight: 'var(--space-margin-desktop)',
          cursor: 'pointer',
        }}
      >
        Request a Consultation
      </button>

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type="decoration"
        plant={{
          id: 'service-contract',
          name: serviceName || 'Architectural Greenery & Contract Services',
          price: 0,
        }}
      />
    </>
  );
}
