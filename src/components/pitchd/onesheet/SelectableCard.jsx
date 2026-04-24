import React, { useState, useRef, useEffect } from 'react';
import { Check, Pencil } from 'lucide-react';

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
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef(null);

  // Reset editing state when deselected or locked
  useEffect(() => {
    if (!selected || locked) setEditing(false);
  }, [selected, locked]);

  // Focus textarea when editing starts
  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      const len = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(len, len);
    }
  }, [editing]);

  const handleCardClick = () => {
    if (locked) return;
    if (!selected) onSelect();
    // If already selected, clicking card does nothing — use edit button
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const handleEditBlur = () => {
    setEditing(false);
  };

  const textStyle = {
    fontFamily: italic ? 'var(--font-mono)' : large ? 'var(--font-syne)' : 'var(--font-grotesk)',
    fontStyle: italic ? 'italic' : 'normal',
    fontSize: large ? '28px' : '15px',
    fontWeight: large ? 800 : 400,
    color: italic ? '#0d9488' : '#1a1a1a',
    letterSpacing: large ? '-0.01em' : 'normal',
    lineHeight: 1.5,
  };

  return (
    <div
      onClick={handleCardClick}
      className="rounded-lg p-5 transition-all"
      style={{
        background: '#ffffff',
        border: selected ? '1.5px solid #0d9488' : '1px solid #e8e0d8',
        boxShadow: selected
          ? '0 0 0 3px rgba(13,148,136,0.12), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 2px 8px rgba(0,0,0,0.06)',
        cursor: locked ? 'default' : selected ? 'default' : 'pointer',
      }}
    >
      {/* Top row: number + check + edit button */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
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
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: '#0d9488' }}
            >
              <Check size={11} color="#fff" strokeWidth={3} />
            </span>
          )}
        </div>

        {/* Edit button — only shown when selected and not locked */}
        {selected && !locked && !editing && (
          <button
            onClick={handleEditClick}
            className="flex items-center gap-1 px-2 py-1 rounded transition-all"
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.12em',
              color: '#0d9488',
              border: '1px solid rgba(13,148,136,0.3)',
              background: 'rgba(13,148,136,0.06)',
            }}
            title="Edit this text"
          >
            <Pencil size={10} />
            Edit
          </button>
        )}

        {selected && !locked && editing && (
          <button
            onClick={(e) => { e.stopPropagation(); setEditing(false); }}
            className="flex items-center gap-1 px-2 py-1 rounded transition-all"
            style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.12em',
              color: '#6b7280',
              border: '1px solid #e8e0d8',
              background: '#f9fafb',
            }}
          >
            Done
          </button>
        )}
      </div>

      {/* Content — textarea when editing, text when not */}
      {selected && editing ? (
        <textarea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => onEditChange(e.target.value)}
          onBlur={handleEditBlur}
          onClick={(e) => e.stopPropagation()}
          rows={large ? 3 : 3}
          className="w-full resize-none bg-transparent outline-none leading-relaxed"
          style={{
            ...textStyle,
            borderBottom: '1px dashed rgba(13,148,136,0.3)',
            paddingBottom: '4px',
          }}
        />
      ) : (
        <div style={textStyle}>
          {selected ? editValue : children}
        </div>
      )}
    </div>
  );
}
