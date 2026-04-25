import React, { useState } from 'react';
import PasteTab from './PasteTab';
import UploadTab from './UploadTab';

const MIN_CHARS = 200;

export default function ScriptInput({ text, setText, onGenerate, loading }) {
  const [tab, setTab] = useState('paste');
  const ready = text.length >= MIN_CHARS;

  return (
    <section className="no-print">
      <div className="flex items-center gap-2 mb-4">
        {[
          { id: 'paste', label: 'Paste Text' },
          { id: 'upload', label: 'Upload File' },
        ].map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="font-mono-dm uppercase px-4 py-2 rounded-md transition-all"
              style={{
                fontSize: '11px',
                letterSpacing: '0.15em',
                background: active ? 'rgba(13,148,136,0.08)' : 'transparent',
                color: active ? '#0d9488' : '#6b7280',
                border: active ? '1px solid rgba(13,148,136,0.25)' : '1px solid transparent',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === 'paste' ? (
        <PasteTab value={text} onChange={setText} />
      ) : (
        <UploadTab value={text} onChange={setText} />
      )}

      <button
        onClick={onGenerate}
        disabled={!ready || loading}
        className="mt-6 w-full rounded-lg py-4 font-syne font-extrabold uppercase transition-all"
        style={{
          background: '#0d9488',
          color: '#ffffff',
          fontSize: '15px',
          letterSpacing: '0.05em',
          opacity: !ready || loading ? 0.5 : 1,
          cursor: !ready || loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-1 w-full text-center">
            <span className="flex items-center justify-center gap-3 w-full">
              <span className="film-strip-loader w-16" />
              <span>Working our magic....</span>
            </span>
            <span className="font-grotesk normal-case block w-full text-center" style={{ fontSize: '11px', opacity: 0.7, fontWeight: 400, letterSpacing: 'normal' }}>
              Good things come to those who wait... so just wait!
            </span>
          </div>
        ) : (
          "LET'S DO IT! \u2192"
        )}
      </button>
    </section>
  );
}
