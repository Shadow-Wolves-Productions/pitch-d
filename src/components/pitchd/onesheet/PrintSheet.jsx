import React from 'react';

export default function PrintSheet({ title, logline, tagline, synopsis }) {
  return (
    <div className="print-only" style={{ fontFamily: 'var(--font-grotesk)' }}>
      {/* Teal header */}
      <div
        style={{
          background: '#0d9488',
          padding: '32px 40px 24px',
          marginBottom: '0',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '12px',
            textTransform: 'uppercase',
          }}
        >
          PITCH'D — One Sheet
        </div>
        <div
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '48px',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
      </div>

      {/* White body */}
      <div style={{ background: '#ffffff', padding: '36px 40px' }}>
        {logline && (
          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                color: '#0d9488',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Logline
            </div>
            <p
              style={{
                fontFamily: 'var(--font-grotesk)',
                fontSize: '14px',
                color: '#1a1a1a',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {logline}
            </p>
          </div>
        )}

        {tagline && (
          <div style={{ marginBottom: '28px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                color: '#0d9488',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Tagline
            </div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontStyle: 'italic',
                fontSize: '15px',
                color: '#0d9488',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              "{tagline}"
            </p>
          </div>
        )}

        {synopsis && (
          <div
            style={{
              borderLeft: '3px solid #0d9488',
              paddingLeft: '16px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.25em',
                color: '#0d9488',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Synopsis
            </div>
            <p
              style={{
                fontFamily: 'var(--font-grotesk)',
                fontSize: '13px',
                color: '#374151',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {synopsis}
            </p>
          </div>
        )}
      </div>

      {/* Teal footer */}
      <div
        style={{
          background: '#0d9488',
          padding: '14px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: '14px',
            color: '#ffffff',
            letterSpacing: '-0.01em',
          }}
        >
          PITCH<span style={{ opacity: 0.7 }}>'D</span>
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
          }}
        >
          A Shadow Wolves Productions Tool
        </span>
      </div>
    </div>
  );
}