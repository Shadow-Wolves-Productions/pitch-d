import React from 'react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_pitch-d-preview/artifacts/c6siayzj_Pitch%27d%20Logo%20-%20Transparent.png';

export default function Logo({ size = 40 }) {
  // The source image is 1080x1080 with ~30% actual content height
  // So we render at ~3.3x the desired visual size to compensate for padding
  const imgHeight = Math.round(size * 3.3);
  return (
    <div className="flex flex-col items-start" style={{ marginLeft: `-${Math.round(size * 0.55)}px`, marginTop: `-${Math.round(size * 1.1)}px`, marginBottom: `-${Math.round(size * 0.9)}px` }}>
      <img
        src={LOGO_URL}
        alt="PITCH'D"
        style={{ height: `${imgHeight}px`, width: 'auto', objectFit: 'contain' }}
      />
      <div
        className="font-mono-dm uppercase"
        style={{
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: '#9ca3af',
          marginTop: `-${Math.round(size * 0.2)}px`,
        }}
      >
        A Shadow Wolves Productions Tool
      </div>
    </div>
  );
}
