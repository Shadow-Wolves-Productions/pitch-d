import React from 'react';
import SectionLabel from './SectionLabel';

export default function Results({ data }) {
  if (!data) return null;
  const { primaryTitle, altTitles = [], loglines = [], taglines = [], synopsis } = data;

  return (
    <article className="space-y-12 print-container">
      {/* A FILM TITLED */}
      <section>
        <SectionLabel>A Film Titled</SectionLabel>
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
        <div
          className="mt-4 h-[2px] w-24"
          style={{ background: '#0d9488' }}
        />
      </section>

      {/* OR PERHAPS */}
      {altTitles.length > 0 && (
        <section>
          <SectionLabel>Or Perhaps —</SectionLabel>
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
                <div
                  className="font-mono-dm mb-2"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: '#0d9488',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p
                  className="font-grotesk leading-relaxed"
                  style={{ fontSize: '15px', color: '#1a1a1a' }}
                >
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
                <div
                  className="font-mono-dm mb-2"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: '#0d9488',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p
                  className="font-mono-dm italic"
                  style={{ fontSize: '15px', color: '#0d9488' }}
                >
                  “{t}”
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SYNOPSIS */}
      {synopsis && (
        <section>
          <SectionLabel>Synopsis — The Room Read</SectionLabel>
          <div
            className="pitchd-card p-6"
            style={{ borderLeft: '3px solid #0d9488' }}
          >
            <p
              className="font-grotesk leading-relaxed"
              style={{ fontSize: '15px', color: '#374151' }}
            >
              {synopsis}
            </p>
          </div>
        </section>
      )}
    </article>
  );
}