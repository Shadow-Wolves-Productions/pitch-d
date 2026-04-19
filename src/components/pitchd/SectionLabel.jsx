import React from 'react';

export default function SectionLabel({ children }) {
  return (
    <div
      className="font-mono-dm uppercase mb-4"
      style={{
        fontSize: '11px',
        letterSpacing: '0.2em',
        color: '#6b7280',
      }}
    >
      {children}
    </div>
  );
}