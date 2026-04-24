import React from 'react';

const FEATURES_LEFT = [
  'Full script coverage report',
  'Dr. Scrypto character arc analysis',
  'Scene-by-scene breakdown',
  'Comparable films & market positioning',
  'Budget tier estimate',
  'Target audience analysis',
  'Genre & subgenre classification',
];

const FEATURES_RIGHT = [
  'Tone & thematic analysis',
  'Development notes & story weaknesses',
  'Confidence scoring on every asset',
  'Production pipeline management',
  'Cast & crew database via SPOT\'D',
  'Festival submission tracker',
  'Full exportable studio coverage PDF',
];

export default function UpgradeBanner() {
  return (
    <div
      data-testid="upgrade-banner"
      className="no-print rounded-xl overflow-hidden"
      style={{ background: '#0d9488' }}
    >
      <div className="px-7 pt-7 pb-6">
        <h3
          className="font-syne"
          style={{
            fontSize: '22px',
            color: '#ffffff',
            lineHeight: 1.3,
          }}
        >
          Your script is feature length. PITCH'D only scratches the surface.
        </h3>
        <p
          className="font-grotesk mt-3"
          style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}
        >
          You've got the logline. Now get the full picture. SLATR delivers everything a studio coverage report includes — and more:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-5">
          {[FEATURES_LEFT, FEATURES_RIGHT].map((col, ci) => (
            <div key={ci} className="space-y-2">
              {col.map((feature) => (
                <div key={feature} className="flex items-start gap-2">
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: '20px', flexShrink: 0 }}>
                    &#10003;
                  </span>
                  <span
                    className="font-grotesk"
                    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: '20px' }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
          <a
            href="https://www.slatr.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="font-syne text-center px-6 py-3 rounded-lg transition-all hover:opacity-90"
            style={{
              fontSize: '14px',
              background: '#ffffff',
              color: '#0d9488',
              textDecoration: 'none',
            }}
          >
            Get Full Coverage on SLATR &rarr;
          </a>
          <a
            href="https://www.slatr.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="font-grotesk text-center px-6 py-3 rounded-lg transition-all hover:bg-white/10"
            style={{
              fontSize: '14px',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.4)',
              textDecoration: 'none',
            }}
          >
            Learn More
          </a>
        </div>

        <p
          className="font-mono-dm mt-4"
          style={{
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Use code PITCHD25 for 15% off &middot; One month free on annual plans
        </p>
      </div>
    </div>
  );
}
