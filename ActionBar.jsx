import React from 'react';
import { Lock } from 'lucide-react';

const SLOTS = ['Title', 'Logline', 'Tagline', 'Synopsis'];

export default function LockBar({ completed, onLock }) {
  const allDone = completed.every(Boolean);

  return (
    <div
      className="no-print rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{
        background: '#ffffff',
        border: '1px solid #e8e0d8',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
        {SLOTS.map((label, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full transition-colors"
              style={{ background: completed[i] ? '#0d9488' : '#e5e7eb' }}
            />
            <span
              className="font-mono-dm uppercase"
              style={{
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: completed[i] ? '#0d9488' : '#9ca3af',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onLock}
        disabled={!allDone}
        className="font-syne font-extrabold uppercase flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all shrink-0"
        style={{
          fontSize: '13px',
          letterSpacing: '0.05em',
          background: allDone ? '#0d9488' : '#e5e7eb',
          color: allDone ? '#ffffff' : '#9ca3af',
          cursor: allDone ? 'pointer' : 'not-allowed',
        }}
      >
        <Lock size={13} />
        Lock One Sheet
      </button>
    </div>
  );
}