import React from 'react';

const MIN_CHARS = 200;
const MAX_CHARS = 325000;

export default function PasteTab({ value, onChange }) {
  const count = value.length;
  const ready = count >= MIN_CHARS;

  const handleChange = (e) => {
    const v = e.target.value.slice(0, MAX_CHARS);
    onChange(v);
  };

  return (
    <div>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Paste your screenplay, treatment, or story concept here. The more material, the sharper the read."
        rows={14}
        className="w-full resize-y rounded-lg p-4 font-grotesk text-[15px] leading-relaxed outline-none transition-colors"
        style={{
          background: '#ffffff',
          border: '1px solid #e8e0d8',
          color: '#1a1a1a',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#0d9488')}
        onBlur={(e) => (e.target.style.borderColor = '#e8e0d8')}
      />
      <div className="flex items-center justify-between mt-3">
        <span
          className="font-mono-dm"
          style={{
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: ready ? '#0d9488' : '#9ca3af',
          }}
        >
          {count.toLocaleString()} / {MIN_CHARS} chars minimum
        </span>
        {ready && (
          <span
            className="font-mono-dm uppercase px-2 py-1 rounded"
            style={{
              fontSize: '10px',
              letterSpacing: '0.15em',
              color: '#0d9488',
              background: 'rgba(13,148,136,0.08)',
              border: '1px solid rgba(13,148,136,0.25)',
            }}
          >
            ● Ready
          </span>
        )}
      </div>
    </div>
  );
}