import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const SLATR_LOGO = 'https://customer-assets.emergentagent.com/job_pitch-d-preview/artifacts/7r6s4gn9_Slatr_Logo_Grey_Transparent.png';
const SPOTD_LOGO = 'https://customer-assets.emergentagent.com/job_pitch-d-preview/artifacts/0979arut_Spot%27d%20Logo%20-%20Black-Electric_BIG.png';

const SLATR_FEATURES = [
  'Studio-grade script coverage across 8 categories',
  'Bechdel and representation analysis',
  'Draft comparison',
  'Budget tier generation',
  'Character profiles',
  'Scene breakdowns',
  'Casting suggestions',
  'Comparable films',
];

export default function PostExportPromo({ visible }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('PITCHD25');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  if (!visible) return null;

  return (
    <div
      id="crossPromo"
      className="no-print -mx-5 mt-10"
      style={{
        background: '#1a1a1a',
        padding: '48px 24px',
        animation: 'fadeIn 0.5s ease',
      }}
    >
      <div className="max-w-[680px] mx-auto">
        <h2 className="font-syne font-extrabold" style={{ fontSize: '26px', color: '#ffffff', lineHeight: 1.2 }}>
          You're on a roll. Don't stop now.
        </h2>
        <p className="font-grotesk mt-3" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
          Don't let momentum kill your vision. Keep it going with 15% off SLATR or Spot'd.
        </p>

        {/* Promo Code */}
        <button
          onClick={copy}
          className="mt-6 flex items-center justify-between rounded-lg px-5 py-3.5 w-full sm:w-auto transition-all"
          style={{
            background: 'rgba(13,148,136,0.12)',
            border: '1px solid rgba(13,148,136,0.3)',
            boxShadow: '0 0 20px rgba(13,148,136,0.2)',
            minWidth: '280px',
          }}
        >
          <span className="font-mono-dm uppercase" style={{ fontSize: '16px', letterSpacing: '0.25em', color: '#0d9488' }}>
            PITCHD25
          </span>
          <span className="font-mono-dm flex items-center gap-1.5" style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#0d9488' }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </span>
        </button>
        <p className="font-mono-dm mt-2" style={{ fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)' }}>
          Use code PITCHD25 for 15% off &middot; Includes 7-day free trial
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {/* SLATR */}
          <div
            className="rounded-xl p-5 transition-all hover:-translate-y-1"
            style={{
              background: '#2a2a2a',
              borderLeft: '3px solid #0d9488',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <img src={SLATR_LOGO} alt="SLATR" style={{ height: '24px', width: 'auto', marginBottom: '10px' }} />
            <span className="font-mono-dm uppercase block mb-2" style={{ fontSize: '8px', letterSpacing: '0.2em', color: '#0d9488' }}>
              Full Production Suite
            </span>
            <h4 className="font-syne font-bold" style={{ fontSize: '16px', color: '#ffffff', lineHeight: 1.3 }}>
              You bring the vision.{' '}
              <span style={{ color: '#3a69b1' }}>We bring the crew.</span>
            </h4>
            <div className="grid grid-cols-1 gap-y-1 mt-3">
              {SLATR_FEATURES.slice(0, 4).map((f) => (
                <div key={f} className="flex items-start gap-1.5">
                  <span style={{ color: '#0d9488', fontSize: '10px', lineHeight: '16px', flexShrink: 0 }}>&#10003;</span>
                  <span className="font-grotesk" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', lineHeight: '16px' }}>{f}</span>
                </div>
              ))}
            </div>
            <a
              href="https://www.slatr.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 font-syne font-bold px-4 py-2 rounded-lg transition-all hover:opacity-90"
              style={{ fontSize: '12px', background: '#0d9488', color: '#ffffff', textDecoration: 'none' }}
            >
              Get SLATR &rarr;
            </a>
          </div>

          {/* SPOT'D */}
          <div
            className="rounded-xl p-5 transition-all hover:-translate-y-1"
            style={{
              background: '#2a2a2a',
              borderLeft: '3px solid #e8fc6c',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <img src={SPOTD_LOGO} alt="SPOT'D" style={{ height: '22px', width: 'auto', marginBottom: '10px' }} />
            <span className="font-mono-dm uppercase block mb-2" style={{ fontSize: '8px', letterSpacing: '0.2em', color: '#e8fc6c' }}>
              The Indie Film Directory
            </span>
            <h4 className="font-syne font-bold" style={{ fontSize: '16px', color: '#ffffff', lineHeight: 1.3 }}>
              Cast &middot; Crew &middot; Companies. No Gatekeepers.
            </h4>
            <p className="font-grotesk mt-2" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
              Search, discover, and connect with cast, crew, and companies —{' '}
              <span style={{ color: '#e8fc6c', fontWeight: 600 }}>TODAY!</span>
            </p>
            <a
              href="https://www.getspotd.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 font-syne font-bold px-4 py-2 rounded-lg transition-all hover:opacity-90"
              style={{ fontSize: '12px', background: '#e8fc6c', color: '#1a1a1a', textDecoration: 'none' }}
            >
              Get Spot'd &rarr;
            </a>
          </div>
        </div>

        <p className="font-mono-dm text-center mt-6" style={{ fontSize: '9px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)' }}>
          Part of the Shadow Wolves Creative Suite &middot; Use code PITCHD25 for 15% off paid tiers
        </p>
      </div>
    </div>
  );
}
