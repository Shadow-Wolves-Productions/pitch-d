import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

const MAX_CHARS = 300000;
const ACCEPTED = '.txt,.pdf,.docx,.fountain,.fdx,.md';

async function extractFromFile(file) {
  const name = file.name.toLowerCase();
  const ext = name.split('.').pop();

  if (ext === 'pdf') {
    if (!window.pdfjsLib) throw new Error('PDF reader not loaded.');
    const buf = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: buf }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((it) => it.str).join(' ') + '\n';
    }
    return text;
  }

  if (ext === 'docx') {
    if (!window.mammoth) throw new Error('DOCX reader not loaded.');
    const buf = await file.arrayBuffer();
    const res = await window.mammoth.extractRawText({ arrayBuffer: buf });
    return res.value || '';
  }

  // .txt .fountain .fdx .md — plain text
  return await file.text();
}

export default function UploadTab({ value, onChange }) {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError('');
    setLoading(true);
    try {
      let text = await extractFromFile(file);
      text = text.slice(0, MAX_CHARS);
      setFileName(file.name);
      onChange(text);
    } catch (err) {
      setError(err.message || 'Could not read that file.');
      setFileName('');
      onChange('');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const clearFile = () => {
    setFileName('');
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="rounded-lg p-10 text-center cursor-pointer transition-all"
        style={{
          background: dragOver ? 'rgba(13,148,136,0.08)' : '#ffffff',
          border: `2px dashed ${dragOver ? '#0d9488' : '#e8e0d8'}`,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <Upload
          className="mx-auto mb-3"
          size={28}
          style={{ color: dragOver ? '#0d9488' : '#9ca3af' }}
        />
        <p className="font-grotesk text-[15px]" style={{ color: '#1a1a1a' }}>
          {loading ? 'Reading file…' : 'Drop a file or click to browse'}
        </p>
        <p
          className="font-mono-dm mt-2"
          style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#9ca3af' }}
        >
          .TXT · .PDF · .DOCX · .FOUNTAIN · .FDX · .MD
        </p>
      </div>

      {fileName && !loading && (
        <div
          className="mt-4 flex items-center justify-between rounded-lg p-3"
          style={{
            background: 'rgba(13,148,136,0.08)',
            border: '1px solid rgba(13,148,136,0.25)',
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <FileText size={18} style={{ color: '#0d9488' }} />
            <div className="min-w-0">
              <p
                className="font-grotesk text-sm truncate"
                style={{ color: '#1a1a1a' }}
              >
                {fileName}
              </p>
              <p
                className="font-mono-dm"
                style={{ fontSize: '10px', letterSpacing: '0.08em', color: '#0d9488' }}
              >
                {value.length.toLocaleString()} chars loaded
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearFile();
            }}
            className="p-1 rounded hover:bg-white/60 transition"
            aria-label="Remove file"
          >
            <X size={16} style={{ color: '#6b7280' }} />
          </button>
        </div>
      )}

      {error && (
        <p
          className="mt-3 font-mono-dm"
          style={{ fontSize: '11px', color: '#dc2626' }}
        >
          {error}
        </p>
      )}
    </div>
  );
}