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

const SPOTD_FEATURES = [
  'Searchable cast & crew database',
  'Company and production listings',
  'IMDb-linked profile',
  'Free to join',
];

export default function PostExportPromo({ visible }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('PITCHD10');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  if (!visible) return null;

  return (
    <div
      id="crossPromo"
      className="no-print -mx-5 mt-10"
      style={{ background: '#1a1a1a', padding: '48px 24px', animation: 'fadeIn 0.5s ease' }}
    >
      <div className="max-w-[680px] mx-auto">
        <h2 className="font-syne font-extrabold" style={{ fontSize: '26px', color: '#ffffff', lineHeight: 1.2 }}>
          You're on a roll. Don't stop now.
        </h2>
        <p className="font-grotesk mt-3" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
          Don't let momentum kill your vision. Keep it going with 10% off SLATR or Spot'd.
        </p>

        <button
          onClick={copy}
          className="mt-6 flex items-center justify-between rounded-lg px-5 py-3.5 w-full sm:w-auto transition-all"
          style={{ background: 'rgba(13,148,136,0.12)', border: '1px solid rgba(13,148,136,0.3)', boxShadow: '0 0 20px rgba(13,148,136,0.2)', minWidth: '280px' }}
        >
          <span className="font-mono-dm uppercase" style={{ fontSize: '16px', letterSpacing: '0.25em', color: '#0d9488' }}>PITCHD10</span>
          <span className="font-mono-dm flex items-center gap-1.5" style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#0d9488' }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </span>
        </button>
        <p className="font-mono-dm mt-2" style={{ fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)' }}>
          Use code PITCHD10 for 10% off &middot; Includes 7-day free trial
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
          {/* SLATR */}
          <div className="rounded-xl p-6 transition-all hover:-translate-y-1" style={{ background: '#2a2a2a', borderLeft: '3px solid #3a69b1', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <img src={SLATR_LOGO} alt="SLATR" style={{ height: '72px', width: 'auto', marginBottom: '14px' }} />
            <span className="font-mono-dm uppercase block mb-3" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#3a69b1' }}>
              Full Production Suite
            </span>
            <h4 className="font-grotesk" style={{ fontSize: '18px', color: '#ffffff', lineHeight: 1.5, letterSpacing: '0.02em', fontWeight: 400 }}>
              You bring the vision.{' '}
              <span style={{ color: '#3a69b1' }}>We bring the crew.</span>
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-4">
              {SLATR_FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-1.5">
                  <span style={{ color: '#3a69b1', fontSize: '11px', lineHeight: '17px', flexShrink: 0 }}>&#10003;</span>
                  <span className="font-grotesk" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', lineHeight: '17px' }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="https://www.slatr.com.au" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-5 font-grotesk px-5 py-2.5 rounded-lg transition-all hover:opacity-90"
              style={{ fontSize: '14px', letterSpacing: '0.04em', background: '#3a69b1', color: '#ffffff', textDecoration: 'none' }}>
              Get SLATR &rarr;
            </a>
          </div>

          {/* SPOT'D */}
          <div className="rounded-xl p-6 transition-all hover:-translate-y-1" style={{ background: '#2a2a2a', borderLeft: '3px solid #e8fc6c', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <img src={SPOTD_LOGO} alt="SPOT'D" style={{ height: '72px', width: 'auto', marginBottom: '14px' }} />
            <span className="font-mono-dm uppercase block mb-3" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#e8fc6c' }}>
              The Indie Film Directory
            </span>
            <h4 className="font-grotesk" style={{ fontSize: '18px', color: '#ffffff', lineHeight: 1.5, letterSpacing: '0.02em', fontWeight: 400 }}>
              Cast &middot; Crew &middot; Companies. No Gatekeepers.
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-4">
              {SPOTD_FEATURES.map((f) => (
                <div key={f} className="flex items-start gap-1.5">
                  <span style={{ color: '#e8fc6c', fontSize: '11px', lineHeight: '17px', flexShrink: 0 }}>&#10003;</span>
                  <span className="font-grotesk" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', lineHeight: '17px' }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="https://www.getspotd.app" target="_blank" rel="noopener noreferrer"
              className="inline-block mt-5 font-grotesk px-5 py-2.5 rounded-lg transition-all hover:opacity-90"
              style={{ fontSize: '14px', letterSpacing: '0.04em', background: '#e8fc6c', color: '#1a1a1a', textDecoration: 'none' }}>
              Get Spot'd &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
