import React from 'react';

const SLATR_LOGO = 'https://customer-assets.emergentagent.com/job_pitch-d-preview/artifacts/1vct55ke_Slatr_Logo_Black_Transparent.png';
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

export default function EcosystemPromo() {
  return (
    <section className="no-print mt-16">
      <div className="pitchd-divider mb-10" />

      <div className="text-center mb-8">
        <h3 className="font-syne font-bold" style={{ fontSize: '22px', color: '#1a1a1a' }}>
          SLATR makes it. Spot'd crews it. Pitch'd lands it.
        </h3>
        <p className="font-grotesk mt-3" style={{ fontSize: '14px', color: '#6b7280' }}>
          Three tools. One mission — put real power back in the filmmaker's hands.
        </p>
      </div>

      <div className="space-y-4">
        {/* SLATR CARD */}
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid #e8e0d8', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <img src={SLATR_LOGO} alt="SLATR" style={{ height: '32px', width: 'auto', marginBottom: '12px' }} />
          <span className="font-mono-dm uppercase inline-block mb-3" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#3a69b1' }}>
            Full Production Suite
          </span>
          <h4 className="font-grotesk" style={{ fontSize: '20px', color: '#1a1a1a', lineHeight: 1.5, letterSpacing: '0.02em', fontWeight: 400 }}>
            You bring the vision.{' '}
            <span style={{ color: '#3a69b1' }}>We bring the crew.</span>
          </h4>
          <p className="font-grotesk mt-3 leading-relaxed" style={{ fontSize: '14px', color: '#6b7280' }}>
            From script to screen — and everything in between. Guided by your own AI crew, SLATR is our complete production suite built for indie filmmakers.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-4">
            {SLATR_FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <span style={{ color: '#3a69b1', fontSize: '12px', lineHeight: '18px', flexShrink: 0 }}>&#10003;</span>
                <span className="font-grotesk" style={{ fontSize: '12px', color: '#374151', lineHeight: '18px' }}>{f}</span>
              </div>
            ))}
          </div>
          <a href="https://www.slatr.com.au" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 font-grotesk px-5 py-2.5 rounded-lg transition-all hover:opacity-90"
            style={{ fontSize: '14px', letterSpacing: '0.04em', background: '#3a69b1', color: '#ffffff', textDecoration: 'none' }}>
            Get SLATR &rarr;
          </a>
        </div>

        {/* SPOT'D CARD */}
        <div className="rounded-xl p-6" style={{ background: '#ffffff', border: '1px solid #e8e0d8', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <img src={SPOTD_LOGO} alt="SPOT'D" style={{ height: '28px', width: 'auto', marginBottom: '12px' }} />
          <span className="font-mono-dm uppercase inline-block mb-3" style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#6b7280' }}>
            The Indie Film Directory
          </span>
          <h4 className="font-grotesk" style={{ fontSize: '20px', color: '#1a1a1a', lineHeight: 1.5, letterSpacing: '0.02em', fontWeight: 400 }}>
            Cast &middot; Crew &middot; Companies. No Gatekeepers.
          </h4>
          <div className="grid grid-cols-1 gap-y-1.5 mt-4">
            {SPOTD_FEATURES.map((f) => (
              <div key={f} className="flex items-start gap-2">
                <span style={{ color: '#0d9488', fontSize: '12px', lineHeight: '18px', flexShrink: 0 }}>&#10003;</span>
                <span className="font-grotesk" style={{ fontSize: '12px', color: '#374151', lineHeight: '18px' }}>{f}</span>
              </div>
            ))}
          </div>
          <a href="https://www.getspotd.app" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 font-grotesk px-5 py-2.5 rounded-lg transition-all hover:opacity-90"
            style={{ fontSize: '14px', letterSpacing: '0.04em', background: '#1a1a1a', color: '#ffffff', textDecoration: 'none' }}>
            Get Spot'd &rarr;
          </a>
        </div>
      </div>

      <p className="font-mono-dm uppercase mt-5 text-center" style={{ fontSize: '10px', letterSpacing: '0.15em', color: '#9ca3af' }}>
        Use code PITCHD10 for 10% off paid tiers
      </p>
    </section>
  );
}
