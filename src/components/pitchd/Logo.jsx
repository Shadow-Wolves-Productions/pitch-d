import React from 'react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_pitch-d-preview/artifacts/i1ty4hvl_Pitch%27d%20Logo%20-%20Transparent.png';

export default function Logo({ size = 80 }) {
  const imgHeight = Math.round(size * 3.3);
  return (
    <div className="flex flex-col items-start" style={{ marginTop: `-${Math.round(size * 1.1)}px`, marginBottom: `-${Math.round(size * 0.85)}px` }}>
      <img
        src={LOGO_URL}
        alt="PITCH'D"
        style={{ height: `${imgHeight}px`, width: 'auto', objectFit: 'contain', marginLeft: `-${Math.round(size * 0.55)}px` }}
      />
      <div
        className="font-mono-dm uppercase"
        style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#9ca3af', marginTop: `-${Math.round(size * 0.15)}px` }}
      >
        A Shadow Wolves Productions Tool
      </div>
    </div>
  );
}
