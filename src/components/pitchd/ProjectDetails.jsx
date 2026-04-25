import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const inputStyle = {
  fontFamily: 'var(--font-grotesk)',
  fontSize: '14px',
  color: '#1a1a1a',
  background: '#ffffff',
  border: '1px solid #e8e0d8',
  borderRadius: '8px',
  padding: '10px 14px',
  width: '100%',
  outline: 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  transition: 'all 0.2s ease',
};

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label
        className="font-mono-dm uppercase block mb-1.5"
        style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#0d9488' }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = '#0d9488';
          e.target.style.boxShadow = '0 0 0 3px rgba(13,148,136,0.15)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#e8e0d8';
          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
        }}
      />
    </div>
  );
}

export default function ProjectDetails({ writerName, setWriterName, writerPhone, setWriterPhone, writerEmail, setWriterEmail, attachedTalent, setAttachedTalent, collapsed }) {
  const [open, setOpen] = useState(!collapsed);

  return (
    <div className="no-print mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2 transition-colors"
      >
        <span className="font-mono-dm uppercase" style={{ fontSize: '11px', letterSpacing: '0.15em', color: '#6b7280' }}>
          Project Details
        </span>
        {open ? <ChevronUp size={16} style={{ color: '#9ca3af' }} /> : <ChevronDown size={16} style={{ color: '#9ca3af' }} />}
      </button>

      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <Field label="Writer Name" value={writerName} onChange={setWriterName} placeholder="Your full name" />
          <Field label="Writer Phone" value={writerPhone} onChange={setWriterPhone} placeholder="+61 400 000 000" />
          <Field label="Writer Email" value={writerEmail} onChange={setWriterEmail} placeholder="your@email.com" />
          <Field label="Notable Attachments" value={attachedTalent} onChange={setAttachedTalent} placeholder="e.g. Director: Jane Smith (optional)" />
        </div>
      )}
    </div>
  );
}
