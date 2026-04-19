import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import SectionLabel from './SectionLabel';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="no-print flex items-center gap-1.5 transition-opacity opacity-40 hover:opacity-100"
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
    >
      {copied
        ? <Check size={13} style={{ color: '#0d9488' }} />
        : <Copy size={13} style={{ color: '#6b7280' }} />
      }
      <span
        className="font-mono-dm"
        style={{ fontSize: '10px', letterSpacing: '0.1em', color: copied ? '#0d9488' : '#6b7280' }}
      >
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  );
}

export default function Results({ data }) {
  if (!data) return null;
  const { primaryTitle, altTitles = [], loglines = [], taglines = [], synopsis } = data;

  return (
    <article className="space-y-12 print-container">
      {/* A FILM TITLED */}
      <section>
        <div className="flex items-center justify-between gap-3 mb-4">
          <SectionLabel>A Film Titled</SectionLabel>
          <CopyButton text={primaryTitle} />
        </div>
        <h2
          className="font-syne font-extrabold leading-[1.05]"
          style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            color: '#1a1a1a',
            letterSpacing: '-0.01em',
          }}
        >
          {primaryTitle}
        </h2>
        <div className="mt-4 h-[2px] w-24" style={{ background: '#0d9488' }} />
      </section>

      {/* OR PERHAPS */}
      {altTitles.length > 0 && (
        <section>
          <div className="flex items-center justify-between gap-3 mb-4">
            <SectionLabel>Or Perhaps —</SectionLabel>
            <CopyButton text={altTitles.join('\n')} />
          </div>
          <div className="flex flex-wrap gap-2">
            {altTitles.map((t, i) => (
              <span
                key={i}
                className="font-grotesk px-4 py-2 rounded-full text-sm transition-colors"
                style={{
                  color: '#0d9488',
                  background: '#ffffff',
                  border: '1px solid rgba(13,148,136,0.25)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* LOGLINES */}
      {loglines.length > 0 && (
        <section>
          <SectionLabel>Loglines — Three Angles</SectionLabel>
          <div className="space-y-4">
            {loglines.map((l, i) => (
              <div key={i} className="pitchd-card p-5">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-mono-dm"
                    style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#0d9488' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <CopyButton text={l} />
                </div>
                <p className="font-grotesk leading-relaxed" style={{ fontSize: '15px', color: '#1a1a1a' }}>
                  {l}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAGLINES */}
      {taglines.length > 0 && (
        <section>
          <SectionLabel>Taglines — For the Poster</SectionLabel>
          <div className="space-y-4">
            {taglines.map((t, i) => (
              <div key={i} className="pitchd-card p-5">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-mono-dm"
                    style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#0d9488' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <CopyButton text={t} />
                </div>
                <p className="font-mono-dm italic" style={{ fontSize: '15px', color: '#0d9488' }}>
                  "{t}"
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SYNOPSIS */}
      {synopsis && (
        <section>
          <div className="flex items-center justify-between gap-3 mb-4">
            <SectionLabel>Synopsis — The Room Read</SectionLabel>
            <CopyButton text={synopsis} />
          </div>
          <div className="pitchd-card p-6" style={{ borderLeft: '3px solid #0d9488' }}>
            <p className="font-grotesk leading-relaxed" style={{ fontSize: '15px', color: '#374151' }}>
              {synopsis}
            </p>
          </div>
        </section>
      )}
    </article>
  );
}