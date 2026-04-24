import React from 'react';

const STEPS = [
  { num: '01', label: 'Script' },
  { num: '02', label: 'Analyse' },
  { num: '03', label: 'Results' },
];

export default function StepIndicator({ current = 1 }) {
  return (
    <div className="no-print flex items-center justify-between gap-2 py-6">
      {STEPS.map((step, idx) => {
        const stepNum = idx + 1;
        const active = stepNum <= current;
        return (
          <React.Fragment key={step.num}>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="w-2 h-2 rounded-full transition-colors"
                style={{ background: active ? '#0d9488' : '#d1d5db' }}
              />
              <span
                className="font-mono-dm uppercase"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: active ? '#0d9488' : '#9ca3af',
                }}
              >
                {step.num} {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className="flex-1 h-px"
                style={{ background: '#e5e7eb' }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}