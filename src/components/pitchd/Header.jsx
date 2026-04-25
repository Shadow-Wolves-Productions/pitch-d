import React from 'react';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="no-print pt-8 pb-6">
      <Logo size={40} />

      <div className="mt-10">
        <h1
          className="font-syne font-bold leading-tight"
          style={{ fontSize: '22px', color: '#1a1a1a' }}
        >
          Your script. Pitched in minutes.
        </h1>
        <p
          className="font-marker inline-block mt-3"
          style={{
            fontSize: '14px',
            color: '#0d9488',
            transform: 'rotate(-2deg)',
            transformOrigin: 'left center',
          }}
        >
          paste it. pitch it. &#10003;
        </p>
      </div>

      <div className="pitchd-divider mt-7" />
    </header>
  );
}
