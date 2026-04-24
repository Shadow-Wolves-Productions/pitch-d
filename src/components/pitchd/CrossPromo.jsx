import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

const PROMO_CODE = 'PITCHD25';

function ProductCard({ name, tagline, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="pitchd-card p-5 flex items-start justify-between gap-4 transition-all hover:-translate-y-0.5"
    >
      <div>
        <div
          className="font-syne font-extrabold"
          style={{ fontSize: '20px', color: '#1a1a1a' }}
        >
          {name}
        </div>
        <p
          className="font-grotesk mt-1"
          style={{ fontSize: '13px', color: '#6b7280' }}
        >
          {tagline}
        </p>
      </div>
      <ArrowUpRight size={18} style={{ color: '#0d9488' }} />
    </a>
  );
}

export default function CrossPromo() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section className="no-print mt-20">
      <div className="pitchd-divider mb-10" />
      <h3
        className="font-syne font-bold"
        style={{ fontSize: '22px', color: '#1a1a1a' }}
      >
        Take your project further.
      </h3>
      <p
        className="font-grotesk mt-3 leading-relaxed"
        style={{ fontSize: '15px', color: '#6b7280' }}
      >
        15% off <strong style={{ color: '#1a1a1a' }}>SLATR</strong> (production
        pipeline) or <strong style={{ color: '#1a1a1a' }}>Spot'd</strong>{' '}
        (casting &amp; auditions) with code PITCHD25. One month free on annual
        plans.
      </p>

      <button
        onClick={copy}
        className="mt-5 w-full sm:w-auto flex items-center justify-between gap-4 rounded-lg px-4 py-3 transition-colors"
        style={{
          background: 'rgba(13,148,136,0.08)',
          border: '1px solid rgba(13,148,136,0.25)',
        }}
      >
        <span
          className="font-mono-dm uppercase"
          style={{
            fontSize: '13px',
            letterSpacing: '0.2em',
            color: '#0d9488',
          }}
        >
          {PROMO_CODE}
        </span>
        <span
          className="font-mono-dm flex items-center gap-1.5"
          style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#0d9488' }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </span>
      </button>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <ProductCard
          name="SLATR"
          tagline="Production pipeline for indie teams."
          href="https://www.slatr.com.au"
        />
        <ProductCard
          name="SPOT'D"
          tagline="Casting &amp; auditions, done right."
          href="https://www.getspotd.app"
        />
      </div>

      <p
        className="font-mono-dm uppercase mt-6 text-center"
        style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: '#9ca3af',
        }}
      >
        Part of the Shadow Wolves Productions Suite
      </p>
    </section>
  );
}