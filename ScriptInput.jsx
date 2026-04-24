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
        style={{
          background: '#ffffff',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
        }}
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

        <div
          className="font-syne font-extrabold mb-1"
          style={{ fontSize: '20px', color: '#1a1a1a' }}
        >
          Take your project further.
        </div>
        <p
          className="font-grotesk leading-relaxed mb-5"
          style={{ fontSize: '14px', color: '#6b7280' }}
        >
          15% off SLATR or Spot'd with your code. One month free on annual plans.
        </p>

        <button
          onClick={copy}
          className="w-full flex items-center justify-between rounded-lg px-4 py-3 mb-5 transition-colors"
          style={{
            background: 'rgba(13,148,136,0.08)',
            border: '1px solid rgba(13,148,136,0.25)',
          }}
        >
          <span
            className="font-mono-dm uppercase"
            style={{ fontSize: '14px', letterSpacing: '0.2em', color: '#0d9488' }}
          >
            {PROMO_CODE}
          </span>
          <span
            className="font-mono-dm flex items-center gap-1.5"
            style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#0d9488' }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { name: 'SLATR', tagline: 'Production pipeline', href: 'https://slatr.app' },
            { name: "SPOT'D", tagline: 'Casting & auditions', href: 'https://spotted.app' },
          ].map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-4 flex flex-col justify-between transition-all hover:-translate-y-0.5"
              style={{
                background: '#faf8f5',
                border: '1px solid #e8e0d8',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <div className="flex items-start justify-between">
                <span className="font-syne font-extrabold" style={{ fontSize: '16px', color: '#1a1a1a' }}>
                  {p.name}
                </span>
                <ArrowUpRight size={14} style={{ color: '#0d9488' }} />
              </div>
              <span className="font-grotesk mt-1" style={{ fontSize: '12px', color: '#6b7280' }}>
                {p.tagline}
              </span>
            </a>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full font-mono-dm uppercase py-3 rounded-lg transition-colors"
          style={{
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: '#6b7280',
            background: '#f9fafb',
            border: '1px solid #e8e0d8',
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}