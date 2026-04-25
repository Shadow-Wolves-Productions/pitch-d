import React from 'react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_pitch-d-preview/artifacts/i1ty4hvl_Pitch%27d%20Logo%20-%20Transparent.png';

export default function Logo({ size = 72 }) {
  const imgHeight = Math.round(size * 3.3);
  // The logo PNG has ~20% transparent padding on the left side of the actual letterforms.
  // We offset just enough to visually align the "P" with page content.
  const pullLeft = Math.round(size * 0.35);
  return (
    <div className="flex flex-col items-start" style={{ marginTop: `-${Math.round(size * 1.0)}px`, marginBottom: `-${Math.round(size * 0.8)}px` }}>
      <img
        src={LOGO_URL}
        alt="PITCH'D"
        style={{ height: `${imgHeight}px`, width: 'auto', objectFit: 'contain', marginLeft: `-${pullLeft}px` }}
      />
    </div>
  );
}
