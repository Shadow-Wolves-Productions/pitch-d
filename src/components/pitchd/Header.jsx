import React from 'react';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="no-print pt-8 pb-6">
      <div className="flex items-start justify-between gap-4">
        <Logo size={40} />
        <span
          className="font-mono-dm uppercase text-[10px] px-3 py-1.5 rounded-md shrink-0"
          style={{
            background: '#0d9488',
            color: '#ffffff',
            letterSpacing: '0.15em',
          }}
        >
          Free Tool
        </span>
      </div>

      <div className="mt-10">
        <h1
          className="font-syne font-bold leading-tight"
          style={{ fontSize: '22px', color: '#1a1a1a' }}
        >
          Your story. Worth the room.
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
          paste it. pitch it. ✓
        </p>
      </div>

      <div className="pitchd-divider mt-7" />
    </header>
  );
}