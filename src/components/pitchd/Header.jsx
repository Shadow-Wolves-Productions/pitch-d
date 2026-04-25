import React from 'react';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="no-print pt-8 pb-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Logo size={80} />
          <h1
            className="font-syne font-bold leading-tight mt-6"
            style={{ fontSize: '22px', color: '#1a1a1a' }}
          >
            Your script. Pitched in minutes.
          </h1>
        </div>
        <p
          className="font-marker shrink-0 mt-4"
          style={{
            fontSize: '14px',
            color: '#0d9488',
            transform: 'rotate(-2deg)',
          }}
        >
          paste it. pitch it. &#10003;
        </p>
      </div>
      <div className="pitchd-divider mt-7" />
    </header>
  );
}
