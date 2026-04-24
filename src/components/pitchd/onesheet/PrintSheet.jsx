import React from 'react';

export default function PrintSheet({ title, logline, tagline, synopsis, visible }) {
  if (!visible) return null;

  return (
    <div
      id="printSheet"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* TEAL HEADER */}
      <div style={{ background: '#0d9488', padding: '40px 56px 32px', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: '36px',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              PITCH<span style={{ color: 'rgba(255,255,255,0.45)' }}>'D</span>
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '5px',
            }}>
              A Shadow Wolves Productions Tool
            </div>
          </div>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.35)',
            color: 'rgba(255,255,255,0.75)',
            padding: '5px 14px',
          }}>
            Development One Sheet
          </div>
        </div>

        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '10px',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>
          A Film Titled
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(48px, 7vw, 72px)',
          color: '#ffffff',
          letterSpacing: '0.03em',
          lineHeight: 1,
        }}>
          {title}
        </div>
      </div>

      {/* WHITE BODY */}
      <div style={{ flex: 1, padding: '40px 56px', display: 'flex', flexDirection: 'column', gap: '32px', overflow: 'hidden' }}>

        {/* LOGLINE */}
        <div>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#0d9488',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            Logline
            <span style={{ flex: 1, height: '1px', background: 'rgba(13,148,136,0.2)' }} />
          </div>
          <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.65 }}>{logline}</p>
        </div>

        {/* TAGLINE */}
        <div>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#0d9488',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            Tagline
            <span style={{ flex: 1, height: '1px', background: 'rgba(13,148,136,0.2)' }} />
          </div>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '18px',
            fontStyle: 'italic',
            color: '#0d9488',
          }}>"{tagline}"</p>
        </div>

        {/* SYNOPSIS */}
        <div>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#0d9488',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            Synopsis
            <span style={{ flex: 1, height: '1px', background: 'rgba(13,148,136,0.2)' }} />
          </div>
          <p style={{
            fontSize: '14px',
            color: '#374151',
            lineHeight: 1.75,
            borderLeft: '3px solid #0d9488',
            paddingLeft: '16px',
          }}>
            {synopsis}
          </p>
        </div>
      </div>

      {/* TEAL FOOTER */}
      <div style={{
        background: '#0d9488',
        padding: '14px 56px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          PITCH'D © Shadow Wolves Productions
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Session Only · Nothing Saved
        </div>
      </div>
    </div>
  );
}
