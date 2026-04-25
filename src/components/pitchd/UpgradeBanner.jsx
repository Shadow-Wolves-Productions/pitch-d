import React from 'react';

const SLATR_LOGO = 'https://customer-assets.emergentagent.com/job_pitch-d-preview/artifacts/7r6s4gn9_Slatr_Logo_Grey_Transparent.png';

const FEATURES = [
  'Studio-grade script coverage across 8 categories',
  'Bechdel and representation analysis',
  'Draft comparison',
  'Budget tier generation',
];

export default function UpgradeBanner() {
  return (
    <div
      data-testid="upgrade-banner"
      className="no-print rounded-xl overflow-hidden"
      style={{ background: '#1a1a1a', borderLeft: '3px solid #3a69b1' }}
    >
      <div className="px-7 pt-7 pb-6">
        <img src={SLATR_LOGO} alt="SLATR" style={{ height: '48px', width: 'auto', marginBottom: '14px' }} />

        <h3
          className="font-syne font-extrabold"
          style={{ fontSize: '20px', color: '#ffffff', lineHeight: 1.3 }}
        >
          Your script is feature-length. PITCH'D only scratches the surface.
        </h3>
        <p
          className="font-grotesk mt-3"
          style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}
        >
          We got you started. Now take it all the way with SLATR — our complete production pipeline, including:
        </p>

        <div className="space-y-1.5 mt-5">
          {FEATURES.map((feature) => (
            <div key={feature} className="flex items-start gap-2">
              <span style={{ color: '#3a69b1', fontSize: '12px', lineHeight: '19px', flexShrink: 0 }}>&#10003;</span>
              <span className="font-grotesk" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '19px' }}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6">
          <a
            href="https://www.slatr.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="font-grotesk text-center px-6 py-3 rounded-lg transition-all hover:opacity-90"
            style={{ fontSize: '14px', letterSpacing: '0.04em', background: '#3a69b1', color: '#ffffff', textDecoration: 'none' }}
          >
            Get Full Coverage on SLATR &rarr;
          </a>
          <a
            href="https://www.slatr.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="font-grotesk text-center px-6 py-3 rounded-lg transition-all hover:bg-white/10"
            style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none' }}
          >
            Learn More
          </a>
        </div>

        <p className="font-mono-dm mt-4" style={{ fontSize: '10px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)' }}>
          Use code PITCHD10 for 10% off &middot; Includes 7-Day free trial.
        </p>
      </div>
    </div>
  );
}
