import React from 'react';
import { CheckCircle, Unlock, Download } from 'lucide-react';

export default function LockedBanner({ onUnlock, onExport }) {
  return (
    <div
      className="no-print rounded-lg px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{
        background: '#0d9488',
        border: '1px solid rgba(13,148,136,0.5)',
      }}
    >
      <div className="flex items-center gap-3">
        <CheckCircle size={18} color="#ffffff" />
        <span
          className="font-syne font-bold"
          style={{ fontSize: '15px', color: '#ffffff', letterSpacing: '0.02em' }}
        >
          ✓ Locked and ready to export
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onUnlock}
          className="font-mono-dm uppercase flex items-center gap-1.5 px-4 py-2 rounded-md transition-all"
          style={{
            fontSize: '11px',
            letterSpacing: '0.12em',
            background: 'rgba(255,255,255,0.15)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <Unlock size={12} />
          Unlock &amp; Edit
        </button>
        <button
          onClick={onExport}
          className="font-syne font-extrabold uppercase flex items-center gap-1.5 px-4 py-2 rounded-md transition-all"
          style={{
            fontSize: '12px',
            letterSpacing: '0.05em',
            background: '#ffffff',
            color: '#0d9488',
          }}
        >
          <Download size={13} />
          ↓ Export One Sheet
        </button>
      </div>
    </div>
  );
}