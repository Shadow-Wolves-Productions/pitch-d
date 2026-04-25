import React, { useState } from 'react';
import { Copy, Check, X, ArrowUpRight } from 'lucide-react';

const PROMO_CODE = 'PITCHD25';

export default function PromoModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl p-7 relative"
        style={{ background: '#ffffff', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md transition-colors"
          style={{ color: '#9ca3af' }}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="font-syne font-extrabold mb-1" style={{ fontSize: '20px', color: '#1a1a1a' }}>
          You're on a roll. Don't stop now.
        </div>
        <p className="font-grotesk leading-relaxed mb-5" style={{ fontSize: '14px', color: '#6b7280' }}>
          Don't let momentum kill your vision. Keep it going with 15% off SLATR or Spot'd. Use the code below.
        </p>

        <button
          onClick={copy}
          className="w-full flex items-center justify-between rounded-lg px-4 py-3 mb-5 transition-colors"
          style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.25)' }}
        >
          <span className="font-mono-dm uppercase" style={{ fontSize: '14px', letterSpacing: '0.2em', color: '#0d9488' }}>
            {PROMO_CODE}
          </span>
          <span className="font-mono-dm flex items-center gap-1.5" style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#0d9488' }}>
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </span>
        </button>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <a
            href="https://www.slatr.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-4 flex flex-col justify-between transition-all hover:-translate-y-0.5"
            style={{ background: '#faf8f5', border: '1px solid #e8e0d8', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-start justify-between">
              <img src="https://customer-assets.emergentagent.com/job_pitch-d-preview/artifacts/1vct55ke_Slatr_Logo_Black_Transparent.png" alt="SLATR" style={{ height: '18px', width: 'auto' }} />
              <ArrowUpRight size={14} style={{ color: '#0d9488' }} />
            </div>
            <span className="font-mono-dm uppercase mt-1" style={{ fontSize: '9px', letterSpacing: '0.1em', color: '#6b7280' }}>
              Full Production Suite
            </span>
          </a>
          <a
            href="https://www.getspotd.app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-4 flex flex-col justify-between transition-all hover:-translate-y-0.5"
            style={{ background: '#faf8f5', border: '1px solid #e8e0d8', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-start justify-between">
              <img src="https://customer-assets.emergentagent.com/job_pitch-d-preview/artifacts/0979arut_Spot%27d%20Logo%20-%20Black-Electric_BIG.png" alt="SPOT'D" style={{ height: '16px', width: 'auto' }} />
              <ArrowUpRight size={14} style={{ color: '#0d9488' }} />
            </div>
            <span className="font-mono-dm uppercase mt-1" style={{ fontSize: '9px', letterSpacing: '0.1em', color: '#6b7280' }}>
              Indie Film Directory
            </span>
          </a>
        </div>

        <p className="font-mono-dm text-center mb-4" style={{ fontSize: '9px', letterSpacing: '0.1em', color: '#9ca3af' }}>
          Part of the Shadow Wolves Creative Suite
        </p>

        <button
          onClick={onClose}
          className="w-full font-mono-dm uppercase py-3 rounded-lg transition-colors"
          style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#6b7280', background: '#f9fafb', border: '1px solid #e8e0d8' }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
