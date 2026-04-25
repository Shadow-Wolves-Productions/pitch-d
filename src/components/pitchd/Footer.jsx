import React from 'react';

export default function Footer() {
  return (
    <footer className="no-print mt-16 mb-10">
      <div className="pitchd-divider mb-6" />
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center">
        <span
          className="font-mono-dm uppercase"
          style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#6b7280' }}
        >
          PITCH'D &copy; Shadow Wolves Productions
        </span>
        <span className="inline-block w-1 h-1 rounded-full" style={{ background: '#0d9488' }} />
        <span className="font-mono-dm uppercase" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#9ca3af' }}>
          Session only
        </span>
        <span className="inline-block w-1 h-1 rounded-full" style={{ background: '#0d9488' }} />
        <span className="font-mono-dm uppercase" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#9ca3af' }}>
          Nothing saved
        </span>
        <span className="inline-block w-1 h-1 rounded-full" style={{ background: '#0d9488' }} />
        <span className="font-mono-dm uppercase" style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#9ca3af' }}>
          No account needed
        </span>
      </div>
    </footer>
  );
}
