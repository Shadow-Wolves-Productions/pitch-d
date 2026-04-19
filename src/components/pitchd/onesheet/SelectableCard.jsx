import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';

export default function SelectableCard({
  index,
  selected,
  locked,
  onSelect,
  children,
  editValue,
  onEditChange,
  italic = false,
  large = false,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (selected && textareaRef.current) {
      textareaRef.current.focus();
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [selected]);

  const handleClick = () => {
    if (!locked) onSelect();
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-lg p-5 transition-all"
      style={{
        background: '#ffffff',
        border: selected ? '1.5px solid #0d9488' : '1px solid #e8e0d8',
        boxShadow: selected
          ? '0 0 0 3px rgba(13,148,136,0.12), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 2px 8px rgba(0,0,0,0.06)',
        cursor: locked ? 'default' : 'pointer',
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        {index !== undefined && (
          <span
            className="font-mono-dm shrink-0"
            style={{
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: selected ? '#0d9488' : '#9ca3af',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        {selected && (
          <span
            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center ml-auto"
            style={{ background: '#0d9488' }}
          >
            <Check size={11} color="#fff" strokeWidth={3} />
          </span>
        )}
      </div>

      {selected && !locked ? (
        <textarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => onEditChange(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          rows={large ? 4 : 3}
          className="w-full resize-none bg-transparent outline-none leading-relaxed"
          style={{
            fontFamily: italic ? 'var(--font-mono)' : 'var(--font-grotesk)',
            fontStyle: italic ? 'italic' : 'normal',
            fontSize: large ? '28px' : '15px',
            fontWeight: large ? 800 : 400,
            color: italic ? '#0d9488' : '#1a1a1a',
            letterSpacing: large ? '-0.01em' : 'normal',
          }}
        />
      ) : (
        <div
          style={{
            fontFamily: italic ? 'var(--font-mono)' : large ? 'var(--font-syne)' : 'var(--font-grotesk)',
            fontStyle: italic ? 'italic' : 'normal',
            fontSize: large ? '28px' : '15px',
            fontWeight: large ? 800 : 400,
            color: italic ? '#0d9488' : '#1a1a1a',
            letterSpacing: large ? '-0.01em' : 'normal',
            lineHeight: 1.5,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}