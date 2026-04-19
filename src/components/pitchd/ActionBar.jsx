import React from 'react';
import { RotateCcw, Download, Printer } from 'lucide-react';

function OutlineButton({ onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className="font-mono-dm uppercase flex items-center gap-2 px-4 py-2 rounded-md transition-colors"
      style={{
        fontSize: '11px',
        letterSpacing: '0.12em',
        color: '#1a1a1a',
        background: '#ffffff',
        border: '1px solid #e8e0d8',
      }}
    >
      <Icon size={14} />
      {children}
    </button>
  );
}

export default function ActionBar({ onReset, onExport, onPrint }) {
  return (
    <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-8">
      <button
        onClick={onReset}
        className="font-mono-dm uppercase flex items-center gap-2 px-2 py-2 transition-colors"
        style={{
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: '#0d9488',
        }}
      >
        <RotateCcw size={14} />
        New Pitch
      </button>
      <div className="flex items-center gap-2">
        <OutlineButton onClick={onExport} icon={Download}>
          Export .TXT
        </OutlineButton>
        <OutlineButton onClick={onPrint} icon={Printer}>
          Print / PDF
        </OutlineButton>
      </div>
    </div>
  );
}