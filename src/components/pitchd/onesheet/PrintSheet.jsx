import React from 'react';

const pillStyle = {
  fontFamily: "'DM Mono', monospace",
  fontSize: '7.5px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  border: '1px solid rgba(13,148,136,0.3)',
  color: '#0d9488',
  padding: '2px 7px',
  borderRadius: '100px',
  whiteSpace: 'nowrap',
  display: 'inline-block',
};

const sectionLabel = {
  fontFamily: "'DM Mono', monospace",
  fontSize: '7.5px',
  fontWeight: 600,
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: '#0d9488',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const sectionRule = { flex: 1, height: '1.5px', background: 'rgba(13,148,136,0.18)', display: 'block' };

export default function PrintSheet({ data, visible }) {
  if (!visible || !data) return null;

  const {
    writerName, writerPhone, writerEmail,
    title, logline, tagline, synopsis,
    comparableA, comparableB, genres = [], tone, themes = [],
    setting, period, format: filmFormat, estimatedBudget,
    estimatedBudgetRange, targetAudience, attachedTalent,
  } = data;

  const hasWriter = writerName?.trim();

  return (
    <div
      id="printSheet"
      style={{
        position: 'fixed', inset: 0, width: '100vw', height: '100vh',
        background: '#fff', zIndex: 99999, display: 'flex', flexDirection: 'column',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* TOP TEAL RULE */}
      <div style={{ height: '4px', background: '#0d9488', flexShrink: 0 }} />

      {/* WHITE HEADER */}
      <div style={{ background: '#fff', padding: '20px 48px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '0.03em', color: '#1a1a1a' }}>
            P<span style={{ color: '#0d9488' }}>i</span>TCH'D
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '7.5px', color: '#9ca3af', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '4px' }}>
            A Shadow Wolves Productions Tool
          </div>
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '7.5px', letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid rgba(13,148,136,0.35)', color: '#0d9488', padding: '4px 10px' }}>
          Development One Sheet
        </div>
      </div>

      {/* HEADER RULE */}
      <div style={{ height: '1px', background: 'rgba(13,148,136,0.15)', margin: '0 48px', flexShrink: 0 }} />

      {/* TEAL TITLE BLOCK */}
      <div style={{ background: '#0d9488', padding: '18px 48px 20px', flexShrink: 0 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '8px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '5px' }}>A Film Titled</div>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '56px', color: '#fff', letterSpacing: '0.04em', lineHeight: 1 }}>{title}</div>
      </div>

      {/* WRITER STRIP */}
      {hasWriter && (
        <div style={{ background: '#0d9488', padding: '9px 48px', display: 'flex', alignItems: 'center', gap: '18px', flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '7px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Writer</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '12px', fontWeight: 600, color: '#fff' }}>{writerName}</div>
          {writerPhone && <><div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.25)' }} /><div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9.5px', color: 'rgba(255,255,255,0.8)' }}>{writerPhone}</div></>}
          {writerEmail && <><div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.25)' }} /><div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9.5px', color: 'rgba(255,255,255,0.8)' }}>{writerEmail}</div></>}
        </div>
      )}

      {/* META ROW 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr 1fr' }}>
        <MetaCell label="Format" value={filmFormat} pad />
        <div style={{ padding: '12px 16px 10px' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '7px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#0d9488', marginBottom: '6px' }}>Genre</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
            {genres.map((g, i) => <span key={i} style={pillStyle}>{g}</span>)}
          </div>
        </div>
        <div style={{ padding: '12px 16px 10px' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '7px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#0d9488', marginBottom: '6px' }}>Est. Budget</div>
          <span style={{ ...pillStyle, textAlign: 'center', lineHeight: 1.6 }}>
            {estimatedBudget}{estimatedBudgetRange ? <><br />{estimatedBudgetRange}</> : null}
          </span>
        </div>
        <MetaCell label="Period" value={period} />
      </div>

      {/* META ROW 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        <MetaCell label="Tone" value={tone} pad />
        <div style={{ padding: '10px 16px 10px' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '7px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#0d9488', marginBottom: '6px' }}>Themes</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
            {themes.map((t, i) => <span key={i} style={pillStyle}>{t}</span>)}
          </div>
        </div>
        <MetaCell label="Setting" value={setting} />
      </div>

      {/* BODY */}
      <div style={{ flex: 1, padding: '0 48px 24px', display: 'flex', flexDirection: 'column' }}>
        {/* COMPARABLES */}
        {(comparableA || comparableB) && (
          <div style={{ padding: '14px 0 10px' }}>
            <div style={sectionLabel}>Comparables <span style={sectionRule} /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', fontStyle: 'italic', color: '#9ca3af' }}>It's</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#1a1a1a', letterSpacing: '0.05em' }}>{comparableA}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#0d9488', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>meets</span>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', color: '#1a1a1a', letterSpacing: '0.05em' }}>{comparableB}</span>
            </div>
          </div>
        )}

        {/* LOGLINE */}
        <div style={{ padding: '12px 0 10px' }}>
          <div style={sectionLabel}>Logline <span style={sectionRule} /></div>
          <p style={{ fontSize: '13px', color: '#1f2937', lineHeight: 1.68 }}>{logline}</p>
        </div>

        {/* TAGLINE */}
        <div style={{ padding: '10px 0 8px' }}>
          <div style={sectionLabel}>Tagline <span style={sectionRule} /></div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '15px', fontStyle: 'italic', color: '#0d9488' }}>"{tagline}"</p>
        </div>

        {/* SYNOPSIS */}
        <div style={{ padding: '10px 0 8px' }}>
          <div style={sectionLabel}>Synopsis <span style={sectionRule} /></div>
          <div style={{ borderLeft: '2.5px solid #0d9488', paddingLeft: '14px' }}>
            <p style={{ fontSize: '11px', color: '#374151', lineHeight: 1.72 }}>{synopsis}</p>
          </div>
        </div>

        {/* TARGET AUDIENCE */}
        {targetAudience && (
          <div style={{ padding: '10px 0 8px' }}>
            <div style={sectionLabel}>Target Audience <span style={sectionRule} /></div>
            <p style={{ fontSize: '11px', color: '#374151', lineHeight: 1.6 }}>{targetAudience}</p>
          </div>
        )}

        {/* ATTACHED TALENT */}
        {attachedTalent?.trim() && (
          <div style={{ padding: '10px 0 8px' }}>
            <div style={sectionLabel}>Attached Talent <span style={sectionRule} /></div>
            <p style={{ fontSize: '11px', color: '#374151', fontStyle: 'italic', lineHeight: 1.6 }}>{attachedTalent}</p>
          </div>
        )}
      </div>

      {/* FOOTER RULE */}
      <div style={{ height: '3px', background: '#0d9488', flexShrink: 0 }} />

      {/* WHITE FOOTER */}
      <div style={{ background: '#fff', padding: '10px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '14px', letterSpacing: '0.03em', color: '#1a1a1a' }}>
          P<span style={{ color: '#0d9488' }}>i</span>TCH'D
        </div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '7px', color: '#9ca3af', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          PITCH'D &copy; Shadow Wolves Productions
        </div>
      </div>
    </div>
  );
}

function MetaCell({ label, value, pad }) {
  return (
    <div style={{ padding: pad ? '12px 16px 10px 48px' : '12px 16px 10px' }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '7px', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#0d9488', marginBottom: '6px' }}>{label}</div>
      {value && <span style={pillStyle}>{value}</span>}
    </div>
  );
}
